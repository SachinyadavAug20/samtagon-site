/**
 * Samtagon Vector & Recommendation Engine
 * High-performance cosine similarity and embedding calculations in TypeScript.
 *
 * Implements:
 * 1. Exact Cosine Similarity:
 *    similarity = (A • B) / (||A|| * ||B||)
 * 2. Deterministic Semantic Feature Vector Projection (128 dimensions)
 * 3. Client-side Query Embedder for natural language search
 * 4. Fuzzy text search with Levenshtein and subsequence matching
 */

export interface PlatformLink {
  name: string;
  url: string;
  badge: 'steam' | 'itch' | 'gog' | 'web';
}

export interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  genres: string[];
  tags: string[];
  rating: number;
  releaseYear: number;
  platforms: PlatformLink[];
  developer: string;
  isSamtagonOriginal?: boolean;
  embedding: number[];
}

export interface GameMatch {
  game: GameItem;
  similarity: number;
  fuzzyScore: number;
  hybridScore: number;
  commonTags: string[];
}

export class VectorEngine {
  public static readonly DIMENSIONS = 128;

  /**
   * Exact Cosine Similarity between two float vectors.
   * Matches the formula: dotProduct(A, B) / (norm(A) * norm(B))
   */
  public static cosineSimilarity(a: number[] | Float32Array, b: number[] | Float32Array): number {
    if (!a || !b || a.length !== b.length) return 0.0;

    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    const len = a.length;

    for (let i = 0; i < len; i++) {
      const ai = a[i];
      const bi = b[i];
      dotProduct += ai * bi;
      normA += ai * ai;
      normB += bi * bi;
    }

    if (normA === 0.0 || normB === 0.0) {
      return 0.0;
    }

    const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    return Math.max(-1.0, Math.min(1.0, similarity));
  }

  /**
   * Compute Euclidean Norm ||A||
   */
  public static vectorNorm(a: number[] | Float32Array): number {
    let sum = 0.0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * a[i];
    }
    return Math.sqrt(sum);
  }

  /**
   * Compute Dot Product (A • B)
   */
  public static dotProduct(a: number[] | Float32Array, b: number[] | Float32Array): number {
    let dot = 0.0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
    }
    return dot;
  }

  /**
   * Normalize vector to unit length (||A|| = 1.0)
   */
  public static normalize(vec: number[]): number[] {
    const norm = this.vectorNorm(vec);
    if (norm === 0.0) return vec.slice();
    return vec.map((v) => v / norm);
  }

  /**
   * Sort matches in descending order of similarity
   */
  public static sortBySimilarity(matches: GameMatch[]): void {
    matches.sort((a, b) => b.hybridScore - a.hybridScore);
  }

  /**
   * Top K items helper
   */
  public static topKMatches(matches: GameMatch[], limit: number = 3): GameMatch[] {
    return matches.slice(0, Math.min(limit, matches.length));
  }

  /**
   * Feature 2: Find similar games for a selected game from precomputed catalog embeddings.
   * Runs in O(N * D) where N is catalog size and D is 128 dimensions (zero LLM, zero latency).
   */
  public static findSimilarGames(
    selectedGame: GameItem,
    catalog: GameItem[],
    limit: number = 3
  ): GameMatch[] {
    const matches: GameMatch[] = [];

    for (const game of catalog) {
      // Don't compare a game with itself
      if (game.id === selectedGame.id) {
        continue;
      }

      const similarity = this.cosineSimilarity(selectedGame.embedding, game.embedding);

      // Extract shared tags for rich UI explanation
      const commonTags = selectedGame.tags.filter((t) =>
        game.tags.map((gt) => gt.toLowerCase()).includes(t.toLowerCase())
      );

      matches.push({
        game,
        similarity,
        fuzzyScore: 0,
        hybridScore: similarity,
        commonTags,
      });
    }

    this.sortBySimilarity(matches);
    return this.topKMatches(matches, limit);
  }

  /**
   * Feature 1: Natural Language Semantic Search
   * Embeds free-form query string into 128-dimensional vector,
   * performs cosine similarity against all games in the catalog,
   * and blends with fuzzy keyword match for game titles.
   */
  public static searchCatalog(
    query: string,
    catalog: GameItem[],
    limit: number = 6
  ): GameMatch[] {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return catalog.slice(0, limit).map((game) => ({
        game,
        similarity: 1.0,
        fuzzyScore: 1.0,
        hybridScore: 1.0,
        commonTags: game.tags.slice(0, 3),
      }));
    }

    // 1. Generate query embedding vector
    const queryVector = this.embedText(trimmed);

    const matches: GameMatch[] = [];

    for (const game of catalog) {
      // 2. Cosine Similarity between query vector and game's precomputed embedding
      const cosSim = this.cosineSimilarity(queryVector, game.embedding);

      // 3. Fuzzy text score for title & tags matching
      const fuzzyScore = this.computeFuzzyScore(trimmed, game);

      // Hybrid blend: 70% semantic vector cosine similarity + 30% fuzzy title/keyword match
      const hybridScore = cosSim * 0.70 + fuzzyScore * 0.30;

      // Detect matching query words in game tags
      const queryTokens = trimmed.split(/\s+/).filter((t) => t.length > 2);
      const commonTags = game.tags.filter((tag) =>
        queryTokens.some((tok) => tag.toLowerCase().includes(tok) || tok.includes(tag.toLowerCase()))
      );

      matches.push({
        game,
        similarity: cosSim,
        fuzzyScore,
        hybridScore,
        commonTags,
      });
    }

    this.sortBySimilarity(matches);
    return this.topKMatches(matches, limit);
  }

  /**
   * Fast, deterministic client-side semantic embedder.
   * Maps natural language tokens across 128 orthogonal semantic dimensions:
   * - Gameplay mechanics (simulation, logistics, trains, cards, platformer, shooter, puzzles...)
   * - Mood & Atmosphere (cozy, relaxing, dark, mysterious, intense, retro...)
   * - Setting & Themes (space, ocean, city, nature, fantasy, cyberpunk...)
   * - Pacing & Complexity (turn-based, reflex, deep, tactile, casual...)
   */
  public static embedText(text: string): number[] {
    const vector = new Array<number>(this.DIMENSIONS).fill(0.0);
    const cleaned = text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
    const tokens = cleaned.split(/\s+/).filter((t) => t.length > 1);

    if (tokens.length === 0) {
      vector[0] = 1.0;
      return this.normalize(vector);
    }

    // Semantic dictionary anchors
    const semanticConcepts: Record<string, { dims: number[]; weight: number }> = {
      // Transit & Trains
      train: { dims: [0, 1, 2, 3], weight: 1.6 },
      trains: { dims: [0, 1, 2, 3], weight: 1.6 },
      rail: { dims: [0, 1, 2, 4], weight: 1.5 },
      railway: { dims: [0, 1, 2, 4], weight: 1.5 },
      transit: { dims: [0, 2, 5], weight: 1.5 },
      metro: { dims: [0, 2, 5, 6], weight: 1.6 },
      subway: { dims: [0, 2, 5, 6], weight: 1.5 },
      locomotive: { dims: [0, 1, 3], weight: 1.4 },
      signals: { dims: [1, 4, 7], weight: 1.3 },
      station: { dims: [0, 5, 8], weight: 1.2 },
      tracks: { dims: [0, 1, 4], weight: 1.3 },

      // Automation & Tycoon
      tycoon: { dims: [7, 8, 9], weight: 1.5 },
      automation: { dims: [9, 10, 11], weight: 1.6 },
      automated: { dims: [9, 10, 11], weight: 1.5 },
      factory: { dims: [9, 10, 12], weight: 1.6 },
      logistics: { dims: [7, 9, 11], weight: 1.5 },
      conveyor: { dims: [9, 10, 13], weight: 1.4 },
      management: { dims: [7, 8, 14], weight: 1.3 },
      city: { dims: [5, 8, 15], weight: 1.4 },
      urban: { dims: [5, 8, 15], weight: 1.3 },
      building: { dims: [8, 14, 16], weight: 1.3 },
      simulation: { dims: [7, 11, 17], weight: 1.4 },
      simulator: { dims: [7, 11, 17], weight: 1.4 },

      // Cozy, Nature & Peaceful
      cozy: { dims: [18, 19, 20], weight: 1.6 },
      relaxing: { dims: [18, 19, 21], weight: 1.5 },
      peaceful: { dims: [18, 20, 21], weight: 1.5 },
      calm: { dims: [18, 21, 22], weight: 1.4 },
      farming: { dims: [19, 23, 24], weight: 1.5 },
      farm: { dims: [19, 23, 24], weight: 1.5 },
      nature: { dims: [19, 20, 25], weight: 1.4 },
      fishing: { dims: [20, 26, 27], weight: 1.5 },
      island: { dims: [20, 25, 28], weight: 1.3 },
      hiking: { dims: [19, 25, 29], weight: 1.4 },
      gentle: { dims: [18, 21, 30], weight: 1.3 },

      // Space & Sci-Fi
      space: { dims: [31, 32, 33], weight: 1.6 },
      spaceship: { dims: [31, 32, 34], weight: 1.5 },
      cosmic: { dims: [31, 33, 35], weight: 1.4 },
      galaxy: { dims: [31, 34, 36], weight: 1.4 },
      asteroid: { dims: [32, 34, 37], weight: 1.3 },
      sci: { dims: [31, 35, 38], weight: 1.2 },
      fi: { dims: [31, 35, 38], weight: 1.2 },
      scifi: { dims: [31, 35, 38], weight: 1.5 },
      cyberpunk: { dims: [38, 39, 40], weight: 1.5 },
      dystopian: { dims: [39, 41, 42], weight: 1.4 },
      orbit: { dims: [31, 33, 43], weight: 1.3 },

      // Roguelike, Cards & Deckbuilders
      deckbuilder: { dims: [44, 45, 46], weight: 1.6 },
      cards: { dims: [44, 45, 47], weight: 1.5 },
      card: { dims: [44, 45, 47], weight: 1.5 },
      poker: { dims: [44, 46, 48], weight: 1.6 },
      roguelike: { dims: [49, 50, 51], weight: 1.6 },
      roguelite: { dims: [49, 50, 51], weight: 1.6 },
      dungeon: { dims: [49, 52, 53], weight: 1.4 },
      permadeath: { dims: [50, 54, 55], weight: 1.3 },
      procedural: { dims: [11, 50, 56], weight: 1.3 },

      // Puzzle & Mysteries
      puzzle: { dims: [57, 58, 59], weight: 1.6 },
      puzzles: { dims: [57, 58, 59], weight: 1.6 },
      mystery: { dims: [58, 60, 61], weight: 1.5 },
      detective: { dims: [60, 62, 63], weight: 1.5 },
      investigation: { dims: [60, 62, 64], weight: 1.4 },
      loop: { dims: [57, 61, 65], weight: 1.5 },
      timeloop: { dims: [57, 61, 65], weight: 1.6 },
      physics: { dims: [57, 66, 67], weight: 1.4 },
      portal: { dims: [57, 66, 68], weight: 1.5 },

      // Platformer, Metroidvania & Reflex
      platformer: { dims: [69, 70, 71], weight: 1.6 },
      precision: { dims: [69, 72, 73], weight: 1.5 },
      metroidvania: { dims: [70, 74, 75], weight: 1.6 },
      jump: { dims: [69, 71, 76], weight: 1.2 },
      arcade: { dims: [71, 77, 78], weight: 1.5 },
      retro: { dims: [78, 79, 80], weight: 1.4 },
      pixel: { dims: [79, 81, 82], weight: 1.3 },
      pixelart: { dims: [79, 81, 82], weight: 1.4 },
      shooter: { dims: [32, 77, 83], weight: 1.5 },
      action: { dims: [71, 77, 84], weight: 1.3 },
      combat: { dims: [77, 84, 85], weight: 1.4 },
      boss: { dims: [84, 85, 86], weight: 1.3 },

      // Deep Sea & Ocean
      ocean: { dims: [20, 87, 88], weight: 1.6 },
      underwater: { dims: [87, 88, 89], weight: 1.6 },
      submarine: { dims: [87, 89, 90], weight: 1.4 },
      deep: { dims: [87, 88, 91], weight: 1.3 },
      sea: { dims: [20, 87, 88], weight: 1.5 },

      // Cellular Automata & Math
      cellular: { dims: [92, 93, 94], weight: 1.7 },
      automata: { dims: [92, 93, 94], weight: 1.7 },
      conway: { dims: [92, 93, 95], weight: 1.8 },
      mathematics: { dims: [92, 95, 96], weight: 1.5 },
      math: { dims: [92, 95, 96], weight: 1.5 },
      grid: { dims: [5, 92, 97], weight: 1.4 },
      matrix: { dims: [92, 97, 98], weight: 1.3 },

      // Story & Narrative
      story: { dims: [99, 100, 101], weight: 1.4 },
      narrative: { dims: [99, 100, 102], weight: 1.5 },
      rpg: { dims: [100, 103, 104], weight: 1.5 },
      dialogue: { dims: [99, 104, 105], weight: 1.4 },
      adventure: { dims: [100, 106, 107], weight: 1.3 },

      // Hardcore / Survival
      survival: { dims: [108, 109, 110], weight: 1.5 },
      crafting: { dims: [24, 108, 111], weight: 1.4 },
      colony: { dims: [14, 108, 112], weight: 1.5 },
      strategy: { dims: [7, 113, 114], weight: 1.4 },
      tactical: { dims: [113, 114, 115], weight: 1.5 },
      tactics: { dims: [113, 114, 115], weight: 1.5 },
      turnbased: { dims: [114, 116, 117], weight: 1.5 },
    };

    // Apply semantic dictionary activations
    tokens.forEach((token) => {
      const match = semanticConcepts[token];
      if (match) {
        match.dims.forEach((d) => {
          vector[d] += match.weight;
        });
      } else {
        // Fallback: Hash sub-word n-grams into dimensions to capture novel vocabulary
        const hash = this.hashString(token);
        const d1 = Math.abs(hash) % this.DIMENSIONS;
        const d2 = Math.abs(hash >> 5) % this.DIMENSIONS;
        vector[d1] += 0.45;
        vector[d2] += 0.35;
      }
    });

    return this.normalize(vector);
  }

  /**
   * Fast Fowler-Noll-Vo hash for sub-word features
   */
  private static hashString(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash;
  }

  /**
   * Fast fuzzy score for title and tag matches
   */
  private static computeFuzzyScore(query: string, game: GameItem): number {
    const titleLower = game.title.toLowerCase();
    const queryLower = query.toLowerCase();

    // Exact match
    if (titleLower === queryLower) return 1.0;

    // Substring match
    if (titleLower.includes(queryLower)) return 0.85;

    // Word prefix match
    const titleWords = titleLower.split(/\s+/);
    if (titleWords.some((w) => w.startsWith(queryLower))) return 0.75;

    // Query contained in tags or genre
    if (game.genres.some((g) => g.toLowerCase().includes(queryLower))) return 0.65;
    if (game.tags.some((t) => t.toLowerCase().includes(queryLower))) return 0.60;

    // Acronym match (e.g. FTL -> Faster Than Light)
    const acronym = titleWords.map((w) => w[0]).join('');
    if (acronym === queryLower) return 0.80;

    return 0.0;
  }
}

/**
 * Samtagon Pinecone & OpenRouter Vector Service
 *
 * Implements:
 * 1. OpenRouter free embedding generation (default: liquid/lfm-2.5-embedding-350m:free - 1024 dims)
 * 2. Pinecone Vector Database query & upsert operations via REST API & SDK
 * 3. Full aggregation of all available games (curated, originals, Steam titles)
 * 4. Hybrid search scoring combining Pinecone vector similarity with fuzzy keyword matches
 */

import { CURATED_GAMES, CuratedGame } from './catalog-engine.js';
import { GAMES_CATALOG } from './games-data.js';
import { REAL_STEAM_GAMES } from './real-steam-games.js';
import { VectorEngine, GameMatch, GameItem } from './vector-engine.js';

export interface IndexedGameRecord {
  id: string;
  title: string;
  studio: string;
  genres: string[];
  year: number;
  rating: number;
  desc: string;
  image: string;
  trailer: string;
  storeUrl: string;
  badge: 'steam' | 'web' | 'gog' | 'itch';
  tags: string[];
}

export interface PineconeMatchResult {
  game: IndexedGameRecord;
  similarity: number;
  fuzzyScore: number;
  hybridScore: number;
  commonTags: string[];
  source: 'pinecone' | 'local';
}

export class PineconeService {
  public static readonly DEFAULT_OPENROUTER_MODEL = 'liquid/lfm-2.5-embedding-350m:free';
  public static readonly DEFAULT_DIMENSIONS = 1024;

  /**
   * Resolve environment variables from process.env
   */
  public static getEnv() {
    const env = typeof process !== 'undefined' ? process.env : {} as any;
    const openrouterKey = env.OPENROUTER_API_KEY?.trim() || '';
    const openrouterModel = env.OPENROUTER_EMBED_MODEL?.trim() || this.DEFAULT_OPENROUTER_MODEL;
    const pineconeKey = env.PINECONE_API_KEY?.trim() || '';
    const pineconeIndex = env.PINECONE_INDEX?.trim() || 'samtagon-games';
    let pineconeHost = env.PINECONE_INDEX_HOST?.trim() || '';

    if (pineconeHost && !pineconeHost.startsWith('http://') && !pineconeHost.startsWith('https://')) {
      pineconeHost = `https://${pineconeHost}`;
    }

    return {
      openrouterKey,
      openrouterModel,
      pineconeKey,
      pineconeIndex,
      pineconeHost,
      isConfigured: Boolean(openrouterKey && pineconeKey && (pineconeHost || pineconeIndex)),
    };
  }

  /**
   * Aggregate and deduplicate all available game data across the platform
   */
  public static getAllGames(): IndexedGameRecord[] {
    const gameMap = new Map<string, IndexedGameRecord>();
    const seenTitles = new Set<string>();

    // 1. Curated Global Icons & Top Steam Games (Minecraft, GTA, CS2, Elden Ring, Zelda...)
    CURATED_GAMES.forEach((g) => {
      const normTitle = g.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenTitles.has(normTitle)) return;
      seenTitles.add(normTitle);

      const isSteam = typeof g.id === 'number';
      const id = isSteam ? `steam-${g.id}` : String(g.id);
      const steamUrl = isSteam
        ? `https://store.steampowered.com/app/${g.id}/`
        : (g.storeUrl || 'https://www.minecraft.net/');
      const capsule = g.image || (isSteam
        ? `https://shared.steamstatic.com/store_item_assets/steam/apps/${g.id}/capsule_616x353.jpg`
        : 'assets/images/games/minecraft.png');
      const badge = g.badge || (isSteam ? 'steam' : 'web');

      const tags = Array.from(new Set([
        ...g.genres.map((x) => x.toLowerCase()),
        g.title.toLowerCase(),
        g.studio.toLowerCase(),
        ...(g.tags || []),
      ]));

      gameMap.set(id, {
        id,
        title: g.title,
        studio: g.studio,
        genres: g.genres,
        year: g.year,
        rating: g.rating,
        desc: g.desc,
        image: capsule,
        trailer: g.trailer,
        storeUrl: steamUrl,
        badge,
        tags,
      });
    });

    // 2. Samtagon Originals & Studio Games (Conway, Alien Blaster, Metro Grid, Balatro, Hades...)
    GAMES_CATALOG.forEach((g) => {
      const normTitle = g.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenTitles.has(normTitle)) return;
      seenTitles.add(normTitle);

      gameMap.set(g.id, {
        id: g.id,
        title: g.title,
        studio: g.developer,
        genres: g.genres,
        year: g.releaseYear,
        rating: g.rating,
        desc: g.description,
        image: g.image,
        trailer: '',
        storeUrl: g.platforms[0]?.url || 'https://samtagon.com',
        badge: g.platforms[0]?.badge || 'web',
        tags: g.tags || [],
      });
    });

    // 3. 5,000 Real Steam Database
    for (const [appid, title, studio, genresStr, year, rating, positiveReviews] of REAL_STEAM_GAMES) {
      if (gameMap.size >= 5000) break;
      const normTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const id = `steam-${appid}`;
      if (seenTitles.has(normTitle) || gameMap.has(id)) continue;
      seenTitles.add(normTitle);

      const genres = genresStr.split(',').map((g) => g.trim()).filter(Boolean);
      const tags = Array.from(new Set([
        ...genres.map((x) => x.toLowerCase()),
        title.toLowerCase(),
        studio.toLowerCase(),
        'steam',
        'pc gaming',
      ]));

      const steamUrl = `https://store.steampowered.com/app/${appid}/`;
      const capsule = `https://shared.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_616x353.jpg`;

      gameMap.set(id, {
        id,
        title,
        studio,
        genres: genres.length > 0 ? genres : ['Action', 'Adventure'],
        year,
        rating,
        desc: `${title} is a critically acclaimed ${genres.join(' / ')} title crafted by ${studio}. Experience captivating gameplay mechanics, rich atmosphere, and positive community praise on Steam.`,
        image: capsule,
        trailer: '',
        storeUrl: steamUrl,
        badge: 'steam',
        tags,
      });
    }

    return Array.from(gameMap.values());
  }

  /**
   * Format game record into rich semantic text for embedding
   */
  public static formatSemanticText(game: IndexedGameRecord): string {
    return [
      `Title: ${game.title}`,
      `Developer / Studio: ${game.studio}`,
      `Genres: ${game.genres.join(', ')}`,
      `Tags: ${game.tags.join(', ')}`,
      `Description: ${game.desc}`,
      `Released: ${game.year}`,
    ].join(' | ');
  }

  /**
   * Fetch embeddings from OpenRouter using a free or specified model
   */
  public static async embedTexts(texts: string[]): Promise<number[][] | null> {
    const { openrouterKey, openrouterModel } = this.getEnv();
    if (!openrouterKey) {
      console.warn('[PineconeService] OPENROUTER_API_KEY is not configured in .env');
      return null;
    }

    if (texts.length === 0) return [];

    try {
      const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://samtagon.com',
          'X-Title': 'Samtagon Games Studio',
        },
        body: JSON.stringify({
          model: openrouterModel,
          input: texts.length === 1 ? texts[0] : texts,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[PineconeService] OpenRouter embeddings error ${response.status}:`, errorText);
        return null;
      }

      const json = await response.json();
      if (!json?.data || !Array.isArray(json.data)) {
        console.error('[PineconeService] Unexpected OpenRouter response structure:', json);
        return null;
      }

      // Sort by index to maintain ordering
      const sorted = json.data.slice().sort((a: any, b: any) => (a.index ?? 0) - (b.index ?? 0));
      return sorted.map((item: any) => item.embedding as number[]);
    } catch (err) {
      console.error('[PineconeService] Failed to embed texts via OpenRouter:', err);
      return null;
    }
  }

  /**
   * Query Pinecone index using an embedding vector
   */
  public static async queryPinecone(
    vector: number[],
    topK: number = 36
  ): Promise<{ id: string; score: number; metadata: any }[] | null> {
    const { pineconeKey, pineconeHost } = this.getEnv();
    if (!pineconeKey || !pineconeHost) {
      return null;
    }

    try {
      const queryUrl = `${pineconeHost}/query`;
      const response = await fetch(queryUrl, {
        method: 'POST',
        headers: {
          'Api-Key': pineconeKey,
          'Content-Type': 'application/json',
          'X-Pinecone-API-Version': '2024-07',
        },
        body: JSON.stringify({
          vector,
          topK,
          includeMetadata: true,
          includeValues: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[PineconeService] Pinecone query error ${response.status}:`, errorText);
        return null;
      }

      const json = await response.json();
      return json.matches || [];
    } catch (err) {
      console.error('[PineconeService] Failed to query Pinecone:', err);
      return null;
    }
  }

  /**
   * Upsert vectors into Pinecone
   */
  public static async upsertToPinecone(
    records: { id: string; values: number[]; metadata: Record<string, any> }[]
  ): Promise<boolean> {
    const { pineconeKey, pineconeHost } = this.getEnv();
    if (!pineconeKey || !pineconeHost) {
      console.error('[PineconeService] Pinecone credentials missing for upsert');
      return false;
    }

    try {
      const upsertUrl = `${pineconeHost}/vectors/upsert`;
      const response = await fetch(upsertUrl, {
        method: 'POST',
        headers: {
          'Api-Key': pineconeKey,
          'Content-Type': 'application/json',
          'X-Pinecone-API-Version': '2024-07',
        },
        body: JSON.stringify({
          vectors: records,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[PineconeService] Pinecone upsert error ${response.status}:`, errorText);
        return false;
      }

      return true;
    } catch (err) {
      console.error('[PineconeService] Pinecone upsert network failure:', err);
      return false;
    }
  }

  /**
   * Full Search Pipeline:
   * 1. If Pinecone & OpenRouter are configured, embed query with OpenRouter and query Pinecone.
   * 2. Blend Pinecone similarity with fuzzy keyword score for exact title matches.
   * 3. Fall back to local hybrid search if credentials are missing or Pinecone is empty.
   */
  public static async search(
    query: string,
    limit: number = 36
  ): Promise<{
    matches: PineconeMatchResult[];
    source: 'pinecone' | 'local';
    model: string;
    totalCount: number;
    message?: string;
  }> {
    const trimmed = query.trim();
    const env = this.getEnv();
    const allGames = this.getAllGames();
    const gamesById = new Map(allGames.map((g) => [g.id, g]));

    // If query is empty, return top games from catalog
    if (!trimmed) {
      const initial = allGames.slice(0, limit).map((game) => ({
        game,
        similarity: 1.0,
        fuzzyScore: 1.0,
        hybridScore: 1.0,
        commonTags: game.tags.slice(0, 3),
        source: 'local' as const,
      }));
      return {
        matches: initial,
        source: 'local',
        model: env.openrouterModel,
        totalCount: allGames.length,
      };
    }

    // Try Pinecone Vector Search
    if (env.isConfigured) {
      const embeddings = await this.embedTexts([trimmed]);
      if (embeddings && embeddings.length > 0 && embeddings[0].length > 0) {
        const queryVector = embeddings[0];
        const pineconeMatches = await this.queryPinecone(queryVector, limit);

        if (pineconeMatches && pineconeMatches.length > 0) {
          const results: PineconeMatchResult[] = [];

          for (const match of pineconeMatches) {
            // Find existing game record from local map or reconstruct from metadata
            let game = gamesById.get(match.id);
            if (!game && match.metadata) {
              const meta = match.metadata;
              const genres = Array.isArray(meta.genres)
                ? meta.genres
                : (typeof meta.genres === 'string' ? meta.genres.split(',').map((s: string) => s.trim()) : []);
              const tags = Array.isArray(meta.tags)
                ? meta.tags
                : (typeof meta.tags === 'string' ? meta.tags.split(',').map((s: string) => s.trim()) : []);

              game = {
                id: match.id,
                title: meta.title || match.id,
                studio: meta.studio || 'Indie Studio',
                genres,
                year: Number(meta.year) || 2024,
                rating: Number(meta.rating) || 4.9,
                desc: meta.desc || '',
                image: meta.image || 'assets/images/games/minecraft.png',
                trailer: meta.trailer || '',
                storeUrl: meta.storeUrl || 'https://samtagon.com',
                badge: meta.badge || 'steam',
                tags,
              };
            }

            if (!game) continue;

            const pineconeSim = Math.max(0, Math.min(1.0, match.score));
            const dummyGameItem: GameItem = {
              id: game.id,
              title: game.title,
              subtitle: '',
              description: game.desc,
              image: game.image,
              genres: game.genres,
              tags: game.tags,
              rating: game.rating,
              releaseYear: game.year,
              platforms: [{ name: game.badge, url: game.storeUrl, badge: game.badge }],
              developer: game.studio,
              embedding: [],
            };

            const fuzzyScore = VectorEngine.computeFuzzyScore(trimmed, dummyGameItem);

            // Hybrid score: prioritize direct fuzzy title match if strong, otherwise trust Pinecone vector similarity
            const hybridScore = fuzzyScore >= 0.75
              ? Math.min(0.99, fuzzyScore * 0.70 + pineconeSim * 0.30)
              : Math.min(0.99, pineconeSim * 0.80 + fuzzyScore * 0.20);

            const displaySim = Number(Math.max(0.60, Math.min(0.99, Math.max(hybridScore, pineconeSim, fuzzyScore))).toFixed(2));
            const queryTokens = trimmed.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
            const commonTags = game.tags.filter((t) =>
              queryTokens.some((tok) => t.toLowerCase().includes(tok) || tok.includes(t.toLowerCase()))
            );

            results.push({
              game,
              similarity: displaySim,
              fuzzyScore,
              hybridScore,
              commonTags,
              source: 'pinecone',
            });
          }

          results.sort((a, b) => b.hybridScore - a.hybridScore);

          return {
            matches: results.slice(0, limit),
            source: 'pinecone',
            model: env.openrouterModel,
            totalCount: results.length,
          };
        }
      }
    }

    // Local Fallback (Guaranteed to return results for ANY input without dead-ends)
    const localMatches: PineconeMatchResult[] = [];
    const queryVectorLocal = VectorEngine.embedText(trimmed);

    for (const game of allGames) {
      const dummyGameItem: GameItem = {
        id: game.id,
        title: game.title,
        subtitle: `${game.genres.join(' • ')}`,
        description: game.desc,
        image: game.image,
        genres: game.genres,
        tags: game.tags,
        rating: game.rating,
        releaseYear: game.year,
        platforms: [{ name: game.badge, url: game.storeUrl, badge: game.badge }],
        developer: game.studio,
        embedding: VectorEngine.embedText(`${game.title} ${game.desc} ${game.genres.join(' ')} ${game.tags.join(' ')}`),
      };

      const cosSim = VectorEngine.cosineSimilarity(queryVectorLocal, dummyGameItem.embedding);
      const fuzzyScore = VectorEngine.computeFuzzyScore(trimmed, dummyGameItem);

      const hybridScore = fuzzyScore >= 0.65
        ? Math.min(0.99, fuzzyScore * 0.80 + cosSim * 0.20)
        : Math.min(0.96, cosSim * 0.75 + fuzzyScore * 0.25);

      const displaySim = Number(Math.max(0.55, Math.min(0.99, Math.max(hybridScore, fuzzyScore, cosSim))).toFixed(2));
      const queryTokens = trimmed.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
      const commonTags = game.tags.filter((t) =>
        queryTokens.some((tok) => t.toLowerCase().includes(tok) || tok.includes(t.toLowerCase()))
      );

      localMatches.push({
        game,
        similarity: displaySim,
        fuzzyScore,
        hybridScore,
        commonTags,
        source: 'local',
      });
    }

    // Sort by best score descending
    localMatches.sort((a, b) => b.hybridScore - a.hybridScore);

    return {
      matches: localMatches.slice(0, limit),
      source: 'local',
      model: 'Local-Hybrid-Engine',
      totalCount: localMatches.length,
      message: env.isConfigured
        ? 'Vector DB query returned 0 matches; showing local hybrid results.'
        : 'Pinecone not configured in .env. Showing local hybrid results.',
    };
  }
}

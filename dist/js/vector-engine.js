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
export class VectorEngine {
    static DIMENSIONS = 128;
    /**
     * Exact Cosine Similarity between two float vectors.
     * Matches the formula: dotProduct(A, B) / (norm(A) * norm(B))
     */
    static cosineSimilarity(a, b) {
        if (!a || !b || a.length !== b.length)
            return 0.0;
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
    static vectorNorm(a) {
        let sum = 0.0;
        for (let i = 0; i < a.length; i++) {
            sum += a[i] * a[i];
        }
        return Math.sqrt(sum);
    }
    /**
     * Compute Dot Product (A • B)
     */
    static dotProduct(a, b) {
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
    static normalize(vec) {
        const norm = this.vectorNorm(vec);
        if (norm === 0.0)
            return vec.slice();
        return vec.map((v) => v / norm);
    }
    /**
     * Sort matches in descending order of similarity
     */
    static sortBySimilarity(matches) {
        matches.sort((a, b) => b.hybridScore - a.hybridScore);
    }
    /**
     * Top K items helper
     */
    static topKMatches(matches, limit = 3) {
        return matches.slice(0, Math.min(limit, matches.length));
    }
    /**
     * Feature 2: Find similar games for a selected game from precomputed catalog embeddings.
     * Runs in O(N * D) where N is catalog size and D is 128 dimensions (zero LLM, zero latency).
     */
    static findSimilarGames(selectedGame, catalog, limit = 3) {
        const matches = [];
        for (const game of catalog) {
            // Don't compare a game with itself
            if (game.id === selectedGame.id) {
                continue;
            }
            const similarity = this.cosineSimilarity(selectedGame.embedding, game.embedding);
            // Extract shared tags for rich UI explanation
            const commonTags = selectedGame.tags.filter((t) => game.tags.map((gt) => gt.toLowerCase()).includes(t.toLowerCase()));
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
    static searchCatalog(query, catalog, limit = 6) {
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
        const matches = [];
        for (const game of catalog) {
            // 2. Cosine Similarity between query vector and game's precomputed embedding
            const cosSim = this.cosineSimilarity(queryVector, game.embedding);
            // 3. Fuzzy text score for title & tags matching
            const fuzzyScore = this.computeFuzzyScore(trimmed, game);
            // Prioritize strong fuzzy keyword/title matches directly
            const hybridScore = fuzzyScore >= 0.65
                ? Math.max(cosSim * 0.2 + fuzzyScore * 0.8, fuzzyScore * 0.95)
                : cosSim * 0.70 + fuzzyScore * 0.30;
            const displaySim = Math.max(cosSim, fuzzyScore);
            // Detect matching query words in game tags
            const queryTokens = trimmed.split(/\s+/).filter((t) => t.length > 2);
            const commonTags = game.tags.filter((tag) => queryTokens.some((tok) => tag.toLowerCase().includes(tok) || tok.includes(tag.toLowerCase())));
            matches.push({
                game,
                similarity: displaySim,
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
    static embedText(text) {
        const vector = new Array(this.DIMENSIONS).fill(0.0);
        const cleaned = text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
        const tokens = cleaned.split(/\s+/).filter((t) => t.length > 1);
        if (tokens.length === 0) {
            vector[0] = 1.0;
            return this.normalize(vector);
        }
        // Semantic dictionary anchors
        const semanticConcepts = {
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
            // Open World, Crime, GTA & Driving
            gta: { dims: [118, 119, 120], weight: 1.8 },
            crime: { dims: [118, 119, 121], weight: 1.7 },
            heist: { dims: [118, 120, 122], weight: 1.6 },
            heists: { dims: [118, 120, 122], weight: 1.6 },
            gang: { dims: [118, 119, 123], weight: 1.5 },
            driving: { dims: [120, 124, 125], weight: 1.6 },
            cars: { dims: [120, 124, 125], weight: 1.5 },
            car: { dims: [120, 124, 125], weight: 1.5 },
            openworld: { dims: [118, 121, 126], weight: 1.7 },
            rockstar: { dims: [118, 121, 127], weight: 1.5 },
            // Choices Matter, Branching Narrative, Android & Drama
            choices: { dims: [99, 102, 121], weight: 1.8 },
            choice: { dims: [99, 102, 121], weight: 1.7 },
            branching: { dims: [100, 102, 121], weight: 1.7 },
            endings: { dims: [100, 102, 122], weight: 1.5 },
            moral: { dims: [99, 101, 123], weight: 1.6 },
            morality: { dims: [99, 101, 123], weight: 1.6 },
            android: { dims: [38, 39, 124], weight: 1.8 },
            androids: { dims: [38, 39, 124], weight: 1.8 },
            detroit: { dims: [38, 102, 124], weight: 1.8 },
            emotional: { dims: [99, 101, 125], weight: 1.7 },
            timetravel: { dims: [57, 65, 126], weight: 1.7 },
            rewind: { dims: [57, 65, 126], weight: 1.7 },
            strange: { dims: [99, 101, 127], weight: 1.5 },
            // MOBA, Esports & Competitive Multiplayer
            moba: { dims: [113, 115, 120], weight: 1.9 },
            league: { dims: [113, 115, 120], weight: 1.8 },
            legends: { dims: [113, 115, 120], weight: 1.6 },
            esports: { dims: [113, 114, 122], weight: 1.7 },
            competitive: { dims: [113, 114, 123], weight: 1.7 },
            pvp: { dims: [113, 114, 124], weight: 1.6 },
            multiplayer: { dims: [113, 115, 125], weight: 1.5 },
            // Western, Outlaw & Frontier
            western: { dims: [118, 121, 126], weight: 1.8 },
            cowboy: { dims: [118, 121, 127], weight: 1.7 },
            outlaw: { dims: [118, 119, 127], weight: 1.6 },
            horse: { dims: [25, 121, 126], weight: 1.5 },
            horses: { dims: [25, 121, 126], weight: 1.5 },
            // Dark Fantasy, Soulslike & Mythology
            soulslike: { dims: [50, 85, 122], weight: 1.8 },
            souls: { dims: [50, 85, 122], weight: 1.7 },
            fantasy: { dims: [100, 103, 123], weight: 1.6 },
            mythology: { dims: [84, 100, 124], weight: 1.6 },
            witcher: { dims: [100, 103, 125], weight: 1.7 },
            dragon: { dims: [100, 103, 126], weight: 1.5 },
            dragons: { dims: [100, 103, 126], weight: 1.5 },
            dnd: { dims: [100, 103, 114], weight: 1.6 },
        };
        // Apply semantic dictionary activations
        tokens.forEach((token) => {
            const match = semanticConcepts[token];
            if (match) {
                match.dims.forEach((d) => {
                    vector[d] += match.weight;
                });
            }
            else {
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
    static hashString(str) {
        let hash = 2166136261;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash;
    }
    /**
     * Fast, typo-tolerant fuzzy score for title, acronym, and tag matches
     */
    static computeFuzzyScore(query, game) {
        const titleLower = game.title.toLowerCase();
        const queryLower = query.toLowerCase().trim();
        // Exact match
        if (titleLower === queryLower)
            return 1.0;
        // Compact alphanumeric match (e.g. "mine craft" -> "minecraft", "counter strike" -> "counterstrike")
        const compactQuery = queryLower.replace(/[^a-z0-9]/g, '');
        const compactTitle = titleLower.replace(/[^a-z0-9]/g, '');
        if (compactQuery.length >= 3) {
            if (compactTitle === compactQuery)
                return 0.99;
            if (compactTitle.includes(compactQuery))
                return 0.95;
        }
        // Substring match
        if (titleLower.includes(queryLower))
            return 0.92;
        const titleWords = titleLower.split(/[\s:,-]+/).filter(Boolean);
        const queryTokens = queryLower.split(/[\s:,-]+/).filter(Boolean);
        // Multi-token query matching (e.g. "red dead", "zelda tears", "action shooter")
        if (queryTokens.length > 1) {
            let matchedCount = 0;
            for (const token of queryTokens) {
                if (token.length < 2)
                    continue;
                const inTitle = titleWords.some(tw => tw.includes(token) || token.includes(tw));
                const inTags = game.tags.some(t => t.toLowerCase().includes(token));
                const inGenres = game.genres.some(g => g.toLowerCase().includes(token));
                if (inTitle || inTags || inGenres) {
                    matchedCount++;
                }
            }
            const tokenRatio = matchedCount / queryTokens.length;
            if (tokenRatio === 1.0) {
                return 0.93;
            }
            else if (tokenRatio >= 0.5) {
                return 0.72 * tokenRatio;
            }
        }
        // Acronym match (e.g. GTA -> Grand Theft Auto, LoL -> League of Legends, RDR -> Red Dead Redemption)
        const acronym = titleWords.map((w) => w[0]).join('');
        if (acronym === queryLower || acronym.startsWith(queryLower))
            return 0.95;
        // Word prefix match
        if (titleWords.some((w) => w.startsWith(queryLower)))
            return 0.88;
        // Subsequence match (e.g. "detroid" -> "detroit", "gta5" -> "Grand Theft Auto V")
        if (this.isSubsequence(queryLower, titleLower))
            return 0.82;
        // Damerau-Levenshtein typo tolerance against title words
        let bestWordSim = 0.0;
        for (const word of titleWords) {
            if (word.length >= 3 && queryLower.length >= 3) {
                const dist = this.levenshteinDistance(queryLower, word);
                const maxLen = Math.max(queryLower.length, word.length);
                const sim = 1.0 - dist / maxLen;
                if (sim > bestWordSim)
                    bestWordSim = sim;
            }
        }
        if (bestWordSim >= 0.70) {
            return bestWordSim * 0.90; // e.g. "detroid" vs "detroit" -> 0.77
        }
        // Full title Levenshtein similarity
        if (queryLower.length >= 5) {
            const dist = this.levenshteinDistance(queryLower, titleLower);
            const sim = 1.0 - dist / Math.max(queryLower.length, titleLower.length);
            if (sim >= 0.65)
                return sim * 0.85;
        }
        // Match in developer or subtitle
        if (game.developer.toLowerCase().includes(queryLower))
            return 0.80;
        if (game.subtitle.toLowerCase().includes(queryLower))
            return 0.75;
        // Query contained in tags or genre
        if (game.genres.some((g) => g.toLowerCase().includes(queryLower)))
            return 0.70;
        if (game.tags.some((t) => t.toLowerCase().includes(queryLower)))
            return 0.68;
        // Fuzzy match against tags
        for (const tag of game.tags) {
            if (queryLower.length >= 4 && tag.length >= 4) {
                const dist = this.levenshteinDistance(queryLower, tag.toLowerCase());
                const sim = 1.0 - dist / Math.max(queryLower.length, tag.length);
                if (sim >= 0.75)
                    return sim * 0.70;
            }
        }
        return 0.0;
    }
    static isSubsequence(sub, str) {
        let i = 0;
        let j = 0;
        while (i < sub.length && j < str.length) {
            if (sub[i] === str[j])
                i++;
            j++;
        }
        return i === sub.length;
    }
    static levenshteinDistance(s1, s2) {
        const m = s1.length;
        const n = s2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++)
            dp[i][0] = i;
        for (let j = 0; j <= n; j++)
            dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
            }
        }
        return dp[m][n];
    }
}
//# sourceMappingURL=vector-engine.js.map
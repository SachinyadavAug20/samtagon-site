/**
 * Samtagon OpenRouter Neural Embedding Service
 *
 * Integrates with OpenRouter's vector embedding API endpoint:
 * POST https://openrouter.ai/api/v1/embeddings
 *
 * Supports API key resolution via:
 * 1. process.env.OPENROUTER_API_KEY (inlined by Bun/Vite at build time from .env)
 * 2. window.__ENV__.OPENROUTER_API_KEY (runtime server injection)
 * 3. localStorage.getItem('OPENROUTER_API_KEY') (user input in browser UI)
 *
 * Gracefully falls back to client-side VectorEngine when no key is provided.
 */
export class OpenRouterEmbedder {
    static API_URL = 'https://openrouter.ai/api/v1/embeddings';
    static DEFAULT_MODEL = 'openai/text-embedding-3-small';
    // In-memory cache for query embeddings to eliminate redundant network roundtrips
    static memoryCache = new Map();
    /**
     * Retrieve active OpenRouter API key from env or local storage
     */
    static getApiKey() {
        // 1. Build-time environment variable (Bun inlines process.env during build)
        try {
            if (typeof process !== 'undefined' && process.env && process.env.OPENROUTER_API_KEY) {
                const envVal = process.env.OPENROUTER_API_KEY.trim();
                if (envVal && envVal !== 'your_openrouter_api_key_here') {
                    return envVal;
                }
            }
        }
        catch (_) { }
        // 2. Server window.__ENV__ injection
        try {
            if (typeof window !== 'undefined' && window.__ENV__?.OPENROUTER_API_KEY) {
                const winVal = window.__ENV__.OPENROUTER_API_KEY.trim();
                if (winVal)
                    return winVal;
            }
        }
        catch (_) { }
        // 3. Browser localStorage persistence
        try {
            if (typeof localStorage !== 'undefined') {
                const stored = localStorage.getItem('OPENROUTER_API_KEY') || localStorage.getItem('openrouter_api_key');
                if (stored && stored.trim().length > 0 && stored.trim() !== 'your_openrouter_api_key_here') {
                    return stored.trim();
                }
            }
        }
        catch (_) { }
        return null;
    }
    /**
     * Set API key in browser localStorage
     */
    static setApiKey(key) {
        try {
            if (typeof localStorage !== 'undefined') {
                const clean = key.trim();
                if (clean) {
                    localStorage.setItem('OPENROUTER_API_KEY', clean);
                }
                else {
                    localStorage.removeItem('OPENROUTER_API_KEY');
                    localStorage.removeItem('openrouter_api_key');
                }
            }
        }
        catch (_) { }
    }
    /**
     * Get target embedding model
     */
    static getModel() {
        try {
            if (typeof process !== 'undefined' && process.env && process.env.OPENROUTER_EMBED_MODEL) {
                return process.env.OPENROUTER_EMBED_MODEL.trim();
            }
        }
        catch (_) { }
        try {
            if (typeof localStorage !== 'undefined') {
                const stored = localStorage.getItem('OPENROUTER_EMBED_MODEL');
                if (stored && stored.trim())
                    return stored.trim();
            }
        }
        catch (_) { }
        return this.DEFAULT_MODEL;
    }
    /**
     * Check whether neural embedding is active and ready
     */
    static isAvailable() {
        return this.getApiKey() !== null;
    }
    /**
     * Fetch high-dimensional neural vector embedding for text
     */
    static async embedText(text) {
        const key = this.getApiKey();
        if (!key)
            return null;
        const trimmed = text.trim();
        if (!trimmed)
            return null;
        // Check memory cache
        if (this.memoryCache.has(trimmed)) {
            return this.memoryCache.get(trimmed);
        }
        try {
            const model = this.getModel();
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://samtagon.com',
                    'X-Title': 'Samtagon Games Studio',
                },
                body: JSON.stringify({
                    model,
                    input: trimmed,
                }),
            });
            if (!response.ok) {
                console.warn(`[OpenRouter] Embeddings API returned status ${response.status}: ${response.statusText}`);
                return null;
            }
            const json = await response.json();
            if (json && json.data && Array.isArray(json.data) && json.data.length > 0 && json.data[0].embedding) {
                const vector = json.data[0].embedding;
                this.memoryCache.set(trimmed, vector);
                return vector;
            }
        }
        catch (err) {
            console.warn('[OpenRouter] Neural embedding network request failed:', err);
        }
        return null;
    }
}
//# sourceMappingURL=openrouter-embed.js.map
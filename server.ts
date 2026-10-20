/**
 * Samtagon Game Studio — Full-Stack Bun Server with Pinecone Vector Search
 *
 * Serves static website assets and provides backend API endpoints for:
 * - POST/GET /api/search : OpenRouter + Pinecone neural vector search with local fallback
 * - GET /api/status      : OpenRouter and Pinecone connection status
 * - POST /api/index      : Trigger vector database re-indexing
 */

import { PineconeService } from './src/ts/pinecone-service.js';
import { statSync } from 'node:fs';
import { join } from 'node:path';

const PORT = parseInt(process.env.PORT || '3000', 10);
const ROOT_DIR = process.cwd();
const trailerCache = new Map<number, any>();

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function getContentType(path: string): string {
  const ext = path.slice(path.lastIndexOf('.')).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

console.log('-------------------------------------------------------------');
console.log('   SAMTAGON STUDIOS SERVER WITH PINECONE VECTOR SEARCH');
console.log('-------------------------------------------------------------');
const initialEnv = PineconeService.getEnv();
console.log(`• OpenRouter Key:    ${initialEnv.openrouterKey ? '✅ Configured' : '❌ Missing in .env'}`);
console.log(`• OpenRouter Model:  ${initialEnv.openrouterModel}`);
console.log(`• Pinecone Key:      ${initialEnv.pineconeKey ? '✅ Configured' : '❌ Missing in .env'}`);
console.log(`• Pinecone Host:     ${initialEnv.pineconeHost || 'None'}`);
console.log(`• Vector Search:     ${initialEnv.isConfigured ? '⚡ Pinecone Vector DB Active' : '🔄 Local Hybrid Fallback Active'}`);
console.log('-------------------------------------------------------------\n');

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method.toUpperCase();

    // Enable CORS for API routes
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Api-Key',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. API: Vector Search Endpoint
    if (url.pathname === '/api/search') {
      try {
        let query = '';
        let limit = 36;

        if (method === 'POST') {
          const body = await req.json().catch(() => ({}));
          query = String(body.query || body.q || '').trim();
          if (body.limit && typeof body.limit === 'number') {
            limit = Math.min(100, Math.max(1, body.limit));
          }
        } else {
          query = String(url.searchParams.get('q') || url.searchParams.get('query') || '').trim();
          const limitParam = parseInt(url.searchParams.get('limit') || '36', 10);
          if (!isNaN(limitParam)) {
            limit = Math.min(100, Math.max(1, limitParam));
          }
        }

        const searchResult = await PineconeService.search(query, limit);

        return new Response(
          JSON.stringify({
            success: true,
            query,
            source: searchResult.source,
            engine: searchResult.engine,
            model: searchResult.model,
            totalCount: searchResult.totalCount,
            matches: searchResult.matches,
            message: searchResult.message,
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (err: any) {
        console.error('[Server] Search API error:', err);
        return new Response(
          JSON.stringify({
            success: false,
            error: err.message || 'Internal search error',
          }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // 2. API: Status Endpoint
    if (url.pathname === '/api/status') {
      const env = PineconeService.getEnv();
      return new Response(
        JSON.stringify({
          success: true,
          openrouter: {
            configured: Boolean(env.openrouterKey),
            model: env.openrouterModel,
          },
          pinecone: {
            configured: Boolean(env.pineconeKey && (env.pineconeHost || env.pineconeIndex)),
            host: env.pineconeHost || null,
            index: env.pineconeIndex,
          },
          activeSearchMode: env.isConfigured ? 'pinecone' : 'local',
          totalGamesAvailable: PineconeService.getAllGames().length,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // 2b. API: Steam Video Trailer Endpoint
    if (url.pathname === '/api/trailer') {
      const appidParam = url.searchParams.get('appid') || url.searchParams.get('id');
      const numericId = parseInt(String(appidParam).replace(/[^0-9]/g, ''), 10);
      if (isNaN(numericId) || numericId <= 0) {
        return new Response(
          JSON.stringify({ success: false, error: 'Valid numeric Steam appid is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (trailerCache.has(numericId)) {
        return new Response(
          JSON.stringify(trailerCache.get(numericId)),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      try {
        const steamRes = await fetch(`https://store.steampowered.com/api/appdetails?appids=${numericId}&cc=us&l=en`, {
          headers: { 'User-Agent': 'SamtagonTrailerService/2.0' },
        });
        const steamData: any = await steamRes.json();
        const appData = steamData[numericId]?.data;

        if (!appData) {
          const resp = { success: false, appid: numericId, error: 'Game not found on Steam' };
          trailerCache.set(numericId, resp);
          return new Response(JSON.stringify(resp), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const movies = appData.movies || [];
        if (movies.length === 0) {
          const resp = {
            success: true,
            appid: numericId,
            hasVideo: false,
            title: appData.name || '',
            steamUrl: `https://store.steampowered.com/app/${numericId}/`,
          };
          trailerCache.set(numericId, resp);
          return new Response(JSON.stringify(resp), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const m = movies.find((x: any) => x.highlight) || movies[0];
        const resp = {
          success: true,
          appid: numericId,
          hasVideo: true,
          title: m.name || appData.name || 'Official Trailer',
          thumbnail: m.thumbnail || '',
          hls: m.hls_h264 || null,
          dash: m.dash_h264 || null,
          mp4: m.mp4?.max || m.mp4?.['480'] || null,
          webm: m.webm?.max || m.webm?.['480'] || null,
          steamUrl: `https://store.steampowered.com/app/${numericId}/`,
        };
        trailerCache.set(numericId, resp);
        return new Response(JSON.stringify(resp), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (err: any) {
        console.error(`[Server] Trailer fetch error for appid ${numericId}:`, err);
        return new Response(
          JSON.stringify({ success: false, appid: numericId, error: err.message || 'Trailer fetch failed' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 3. Static File Server
    let filePath = url.pathname;
    if (filePath === '/' || filePath === '') {
      filePath = '/index.html';
    } else if (filePath === '/recommendations' || filePath === '/recommendations/') {
      filePath = '/recommendations.html';
    } else if (filePath === '/about' || filePath === '/about/') {
      filePath = '/about.html';
    } else if (filePath === '/games' || filePath === '/games/') {
      filePath = '/games.html';
    }

    const safePath = join(ROOT_DIR, filePath.replace(/\.\./g, ''));

    try {
      const stats = statSync(safePath);
      if (stats.isFile()) {
        const file = Bun.file(safePath);
        const contentType = getContentType(safePath);
        const isDynamicDev = safePath.endsWith('.html') || safePath.endsWith('.js') || safePath.endsWith('.css') || safePath.endsWith('.json');
        const cacheControl = isDynamicDev
          ? 'no-cache, no-store, must-revalidate'
          : 'public, max-age=86400';

        return new Response(file, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': cacheControl,
            'X-Content-Type-Options': 'nosniff',
          },
        });
      }
    } catch (_) {
      // Fall through to 404
    }

    // Return 404
    return new Response('404 Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  },
});

console.log(`🌐 Server running at: http://localhost:${PORT}/`);
console.log(`• Showcase:          http://localhost:${PORT}/`);
console.log(`• Fuzzy Find:        http://localhost:${PORT}/recommendations.html#explore`);
console.log(`• Search API:        http://localhost:${PORT}/api/search?q=minecraft\n`);

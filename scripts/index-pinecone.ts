/**
 * Samtagon CLI Tool: Index All Games into Pinecone Vector Database
 *
 * Usage:
 *   bun run scripts/index-pinecone.ts
 *   or: bun run index-vectors
 *
 * Requirements in .env:
 *   OPENROUTER_API_KEY=sk-or-v1-...
 *   OPENROUTER_EMBED_MODEL=liquid/lfm-2.5-embedding-350m:free
 *   PINECONE_API_KEY=pcsk_...
 *   PINECONE_INDEX_HOST=https://your-index-host.svc.pinecone.io
 *   PINECONE_INDEX=samtagon-games
 */

import { PineconeService, IndexedGameRecord } from '../src/ts/pinecone-service.js';
import { Pinecone } from '@pinecone-database/pinecone';

async function main() {
  console.log('\n=============================================================');
  console.log('   SAMTAGON STUDIOS — PINECONE VECTOR DB INDEXER');
  console.log('=============================================================\n');

  // --target=openrouter  → rebuild the CLASSIC index with OpenRouter embeddings
  //                        (runtime fallback engine), batch 200, resumable.
  // default              → integrated-embedding index (Pinecone embeds server-side).
  const targetOpenrouter = process.argv.includes('--target=openrouter');

  const env = PineconeService.getEnv();

  if (targetOpenrouter) {
    // Re-point the service env at the classic fallback index for this run
    if (!env.pineconeFallbackHost || !env.pineconeFallbackIndex) {
      console.error('❌ Error: --target=openrouter requires PINECONE_FALLBACK_INDEX and PINECONE_FALLBACK_INDEX_HOST in .env');
      console.log('   Example: PINECONE_FALLBACK_INDEX=samtagon-games');
      console.log('            PINECONE_FALLBACK_INDEX_HOST=https://samtagon-games-xxxx.svc.aped-4627-b74a.pinecone.io\n');
      process.exit(1);
    }
    if (!env.openrouterKey || env.openrouterKey.includes('your_openrouter')) {
      console.error('❌ Error: --target=openrouter requires OPENROUTER_API_KEY in .env\n');
      process.exit(1);
    }
    process.env.PINECONE_INDEX_HOST = env.pineconeFallbackHost;
    process.env.PINECONE_INDEX = env.pineconeFallbackIndex;
    process.env.PINECONE_INTEGRATED = '';
    PineconeService.resetDetectCache();
  }

  const activeEnv = PineconeService.getEnv();

  console.log('🔍 Checking Environment Configuration...');
  console.log(`• Target:            ${targetOpenrouter ? 'CLASSIC index (OpenRouter embeddings)' : 'Integrated index (server-side embeddings)'}`);
  console.log(`• OpenRouter Key:    ${activeEnv.openrouterKey ? '✅ Configured (' + activeEnv.openrouterKey.slice(0, 10) + '...)' : '— Not needed (integrated index)'}`);
  console.log(`• OpenRouter Model:  ${activeEnv.openrouterModel}`);
  console.log(`• Pinecone Key:      ${activeEnv.pineconeKey ? '✅ Configured (' + activeEnv.pineconeKey.slice(0, 10) + '...)' : '❌ MISSING'}`);
  console.log(`• Pinecone Host:     ${activeEnv.pineconeHost || '(Will resolve from index name)'}`);
  console.log(`• Pinecone Index:    ${activeEnv.pineconeIndex}`);
  console.log(`• Pinecone Namespace:${activeEnv.pineconeNamespace}`);
  console.log('');

  if (!env.pineconeKey || env.pineconeKey.includes('your_pinecone')) {
    console.error('❌ Error: PINECONE_API_KEY is not configured yet in your .env file.');
    console.log('👉 Get your Pinecone API key from: https://app.pinecone.io/\n');
    console.log('Add the following to your website/.env file:');
    console.log('-------------------------------------------------------------');
    console.log('PINECONE_API_KEY=pcsk_your_actual_key_here');
    console.log('PINECONE_INDEX_HOST=https://samtagon-games-xxxx.svc.us-east-1.pinecone.io');
    console.log('PINECONE_INDEX=samtagon-games');
    console.log('-------------------------------------------------------------\n');
    process.exit(1);
  }

  if (env.pineconeHost && env.pineconeHost.includes('your-index-host')) {
    console.error('❌ Error: PINECONE_INDEX_HOST contains the placeholder "your-index-host".');
    console.log('👉 Replace it in website/.env with your real Index Host from https://app.pinecone.io/');
    console.log('   Example: PINECONE_INDEX_HOST=https://samtagon-games-xxxxxxx.svc.aped-4627-b74a.pinecone.io\n');
    process.exit(1);
  }

  // If host is not provided, try to resolve it using Pinecone SDK
  let host = env.pineconeHost;
  if (!host && env.pineconeIndex) {
    try {
      console.log(`📡 Resolving Pinecone index host for "${env.pineconeIndex}"...`);
      const pc = new Pinecone({ apiKey: env.pineconeKey });
      const desc = await pc.describeIndex(env.pineconeIndex);
      if (desc && desc.host) {
        host = `https://${desc.host}`;
        console.log(`✅ Resolved index host: ${host}`);
        process.env.PINECONE_INDEX_HOST = host;
      }
    } catch (e: any) {
      console.warn(`⚠️ Could not auto-resolve host: ${e.message}`);
    }
  }

  if (!host) {
    console.error('❌ Error: PINECONE_INDEX_HOST is missing in .env and could not be auto-resolved.');
    console.log('👉 Find your Index Host URL on your Pinecone console: https://app.pinecone.io/');
    console.log('   Example: https://samtagon-games-xxxx.svc.aped-4627-b74a.pinecone.io\n');
    process.exit(1);
  }

  // Load all games
  console.log('📦 Loading game catalog...');
  const games = PineconeService.getAllGames();
  console.log(`✅ Loaded ${games.length} total unique games from catalog.\n`);

  // Detect index type: integrated embedding (records API) vs external vectors (classic API)
  const integrated = !targetOpenrouter && await PineconeService.detectIntegratedIndex();

  // OpenRouter target: resumable run state (completed batch indices) so an
  // interrupted/daily-capped run resumes without re-burning free quota.
  const STATE_FILE = new URL('../../.index-openrouter-state.json', import.meta.url).pathname;
  const loadState = (): number[] => {
    try {
      const raw = JSON.parse(require('fs').readFileSync(STATE_FILE, 'utf8'));
      return Array.isArray(raw.completed) ? raw.completed.filter((n: any) => typeof n === 'number') : [];
    } catch {
      return [];
    }
  };
  const saveState = (completed: number[]) => {
    try {
      require('fs').writeFileSync(STATE_FILE, JSON.stringify({ completed, updatedAt: new Date().toISOString() }));
    } catch (e) {
      console.warn(`⚠️ Could not persist resume state: ${e}`);
    }
  };
  const completedBatches = targetOpenrouter ? new Set(loadState()) : null;

  if (targetOpenrouter && completedBatches && completedBatches.size > 0) {
    console.log(`📌 Resume state found — ${completedBatches.size} batch(es) already indexed, skipping them.\n`);
  }

  // Batch upserting sizes:
  //   integrated records: max 96/request      (Pinecone embeds server-side)
  //   classic vectors:    100 vectors/request (manual embedding)
  //   openrouter target:  200 vectors/request (fewer API requests — protects 50/day quota)
  const BATCH_SIZE = targetOpenrouter ? 200 : integrated ? 96 : 100;
  const totalBatches = Math.ceil(games.length / BATCH_SIZE);
  let totalUpserted = 0;

  if (targetOpenrouter) {
    const remaining = totalBatches - (completedBatches?.size ?? 0);
    console.log(`🚀 Rebuilding CLASSIC index with ${env.openrouterModel} embeddings (batch: 200, ~${remaining} API requests needed, resumable)...`);
    console.log('⏱️  Free tier: ~17 requests/min pacing + Retry-After backoff. If the daily 50-cap hits, re-run tomorrow — it resumes.\n');
  } else if (integrated) {
    console.log(`🚀 Integrated embedding index detected — Pinecone embeds chunks server-side (no OpenRouter quota).\n`);
  } else {
    console.log(`🚀 Starting vector embedding & indexing into Pinecone (${env.openrouterModel} + 1024-dim neural engine)...`);
  }

  let failedBatches: number[] = [];

  for (let b = 0; b < totalBatches; b++) {
    const startIdx = b * BATCH_SIZE;
    const batch = games.slice(startIdx, startIdx + BATCH_SIZE);

    if (completedBatches && completedBatches.has(b)) {
      totalUpserted += batch.length;
      continue;
    }

    const metadataOf = (game: IndexedGameRecord) => ({
      title: game.title,
      studio: game.studio,
      genres: game.genres.join(', '),
      year: game.year,
      rating: game.rating,
      desc: game.desc.slice(0, 500), // Minimal display description (retrieved by frontend)
      image: game.image,
      trailer: game.trailer,
      storeUrl: game.storeUrl,
      badge: game.badge,
      tags: game.tags.slice(0, 20).join(', '),
    });

    if (integrated) {
      process.stdout.write(`⏳ [Batch ${b + 1}/${totalBatches}] Upserting ${batch.length} records (Pinecone embeds server-side)... `);

      const records = batch.map((game) => ({
        id: game.id,
        text: PineconeService.formatSemanticText(game),
        metadata: metadataOf(game),
      }));

      const success = await PineconeService.upsertRecordBatch(records);
      if (success) {
        totalUpserted += batch.length;
        console.log(`✅ Done! (${totalUpserted}/${games.length})`);
      } else {
        failedBatches.push(b);
        console.log(`❌ Upsert failed!`);
      }
    } else {
      process.stdout.write(`⏳ [Batch ${b + 1}/${totalBatches}] Embedding ${batch.length} games... `);

      const semanticTexts = batch.map((g) => PineconeService.formatSemanticText(g));
      const embeddings = await PineconeService.embedTextsSafe(semanticTexts, { fallbackToLocal: false });
      if (!embeddings || embeddings.length !== batch.length) {
        failedBatches.push(b);
        console.log(`❌ Skipping batch ${b + 1} — no valid embeddings (never store broken/zero vectors). Re-run later.`);
        continue;
      }

      // Defensive validation: reject zeroed/garbage vectors before upsert
      const allValid = embeddings.every((v) => Array.isArray(v) && v.length > 64 && v.some((x) => Number.isFinite(x) && x !== 0));
      if (!allValid) {
        failedBatches.push(b);
        console.log(`❌ Skipping batch ${b + 1} — vector validation failed (all-zero or malformed).`);
        continue;
      }

      process.stdout.write(`(dim: ${embeddings[0].length}) -> Upserting to Pinecone... `);

      const vectorsToUpsert = batch.map((game, i) => {
        return {
          id: game.id,
          values: embeddings[i],
          metadata: metadataOf(game),
        };
      });

      const success = await PineconeService.upsertToPinecone(vectorsToUpsert);
      if (success) {
        totalUpserted += batch.length;
        if (completedBatches) completedBatches.add(b);
        console.log(`✅ Done! (${totalUpserted}/${games.length})`);
      } else {
        failedBatches.push(b);
        console.log(`❌ Upsert failed!`);
      }
    }

    // Persist resume progress after every batch (OpenRouter target only)
    if (completedBatches) {
      saveState(Array.from(completedBatches).sort((a, z) => a - z));
    }

    // Brief pause between batches (pacing: OpenRouter free tier ~17 req/min)
    if (b < totalBatches - 1) {
      await new Promise((resolve) => setTimeout(resolve, targetOpenrouter ? 3500 : 250));
    }
  }

  const allDone = failedBatches.length === 0;

  if (targetOpenrouter && allDone) {
    // Clean up resume state — the OpenRouter fallback index is fully rebuilt
    try { require('fs').unlinkSync(STATE_FILE); } catch { /* already absent */ }
  }

  console.log('\n=============================================================');
  if (allDone) {
    console.log(`🎉 SUCCESS: ${totalUpserted} games indexed into Pinecone!`);
  } else {
    console.log(`⚠️  PARTIAL: ${totalUpserted}/${games.length} games indexed.`);
    if (targetOpenrouter) {
      console.log(`🔁 RESUME: re-run "bun run index-openrouter" after the daily OpenRouter quota resets.`);
      console.log(`           ${failedBatches.length} batch(es) pending (${failedBatches.slice(0, 5).join(', ')}${failedBatches.length > 5 ? '...' : ''}) — progress is saved.`);
    } else {
      console.log(`🔁 Re-run "bun run index-vectors" to retry the failed batches.`);
    }
  }
  const finalEnv = PineconeService.getEnv();
  console.log(`• Mode:       ${targetOpenrouter ? 'Classic index rebuilt with ' + finalEnv.openrouterModel : integrated ? 'Integrated embedding (server-side)' : 'External ' + finalEnv.openrouterModel}`);
  console.log(`• Vector DB:  Pinecone (${activeEnv.pineconeHost})`);
  console.log('=============================================================\n');
}

main().catch((err) => {
  console.error('\n❌ Fatal error during indexing:', err);
  process.exit(1);
});

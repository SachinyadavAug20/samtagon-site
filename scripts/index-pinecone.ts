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

  const env = PineconeService.getEnv();

  console.log('🔍 Checking Environment Configuration...');
  console.log(`• OpenRouter Key:    ${env.openrouterKey ? '✅ Configured (' + env.openrouterKey.slice(0, 10) + '...)' : '❌ MISSING'}`);
  console.log(`• OpenRouter Model:  ${env.openrouterModel}`);
  console.log(`• Pinecone Key:      ${env.pineconeKey ? '✅ Configured (' + env.pineconeKey.slice(0, 10) + '...)' : '❌ MISSING'}`);
  console.log(`• Pinecone Host:     ${env.pineconeHost || '(Will resolve from index name)'}`);
  console.log(`• Pinecone Index:    ${env.pineconeIndex}`);
  console.log('');

  if (!env.openrouterKey || env.openrouterKey.includes('your_openrouter')) {
    console.error('❌ Error: OPENROUTER_API_KEY is missing in your .env file.');
    console.log('👉 Get a free key from: https://openrouter.ai/keys\n');
    process.exit(1);
  }

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

  // Batch embedding & upserting (Pinecone efficiently ingests 100 vectors per request)
  const BATCH_SIZE = 100;
  const totalBatches = Math.ceil(games.length / BATCH_SIZE);
  let totalUpserted = 0;

  console.log(`🚀 Starting vector embedding & indexing into Pinecone (${env.openrouterModel} + 1024-dim neural engine)...`);

  for (let b = 0; b < totalBatches; b++) {
    const startIdx = b * BATCH_SIZE;
    const batch = games.slice(startIdx, startIdx + BATCH_SIZE);
    const semanticTexts = batch.map((g) => PineconeService.formatSemanticText(g));

    process.stdout.write(`⏳ [Batch ${b + 1}/${totalBatches}] Embedding ${batch.length} games... `);

    const embeddings = await PineconeService.embedTexts(semanticTexts);
    if (!embeddings || embeddings.length !== batch.length) {
      console.log(`❌ Failed to retrieve embeddings for batch ${b + 1}`);
      continue;
    }

    const vectorDimension = embeddings[0].length;
    process.stdout.write(`(dim: ${vectorDimension}) -> Upserting to Pinecone... `);

    const vectorsToUpsert = batch.map((game, i) => {
      return {
        id: game.id,
        values: embeddings[i],
        metadata: {
          title: game.title,
          studio: game.studio,
          genres: game.genres.join(', '),
          year: game.year,
          rating: game.rating,
          desc: PineconeService.generateDetailedSemanticDescription(game).slice(0, 1000), // Detailed description in Vector DB
          image: game.image,
          trailer: game.trailer,
          storeUrl: game.storeUrl,
          badge: game.badge,
          tags: game.tags.slice(0, 20).join(', '),
        },
      };
    });

    const success = await PineconeService.upsertToPinecone(vectorsToUpsert);
    if (success) {
      totalUpserted += batch.length;
      console.log(`✅ Done! (${totalUpserted}/${games.length})`);
    } else {
      console.log(`❌ Upsert failed!`);
    }

    // Brief pause between batches
    if (b < totalBatches - 1) {
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
  }

  console.log('\n=============================================================');
  console.log(`🎉 SUCCESS: ${totalUpserted} games indexed into Pinecone!`);
  console.log(`• Model:      ${env.openrouterModel}`);
  console.log(`• Vector DB:  Pinecone (${host})`);
  console.log('=============================================================\n');

  // Perform a test query
  console.log('🧪 Performing test verification query: "cozy farming simulation"...');
  const testResults = await PineconeService.search('cozy farming simulation', 3);
  console.log(`Results Source: ${testResults.source}`);
  testResults.matches.forEach((m, idx) => {
    console.log(`  ${idx + 1}. ${m.game.title} (${(m.similarity * 100).toFixed(1)}% match) - ${m.game.studio}`);
  });
  console.log('\n✅ Verification complete! Website search is ready.\n');
}

main().catch((err) => {
  console.error('\n❌ Fatal error during indexing:', err);
  process.exit(1);
});

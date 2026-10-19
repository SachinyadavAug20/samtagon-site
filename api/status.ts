import { PineconeService } from '../src/ts/pinecone-service.js';

export async function GET() {
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
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export default async function handler(req: any, res: any) {
  const env = PineconeService.getEnv();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
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
  });
}

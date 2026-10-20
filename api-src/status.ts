import { PineconeService } from '../src/ts/pinecone-service.js';

const buildPayload = () => {
  const env = PineconeService.getEnv();
  return {
    success: true,
    openrouter: {
      configured: Boolean(env.openrouterKey),
      model: env.openrouterModel,
    },
    pinecone: {
      configured: Boolean(env.pineconeKey && (env.pineconeHost || env.pineconeIndex)),
      host: env.pineconeHost || null,
      index: env.pineconeIndex,
      namespace: env.pineconeNamespace,
      fallbackIndex: env.pineconeFallbackIndex || null,
      fallbackHost: env.pineconeFallbackHost || null,
    },
    activeSearchMode: env.isConfigured ? 'pinecone' : 'local',
    totalGamesAvailable: PineconeService.getAllGames().length,
  };
};

export async function GET() {
  return new Response(
    JSON.stringify(buildPayload()),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(buildPayload());
}

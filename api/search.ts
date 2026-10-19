import { PineconeService } from '../src/ts/pinecone-service.js';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || url.searchParams.get('query') || '';
  const limitParam = parseInt(url.searchParams.get('limit') || '36', 10);
  const limit = isNaN(limitParam) ? 36 : Math.min(100, Math.max(1, limitParam));

  const searchResult = await PineconeService.search(query, limit);

  return new Response(
    JSON.stringify({
      success: true,
      query,
      source: searchResult.source,
      model: searchResult.model,
      totalCount: searchResult.totalCount,
      matches: searchResult.matches,
      message: searchResult.message,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const query = String(body.query || body.q || '').trim();
  const limit = typeof body.limit === 'number' ? Math.min(100, Math.max(1, body.limit)) : 36;

  const searchResult = await PineconeService.search(query, limit);

  return new Response(
    JSON.stringify({
      success: true,
      query,
      source: searchResult.source,
      model: searchResult.model,
      totalCount: searchResult.totalCount,
      matches: searchResult.matches,
      message: searchResult.message,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

// Support traditional Node.js/Vercel serverless request/response signature as well
export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  const query = String(req.query?.q || req.body?.query || req.body?.q || '').trim();
  const limit = parseInt(req.query?.limit || req.body?.limit || '36', 10);

  const searchResult = await PineconeService.search(query, isNaN(limit) ? 36 : limit);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    success: true,
    query,
    source: searchResult.source,
    model: searchResult.model,
    totalCount: searchResult.totalCount,
    matches: searchResult.matches,
    message: searchResult.message,
  });
}


const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/watchlist') {
      if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

      if (request.method === 'GET') {
        const data = await env.WATCHLIST.get('movies') || '[]';
        return new Response(data, { headers: { ...CORS, 'Content-Type': 'application/json' } });
      }

      if (request.method === 'PUT') {
        const body = await request.text();
        await env.WATCHLIST.put('movies', body);
        return new Response('ok', { headers: CORS });
      }
    }

    return env.ASSETS.fetch(request);
  }
};

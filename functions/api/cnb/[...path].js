export async function onRequest(context) {
  const { request, params } = context;
  const path = Array.isArray(params.path)
    ? params.path.join('/')
    : (params.path || '');
  const url = new URL(request.url);
  const search = url.search ? url.search : '';
  const targetUrl = `https://api.cnb.cool/${path}${search}`;

  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  });

  const response = await fetch(newRequest);

  const corsHeaders = {
    'Access-Control-Allow-Origin': context.request.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const respHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([k, v]) => respHeaders.set(k, v));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: respHeaders,
  });
} 
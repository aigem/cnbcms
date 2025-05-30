export async function onRequest(context) {
  const { request, params } = context;
  // 兼容 params.path 为空、字符串、数组三种情况
  let path = '';
  if (Array.isArray(params.path)) {
    path = params.path.join('/');
  } else if (typeof params.path === 'string') {
    path = params.path;
  }
  // 打印调试
  console.log('代理path:', path);

  const url = new URL(request.url);
  const search = url.search ? url.search : '';
  const targetUrl = path
    ? `https://api.cnb.cool/${path}${search}`
    : `https://api.cnb.cool/${search}`;
  console.log('代理targetUrl:', targetUrl);

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
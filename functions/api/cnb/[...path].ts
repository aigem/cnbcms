export async function onRequest(context: any) {
  const { request, params } = context;
  const path = Array.isArray(params.path) ? params.path.join('/') : params.path;
  // 拼接原始query参数
  const url = new URL(request.url);
  const search = url.search ? url.search : '';
  const targetUrl = `https://api.cnb.cool/${path}${search}`;

  // 构造新的请求，保留原有method、headers、body
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  });

  // 发起请求
  const response = await fetch(newRequest);

  // 构造允许跨域的响应
  const corsHeaders = {
    'Access-Control-Allow-Origin': context.request.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type',
  };

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // 复制原始响应并加上CORS头
  const respHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([k, v]) => respHeaders.set(k, v));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: respHeaders,
  });
} 
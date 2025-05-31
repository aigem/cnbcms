export async function onRequest(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const path = url.pathname.split('/').filter(Boolean);
  
  // 处理list-issues请求
  if (path[0] === 'api' && path[1] === 'cnb' && path[2] === 'list-issues') {
    // 构建正确的API URL
    const apiBaseUrl = env.API_BASE;
    const repo = env.REPO;
    const apiUrl = `${apiBaseUrl}/${repo}/-/issues?page=1&page_size=30`;
    
    try {
      // 调用GitLab风格API
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${env.TOKEN || '1s1f18jNa3xz6YofFqFgf1HbldE'}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      return new Response(JSON.stringify({
        success: true,
        data: data
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
  
  // 其他API请求处理可以添加在这里
  return new Response(JSON.stringify({
    success: false,
    error: '未找到对应的API路由'
  }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

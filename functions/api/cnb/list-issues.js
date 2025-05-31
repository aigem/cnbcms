export async function onRequestGet(context) {
  const { env, request } = context;
  
  // 使用环境变量
  const repo = env.REPO; // 从环境变量获取仓库信息
  const token = '1s1f18jNa3xz6YofFqFgf1HbldE';
  const apiBase = env.API_BASE; // 从环境变量获取API基础地址
  const url = `${apiBase}/${repo}/-/issues?page=1&page_size=30`;
  
  try {
    // 调用Issues API
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`, // 使用Bearer认证
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // 处理响应
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.statusText}`);
    }
    
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
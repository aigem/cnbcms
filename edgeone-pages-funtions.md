Pages Functions
概述
Pages 边缘函数提供了 EdgeOne 边缘节点的 Serverless 代码执行环境，您只需编写业务函数代码并设置触发规则，无需配置和管理服务器等基础设施，即可在靠近用户的边缘节点上弹性、安全地运行代码。
﻿
﻿﻿
﻿
边缘函数的优势
分布式部署
EdgeOne 拥有超过 3200+ 边缘节点，边缘函数以分布式部署的方式运行在边缘节点。
﻿
超低延迟
客户端请求将自动被调度至靠近您用户最近的边缘节点上，命中触发规则触发边缘函数对请求进行处理并响应结果给客户端，可显著降低客户端的访问时延。
﻿
弹性扩容
边缘函数可以根据客户端请求数的突增，由近及远的将请求调度至有充足计算资源的边缘节点处理，您无需担忧突峰场景。
﻿
Serverless 架构
您无需再关心和维护底层服务器的内存、CPU、网络和其他基础设施资源，可以挪出精力更专注业务代码的开发。
﻿
快速指引
安装 npm 包：npm install -g edgeone，更多命令详见脚手架文档
本地开发：在 Pages 代码项目下
函数初始化：edgeone pages init，自动初始化 functions 目录，承载 functions 代码
关联项目：edgeone pages link，填入当前项目名称，自动关联项目 KV 配置、环境变量等信息
本地开发：edgeone pages dev，启动本地代理服务，进行函数调试
函数发布：代码推送到远端仓库，自动构建发布函数
﻿
路由 
Pages Functions 基于 /functions 目录结构生成访问路由。您可在项目仓库 /functions 目录下创建任意层级的子目录，参考下述示例。
...
functions
├── index.js
├── hello-pages.js
├── helloworld.js
├── api
    ├── users
      ├── list.js
      ├── geo.js
      ├── [id].js
    ├── visit
      ├── index.js
    ├── [[default]].js
...
上述目录文件结构，经 EdgeOne Pages 平台构建后将生成以下路由。这些路由将 Pages URL 映射到 /functions 文件，当客户端访问 URL 时将触发对应的文件代码被运行：
文件路径
路由
/functions/index.js
example.com/
/functions/hello-pages.js
example.com/hello-pages
/functions/helloworld.js
example.com/helloworld
/functions/api/users/list.js
example.com/api/users/list
/functions/api/users/geo.js
example.com/api/users/geo
/functions/api/users/[id].js
example.com/api/users/1024
/functions/api/visit/index.js
example.com/api/visit
/functions/api/[[default]].js
example.com/api/books/list
example.com/api/books/1024
example.com/api/...
说明：
路由尾部斜杠 / 是可选。/hello-pages 和 /hello-pages/ 将被路由到 /functions/hello-pages.js。
如果没有匹配到 Pages Functions 路由，客户端请求将被路由到 Pages 对应的静态资源。
路由大小写敏感，/helloworld 将被路由到 /functions/helloworld.js，不能被路由到 /functions/HelloWorld.js
﻿
动态路由
Pages Functions 支持动态路由，上述示例中一级动态路径 /functions/api/users/[id].js，多级动态路径 /functions/api/[[default]].js。参考下述用法：
文件路径
路由
匹配
/functions/api/users/[id].js
example.com/api/users/1024
是
example.com/api/users/vip/1024
否
example.com/api/vip/1024
否
/functions/api/[[default]].js
example.com/api/books/list
是
example.com/api/1024
是
example.com/v2/vip/1024
否
﻿
Function Handlers
使用 Functions Handlers 可为 Pages 创建自定义请求处理程序，以及定义 RESTful API 实现全栈应用。支持下述的 Handlers 方法：
Handlers 方法
描述
onRequest(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods 
(GET, POST, PATCH, PUT, DELETE, HEAD, OPTIONS)
onRequestGet(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods (GET)
onRequestPost(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods (POST)
onRequestPatch(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods (PATCH)
onRequestPut(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods (PUT)
onRequestDelete(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods (DELETE)
onRequestHead(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods (HEAD)
onRequestOptions(context: EventContext): Response | Promise<Response>
匹配 HTTP Methods (OPTIONS)
﻿
EventContext 对象描述
context 是传递给 Function Handlers 方法的对象，包含下述属性：
request：客户端请求对象
params：动态路由 /functions/api/users/[id].js 参数值
export function onRequestGet(context) {
  return new Response(`User id is ${context.params.id}`);
}
env：Pages 环境变量
﻿
Runtime APIs
Pages Functions 基于边缘函数实现，提供了 EdgeOne 边缘节点的 Serverless 代码执行环境。支持 ES6 语法和标准的 Web Service Worker API。其中大部分 Runtime APIs 可参考边缘函数用法，参考下述描述：
API
描述
﻿Cache﻿
Cache 基于 Web APIs 标准 Cache API 进行设计。Functions 运行时会在全局注入 caches 对象，该对象提供了一组缓存操作接口。
﻿Cookies﻿
Cookies 提供了一组 cookie 操作接口。
﻿Encoding﻿
基于 Web APIs 标准 TextEncoder、TextDecoder 进行设计，实现了编码器与解码器。
﻿Fetch﻿
基于 Web APIs 标准 Fetch API 进行设计。边缘函数运行时可使用 fetch 发起异步请求，获取远程资源。
﻿Headers﻿
Headers 基于 Web APIs 标准 Headers 进行设计。可用于 HTTP request 和 response 的头部操作。
﻿Request﻿
Request 代表 HTTP 请求对象，基于 Web APIs 标准 Request 进行设计。
﻿Response﻿
Response 代表 HTTP 响应，基于 Web APIs 标准 Response 进行设计。
﻿ReadableStream﻿
ReadableStream 可读流，也称为可读端，基于 Web APIs 标准 ReadableStream 进行设计。
﻿Web Crypto﻿
Web Crypto API 基于 Web APIs 标准 Web Crypto API 进行设计。提供了一组常见的加密操作接口，相比纯 JavaScript 实现的加密接口，Web Crypto API 的性能更高。
﻿Web Standards﻿
边缘函数基于 V8 JavaScript 引擎设计实现的 Serverless 代码执行环境，提供了以下标准化的 Web APIs。
说明：
当前 Edgeone CLI 调试环境中不支持使用 fetch 访问 EdgeOne 节点缓存或回源。
使用 context.request.eo 可获取客户端 GEO 信息。
Pages Functions 不支持使用 addEventListener，请基于 Function Handlers 监听客户端请求。
﻿
示例函数
﻿
获取用户访问地理位置：
预览地址：https://functions-geolocation.edgeone.app/﻿
源码地址：https://github.com/TencentEdgeOne/pages-templates/tree/main/examples/functions-geolocation﻿
export function onRequest({request}) {
  const geo = request.eo.geo;
  const res = JSON.stringify({
    geo: geo,
  });
﻿
  return new Response(res, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
﻿
﻿
使用 KV 记录页面访问数：
预览地址：https://functions-kv.edgeone.app/﻿
源码地址：https://github.com/TencentEdgeOne/pages-templates/tree/main/examples/functions-kv﻿
有关如何使用 KV 存储的详细信息，请参阅 KV 存储。
export async function onRequest({ request, params, env }) {
  // my_kv 是您在项目中绑定命名空间时的变量名
  const visitCount = await my_kv.get('visitCount');
  let visitCountInt = Number(visitCount);
  visitCountInt += 1;
  await my_kv.put('visitCount', visitCountInt.toString());
﻿
  const res = JSON.stringify({
    visitCount: visitCountInt,
  });
﻿
  return new Response(res, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
﻿
﻿
连接 supabase 三方数据库：
预览地址：https://functions-supabase.edgeone.app/﻿
源码地址：https://github.com/TencentEdgeOne/pages-templates/tree/main/examples/functions-supabase﻿
import { createClient } from '@supabase/supabase-js';
﻿
export async function onRequest({ request, params, env }) {
  const supabase = createClient(env.supabaseUrl, env.supabaseKey);
﻿
  let { data } = await supabase.from('users').select('*');
﻿
  return new Response(JSON.stringify({
    users: data,
  }), {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
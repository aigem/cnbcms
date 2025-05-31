.（项目根目录）
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx（主页文件，使用@/components别名导入组件）
├── functions/api/cnb
│   ├── list-issues.js（Issue列表API处理函数）
│   └── [[path]].js（API路由处理文件，包含实际的API请求逻辑）
├── public
│   └── next.svg
├── src
│   ├── components
│   │   ├── ConfigForm.tsx
│   │   └── IssueList.tsx（Issue列表展示组件，标记为客户端组件）
│   └── ...
├── .eslintrc.json
├── README.md（本文件）
├── README_zh-CN.md
├── edgeone-pages-funtions.md
├── issues_api.json
├── install-deps.bat（依赖安装脚本）
├── next.config.mjs（全局配置文件，包含API_BASE、REPO环境变量和API路由重写规则，现在配置distDir到out目录）
├── package-lock.json
├── package.json（项目依赖配置）
├── plan.md
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json（TypeScript配置文件，包含@别名设置）
```

## 功能说明
本项目实现了以下功能：
- 使用EdgeOne Pages Functions获取仓库Issue列表
- 前端React组件展示Issue数据（使用use client标记的客户端组件）
- API路由处理（通过[[path]].js直接处理API请求）
- 环境变量配置（API_BASE, REPO）
- 支持TypeScript开发
- 配置Next.js路由重写规则将/api/cnb/*转发到对应的Pages Functions处理
- 使用指定的out构建输出目录

## 部署说明
1. 安装依赖：运行 `install-deps.bat` 脚本安装所有必需的依赖
2. 初始化Pages函数：`edgeone pages init`
3. 关联项目：`edgeone pages link`
4. 本地开发：`edgeone pages dev`
5. 构建项目：`pnpm build`（构建输出在out目录）
6. 发布部署：代码推送到远端仓库后自动构建发布

## 注意事项
1. 替换API域名：已将API域名替换为实际使用的 `api.cnb.cool` 域名
2. 认证安全：已使用Bearer Token认证方式，Token存储在请求头中
3. 环境变量：API基础地址和仓库信息已配置在环境变量中
4. 缓存优化：可通过caches API添加缓存策略优化性能
5. 分页支持：当前实现固定分页参数（page=1, page_size=30），可根据需求扩展
6. 错误处理：实现完整的错误捕获与响应机制，确保接口稳定性
7. Git忽略：已完善.gitignore配置，排除Next.js生成文件和敏感文件
8. 组件导入：使用@/components别名导入组件，确保路径正确
9. 客户端组件：使用use client标记的客户端组件需要明确标注
10. API路由：通过next.config.mjs的rewrites配置将/api/cnb/*请求转发到Pages Functions处理
11. 构建输出：通过next.config.mjs配置将构建输出到out目录
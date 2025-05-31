/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_ORIGIN: "https://your-app-origin.com",
    SUPABASE_URL: "",
    SUPABASE_KEY: "",
    API_BASE: "https://api.cnb.cool",
    REPO: "cnb.ai/testblog"
  },
  distDir: 'out', // 更改构建输出目录为out
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/cnb/:path*',
          destination: '/functions/api/cnb/:path*', // 将API请求重写到Pages Functions
        },
      ],
    };
  },
};

export default nextConfig;

/*
关于构建输出：
- 默认情况下，Next.js 构建输出目录为 .next
- 如果需要更改输出目录，可以在配置中添加 distDir 字段，例如：
  distDir: 'dist',
- 修改后，构建文件将会输出到指定的目录
*/

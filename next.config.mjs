/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_ORIGIN: "https://your-app-origin.com",
    SUPABASE_URL: "",
    SUPABASE_KEY: "",
    API_BASE: "https://api.cnb.cool",
    REPO: "cnb.ai/testblog"
  },
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

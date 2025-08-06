/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['geist'],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // 1. Specific profile route: Proxy to NestJS backend
      {
        source: '/api/auth/profile',
        destination: 'http://localhost:3001/auth/profile',
      },
      // 2. Other Auth0 routes: Ensure these are handled by Next.js itself
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig;

console.log("Next.js Config Auth0 Vars:");
console.log("AUTH0_SECRET:", process.env.AUTH0_SECRET ? 'Loaded' : 'NOT LOADED');
console.log("AUTH0_BASE_URL:", process.env.AUTH0_BASE_URL);
console.log("AUTH0_ISSUER_BASE_URL:", process.env.AUTH0_ISSUER_BASE_URL);
console.log("AUTH0_CLIENT_ID:", process.env.AUTH0_CLIENT_ID ? 'Loaded' : 'NOT LOADED');
console.log("AUTH0_CLIENT_SECRET:", process.env.AUTH0_CLIENT_SECRET ? 'Loaded' : 'NOT LOADED');
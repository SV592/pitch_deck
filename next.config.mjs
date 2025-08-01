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
      // 2. All other /api routes: Proxy these to the NestJS backend
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default nextConfig;
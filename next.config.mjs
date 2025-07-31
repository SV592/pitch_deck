/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['geist'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
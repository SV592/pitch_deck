import path from 'path';

const nextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.resolve.modules.push(path.resolve('./node_modules'));
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://interviewready.ru/api/:path*',
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;

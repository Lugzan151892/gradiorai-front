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
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gradiorai.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'interviewready.ru',
        pathname: '/**',
      },
    ],
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;

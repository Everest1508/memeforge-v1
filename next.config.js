/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', 
      },
      {
        protocol: 'https',
        hostname: 'www.tabichain.com'
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me'
      }
    ],
  },
};

module.exports = nextConfig;

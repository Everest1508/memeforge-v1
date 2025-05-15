/** @type {import('next').NextConfig} */
const nextConfig = {
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
    domains: ['www.tabichain.com', 'via.placeholder.com', 'memeforge.mooo.com'],
  },
};

module.exports = nextConfig;

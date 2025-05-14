/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_ENCRYPTION_KEY:"3b2b535bfb83b6a547b6ea7274d70d3a7ebbe83ee151ce001adce22e8f893103",
    AES_KEY: "12345678901234561234567890123456",
    AES_IV:"6543210987654321"
  },
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

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    
    images: {
      unoptimized: false,
    },
    experimental: {
      scrollRestoration: true,
    },
  };
  
  module.exports = nextConfig;
  
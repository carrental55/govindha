/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,   // helps catch bugs in development
    output: 'standalone',    // bundles only necessary files for deployment
    images: {
      unoptimized: false,    // keep Next.js image optimization active
    },
    experimental: {
      scrollRestoration: true, // improves SPA navigation performance
    },
  };
  
  module.exports = nextConfig;
  
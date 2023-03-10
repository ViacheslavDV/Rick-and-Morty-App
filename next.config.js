/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: ["rickandmortyapi.com"],
  },
  nextConfig,
};

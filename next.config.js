/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ucarecdn.com','res.cloudinary.com','www.svgrepo.com'],
  },
}

module.exports = nextConfig

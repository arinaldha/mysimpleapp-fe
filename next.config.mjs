/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com', 'res.cloudinary.com', 'localhost'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
}

export default nextConfig

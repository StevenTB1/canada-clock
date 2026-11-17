import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // /portfolio loads Unsplash stand-ins and his own images from steven-chow.com through next/image
  images: {
    remotePatterns: ['images.unsplash.com', 'steven-portfolio-assets.s3.ca-central-1.amazonaws.com', 'www.steven-chow.com'].map((hostname) => ({ protocol: 'https' as const, hostname })),
  },
}

export default nextConfig

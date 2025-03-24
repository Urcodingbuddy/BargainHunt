/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com','m.media-amazon.com','rukminim2.flixcart.com'],
    
  }
};

export default nextConfig;

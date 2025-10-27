/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // সব path allow করবে
      },
      {
        protocol: 'https',
        hostname: 'www.pinterest.com',
        pathname: '/**', // সব path allow করবে
      },
    ],
  },
};

export default nextConfig;


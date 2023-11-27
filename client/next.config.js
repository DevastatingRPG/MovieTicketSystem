/** @type {import('next').NextConfig} */
// module.exports = nextConfig
const nextConfig = {}

// module.exports = nextConfig
// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'wallpaperaccess.com',
          port: '',
          pathname: '/full/**',
        },
      ],
    },
  }
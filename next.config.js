/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com']
  }
}

module.exports = nextConfig


// next.config.js
const withVideos = require('next-videos')

module.exports = withVideos({
  webpack(config, options) {
    return config
  },
})

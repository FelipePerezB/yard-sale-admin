/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress:true,
  eslint:{
    ignoreDuringBuilds:true
  },
  images:{
    domains:[
      "tailwindui.com",
      "ui-avatars.com",
      "api.lorem.space",
      "images.unsplash.com",
      "placeimg.com",
      "img-global.cpcdn.com",

    ]
  }
}

module.exports = nextConfig

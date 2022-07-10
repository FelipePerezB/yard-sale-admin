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

    ]
  }
}

module.exports = nextConfig

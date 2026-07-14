import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { qualities:[75, 82] },
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source:"/kit", destination:"/press", permanent:true },
      { source:"/epk", destination:"/press", permanent:true },
      { source:"/media-kit", destination:"/press", permanent:true },
    ]
  },
}

export default nextConfig

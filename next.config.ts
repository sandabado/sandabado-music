import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { qualities:[75, 82] },
  turbopack: { root: process.cwd() },
}

export default nextConfig

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { qualities:[75, 90] },
  turbopack: { root: process.cwd() },
}

export default nextConfig

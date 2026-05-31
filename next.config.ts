import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 정적 호스팅 + Pages Functions 조합
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

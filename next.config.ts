import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:slug*.md',
        destination: '/api/markdown?slug=:slug*',
      },
      {
        source: '/llms.txt',
        destination: '/api/markdown?slug=llms',
      }
    ];
  },
};

export default nextConfig;
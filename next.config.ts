import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for hosting on web hotel (no server-side rendering)
  output: 'export',

  // Trailing slashes for static hosting compatibility
  trailingSlash: true,

  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

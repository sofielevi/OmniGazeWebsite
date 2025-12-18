import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: Static export removed to support API routes (checkout, webhooks, auth)
  // For Vercel/Azure deployment, server-side features work automatically
  // To restore static export: add `output: 'export'` and use external API only

  // Trailing slashes for consistent URLs
  trailingSlash: true,

  // Image optimization (enabled for Vercel, disable for static hosts)
  images: {
    unoptimized: process.env.NODE_ENV !== 'production',
  },
};

export default nextConfig;

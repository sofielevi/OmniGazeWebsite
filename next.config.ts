import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // Static export for FTP/web hotel deployment (staging/production)
  // Set STATIC_EXPORT=true to enable static export mode
  // For Vercel/Azure deployment, leave unset for server-side features
  ...(isStaticExport && { output: 'export' }),

  // Trailing slashes for consistent URLs
  trailingSlash: true,

  // Image optimization (disable for static export / web hotels)
  images: {
    unoptimized: isStaticExport || process.env.NODE_ENV !== 'production',
  },
};

export default nextConfig;

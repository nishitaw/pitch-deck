import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // These options help with hydration mismatches caused by browser extensions
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,

  // This ensures the app listens on the port specified by Render
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },

  // Ensure proper port binding for Render
  experimental: {
    // Ensure proper error handling
    serverComponentsExternalPackages: ['mongoose'],
  },

  // Add output configuration for standalone mode
  output: 'standalone',

  // Disable image optimization during build to reduce memory usage
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

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
};

export default nextConfig;

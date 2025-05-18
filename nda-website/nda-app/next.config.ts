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
    // Enable CSS optimization
    optimizeCss: true,
  },

  // Add output configuration for standalone mode
  output: 'standalone',

  // Disable image optimization during build to reduce memory usage
  images: {
    unoptimized: true,
  },

  // Ensure CSS is properly loaded
  webpack: (config) => {
    // Add CSS handling
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      ?.oneOf.filter((rule) => Array.isArray(rule.use));

    if (rules) {
      rules.forEach((rule) => {
        const cssLoader = rule.use?.find(
          (use) => typeof use === 'object' && use.loader?.includes('css-loader')
        );

        if (cssLoader && typeof cssLoader === 'object') {
          cssLoader.options = {
            ...cssLoader.options,
            url: true,
            import: true,
          };
        }
      });
    }

    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const isSentryEnabled = Boolean(
  process.env.SENTRY_ORG &&
    process.env.SENTRY_PROJECT &&
    process.env.SENTRY_AUTH_TOKEN
);

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cipresaconsulting.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns"],
    instrumentationHook: true,
  },
  webpack: (config) => {
    // @supabase/supabase-js reads process.version for a UA string. It's
    // reachable from src/lib/supabase/middleware.ts, which Next bundles for
    // the Edge runtime, and Next warns because process.version isn't an
    // Edge API — but the read is side-effect-free (never awaited/branched
    // on), so it doesn't actually break anything at runtime. Known upstream
    // noise: https://github.com/supabase/supabase-js/issues/946.
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /node_modules[\\/]@supabase[\\/]supabase-js/,
        message: /A Node\.js API is used \(process\.version/,
      },
    ];
    return config;
  },
};

// Only enable Sentry's webpack plugin when a real Sentry project is configured.
// This avoids prerender/build issues in local or unconfigured environments.
const config = withPWA(nextConfig);

module.exports = isSentryEnabled
  ? withSentryConfig(config, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
      widenClientFileUpload: true,
      disableLogger: true,
      automaticVercelMonitors: false,
      sourcemaps: { deleteSourcemapsAfterUpload: true },
    })
  : config;

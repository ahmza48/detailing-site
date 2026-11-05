import type { NextConfig } from "next";

/**
 * Host canonicalisation. www.petrohill.com is canonical.
 * - petrohill.com -> www: Vercel's domain settings (edge, before this app runs); repeated here as a
 *   backstop in case that setting is ever removed. Never redirect www itself: it would loop.
 * - *.vercel.app -> www: production builds only, so preview deployments stay reachable for review.
 * - Any other host (previews, localhost) is sent X-Robots-Tag: noindex as a backstop.
 */
const PRIMARY_HOST = "www.petrohill.com";
const PRIMARY_ORIGIN = `https://${PRIMARY_HOST}`;
const isProductionBuild = process.env.VERCEL_ENV === "production";
// Host values in has/missing are anchored regular expressions, so dots are escaped.
const hostRedirects = [
  { type: "host" as const, value: "petrohill\\.com" },
  ...(isProductionBuild ? [{ type: "host" as const, value: ".+\\.vercel\\.app" }] : []),
].map((host) => ({
  source: "/:path*",
  has: [host],
  destination: `${PRIMARY_ORIGIN}/:path*`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Directives that need no nonce; script-src is left open because Next.js inlines its bootstrap scripts.
          {
            key: "Content-Security-Policy",
            value: "base-uri 'self'; form-action 'self'; frame-ancestors 'self'; object-src 'none'; upgrade-insecure-requests",
          },
        ],
      },
      {
        source: "/:path*",
        missing: [{ type: "host", value: "www\\.petrohill\\.com" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/proof-of-work/:path*",
        headers: [
          // Filenames are content hashes, so a changed drawing always gets a new URL.
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          // Cached copies must not answer the direct requests src/proxy.ts refuses.
          { key: "Vary", value: "Sec-Fetch-Dest, Sec-Fetch-Site" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-Robots-Tag", value: "noindex, noimageindex" },
        ],
      },
    ];
  },
  /**
   * Service-taxonomy restructure (website restructure spec, section 6).
   * Single-hop permanent (308) redirects from retired service URLs to their closest
   * intent match. All other service URLs were kept unchanged.
   */
  async redirects() {
    return [
      ...hostRedirects,
      {
        // Onshore was an environment, not a service: it is now an industry page.
        source: "/services/onshore-civil-structural-design-detailing",
        destination: "/industries/onshore-oil-gas",
        permanent: true,
      },
      {
        source: "/services/offshore-structural-design-detailing",
        destination: "/industries/offshore-energy",
        permanent: true,
      },
      {
        // QA/QC moved to /quality-delivery; MTO and documentation stay a service.
        source: "/services/structural-drawings-mto-qaqc",
        destination: "/services/material-takeoffs-documentation",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Deliberately omits /proof-of-work: the optimizer must not offer a route around src/proxy.ts.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/logo/**" }, { pathname: "/_next/static/media/**" }],
  },
  experimental: {
    serverActions: {
      // Allows the optional 8 MB drawing attachment on the enquiry form.
      bodySizeLimit: "10mb",
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

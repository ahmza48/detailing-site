import type { NextConfig } from "next";

/**
 * The primary domain is www.petrohill.com; petrohill.com -> www is configured in Vercel's domain
 * settings. Only the old Vercel host redirects here: redirecting www to the apex as well would loop
 * against that setting. localhost and preview URLs never match.
 */
const PRIMARY_ORIGIN = "https://www.petrohill.com";
const LEGACY_HOSTS = ["detailing-site-liart.vercel.app"];
const hostRedirects = LEGACY_HOSTS.map((host) => ({
  source: "/:path*",
  has: [{ type: "host" as const, value: host }],
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

import type { NextConfig } from "next";

/**
 * Old hosts that should permanently redirect to the same path on the primary domain.
 * Off until PRIMARY_DOMAIN_REDIRECT=1 is set in Vercel, which should only happen once
 * petrohill.com is connected and serving (otherwise the live site would redirect to a dead host).
 * www -> apex is configured in Vercel's domain settings. localhost and preview URLs never match.
 */
const PRIMARY_ORIGIN = "https://petrohill.com";
const LEGACY_HOSTS = ["detailing-site-liart.vercel.app", "www.petrohill.com"];
const hostRedirects =
  process.env.PRIMARY_DOMAIN_REDIRECT === "1"
    ? LEGACY_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${PRIMARY_ORIGIN}/:path*`,
        permanent: true,
      }))
    : [];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  /**
   * Service-taxonomy restructure (Hormuz_Energy_Copilot_Website_Restructure_Spec.md, section 6).
   * Single-hop permanent (308) redirects from retired service URLs to their closest
   * intent match. All other service URLs were kept unchanged.
   */
  async redirects() {
    return [
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

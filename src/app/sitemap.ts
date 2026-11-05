import type { MetadataRoute } from "next";
import { industries, industryPath } from "@/lib/industries";
import { landingPages, landingPath } from "@/lib/landing-pages";
import { RESOURCES_MODIFIED, resourcePath, resources } from "@/lib/resources";
import { absoluteUrl } from "@/lib/seo";
import { servicePath, services } from "@/lib/services";

/** Date of the last real content change, sent as lastmod. Bump it with content edits, never at build time. */
const SITE_MODIFIED = "2026-11-06";

/** Canonical, indexable URLs only. Redirected legacy URLs are deliberately absent. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({ path: servicePath(service.slug), priority: 0.8 })),
    { path: "/engineering-outsourcing", priority: 0.8 },
    ...landingPages.map((page) => ({ path: landingPath(page.slug), priority: 0.8 })),
    { path: "/pilot", priority: 0.7 },
    { path: "/industries", priority: 0.7 },
    ...industries.map((industry) => ({ path: industryPath(industry.slug), priority: 0.6 })),
    { path: "/applications", priority: 0.6 },
    { path: "/project-experience", priority: 0.8 },
    { path: "/capabilities", priority: 0.7 },
    { path: "/capabilities/codes-standards", priority: 0.6 },
    { path: "/quality-delivery", priority: 0.6 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/resources", priority: 0.7, lastModified: RESOURCES_MODIFIED },
    ...resources.map((resource) => ({ path: resourcePath(resource.slug), priority: 0.6, lastModified: RESOURCES_MODIFIED })),
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-use", priority: 0.3 },
  ];

  return pages.map(({ path, priority, lastModified }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
    lastModified: lastModified ?? SITE_MODIFIED,
  }));
}

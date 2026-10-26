import type { MetadataRoute } from "next";
import { industries, industryPath } from "@/lib/industries";
import { absoluteUrl } from "@/lib/seo";
import { servicePath, services } from "@/lib/services";

/** Canonical, indexable URLs only. Redirected legacy URLs are deliberately absent. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({ path: servicePath(service.slug), priority: 0.8 })),
    { path: "/engineering-outsourcing", priority: 0.8 },
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
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-use", priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { servicePath, services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({ path: servicePath(service.slug), priority: 0.8 })),
    { path: "/project-experience", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/industries", priority: 0.7 },
    { path: "/capabilities", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}

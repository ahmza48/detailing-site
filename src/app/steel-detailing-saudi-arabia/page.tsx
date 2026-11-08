import type { Metadata } from "next";
import { LandingPageLayout } from "@/components/LandingPageLayout";
import { landingBySlug, landingPath } from "@/lib/landing-pages";
import { pageMetadata } from "@/lib/seo";

const page = landingBySlug("steel-detailing-saudi-arabia");

export const metadata: Metadata = pageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: landingPath(page.slug),
  image: page.hero.image,
  keywords: [page.seo.keyword],
});

export default function Page() {
  return <LandingPageLayout page={page} />;
}

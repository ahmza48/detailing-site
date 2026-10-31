import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ResourceArticle, resourceImage } from "@/components/ResourceArticle";
import { RESOURCES_MODIFIED, RESOURCES_PUBLISHED, resourceBySlug, resourcePath, resources } from "@/lib/resources";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = resourceBySlug(slug);
  if (!resource) return {};

  const base = pageMetadata({
    title: resource.title,
    description: resource.description,
    path: resourcePath(resource.slug),
    image: resourceImage(resource),
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      title: `${resource.ogTitle} | ${site.name}`,
      description: resource.ogDescription,
      publishedTime: RESOURCES_PUBLISHED,
      modifiedTime: RESOURCES_MODIFIED,
    },
    twitter: { ...base.twitter, title: `${resource.ogTitle} | ${site.name}`, description: resource.ogDescription },
  };
}

/** Slug-dependent part, prerendered for every article via generateStaticParams. */
async function ArticleContent({ params }: { params: PageProps<"/resources/[slug]">["params"] }) {
  const { slug } = await params;
  const resource = resourceBySlug(slug);
  if (!resource) notFound();
  return <ResourceArticle resource={resource} />;
}

function ArticleShell() {
  return (
    <section aria-busy="true" className="bg-navy-900">
      <div className="container-site flex min-h-[26rem] flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-12 lg:min-h-[32rem] lg:pb-16">
        <div className="h-3 w-40 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-6 h-10 w-full max-w-xl animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-6 h-4 w-full max-w-lg animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
      </div>
    </section>
  );
}

export default function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  return (
    <Suspense fallback={<ArticleShell />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

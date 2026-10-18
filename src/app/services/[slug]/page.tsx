import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, servicePath, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: servicePath(service.slug),
    keywords: service.seo.keywords,
    image: service.image,
  });
}

/**
 * The URL-dependent part of the route. Every slug is prerendered from
 * generateStaticParams, so visitors get full HTML; the Suspense boundary lets
 * client navigations show the banner shell instantly while the page streams in.
 */
async function ServiceContent({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  return <ServicePageLayout service={service} />;
}

/** Banner-shaped placeholder matching the service hero, so nothing jumps when content arrives. */
function ServiceShell() {
  return (
    <section aria-busy="true" className="bg-navy-900">
      <div className="container-site flex min-h-[26rem] flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-12 lg:min-h-[32rem] lg:pb-16">
        <div className="h-3 w-40 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-6 h-10 w-full max-w-xl animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-3 h-10 w-full max-w-md animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-6 h-4 w-full max-w-lg animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
      </div>
    </section>
  );
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<ServiceShell />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

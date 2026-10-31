import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { CTASection } from "./CTASection";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { SectionHeading } from "./SectionHeading";
import { renderMarkdown } from "@/lib/markdown";
import {
  RESOURCES_MODIFIED,
  RESOURCES_PUBLISHED,
  relatedResources,
  resourceBody,
  resourceHubs,
  resourcePath,
  type Resource,
} from "@/lib/resources";
import { blogPostingJsonLd } from "@/lib/seo";
import { serviceBySlug, servicePath } from "@/lib/services";

/** Representative banner image per article (industry photographs, not project images). */
export const resourceImage = (resource: Resource) =>
  ({
    "steel-detailing-fabrication": "/images/tekla-model.jpg",
    "civil-structural-drafting": "/images/drawings-qaqc.jpg",
    "plant-structural-3d-modelling": "/images/plant-model.jpg",
    "rcc-reinforcement-detailing": "/images/rcc-detailing.jpg",
    "brownfield-structural-modifications": "/images/brownfield-structure.jpg",
    "material-takeoffs-documentation": "/images/services-overview.jpg",
  })[resource.relatedServices[0] ?? ""] ?? "/images/capabilities-overview.jpg";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function ResourceArticle({ resource }: { resource: Resource }) {
  const { content, toc } = renderMarkdown(resourceBody(resource.slug));
  const hub = resourceHubs.find((h) => h.id === resource.hub)!;
  const related = relatedResources(resource);
  const image = resourceImage(resource);
  const services = resource.relatedServices.map(serviceBySlug).filter((s) => s !== undefined);

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          path: resourcePath(resource.slug),
          headline: resource.h1,
          description: resource.description,
          image,
          datePublished: RESOURCES_PUBLISHED,
          dateModified: RESOURCES_MODIFIED,
          keyword: resource.primaryKeyword,
        })}
      />
      <Hero
        eyebrow={`Resources · ${hub.title}`}
        title={resource.h1}
        intro={resource.description}
        image={image}
        imageAlt="Representative industrial structure; not a project of the company"
        crumbs={[
          { name: "Resources", path: "/resources" },
          { name: resource.h1, path: resourcePath(resource.slug) },
        ]}
      />

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:order-2 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate">
                <span className="inline-flex items-center gap-1.5 font-semibold text-navy-900">
                  <Clock aria-hidden className="size-4 text-energy-deep" />
                  {resource.readingMinutes} min read
                </span>
                <time dateTime={RESOURCES_MODIFIED}>Updated {formatDate(RESOURCES_MODIFIED)}</time>
              </p>
              {toc.length > 0 && (
                <nav aria-label="On this page" className="hidden lg:block">
                  <p className="text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">On this page</p>
                  <ol className="mt-3 border-t border-line">
                    {toc.map((entry) => (
                      <li key={entry.id} className="border-b border-line">
                        <a href={`#${entry.id}`} className="block py-2 text-sm leading-5 font-semibold text-navy-900 hover:text-energy-ink">
                          {entry.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              {(services.length > 0 || resource.relatedPages.length > 0) && (
                <div className="hidden rounded-xl bg-navy-900 p-6 text-mist lg:block">
                  <p className="text-xs font-bold tracking-[0.16em] text-energy uppercase">Related services</p>
                  <ul className="mt-3 space-y-1">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link href={servicePath(service.slug)} className="group flex items-start gap-2 py-1.5 text-sm font-semibold text-white hover:text-energy">
                          <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0 text-energy transition-transform group-hover:translate-x-0.5" />
                          {service.title}
                        </Link>
                      </li>
                    ))}
                    {resource.relatedPages.map((page) => (
                      <li key={page.href}>
                        <Link href={page.href} className="group flex items-start gap-2 py-1.5 text-sm font-semibold text-white hover:text-energy">
                          <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0 text-energy transition-transform group-hover:translate-x-0.5" />
                          {page.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          <article className="min-w-0 lg:order-1 lg:col-span-8">
            {content}

            {(services.length > 0 || resource.relatedPages.length > 0) && (
              <div className="mt-12 rounded-xl bg-navy-900 p-6 text-mist lg:hidden">
                <p className="text-xs font-bold tracking-[0.16em] text-energy uppercase">Related services</p>
                <ul className="mt-3 space-y-1">
                  {[...services.map((s) => ({ href: servicePath(s.slug), label: s.title })), ...resource.relatedPages].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-start gap-2 py-1.5 text-sm font-semibold text-white hover:text-energy">
                        <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0 text-energy" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resource.sources.length > 0 && (
              <section aria-labelledby="references" className="mt-14 border-t border-line pt-8">
                <h2 id="references" className="text-lg font-extrabold text-navy-900">
                  References
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate">
                  Technical sources consulted. Standards are paid documents; confirm clauses against the licensed edition named in
                  your project specification.
                </p>
                <ol className="mt-4 space-y-2 text-sm leading-6">
                  {resource.sources.map((source) => (
                    <li key={source.url} className="flex gap-2">
                      <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep" />
                      <span>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-900 hover:text-energy-ink hover:underline">
                          {source.title}
                        </a>
                        <span className="text-slate"> · {source.publisher}</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper">
          <div className="container-site section-y">
            <SectionHeading slab title="Related Guides" />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={resourcePath(guide.slug)}
                    className="lift group flex h-full flex-col rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)] hover:shadow-[0_14px_34px_rgb(0_36_56/0.12)]"
                  >
                    <span className="text-xs font-bold tracking-[0.12em] text-teal-700 uppercase">
                      {resourceHubs.find((h) => h.id === guide.hub)?.title}
                    </span>
                    <span className="mt-2 text-lg leading-snug font-extrabold text-navy-900 group-hover:text-energy-ink">{guide.h1}</span>
                    <span className="mt-2 flex-1 text-sm leading-6 text-ink">{guide.description}</span>
                    <span className="mt-4 text-xs font-semibold text-slate">{guide.readingMinutes} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/resources" className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-energy-ink">
              <ArrowRight aria-hidden className="size-4 text-energy-deep transition-transform group-hover:translate-x-1" />
              All resources
            </Link>
          </div>
        </section>
      )}

      <CTASection
        title="Have a package"
        accent="to discuss?"
        copy="Share your scope, drawings and required deliverables. We can review the information available and clarify the proposed production package."
        serviceSlug={resource.relatedServices[0]}
      />
    </>
  );
}

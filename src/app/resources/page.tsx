import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { resourceHubs, resourcePath, resourcesInHub } from "@/lib/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Structural Detailing Resources",
  description:
    "Practical guides on structural steel detailing, drawing types, detailing inputs, outsourcing, Tekla deliverables, rebar and BBS, material take-offs, brownfield drawings and RFQs.",
  path: "/resources",
  image: "/images/drawings-qaqc.jpg",
});

const hubAnchor = (id: string) => `hub-${id.toLowerCase()}`;

export default function ResourcesPage() {
  return (
    <>
      <Hero
        eyebrow="Resources"
        title="Structural Detailing"
        accent="Resources & Guides"
        intro="Practical guides for EPC contractors, consultancies and fabricators: what detailing includes, what to provide, who is responsible for what, and how to scope and buy a package."
        image="/images/drawings-qaqc.jpg"
        imageAlt="Engineering drawings on a desk with drafting pencils and a scale rule"
        crumbs={[{ name: "Resources", path: "/resources" }]}
      />

      <nav aria-label="Resource topics" className="border-b border-line bg-white">
        <ul className="container-site flex gap-x-6 overflow-x-auto py-2 text-xs font-bold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase">
          {resourceHubs.map((hub) => (
            <li key={hub.id}>
              <a href={`#${hubAnchor(hub.id)}`} className="inline-flex min-h-11 items-center transition-colors hover:text-teal-700">
                {hub.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {resourceHubs.map((hub, i) => (
        <section key={hub.id} id={hubAnchor(hub.id)} className={`scroll-mt-20 ${i % 2 === 0 ? "bg-white" : "bg-paper"}`}>
          <div className="container-site section-y">
            <SectionHeading slab title={hub.title} intro={hub.text} />
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {resourcesInHub(hub.id).map((resource, n) => (
                <li key={resource.slug} data-reveal style={{ "--reveal-delay": `${(n % 2) * 70}ms` } as React.CSSProperties}>
                  <Link
                    href={resourcePath(resource.slug)}
                    className={`lift group flex h-full flex-col rounded-xl p-7 ${
                      i % 2 === 0 ? "border border-line bg-white" : "bg-white shadow-[0_6px_20px_rgb(0_36_56/0.07)]"
                    } hover:shadow-[0_14px_34px_rgb(0_36_56/0.12)]`}
                  >
                    <h2 className="text-xl leading-snug font-extrabold text-navy-900 group-hover:text-energy-ink">{resource.h1}</h2>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-ink">{resource.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy-900">
                      <ArrowRight aria-hidden className="size-4 text-energy-deep transition-transform group-hover:translate-x-1" />
                      Read the guide
                      <span className="font-semibold text-slate">· {resource.readingMinutes} min</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CTASection
        title="Ready to scope"
        accent="a package?"
        copy="Share your scope, drawings and required deliverables. We can review the information available and clarify the proposed production package."
      />
    </>
  );
}

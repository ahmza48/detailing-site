import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { applications } from "@/lib/applications";
import { industryBySlug, industryPath } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, servicePath } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Structures & Applications",
  description:
    "Find structural drafting, modelling, detailing and MTO services by structure type: pipe racks, platforms, equipment supports, industrial buildings, foundations, brownfield alterations and offshore packages.",
  path: "/applications",
  image: "/images/onshore-pipe-rack.jpg",
});

export default function ApplicationsPage() {
  return (
    <>
      <Hero
        eyebrow="Structures & Applications"
        title="Find the Right Service"
        accent="by Structure Type"
        intro="Start from the structure you are dealing with. Each one shows which services produce its drawings, models, fabrication information and quantities."
        image="/images/onshore-pipe-rack.jpg"
        imageAlt="Steel pipe rack and process structures at an onshore plant"
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: "Structures & Applications", path: "/applications" },
        ]}
      />

      <nav aria-label="Structure types" className="border-b border-line bg-white">
        <ul className="container-site flex gap-x-6 overflow-x-auto py-2 text-xs font-bold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase">
          {applications.map((application) => (
            <li key={application.id}>
              <a href={`#${application.id}`} className="inline-flex min-h-11 items-center transition-colors hover:text-teal-700">
                {application.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Applications Are a Way In,"
            accent="Not Separate Services"
            intro="A pipe rack can need a GA drawing, a 3D model, shop and erection drawings and an MTO. Each of those belongs to one service; the paths below show how they connect, so you can scope exactly what you need."
          />
        </div>
      </section>

      {applications.map((application, index) => (
        <section
          key={application.id}
          id={application.id}
          aria-labelledby={`${application.id}-title`}
          className={index % 2 === 0 ? "bg-paper" : "bg-white"}
        >
          <div className="container-site section-y grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div data-reveal="image" className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-900 shadow-[0_12px_34px_rgb(0_26_41/0.18)] lg:col-span-5">
              <Image src={application.image} alt={application.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="lg:col-span-7">
              <h2 id={`${application.id}-title`} data-reveal className="display-md text-balance text-navy-900 uppercase">
                {application.title}
              </h2>
              <ul data-reveal className="mt-5 flex flex-wrap gap-2.5">
                {application.examples.map((example) => (
                  <li key={example} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-900">
                    {example}
                  </li>
                ))}
              </ul>
              <h3 data-reveal className="mt-8 text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">
                Documentation path
              </h3>
              <ol data-reveal className="mt-3 border-t border-line">
                {application.path.map((step, i) => {
                  const service = step.service ? serviceBySlug(step.service) : undefined;
                  const industry = step.industry ? industryBySlug(step.industry) : undefined;
                  const href = service ? servicePath(service.slug) : industry ? industryPath(industry.slug) : "/services";
                  const label = service?.title ?? industry?.name ?? "";
                  return (
                    <li key={`${label}-${i}`} className="border-b border-line">
                      <Link href={href} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 py-3.5 sm:grid-cols-[2.5rem_14rem_1fr_auto]">
                        <span className="text-xs font-bold text-energy-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[0.9375rem] font-bold text-navy-900 group-hover:text-energy-ink">{step.role}</span>
                        <span className="col-start-2 text-sm text-slate sm:col-start-3">{label}</span>
                        <ArrowRight
                          aria-hidden
                          className="col-start-3 row-start-1 size-4 text-energy-deep transition-transform group-hover:translate-x-1 sm:col-start-4"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>
      ))}

      <CTASection
        title="Have a structure that needs"
        accent="drawings, models or detailing?"
        copy="Tell us the structure, the inputs you have and what you need to receive. We will scope the right combination of services."
      />
    </>
  );
}

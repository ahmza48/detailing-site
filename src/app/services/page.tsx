import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MoveRight, Repeat } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ImageBand } from "@/components/ImageBand";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicePreview } from "@/components/ServicePreview";
import { applications } from "@/lib/applications";
import { industries, industryPath } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
import { serviceGroups, services, servicesInGroup } from "@/lib/services";
import { outsourcingLink } from "@/lib/site";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "Structural Detailing, CAD Drafting & Modelling Services",
  description:
    "Explore engineering production services: structural CAD drawings, plant modelling, fabrication detailing, rebar schedules, modifications and material take-offs.",
  path: "/services",
  image: "/images/services-overview.jpg",
});

/** Typical information progression (spec 3.4), simplified for the hub. */
const flow = [
  { label: "Inputs & scope review", note: "Design inputs, standards, clarifications" },
  { label: "Drawings ⇄ Models", note: "S01 and S02 in either order or in parallel" },
  { label: "Steel or RCC detailing", note: "S03 and S04 are parallel disciplines" },
  { label: "MTO & documentation", note: "S06, prepared throughout production" },
  { label: "Checks & controlled issue", note: "Review loop back to drawings and models" },
];

/** What is agreed before a package starts (spec v2 §6, "How We Define a Work Package"). */
const packageDefinition = [
  { title: "Deliverables", text: "The drawings, models, schedules and reports to be issued, and what is excluded." },
  { title: "Input status", text: "Which approved drawings, models and data the package is built from, with their revisions." },
  { title: "Software & version", text: "Platforms, versions and native or exchange formats that can be supported for the package." },
  { title: "Standards & procedures", text: "Project specifications, applicable editions, drawing conventions and client procedures." },
  { title: "Interfaces", text: "Discipline, vendor and fabricator interfaces, and who resolves conflicts between them." },
  { title: "Reviews & changes", text: "Milestone reviews, comment cycles, revision allowances and how scope changes are handled." },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Services"
        title="Civil & Structural Drafting, 3D Modelling"
        accent="and Structural Detailing Services"
        intro="Engineering production and documentation support for energy and industrial projects. Each service can be commissioned on its own or combined into an agreed subcontract drawing or model package."
        image="/images/services-overview.jpg"
        imageAlt="Multi-level steel process structure with large-bore piping"
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <ButtonLink href="/contact">Request a Quote</ButtonLink>
        <ButtonLink href="/engineering-outsourcing" variant="light">
          Engineering Outsourcing
        </ButtonLink>
      </Hero>

      {/* Service index by group */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Six Technical Service Areas"
            intro="Structural drawing development, 3D structural and plant model support, steel shop and erection detailing, reinforced concrete and rebar documentation, brownfield modifications, and material and engineering documentation. Each is developed from approved design information and aligned with the project's technical, file-format and revision requirements."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {serviceGroups.map((group, g) => (
              <div key={group.id} data-reveal style={{ "--reveal-delay": `${g * 70}ms` } as React.CSSProperties} className="rounded-xl bg-paper p-6">
                <h3 className="text-xs font-bold tracking-[0.14em] text-teal-700 uppercase">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink">{group.text}</p>
                <ul className="mt-4 space-y-2">
                  {servicesInGroup(group.id).map((service) => (
                    <li key={service.slug}>
                      <a
                        href={`#${service.slug}`}
                        className="group flex min-h-11 items-center gap-3 rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy-900 transition-colors hover:text-energy-ink"
                      >
                        <span className="text-xs text-energy-deep tabular-nums">{service.id.slice(1)}</span>
                        <span className="flex-1">{service.title}</span>
                        <ArrowRight aria-hidden className="size-4 text-energy-deep transition-transform group-hover:translate-x-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href="/engineering-outsourcing"
            data-reveal
            className="lift group mt-5 flex flex-col gap-4 rounded-xl bg-navy-900 p-6 text-mist sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <span>
              <span className="block text-xs font-bold tracking-[0.14em] text-energy uppercase">Engagement route</span>
              <span className="mt-1 block text-lg font-extrabold text-white">{outsourcingLink.label}</span>
              <span className="mt-1 block max-w-2xl text-sm leading-6 text-haze">
                Subcontract a defined drawing, modelling, detailing or documentation package from any of the six service
                lines, with inputs, review responsibilities and handover agreed up front.
              </span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
              How outsourcing works
              <ArrowRight aria-hidden className="size-4 text-energy transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Information progression */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="How the Services Fit Together"
            intro="A typical assignment starts with approved engineering requirements and reference drawings. Arrangements and models establish the geometry, then steel fabrication details or concrete reinforcement packages are developed, with schedules, checks, comments and issue registers throughout. Not every project includes every service, and some stages run in parallel."
          />
          <ol data-reveal className="mt-12 grid gap-3 lg:grid-cols-5">
            {flow.map((step, i) => (
              <li key={step.label} className="relative flex flex-col rounded-xl bg-white p-5 shadow-[0_6px_20px_rgb(0_36_56/0.07)]">
                <span className="text-xs font-bold text-energy-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-2 text-base font-extrabold text-navy-900">{tc(step.label)}</span>
                <span className="mt-1 text-sm leading-6 text-ink">{step.note}</span>
                {i < flow.length - 1 && (
                  <MoveRight aria-hidden className="absolute top-1/2 -right-3 z-10 hidden size-5 -translate-y-1/2 text-energy-deep lg:block" />
                )}
              </li>
            ))}
          </ol>
          <p data-reveal className="mx-auto mt-6 flex max-w-3xl items-start justify-center gap-2 text-center text-sm leading-6 text-slate">
            <Repeat aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep" />
            Review comments loop back to drawings and models. Brownfield packages (S05) start from existing records and
            can draw on every other service. Structural design calculations and approvals sit outside this workflow.
          </p>
        </div>
      </section>

      {/* Editorial blocks, grouped */}
      {serviceGroups.map((group) => (
        <div key={group.id}>
          <div className="bg-navy-900 text-white">
            <div className="container-site pt-14 pb-10 lg:pt-20">
              <SectionHeading slab title={group.title} intro={group.text} onDark />
            </div>
          </div>
          {servicesInGroup(group.id).map((service) => (
            <ServicePreview key={service.slug} service={service} index={services.indexOf(service)} />
          ))}
        </div>
      ))}

      {/* How a work package is defined */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              slab
              title="How We Define a Work Package"
              intro="Before work begins, each package is defined in writing so both teams know what will be produced, from what, and how changes are handled."
            />
            <ArrowLink href="/quality-delivery" className="mt-6">
              Quality & Delivery
            </ArrowLink>
          </div>
          <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
            {packageDefinition.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties}
                className="rounded-xl bg-white p-5 shadow-[0_4px_16px_rgb(0_36_56/0.06)]"
              >
                <h3 className="text-base font-extrabold text-navy-900">{tc(item.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-ink">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Applications + industries */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              slab
              title="Structures We Document"
              intro="Start from the structure you are dealing with. These are applications of the six services, not additional services."
            />
            <ul data-reveal className="mt-6 border-t border-line">
              {applications.map((application) => (
                <li key={application.id} className="border-b border-line">
                  <Link
                    href={`/applications#${application.id}`}
                    className="group flex min-h-12 items-center justify-between gap-4 py-2 text-[0.9375rem] font-bold text-navy-900 hover:text-energy-ink"
                  >
                    {tc(application.title)}
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-energy-deep transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading slab title="Find by Industry" intro="Onshore, offshore, refining and industrial environments." />
            <ul data-reveal className="mt-6 border-t border-line">
              {industries.map((industry) => (
                <li key={industry.slug} className="border-b border-line">
                  <Link
                    href={industryPath(industry.slug)}
                    className="group flex min-h-12 items-center justify-between gap-4 py-2 text-[0.9375rem] font-bold text-navy-900 hover:text-energy-ink"
                  >
                    {industry.name}
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-energy-deep transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <ArrowLink href="/capabilities/codes-standards" className="mt-6">
              How project standards are applied
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Not sure */}
      <ImageBand
        title="Need Additional Capacity"
        accent="or a Different Scope?"
        image="/images/drawings-qaqc.jpg"
        imageAlt="Engineering drawings on a desk with drafting pencils and a scale rule"
        actions={
          <>
            <ButtonLink href="/contact?service=mixed">Describe Your Scope</ButtonLink>
            <ArrowLink href="/engineering-outsourcing" onDark>
              Engineering outsourcing
            </ArrowLink>
          </>
        }
      >
        <p>
          Tell us what you have (sketches, approved drawings, a model or existing records) and what you need to receive.
          We will recommend the right service or combination, or tell you plainly if the scope sits outside our civil and
          structural focus.
        </p>
        <p>
          Related requirements, such as specialist modelling, scanning-related drawing updates, BIM coordination or site
          service drawings, are assessed individually where the expertise, software and inputs are available.
        </p>
      </ImageBand>

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Check, Factory, FileLock2, HardHat, Ruler } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { engagementSteps } from "@/lib/delivery";
import { pageMetadata } from "@/lib/seo";
import { servicePath, type ServiceSlug } from "@/lib/services";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "Engineering Drafting & Structural Detailing Outsourcing",
  description:
    "Outsourced structural CAD drafting, TEKLA modelling, steel detailing and engineering documentation for EPC contractors, consultancies and fabricators.",
  path: "/engineering-outsourcing",
  image: "/images/capabilities-overview.jpg",
  keywords: ["structural detailing outsourcing", "subcontract steel detailing", "outsourced Tekla modelling", "CAD drafting outsourcing"],
});

const quoteHref = "/contact?service=engineering-outsourcing";

/** Typical subcontract packages (spec 4, outsourcing item 3). */
const packages: { service: ServiceSlug; title: string; text: string }[] = [
  { service: "civil-structural-drafting", title: "Civil and structural drawing packages", text: "GA, plans, sections and foundation layouts from your approved design." },
  { service: "plant-structural-3d-modelling", title: "TEKLA and structural model packages", text: "Model development or updates to your modelling rules, without drawings unless scoped." },
  { service: "steel-detailing-fabrication", title: "Steel detailing packages", text: "Assembly, single-part and erection drawings with lists for fabrication." },
  { service: "rcc-reinforcement-detailing", title: "RCC and reinforcement packages", text: "Concrete details, rebar placing drawings and bar bending schedules." },
  { service: "brownfield-structural-modifications", title: "Brownfield revision packages", text: "Modification drawings, model updates and as-builts for existing plant." },
  { service: "material-takeoffs-documentation", title: "MTO and documentation backlogs", text: "Quantities, registers, redline incorporation and controlled re-issue." },
];

const audiences = [
  { icon: Building2, title: "EPC contractors", text: "Extra structural production capacity during detailed engineering peaks." },
  { icon: Ruler, title: "Engineering consultancies", text: "Drawing, modelling and documentation support for your designers." },
  { icon: Factory, title: "Steel fabricators", text: "Shop and erection drawings and lists from approved design packages." },
  { icon: HardHat, title: "Industrial contractors", text: "Modification drawings and as-builts for work on existing plant." },
];

const agreedUpFront = [
  { title: "Client inputs", text: "The approved drawings, models, specifications and revisions the package is produced from." },
  { title: "Design ownership", text: "Design decisions and approvals stay with your responsible engineer; we produce the documentation." },
  { title: "Review responsibilities", text: "Our production checks, your review cycle, and how comments are returned." },
  { title: "Software and formats", text: "Platform, version, native formats and exchange files, confirmed before work starts." },
  { title: "Codes and standards", text: "The standards, editions and client specifications recorded in the scope of work." },
  { title: "Changes", text: "How change instructions are issued, assessed and incorporated." },
];

const engagementOptions = [
  { title: "Fixed-scope package", text: "A defined set of deliverables against agreed inputs." },
  { title: "Deliverable or milestone-based", text: "Packages issued and accepted in agreed stages." },
  { title: "Recurring work packages", text: "Repeat packages for an ongoing programme or backlog." },
];

export default function OutsourcingPage() {
  return (
    <>
      <Hero
        eyebrow="Engineering Outsourcing & Subcontract Support"
        title="Engineering Drafting, Modelling"
        accent="& Steel Detailing Outsourcing"
        intro="Subcontract a defined structural drawing, modelling, detailing or documentation package. You keep design authority; we deliver the production work to your standards and review cycle."
        image="/images/capabilities-overview.jpg"
        imageAlt="Structural steel framing seen from below"
        crumbs={[
          { name: "Services", path: "/services" },
          { name: "Engineering Outsourcing & Subcontract Support", path: "/engineering-outsourcing" },
        ]}
      >
        <ButtonLink href={quoteHref}>Request an Outsourcing Quote</ButtonLink>
        <ButtonLink href="/services" variant="light">
          View Services
        </ButtonLink>
      </Hero>

      {/* What can be taken off your team */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="What We Can Take Off Your Team"
            intro="Defined technical packages from any of the six service lines. You subcontract the drawing or modelling work, not the engineering design."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <li key={pkg.service} data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <Link
                  href={servicePath(pkg.service)}
                  className="lift group flex h-full flex-col rounded-xl bg-paper p-7 hover:shadow-[0_14px_34px_rgb(0_36_56/0.12)]"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-navy-900 text-sm font-bold text-energy tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-5 text-lg leading-snug font-extrabold text-navy-900 group-hover:text-energy-ink">{tc(pkg.title)}</span>
                  <span className="mt-2 flex-1 text-[0.9375rem] leading-7 text-ink">{pkg.text}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy-900">
                    <ArrowRight aria-hidden className="size-4 text-energy-deep transition-transform group-hover:translate-x-1" />
                    Service details
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-navy-900 text-white">
        <div className="container-site section-y">
          <SectionHeading slab title="Who This Is For" onDark />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, i) => (
              <li
                key={audience.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="rounded-xl bg-white/8 p-6"
              >
                <audience.icon aria-hidden className="size-7 text-energy" />
                <h3 className="mt-4 text-lg font-extrabold">{audience.title}</h3>
                <p className="mt-2 text-sm leading-6 text-haze">{audience.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agreed up front */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Agreed Before Work Starts"
            intro="Every package starts from a written scope, so responsibilities are clear before the first drawing is produced."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agreedUpFront.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                className="rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)]"
              >
                <Check aria-hidden className="size-5 text-energy-deep" />
                <h3 className="mt-3 text-base font-extrabold text-navy-900">{tc(item.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-ink">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Engagement + confidentiality */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-5 lg:grid-cols-2">
          <div data-reveal className="rounded-xl border border-line p-7 sm:p-9">
            <p className="eyebrow text-teal-700">Engagement options</p>
            <h3 className="mt-2 text-xl font-extrabold text-navy-900">How Packages Can Be Structured</h3>
            <ul className="mt-6">
              {engagementOptions.map((option) => (
                <li key={option.title} className="border-t border-line py-4">
                  <p className="font-bold text-navy-900">{tc(option.title)}</p>
                  <p className="mt-1 text-sm leading-6 text-ink">{option.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate">
              The engagement model, schedule and price are agreed for each package in the written proposal. Capacity is
              confirmed per request; no fixed turnaround is assumed.
            </p>
          </div>
          <div data-reveal className="rounded-xl bg-navy-800 p-7 text-mist sm:p-9">
            <FileLock2 aria-hidden className="size-7 text-energy" />
            <h3 className="mt-4 text-xl font-extrabold text-white">Confidentiality and File Exchange</h3>
            <ul className="mt-5 space-y-3 text-[0.9375rem] leading-7">
              <li className="flex gap-3">
                <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-energy" />
                An initial enquiry needs no confidential drawings; a scope summary is enough to start.
              </li>
              <li className="flex gap-3">
                <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-energy" />
                A non-disclosure agreement can be put in place before project files are shared.
              </li>
              <li className="flex gap-3">
                <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-energy" />
                Project files are exchanged through your document system or a transfer method agreed with you.
              </li>
              <li className="flex gap-3">
                <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-energy" />
                Project data is used only for your package; intellectual property terms follow the agreed contract.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading centered title="From Enquiry to Handover" intro="How an outsourced package proceeds." />
          <div className="mt-14">
            <ProcessSteps steps={engagementSteps} />
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading slab title="Before You Commission" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              Review the professional experience behind the team, the standards framework we work within, and how every
              package is checked and handed over.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-6">
            {[
              { href: "/project-experience", label: "Professional experience" },
              { href: "/capabilities/codes-standards", label: "Codes & standards" },
              { href: "/quality-delivery", label: "Quality & delivery" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="lift group flex h-full flex-col justify-between rounded-xl border border-line p-5 transition-colors hover:border-energy-deep"
                >
                  <span className="text-base font-extrabold text-navy-900 group-hover:text-energy-ink">{link.label}</span>
                  <ArrowRight aria-hidden className="mt-4 size-4 text-energy-deep transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-12">
            <ArrowLink href={quoteHref}>Request an outsourcing quote</ArrowLink>
          </div>
        </div>
      </section>

      <CTASection
        title="Have a drawing, model or detailing package"
        accent="to outsource?"
        copy="Send the scope of work, the design inputs you have and your target schedule. Engineering Outsourcing is preselected on the enquiry form; tick the service lines involved."
        serviceSlug="engineering-outsourcing"
      />
    </>
  );
}

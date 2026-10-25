import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Check, Factory, FileLock2, HardHat, Plus, Ruler } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ScopeChecklist } from "@/components/ScopeChecklist";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, servicePath, type ServiceSlug } from "@/lib/services";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "Engineering Drafting & Detailing Outsourcing",
  description:
    "Subcontract structural CAD, Tekla modelling, steel detailing, rebar drawing and revision work packages for EPC contractors, consultancies and fabricators.",
  path: "/engineering-outsourcing",
  image: "/images/capabilities-overview.jpg",
  keywords: ["structural detailing outsourcing", "subcontract steel detailing", "outsourced Tekla modelling", "CAD drafting outsourcing"],
});

const quoteHref = "/contact?service=engineering-outsourcing";

/** Services available for outsourcing (spec v2 §7.1): short links, not duplicated service copy. */
const packages: { service: ServiceSlug; title: string; text: string }[] = [
  { service: "civil-structural-drafting", title: "CAD drafting", text: "Structural arrangements, foundation plans and drawing updates." },
  { service: "plant-structural-3d-modelling", title: "3D structural model production", text: "Tekla steel models, supported plant structure updates and model coordination." },
  { service: "steel-detailing-fabrication", title: "Steel detailing", text: "Assembly, part, shop and erection documentation and agreed fabrication reports." },
  { service: "rcc-reinforcement-detailing", title: "Concrete and rebar detailing", text: "Concrete details, reinforcement sheets and bar bending schedules." },
  { service: "brownfield-structural-modifications", title: "Brownfield revisions", text: "Modifications to existing drawings, replacement steel and record updates." },
  { service: "material-takeoffs-documentation", title: "MTO and documentation", text: "Material schedules, drawing registers and review-comment processing." },
];

/** Outsourced production scope (owner brief, Oct 2026). */
const outsourcingScope = [
  {
    heading: "Production Work",
    items: [
      "Outsourced civil and structural CAD drafting",
      "Outsourced structural steel detailing",
      "Outsourced Tekla modelling and drawing production",
      "Fabrication and erection drawing packages",
      "Concrete structural drafting and reinforcement detailing",
      "Material take-offs, BOMs and quantity schedules",
      "Brownfield drawing and model revision support",
      "Legacy model and drawing production support",
    ],
  },
  {
    heading: "Ways of Working",
    items: [
      "Drawing backlog reduction",
      "Additional production capacity during project peaks",
      "Dedicated CAD and Tekla resources, subject to availability",
      "Project-based or deliverable-based subcontracting",
      "Long-term outsourced production support",
      "Remote drafting and detailing support for consultancies, EPC contractors and steel fabricators",
      "White-label production support, where contractually agreed",
      "Hourly, daily, monthly, milestone-based or project-based arrangements, subject to agreement",
      "Defined scopes of work, deliverables, review cycles and revision responsibilities",
    ],
  },
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

/** Engagement arrangements (spec v2 §7.2). Offered subject to the expertise available for each request. */
const engagementOptions = [
  {
    title: "Fixed-scope work package",
    scope: "Defined models, drawings, quantities and review deliverables.",
    defined: "Inputs, inclusions and exclusions, revision allowances, milestones and acceptance criteria.",
  },
  {
    title: "Drawing or revision backlog",
    scope: "Batch drafting, redline implementation and drawing conversion.",
    defined: "Number of sheets, complexity, source condition, revision tags and expected throughput.",
  },
  {
    title: "Milestone-based support",
    scope: "A multi-stage detailing or model package.",
    defined: "Milestone submissions, review hold points, the technical query process and authorised scope changes.",
  },
  {
    title: "Resource-based support, where resourced",
    scope: "Recurring drafting or modelling support.",
    defined: "Competence, software and licence arrangements, availability, hours, confidentiality and supervision.",
  },
];

/** From RFQ to an agreed work package (spec v2 §7.3). */
const outsourcingSteps = [
  { title: "Share the scope", text: "Project, deliverables, input maturity, software and target dates." },
  { title: "Technical clarification", text: "Drawing and model types, formats, specifications, interfaces and the design engineer." },
  { title: "Statement of work", text: "Inclusions, exclusions, review cycles, checking, pricing basis and change handling." },
  { title: "Package production", text: "Produced to agreed conventions; queries raised for unresolved design data." },
  { title: "Review and submission", text: "Production checks, revisions issued and authorised comments incorporated." },
  { title: "Close-out", text: "Final register, revisioned files, quantity reports and models where included." },
];

const faqs = [
  {
    q: "Do we have to outsource a whole project?",
    a: "No. Depending on your requirements and resource availability, the scope may be a defined group of drawings, a model or a complete detailing package.",
  },
  {
    q: "Can your team follow our title blocks and numbering?",
    a: "Client templates and procedures are assessed during scope definition and incorporated when compatible and agreed.",
  },
  {
    q: "Who approves engineering design?",
    a: "The responsible engineer or design authority defined by the project contract. Drafting and detailing alone do not provide engineering sign-off.",
  },
  {
    q: "What if design information changes?",
    a: "Changes are evaluated against the agreed scope and revision allowances before they are incorporated and resubmitted.",
  },
];

export default function OutsourcingPage() {
  return (
    <>
      <Hero
        eyebrow="Engineering Outsourcing & Subcontract Support"
        title="Engineering Drafting, Modelling"
        accent="& Detailing Outsourcing"
        intro="Additional technical capacity for a defined drawing, model or detailing package, without expanding your permanent team. Assignments are accepted subject to the expertise available, your project requirements and agreed responsibilities; you keep design authority."
        image="/images/capabilities-overview.jpg"
        imageAlt="Structural steel framing seen from below"
        crumbs={[
          { name: "Services", path: "/services" },
          { name: "Engineering Outsourcing & Subcontract Support", path: "/engineering-outsourcing" },
        ]}
      >
        <ButtonLink href={quoteHref}>Request an Outsourcing Proposal</ButtonLink>
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
            intro="Defined technical packages from any of the six service areas: a clearly specified deliverable package, a backlog of drawing revisions or a negotiated recurring arrangement. You subcontract the drawing or modelling work, not the engineering design."
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
                  <span className="mt-4 inline-flex items-start gap-2 text-sm font-bold text-navy-900">
                    <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0 text-energy-deep transition-transform group-hover:translate-x-1" />
                    {serviceBySlug(pkg.service)?.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
            <div data-reveal className="lg:col-span-4">
              <h3 className="text-lg font-extrabold text-navy-900">Outsourced Production Scope</h3>
              <p className="mt-3 text-[0.9375rem] leading-7 text-ink">
                What an extended-team or subcontract arrangement can cover, and how it can be structured.
              </p>
              <p className="mt-4 text-sm leading-6 text-slate">
                Related requirements, such as specialist modelling, scanning-related drawing updates, BIM coordination or
                civil infrastructure and site-service drawings, are assessed individually and accepted only where the
                required expertise, software, inputs and resources are available.
              </p>
            </div>
            <div data-reveal className="lg:col-span-8">
              <ScopeChecklist groups={outsourcingScope} />
            </div>
          </div>
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
                  <p className="mt-1 text-sm leading-6 text-ink">{option.scope}</p>
                  <p className="mt-1 text-sm leading-6 text-slate">
                    <span className="font-semibold text-navy-900">Defined up front:</span> {option.defined}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate">
              Not every arrangement suits every request. The engagement model, schedule and price are agreed for each
              package in the written proposal; capacity is confirmed per request and no fixed turnaround is assumed.
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
                Drawings, models and data are shared for technical review and quotation only through channels and
                permissions agreed with you.
              </li>
              <li className="flex gap-3">
                <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-energy" />
                Confidentiality agreements and controlled file transfer can be discussed before sensitive work packages
                are received.
              </li>
              <li className="flex gap-3">
                <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-energy" />
                Client drawings, models and project details are not published without authorisation.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="From Your RFQ to an Agreed Work Package"
            intro="How an outsourced package proceeds, from the first scope summary to close-out."
          />
          <div className="mt-14">
            <ProcessSteps steps={outsourcingSteps} />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Common Questions" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              What buyers usually ask before subcontracting a drawing, model or detailing package.
            </p>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                open={i === 0}
                className="group/faq rounded-xl bg-paper"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl px-6 py-5 text-base font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-energy-deep transition-transform duration-300 group-open/faq:rotate-45">
                    <Plus aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[0.9375rem] leading-7 text-ink">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading slab title="Before You Commission" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              Review the professional experience behind the team, how project standards are applied, and how packages
              are checked and handed over.
            </p>
          </div>
          <ul className="grid gap-4 self-start sm:grid-cols-3 lg:col-span-6">
            {[
              { href: "/project-experience", label: "Professional experience" },
              { href: "/capabilities/codes-standards", label: "Project standards" },
              { href: "/quality-delivery", label: "Quality & delivery" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="lift group flex h-full flex-col justify-between rounded-xl border border-line bg-white p-5 transition-colors hover:border-energy-deep"
                >
                  <span className="text-base font-extrabold text-navy-900 group-hover:text-energy-ink">{link.label}</span>
                  <ArrowRight aria-hidden className="mt-4 size-4 text-energy-deep transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-12">
            <ArrowLink href={quoteHref}>Request an outsourcing proposal</ArrowLink>
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

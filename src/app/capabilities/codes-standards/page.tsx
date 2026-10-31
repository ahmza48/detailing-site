import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Info, Plus } from "lucide-react";
import { ArrowLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { standardsStatement } from "@/lib/site";
import { tc } from "@/lib/text";
import { serviceBySlug, servicePath, services } from "@/lib/services";
import { standards, type StandardReference } from "@/lib/standards";

export const metadata: Metadata = pageMetadata({
  title: "Engineering Standards & Project Specifications",
  description:
    "How structural drafting, modelling and detailing packages follow agreed client specifications, applicable standards and controlled documentation procedures.",
  path: "/capabilities/codes-standards",
  image: "/images/drawings-qaqc.jpg",
});

/** Requirement families (spec v2 §9.2): standards organised by requirement, not by a closed list of codes. */
const requirementFamilies = [
  {
    title: "Structural design basis",
    contents: "Approved calculations and drawings, design criteria, design codes and the connection basis.",
    review: "References to the approved engineering information; design authority and changes remain as defined.",
  },
  {
    title: "Structural fabrication and erection",
    contents: "Steelwork tolerances, shop practice, welding and bolting specifications and part marking.",
    review: "Details and schedules consistent with the supplied requirements.",
  },
  {
    title: "Concrete and reinforcement",
    contents: "Approved concrete design, cover, lap and bar details, and bending and scheduling rules.",
    review: "Concrete detail drawings and BBS in the project-required conventions.",
  },
  {
    title: "Offshore and plant technical standards",
    contents: "Owner- and asset-specific structural, material, interface and documentation requirements.",
    review: "Scope-specific drawing and model constraints and interface references.",
  },
  {
    title: "Information and document management",
    contents: "Drawing numbering, title blocks, model exchange, file naming, reviews and issue status.",
    review: "Registers, file outputs, model coordinates and revision and transmittal format.",
  },
  {
    title: "Quality and approval procedures",
    contents: "Document checking, review hold points, RFIs and technical queries, and approvals.",
    review: "Internal production-review obligations and the named final approval authority.",
  },
];

/** Practical requirements workflow (spec v2 §9.4). */
const requirementsWorkflow = [
  { title: "Scope and inputs", text: "Client scope and approved engineering inputs received." },
  { title: "Identify requirements", text: "Applicable standards, editions and client specifications identified." },
  { title: "Rules and responsibilities", text: "Drawing and model rules, interfaces and responsibility matrix defined." },
  { title: "Clarifications", text: "Unclear inputs recorded and technical clarifications obtained." },
  { title: "Production", text: "Agreed drawings, models and schedules produced." },
  { title: "Checks and review", text: "Scope-based checks; authorised comments loop back to clarification." },
  { title: "Handover", text: "Accepted as contracted; final agreed handover." },
];

/** Responsibility matrix (spec v2 §9.5). Typical, always subject to the contract. */
const responsibilities = [
  ["Design basis, structural calculations and member sizing", "Client's engineer or appointed design authority, unless a qualified design scope is separately assigned"],
  ["Approved connection design or delegated connection engineering", "Responsible engineer or a contractually appointed qualified designer"],
  ["Drafting, detailing and model production", `${site.name}, within the agreed production scope`],
  ["Project-specific drawing and model consistency checks", "Assigned production checker under the agreed procedure"],
  ["Technical queries and resolution of missing data", "Clarified by the named engineering or client authorities"],
  ["Client review, acceptance and statutory approval", "Assigned client, engineer or authority according to the project contract"],
  ["Final record and as-built verification", `Responsible field, survey or construction authority supplying verified records; ${site.name} documents the agreed updates`],
];

/** Information typically agreed for each package. */
const registerFields = [
  "Scope and discipline",
  "Applicable standards and specifications",
  "Edition specified by the contract",
  "Client-specific departures",
  "Reference drawing and specification revisions",
  "Who supplies and approves the design",
  "Checker responsibility",
  "Clarifications and the agreed document hierarchy",
];

const faqs = [
  {
    q: "Can you work to our company standards instead of a particular international code?",
    a: "The applicable client and owner engineering standards, project specifications, drawing procedures and approved design criteria are evaluated at scope review. We confirm whether current personnel and software can meet the requested package before accepting it.",
  },
  {
    q: "Are you restricted to the codes mentioned on this website?",
    a: "No. No exhaustive list is intended. Applicability and deliverable responsibilities are determined by the contract and confirmed during review.",
  },
  {
    q: "Does a code-based drawing mean you certify the structural design?",
    a: "No. A drawing or model prepared to approved project documentation requirements is distinct from independently checking or approving calculations and structural adequacy.",
  },
  {
    q: "How are conflicts between owner specifications and published codes handled?",
    a: "The conflict is recorded as a technical query and an authorised project decision is obtained. We do not impose a universal hierarchy; contractual documents and the applicable law control it.",
  },
];

function StandardCard({ standard, index }: { standard: StandardReference; index: number }) {
  return (
    <li
      style={{ "--reveal-delay": `${(index % 2) * 70}ms` } as React.CSSProperties}
      className="flex flex-col rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)] ring-1 ring-line"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.08em] text-teal-700 uppercase">{standard.publisher}</p>
          <h4 className="mt-1 text-lg font-extrabold text-navy-900">{standard.identifier}</h4>
          <p className="text-sm font-semibold text-ink">{tc(standard.title)}</p>
        </div>
        {standard.sourceUrl && (
          <a
            href={standard.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-energy-ink hover:underline"
          >
            Publisher
            <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
      <p className="mt-4 text-sm leading-6 text-ink">{standard.context}</p>
      <dl className="mt-4 grid gap-3 border-t border-line pt-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[0.6875rem] font-bold tracking-[0.1em] text-slate uppercase">Responsibility</dt>
          <dd className="mt-1 font-semibold text-navy-900">{standard.responsibility}</dd>
        </div>
        <div>
          <dt className="text-[0.6875rem] font-bold tracking-[0.1em] text-slate uppercase">Relevant services</dt>
          <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {standard.relevantServices.length === 0 && <span className="text-slate">Organisational only</span>}
            {standard.relevantServices.length === services.length ? (
              <span className="font-semibold text-navy-900">All services</span>
            ) : (
              standard.relevantServices.map((slug) => {
                const service = serviceBySlug(slug);
                return service ? (
                  <Link key={slug} href={servicePath(slug)} className="font-semibold text-energy-ink hover:underline">
                    {service.title}
                  </Link>
                ) : null;
              })
            )}
          </dd>
        </div>
      </dl>
      <p className="mt-4 rounded-lg bg-paper px-4 py-3 text-xs leading-5 text-slate">{standard.caution}</p>
    </li>
  );
}

export default function CodesStandardsPage() {
  return (
    <>
      <Hero
        eyebrow="Technical Capabilities"
        title="Project-Specific Engineering Standards"
        accent="& Technical Requirements"
        intro="How the requirements that govern each package are identified, applied and checked, and who is responsible for what."
        image="/images/drawings-qaqc.jpg"
        imageAlt="Engineering drawings on a desk with drafting pencils and a scale rule"
        crumbs={[
          { name: "Technical Capabilities", path: "/capabilities" },
          { name: "Codes & Standards", path: "/capabilities/codes-standards" },
        ]}
      />

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading slab title="Working Within Your Project's Engineering Standards" />
            <p data-reveal className="mt-6 text-lg leading-8 font-semibold text-navy-900 sm:text-xl sm:leading-9">
              Projects apply different design codes, material and welding specifications, reinforcement detailing
              requirements, owner standards, EPC procedures and drawing conventions. We approach each package by
              identifying the requirements that apply to it, not by limiting work to a fixed list of published codes.
            </p>
            <p data-reveal className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              At the start of an assignment, the client-supplied design basis, project specifications, applicable
              editions, documentation procedures and interface requirements are reviewed for relevance to the drawings,
              models and schedules being produced. Technical queries are raised where source information or
              responsibilities are unclear. Where design calculations, independent engineering verification or
              professional approval are needed, those remain separately defined activities undertaken only by
              appropriately authorised personnel.
            </p>
          </div>
          <aside data-reveal className="lg:col-span-5">
            <div className="rounded-xl bg-navy-900 p-7 text-mist sm:p-9">
              <Info aria-hidden className="size-6 text-energy" />
              <h3 className="mt-4 text-lg font-extrabold text-white">Editions Are Project-Specific</h3>
              <p className="mt-3 text-[0.9375rem] leading-7">{standardsStatement}</p>
              <p className="mt-3 text-sm leading-6 text-haze">
                No edition is assumed. Client and project specifications normally take precedence within the agreed
                contract hierarchy.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Requirement families */}
      <section id="requirements" className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Standards Organised by Requirement"
            intro="The families of requirements a project typically defines, and what the team reviews for its assigned scope."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {requirementFamilies.map((family, i) => (
              <li
                key={family.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                className="flex flex-col rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)]"
              >
                <h3 className="text-lg leading-snug font-extrabold text-navy-900">{tc(family.title)}</h3>
                <p className="mt-4 text-[0.6875rem] font-bold tracking-[0.12em] text-teal-700 uppercase">Typical project documents</p>
                <p className="mt-1 text-sm leading-6 text-ink">{family.contents}</p>
                <p className="mt-4 text-[0.6875rem] font-bold tracking-[0.12em] text-teal-700 uppercase">What we review</p>
                <p className="mt-1 text-sm leading-6 text-ink">{family.review}</p>
              </li>
            ))}
          </ul>

          {/* Non-exhaustive examples (§9.3) */}
          <div data-reveal className="mt-10 rounded-xl bg-white p-6 shadow-[0_4px_16px_rgb(0_36_56/0.06)] sm:p-8">
            <p className="text-base leading-7 text-ink">
              Project specifications may reference AISC, ACI, AWS, ISO, British Standards, Eurocodes and asset-owner or
              EPC standards, among other applicable frameworks. This list is illustrative, not exhaustive; applicability
              and the required edition are defined by each project.
            </p>
            <details className="group/ex mt-5">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                <ChevronDown aria-hidden className="size-4 text-energy-deep transition-transform group-open/ex:rotate-180" />
                Show example references and how they are used
              </summary>
              <ul className="mt-6 grid gap-5 lg:grid-cols-2">
                {standards.map((standard, i) => (
                  <StandardCard key={standard.id} standard={standard} index={i} />
                ))}
              </ul>
            </details>
          </div>
        </div>
      </section>

      {/* Requirements workflow */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="Practical Technical Requirements Workflow"
            intro="Requirements are only useful if their applicability is clear. We identify the codes and specifications relevant to the assigned deliverables, confirm conventions and responsibility limits, capture technical queries and submit revision-controlled outputs for the agreed client review. A drawing check is never a substitute for engineering analysis or statutory certification."
          />
          <div className="mt-14">
            <ProcessSteps steps={requirementsWorkflow} />
          </div>
        </div>
      </section>

      {/* Responsibility matrix */}
      <section id="responsibility" className="bg-navy-900 text-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Responsibility Matrix"
            onDark
            intro="Typical responsibilities, always subject to the project contract."
          />
          <div className="mt-10 overflow-x-auto rounded-xl ring-1 ring-white/15">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Typical responsibilities for drafting, detailing and modelling packages</caption>
              <thead className="bg-white/8 text-xs tracking-[0.1em] text-haze uppercase">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Activity
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Typical responsibility
                  </th>
                </tr>
              </thead>
              <tbody>
                {responsibilities.map(([activity, owner]) => (
                  <tr key={activity} className="border-t border-white/10 align-top">
                    <th scope="row" className="px-5 py-4 font-bold">
                      {activity}
                    </th>
                    <td className="px-5 py-4 text-haze">{owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Agreed per package */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Agreed for Each Package" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              The information typically agreed with the client before production starts, so both teams work to the same
              basis. The exact record is defined in the scope of work.
            </p>
            <ArrowLink href="/quality-delivery" className="mt-6">
              Quality & Delivery
            </ArrowLink>
          </div>
          <ul data-reveal className="grid gap-x-8 border-t border-line sm:grid-cols-2 lg:col-span-7">
            {registerFields.map((field) => (
              <li key={field} className="flex items-center gap-3 border-b border-line py-3.5 text-[0.9375rem] font-medium text-ink">
                <Check aria-hidden className="size-4 shrink-0 text-energy-deep" />
                {tc(field)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Common Questions" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              How project standards, codes and approvals relate to drafting, modelling and detailing work.
            </p>
            <div className="mt-8">
              <RelatedGuides slugs={["structural-design-vs-detailing-responsibilities", "structural-detailing-input-checklist"]} />
            </div>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                open={i === 0}
                className="group/faq rounded-xl bg-white shadow-[0_4px_16px_rgb(0_36_56/0.06)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl px-6 py-5 text-base font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-energy-deep transition-transform duration-300 group-open/faq:rotate-45">
                    <Plus aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[0.9375rem] leading-7 text-ink">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Working to a specific"
        accent="code or client specification?"
        copy="Tell us which standards, specifications and editions apply to your package. Applicability and responsibilities are confirmed in the scope of work before production starts."
      />
    </>
  );
}

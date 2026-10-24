import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { ArrowLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { tc } from "@/lib/text";
import { serviceBySlug, servicePath, services } from "@/lib/services";
import { standardById, standardGroups, standards, type StandardReference } from "@/lib/standards";

export const metadata: Metadata = pageMetadata({
  title: "Engineering Codes, Standards & Project Specifications",
  description:
    "How project codes and standards such as AISC, AWS, RCSC, ACI, BS 8666, Eurocodes and ISO offshore standards are identified and applied to structural drawing, modelling and detailing deliverables.",
  path: "/capabilities/codes-standards",
  image: "/images/drawings-qaqc.jpg",
});

/** Information recorded for each package at initiation (spec 8.4). */
const registerFields = [
  "Scope and discipline",
  "Standard name and code",
  "Exact edition specified",
  "Client-specific departures",
  "Reference drawing and specification revisions",
  "Who supplies and approves the design",
  "Checker responsibility",
  "Date of clarification and the agreed hierarchy",
];


function StandardCard({ standard, index }: { standard: StandardReference; index: number }) {
  return (
    <li
      data-reveal
      style={{ "--reveal-delay": `${(index % 2) * 70}ms` } as React.CSSProperties}
      className="flex flex-col rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)] ring-1 ring-line"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.08em] text-teal-700 uppercase">{standard.publisher}</p>
          <h3 className="mt-1 text-lg font-extrabold text-navy-900">{standard.identifier}</h3>
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
        title="Engineering Codes, Standards"
        accent="& Project Specifications"
        intro="How the standards for each package are identified and applied, and who is responsible for what."
        image="/images/drawings-qaqc.jpg"
        imageAlt="Engineering drawings on a desk with drafting pencils and a scale rule"
        crumbs={[
          { name: "Technical Capabilities", path: "/capabilities" },
          { name: "Codes & Standards", path: "/capabilities/codes-standards" },
        ]}
      />

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-7">
            <p className="text-xl leading-8 font-bold text-navy-900 sm:text-2xl sm:leading-9">
              Hormuz-Energy develops civil and structural drawing, modelling and detailing deliverables against the approved
              design information, applicable project specifications, drafting requirements and technical standards agreed
              for each assignment.
            </p>
            <p className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              Relevant standards and editions are confirmed at project initiation according to the structure, location,
              client contract and design responsibility. References to a code do not imply that the company performs
              independent design verification or statutory certification unless explicitly agreed and appropriately
              authorised.
            </p>
          </div>
          <aside data-reveal className="lg:col-span-5">
            <div className="rounded-xl bg-navy-900 p-7 text-mist sm:p-9">
              <Info aria-hidden className="size-6 text-energy" />
              <h3 className="mt-4 text-lg font-extrabold text-white">Editions Are Project-Specific</h3>
              <p className="mt-3 text-[0.9375rem] leading-7">
                No edition is assumed. If your contract specifies an older or newer edition, the package follows the
                contract, subject to your responsible engineer&rsquo;s review. Client and project specifications normally
                take precedence within the agreed contract hierarchy.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Design and construction standards: the largest group gets its own section */}
      {standardGroups
        .filter((group) => group.id === "design-construction")
        .map((group) => (
          <section key={group.id} id={group.id} className="bg-paper">
            <div className="container-site section-y">
              <SectionHeading slab title={group.title} intro={group.text} />
              <ul className="mt-10 grid gap-5 lg:grid-cols-2">
                {standards
                  .filter((s) => s.group === group.id)
                  .map((standard, i) => (
                    <StandardCard key={standard.id} standard={standard} index={i} />
                  ))}
              </ul>
            </div>
          </section>
        ))}

      {/* Smaller groups side by side */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Specifications, Information & Approvals"
            intro="Project specifications, information-management procedures and quality frameworks that sit alongside the design standards."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {standardGroups
            .filter((group) => group.id !== "design-construction")
            .map((group) => (
              <div key={group.id} id={group.id} className="flex flex-col">
                <h3 data-reveal className="border-t-2 border-navy-900 pt-5 text-xl leading-7 font-extrabold text-navy-900">
                  {tc(group.title)}
                </h3>
                <p data-reveal className="mt-3 text-[0.9375rem] leading-7 text-ink">
                  {group.text}
                </p>
                <ul className="mt-6 grid gap-5">
                  {standards
                    .filter((s) => s.group === group.id)
                    .map((standard, i) => (
                      <StandardCard key={standard.id} standard={standard} index={i} />
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards by service */}
      <section className="bg-navy-900 text-white">
        <div className="container-site section-y">
          <SectionHeading slab title="Standards by Service" onDark intro="Where each family typically applies. The scope of work for your package records the final list." />
          <div className="mt-10 overflow-x-auto rounded-xl ring-1 ring-white/15">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Typical standards families by service</caption>
              <thead className="bg-white/8 text-xs tracking-[0.1em] text-haze uppercase">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold">Service</th>
                  <th scope="col" className="px-5 py-4 font-bold">Typical references</th>
                  <th scope="col" className="px-5 py-4 font-bold">Basis</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.slug} className="border-t border-white/10 align-top">
                    <th scope="row" className="px-5 py-4 font-bold">
                      <Link href={servicePath(service.slug)} className="hover:text-energy">
                        {service.title}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-haze">
                      {service.standardsRefs
                        .map((ref) => standardById(ref)?.identifier)
                        .filter(Boolean)
                        .join(" · ")}
                    </td>
                    <td className="px-5 py-4 text-haze">{service.standardsNote}</td>
                  </tr>
                ))}
                <tr className="border-t border-white/10 align-top">
                  <th scope="row" className="px-5 py-4 font-bold">
                    <Link href="/engineering-outsourcing" className="hover:text-energy">
                      Engineering Outsourcing
                    </Link>
                  </th>
                  <td className="px-5 py-4 text-haze">Inherited from the purchased service</td>
                  <td className="px-5 py-4 text-haze">Recorded in the scope of work for each package.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Register */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Confirmed at Project Initiation" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              For each package, the applicable standards are agreed and recorded before production starts, so everyone
              works to the same basis.
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

      <CTASection
        title="Working to a specific"
        accent="code or client specification?"
        copy="Tell us which standards and editions apply to your package. We will confirm them in the scope of work before production starts."
      />
    </>
  );
}

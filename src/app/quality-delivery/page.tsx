import type { Metadata } from "next";
import Image from "next/image";
import { Check, FileCheck2, Plus } from "lucide-react";
import { ArrowLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { checkTypes, qualityProcess, qualityRecords } from "@/lib/delivery";
import { pageMetadata } from "@/lib/seo";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "Quality & Delivery",
  description:
    "How structural drawing, modelling and detailing packages are checked, revised and handed over: production checking, revision control, client review and document handover.",
  path: "/quality-delivery",
  image: "/images/capabilities-overview.jpg",
});

const tone: Record<string, string> = {
  Included: "bg-energy-deep text-white",
  "Where resourced and agreed": "bg-navy-800 text-white",
  "Where included in scope": "bg-navy-800 text-white",
  "Client / contract role": "bg-paper text-navy-900 ring-1 ring-line",
  "Requires verified source": "bg-paper text-navy-900 ring-1 ring-line",
  "Not included": "bg-paper text-slate ring-1 ring-line",
};

/** Input / output traceability (spec v2 §11.4): a hypothetical example, not a screenshot of an existing system. */
const traceability = {
  inputs: [
    ["Input drawing revision", "D-04"],
    ["Connection information", "Approved connection details"],
    ["Coordinate basis", "Agreed drawing and model coordinate scheme"],
  ],
  outputs: [
    ["Drawing sheet list", "Sheet numbers and member marks"],
    ["Steel quantities", "Source revision recorded on the schedule"],
    ["Client review", "Review status per sheet"],
    ["Issue record", "Transmittal ID"],
  ],
};

const faqs = [
  {
    q: "What happens when an approved design drawing changes?",
    a: "The effect on the model, shop sheets, quantities and document revisions is assessed and incorporated according to the contracted revision process.",
  },
  {
    q: "Can you check the structural adequacy of an existing design?",
    a: "Only under a separate, qualified design-verification scope. Ordinary production checking is a different activity.",
  },
  {
    q: "How are technical questions communicated?",
    a: "Missing information, conflicting dimensions and interface issues are recorded and submitted as clear technical queries or RFIs to the designated client engineer.",
  },
  {
    q: "What do you provide at close-out?",
    a: "The contract-defined native formats, PDFs, models, material reports, issue registers and supporting files.",
  },
];

export default function QualityDeliveryPage() {
  return (
    <>
      <Hero
        eyebrow="Technical Capabilities"
        title="Quality &"
        accent="Delivery"
        intro="A drawing or model package is only useful when its scope, source information, revision history and checking responsibilities are understood. This is how each package is set up, checked and handed over."
        image="/images/capabilities-overview.jpg"
        imageAlt="Structural steel framing seen from below"
        crumbs={[
          { name: "Technical Capabilities", path: "/capabilities" },
          { name: "Quality & Delivery", path: "/quality-delivery" },
        ]}
      />

      {/* Check types */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="What Checking Means Here"
            intro="Our agreed drawing and model review may include checking references, dimensions, member identification, drawing-to-model consistency, material schedules, document numbers and revisions. Where a second-person check or independent technical review is contractually required, the assignment is resourced and planned for it. Engineering design verification or statutory approval is provided only through qualified professionals under a separately established scope."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {checkTypes.map((check, i) => (
              <li
                key={check.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="flex flex-col rounded-xl border border-line p-6"
              >
                <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${tone[check.included]}`}>{check.included}</span>
                <h3 className="mt-4 text-lg leading-snug font-extrabold text-navy-900">{tc(check.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-ink">{check.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Technical Delivery Sequence"
            intro="Seven stages, scaled to the size of the package and the project's own procedures. The scope of each check and the authority to accept engineering changes are defined by the project."
          />
          <ol className="mt-12 grid gap-x-10 lg:grid-cols-2">
            {qualityProcess.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 60}ms` } as React.CSSProperties}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-6 sm:grid-cols-[4rem_1fr]"
              >
                <span className="text-2xl font-extrabold text-energy-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy-900">{tc(step.title)}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-7 text-ink">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Records */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          <div data-reveal="image" className="relative min-h-72 overflow-hidden bg-navy-950 lg:min-h-[34rem]">
            <Image
              src="/images/drawings-qaqc.jpg"
              alt="Engineering drawings on a desk with drafting pencils and a scale rule"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
            <SectionHeading slab title="Records and Handover" />
            <p data-reveal className="mt-5 max-w-xl text-base leading-7 text-ink">
              Depending on the size of the package and your document control procedure, the following records can be set
              up and handed over with the deliverables.
            </p>
            <ul data-reveal className="mt-6 grid max-w-xl gap-x-6 border-t border-line sm:grid-cols-2">
              {qualityRecords.map((record) => (
                <li key={record} className="flex items-center gap-3 border-b border-line py-3 text-[0.9375rem] font-semibold text-ink">
                  <FileCheck2 aria-hidden className="size-4 shrink-0 text-energy-deep" />
                  {tc(record)}
                </li>
              ))}
            </ul>
            <ArrowLink href="/services/material-takeoffs-documentation" className="mt-7">
              Documentation as a standalone service
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Traceability example */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              slab
              title="Input / Output Traceability"
              intro="An example of the records a steel fabrication package can carry, so every output can be traced back to the input revision it came from. The records are defined by contract."
            />
          </div>
          <div data-reveal className="rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)] sm:p-8 lg:col-span-7">
            <span className="inline-block rounded-full bg-navy-900 px-3 py-1 text-[0.6875rem] font-bold tracking-[0.08em] text-white uppercase">
              Hypothetical illustrative example
            </span>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {(
                [
                  ["Inputs recorded", traceability.inputs],
                  ["Outputs recorded", traceability.outputs],
                ] as const
              ).map(([heading, rows]) => (
                <div key={heading}>
                  <h3 className="text-base font-extrabold text-navy-900">{heading}</h3>
                  <dl className="mt-3 border-t border-line text-sm">
                    {rows.map(([label, value]) => (
                      <div key={label} className="border-b border-line py-3">
                        <dt className="text-[0.6875rem] font-bold tracking-[0.1em] text-teal-700 uppercase">{label}</dt>
                        <dd className="mt-1 font-semibold text-navy-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-slate">
              Illustrative workflow only. It does not represent existing internal software or automation.
            </p>
          </div>
        </div>
      </section>

      {/* Responsibility */}
      <section className="bg-navy-900 text-white">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Responsibility" title="Design Approval Stays With the Engineer" onDark />
            <p data-reveal className="mt-6 max-w-xl text-base leading-7 text-white/85">
              Our deliverables are produced from approved design information and checked within the agreed production
              scope. They are not an engineering approval, and they do not replace review by your responsible engineer or
              approvals by authorities and certifying bodies.
            </p>
            <ArrowLink href="/capabilities/codes-standards" onDark className="mt-6">
              Codes & Standards
            </ArrowLink>
          </div>
          <ul className="lg:col-span-6 lg:pt-2">
            {[
              "Comments returned in writing and closed out before re-issue",
              "Every revision identified with its description",
              "Assumptions shown on drawings for your verification",
              "No quality-management certification is claimed",
            ].map((point, i) => (
              <li
                key={point}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="flex gap-4 border-t border-white/20 py-5 text-base leading-snug font-semibold last:border-b"
              >
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-energy" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Common Questions" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              How changes, technical queries, checking and close-out are handled on a package.
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

      <CTASection
        title="Need a package checked"
        accent="and handed over properly?"
        copy="Tell us your document control requirements and review cycle. We will set the package up around them."
      />
    </>
  );
}

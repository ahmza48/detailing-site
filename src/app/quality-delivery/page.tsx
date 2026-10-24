import type { Metadata } from "next";
import Image from "next/image";
import { Check, FileCheck2 } from "lucide-react";
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
  "Not included": "bg-paper text-slate ring-1 ring-line",
};

export default function QualityDeliveryPage() {
  return (
    <>
      <Hero
        eyebrow="Technical Capabilities"
        title="Quality &"
        accent="Delivery"
        intro="How each package is set up, produced, checked, revised and handed over, and where our responsibility ends."
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
            intro="Production checking is different from engineering design verification. This is what is, and is not, part of our service."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            title="From Scope to Close-Out"
            intro="The sequence followed on each package. Steps are scaled to the size of the package and the project's own procedures."
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

      <CTASection
        title="Need a package checked"
        accent="and handed over properly?"
        copy="Tell us your document control requirements and review cycle. We will set the package up around them."
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SoftwareCapabilities } from "@/components/SoftwareCapabilities";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Capabilities",
  description:
    "Technical deliverables, software and delivery scope: Tekla Structures, AutoCAD, PDS, Frameworks Plus, MicroStation, PDMS and Navisworks across steel and RCC, onshore and offshore, greenfield and brownfield.",
  path: "/capabilities",
  image: "/images/capabilities-overview.jpg",
});

const deliverables = [
  {
    group: "Models",
    items: ["Tekla Structures steel models", "Plant structural models (PDS / Frameworks Plus)", "Underground facility models", "Updated existing models"],
  },
  {
    group: "Steel drawings",
    items: ["General arrangement drawings", "Arrangement and detail drawings", "Shop drawings", "Fabrication drawings"],
  },
  {
    group: "Concrete drawings",
    items: ["RCC arrangement drawings", "RCC detail drawings", "Reinforcement drawings", "Bar bending schedules"],
  },
  {
    group: "Records & quantities",
    items: ["Material take-off (MTO)", "As-built drawings", "Structural layouts", "Isometric support drawings, where applicable"],
  },
];

const pairs = [
  {
    id: "onshore-offshore",
    eyebrow: "Environment",
    title: "Onshore / Offshore",
    left: {
      label: "Onshore",
      text: "Pipe racks, pipe bridges, platforms, equipment supports, plant buildings and concrete structures for process facilities.",
      href: "/services/onshore-civil-structural-design-detailing",
    },
    right: {
      label: "Offshore",
      text: "Structural modelling, steel detailing and shop drawings for offshore platforms, access structures and modifications.",
      href: "/services/offshore-structural-design-detailing",
    },
  },
  {
    id: "greenfield-brownfield",
    eyebrow: "Project type",
    title: "Greenfield / Brownfield",
    left: {
      label: "Greenfield",
      text: "New structural developments, from plant modelling and general arrangements to shop and fabrication drawings.",
      href: "/services/plant-structural-3d-modelling",
    },
    right: {
      label: "Brownfield",
      text: "Modifications, rehabilitation, integrity reinstatement support, existing model updates and as-built drawings. A demonstrated strength.",
      href: "/services/brownfield-structural-modifications",
    },
  },
  {
    id: "steel-rcc",
    eyebrow: "Material",
    title: "Steel / RCC",
    left: {
      label: "Structural steel",
      text: "Tekla modelling, arrangement, shop and fabrication drawings with model-derived MTO.",
      href: "/services/steel-detailing-fabrication",
    },
    right: {
      label: "Reinforced concrete",
      text: "RCC arrangement and detail drawings, reinforcement detailing and bar bending schedules.",
      href: "/services/rcc-reinforcement-detailing",
    },
  },
];

const qaqc = [
  { title: "Input review", text: "Design inputs, specifications and standards confirmed and queries raised before production starts." },
  { title: "Self-check", text: "The originator checks each drawing or model against inputs and the project checklist." },
  { title: "Independent check", text: "A senior detailer or checker who did not originate the work reviews it and records comments." },
  { title: "Model review", text: "Where a model exists, interfaces and clashes with other disciplines are reviewed, typically in Navisworks." },
  { title: "Close-out and issue", text: "Comments are incorporated, close-out is verified and the deliverable is issued under revision control." },
];

export default function CapabilitiesPage() {
  return (
    <>
      <Hero
        eyebrow="Capabilities"
        title="Technical Capability"
        accent="For Structural Deliverables"
        intro="What we produce, the tools we produce it with, and how it is checked before it reaches your team."
        image="/images/capabilities-overview.jpg"
        imageAlt="Structural steel framing seen from below"
        crumbs={[{ name: "Capabilities", path: "/capabilities" }]}
      />

      {/* Technical deliverables */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Technical deliverables"
            title="From General Arrangements"
            accent="To Fabrication Drawings"
          />
          <div className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((group, index) => (
              <div
                key={group.group}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="border-t-2 border-navy-900 pt-6 pb-10"
              >
                <h3 className="text-lg font-extrabold text-navy-900">{group.group}</h3>
                <ul className="mt-4 space-y-2.5 text-[0.9375rem] font-medium text-slate">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-energy-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software & tools */}
      <section className="bg-navy-950 text-white">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Software & tools"
            title="Engineering Tools"
            accent="Built for Complex Project Delivery"
            intro="The platforms our senior team has used on energy projects, from steel detailing to integrated plant design environments."
            onDark
          />
          <div className="mt-12">
            <SoftwareCapabilities />
          </div>
          <p className="mt-6 text-xs leading-relaxed text-haze">
            Product names are trademarks of their respective owners and are listed to describe working experience only.
            No affiliation or endorsement is implied.
          </p>
        </div>
      </section>

      {/* Scope pairs */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading eyebrow="Delivery scope" title="Where We Work" />
          <div className="mt-12 space-y-5">
            {pairs.map((pair) => (
              <div key={pair.id} id={pair.id} data-reveal className="grid bg-white lg:grid-cols-12">
                <div className="border-b border-line p-7 lg:col-span-4 lg:border-r lg:border-b-0 lg:p-10">
                  <p className="text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">{pair.eyebrow}</p>
                  <h3 className="display-md mt-3 text-navy-900 uppercase">{pair.title}</h3>
                </div>
                {[pair.left, pair.right].map((side, index) => (
                  <div key={side.label} className={`flex flex-col p-7 lg:col-span-4 lg:p-10 ${index === 0 ? "border-b border-line lg:border-r lg:border-b-0" : ""}`}>
                    <h4 className="text-lg font-extrabold text-navy-900">{side.label}</h4>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate">{side.text}</p>
                    <ArrowLink href={side.href} className="mt-4">
                      Related service<span className="sr-only">: {side.label}</span>
                    </ArrowLink>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D modelling */}
      <section className="bg-navy-900 text-white">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
            <SectionHeading
              eyebrow="3D modelling"
              title="Modelling Inside the Project Environment"
              size="md"
              onDark
              intro="Structural models built in Tekla Structures for detailing, or within PDS and Frameworks Plus plant environments, with exposure to PDMS. Positioned for energy and process plants, not architectural BIM."
            />
            <ul data-reveal className="mt-8 max-w-xl border-t border-white/15">
              {["Steel and concrete structures", "Underground facilities", "Existing model modification and brownfield updates", "Navisworks model review and coordination"].map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-white/15 py-3.5 text-[0.9375rem] font-semibold">
                  <span aria-hidden className="size-1.5 shrink-0 bg-energy" />
                  {item}
                </li>
              ))}
            </ul>
            <ArrowLink href="/services/plant-structural-3d-modelling" onDark className="mt-8">
              Plant structural 3D modelling
            </ArrowLink>
          </div>
          <div data-reveal="image" className="relative min-h-72 overflow-hidden bg-navy-950 lg:min-h-[36rem]">
            <Image
              src="/images/plant-model.jpg"
              alt="Tall steel process structure with platforms and piping against a blue sky"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* QA/QC */}
      <section id="qa-qc" className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="QA/QC process"
              title="A Defined Check"
              accent="Before Every Issue"
              intro="Drawing checking and model review follow the same sequence on every deliverable."
            />
            <ArrowLink href="/services/structural-drawings-mto-qaqc" className="mt-7">
              Drawings, MTO &amp; QA/QC
            </ArrowLink>
          </div>
          <ol className="lg:col-span-7">
            {qaqc.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-6 last:border-b sm:grid-cols-[4.5rem_1fr]"
              >
                <span className="text-2xl font-extrabold text-energy-ink tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SoftwareCapabilities } from "@/components/SoftwareCapabilities";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, servicePath, type ServiceSlug } from "@/lib/services";
import { software, softwareQualifier } from "@/lib/software";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "Software, Deliverables & Technical Capabilities",
  description:
    "Technical deliverables, software experience, file formats and workflow for structural drafting, modelling and detailing: Tekla Structures, AutoCAD, MicroStation, Navisworks and plant design environments.",
  path: "/capabilities",
  image: "/images/capabilities-overview.jpg",
});

/** Deliverable categories, each owned by one canonical service. */
const deliverables: { group: string; service: ServiceSlug; items: string[] }[] = [
  {
    group: "Engineering drawings",
    service: "civil-structural-drafting",
    items: ["General arrangement drawings", "Plans, elevations and sections", "Foundation and equipment-base layouts", "Drawing revisions and redrafting"],
  },
  {
    group: "3D models",
    service: "plant-structural-3d-modelling",
    items: ["Tekla Structures steel models", "Plant structural models, where supported", "Existing-model updates", "Coordination views and exchanges"],
  },
  {
    group: "Fabrication & construction documentation",
    service: "steel-detailing-fabrication",
    items: ["Assembly and shop drawings", "Single-part drawings", "Erection drawings", "RCC details and bar bending schedules"],
  },
  {
    group: "Quantities & document sets",
    service: "material-takeoffs-documentation",
    items: ["Material take-off and BOM", "Bolt and part lists", "Drawing registers and transmittals", "As-built records from verified sources"],
  },
];

/** File exchange workflow (spec 7.6 item 4). Formats are confirmed per package; nothing here is universal. */
const formatSteps = [
  { title: "Confirm platform and version", text: "The software and version the package must be delivered in, and whether that is available for the package." },
  { title: "Agree native and exchange formats", text: "For example DWG or DGN drawings, PDF sets, native Tekla models, IFC and NC / DSTV files where supported." },
  { title: "Test the exchange early", text: "A first file is exchanged and opened on both sides before production volume builds up." },
  { title: "Record it in the scope", text: "Formats, versions and naming are written into the scope of work and the deliverables list." },
];

const pairs = [
  {
    id: "onshore-offshore",
    eyebrow: "Environment",
    title: "Onshore / Offshore",
    left: {
      label: "Onshore",
      text: "Pipe racks, pipe bridges, platforms, equipment supports, plant buildings and concrete structures for process facilities.",
      href: "/industries/onshore-oil-gas",
      cta: "Onshore oil & gas",
    },
    right: {
      label: "Offshore",
      text: "Structural modelling, steel detailing and shop drawings for offshore platforms, access structures and modifications.",
      href: "/industries/offshore-energy",
      cta: "Offshore energy",
    },
  },
  {
    id: "greenfield-brownfield",
    eyebrow: "Project type",
    title: "Greenfield / Brownfield",
    left: {
      label: "Greenfield",
      text: "New structural developments, from arrangement drawings and models to shop and fabrication drawings.",
      href: "/services",
      cta: "All services",
    },
    right: {
      label: "Brownfield",
      text: "Modification drawings, rehabilitation documentation support, existing-model updates and as-builts from verified records.",
      href: "/services/brownfield-structural-modifications",
      cta: "Brownfield modifications",
    },
  },
  {
    id: "steel-rcc",
    eyebrow: "Material",
    title: "Steel / RCC",
    left: {
      label: "Structural steel",
      text: "Tekla modelling, arrangement, shop and erection drawings with model-derived lists.",
      href: "/services/steel-detailing-fabrication",
      cta: "Steel detailing",
    },
    right: {
      label: "Reinforced concrete",
      text: "RCC arrangement and detail drawings, reinforcement detailing and bar bending schedules.",
      href: "/services/rcc-reinforcement-detailing",
      cta: "RCC detailing",
    },
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      <Hero
        eyebrow="Technical Capabilities"
        title="Software, Deliverables"
        accent="& Technical Capability"
        intro="What we produce, the tools the team has used to produce it, how files are exchanged, and where standards and checking are described."
        image="/images/capabilities-overview.jpg"
        imageAlt="Structural steel framing seen from below"
        crumbs={[{ name: "Technical Capabilities", path: "/capabilities" }]}
      />

      {/* Deliverable categories */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Technical Deliverables"
            intro="Four categories of deliverable. Each is owned by one service, so you know exactly which scope to request."
          />
          <div className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((group, index) => {
              const service = serviceBySlug(group.service);
              return (
                <div
                  key={group.group}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                  className="flex flex-col border-t-2 border-navy-900 pt-6 pb-10"
                >
                  <h3 className="text-lg font-extrabold text-navy-900">{tc(group.group)}</h3>
                  <ul className="mt-4 flex-1 space-y-2.5 text-[0.9375rem] font-medium text-slate">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-energy-deep" />
                        {tc(item)}
                      </li>
                    ))}
                  </ul>
                  {service && (
                    <ArrowLink href={servicePath(service.slug)} className="mt-5">
                      {service.title}
                    </ArrowLink>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software experience */}
      <section className="bg-navy-950 text-white">
        <div className="container-site section-y">
          <SectionHeading eyebrow="Software experience" title="Engineering Tools" accent="Used on Energy Projects" intro={softwareQualifier} onDark />
          <div className="mt-12">
            <SoftwareCapabilities />
          </div>
          <div data-reveal className="mt-10 overflow-x-auto rounded-xl ring-1 ring-white/15">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">Software and the services it supports</caption>
              <thead className="bg-white/8 text-xs tracking-[0.1em] text-haze uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-bold">Software</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Supports</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Basis</th>
                </tr>
              </thead>
              <tbody>
                {software.map((tool) => (
                  <tr key={tool.name} className="border-t border-white/10 align-top">
                    <th scope="row" className="px-5 py-3.5 font-bold">{tool.name}</th>
                    <td className="px-5 py-3.5">
                      <span className="flex flex-wrap gap-x-3 gap-y-1">
                        {tool.services.map((slug) => (
                          <Link key={slug} href={servicePath(slug)} className="text-energy hover:underline">
                            {serviceBySlug(slug)?.title}
                          </Link>
                        ))}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-haze">
                      {tool.legacy ? "Prior project experience; availability confirmed per package" : "Senior team project experience"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-haze">
            Product names are trademarks of their respective owners and are listed to describe working experience only.
            No affiliation or endorsement is implied.
          </p>
        </div>
      </section>

      {/* File formats & workflow */}
      <section id="formats" className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="File Formats & Workflow" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              Compatibility is agreed, not assumed. Platforms, versions and formats are confirmed during scope review and
              recorded before production starts.
            </p>
            <ArrowLink href="/quality-delivery" className="mt-6">
              Revision control & handover
            </ArrowLink>
          </div>
          <ol className="lg:col-span-7">
            {formatSteps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-6 last:border-b sm:grid-cols-[4.5rem_1fr]"
              >
                <span className="text-2xl font-extrabold text-energy-ink tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy-900">{tc(step.title)}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Standards + quality */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-5 lg:grid-cols-2">
          {[
            {
              href: "/capabilities/codes-standards",
              eyebrow: "Codes & standards",
              title: "Standards applied per project",
              text: "How AISC, AWS, RCSC, ACI, BS, Eurocode and ISO references are identified for each package, and who is responsible for compliance.",
            },
            {
              href: "/quality-delivery",
              eyebrow: "Quality & delivery",
              title: "Checking, revisions and handover",
              text: "Production checking, revision control, client review and document handover, and how these differ from design verification.",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              data-reveal
              className="lift group flex flex-col rounded-xl bg-white p-8 shadow-[0_6px_20px_rgb(0_36_56/0.07)] hover:shadow-[0_14px_34px_rgb(0_36_56/0.12)]"
            >
              <span className="eyebrow text-teal-700">{card.eyebrow}</span>
              <span className="mt-2 text-xl font-extrabold text-navy-900 group-hover:text-energy-ink">{card.title}</span>
              <span className="mt-3 flex-1 text-[0.9375rem] leading-7 text-ink">{card.text}</span>
              <ArrowRight aria-hidden className="mt-5 size-5 text-energy-deep transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Scope pairs */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading slab title="Where We Work" />
          <div className="mt-12 space-y-5">
            {pairs.map((pair) => (
              <div key={pair.id} id={pair.id} data-reveal className="grid rounded-xl bg-paper lg:grid-cols-12">
                <div className="border-b border-line p-7 lg:col-span-4 lg:border-r lg:border-b-0 lg:p-10">
                  <p className="text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">{pair.eyebrow}</p>
                  <h3 className="display-md mt-3 text-navy-900 uppercase">{pair.title}</h3>
                </div>
                {[pair.left, pair.right].map((side, index) => (
                  <div key={side.label} className={`flex flex-col p-7 lg:col-span-4 lg:p-10 ${index === 0 ? "border-b border-line lg:border-r lg:border-b-0" : ""}`}>
                    <h4 className="text-lg font-extrabold text-navy-900">{side.label}</h4>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate">{side.text}</p>
                    <ArrowLink href={side.href} className="mt-4">
                      {side.cta}
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
              onDark
              intro="Structural models built in Tekla Structures, with prior project experience in PDS and FrameWorks Plus plant environments and exposure to PDMS. Positioned for energy and process plants, not architectural BIM."
            />
            <ul data-reveal className="mt-8 max-w-xl border-t border-white/15">
              {["Steel and concrete structures", "Underground facilities", "Existing model modification and brownfield updates", "Navisworks model review and coordination"].map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-white/15 py-3.5 text-[0.9375rem] font-semibold">
                  <span aria-hidden className="size-1.5 shrink-0 bg-energy" />
                  {tc(item)}
                </li>
              ))}
            </ul>
            <ArrowLink href="/services/plant-structural-3d-modelling" onDark className="mt-8">
              3D Structural Modelling & Plant Model Support
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

      {/* Legacy anchor: the former QA/QC section now lives on its own page */}
      <span id="qa-qc" aria-hidden />

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Disclaimer } from "@/components/Disclaimer";
import { ExperienceMetrics } from "@/components/ExperienceMetrics";
import { Hero } from "@/components/Hero";
import { ImageBand } from "@/components/ImageBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FeaturedProject, ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServicePreview";
import { SoftwareCapabilities } from "@/components/SoftwareCapabilities";
import { engagementSteps } from "@/lib/delivery";
import { industries, industryPath } from "@/lib/industries";
import { featuredProjectIds, projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, servicePath, services, type ServiceSlug } from "@/lib/services";
import { softwareQualifier } from "@/lib/software";
import { associatedOrganizations, site, trustMetrics } from "@/lib/site";
import { tc } from "@/lib/text";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Structural Detailing & Engineering Support for Energy and Industrial Projects",
    description:
      "Civil and structural CAD drafting, TEKLA Structures modelling, steel fabrication detailing, RCC reinforcement documentation and brownfield modification packages for EPC contractors, consultancies and steel fabricators.",
    path: "/",
    keywords: [
      "structural detailing services",
      "structural engineering support",
      "steel detailing outsourcing",
      "oil and gas structural detailing",
      "Tekla modelling services",
    ],
  }),
  title: { absolute: `${site.name} | Structural Detailing & Engineering Support for Energy Projects` },
};

/** Buyer-defined scenarios (spec 7.1 item 4). Descriptive, not claims of delivered projects. */
const workPackages: { title: string; provide: string; receive: string; services: ServiceSlug[] }[] = [
  {
    title: "Pipe rack steel fabrication package",
    provide: "Approved rack GA and connection design, steel and bolting specifications.",
    receive: "Detailing model, assembly, single-part and erection drawings, bolt and material lists.",
    services: ["steel-detailing-fabrication", "material-takeoffs-documentation"],
  },
  {
    title: "TEKLA modelling assignment",
    provide: "Approved design drawings, model origin, version and modelling rules.",
    receive: "Native TEKLA model, agreed exchange files and model reports. Drawings only if scoped.",
    services: ["plant-structural-3d-modelling"],
  },
  {
    title: "Industrial RCC and foundation drawings",
    provide: "Concrete GA, reinforcement design requirements and vendor foundation data.",
    receive: "Foundation and RCC details, reinforcement placing drawings and bar bending schedules.",
    services: ["civil-structural-drafting", "rcc-reinforcement-detailing"],
  },
  {
    title: "Existing plant modification package",
    provide: "Existing records, survey information, mark-ups and the approved modification design.",
    receive: "Modification drawings with existing / removed / new legends, model updates and as-builts.",
    services: ["brownfield-structural-modifications"],
  },
];

export default function HomePage() {
  const [lead, ...rest] = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);
  const evidence = projects.slice(0, 3).map((project) => ({ project, diagram: project.diagrams[0] }));

  return (
    <>
      {/* 1. Hero */}
      <Hero
        tall
        title="Structural Detailing & Engineering Support"
        accent="for Energy and Industrial Projects"
        intro="Civil and structural CAD drafting, TEKLA Structures modelling, steel fabrication detailing, RCC reinforcement documentation and brownfield modification packages for EPC contractors, engineering consultancies and steel fabricators."
        image="/images/hero-offshore.jpg"
        imageAlt="Offshore jack-up rig beside a crane vessel at sunset"
      >
        <ButtonLink href="/contact">Request a Project Quote</ButtonLink>
        <ArrowLink href="/services" onDark>
          Explore Our Services
        </ArrowLink>
      </Hero>

      {/* 2. Trust strip: personnel experience, not company tenure */}
      <section id="experience" aria-label="Experience at a glance" className="bg-navy-900 text-mist">
        <div className="container-site py-8 lg:py-10">
          <ExperienceMetrics metrics={trustMetrics.slice(0, 4)} />
        </div>
      </section>

      {/* 3. Core technical services */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="Six Technical Services"
            intro="Engineering production for energy and industrial facilities, from arrangement drawings and models to fabrication documentation. Each service can be engaged on its own, working from your approved design information."
          />
          <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </ul>
          <div data-reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <ButtonLink href="/services" variant="light">
              Compare All Services
            </ButtonLink>
            <ArrowLink href="/engineering-outsourcing">Outsource a defined package</ArrowLink>
          </div>
        </div>
      </section>

      {/* 4. Typical work packages */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Typical Work Packages"
            intro="How clients usually commission us: what you provide, and what you receive."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {workPackages.map((pkg, i) => (
              <li
                key={pkg.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties}
                className="flex flex-col rounded-xl border border-line p-7"
              >
                <h3 className="text-lg font-extrabold text-navy-900">{tc(pkg.title)}</h3>
                <dl className="mt-4 flex-1 space-y-3 text-[0.9375rem] leading-6">
                  <div>
                    <dt className="text-[0.6875rem] font-bold tracking-[0.12em] text-teal-700 uppercase">You provide</dt>
                    <dd className="mt-1 text-ink">{pkg.provide}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] font-bold tracking-[0.12em] text-teal-700 uppercase">You receive</dt>
                    <dd className="mt-1 text-ink">{pkg.receive}</dd>
                  </div>
                </dl>
                <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                  {pkg.services.map((slug) => {
                    const service = serviceBySlug(slug);
                    return service ? (
                      <li key={slug}>
                        <Link
                          href={servicePath(slug)}
                          className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-sm font-semibold text-navy-900 transition-colors hover:text-energy-ink"
                        >
                          <span className="text-xs font-bold text-energy-deep">{service.id}</span>
                          {service.title}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Industries & applications */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading centered title="Industries & Applications" intro="Onshore and offshore, new build and existing plant." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <li key={industry.slug} data-reveal style={{ "--reveal-delay": `${(index % 3) * 60}ms` } as React.CSSProperties}>
                <Link
                  href={industryPath(industry.slug)}
                  className="lift group relative isolate flex aspect-[16/10] items-end overflow-hidden rounded-xl bg-navy-900 p-5 text-mist shadow-[0_8px_24px_rgb(0_36_56/0.15)]"
                >
                  <Image
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                    className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-navy-900/95 via-navy-900/45 to-navy-900/10" />
                  <span className="flex w-full items-end justify-between gap-3 text-base leading-5 font-extrabold">
                    {industry.name}
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-energy transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <ButtonLink href="/industries" variant="light">
              All Industries
            </ButtonLink>
            <ArrowLink href="/applications">Find by structure type</ArrowLink>
          </div>
        </div>
      </section>

      {/* 6. Technical evidence: transparently labelled placeholders */}
      <section className="bg-white">
        <div className="container-site section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              slab
              title="Technical Work Samples"
              intro="Authorised company work and labelled demonstration samples will be published here. Until then, the drawing views below are placeholder illustrations, not project deliverables."
            />
            <ArrowLink href="/project-experience#work-samples">About work samples</ArrowLink>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {evidence.map(({ project, diagram }, i) => (
              <li key={diagram.src} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <figure>
                  <div className="relative aspect-[8/5] overflow-hidden rounded-xl border border-line bg-paper">
                    <Image src={diagram.src} alt={diagram.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
                    <span className="absolute top-3 left-3 rounded-full bg-navy-900/85 px-3 py-1 text-[0.6875rem] font-bold tracking-[0.08em] text-white uppercase">
                      Placeholder illustration
                    </span>
                  </div>
                  <figcaption className="mt-3 text-sm">
                    <span className="font-bold text-navy-900">{diagram.type}</span>
                    <span className="text-slate"> · {serviceBySlug(project.serviceSlugs[0])?.title}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Engineering capabilities */}
      <section className="bg-navy-800 text-mist">
        <div className="container-site section-y">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading slab onDark title="Engineering Capabilities" intro={softwareQualifier} />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/capabilities/codes-standards" variant="light">
                Codes & Standards
              </ButtonLink>
              <ButtonLink href="/quality-delivery" variant="light">
                Quality & Delivery
              </ButtonLink>
            </div>
          </div>
          <div className="mt-12">
            <SoftwareCapabilities detailed={false} />
          </div>
        </div>
      </section>

      {/* 8. Selected professional experience */}
      <section className="grid bg-white lg:grid-cols-12">
        <div className="bg-navy-800 px-5 py-16 text-mist sm:px-8 lg:col-span-5 lg:px-12 lg:py-24 xl:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
          <div className="lg:sticky lg:top-28">
            <SectionHeading slab onDark title="Selected Professional Experience" />
            <p data-reveal className="mt-5 max-w-sm text-[0.9375rem] leading-7 font-normal">
              Representative projects from the prior professional experience of our senior team, gained with established
              EPC, engineering and construction organizations.
            </p>
            <Disclaimer
              onDark
              className="mt-5 max-w-sm"
              text="These are prior engagements of individual team members, not projects contracted to Hormuz-Energy."
            />
            <div data-reveal className="mt-8">
              <ButtonLink href="/project-experience" variant="light">
                All Professional Experience
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="px-5 py-16 sm:px-8 lg:col-span-7 lg:px-14 lg:py-24 xl:pr-[max(3rem,calc((100vw-80rem)/2+3rem))]">
          {lead && <FeaturedProject project={lead} />}
          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {rest.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="Project Exposure Across the Energy Sector"
            intro="Our senior team's experience includes project involvement associated with leading energy organizations across the Gulf and international markets."
          />
          <ul data-reveal className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[...associatedOrganizations, "And other energy organizations"].map((name, index, all) => (
              <li
                key={name}
                className={`flex min-h-20 items-center justify-center rounded-xl bg-white px-4 py-4 text-center shadow-[0_4px_16px_rgb(0_36_56/0.08)] ${
                  index === all.length - 1 ? "text-sm font-normal text-slate" : "text-base font-extrabold text-navy-900"
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
          <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-sm font-bold text-energy-ink">
            Experience gained through prior engagements with EPC, engineering and construction organizations.
          </p>
          <Disclaimer className="mx-auto mt-4" />
        </div>
      </section>

      {/* 9. Engineering outsourcing */}
      <ImageBand
        title="Engineering Outsourcing"
        accent="for EPCs, Consultancies & Fabricators"
        image="/images/onshore-pipe-rack.jpg"
        imageAlt="Steel pipe rack and process structures at an onshore plant"
        actions={
          <>
            <ButtonLink href="/engineering-outsourcing">How Outsourcing Works</ButtonLink>
            <ArrowLink href="/contact?service=engineering-outsourcing" onDark>
              Request an outsourcing quote
            </ArrowLink>
          </>
        }
      >
        <p>
          Subcontract a defined drawing, modelling, detailing or documentation package. Your engineers keep design
          authority; we deliver the production work to your standards, formats and review cycle.
        </p>
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {["Defined scope and deliverables", "Inputs and responsibilities agreed", "Your review cycle and formats", "NDA available before file exchange"].map(
            (item) => (
              <li key={item} className="flex items-center gap-3 text-[0.9375rem] font-medium">
                <Check aria-hidden className="size-4 shrink-0 text-energy" />
                {tc(item)}
              </li>
            ),
          )}
        </ul>
      </ImageBand>

      {/* 10. How it works */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading centered title="How It Works" intro="From your request to the handover of a revision-controlled package." />
          <div className="mt-14">
            <ProcessSteps steps={engagementSteps} />
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <CTASection
        title="Have a structural drawing, model or fabrication detailing package"
        accent="to outsource?"
        copy="Send the scope of work, available design inputs and target schedule."
      />
    </>
  );
}

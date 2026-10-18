import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Disclaimer } from "@/components/Disclaimer";
import { ExperienceMetrics } from "@/components/ExperienceMetrics";
import { Hero } from "@/components/Hero";
import { ImageBand } from "@/components/ImageBand";
import { FeaturedProject, ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServicePreview";
import { SoftwareCapabilities } from "@/components/SoftwareCapabilities";
import { industries } from "@/lib/industries";
import { featuredProjectIds, projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { associatedOrganizations, site, trustMetrics } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Civil & Structural Detailing Services for Energy Projects",
    description:
      "Civil structural detailing services for the energy sector: oil and gas structural detailing, steel and RCC detailing and 3D modelling for onshore and offshore projects.",
    path: "/",
    keywords: [
      "civil structural detailing services",
      "energy structural detailing",
      "oil and gas structural detailing",
      "onshore offshore structural detailing",
    ],
  }),
  title: { absolute: `${site.name} | Civil & Structural Detailing for Energy Projects` },
};

const brownfieldScope = [
  "Structural modifications",
  "Rehabilitation",
  "Integrity reinstatement",
  "Existing model updates",
  "As-built drawings",
  "Equipment replacement modifications",
];

export default function HomePage() {
  const [lead, ...rest] = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);

  return (
    <>
      {/* 1. Hero */}
      <Hero
        tall
        title="Precision Structural Design & Detailing"
        accent="For Complex Energy Projects"
        intro="Specialist civil and structural design, detailing and 3D modelling support for onshore and offshore energy projects — backed by decades of hands-on experience across major Gulf and international developments."
        image="/images/hero-offshore.jpg"
        imageAlt="Offshore jack-up rig beside a crane vessel at sunset"
      >
        <ButtonLink href="/services">Explore Our Services</ButtonLink>
        <ArrowLink href="/project-experience" onDark>
          View Project Experience
        </ArrowLink>
      </Hero>

      {/* 2. Trust strip */}
      <section id="experience" aria-label="Experience at a glance" className="bg-navy-900 text-mist">
        <div className="container-site py-8 lg:py-10">
          <ExperienceMetrics metrics={trustMetrics.slice(0, 4)} />
        </div>
      </section>

      {/* 3. Positioning */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading centered title="Specialist Structural Support for the Energy Sector" />
          <div data-reveal className="mx-auto mt-10 max-w-3xl">
            <p className="text-lg leading-8">
              Experienced structural capability. Proven energy-sector project exposure. We focus on one field: civil
              and structural design, detailing and modelling for onshore and offshore energy facilities.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-7">
              Our senior professionals bring more than three decades of hands-on experience delivering civil and
              structural design, detailing and modelling across major onshore and offshore energy developments in the
              Gulf and wider MENA region.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-7">
              We support EPC contractors, engineering consultancies, steel fabricators and package vendors as an
              extension of their engineering and fabrication teams, through a flexible, remotely delivered model that
              scales structural drawing and modelling capacity to the needs of each project.
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink href="/about" variant="light">
                Read more about {site.shortName}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <ImageBand
        title="Our Services"
        image="/images/onshore-pipe-rack.jpg"
        imageAlt="Steel pipe rack and process structures at an onshore plant"
        actions={<ButtonLink href="/services">Services</ButtonLink>}
      >
        <p>
          Structural detailing engineered around project deliverables. We support EPC and fabrication teams with
          disciplined structural drawing and modelling capability, from greenfield layouts to brownfield modification
          packages.
        </p>
        <p>
          Seven service lines cover steel and reinforced concrete, onshore and offshore, from plant modelling and
          general arrangements through to shop and fabrication drawings, MTO and QA/QC.
        </p>
      </ImageBand>

      <section className="bg-white">
        <div className="container-site section-y">
          <ul className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Project experience */}
      <section className="grid bg-white lg:grid-cols-12">
        <div className="bg-navy-800 px-5 py-16 text-mist sm:px-8 lg:col-span-5 lg:px-12 lg:py-24 xl:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
          <div className="lg:sticky lg:top-28">
            <SectionHeading slab onDark title="Experience Across Major Energy Projects" />
            <p data-reveal className="mt-5 max-w-sm text-[0.9375rem] leading-7 font-normal">
              Representative projects from the professional experience of our senior team, gained with established
              EPC, engineering and construction organizations.
            </p>
            <div data-reveal className="mt-8">
              <ButtonLink href="/project-experience" variant="light">
                See All Project Experience
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

      {/* 6. Greenfield + brownfield */}
      <ImageBand
        title="Supporting Both"
        accent="Greenfield & Brownfield Delivery"
        image="/images/brownfield-structure.jpg"
        imageAlt="Existing refinery units with columns, piping and steel structures"
        actions={
          <>
            <ButtonLink href="/services/brownfield-structural-modifications">Brownfield Services</ButtonLink>
            <ArrowLink href="/capabilities#greenfield-brownfield" onDark>
              Greenfield &amp; brownfield capability
            </ArrowLink>
          </>
        }
      >
        <p>
          <strong className="font-bold">Greenfield:</strong> plant modelling, general arrangements and detailed shop
          and fabrication drawings for new industrial and structural developments.
        </p>
        <p>
          <strong className="font-bold">Brownfield</strong> is a demonstrated strength of our senior team, covering
          work on existing and operating facilities:
        </p>
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {brownfieldScope.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[0.9375rem] font-medium">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-energy" />
              {item}
            </li>
          ))}
        </ul>
      </ImageBand>

      {/* 7. Major project exposure */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="Decades of Experience Across Critical Energy Projects"
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

      {/* 8. Software */}
      <section className="bg-navy-800 text-mist">
        <div className="container-site section-y">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading slab onDark title="Engineering Tools" accent="Built for Complex Project Delivery" />
            <ButtonLink href="/capabilities" variant="light">
              Capabilities
            </ButtonLink>
          </div>
          <div className="mt-12">
            <SoftwareCapabilities detailed={false} />
          </div>
        </div>
      </section>

      {/* 9. Industries */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading centered title="Industries We Support" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <li key={industry.id} data-reveal style={{ "--reveal-delay": `${(index % 4) * 60}ms` } as React.CSSProperties}>
                <Link
                  href={`/industries#${industry.id}`}
                  className="lift group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-navy-900 p-5 text-mist shadow-[0_8px_24px_rgb(0_36_56/0.15)]"
                >
                  <Image
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                    className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-navy-900/95 via-navy-900/45 to-navy-900/10" />
                  <span className="flex w-full items-end justify-between gap-3 text-base leading-5 font-extrabold">
                    {industry.short}
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-energy transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 flex justify-center">
            <ButtonLink href="/industries" variant="light">
              All Industries
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Factory, HardHat, Ruler } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Disclaimer } from "@/components/Disclaimer";
import { ExperienceMetrics } from "@/components/ExperienceMetrics";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SoftwareCapabilities } from "@/components/SoftwareCapabilities";
import { softwareQualifier } from "@/lib/software";
import { servicePath, services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { priorEnvironments } from "@/lib/site";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Hormuz-Energy's specialist civil and structural production focus, the professional background of its senior team, and its approach to engineering work packages.",
  path: "/about",
  image: "/images/about-experience.jpg",
});

/** Who we support (spec v2 §12.1): buyers, not industries. */
const pillars = [
  { icon: Building2, title: "EPC contractors", text: "Structural production capacity for defined packages during detailed engineering." },
  { icon: Ruler, title: "Engineering consultancies", text: "Drawing, modelling and documentation support for your design team." },
  { icon: Factory, title: "Steel fabricators", text: "Shop and erection drawings and lists from approved design packages." },
  { icon: HardHat, title: "Industrial project teams", text: "Modification drawings and records for work on existing plant." },
];

const approach = [
  {
    title: "Understand the inputs",
    text: "We start from the design basis, project specifications and current discipline layouts, and raise queries before modelling begins rather than after drawings are issued.",
  },
  {
    title: "Model and detail",
    text: "Structures are modelled or drawn in the environment agreed at scope review, with drawings and material take-off produced from the same source.",
  },
  {
    title: "Check and review",
    text: "Deliverables follow the project-agreed checking process: an originator self-check, a second-person check where resourced and agreed, and model review where a model exists.",
  },
  {
    title: "Issue and maintain",
    text: "Comments and design changes are incorporated under revision control, through to as-built records where required.",
  },
];

const principles = [
  { title: "Defined scope", text: "Deliverables, inputs, exclusions and responsibilities agreed in writing before work starts." },
  { title: "Design authority respected", text: "Design decisions and approvals stay with the responsible engineer; we produce the documentation." },
  { title: "Coordinated reviews", text: "Queries raised early, comments closed out in writing, and every revision identified." },
  { title: "Confidentiality", text: "Confidentiality agreements and controlled file transfer can be discussed before files are shared; client work is never published without authorisation." },
];

const quality = [
  "Originator self-check against inputs and standards",
  "Second-person check, where resourced and agreed",
  "Model review for interfaces, where reference models exist",
  "Recorded comments with verified close-out",
  "Revision control on every issued deliverable",
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        title="Built on Decades"
        accent="Of Project Experience"
        intro="A specialist civil and structural engineering support offering for consultancies, EPC contractors, steel fabricators and industrial project teams, informed by senior personnel experience on energy and industrial projects."
        image="/images/about-experience.jpg"
        imageAlt="Refinery process columns and steel structures in daylight"
        crumbs={[{ name: "About", path: "/about" }]}
      />

      {/* Who we are */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Who We Support" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  className="rounded-xl bg-paper p-5"
                >
                  <pillar.icon aria-hidden className="size-6 text-energy-deep" />
                  <h3 className="mt-3 text-[0.9375rem] font-extrabold text-navy-900">{tc(pillar.title)}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="lg:col-span-7">
            <p className="text-xl leading-relaxed font-semibold text-navy-900 sm:text-2xl sm:leading-relaxed">
              Hormuz-Energy is developing a specialist engineering support offering: civil and structural drawing
              production, steel detailing, Tekla and associated 3D structural modelling, concrete and rebar
              documentation and plant modification drawing support.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              As a company we are building our independent presence. The technical background informing this focus
              includes senior personnel experience on energy, refinery, industrial and onshore and offshore projects,
              gained through previous employers in Pakistan, the Gulf and other international markets.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              That experience guides the types of work package we assess. Each new assignment is accepted according to
              current team competence, software compatibility, project requirements and agreed technical
              responsibilities, and is produced from the design issued by the responsible engineering organization.
            </p>
          </div>
        </div>
      </section>

      {/* Our experience */}
      <section className="grid-motif bg-navy-900 text-white">
        <div className="container-site section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Professional background"
                title="Decades of Experience"
                accent="Across Critical Energy Projects"
                onDark
              />
            </div>
            <div data-reveal className="lg:col-span-6">
              <p className="text-base leading-relaxed text-haze sm:text-lg">
                Our senior professionals have contributed to numerous greenfield and brownfield developments across
                the UAE, Saudi Arabia, Qatar, Pakistan and other international markets — supporting complex
                structural deliverables from plant modelling and general arrangements through detailed shop and
                fabrication drawings. This is individual professional experience, not a history of company projects.
              </p>
              <ArrowLink href="/project-experience" onDark className="mt-7">
                View project experience
              </ArrowLink>
            </div>
          </div>

          <div className="mt-16 border-t border-white/15 pt-10">
            <ExperienceMetrics />
          </div>

          <div data-reveal className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h3 className="text-xs font-bold tracking-[0.18em] text-energy uppercase">Where the experience was gained</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-haze">
                Senior team members&rsquo; careers include employment and project engagements within the following
                organizations and project environments, and similar ones. These are prior professional settings, not
                current corporate partnerships.
              </p>
            </div>
            <ul className="grid grid-cols-2 border-t border-l border-white/15 sm:grid-cols-3 lg:col-span-7">
              {priorEnvironments.map((name) => (
                <li key={name} className="flex min-h-20 items-center border-r border-b border-white/15 px-5 py-4 text-lg font-extrabold tracking-tight">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <Disclaimer onDark className="mt-10" />
        </div>
      </section>

      {/* Technical focus */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Technical focus"
              title="Six Technical Services"
              intro="Civil and structural production for energy and process facilities, where our senior team's experience lies."
            />
            <ArrowLink href="/industries" className="mt-7">
              Industries & project environments
            </ArrowLink>
          </div>
          <ul data-reveal className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-7">
            {services.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={servicePath(service.slug)}
                  className="group flex min-h-14 items-center justify-between gap-4 py-2 text-[0.9375rem] font-bold text-navy-900 transition-colors hover:text-teal-700"
                >
                  {service.title}
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-energy-ink transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery approach */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Delivery approach"
            title="A Disciplined Path"
            accent="From Input to Issue"
            intro="How we approach work packages: a remotely delivered model that works within our clients' document control and review cycles. Capacity is confirmed for each request."
          />
          <ol className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                className="border-t-2 border-navy-900 pt-6 pb-10"
              >
                <span className="text-xs font-bold text-energy-ink tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-extrabold text-navy-900">{tc(step.title)}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quality & review */}
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
            <SectionHeading
              eyebrow="Quality & review"
              title="Checked Before It Is Issued"
              intro="Structural deliverables are only useful if they can be relied on. Checking is part of production, not a step added at the end."
            />
            <ul data-reveal className="mt-8 max-w-xl border-t border-line">
              {quality.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-line py-3.5 text-[0.9375rem] font-semibold text-ink">
                  <span aria-hidden className="size-1.5 shrink-0 bg-energy-deep" />
                  {tc(item)}
                </li>
              ))}
            </ul>
            <ArrowLink href="/quality-delivery" className="mt-8">
              Quality &amp; Delivery
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading slab title="How We Work" intro="The principles behind every package, whatever its size." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, i) => (
              <li
                key={principle.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)]"
              >
                <h3 className="text-base font-extrabold text-navy-900">{tc(principle.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-ink">{principle.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Software */}
      <section className="bg-navy-950 text-white">
        <div className="container-site section-y">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Software experience"
              title="Tools of the Energy Sector"
              onDark
              intro={softwareQualifier}
            />
            <ButtonLink href="/capabilities" variant="outlineLight">
              View Capabilities
            </ButtonLink>
          </div>
          <div className="mt-12">
            <SoftwareCapabilities detailed={false} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

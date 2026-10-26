import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Factory, HardHat, Ruler, Scale } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Disclaimer } from "@/components/Disclaimer";
import { ExperienceMetrics } from "@/components/ExperienceMetrics";
import { ExperienceTicker } from "@/components/ExperienceTicker";
import { FaqList } from "@/components/FaqList";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SoftwareCapabilities } from "@/components/SoftwareCapabilities";
import { aboutFaqs } from "@/lib/faqs";
import { softwareQualifier } from "@/lib/software";
import { servicePath, services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { motto, purpose, site, tickerDisclaimers } from "@/lib/site";
import { tc } from "@/lib/text";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `About ${site.name}`,
    description:
      "Learn about Hormuz-Energy's structural detailing, TEKLA modelling and CAD production services, delivery approach and senior team's prior energy-sector project experience.",
    path: "/about",
    image: "/images/about-experience.jpg",
  }),
  title: { absolute: `About ${site.name} | Structural Detailing & Engineering Support` },
};

/** Who we work with (brief section E): buyers, not industries. */
const pillars = [
  { icon: Building2, title: "EPC contractors", text: "Needing drawing and model production capacity for defined packages." },
  { icon: Ruler, title: "Engineering consultancies", text: "Handling multidisciplinary design packages that need production support." },
  { icon: Factory, title: "Steel fabricators", text: "Requiring structured shop-drawing packages from approved design." },
  { icon: HardHat, title: "Industrial project teams", text: "Managing revisions and modifications to existing facilities." },
];

/** How we work (brief section E). */
const approach = [
  { title: "Clarify the scope", text: "Scope, design inputs and the deliverable register are clarified first." },
  {
    title: "Confirm the basis",
    text: "Project specifications, applicable codes and editions, software, file formats and responsibilities are confirmed.",
  },
  {
    title: "Produce",
    text: "Drawings and models are produced against current approved information, with technical queries raised for unresolved issues.",
  },
  { title: "Check and review", text: "The checking and review steps agreed for the assignment are performed, and client comments actioned." },
  { title: "Issue", text: "The revision-controlled package is issued, with schedules and registers where included." },
];

/** Delivery principles, each tied to a practical behaviour rather than a credential. */
const principles = [
  { title: "Clarity", text: "Deliverables, inputs, exclusions and responsibilities written down before production starts." },
  { title: "Traceability", text: "Every issue tied to its input revisions, with superseded information identified." },
  { title: "Technical coordination", text: "Discipline, vendor and fabricator interfaces checked and conflicts raised as queries." },
  { title: "Responsive communication", text: "Questions raised early and comments closed out in writing before re-issue." },
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
        title={`About ${site.name}`}
        accent="Civil & Structural Engineering Support"
        intro="Specialist structural detailing and engineering production support for energy and industrial infrastructure."
        image="/images/about-experience.jpg"
        imageAlt="Refinery process columns and steel structures in daylight"
        crumbs={[{ name: "About", path: "/about" }]}
      />

      {/* Who we are + who we work with */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Who We Work With" />
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
              {site.name} is developing as a focused provider of structural drawing production, steel detailing, 3D
              modelling and engineering documentation services.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              Based in Pakistan and oriented toward EPC contractors, engineering consultancies and steel fabricators
              across the Gulf and international markets, we support defined technical packages that fit within the
              client&rsquo;s engineering and project-control processes.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              Our approach draws on the prior professional experience of senior personnel who have worked on onshore and
              offshore energy developments, refinery and gas-processing facilities, industrial structures and brownfield
              modifications. That experience belongs to the people involved; it is not a claim that {site.name} itself
              executed their former employers&rsquo; projects.
            </p>
          </div>
        </div>
      </section>

      {/* Experience behind the business */}
      <section className="grid-motif bg-navy-900 text-white">
        <div className="container-site section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading eyebrow="Professional background" title="Experience Behind" accent="the Business" onDark />
            </div>
            <div data-reveal className="lg:col-span-6">
              <p className="text-base leading-relaxed text-haze sm:text-lg">
                Our senior team&rsquo;s prior professional backgrounds include assignments within established EPC and
                engineering organisations and exposure to oil and gas, petrochemical, offshore and industrial plant
                projects. Selected engagements are documented in our Project Experience section, identifying previous
                employment contexts where available. These were not contracts performed by the present company.
              </p>
              <ArrowLink href="/project-experience" onDark className="mt-7">
                View project experience
              </ArrowLink>
            </div>
          </div>

          <div className="mt-16 border-t border-white/15 pt-10">
            <ExperienceMetrics />
          </div>

          <div data-reveal className="mt-14">
            <ExperienceTicker
              type="formerEmployer"
              label="Organisations where senior team members previously worked"
              disclaimer={tickerDisclaimers.formerEmployer}
              onDark
            />
          </div>
          <Disclaimer onDark className="mt-10" />
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What we do"
              title="Six Technical Services"
              intro="From approved civil and structural arrangements to modelling, shop detailing, reinforcement documentation, material lists and issued drawing registers, we support the production work that connects engineering design information with project delivery. Packages may be undertaken individually or combined where the inputs and responsibilities are defined."
            />
            <ArrowLink href="/industries" className="mt-7">
              Industries & project environments
            </ArrowLink>
          </div>
          <ul data-reveal className="grid content-start border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-7">
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

      {/* How we work */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="How we work"
            title="A Disciplined Path"
            accent="From Input to Issue"
            intro="A remotely delivered model that works within our clients' document control and review cycles. Capacity is confirmed for each request."
          />
          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* Mission, vision & delivery principles */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading slab title="Our Mission, Vision & Delivery Principles" />
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {purpose.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="rounded-xl border-t-4 border-energy-deep bg-paper p-7"
              >
                <h3 className="text-lg font-extrabold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink">{item.text}</p>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-12 max-w-3xl text-base leading-7 text-ink">
            These commitments come down to four practical habits on every package:
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, i) => (
              <li
                key={principle.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="rounded-xl border border-line p-6"
              >
                <h3 className="text-base font-extrabold text-navy-900">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink">{principle.text}</p>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-10 text-sm font-bold tracking-[0.16em] text-energy-ink uppercase">
            {motto}
          </p>
        </div>
      </section>

      {/* Scope, standards & engineering responsibility */}
      <section className="bg-navy-900 text-white">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Scale aria-hidden className="size-8 text-energy" />
            <SectionHeading title="Scope, Standards &" accent="Engineering Responsibility" onDark className="mt-5" />
          </div>
          <div data-reveal className="lg:col-span-6">
            <p className="text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              We adapt drawing and modelling production to the client-specified design basis, project codes and
              standards, document conventions and agreed deliverable requirements.
            </p>
            <p className="mt-5 text-base leading-7 text-haze">
              The responsible design organisation retains design authority, structural engineering calculations, design
              validation and statutory approvals unless a separate authorised scope is formally contracted.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              <ArrowLink href="/capabilities/codes-standards" onDark>
                Project-specific standards
              </ArrowLink>
              <ArrowLink href="/quality-delivery" onDark>
                Quality & Delivery
              </ArrowLink>
            </div>
          </div>
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
              intro="Scope-defined production checks, checking arrangements and client review cycles are agreed for each package. Checking is part of production, not a step added at the end."
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

      {/* Technical environments */}
      <section className="bg-navy-950 text-white">
        <div className="container-site section-y">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Technical environments"
              title="Tools of the Energy Sector"
              onDark
              intro="Experience across Tekla Structures, AutoCAD and industry-specific plant and model environments informs our delivery approach. The exact tools, licences, versions and interoperable file formats are confirmed for each new project."
            />
            <ButtonLink href="/capabilities" variant="outlineLight">
              View Capabilities
            </ButtonLink>
          </div>
          <div className="mt-12">
            <SoftwareCapabilities detailed={false} />
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-haze">{softwareQualifier}</p>
        </div>
      </section>

      {/* Common questions */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Common Questions" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              About our experience, the environments we support and how project information is handled.
            </p>
            <ArrowLink href="/faq" className="mt-6">
              All frequently asked questions
            </ArrowLink>
          </div>
          <div className="lg:col-span-7">
            <FaqList faqs={aboutFaqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss Your"
        accent="Engineering Package"
        copy="Share your scope, the design inputs you have and your target dates. We will review the information and clarify the proposed production package."
      />
    </>
  );
}

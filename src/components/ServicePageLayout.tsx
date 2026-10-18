import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { projectByService, projectPath } from "@/lib/projects";
import { serviceJsonLd } from "@/lib/seo";
import { deliverySteps, serviceDetails } from "@/lib/service-details";
import { services, servicePath, type Service } from "@/lib/services";
import { software } from "@/lib/software";
import { ArrowLink, ButtonLink } from "./ButtonLink";
import { CTASection } from "./CTASection";
import { Disclaimer } from "./Disclaimer";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { SectionHeading } from "./SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");
const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as React.CSSProperties;

/** Column count that leaves no ragged final row for the "What we deliver" grid. */
const deliverColumns = (count: number) => (count === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3");

export function ServicePageLayout({ service }: { service: Service }) {
  const index = services.findIndex((s) => s.slug === service.slug);
  const detail = serviceDetails[service.slug];
  const project = projectByService(service.slug);
  const others = services.filter((s) => s.slug !== service.slug);
  const proofHref = project ? projectPath(project.id) : "/project-experience";
  const tools = software.filter((tool) => service.software?.tools.includes(tool.name));
  // Brownfield is a core differentiator, so its focus band takes the strongest treatment.
  const emphasised = service.slug === "brownfield-structural-modifications";
  const [introLead, ...introRest] = service.intro;
  // Five deliverables would leave a gap in a three-column grid, so a sixth tile invites a conversation.
  const deliverFill = service.deliver.length % 3 === 2;

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />

      {/* A. Hero */}
      <Hero
        eyebrow={`Service ${pad(index + 1)}`}
        title={service.heading[0]}
        accent={service.heading[1]}
        intro={service.summary}
        image={service.image}
        imageAlt={service.imageAlt}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: servicePath(service.slug) },
        ]}
      >
        <ButtonLink href={proofHref}>See Proof of Work</ButtonLink>
        <ButtonLink href={`/contact?service=${service.slug}`} variant="light">
          Discuss a Project
        </ButtonLink>
      </Hero>

      {/* B. Overview + at a glance */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-7">
            <p className="eyebrow text-teal-700">Overview</p>
            <h2 className="mt-3 text-xl leading-8 font-bold text-navy-900 sm:text-2xl sm:leading-9">{introLead}</h2>
            {introRest.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
                {paragraph}
              </p>
            ))}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {service.highlights.map((item) => (
                <li key={item} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-navy-900">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside data-reveal className="lg:col-span-5">
            <div className="rounded-xl bg-navy-900 p-7 text-mist shadow-[0_18px_40px_rgb(0_36_56/0.18)] sm:p-9">
              <span aria-hidden className="slab mb-5 h-9 w-11" />
              <h2 className="text-lg font-extrabold uppercase">At a glance</h2>
              <dl className="mt-6 divide-y divide-white/12 border-y border-white/12 text-sm">
                <div className="py-4">
                  <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">Environment</dt>
                  <dd className="mt-1 font-bold text-white">{detail.environment}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">We support</dt>
                  <dd className="mt-1 font-bold text-white">EPC contractors, engineering consultancies and fabricators</dd>
                </div>
                {service.software && (
                  <div className="py-4">
                    <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">Software</dt>
                    <dd className="mt-1 font-bold text-white">{service.software.tools.join(" · ")}</dd>
                  </div>
                )}
                {project && (
                  <div className="py-4">
                    <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">
                      Representative experience
                    </dt>
                    <dd className="mt-1">
                      <Link href={proofHref} className="font-bold text-energy underline-offset-4 hover:underline">
                        {project.name}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
              <ButtonLink href={`/contact?service=${service.slug}`} className="mt-7 w-full">
                Request a Proposal
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      {/* C. What we deliver */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="What We Deliver"
            intro="The core deliverables of this service line, produced to your project standards and checked before issue."
          />
          <ol className={`mt-12 grid gap-5 sm:grid-cols-2 ${deliverColumns(service.deliver.length)}`}>
            {service.deliver.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={delay(i % 3)}
                className="lift flex flex-col rounded-xl bg-white p-7 shadow-[0_6px_20px_rgb(0_36_56/0.07)] hover:shadow-[0_14px_34px_rgb(0_36_56/0.12)]"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-navy-900 text-sm font-bold text-energy tabular-nums">
                  {pad(i + 1)}
                </span>
                <h3 className="mt-5 text-lg leading-snug font-extrabold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink">{item.description}</p>
              </li>
            ))}
            {deliverFill && (
              <li data-reveal className="flex flex-col justify-between rounded-xl bg-navy-800 p-7 text-mist">
                <div>
                  <h3 className="text-lg leading-snug font-extrabold text-white">Scope not listed here?</h3>
                  <p className="mt-3 text-[0.9375rem] leading-7">
                    Share your package and we will confirm how it fits within our structural detailing and modelling
                    capability.
                  </p>
                </div>
                <ArrowLink href={`/contact?service=${service.slug}`} onDark className="mt-5">
                  Talk to our team
                </ArrowLink>
              </li>
            )}
          </ol>
        </div>
      </section>

      {/* D. Service-specific focus band */}
      <section className={`text-white ${emphasised ? "bg-teal-700" : "bg-navy-900"}`}>
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={service.focus.eyebrow} title={service.focus.heading} size="md" onDark />
            <p data-reveal className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              {service.focus.body}
            </p>
          </div>
          <ul className="lg:col-span-6 lg:pt-2">
            {service.focus.points.map((point, i) => (
              <li
                key={point}
                data-reveal
                style={delay(i)}
                className="flex gap-4 border-t border-white/20 py-5 text-base leading-snug font-semibold last:border-b sm:text-lg"
              >
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-energy" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* E. Structures, inputs and deliverables */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading slab title="Typical Structures" intro="Structures this service line regularly covers on energy projects." />
          <ul data-reveal className="mt-8 flex flex-wrap gap-2.5">
            {service.applications.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2.5 rounded-lg border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-navy-900"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-energy-deep" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div data-reveal className="rounded-xl border border-line p-7 sm:p-9">
              <p className="eyebrow text-teal-700">What we work from</p>
              <h3 className="mt-2 text-xl font-extrabold text-navy-900">Inputs from your team</h3>
              <ul className="mt-6">
                {detail.inputs.map((item) => (
                  <li key={item} className="flex gap-3.5 border-t border-line py-3.5 text-[0.9375rem] leading-6 font-medium text-ink">
                    <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className="rounded-xl bg-navy-800 p-7 text-mist sm:p-9">
              <p className="eyebrow text-energy">What you receive</p>
              <h3 className="mt-2 text-xl font-extrabold text-white">Deliverables</h3>
              <ul className="mt-6">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3.5 border-t border-white/15 py-3.5 text-[0.9375rem] leading-6 font-medium">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-energy" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* F. Delivery process */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="How We Deliver"
            intro="The same disciplined sequence on every package, sized to your schedule and document control."
          />
          <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 bg-line lg:block" />
            {deliverySteps.map((step, i) => (
              <li key={step.title} data-reveal style={delay(i)} className="relative text-center">
                <span className="relative mx-auto grid size-12 place-items-center rounded-full border-4 border-paper bg-energy-deep text-sm font-bold text-white tabular-nums">
                  {pad(i + 1)}
                </span>
                <h3 className="mt-5 text-base font-extrabold text-navy-900">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-ink">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* G. Software */}
      {service.software && tools.length > 0 && (
        <section className="bg-white">
          <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading slab title="Software & Technical Capability" size="md" />
              <p data-reveal className="mt-5 text-base leading-7 text-ink">
                {service.software.note} Files are exchanged in the formats your project specifies, and models and drawings
                follow your numbering, title block and revision conventions.
              </p>
              <ArrowLink href="/capabilities" className="mt-6">
                Full capabilities
              </ArrowLink>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {tools.map((tool, i) => (
                <li
                  key={tool.name}
                  data-reveal
                  style={delay(i % 2)}
                  className={`rounded-xl border border-line p-6 ${
                    tools.length % 2 === 1 && i === tools.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <h3 className="text-lg font-extrabold text-navy-900">{tool.name}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-teal-700 uppercase">{tool.discipline}</p>
                  <p className="mt-3 text-sm leading-6 text-ink">{tool.use}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* H. Representative project experience and proof of work */}
      {project && (
        <section className="bg-navy-950 text-white">
          <div className="grid lg:grid-cols-2">
            <div data-reveal="image" className="relative min-h-72 overflow-hidden bg-navy-900 lg:min-h-[36rem]">
              <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
              <SectionHeading eyebrow="Representative project experience" title={project.name} size="md" onDark />
              {project.subtitle && <p className="mt-2 font-bold text-energy">{project.subtitle}</p>}
              <p data-reveal className="mt-6 max-w-xl text-base leading-7 text-haze">
                {project.description}
              </p>
              <dl data-reveal className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 border-t border-white/15 text-sm">
                {[
                  ["Sector", project.sector],
                  ["Environment", project.environment ?? "—"],
                  ["Location", project.location],
                  ["Experience through", project.experienceThrough.join(" · ")],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-white/15 py-3.5">
                    <dt className="text-[0.6875rem] font-bold tracking-[0.16em] text-haze uppercase">{label}</dt>
                    <dd className="mt-1 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <div data-reveal className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={proofHref}>View Relevant Project Experience</ButtonLink>
                <ArrowLink href="/project-experience" onDark>
                  View All Project Experience
                </ArrowLink>
              </div>
              <Disclaimer onDark className="mt-10" />
            </div>
          </div>
        </section>
      )}

      {/* I. Questions */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Common Questions" size="md" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              Straight answers on how this service works. For anything specific to your package, our team will respond
              directly.
            </p>
            <ArrowLink href={`/contact?service=${service.slug}`} className="mt-6">
              Ask about your scope
            </ArrowLink>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {detail.faqs.map((faq, i) => (
              <details
                key={faq.q}
                data-reveal
                style={delay(i)}
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

      {/* J. Other services */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading slab title="Explore Other Services" size="md" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={servicePath(other.slug)}
                  className="lift group flex h-full items-center gap-4 rounded-xl border border-line p-3 pr-5 transition-colors hover:border-energy-deep"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-navy-900">
                    <Image src={other.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="flex-1 text-[0.9375rem] leading-5 font-bold text-navy-900 group-hover:text-energy-ink">
                    {other.title}
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-energy-deep transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* K. CTA */}
      <CTASection serviceSlug={service.slug} />
    </>
  );
}

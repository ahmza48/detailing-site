import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleSlash, Plus } from "lucide-react";
import { industries, industryPath } from "@/lib/industries";
import { projectPath, projectsForService } from "@/lib/projects";
import { serviceJsonLd } from "@/lib/seo";
import { servicePath, type Service } from "@/lib/services";
import { software, softwareQualifier } from "@/lib/software";
import { ArrowLink, ButtonLink } from "./ButtonLink";
import { CTASection } from "./CTASection";
import { Disclaimer } from "./Disclaimer";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { ProjectCard } from "./ProjectCard";
import { ProcessSteps } from "./ProcessSteps";
import { SectionHeading } from "./SectionHeading";
import { StandardsSummary } from "./StandardsSummary";

const pad = (n: number) => String(n).padStart(2, "0");
const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as React.CSSProperties;

/** Desktop columns that avoid a single orphaned card on the last row. */
const subserviceColumns = (count: number) =>
  count === 2 ? "lg:grid-cols-2" : count === 4 || count === 7 || count === 8 ? "lg:grid-cols-4" : "lg:grid-cols-3";

/**
 * Detailed service page (spec 7.3): hero → at a glance → ordered subservices →
 * applications → inputs vs outputs → standards → software → process →
 * responsibility → evidence → FAQs → related → CTA.
 */
export function ServicePageLayout({ service }: { service: Service }) {
  const projects = projectsForService(service.slug, service.leadProject);
  const [lead, ...moreProjects] = projects;
  const tools = software.filter((tool) => service.software.tools.includes(tool.name));
  const sectors = industries.filter((industry) => industry.packages.some((p) => p.service === service.slug));
  const quoteHref = `/contact?service=${service.slug}`;
  const [introLead, ...introRest] = service.intro;
  // Running number across subservice groups, so numbering continues 01..07 between headings.
  const groupOffsets = service.subserviceGroups.map((_, g) =>
    service.subserviceGroups.slice(0, g).reduce((sum, group) => sum + group.items.length, 0),
  );

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />

      {/* Hero */}
      <Hero
        eyebrow={`Service ${service.id.slice(1)}`}
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
        <ButtonLink href={quoteHref}>Request this Service</ButtonLink>
        {lead && (
          <ButtonLink href={projectPath(lead.id)} variant="light">
            Related Experience
          </ButtonLink>
        )}
      </Hero>

      {/* Overview + at a glance */}
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
                  <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">Deliverable</dt>
                  <dd className="mt-1 font-bold text-white">{service.deliverableType}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">Typical buyers</dt>
                  <dd className="mt-1 font-bold text-white">EPC contractors, engineering consultancies and steel fabricators</dd>
                </div>
                <div className="py-4">
                  <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">Software</dt>
                  <dd className="mt-1 font-bold text-white">{service.software.tools.join(" · ")}</dd>
                  <dd className="mt-1 text-xs text-haze">Version and formats confirmed during scope review</dd>
                </div>
                {sectors.length > 0 && (
                  <div className="py-4">
                    <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-haze uppercase">Sectors</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {sectors.map((industry) => (
                        <Link
                          key={industry.slug}
                          href={industryPath(industry.slug)}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition-colors hover:border-energy hover:text-energy"
                        >
                          {industry.short}
                        </Link>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              <ButtonLink href={quoteHref} className="mt-7 w-full">
                Request a Proposal
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      {/* What the service covers: ordered subservices */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="What the Service Covers"
            intro="The work within this service, in the order it is usually produced. Any part can be scoped on its own."
          />
          <div className="mt-12 space-y-12">
            {service.subserviceGroups.map((group, g) => (
              <div key={group.heading ?? g}>
                {group.heading && (
                  <h3 data-reveal className="mb-5 text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">
                    {group.heading}
                  </h3>
                )}
                <ol className={`grid gap-5 sm:grid-cols-2 ${subserviceColumns(group.items.length)}`}>
                  {group.items.map((item, i) => {
                    const number = groupOffsets[g] + i + 1;
                    return (
                      <li
                        key={item.id}
                        data-reveal
                        style={delay(i % 3)}
                        className="lift flex flex-col rounded-xl bg-white p-6 shadow-[0_6px_20px_rgb(0_36_56/0.07)] hover:shadow-[0_14px_34px_rgb(0_36_56/0.12)]"
                      >
                        <span className="grid size-10 place-items-center rounded-lg bg-navy-900 text-sm font-bold text-energy tabular-nums">
                          {pad(number)}
                        </span>
                        <h4 className="mt-5 text-base leading-snug font-extrabold text-navy-900">{item.title}</h4>
                        <p className="mt-2 text-[0.9375rem] leading-7 text-ink">{item.description}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-white">
        <div className="container-site section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading slab title="Typical Structures" intro="Structures this service regularly covers on energy and industrial projects." />
            <ArrowLink href="/applications">Find by structure type</ArrowLink>
          </div>
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

          {/* Inputs vs outputs */}
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div data-reveal className="rounded-xl border border-line p-7 sm:p-9">
              <p className="eyebrow text-teal-700">What we work from</p>
              <h3 className="mt-2 text-xl font-extrabold text-navy-900">Inputs from your team</h3>
              <ul className="mt-6">
                {service.inputs.map((item) => (
                  <li key={item} className="flex gap-3.5 border-t border-line py-3.5 text-[0.9375rem] leading-6 font-medium text-ink">
                    <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-slate">Each input is logged with its revision and status before production starts.</p>
            </div>
            <div data-reveal className="rounded-xl bg-navy-800 p-7 text-mist sm:p-9">
              <p className="eyebrow text-energy">What you receive</p>
              <h3 className="mt-2 text-xl font-extrabold text-white">Deliverables</h3>
              <ul className="mt-6">
                {service.outputs.map((item) => (
                  <li key={item} className="flex gap-3.5 border-t border-white/15 py-3.5 text-[0.9375rem] leading-6 font-medium">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-energy" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-haze">Deliverables, formats and assumptions are confirmed in the scope of work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Codes & standards */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <StandardsSummary refs={service.standardsRefs} note={service.standardsNote} />
        </div>
      </section>

      {/* Software */}
      {tools.length > 0 && (
        <section className="bg-white">
          <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading slab title="Software & Workflow" size="md" />
              <p data-reveal className="mt-5 text-base leading-7 text-ink">
                {service.software.note}
              </p>
              <p data-reveal className="mt-4 text-sm leading-6 text-slate">
                {softwareQualifier}
              </p>
              <ArrowLink href="/capabilities#formats" className="mt-6">
                File formats & workflow
              </ArrowLink>
            </div>
            <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
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

      {/* Page-specific technical process */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="How the Work Proceeds"
            intro="The usual sequence for this service. Steps can overlap, and review comments loop back to earlier steps."
          />
          <div className="mt-14">
            <ProcessSteps steps={service.workflow} />
          </div>
        </div>
      </section>

      {/* Responsibility boundaries */}
      <section className="bg-navy-900 text-white">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Scope & responsibility" title="Not Included by Implication" size="md" onDark />
            <p data-reveal className="mt-6 max-w-xl text-base leading-7 text-white/85">
              {service.boundaryNote}
            </p>
            <p data-reveal className="mt-4 max-w-xl text-sm leading-6 text-haze">
              Design responsibility and approvals remain with the responsible engineer unless separately agreed with
              appropriately qualified professionals. Work outside these limits can be discussed as a custom scope.
            </p>
            <div data-reveal className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              <ArrowLink href="/quality-delivery" onDark>
                Quality & Delivery
              </ArrowLink>
              <ArrowLink href="/capabilities/codes-standards" onDark>
                Codes & Standards
              </ArrowLink>
            </div>
          </div>
          <ul className="lg:col-span-6 lg:pt-2">
            {service.boundaries.map((item, i) => (
              <li
                key={item}
                data-reveal
                style={delay(i)}
                className="flex gap-4 border-t border-white/20 py-5 text-base leading-snug font-semibold last:border-b"
              >
                <CircleSlash aria-hidden className="mt-0.5 size-5 shrink-0 text-energy" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Evidence: prior professional experience */}
      {lead && (
        <section className="bg-navy-950 text-white">
          <div className="grid lg:grid-cols-2">
            <div data-reveal="image" className="relative min-h-72 overflow-hidden bg-navy-900 lg:min-h-[36rem]">
              <Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
              <SectionHeading eyebrow="Selected professional experience" title={lead.name} size="md" onDark />
              {lead.subtitle && <p className="mt-2 font-bold text-energy">{lead.subtitle}</p>}
              <Disclaimer
                onDark
                className="mt-5"
                text="Prior professional engagement of a senior team member, not a project contracted to Hormuz-Energy."
              />
              <p data-reveal className="mt-5 max-w-xl text-base leading-7 text-haze">
                {lead.description}
              </p>
              <dl data-reveal className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 border-t border-white/15 text-sm">
                {[
                  ["Sector", lead.sector],
                  ["Environment", lead.environment ?? "—"],
                  ["Location", lead.location],
                  ["Experience through", lead.experienceThrough.join(" · ")],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-white/15 py-3.5">
                    <dt className="text-[0.6875rem] font-bold tracking-[0.16em] text-haze uppercase">{label}</dt>
                    <dd className="mt-1 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <div data-reveal className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={projectPath(lead.id)}>View This Experience</ButtonLink>
                <ArrowLink href="/project-experience" onDark>
                  All professional experience
                </ArrowLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {moreProjects.length > 0 && (
        <section className="bg-white">
          <div className="container-site section-y">
            <SectionHeading slab title="Further Relevant Experience" size="md" />
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {moreProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            <p data-reveal className="mt-8 text-xs leading-5 text-slate">
              Prior professional engagements of senior team members. Photographs are representative industry images.
            </p>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Common Questions" size="md" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              Straight answers on how this service works. Scopes outside what is described here are reviewed case by
              case; we confirm we have the right competence before quoting.
            </p>
            <ArrowLink href={quoteHref} className="mt-6">
              Ask about your scope
            </ArrowLink>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {service.faqs.map((faq, i) => (
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

      {/* Related next steps */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading slab title="Related Next Steps" size="md" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="lift group flex h-full flex-col rounded-xl border border-line p-6 transition-colors hover:border-energy-deep"
                >
                  <span className="text-base leading-snug font-extrabold text-navy-900 group-hover:text-energy-ink">{link.label}</span>
                  <span className="mt-2 flex-1 text-sm leading-6 text-ink">{link.text}</span>
                  <ArrowRight aria-hidden className="mt-4 size-4 text-energy-deep transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Request a quote for"
        accent={service.title}
        copy="Send the scope of work, the design inputs you have and your target schedule. We will confirm the deliverables, standards and formats in a written proposal."
        serviceSlug={service.slug}
      />
    </>
  );
}

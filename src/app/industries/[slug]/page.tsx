import type { Metadata } from "next";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, Check, CircleSlash } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Disclaimer } from "@/components/Disclaimer";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { ScopeChecklist } from "@/components/ScopeChecklist";
import { SectionHeading } from "@/components/SectionHeading";
import { StandardsSummary } from "@/components/StandardsSummary";
import { industries, industryBySlug, industryPath, type Industry } from "@/lib/industries";
import { projectsForIndustry } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, servicePath } from "@/lib/services";
import { tc } from "@/lib/text";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: industryPath(industry.slug),
    image: industry.image,
  });
}

function IndustryLayout({ industry }: { industry: Industry }) {
  const packages = industry.packages
    .map((p) => ({ ...p, service: serviceBySlug(p.service) }))
    .filter((p) => p.service !== undefined);
  const projects = projectsForIndustry(industry.slug);
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <Hero
        eyebrow="Industry"
        title={industry.name}
        intro={industry.summary}
        image={industry.image}
        imageAlt={industry.imageAlt}
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: industryPath(industry.slug) },
        ]}
      >
        <ButtonLink href="/contact">Request a Quote</ButtonLink>
        <ButtonLink href="#packages" variant="light">
          Relevant Services
        </ButtonLink>
      </Hero>

      {/* Overview */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-7">
            <SectionHeading slab title="Industry Overview" />
            <p className="mt-6 text-lg leading-8 font-semibold text-navy-900 sm:text-xl sm:leading-9">{industry.intro[0]}</p>
            {industry.intro.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
                {paragraph}
              </p>
            ))}
          </div>
          <aside data-reveal className="lg:col-span-5">
            <div className="rounded-xl bg-navy-900 p-7 text-mist shadow-[0_18px_40px_rgb(0_36_56/0.18)] sm:p-9">
              <span aria-hidden className="slab mb-5 h-9 w-11" />
              <h3 className="text-lg font-extrabold">Typical Structures</h3>
              <ul className="mt-5">
                {industry.structures.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-white/12 py-3 text-sm font-semibold">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-energy" />
                    {tc(item)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div data-reveal className="border-t border-line pt-12 lg:col-span-12">
            <h3 className="text-lg font-extrabold text-navy-900">Core Services in This Sector</h3>
            <p className="mt-2 mb-6 max-w-3xl text-[0.9375rem] leading-7 text-ink">
              Civil and structural production work commonly commissioned for these facilities. Each item is delivered
              through one of our six services and scoped to the approved project inputs.
            </p>
            <ScopeChecklist groups={[{ items: industry.scope }]} columns={3} />
          </div>
        </div>
      </section>

      {/* Focus */}
      <section className="bg-navy-900 text-white">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading title={industry.focus.heading} onDark />
            <p data-reveal className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              {industry.focus.body}
            </p>
          </div>
          <ul className="lg:col-span-6 lg:pt-2">
            {industry.focus.points.map((point, i) => (
              <li
                key={point}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="flex gap-4 border-t border-white/20 py-5 text-base leading-snug font-semibold last:border-b sm:text-lg"
              >
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-energy" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Relevant packages */}
      <section id="packages" className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            slab
            title="Relevant Services"
            intro={`The technical services most often commissioned for ${industry.name.toLowerCase()} work, and what each contributes.`}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map(({ service, note }, i) => (
              <li key={service!.slug} data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <Link
                  href={servicePath(service!.slug)}
                  className="lift group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_6px_20px_rgb(0_36_56/0.07)] hover:shadow-[0_14px_34px_rgb(0_36_56/0.12)]"
                >
                  <span className="relative block aspect-[16/7] bg-navy-900">
                    <Image src={service!.image} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                    <span className="absolute bottom-0 left-0 rounded-tr-lg bg-energy-deep px-3 py-1.5 text-xs font-bold text-white">
                      {service!.id}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="text-lg leading-snug font-extrabold text-navy-900 group-hover:text-energy-ink">{service!.title}</span>
                    <span className="mt-2 flex-1 text-[0.9375rem] leading-7 text-ink">{note}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy-900">
                      <ArrowRight aria-hidden className="size-4 text-energy-deep transition-transform group-hover:translate-x-1" />
                      View service
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inputs and boundaries */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-5 lg:grid-cols-2">
          <div data-reveal className="rounded-xl border border-line p-7 sm:p-9">
            <p className="eyebrow text-teal-700">Typical inputs & constraints</p>
            <h3 className="mt-2 text-xl font-extrabold text-navy-900">What Shapes the Work Here</h3>
            <ul className="mt-6">
              {industry.constraints.map((item) => (
                <li key={item} className="flex gap-3.5 border-t border-line py-3.5 text-[0.9375rem] leading-6 font-medium text-ink">
                  <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep" />
                  {tc(item)}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-xl bg-navy-800 p-7 text-mist sm:p-9">
            <p className="eyebrow text-energy">Scope & responsibility</p>
            <h3 className="mt-2 text-xl font-extrabold text-white">Design Stays With the Responsible Engineer</h3>
            <p className="mt-4 text-[0.9375rem] leading-7">
              We produce drawings, models, detailing and documentation from approved design information. Design
              decisions, calculations and approvals remain with the responsible engineer.
            </p>
            {industry.boundaries && (
              <>
                <p className="mt-6 text-xs font-bold tracking-[0.12em] text-energy uppercase">Not included</p>
                <ul className="mt-2">
                  {industry.boundaries.map((item) => (
                    <li key={item} className="flex gap-3.5 border-t border-white/15 py-3.5 text-[0.9375rem] leading-6 font-medium">
                      <CircleSlash aria-hidden className="mt-1 size-4 shrink-0 text-energy" />
                      {tc(item)}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <StandardsSummary refs={industry.standardsRefs} note={industry.standardsNote} title="Standards Framework" />
        </div>
      </section>

      {/* Attributed prior experience */}
      {projects.length > 0 && (
        <section className="bg-white">
          <div className="container-site section-y">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading slab title="Selected Professional Experience" />
              <ArrowLink href="/project-experience">All professional experience</ArrowLink>
            </div>
            <Disclaimer
              className="mt-6"
              text={`Prior professional engagements of senior team members during previous employment, not projects contracted to ${site.name}. Photographs are representative industry images.`}
            />
            <div className={`mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 ${projects.length > 2 ? "lg:grid-cols-4" : "max-w-3xl"}`}>
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other industries */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading slab title="Other Industries" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={industryPath(other.slug)}
                  className="lift group flex h-full items-center gap-3 rounded-xl border border-line bg-white p-3 pr-4 transition-colors hover:border-energy-deep"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-navy-900">
                    <Image src={other.image} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="flex-1 text-sm leading-5 font-bold text-navy-900 group-hover:text-energy-ink">{other.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Discuss a structural package for"
        accent={`${industry.short} facilities`}
        copy="Send the scope of work, the design inputs and standards that apply, and your target schedule."
      />
    </>
  );
}

async function IndustryContent({ params }: { params: PageProps<"/industries/[slug]">["params"] }) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();
  return <IndustryLayout industry={industry} />;
}

function IndustryShell() {
  return (
    <section aria-busy="true" className="bg-navy-900">
      <div className="container-site flex min-h-[26rem] flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-12 lg:min-h-[32rem] lg:pb-16">
        <div className="h-3 w-40 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-6 h-10 w-full max-w-xl animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-6 h-4 w-full max-w-lg animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
      </div>
    </section>
  );
}

export default function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  return (
    <Suspense fallback={<IndustryShell />}>
      <IndustryContent params={params} />
    </Suspense>
  );
}

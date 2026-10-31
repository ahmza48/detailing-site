import Link from "next/link";
import { site } from "@/lib/site";
import { industryBySlug, industryPath } from "@/lib/industries";
import type { Project } from "@/lib/projects";
import { serviceBySlug, servicePath } from "@/lib/services";
import { ArrowLink } from "./ButtonLink";
import { DiagramViewer } from "./DiagramViewer";
import { tc } from "@/lib/text";

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-4">
      <dt className="text-[0.6875rem] font-bold tracking-[0.18em] text-teal-700 uppercase">{label}</dt>
      <dd className="mt-1.5 text-[0.9375rem] leading-snug font-semibold text-ink">{children}</dd>
    </div>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-[0.6875rem] font-bold tracking-[0.18em] text-teal-700 uppercase">{title}</h4>
      <ul className="mt-3 space-y-2 text-[0.9375rem] font-medium text-ink">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-energy-deep" />
            {tc(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Editorial case-study section. `id` is the anchor targeted from service pages. */
export function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const relevant = project.serviceSlugs.map(serviceBySlug).filter((s) => s !== undefined);
  const sectors = project.industrySlugs.map(industryBySlug).filter((i) => i !== undefined);
  const primary = relevant[0];

  return (
    <section
      id={project.id}
      data-project
      aria-labelledby={`${project.id}-title`}
      className={`${index % 2 === 0 ? "bg-paper" : "bg-white"}`}
    >
      <div className="container-site section-y">
        <header data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold tracking-[0.18em] uppercase">
              <span className="text-energy-ink tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              {primary && <span className="text-teal-700">{primary.title}</span>}
            </p>
            <h2 id={`${project.id}-title`} className="display-lg mt-4 text-balance text-navy-900">
              {project.name}
            </h2>
            {project.subtitle && <p className="mt-3 text-lg font-bold text-teal-700 sm:text-xl">{project.subtitle}</p>}
          </div>
          <p className="rounded-lg bg-white/60 text-xs leading-relaxed font-semibold text-slate lg:col-span-3 lg:text-right">
            Prior professional engagement of a senior team member.
            <br className="hidden lg:block" /> Not a project contracted to {site.name}.
          </p>
        </header>

        <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <dl data-reveal className="grid grid-cols-1 gap-x-8 border-b border-line sm:grid-cols-2 lg:col-span-5 lg:self-start">
            <Meta label="Sector">{project.sector}</Meta>
            {project.environment && <Meta label="Environment">{project.environment}</Meta>}
            <Meta label="Location">{project.location}</Meta>
            {project.tools && <Meta label="Software / Tools">{project.tools.join(" · ")}</Meta>}
            <div className="sm:col-span-2">
              <Meta label="Associated organizations (experience gained through)">
                {project.experienceThrough.join(" · ")}
              </Meta>
            </div>
            <div className="sm:col-span-2">
              <Meta label="Team role">{project.teamRole}</Meta>
            </div>
          </dl>

          <div data-reveal className="lg:col-span-7">
            <h3 className="sr-only">Project description</h3>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-ink sm:text-xl">{project.description}</p>
            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              <BulletList title="Scope (prior engagement)" items={project.services} />
              <BulletList title="Deliverables" items={project.deliverables} />
            </div>
            <div className="mt-9 border-t border-line pt-6">
              <h4 className="text-[0.6875rem] font-bold tracking-[0.18em] text-teal-700 uppercase">Relevant services today</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {relevant.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={servicePath(service.slug)}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-900 transition-colors hover:border-energy-deep hover:text-energy-ink"
                    >
                      <span className="text-xs font-bold text-energy-deep">{service.id}</span>
                      {service.title}
                    </Link>
                  </li>
                ))}
                {sectors.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={industryPath(industry.slug)}
                      className="inline-flex items-center rounded-full bg-navy-900 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                    >
                      {industry.short}
                    </Link>
                  </li>
                ))}
              </ul>
              <ArrowLink href={`/contact?service=${primary?.slug ?? ""}`} className="mt-5">
                Discuss similar requirements
              </ArrowLink>
            </div>
          </div>
        </div>

        <div data-reveal className="mt-14">
          <h3 className="mb-5 text-[0.6875rem] font-bold tracking-[0.18em] text-teal-700 uppercase">
            Drawings &amp; models <span className="font-semibold text-slate normal-case tracking-normal">(placeholder illustrations)</span>
          </h3>
          <DiagramViewer diagrams={project.diagrams} projectName={project.name} />
        </div>
      </div>
    </section>
  );
}

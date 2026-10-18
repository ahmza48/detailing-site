import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectPath, type Project } from "@/lib/projects";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-semibold tracking-[0.08em] text-slate uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-bold text-energy-ink">{value}</dd>
    </div>
  );
}

/** Large featured project: rounded photograph, title and a metadata rule. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article data-reveal>
      <Link href={projectPath(project.id)} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-900 shadow-[0_10px_30px_rgb(0_36_56/0.18)]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <h3 className="display-md mt-7 max-w-md text-navy-900">
          {project.name}
          {project.subtitle && <span className="block text-base font-medium">{project.subtitle}</span>}
        </h3>
        <p className="mt-1 text-sm font-normal text-slate">{project.location}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-3">
          <Meta label="Sector" value={project.sector} />
          {project.environment && <Meta label="Environment" value={project.environment} />}
          <Meta label="Experience through" value={project.experienceThrough.slice(0, 2).join(", ")} />
        </dl>
        <span className="mt-6 inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-bold text-navy-900">
          <ArrowRight aria-hidden className="size-4 text-energy-deep transition-transform duration-300 group-hover:translate-x-1" />
          <span className="link-line">View project</span>
        </span>
      </Link>
    </article>
  );
}

/** Compact project teaser: rounded thumbnail above the title and scope. */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      href={projectPath(project.id)}
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
      className="group block"
    >
      <div className="lift relative aspect-[3/2] overflow-hidden rounded-lg bg-navy-900 shadow-[0_6px_18px_rgb(0_36_56/0.14)]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-4 text-[0.6875rem] font-semibold tracking-[0.08em] text-energy-ink uppercase">
        {project.sector}
        {project.environment && ` · ${project.environment}`}
      </p>
      <h3 className="mt-1.5 text-sm leading-5 font-bold text-navy-900 transition-colors group-hover:text-energy-ink">
        {project.name}
      </h3>
      <p className="mt-1.5 text-[0.8125rem] leading-5 font-normal text-slate">
        <span className="sr-only">Representative scope: </span>
        {project.services.slice(0, 3).join(", ")}
      </p>
    </Link>
  );
}

import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Disclaimer } from "@/components/Disclaimer";
import { ExperienceMetrics } from "@/components/ExperienceMetrics";
import { HashTarget } from "@/components/HashTarget";
import { Hero } from "@/components/Hero";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug } from "@/lib/services";
import { experienceDisclaimer, portfolioNote } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Project Experience",
  description:
    "Representative onshore and offshore energy projects from the professional experience of our senior team: oil & gas, refinery, NGL and gas developments across the Gulf and beyond.",
  path: "/project-experience",
  image: "/images/project-umm-lulu.jpg",
});

export default function ProjectExperiencePage() {
  return (
    <>
      <HashTarget />

      <Hero
        eyebrow="Project experience"
        title="Experience Built Across"
        accent="Demanding Energy Environments"
        intro="One representative project for each of our service lines, drawn from the prior professional experience of our senior team members."
        image="/images/project-umm-lulu.jpg"
        imageAlt="Offshore platform topsides at a fabrication yard"
        crumbs={[{ name: "Project Experience", path: "/project-experience" }]}
      />

      <section className="bg-navy-950 text-white">
        <div className="container-site border-t border-white/10 py-8 lg:py-12">
          <ExperienceMetrics />
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site grid gap-10 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div data-reveal className="lg:col-span-6">
            <h2 className="text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">About this experience</h2>
            <Disclaimer text={portfolioNote} className="mt-4" />
            <Disclaimer text={experienceDisclaimer} className="mt-4" />
            <p className="mt-4 max-w-4xl pl-7 text-xs leading-relaxed text-slate sm:text-[0.8125rem]">
              Photographs on this website are representative industry images, not photographs of the named projects.
              Drawing and model images are placeholder illustrations and do not reproduce project documentation.
            </p>
          </div>
          <nav aria-label="Projects on this page" data-reveal className="lg:col-span-6">
            <ol className="border-t border-line">
              {projects.map((project, index) => (
                <li key={project.id} className="border-b border-line">
                  <a
                    href={`#${project.id}`}
                    className="group grid min-h-14 grid-cols-[2rem_1fr] items-center gap-x-3 py-2.5 transition-colors hover:text-teal-700"
                  >
                    <span className="text-xs font-bold text-energy-ink tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-[0.9375rem] leading-snug font-extrabold text-navy-900 group-hover:text-teal-700">
                        {project.name}
                      </span>
                      <span className="block text-xs font-medium text-slate">{serviceBySlug(project.serviceSlug)?.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {projects.map((project, index) => (
        <ProjectCaseStudy key={project.id} project={project} index={index} />
      ))}

      <section className="border-t border-line bg-white">
        <div className="container-site py-10">
          <Disclaimer />
        </div>
      </section>

      <CTASection
        title="Have a comparable scope"
        accent="on your project?"
        copy="Tell us about the structures, deliverables and schedule involved, and we will outline how our team can support it."
      />
    </>
  );
}

import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ArrowLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Disclaimer } from "@/components/Disclaimer";
import { ExperienceMetrics } from "@/components/ExperienceMetrics";
import { HashTarget } from "@/components/HashTarget";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug } from "@/lib/services";
import { experienceDisclaimer, portfolioNote } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Structural Detailing Project Experience & Work Samples",
  description:
    "See accurately attributed prior professional experience in energy facilities and available structural drawing and modelling examples.",
  path: "/project-experience",
  image: "/images/project-umm-lulu.jpg",
});

export default function ProjectExperiencePage() {
  return (
    <>
      <HashTarget />

      <Hero
        eyebrow="Project experience"
        title="Relevant Professional Experience"
        accent="& Technical Work Samples"
        intro={`Representative projects from the prior professional experience of our senior team members, mapped to the services they relate to today. None of these are projects contracted to ${site.name}.`}
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
              Drawing excerpts are shown reduced and watermarked. Where a project is marked &ldquo;Similar work&rdquo;, the drawings come from other engagements of comparable scope.
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
                      <span className="block text-xs font-medium text-slate">{serviceBySlug(project.serviceSlugs[0])?.title}</span>
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

      <section id="work-samples" className="bg-navy-900 text-white">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading slab eyebrow="Technical work samples" title="Confidential Drawing Excerpts" onDark />
          </div>
          <div data-reveal className="space-y-4 text-base leading-7 text-white/85 lg:col-span-6">
            <p>
              The excerpts on this page and on each service page come from prior professional engagements of senior team
              members. They show the standard of our drawings and are not complete deliverables.
            </p>
            <p>
              These drawings are confidential, so they are reduced, watermarked and cannot be enlarged or downloaded here.
              Full views are for clients only.
            </p>
            <ArrowLink href="/contact" onDark>
              Ask about samples relevant to your scope
            </ArrowLink>
          </div>
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

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ArrowLink, ButtonLink } from "./ButtonLink";
import { ContactForm } from "./ContactForm";
import { FaqList } from "./FaqList";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { ProcessSteps } from "./ProcessSteps";
import { ProjectCard } from "./ProjectCard";
import { RelatedGuides } from "./RelatedGuides";
import { ScopeChecklist } from "./ScopeChecklist";
import { SectionHeading } from "./SectionHeading";
import { StandardsSummary } from "./StandardsSummary";
import { TimeZoneBlock } from "./TimeZoneBlock";
import { WhatsAppCta } from "./WhatsAppButton";
import { landingBySlug, landingPath, type LandingPage } from "@/lib/landing-pages";
import { projectById } from "@/lib/projects";
import { faqPageJsonLd, landingServiceJsonLd } from "@/lib/seo";
import { serviceBySlug, servicePath } from "@/lib/services";
import { offer } from "@/lib/site";

/**
 * Market and specialism landing page (fix prompt, phase 4): overview, scope and deliverables,
 * standards, time zones, process, team experience, FAQs, related links and an RFQ form with
 * the market prefilled.
 */
export function LandingPageLayout({ page }: { page: LandingPage }) {
  const projects = page.experience.projectIds.map(projectById).filter((p) => p !== undefined);
  const services = page.related.services.map(serviceBySlug).filter((s) => s !== undefined);
  const otherPages = page.related.pages.map(landingBySlug);

  return (
    <>
      <JsonLd data={landingServiceJsonLd(page)} />
      <JsonLd data={faqPageJsonLd(page.faqs)} />

      <Hero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        accent={page.hero.accent}
        intro={page.hero.intro}
        image={page.hero.image}
        imageAlt={page.hero.imageAlt}
        crumbs={[{ name: page.nav.label, path: landingPath(page.slug) }]}
      >
        <ButtonLink href="#rfq">Send Drawings for a {offer.quoteResponseShort} Quote</ButtonLink>
        <WhatsAppCta />
      </Hero>

      {/* Overview */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-7">
            <SectionHeading slab title={page.overview.heading} />
            <p className="mt-6 text-lg leading-8 font-semibold text-navy-900 sm:text-xl sm:leading-9">{page.overview.paragraphs[0]}</p>
            {page.overview.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
                {paragraph}
              </p>
            ))}
          </div>
          <aside data-reveal className="lg:col-span-5">
            <div className="rounded-xl bg-navy-900 p-7 text-mist shadow-[0_18px_40px_rgb(0_36_56/0.18)] sm:p-9 lg:sticky lg:top-28">
              <span aria-hidden className="slab mb-5 h-9 w-11" />
              <h2 className="text-lg font-extrabold text-white">At a Glance</h2>
              <ul className="mt-5">
                {page.glance.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-white/12 py-3 text-sm font-semibold">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-energy" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6" data-track-location="landing_glance">
                <ButtonLink href="/pilot" variant="light">
                  Pilot Terms
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Scope and deliverables */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading slab title="Scope & Deliverables" />
          <div data-reveal className="mt-10">
            <ScopeChecklist groups={page.scope} />
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-white">
        <div className="container-site section-y">
          <StandardsSummary refs={page.standards.refs} note={page.standards.note} title="Standards & Specifications" />
        </div>
      </section>

      <TimeZoneBlock focus={page.timezone} />

      {/* Process */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading centered title="How a Package Runs" intro="Inputs, model, checks, drawings and revisions, with information gaps raised before work proceeds." />
          <div className="mt-14">
            <ProcessSteps steps={page.process} />
          </div>
        </div>
      </section>

      {/* Team experience */}
      {projects.length > 0 && (
        <section className="bg-paper">
          <div className="container-site section-y">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading slab title="Senior Team Experience" intro={page.experience.intro} />
              <ArrowLink href="/project-experience">All project experience</ArrowLink>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            <p className="mt-8 text-xs leading-5 text-slate">Photographs are representative industry images.</p>
          </div>
        </section>
      )}

      {/* FAQs and related links */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Common Questions" />
            <div className="mt-8 space-y-8">
              <div data-reveal>
                <h3 className="text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">Related services</h3>
                <ul className="mt-3 border-t border-line">
                  {services.map((service) => (
                    <li key={service.slug} className="border-b border-line">
                      <Link href={servicePath(service.slug)} className="group flex items-start gap-2 py-3 text-[0.9375rem] font-semibold text-navy-900 hover:text-energy-ink">
                        <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep transition-transform group-hover:translate-x-0.5" />
                        {service.title}
                      </Link>
                    </li>
                  ))}
                  {otherPages.map((other) => (
                    <li key={other.slug} className="border-b border-line">
                      <Link href={landingPath(other.slug)} className="group flex items-start gap-2 py-3 text-[0.9375rem] font-semibold text-navy-900 hover:text-energy-ink">
                        <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep transition-transform group-hover:translate-x-0.5" />
                        {other.kind === "market" ? `Steel detailing for ${other.nav.label}` : other.nav.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <RelatedGuides slugs={page.related.guides} surface="paper" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqList faqs={page.faqs} surface="paper" openFirst={false} />
          </div>
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="scroll-mt-20 bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading slab title="Send Your Drawings" intro={`We reply ${offer.quoteResponse}. A scope summary is enough to start; ${offer.nda}.`} />
          </div>
          <div className="rounded-xl bg-white p-6 shadow-[0_4px_16px_rgb(0_36_56/0.06)] sm:p-8 lg:col-span-8">
            <ContactForm
              formLocation={page.slug}
              countryPage={page.form.countryPage}
              defaultCountry={page.form.defaultCountry}
              defaultService={page.form.defaultService}
            />
          </div>
        </div>
      </section>
    </>
  );
}

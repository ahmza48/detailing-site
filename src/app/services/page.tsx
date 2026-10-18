import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ServicePreview } from "@/components/ServicePreview";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Civil & Structural Design, Detailing and Modelling Services",
  description:
    "Seven structural service lines for energy projects: onshore and offshore detailing, brownfield modifications, steel detailing, RCC detailing, plant 3D modelling, drawings, MTO and QA/QC.",
  path: "/services",
  image: "/images/services-overview.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Services"
        title="From Greenfield Layouts"
        accent="To Brownfield Modification Packages"
        intro="Supporting EPC and fabrication teams with disciplined structural drawing and modelling capability across seven service lines."
        image="/images/services-overview.jpg"
        imageAlt="Multi-level steel process structure with large-bore piping"
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <ButtonLink href="/project-experience">View Project Experience</ButtonLink>
      </Hero>

      <section className="bg-white">
        <div className="container-site grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
          <p data-reveal className="text-xl leading-relaxed font-semibold text-navy-900 sm:text-2xl sm:leading-relaxed lg:col-span-8">
            Every service is built on the same foundation: senior professionals with more than three decades of
            hands-on experience producing structural deliverables for onshore and offshore energy facilities.
          </p>
          <nav aria-label="Service categories" data-reveal className="lg:col-span-4">
            <ol className="border-t border-line text-sm font-bold text-navy-900">
              {services.map((service, index) => (
                <li key={service.slug} className="border-b border-line">
                  <a href={`#${service.slug}`} className="flex min-h-11 items-center gap-4 py-2 transition-colors hover:text-teal-700">
                    <span className="text-xs text-energy-ink tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    {service.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {services.map((service, index) => (
        <ServicePreview key={service.slug} service={service} index={index} />
      ))}

      <CTASection />
    </>
  );
}

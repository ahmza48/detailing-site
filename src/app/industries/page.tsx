import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { IndustrySection } from "@/components/IndustrySection";
import { SectionHeading } from "@/components/SectionHeading";
import { applications } from "@/lib/applications";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "Industries & Project Environments",
  description:
    "Where our structural drafting, modelling and detailing services are applied: onshore oil & gas, gas processing and NGL, offshore energy, refining and petrochemicals, process plants, and power and industrial facilities.",
  path: "/industries",
  image: "/images/industry-oil-gas.jpg",
});

export default function IndustriesPage() {
  return (
    <>
      <Hero
        eyebrow="Industries"
        title="Energy & Industrial"
        accent="Project Applications"
        intro="Structural drafting, modelling, detailing and material documentation for onshore and offshore facilities, gas processing plants, refineries, petrochemical installations and other industrial structures."
        image="/images/industry-oil-gas.jpg"
        imageAlt="Large oil and gas processing complex with pipes, tanks and structures"
        crumbs={[{ name: "Industries", path: "/industries" }]}
      />

      <nav aria-label="Industries on this page" className="border-b border-line bg-white">
        <ul className="container-site flex gap-x-6 overflow-x-auto py-2 text-xs font-bold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <a href={`#${industry.slug}`} className="inline-flex min-h-11 items-center transition-colors hover:text-teal-700">
                {industry.short}
              </a>
            </li>
          ))}
          <li>
            <a href="#applications" className="inline-flex min-h-11 items-center text-energy-ink transition-colors hover:text-teal-700">
              Structures & Applications
            </a>
          </li>
        </ul>
      </nav>

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading slab title="One Discipline," accent="Across the Energy Value Chain" />
            <p data-reveal className="mt-6 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              Industrial and energy projects need structural documentation that stays consistent with approved
              engineering information, discipline interfaces and the project&rsquo;s fabrication and construction
              requirements. Our services apply across these facilities depending on the assigned scope and the technical
              resources available; the drawings, models and schedules are defined by the project&rsquo;s engineering
              standards, plant interfaces and submission requirements.
            </p>
            <p data-reveal className="mt-4 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              Industry pages describe facility constraints; the work itself is defined by the six services. Exposure to
              a refinery or offshore project does not imply process, marine or plant engineering capability: these
              pages concern civil and structural drafting, modelling, detailing and documentation.
            </p>
          </div>
          <ul className="grid gap-4 self-center sm:grid-cols-2 lg:col-span-6">
            {[
              [String(industries.length), "Project environments described"],
              ["Onshore + Offshore", "Facilities on land and at sea"],
              ["Greenfield + Brownfield", "New build and modification packages"],
              ["Steel + RCC", "Structural steel and reinforced concrete"],
            ].map(([value, label], i) => (
              <li
                key={label}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className={`rounded-xl p-6 ${i === 0 ? "bg-navy-900 text-mist" : "bg-paper"}`}
              >
                <p className={`text-2xl leading-8 font-extrabold ${i === 0 ? "text-energy" : "text-navy-900"}`}>{value}</p>
                <p className={`mt-2 text-sm leading-6 ${i === 0 ? "text-haze" : "text-ink"}`}>{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {industries.map((industry, index) => (
        <IndustrySection key={industry.slug} industry={industry} index={index} />
      ))}

      {/* Structures & applications teaser */}
      <section id="applications" className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading
            centered
            title="Structures & Applications"
            intro="Searching by structure type rather than sector? Each application shows which services produce its drawings, models and quantities."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((application, i) => (
              <li key={application.id} data-reveal style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as React.CSSProperties}>
                <Link
                  href={`/applications#${application.id}`}
                  className="lift group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-navy-900 p-5 text-mist shadow-[0_8px_24px_rgb(0_36_56/0.15)]"
                >
                  <Image
                    src={application.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                    className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-navy-900/95 via-navy-900/50 to-navy-900/10" />
                  <span className="flex w-full items-end justify-between gap-3 text-base leading-5 font-extrabold">
                    {tc(application.title)}
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-energy transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}

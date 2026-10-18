import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { IndustrySection } from "@/components/IndustrySection";
import { SectionHeading } from "@/components/SectionHeading";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Structural design, detailing and modelling support for oil & gas, refineries, gas processing and NGL, petrochemical, fertilizer and process plants, offshore facilities and industrial power infrastructure.",
  path: "/industries",
  image: "/images/industry-oil-gas.jpg",
});

export default function IndustriesPage() {
  return (
    <>
      <Hero
        eyebrow="Industries"
        title="Structural Support Across"
        accent="The Energy Value Chain"
        intro="We work where our senior team's experience lies: the onshore and offshore facilities that produce, process and refine energy, and the industrial infrastructure around them."
        image="/images/industry-oil-gas.jpg"
        imageAlt="Large oil and gas processing complex with pipes, tanks and structures"
        crumbs={[{ name: "Industries", path: "/industries" }]}
      />

      <nav aria-label="Industries on this page" className="border-b border-line bg-white">
        <ul className="container-site flex gap-x-6 overflow-x-auto py-2 text-xs font-bold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase">
          {industries.map((industry) => (
            <li key={industry.id}>
              <a href={`#${industry.id}`} className="inline-flex min-h-11 items-center transition-colors hover:text-teal-700">
                {industry.short}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading slab title="One Discipline," accent="Across the Energy Value Chain" />
            <p data-reveal className="mt-6 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              From wellhead gathering facilities and offshore platforms to refineries, NGL plants and the electrical
              infrastructure that serves them, the structural questions are consistent: pipe racks that carry the
              process, platforms that give access, foundations that carry equipment, and modifications that have to fit
              existing plant.
            </p>
            <p data-reveal className="mt-4 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              Our senior team&rsquo;s experience spans these facility types across the UAE, Saudi Arabia, Qatar,
              Pakistan and other international markets. Each sector below links to the services most often needed there.
            </p>
          </div>
          <ul className="grid gap-4 self-center sm:grid-cols-2 lg:col-span-6">
            {[
              ["8", "Energy and process sectors supported"],
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
        <IndustrySection key={industry.id} industry={industry} index={index} />
      ))}

      <CTASection />
    </>
  );
}

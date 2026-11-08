import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { TimeZoneBlock } from "@/components/TimeZoneBlock";
import { landingPath } from "@/lib/landing-pages";
import { marketRegions, marketsPath, regionPages } from "@/lib/markets";
import { pageMetadata } from "@/lib/seo";
import { offer } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Markets We Serve: Steel Detailing by Region",
  description:
    "Steel detailing and Tekla modelling for the USA, the GCC and Middle East, Europe, the UK and Australia, with local standards and working-hours overlap.",
  path: marketsPath,
  image: "/images/hero-offshore.jpg",
});

export default function MarketsPage() {
  return (
    <>
      <Hero
        eyebrow="Markets we serve"
        title="Steel Detailing for Projects"
        accent="in Five Regions"
        intro="Tekla models, fabrication drawings and rebar documentation for fabricators and EPC contractors in the Americas, the GCC and Middle East, Europe, the United Kingdom and Australia."
        image="/images/hero-offshore.jpg"
        imageAlt="Offshore jack-up rig beside a crane vessel at sunset"
        crumbs={[{ name: "Markets", path: marketsPath }]}
      >
        <ButtonLink href="/contact">Request a Quote</ButtonLink>
      </Hero>

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-7">
            <SectionHeading slab title="One Team, Local Standards" />
            <p className="mt-6 text-lg leading-8 font-semibold text-navy-900 sm:text-xl sm:leading-9">
              We work remotely from Lahore for fabricators and EPC contractors in five regions. The detailing is the same
              discipline everywhere; what changes is the governing standards, the execution or construction category, the
              drawing conventions and the hours you need us available.
            </p>
            <p className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              Our senior team&apos;s experience was built on energy projects in the Gulf and Central Asia, so GCC work is
              where we are most at home. For the Americas, Europe, the United Kingdom and Australia we apply that experience
              to your specifications: every package starts with a scope review of your standards, numbering and shop
              conventions, and a fixed-price pilot lets you check our drawings on your own project before committing more.
            </p>
            <p className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              Each market page below sets out the packages we typically detail there, the standards a project may specify,
              how our working day lines up with yours and the questions clients in that market ask first.
            </p>
          </div>
          <aside data-reveal className="lg:col-span-5">
            <div className="rounded-xl bg-navy-900 p-7 text-mist shadow-[0_18px_40px_rgb(0_36_56/0.18)] sm:p-9">
              <span aria-hidden className="slab mb-5 h-9 w-11" />
              <h2 className="text-lg font-extrabold text-white">Wherever the Project Is</h2>
              <ul className="mt-5 text-sm font-semibold">
                <li className="border-t border-white/12 py-3">Quote reply {offer.quoteResponse}</li>
                <li className="border-t border-white/12 py-3">Pilot: {offer.pilot.summary}</li>
                <li className="border-t border-white/12 py-3">{offer.nda}</li>
                <li className="border-t border-white/12 py-3">Formats: {offer.formats.join(", ")}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading slab title="Markets by Region" />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {marketRegions.map((region) => (
              <section
                key={region.id}
                id={region.id}
                aria-labelledby={`${region.id}-title`}
                data-reveal
                className="scroll-mt-28 rounded-xl bg-white p-7 shadow-[0_6px_20px_rgb(0_36_56/0.07)] sm:p-8"
              >
                <h3 id={`${region.id}-title`} className="flex items-center gap-3 text-xl font-extrabold text-navy-900">
                  <Globe aria-hidden className="size-5 text-energy-deep" />
                  {region.label}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink">{region.text}</p>
                <ul className="mt-5 border-t border-line">
                  {regionPages(region).map((page) => (
                    <li key={page.slug} className="border-b border-line">
                      <Link
                        href={landingPath(page.slug)}
                        className="group flex items-start gap-2 py-3 text-[0.9375rem] font-semibold text-navy-900 hover:text-energy-ink"
                      >
                        <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-energy-deep transition-transform group-hover:translate-x-0.5" />
                        <span>
                          {page.slug === region.hub ? `${region.label} overview` : `Steel detailing for ${page.nav.label}`}
                          <span className="block text-sm font-normal text-slate">{page.nav.text}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <TimeZoneBlock />

      <CTASection
        title="Tell us where the project is"
        accent="and what it needs"
        copy="Send the scope, drawings and standards that apply. We confirm the governing documents and reply with a defined proposal."
      />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries, industryPath, type Industry } from "@/lib/industries";
import { serviceBySlug, servicePath } from "@/lib/services";
import { ButtonLink } from "./ButtonLink";

/** Large image-led industry block on the Industries hub, leading to the industry page. */
export function IndustrySection({ industry, index }: { industry: Industry; index: number }) {
  const flip = index % 2 === 1;
  const related = industry.packages.map((p) => serviceBySlug(p.service)).filter((s) => s !== undefined);

  return (
    <section
      id={industry.slug}
      aria-labelledby={`${industry.slug}-title`}
      className={`${index % 2 === 0 ? "bg-white" : "bg-paper"}`}
    >
      {/* Anchors from the previous single-page layout, so older links still land here */}
      {industry.legacyAnchors.map((anchor) => (
        <span key={anchor} id={anchor} aria-hidden />
      ))}
      <div className="grid lg:grid-cols-2">
        <div data-reveal="image" className={`relative min-h-72 overflow-hidden bg-navy-950 lg:min-h-[34rem] ${flip ? "lg:order-2" : ""}`}>
          <Image
            src={industry.image}
            alt={industry.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute top-0 left-0 bg-navy-950/80 px-5 py-4 text-sm font-extrabold text-energy tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
          </span>
        </div>

        <div data-reveal className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
          <h2 id={`${industry.slug}-title`} className="display-md text-balance text-navy-900 uppercase">
            <Link href={industryPath(industry.slug)} className="hover:text-energy-ink">
              {industry.name}
            </Link>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">{industry.summary}</p>

          <h3 className="mt-9 text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">Typical structures</h3>
          <ul className="mt-3 flex max-w-xl flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink">
            {industry.structures.slice(0, 5).map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden className="size-1.5 bg-energy-deep" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-9 text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">Relevant services</h3>
          <ul className="mt-3 max-w-xl border-t border-line">
            {related.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={servicePath(service.slug)}
                  className="group flex min-h-12 items-center justify-between gap-4 py-2 text-[0.9375rem] font-bold text-navy-900 transition-colors hover:text-teal-700"
                >
                  {service.title}
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-energy-ink transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>

          <ButtonLink href={industryPath(industry.slug)} variant="light" className="mt-8 self-start">
            Explore {industry.short}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

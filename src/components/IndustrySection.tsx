import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { serviceBySlug, servicePath } from "@/lib/services";

/** Large image-led industry block that links back to the relevant services. */
export function IndustrySection({ industry, index }: { industry: Industry; index: number }) {
  const flip = index % 2 === 1;
  const related = industry.services.map(serviceBySlug).filter((s) => s !== undefined);

  return (
    <section
      id={industry.id}
      aria-labelledby={`${industry.id}-title`}
      className={`${index % 2 === 0 ? "bg-white" : "bg-paper"}`}
    >
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
            {String(index + 1).padStart(2, "0")} / 08
          </span>
        </div>

        <div data-reveal className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
          <h2 id={`${industry.id}-title`} className="display-md text-balance text-navy-900 uppercase">
            {industry.name}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">{industry.description}</p>

          <h3 className="mt-9 text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">Typical structures</h3>
          <ul className="mt-3 flex max-w-xl flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink">
            {industry.structures.map((item) => (
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
        </div>
      </div>
    </section>
  );
}

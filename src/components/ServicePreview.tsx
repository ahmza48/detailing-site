import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicePath, type Service } from "@/lib/services";
import { ButtonLink } from "./ButtonLink";
import { tc } from "@/lib/text";

/** Service card for the homepage grid: rounded photograph, title, summary. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <li data-reveal style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}>
      <Link href={servicePath(service.slug)} className="lift group flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-900 shadow-[0_8px_24px_rgb(0_36_56/0.15)]">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-900/55 to-transparent" />
        </div>
        <h3 className="mt-5 text-lg leading-6 font-extrabold text-navy-900 transition-colors group-hover:text-energy-ink">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-6 text-ink">{service.summary}</p>
        <span className="mt-4 inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-bold text-navy-900">
          <ArrowRight aria-hidden className="size-4 text-energy-deep transition-transform duration-300 group-hover:translate-x-1" />
          <span className="link-line">Learn more</span>
        </span>
      </Link>
    </li>
  );
}

/** Large editorial block used on /services. Alternates image side and surface. */
export function ServicePreview({ service, index }: { service: Service; index: number }) {
  const dark = index % 2 === 1;
  const flip = index % 2 === 1;

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={dark ? "bg-navy-800 text-mist" : index % 4 === 0 ? "bg-white" : "bg-paper"}
    >
      <div className="container-site section-y grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
          <Link
            href={servicePath(service.slug)}
            tabIndex={-1}
            aria-hidden
            className="group relative block aspect-[16/11] overflow-hidden rounded-xl bg-navy-900 shadow-[0_12px_34px_rgb(0_26_41/0.25)]"
          >
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </Link>
        </div>

        <div data-reveal className="lg:col-span-6">
          <span aria-hidden className="slab mb-6" />
          <h2
            id={`${service.slug}-title`}
            className={`display-lg text-balance ${dark ? "text-mist" : "text-navy-900"}`}
          >
            {service.title}
          </h2>
          <p className={`mt-4 max-w-xl text-base leading-7 ${dark ? "text-mist" : "text-ink"}`}>{service.summary}</p>
          <ul className={`mt-6 border-t ${dark ? "border-white/15" : "border-line"}`}>
            {service.highlights.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-3.5 border-b py-3 text-[0.9375rem] font-medium ${
                  dark ? "border-white/15 text-mist" : "border-line text-ink"
                }`}
              >
                <ArrowRight aria-hidden className={`size-4 shrink-0 ${dark ? "text-energy" : "text-energy-deep"}`} />
                {tc(item)}
              </li>
            ))}
          </ul>
          <ButtonLink href={servicePath(service.slug)} variant={dark ? "primary" : "light"} className="mt-8">
            Learn more<span className="sr-only"> about {service.title}</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

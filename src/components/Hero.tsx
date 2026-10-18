import Image from "next/image";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";

type Props = {
  eyebrow?: string;
  /** Heading lines; `accent` is rendered in green. */
  title: string;
  accent?: string;
  intro?: string;
  image: string;
  imageAlt: string;
  /** Omit on the homepage. */
  crumbs?: Crumb[];
  /** Taller banner for the homepage. */
  tall?: boolean;
  /** CSS object-position for the photograph. */
  focus?: string;
  children?: ReactNode;
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

/** Page banner: a full-width photograph relevant to the page, under a navy wash. */
export function Hero({ eyebrow, title, accent, intro, image, imageAlt, crumbs, tall = false, focus = "center", children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-mist">
      <Image
        src={image}
        alt={imageAlt}
        fill
        preload
        sizes="100vw"
        className="hero-settle -z-20 object-cover"
        style={{ objectPosition: focus }}
      />
      {/* Navy fades in from the top (behind the header) and from the left (behind the copy) */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-64 bg-linear-to-b from-navy-900/90 to-transparent" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy-900/85 via-navy-900/45 to-navy-900/5" />
      {/* Narrow screens put the copy over the whole photograph, so the wash is heavier there */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-900/55 md:bg-navy-900/15" />

      <div
        className={`container-site flex flex-col justify-end pt-[calc(var(--header-h)+3rem)] ${
          tall ? "min-h-[min(100svh,48rem)] pb-20 lg:pb-28" : "min-h-[26rem] pb-12 lg:min-h-[32rem] lg:pb-16"
        }`}
      >
        {crumbs && (
          <div className="hero-rise mb-6">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        )}
        {eyebrow && (
          <p className="eyebrow hero-rise mb-3 text-energy" style={delay(60)}>
            {eyebrow}
          </p>
        )}
        <h1 className={`${tall ? "display-xl" : "display-lg"} max-w-3xl text-balance text-mist`}>
          <span className="line-mask">
            <span style={delay(120)}>{title}</span>
          </span>
          {accent && (
            <span className="line-mask">
              <span className="text-energy" style={delay(260)}>
                {accent}
              </span>
            </span>
          )}
        </h1>
        {intro && (
          <p className="hero-rise mt-6 max-w-xl text-base leading-7 font-normal text-mist sm:text-[1.0625rem]" style={delay(420)}>
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-rise mt-8 flex flex-wrap items-center gap-x-4 gap-y-3" style={delay(520)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grid-motif bg-navy-950 text-white">
      <div className="container-site flex min-h-[38rem] flex-col justify-center pt-[calc(var(--header-h)+3rem)] pb-20">
        <p className="eyebrow text-energy">Error 404</p>
        <h1 className="display-lg mt-5 max-w-3xl">
          This page <span className="text-energy">could not be found</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-haze sm:text-lg">
          The address may have changed or the page may no longer exist.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/services" variant="outlineLight">
            Explore Our Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

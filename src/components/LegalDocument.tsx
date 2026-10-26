import type { ReactNode } from "react";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Plain, readable layout for website notices (Terms of Use, Privacy Policy). */
export function LegalDocument({ updated, notice, sections }: { updated: string; notice?: ReactNode; sections: LegalSection[] }) {
  return (
    <section className="bg-white">
      <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-navy-900">Last updated: {updated}</p>
            {notice && <div className="mt-4 rounded-r-xl border-l-4 border-energy-deep bg-paper p-5 text-sm leading-6 text-ink">{notice}</div>}
            <nav aria-label="On this page" className="mt-8 hidden lg:block">
              <p className="text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">On this page</p>
              <ol className="mt-3 border-t border-line">
                {sections.map((section, i) => (
                  <li key={section.id} className="border-b border-line">
                    <a href={`#${section.id}`} className="flex min-h-10 items-center gap-3 py-1.5 text-sm font-semibold text-navy-900 hover:text-energy-ink">
                      <span className="text-xs text-energy-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>
        <article className="max-w-3xl lg:col-span-8">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-line py-8 first:border-t-0 first:pt-0">
              <h2 className="text-xl font-extrabold text-navy-900">
                <span className="mr-3 text-sm text-energy-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-[0.9375rem] leading-7 text-ink [&_a]:font-semibold [&_a]:text-energy-ink [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}

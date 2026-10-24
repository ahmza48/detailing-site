import { ArrowLink } from "./ButtonLink";
import { SectionHeading } from "./SectionHeading";
import { standardById } from "@/lib/standards";
import { tc } from "@/lib/text";

/**
 * Page-level summary of the standards families relevant to a service or
 * industry, always qualified and linked to the central Codes & Standards page.
 */
export function StandardsSummary({ refs, note, title = "Codes & Standards" }: { refs: string[]; note: string; title?: string }) {
  const items = refs.map(standardById).filter((s) => s !== undefined);
  if (items.length === 0) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <SectionHeading slab title={title} />
        <p data-reveal className="mt-5 text-base leading-7 text-ink">
          {note}
        </p>
        <p data-reveal className="mt-4 text-sm leading-6 text-slate">
          The scope of work records the applicable standards and editions for each package. A reference to a standard
          does not imply design verification or certification.
        </p>
        <ArrowLink href="/capabilities/codes-standards" className="mt-6">
          How standards are applied
        </ArrowLink>
      </div>
      <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
        {items.map((standard, i) => (
          <li
            key={standard.id}
            data-reveal
            style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties}
            className="rounded-xl border border-line p-5"
          >
            <p className="text-xs font-bold tracking-[0.08em] text-teal-700 uppercase">{standard.publisher}</p>
            <h3 className="mt-1 text-base font-extrabold text-navy-900">{standard.identifier}</h3>
            <p className="mt-1 text-sm leading-6 text-ink">{tc(standard.title)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

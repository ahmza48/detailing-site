import { ArrowLink } from "./ButtonLink";
import { SectionHeading } from "./SectionHeading";
import { standardById } from "@/lib/standards";
import { tc } from "@/lib/text";

type Requirement = { title: string; text: string };

/**
 * Page-level summary of the standards families relevant to a service or
 * industry, always qualified and linked to the central Codes & Standards page.
 *
 * With `requirements`, the cards show the project requirement families that
 * govern the package, and standards appear only as illustrative examples
 * (spec v2 §9: never a fixed or exhaustive code list).
 */
export function StandardsSummary({
  refs,
  note,
  title = "Codes & Standards",
  requirements,
}: {
  refs: string[];
  note: string;
  title?: string;
  requirements?: Requirement[];
}) {
  const items = refs.map(standardById).filter((s) => s !== undefined);
  if (items.length === 0 && !requirements?.length) return null;
  const card = "rounded-xl border border-line p-5";
  const delay = (i: number) => ({ "--reveal-delay": `${(i % 2) * 70}ms` }) as React.CSSProperties;

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

      {requirements?.length ? (
        <div className="lg:col-span-7">
          <ul className="grid content-start gap-4 sm:grid-cols-2">
            {requirements.map((requirement, i) => (
              <li key={requirement.title} data-reveal style={delay(i)} className={card}>
                <h3 className="text-base font-extrabold text-navy-900">{tc(requirement.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-ink">{requirement.text}</p>
              </li>
            ))}
          </ul>
          {items.length > 0 && (
            <div data-reveal className="mt-6 rounded-xl bg-white p-5 shadow-[0_4px_16px_rgb(0_36_56/0.06)]">
              <p className="text-xs font-bold tracking-[0.08em] text-teal-700 uppercase">Examples a project may specify</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((standard) => (
                  <li
                    key={standard.id}
                    title={standard.title}
                    className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-navy-900"
                  >
                    {standard.identifier}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-5 text-slate">
                Illustrative only, not a fixed or exhaustive list. The governing documents and editions are those named in
                your contract and project specification.
              </p>
            </div>
          )}
        </div>
      ) : (
        <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          {items.map((standard, i) => (
            <li key={standard.id} data-reveal style={delay(i)} className={card}>
              <p className="text-xs font-bold tracking-[0.08em] text-teal-700 uppercase">{standard.publisher}</p>
              <h3 className="mt-1 text-base font-extrabold text-navy-900">{standard.identifier}</h3>
              <p className="mt-1 text-sm leading-6 text-ink">{tc(standard.title)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

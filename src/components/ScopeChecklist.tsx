import { Check } from "lucide-react";
import { tc } from "@/lib/text";

export type ScopeGroup = { heading?: string; items: string[] };

/**
 * Core-services checklist: green ticks in the site's brand green, optionally grouped.
 * Used on service, industry and outsourcing pages so buyers see the full scope at a glance.
 */
export function ScopeChecklist({
  groups,
  columns = 2,
  note,
}: {
  groups: ScopeGroup[];
  /** Columns at large widths (always one column on phones, two from small tablets). */
  columns?: 2 | 3;
  note?: string;
}) {
  return (
    <div className="space-y-8">
      {groups.map((group, g) => (
        <div key={group.heading ?? g}>
          {group.heading && (
            <h4 className="mb-3 text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">{group.heading}</h4>
          )}
          <ul className={`grid gap-x-8 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
            {group.items.map((item) => (
              <li key={item} className="flex gap-3 border-b border-line py-2.5 text-[0.9375rem] leading-6 font-medium text-navy-900">
                <Check aria-hidden strokeWidth={3} className="mt-1 size-4 shrink-0 text-energy-deep" />
                {tc(item)}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {note && <p className="text-sm leading-6 text-slate">{note}</p>}
    </div>
  );
}

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { resourceBySlug, resourcePath, type Resource } from "@/lib/resources";

/** Compact "Related guides" links from existing pages to /resources articles (SEO spec section 18). */
export function RelatedGuides({
  slugs,
  guides,
  title = "Related Guides",
  surface = "white",
}: {
  slugs?: string[];
  guides?: Resource[];
  title?: string;
  surface?: "white" | "paper";
}) {
  const list = guides ?? (slugs ?? []).map(resourceBySlug).filter((r): r is Resource => r !== undefined);
  if (list.length === 0) return null;
  return (
    <div data-reveal className={`rounded-xl p-6 sm:p-7 ${surface === "white" ? "bg-white shadow-[0_4px_16px_rgb(0_36_56/0.06)]" : "bg-paper"}`}>
      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">
        <BookOpen aria-hidden className="size-4" />
        {title}
      </p>
      <ul className="mt-4 divide-y divide-line">
        {list.map((guide) => (
          <li key={guide.slug}>
            <Link href={resourcePath(guide.slug)} className="group flex items-baseline justify-between gap-4 py-3">
              <span className="text-[0.9375rem] leading-6 font-bold text-navy-900 group-hover:text-energy-ink">{guide.h1}</span>
              <span className="shrink-0 text-xs font-semibold text-slate">{guide.readingMinutes} min</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

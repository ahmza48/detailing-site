import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/** Visual breadcrumb trail for dark hero surfaces, plus matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.08em] text-haze uppercase">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <ChevronRight aria-hidden className="size-3.5 text-energy" />}
              {last ? (
                <span aria-current="page" className="text-white">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="inline-flex min-h-8 items-center transition-colors hover:text-energy">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </nav>
  );
}

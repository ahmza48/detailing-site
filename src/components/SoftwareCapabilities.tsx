import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { software, type SoftwareTool } from "@/lib/software";
import { tc } from "@/lib/text";

/** Closing note cell fills the remainder of the last four-column row. */
const fillSpan: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

/** Logo-free, typographic software panel. Pass `names` to show a subset. */
export function SoftwareCapabilities({
  names,
  onDark = true,
  detailed = true,
}: {
  names?: string[];
  onDark?: boolean;
  detailed?: boolean;
}) {
  const tools: SoftwareTool[] = names ? software.filter((tool) => names.includes(tool.name)) : software;

  return (
    <ul className={"grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
      {tools.map((tool, index) => (
        <li
          key={tool.name}
          data-reveal
          style={{ "--reveal-delay": `${(index % 4) * 60}ms` } as React.CSSProperties}
          className={`flex flex-col rounded-xl p-6 lg:p-7 ${onDark ? "bg-white/8" : "bg-white shadow-[0_4px_16px_rgb(0_36_56/0.08)]"}`}
        >
          <span className={`text-xs font-bold tabular-nums ${onDark ? "text-energy" : "text-energy-ink"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-5 text-lg font-extrabold ${onDark ? "text-white" : "text-navy-900"}`}>
            {tool.name}
          </h3>
          <p className={`mt-1 text-xs font-medium ${onDark ? "text-haze" : "text-slate"}`}>
            {tc(tool.discipline)}
          </p>
          {detailed && (
            <p className={`mt-4 text-sm leading-relaxed ${onDark ? "text-haze" : "text-slate"}`}>{tool.use}</p>
          )}
        </li>
      ))}
      {tools.length % 4 !== 0 && (
        <li
          className={`flex flex-col justify-between rounded-xl p-6 lg:p-7 ${tools.length % 2 === 0 ? "sm:col-span-2" : ""} ${
            fillSpan[4 - (tools.length % 4)]
          } ${onDark ? "bg-energy-deep text-white" : "bg-navy-900 text-mist"}`}
        >
          <div>
            <h3 className="text-lg font-extrabold">Working in your environment</h3>
            <p className="mt-2 text-sm leading-6">
              Supported platforms, versions and file formats are confirmed for each package during scope review.
            </p>
          </div>
          <Link href="/contact" className="group mt-5 inline-flex items-center gap-2 text-sm font-bold">
            Confirm your setup
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </li>
      )}
    </ul>
  );
}

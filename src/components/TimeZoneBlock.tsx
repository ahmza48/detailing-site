import { Clock } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { timeZoneStory, type TimeZoneFocus } from "@/lib/site";

/**
 * The time-zone story. `focus` shows a market page's own message and clocks; "both" (the homepage)
 * shows the GCC business-day overlap and US overnight working.
 */
export function TimeZoneBlock({ focus = "both", id }: { focus?: TimeZoneFocus | "both"; id?: string }) {
  const story = timeZoneStory.lines;
  const lines = focus === "both" ? [story.gcc, story.us] : focus === "us" ? [story.us, story.gcc] : [story[focus]];
  const zones = timeZoneStory.zones[focus];

  return (
    <section id={id} aria-labelledby="time-zones" className="bg-navy-900 text-white">
      <div className="container-site section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="From Lahore, on your schedule" title={<span id="time-zones">{timeZoneStory.heading}</span>} onDark />
          <div data-reveal className="mt-6 space-y-4 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6 lg:pt-2">
          {zones.map((zone, i) => (
            <li
              key={zone.place}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className={`rounded-xl p-5 ${i === 0 ? "bg-energy-deep text-white" : "bg-white/8"}`}
            >
              <span className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
                <Clock aria-hidden className={`size-4 ${i === 0 ? "text-white" : "text-energy"}`} />
                {zone.offset}
              </span>
              <span className="mt-2 block text-lg font-extrabold">{zone.place}</span>
              <span className={`mt-0.5 block text-sm ${i === 0 ? "text-white/90" : "text-haze"}`}>{zone.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

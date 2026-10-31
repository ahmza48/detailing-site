import Image from "next/image";
import { Lock } from "lucide-react";
import type { DrawingSample } from "@/lib/proof-of-work";

const columns: Record<number, string> = {
  1: "sm:grid-cols-2 lg:grid-cols-3",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

/**
 * Confidential drawing excerpts, display only. The image takes no pointer
 * events: right-click, long-press and tap all land on the transparent button
 * above it, which DrawingProtection answers with the clients-only notice.
 * Images are already compressed, so they skip the optimizer and load lazily.
 */
export function DrawingGallery({ samples, showProject = true }: { samples: DrawingSample[]; showProject?: boolean }) {
  return (
    <ul className={`grid gap-5 ${columns[samples.length] ?? columns[3]}`}>
      {samples.map((sample) => (
        <li key={sample.id}>
          <figure>
            <div data-drawing-frame className="relative aspect-[8/5] overflow-hidden rounded-xl border border-line bg-white">
              <Image
                src={sample.src}
                alt={`Watermarked excerpt of a ${sample.discipline.toLowerCase()} drawing: ${sample.title.toLowerCase()}`}
                fill
                unoptimized
                draggable={false}
                className="pointer-events-none object-contain"
              />
              <button
                type="button"
                data-protected-drawing
                aria-label={`${sample.title}: confidential, for clients only`}
                className="absolute inset-0 cursor-not-allowed rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-energy-deep"
              />
              <span className="pointer-events-none absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-full bg-navy-900/85 text-white">
                <Lock aria-hidden className="size-3.5" />
              </span>
            </div>
            <figcaption className="mt-3 text-sm">
              <span className="font-bold text-navy-900">{sample.title}</span>
              <span className="text-slate"> · {sample.discipline}</span>
              {showProject && (
                <span className="mt-1 block text-xs font-semibold text-teal-700">{sample.projectName ?? "Other project experience"}</span>
              )}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

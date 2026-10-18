"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ProjectDiagram } from "@/lib/projects";

const columns: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Drawing / model grid with an enlarged view in a native modal dialog. */
export function DiagramViewer({ diagrams, projectName }: { diagrams: ProjectDiagram[]; projectName: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const current = diagrams[active];

  const open = (index: number) => {
    setActive(index);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setActive((index) => (index + delta + diagrams.length) % diagrams.length);

  return (
    <>
      <ul className={`grid gap-4 ${columns[diagrams.length] ?? columns[3]}`}>
        {diagrams.map((diagram, index) => (
          <li key={diagram.src}>
            <figure>
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`Enlarge ${diagram.type} placeholder for ${projectName}`}
                className="group relative block aspect-[8/5] w-full overflow-hidden border border-line bg-paper"
              >
                <Image
                  src={diagram.src}
                  alt={diagram.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute right-0 bottom-0 grid size-10 place-items-center bg-navy-900 text-white transition-colors group-hover:bg-energy group-hover:text-navy-950">
                  <Expand aria-hidden className="size-4" />
                </span>
              </button>
              <figcaption className="mt-2.5 flex items-baseline justify-between gap-3 text-xs">
                <span className="font-bold tracking-[0.12em] text-navy-900 uppercase">{diagram.type}</span>
                <span className="text-slate">Placeholder</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${projectName} drawings and models`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[min(72rem,calc(100vw-1.5rem))] max-w-none bg-white p-0 text-ink"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line py-2 pr-2 pl-5">
          <p className="min-w-0 truncate text-xs font-bold tracking-[0.12em] text-navy-900 uppercase">
            {current.type}
            <span className="ml-3 font-semibold text-slate tabular-nums">
              {active + 1} / {diagrams.length}
            </span>
          </p>
          <div className="flex">
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="grid size-11 place-items-center hover:bg-paper">
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className="grid size-11 place-items-center hover:bg-paper">
              <ChevronRight aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Close viewer"
              className="grid size-11 place-items-center bg-navy-900 text-white hover:bg-teal-700"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
        </div>
        <div className="relative aspect-[8/5] max-h-[78dvh] w-full bg-paper">
          <Image src={current.src} alt={current.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-contain" />
        </div>
        <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-slate">
          Placeholder illustration. To be replaced with an approved drawing or model view; it does not reproduce actual
          project documentation.
        </p>
      </dialog>
    </>
  );
}

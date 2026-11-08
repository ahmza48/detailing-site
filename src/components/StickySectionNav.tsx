"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

/** Height of the scrolled header (h-[4.5rem]); the bar sticks directly beneath it. */
const HEADER_PX = 72;

/**
 * In-page jump bar: sticks under the header while scrolling, highlights the section in view
 * and keeps the active chip visible when the list scrolls sideways on small screens.
 */
export function StickySectionNav({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  // Whether more chips are hidden off either edge of the list (drives the edge fades).
  const [overflow, setOverflow] = useState({ left: false, right: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const check = () =>
      setOverflow({ left: list.scrollLeft > 2, right: list.scrollLeft + list.clientWidth < list.scrollWidth - 2 });
    check();
    list.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      list.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;
      const barBottom = HEADER_PX + nav.offsetHeight;
      setStuck(nav.getBoundingClientRect().top <= HEADER_PX + 0.5);
      // The active section is the last one whose top has passed under the bar.
      let current: string | null = null;
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= barBottom + 24) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  // Keep the active chip in view inside the horizontally scrolling list.
  useEffect(() => {
    const list = listRef.current;
    const chip = active ? list?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (!list || !chip) return;
    const target = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className={`sticky top-[4.5rem] z-40 bg-energy-ink text-white transition-shadow duration-300 ${
        stuck ? "shadow-[0_10px_24px_rgb(0_26_41/0.22)]" : ""
      }`}
    >
      <div className="container-site flex items-center gap-4">
        <span className="hidden shrink-0 items-center gap-2 border-r border-white/25 py-1 pr-4 text-[0.6875rem] font-bold tracking-[0.14em] text-white/95 uppercase lg:inline-flex">
          <SlidersHorizontal aria-hidden className="size-3.5" strokeWidth={2.25} />
          {label}
        </span>
        <ul
          ref={listRef}
          style={{
            maskImage: `linear-gradient(to right, ${overflow.left ? "transparent" : "#000"}, #000 2.5rem, #000 calc(100% - 2.5rem), ${
              overflow.right ? "transparent" : "#000"
            })`,
          }}
          className="-mx-2 flex min-w-0 flex-1 gap-1 overflow-x-auto px-2 py-2 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const current = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  aria-current={current ? "location" : undefined}
                  // Same language as the header's active link: a short rule that slides in under the label.
                  className={`relative inline-flex min-h-10 items-center rounded px-4 text-xs font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-white after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-300 ${
                    current
                      ? "text-white after:scale-x-100 after:bg-white"
                      : "text-white/95 after:scale-x-0 after:bg-white/50 hover:text-white hover:after:scale-x-100"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

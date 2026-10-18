"use client";

import { useEffect } from "react";

const HIGHLIGHT_MS = 2600;

/**
 * Handles arrival at /project-experience#<project-id> from a service page:
 * scrolls the case study into view below the sticky header (offset comes from
 * the section's CSS scroll-margin) and flags it briefly with a green indicator.
 * Scrolling is instant when the visitor prefers reduced motion.
 */
export function HashTarget() {
  useEffect(() => {
    let timer: number | undefined;
    let frame: number | undefined;

    const focusTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target?.hasAttribute("data-project")) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Wait a frame so layout (images, fonts) has settled after navigation.
      frame = window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        document.querySelectorAll("[data-project][data-highlight]").forEach((el) => el.removeAttribute("data-highlight"));
        target.setAttribute("data-highlight", "");
        window.clearTimeout(timer);
        timer = window.setTimeout(() => target.removeAttribute("data-highlight"), HIGHLIGHT_MS);
      });
    };

    focusTarget();
    window.addEventListener("hashchange", focusTarget);
    return () => {
      window.removeEventListener("hashchange", focusTarget);
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Which kind of contact link was clicked, if any. */
function eventFor(link: HTMLAnchorElement): AnalyticsEvent | undefined {
  const href = link.getAttribute("href") ?? "";
  if (link.dataset.track === "pilot_cta" || /^\/pilot(?:[/?#]|$)/.test(href)) return "pilot_cta_click";
  if (/^https:\/\/(?:wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith("tel:")) return "phone_click";
  return undefined;
}

/**
 * Where on the page the link sits: an explicit data-track-location on the link or an ancestor,
 * else the header, footer, floating WhatsApp button or the labelled section around it.
 */
function locationOf(link: HTMLAnchorElement) {
  const tagged = link.closest<HTMLElement>("[data-track-location]");
  if (tagged) return tagged.dataset.trackLocation!;
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  if (link.classList.contains("wa-float")) return "floating_button";
  const section = link.closest("section");
  const label = section?.getAttribute("aria-label") || section?.id || section?.querySelector("h1, h2")?.textContent;
  return label ? label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 60) : "content";
}

/** One delegated listener for the whole site; mounted once in the root layout. */
export function ClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const name = eventFor(link);
      if (name) trackEvent(name, { link_location: locationOf(link), page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

import Image from "next/image";
import { site } from "@/lib/site";

/**
 * PetroHill Energy logo (owner's artwork, Nov 2026): the P+H mark, the PetroHill wordmark and the
 * "Energy & Industrial Support" tagline, with the tagline lightened for the navy header and footer
 * (built by scripts/build-logos.py from public/logo/PetroHill Energy Logo Update.png).
 * The tagline is about a ninth of the logo's height, so the logo is never shown under ~48px tall.
 * TODO: replace with vector (SVG) artwork when available.
 */
const logo = { src: "/logo/petrohill-energy-logo-on-dark.png", width: 1485, height: 300 } as const;

/** `eager` for the header copy only; the footer copy loads lazily. Not preloaded: it is never the LCP element. */
export function Logo({ className = "h-12 w-auto", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <Image
      src={logo.src}
      alt={`${site.name}: Energy & Industrial Support`}
      width={logo.width}
      height={logo.height}
      loading={eager ? "eager" : "lazy"}
      sizes="300px"
      className={className}
    />
  );
}

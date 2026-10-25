import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Hormuz-Energy logo (owner-supplied artwork in /public/logo).
 * "light" is the recoloured version for the dark navbar and footer; "color" is the original
 * artwork for light backgrounds. Source: public/logo/Emerald HORMUZ ENERGY Logo.png.
 */
const sources = {
  light: "/logo/hormuz-energy-logo-light.png",
  color: "/logo/hormuz-energy-logo.png",
} as const;

export function Logo({ variant = "light", className = "" }: { variant?: keyof typeof sources; className?: string }) {
  return (
    <Image
      src={sources[variant]}
      alt={site.name}
      width={640}
      height={169}
      priority
      className={`h-9 w-auto sm:h-10 ${className}`}
    />
  );
}

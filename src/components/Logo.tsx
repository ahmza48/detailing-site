import Image from "next/image";
import { site } from "@/lib/site";

/**
 * PetroHill logo: concept 1 from public/logo/PetroHill Structural Logo Concepts.png,
 * recomposed horizontally (P mark + wordmark) so the wordmark stays legible at header height.
 * "light" turns the navy parts white for the navy header and footer; "color" is for light backgrounds.
 * TODO_VERIFY: replace with vector (SVG) artwork from the designer when available.
 */
const sources = {
  light: "/logo/petrohill-logo-light.png",
  color: "/logo/petrohill-logo.png",
} as const;

export function Logo({ variant = "light", className = "" }: { variant?: keyof typeof sources; className?: string }) {
  return (
    <Image
      src={sources[variant]}
      alt={site.name}
      width={781}
      height={136}
      priority
      sizes="240px"
      className={`h-8 w-auto sm:h-9 ${className}`}
    />
  );
}

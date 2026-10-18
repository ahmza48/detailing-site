import { Info } from "lucide-react";
import { experienceDisclaimer } from "@/lib/site";

/** Discreet professional-experience note shown near any project or organization references. */
export function Disclaimer({
  text = experienceDisclaimer,
  onDark = false,
  className = "",
}: {
  text?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      role="note"
      className={`flex max-w-4xl gap-3 text-xs leading-relaxed sm:text-[0.8125rem] ${
        onDark ? "text-haze" : "text-slate"
      } ${className}`}
    >
      <Info aria-hidden className={`mt-0.5 size-4 shrink-0 ${onDark ? "text-energy" : "text-teal-700"}`} />
      <span>{text}</span>
    </p>
  );
}

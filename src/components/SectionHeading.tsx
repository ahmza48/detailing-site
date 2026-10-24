import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  /** Optional second line rendered in the accent colour. */
  accent?: string;
  intro?: ReactNode;
  onDark?: boolean;
  as?: "h2" | "h3";
  /** Centred layout with the green slab mark behind the heading. */
  centered?: boolean;
  /** Show the green slab mark above a left-aligned heading. */
  slab?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  onDark = false,
  as: Tag = "h2",
  centered = false,
  slab = false,
  className = "",
}: Props) {
  const heading = (
    <Tag className={`display-lg relative text-balance ${onDark ? "text-white" : "text-navy-900"}`}>
      {title}
      {accent && <span className={`block ${onDark ? "text-energy" : "text-energy-deep"}`}>{accent}</span>}
    </Tag>
  );

  return (
    <div data-reveal className={`${centered ? "mx-auto max-w-3xl text-center" : ""} ${className}`}>
      {slab && !centered && <span aria-hidden className="slab mb-6" />}
      {eyebrow && <p className={`eyebrow mb-3 ${onDark ? "text-energy" : "text-teal-700"}`}>{eyebrow}</p>}
      {centered ? (
        <div className="relative pt-9">
          <span aria-hidden className="slab absolute top-0 left-1/2 -translate-x-1/2" />
          {heading}
        </div>
      ) : (
        heading
      )}
      {intro && (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${centered ? "mx-auto" : ""} ${
            onDark ? "text-haze" : "text-ink"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  /** Brand green: the primary action in a view. */
  primary: "bg-energy-deep text-white hover:bg-energy-ink [&_svg]:text-white",
  /** Light pill for dark, photographic and light surfaces alike. */
  light: "bg-paper text-navy-900 shadow-[0_2px_10px_rgb(0_36_56/0.12)] hover:bg-white [&_svg]:text-energy-deep",
  /** Solid navy for light surfaces. */
  dark: "bg-navy-900 text-white hover:bg-navy-800 [&_svg]:text-energy",
} as const;

// Earlier names kept so call sites read by intent.
const aliases = { outlineLight: "light", outlineDark: "light" } as const;

export const buttonBase =
  "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg py-3 pr-[1.125rem] pl-3.5 text-[0.9375rem] leading-5 font-medium transition-colors duration-300";

type Variant = keyof typeof variants | keyof typeof aliases;

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: Props) {
  const key = variant in aliases ? aliases[variant as keyof typeof aliases] : (variant as keyof typeof variants);
  return (
    <Link href={href} className={`${buttonBase} ${variants[key]} ${className}`}>
      <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
      {children}
    </Link>
  );
}

/** Inline text link led by a green arrow. */
export function ArrowLink({
  href,
  children,
  onDark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-bold ${
        onDark ? "text-white" : "text-navy-900"
      } ${className}`}
    >
      <ArrowRight
        aria-hidden
        className={`size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${
          onDark ? "text-energy" : "text-energy-deep"
        }`}
      />
      <span className="link-line">{children}</span>
    </Link>
  );
}

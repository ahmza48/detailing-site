import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { Faq } from "@/lib/faqs";

/**
 * FAQ accordion built on native <details>/<summary>: keyboard operable, announces its
 * expanded state, and keeps every answer in the server-rendered HTML.
 */
export function FaqList({ faqs, surface = "white", openFirst = true }: { faqs: Faq[]; surface?: "white" | "paper"; openFirst?: boolean }) {
  const card = surface === "white" ? "bg-white shadow-[0_4px_16px_rgb(0_36_56/0.06)]" : "bg-paper";
  const chip = surface === "white" ? "bg-paper" : "bg-white";
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details
          key={faq.id}
          id={faq.id}
          data-reveal
          style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
          open={openFirst && i === 0}
          className={`group/faq scroll-mt-28 rounded-xl ${card}`}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl px-6 py-5 text-base font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
            {faq.q}
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full ${chip} text-energy-deep transition-transform duration-300 group-open/faq:rotate-45`}
            >
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <div className="px-6 pb-6">
            <p className="text-[0.9375rem] leading-7 text-ink">{faq.a}</p>
            {faq.links && (
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {faq.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group/link inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-energy-ink">
                      <ArrowRight aria-hidden className="size-3.5 text-energy-deep transition-transform group-hover/link:translate-x-0.5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

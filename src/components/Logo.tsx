/**
 * Hormuz-Energy wordmark. The mark is a braced portal frame forming an "H":
 * two columns, a beam and a green diagonal brace. Replace with the final
 * brand asset when one is produced.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" aria-hidden className="size-9 shrink-0 sm:size-10" fill="none">
        <path d="M7 5v30M33 5v30M7 20h26" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" />
        <path d="M7 35 33 20" stroke="var(--color-energy-deep)" strokeWidth="4.5" strokeLinecap="square" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[1.375rem] font-extrabold tracking-[0.04em] uppercase sm:text-2xl">Hormuz</span>
        <span className="mt-1 self-end text-[0.625rem] font-bold tracking-[0.42em] text-energy uppercase">Energy</span>
      </span>
      <span className="sr-only">Hormuz-Energy</span>
    </span>
  );
}

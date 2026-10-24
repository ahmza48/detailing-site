/** Numbered, connected step strip (the existing "How We Deliver" pattern), reused across pages. */
const columns: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
};

export function ProcessSteps({
  steps,
  onDark = false,
}: {
  steps: { title: string; text: string }[];
  onDark?: boolean;
}) {
  const inset = `${50 / steps.length}%`;
  return (
    <ol className={`relative grid gap-8 sm:grid-cols-2 lg:gap-5 ${columns[steps.length] ?? "lg:grid-cols-4"}`}>
      <span
        aria-hidden
        className={`absolute top-6 hidden h-0.5 lg:block ${onDark ? "bg-white/15" : "bg-line"}`}
        style={{ left: inset, right: inset }}
      />
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal
          style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          className="relative text-center"
        >
          <span
            className={`relative mx-auto grid size-12 place-items-center rounded-full border-4 bg-energy-deep text-sm font-bold text-white tabular-nums ${
              onDark ? "border-navy-900" : "border-paper"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-5 text-base leading-snug font-extrabold ${onDark ? "text-white" : "text-navy-900"}`}>{step.title}</h3>
          <p className={`mx-auto mt-2 max-w-xs text-sm leading-6 ${onDark ? "text-haze" : "text-ink"}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

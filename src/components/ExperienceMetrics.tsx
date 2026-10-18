import { trustMetrics, type Metric } from "@/lib/site";

/**
 * Trust pillars. Values describe the senior team's professional experience,
 * never company-level statistics, so they are shown as plain text with no count-up.
 */
export function ExperienceMetrics({
  metrics = trustMetrics,
  onDark = true,
}: {
  metrics?: Metric[];
  onDark?: boolean;
}) {
  const columns = metrics.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <dl className={`grid grid-cols-1 sm:grid-cols-2 ${columns}`}>
      {metrics.map((metric, index) => (
        <div
          key={metric.value}
          data-reveal
          style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
          className={`flex flex-col-reverse justify-end gap-2 border-t py-7 pr-6 lg:border-t-0 lg:border-l lg:py-2 lg:pl-6 lg:first:border-l-0 lg:first:pl-0 ${
            onDark ? "border-white/15" : "border-line"
          }`}
        >
          <dt className={`text-xs font-semibold tracking-[0.14em] uppercase ${onDark ? "text-haze" : "text-slate"}`}>
            {metric.label}
          </dt>
          <dd className={`text-xl leading-tight font-extrabold tracking-tight xl:text-2xl ${onDark ? "text-energy" : "text-teal-700"}`}>
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

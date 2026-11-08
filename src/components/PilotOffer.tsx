import { Check } from "lucide-react";
import { ArrowLink, ButtonLink } from "./ButtonLink";
import { SectionHeading } from "./SectionHeading";
import { offer } from "@/lib/site";

const points = [
  `Scope: ${offer.pilot.scope}`,
  `Commercials: ${offer.pilot.price}, agreed before work starts`,
  `Delivery: ${offer.pilot.delivery} from receipt of complete inputs`,
  `Confidentiality: ${offer.nda}`,
];

/** Pilot offer band (fix prompt 2.5). Links to /pilot; the CTA is tracked as pilot_cta_click. */
export function PilotOffer() {
  return (
    <section aria-labelledby="pilot-offer" className="bg-white">
      <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading slab eyebrow="Try us first" title={<span id="pilot-offer">Start With a Fixed-Price Pilot</span>} />
          <p data-reveal className="mt-6 max-w-xl text-base leading-7 text-ink sm:text-lg sm:leading-8">
            Before committing a full package, send us one assembly or a small package. You see our modelling, drawing
            standard and checking on your own project, at a price agreed up front.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" data-track-location="pilot_section">
            <ButtonLink href="/pilot">See Pilot Terms</ButtonLink>
            <ArrowLink href="/contact?service=steel-detailing-fabrication">Send drawings for a quote</ArrowLink>
          </div>
        </div>
        <ul data-reveal className="self-center border-t border-line lg:col-span-6">
          {points.map((point) => (
            <li key={point} className="flex gap-3 border-b border-line py-4 text-[0.9375rem] leading-6 font-semibold text-navy-900 sm:text-base">
              <Check aria-hidden strokeWidth={3} className="mt-1 size-4 shrink-0 text-energy-deep" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

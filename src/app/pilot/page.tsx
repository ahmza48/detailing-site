import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ScopeChecklist } from "@/components/ScopeChecklist";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ButtonLink";
import { WhatsAppCta } from "@/components/WhatsAppButton";
import type { Faq } from "@/lib/faqs";
import { areaServedCodes, faqPageJsonLd, landingServiceJsonLd, pageMetadata } from "@/lib/seo";
import { offer } from "@/lib/site";

const seo = {
  title: "Fixed-Price Steel Detailing Pilot",
  description:
    "Try PetroHill on your own project: one assembly or a 5–10 t package, fixed price, delivered in 5 working days. NDA on request, 24-hour quotes.",
};

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/pilot",
  image: "/images/services-overview.jpg",
  keywords: ["steel detailing pilot", "trial detailing package"],
});

/** Pilot terms as confirmed by the owner (src/lib/site.ts `offer`). */
const terms = [
  { label: "Scope", value: offer.pilot.scope.replace(/^./, (c) => c.toUpperCase()) },
  { label: "Price", value: "Fixed, quoted and agreed before work starts" },
  { label: "Delivery", value: `${offer.pilot.delivery} from receipt of complete inputs` },
  { label: "Confidentiality", value: offer.nda },
];

const timeline = [
  { title: "Send", text: "Share the drawings and specification for the assembly or package you want to test." },
  { title: "Quote", text: `We reply ${offer.quoteResponse} with the fixed price, assumptions and any open questions.` },
  { title: "Detail", text: "Once inputs are complete, we model, detail and check the package." },
  { title: "Deliver", text: `Drawings, model and reports issued within ${offer.pilot.delivery}, followed by a review call.` },
];

/** What a client can judge from the pilot. */
const judge = [
  {
    title: "Drawing standard",
    text: "Layout, dimensioning, marks, notes and title blocks on your own templates, so you can compare them directly with what your shop or reviewer expects.",
  },
  {
    title: "Queries before assumptions",
    text: "The questions we raise on missing or conflicting information, and how clearly they are logged, show how we will protect your schedule on a full package.",
  },
  {
    title: "Checking and accuracy",
    text: "Member sizes, bolt counts, material lists and drawing references checked against the design before issue, and reconciled with the model reports.",
  },
  {
    title: "Revisions and communication",
    text: "How comments are acknowledged, incorporated, clouded and re-issued, and how quickly we respond while your working day is still running.",
  },
];

const faqs: Faq[] = [
  {
    id: "pilot-what",
    q: "What counts as one assembly or a 5–10 t package?",
    a: "A single fabricated assembly, such as a platform, a stair, a pipe rack bent or an equipment support, or a small package of related steel in the 5–10 tonne range. If your test piece is larger, we will quote it as a normal package or suggest a representative part of it.",
  },
  {
    id: "pilot-when",
    q: "When do the 5 working days start?",
    a: "From the day we have complete inputs: approved design information, the specification and drawing standard, and answers to any questions raised in the quote. Open queries pause the clock until they are answered.",
  },
  {
    id: "pilot-price",
    q: "How is the fixed price set?",
    a: `We review what you send and reply ${offer.quoteResponse} with a fixed price for the pilot scope and the assumptions behind it. The price does not change unless the scope does.`,
  },
  {
    id: "pilot-after",
    q: "What happens after the pilot?",
    a: "You review the deliverables against your standards. If you want to continue, we quote the next package on the same conventions; if not, you keep the pilot deliverables.",
  },
  {
    id: "pilot-nda",
    q: "Can we sign an NDA first?",
    a: "Yes. Tick the NDA option on the form, or send your NDA by email, and we will agree confidentiality before you share drawings.",
  },
];

export default function PilotPage() {
  return (
    <>
      <JsonLd
        data={landingServiceJsonLd({
          slug: "pilot",
          seo,
          hero: { image: "/images/services-overview.jpg" },
          schema: { serviceType: "Steel detailing pilot package", areaServed: [...areaServedCodes] },
        })}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />

      <Hero
        eyebrow="Try us on your own project"
        title="A Fixed-Price Detailing Pilot"
        accent="Before You Commit"
        intro={`${offer.pilot.summary} See our modelling, drawing standard and checking on real work before you hand over a full package.`}
        image="/images/services-overview.jpg"
        imageAlt="Multi-level steel process structure with large-bore piping"
        crumbs={[{ name: "Pilot", path: "/pilot" }]}
      >
        <ButtonLink href="#rfq">Start a Pilot</ButtonLink>
        <WhatsAppCta />
      </Hero>

      {/* Terms */}
      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-6">
            <SectionHeading slab title="Pilot Terms" />
            <p className="mt-6 text-lg leading-8 font-semibold text-navy-900 sm:text-xl sm:leading-9">
              Switching detailing partners is a risk. The pilot keeps that risk small: one defined piece of work, a price
              agreed up front and a short, fixed delivery time.
            </p>
            <p className="mt-5 text-base leading-7 text-ink sm:text-[1.0625rem] sm:leading-8">
              You choose the test piece, ideally something typical of the packages you would send us later. We detail it
              to your drawing standard, numbering and specification, check it, and issue it with the same deliverables a
              full package would have, so you can judge the output, the queries we raise and how we handle comments.
            </p>
          </div>
          <dl data-reveal className="self-center border-t border-line lg:col-span-6">
            {terms.map((term) => (
              <div key={term.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-4">
                <dt className="text-xs font-bold tracking-[0.14em] text-teal-700 uppercase">{term.label}</dt>
                <dd className="flex gap-2 text-[0.9375rem] leading-6 font-semibold text-navy-900 sm:text-base">
                  <Check aria-hidden strokeWidth={3} className="mt-1 size-4 shrink-0 text-energy-deep" />
                  {term.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What the pilot shows */}
      <section className="bg-navy-900 text-white">
        <div className="container-site section-y">
          <SectionHeading onDark title="What the Pilot Shows You" intro="Four things to judge before you send us a full package." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {judge.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="rounded-xl bg-white/8 p-6"
              >
                <span className="text-xs font-bold text-energy tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-haze">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper">
        <div className="container-site section-y">
          <SectionHeading centered title="How the Pilot Runs" intro="Four steps from first email to delivered drawings." />
          <div className="mt-14">
            <ProcessSteps steps={timeline} />
          </div>
        </div>
      </section>

      {/* What to send / receive */}
      <section className="bg-white">
        <div className="container-site section-y">
          <SectionHeading slab title="What to Send, What You Receive" />
          <div data-reveal className="mt-10">
            <ScopeChecklist
              headingLevel="h3"
              groups={[
                {
                  heading: "Send us",
                  items: [
                    "Approved design drawings for the test piece",
                    "Project specification and drawing standard",
                    "Material grades and bolting requirements",
                    "Your numbering and title block conventions",
                    "Software version and required formats",
                    "Target date and reviewer contact",
                  ],
                },
                {
                  heading: "You receive",
                  items: [
                    "Tekla model of the pilot scope",
                    "GA / erection and shop drawings",
                    "Material and bolt lists",
                    `Exchange files as agreed: ${offer.formats.join(", ")}`,
                    "Query log and revision register",
                    "A review call on the deliverables",
                  ],
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Pilot Questions" />
            <div className="mt-8">
              <RelatedGuides
                surface="white"
                title="Prepare Your Pilot"
                slugs={["structural-detailing-input-checklist", "how-to-write-an-rfq-for-structural-detailing", "outsourcing-structural-steel-detailing-guide"]}
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqList faqs={faqs} surface="white" openFirst={false} />
          </div>
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="scroll-mt-20 bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              slab
              title="Start Your Pilot"
              intro={`Describe the assembly or package you want to test. We reply ${offer.quoteResponse} with a fixed price.`}
            />
          </div>
          <div className="rounded-xl bg-paper p-6 sm:p-8 lg:col-span-8">
            <ContactForm formLocation="pilot" defaultService="steel-detailing-fabrication" />
          </div>
        </div>
      </section>
    </>
  );
}

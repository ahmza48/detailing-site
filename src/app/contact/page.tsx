import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone, Plus } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site, telHref, whatsappHref } from "@/lib/site";
import { tc } from "@/lib/text";

export const metadata: Metadata = pageMetadata({
  title: "Request a Structural Detailing Quote",
  description:
    "Share your structural drafting, shop drawing, Tekla modelling, brownfield or MTO package for technical scope and quotation review.",
  path: "/contact",
  image: "/images/contact-overview.jpg",
});

const helpful = [
  "Type of structures and approximate quantity or tonnage",
  "Design inputs available and their status",
  "Deliverables required and their format",
  "Software, version and standards specified",
  "Greenfield or brownfield, onshore or offshore",
  "Target schedule and key issue dates",
];

/** Inline FAQ (spec v2 §13.3). */
const faqs = [
  {
    q: "What should I send first?",
    a: "The project type, the services you need, a target issue date and a short description. Drawing and model source information is shared once an appropriate transfer method is agreed.",
  },
  {
    q: "Can you work with our standards?",
    a: "The applicable standards, owner specifications, drawing conventions and formats are assessed in the technical review.",
  },
  {
    q: "Can you provide a full subcontract detailing package?",
    a: "A defined package may combine modelling, steel shop drawings, quantities and document issue. The included outputs are agreed in the statement of work.",
  },
  {
    q: "Do you perform design sign-off?",
    a: "Not as part of CAD, modelling or drawing production. Professional sign-off has to be separately established if it is needed.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Request a Quote"
        title="Request a Structural Detailing,"
        accent="CAD Drafting or Modelling Quote"
        intro="Share the work package your team needs delivered: a structural GA set, a Tekla detailing model, shop drawings, reinforcement documentation, an existing-plant modification or a material take-off. We review the requirements and current resources before confirming feasibility, clarifications and a quotation approach."
        image="/images/contact-overview.jpg"
        imageAlt="Process towers and a crane under an evening sky"
        crumbs={[{ name: "Request a Quote", path: "/contact" }]}
      />

      <section className="bg-white">
        <div className="container-site section-y grid gap-14 lg:grid-cols-12 lg:gap-20">
          <aside className="lg:col-span-4">
            <p data-reveal className="text-xl leading-relaxed font-semibold text-navy-900">
              We welcome enquiries from EPC contractors, engineering consultancies, steel fabricators, industrial
              contractors and energy-sector project teams.
            </p>

            <h2 data-reveal className="mt-10 text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">
              Helpful to include
            </h2>
            <ul data-reveal className="mt-3 border-t border-line">
              {helpful.map((item) => (
                <li key={item} className="flex gap-3 border-b border-line py-3.5 text-[0.9375rem] font-medium text-ink">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-energy-deep" />
                  {tc(item)}
                </li>
              ))}
            </ul>

            <h2 data-reveal className="mt-10 text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">
              Reach us directly
            </h2>
            <ul data-reveal className="mt-4 space-y-3">
              <li>
                <a
                  href={telHref}
                  className="lift group flex items-center gap-4 rounded-xl bg-paper p-4 hover:shadow-[0_8px_24px_rgb(0_36_56/0.1)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-navy-900 text-energy">
                    <Phone aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-slate uppercase">Call</span>
                    <span className="block font-bold text-navy-900">{site.phone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift group flex items-center gap-4 rounded-xl bg-paper p-4 hover:shadow-[0_8px_24px_rgb(0_36_56/0.1)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-slate uppercase">WhatsApp</span>
                    <span className="block font-bold text-navy-900">Start a chat</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift group flex items-center gap-4 rounded-xl bg-paper p-4 hover:shadow-[0_8px_24px_rgb(0_36_56/0.1)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-navy-900 text-energy">
                    <MapPin aria-hidden className="size-5" />
                  </span>
                  <address className="not-italic">
                    <span className="block text-xs font-semibold text-slate uppercase">Office</span>
                    <span className="block font-bold text-navy-900">{site.address.lines.join(", ")}</span>
                  </address>
                </a>
              </li>
              {site.contactEmail && (
                <li>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="lift flex items-center gap-4 rounded-xl bg-paper p-4 hover:shadow-[0_8px_24px_rgb(0_36_56/0.1)]"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-navy-900 text-energy">
                      <Mail aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-slate uppercase">Email</span>
                      <span className="block font-bold break-all text-navy-900">{site.contactEmail}</span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </aside>

          <div className="lg:col-span-8">
            <SectionHeading
              slab
              title="Quote Request"
              intro="A short scope summary is enough to start. Confidential drawings and models are exchanged after first contact, through your document system or a transfer method agreed with you; confidentiality arrangements can be discussed first if you ask."
              className="mb-10"
            />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Inline FAQ */}
      <section className="bg-paper">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading slab title="Before You Send" />
            <p data-reveal className="mt-5 text-base leading-7 text-ink">
              Quick answers to the questions most enquiries start with. No fixed turnaround is promised; we respond
              once the request has been reviewed.
            </p>
            <div className="mt-8">
              <RelatedGuides
                title="How to Prepare Your RFQ"
                slugs={["how-to-write-an-rfq-for-structural-detailing", "structural-detailing-input-checklist"]}
              />
            </div>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                open={i === 0}
                className="group/faq rounded-xl bg-white shadow-[0_4px_16px_rgb(0_36_56/0.06)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl px-6 py-5 text-base font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-energy-deep transition-transform duration-300 group-open/faq:rotate-45">
                    <Plus aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[0.9375rem] leading-7 text-ink">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

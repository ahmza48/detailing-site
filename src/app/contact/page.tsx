import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { pageMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Discuss a structural detailing, modelling or drawing scope for your energy project. Enquiries welcome from EPC contractors, engineering consultancies, fabricators and package vendors.",
  path: "/contact",
  image: "/images/contact-overview.jpg",
});

const helpful = [
  "Type of structures and approximate quantity or tonnage",
  "Deliverables required and their format",
  "Modelling or drawing environment specified",
  "Greenfield or brownfield, onshore or offshore",
  "Target schedule and key issue dates",
];

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="Discuss Your"
        accent="Structural Scope"
        intro="Tell us what your project needs. We will review the scope and respond with how our team can support it."
        image="/images/contact-overview.jpg"
        imageAlt="Process towers and a crane under an evening sky"
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="bg-white">
        <div className="container-site section-y grid gap-14 lg:grid-cols-12 lg:gap-20">
          <aside className="lg:col-span-4">
            <p data-reveal className="text-xl leading-relaxed font-semibold text-navy-900">
              We welcome enquiries from EPC contractors, engineering consultancies, fabricators, package vendors and
              energy-sector project teams.
            </p>

            <h2 data-reveal className="mt-10 text-xs font-bold tracking-[0.18em] text-teal-700 uppercase">
              Helpful to include
            </h2>
            <ul data-reveal className="mt-3 border-t border-line">
              {helpful.map((item) => (
                <li key={item} className="flex gap-3 border-b border-line py-3.5 text-[0.9375rem] font-medium text-ink">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-energy-deep" />
                  {item}
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
            <h2 className="display-md mb-8 text-navy-900 uppercase">Project enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { landingPath, specialistPages } from "@/lib/landing-pages";
import { marketRegions, marketsPath } from "@/lib/markets";
import { outsourcingLink, site, telHref, whatsappHref } from "@/lib/site";
import { services, servicePath, type ServiceSlug } from "@/lib/services";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppButton";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Project Experience", href: "/project-experience" },
  { label: "Technical Capabilities", href: "/capabilities" },
  { label: "Codes & Standards", href: "/capabilities/codes-standards" },
  { label: "Quality & Delivery", href: "/quality-delivery" },
  { label: "Resources", href: "/resources" },
  { label: "FAQs", href: "/faq" },
];

/** Short service names, so each footer link stays on one line. */
const serviceShort: Record<ServiceSlug, string> = {
  "civil-structural-drafting": "Civil & Structural Drafting",
  "plant-structural-3d-modelling": "3D Structural & Plant Modelling",
  "steel-detailing-fabrication": "Structural Steel Detailing",
  "rcc-reinforcement-detailing": "RCC & Rebar Detailing",
  "brownfield-structural-modifications": "Brownfield Modifications",
  "material-takeoffs-documentation": "MTO, BOM & Documentation",
};

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "FAQs", href: "/faq" },
];

const headingClass = "mb-3 text-xs font-bold tracking-[0.16em] text-white uppercase";
const linkClass = "inline-flex min-h-8 items-center text-sm leading-5 transition-colors hover:text-energy";
const contactClass = "flex items-start gap-3 transition-colors hover:text-energy";

function FooterLinks({ title, href, links }: { title: string; href?: string; links: { label: string; href: string; accent?: boolean }[] }) {
  const id = `footer-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className={headingClass}>
        {href ? (
          <Link href={href} className="transition-colors hover:text-energy">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`${linkClass} ${link.accent ? "font-bold text-energy" : ""}`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-mist">
      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-12 lg:gap-x-8 lg:py-16">
        {/* Brand and contact */}
        <div className="col-span-2 lg:col-span-4 lg:pr-6">
          <Logo className="h-auto w-64 sm:w-72" />
          <p className="mt-5 max-w-sm text-sm leading-6">{site.tagline}.</p>
          <address className="mt-6 space-y-3 text-sm leading-6 not-italic">
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className={contactClass}>
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-energy" />
              <span>{site.address.lines.join(", ")}</span>
            </a>
            <a href={telHref} className={`${contactClass} font-bold`}>
              <Phone aria-hidden className="mt-1 size-4 shrink-0 text-energy" />
              {site.phone.display}
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={contactClass}>
              <WhatsAppIcon className="mt-1 size-4 shrink-0 text-energy" />
              WhatsApp us
            </a>
            {[
              { label: "For General Inquiries Email us at:", address: site.email.info },
              { label: "For Project Discussions Email us at:", address: site.email.projects },
            ].map(({ label, address }) => (
              <a key={address} href={`mailto:${address}`} className={contactClass}>
                <Mail aria-hidden className="mt-1 size-4 shrink-0 text-energy" />
                <span>
                  <span className="block text-xs leading-5 text-haze">{label}</span>
                  <span className="font-bold break-all">{address}</span>
                </span>
              </a>
            ))}
          </address>
        </div>

        <div className="lg:col-span-2">
          <FooterLinks title="Company" links={[...company, { label: "Request a Quote", href: "/contact", accent: true }]} />
        </div>

        <div className="lg:col-span-3">
          <FooterLinks
            title="Services"
            href="/services"
            links={[
              ...services.map((service) => ({ label: serviceShort[service.slug], href: servicePath(service.slug) })),
              { label: "Engineering Outsourcing", href: outsourcingLink.href, accent: true },
            ]}
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-3 lg:grid-cols-1">
          <FooterLinks
            title="Specialist Detailing"
            links={[
              ...specialistPages.map((page) => ({ label: page.nav.label, href: landingPath(page.slug) })),
              { label: "Fixed-Price Pilot", href: "/pilot", accent: true },
            ]}
          />
          <FooterLinks
            title="Markets We Serve"
            href={marketsPath}
            links={marketRegions.map((region) => ({
              label: region.id === "americas" ? "Americas (USA)" : region.label,
              href: landingPath(region.hub ?? region.countries[0]),
            }))}
          />
        </div>
      </div>

      <div className="container-site">
        {/* Right padding keeps the legal links clear of the floating WhatsApp button */}
        <div className="border-t border-white/15 py-6 pr-20">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="text-xs text-haze">
              © Copyright. All rights reserved by {site.name}. Product names are trademarks of their respective owners.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center text-xs font-semibold text-mist transition-colors hover:text-energy">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

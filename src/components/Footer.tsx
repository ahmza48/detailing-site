import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { experienceDisclaimer, outsourcingLink, site, telHref, whatsappHref } from "@/lib/site";
import { services, servicePath } from "@/lib/services";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppButton";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Projects & Work Samples", href: "/project-experience" },
  { label: "Technical Capabilities", href: "/capabilities" },
  { label: "Codes & Standards", href: "/capabilities/codes-standards" },
  { label: "Quality & Delivery", href: "/quality-delivery" },
  { label: "Request a Quote", href: "/contact" },
];

const linkClass = "inline-flex min-h-9 items-center text-sm transition-colors hover:text-energy";
// Each column hangs off a green vertical rule
const columnClass = "border-l-2 border-energy-deep pl-5";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-mist">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-3">
          <Logo className="text-white" />
          <p className="mt-6 max-w-xs text-sm leading-6">{site.tagline}.</p>
        </div>

        <nav aria-label="Footer" className={`lg:col-span-3 ${columnClass}`}>
          <ul>
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`${linkClass} font-bold uppercase`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className={`lg:col-span-3 ${columnClass}`}>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={servicePath(service.slug)} className={`${linkClass} font-normal`}>
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={outsourcingLink.href} className={`${linkClass} font-bold text-energy`}>
                {outsourcingLink.label}
              </Link>
            </li>
          </ul>
        </nav>

        <address className={`space-y-4 text-sm leading-6 not-italic lg:col-span-3 ${columnClass}`}>
          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 transition-colors hover:text-energy"
          >
            <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-energy" />
            <span>
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </a>
          <a href={telHref} className="flex items-center gap-3 font-bold transition-colors hover:text-energy">
            <Phone aria-hidden className="size-4 shrink-0 text-energy" />
            {site.phone.display}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 transition-colors hover:text-energy"
          >
            <WhatsAppIcon className="size-4 shrink-0 text-energy" />
            WhatsApp us
          </a>
          {site.contactEmail && (
            <a href={`mailto:${site.contactEmail}`} className="block font-bold break-all text-energy">
              {site.contactEmail}
            </a>
          )}
        </address>
      </div>

      <div className="container-site">
        <div className="border-t border-white/20 py-8">
          <p className="max-w-4xl text-xs leading-5 text-haze">{experienceDisclaimer}</p>
          <p className="mt-5 text-xs text-haze">
            © Copyright. All rights reserved by {site.name}. Product names are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

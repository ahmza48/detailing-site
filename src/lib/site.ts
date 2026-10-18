/**
 * Central site configuration.
 *
 * Company identity and contact details. Every page, metadata tag and JSON-LD
 * block reads from here.
 */
export const site = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Hormuz-Energy",
  shortName: process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME || "Hormuz",
  descriptor: "Civil & Structural Design · Detailing · 3D Modelling",
  tagline:
    "Civil & Structural Design, Detailing and 3D Modelling for Onshore & Offshore Energy Projects",
  description:
    "Specialist civil and structural design, detailing and 3D modelling support for onshore and offshore energy projects, backed by senior professionals with more than three decades of hands-on experience across Gulf and international developments.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, ""),
  /** Shown publicly only when set. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  phone: {
    display: "+92 337 4954695",
    local: "0337 4954695",
    /** E.164, used for tel: links and structured data. */
    e164: "+923374954695",
  },
  /** wa.me takes the number in international format without "+" or spaces. */
  whatsapp: {
    number: "923374954695",
    message: "Hello Hormuz-Energy, I would like to discuss a structural detailing / modelling scope.",
  },
  address: {
    lines: ["IVY, Phase XI", "DHA, Lahore", "Pakistan"],
    street: "IVY, Phase XI, DHA",
    locality: "Lahore",
    region: "Punjab",
    country: "PK",
    countryName: "Pakistan",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=IVY%20Phase%20XI%20DHA%20Lahore",
  },
  ogImage: "/images/og-default.jpg",
  locale: "en",
} as const;

export const telHref = `tel:${site.phone.e164}`;
export const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Project Experience", href: "/project-experience" },
  { label: "Industries", href: "/industries" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/contact" },
];

export const experienceDisclaimer =
  "Selected project experience reflects work undertaken by senior team members during previous employment and professional engagements with established EPC, engineering and construction organizations. Project/client references are provided to demonstrate relevant experience and do not imply that the present company directly contracted with the named asset owners.";

export const portfolioNote =
  "Selected experience shown on this website includes projects undertaken by senior team members during previous employment or engagements with established EPC, engineering and construction organizations. Project and client names are presented solely to demonstrate relevant professional experience and do not imply direct contractual relationships with this company.";

/** Organizations associated with projects in the senior team's prior experience. Text only, no logos. */
export const associatedOrganizations = [
  "ADNOC",
  "Saudi Aramco",
  "ADMA",
  "Maersk Oil Qatar",
  "Dolphin Energy / QOC",
  "SABIC",
  "BHP",
];

/** Prior employers and project environments of senior personnel. Not partnerships. */
export const priorEnvironments = [
  "NPCC",
  "Penspen",
  "CH2M Hill / VECO",
  "Descon",
  "JGC Descon",
  "Dar Al Riyadh",
];

export type Metric = { value: string; label: string };

export const trustMetrics: Metric[] = [
  { value: "30+ Years", label: "Senior Professional Experience" },
  { value: "Onshore + Offshore", label: "Project Exposure" },
  { value: "GCC / MENA", label: "Energy Project Experience" },
  { value: "Steel + RCC", label: "Structural Capability" },
  { value: "Greenfield + Brownfield", label: "Project Experience" },
];

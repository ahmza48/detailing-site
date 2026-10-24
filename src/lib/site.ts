/**
 * Central site configuration.
 *
 * Company identity and contact details. Every page, metadata tag and JSON-LD
 * block reads from here.
 */
export const site = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Hormuz-Energy",
  shortName: process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME || "Hormuz",
  descriptor: "Civil & Structural Engineering Support, Modelling & Detailing",
  tagline:
    "Civil & structural engineering support, modelling and detailing for energy and industrial projects",
  description:
    "Civil and structural CAD drafting, TEKLA Structures modelling, steel fabrication detailing, RCC reinforcement documentation and brownfield modification packages for EPC contractors, engineering consultancies and steel fabricators in the energy and industrial sectors.",
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

export type NavLink = { label: string; href: string };
export type NavMenuId = "services" | "industries" | "capabilities";
export type NavItem = NavLink & { menu?: NavMenuId };

/** Desktop and mobile navigation (spec 3.2). "Request a Quote" is rendered separately as the CTA. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "Projects & Work Samples", href: "/project-experience" },
  { label: "Technical Capabilities", href: "/capabilities", menu: "capabilities" },
  { label: "About Us", href: "/about" },
];

export const quoteCta: NavLink = { label: "Request a Quote", href: "/contact" };

export const capabilitiesMenu: NavLink[] = [
  { label: "Software & Deliverables", href: "/capabilities" },
  { label: "Codes & Standards", href: "/capabilities/codes-standards" },
  { label: "Quality & Delivery", href: "/quality-delivery" },
  { label: "File Formats & Workflow", href: "/capabilities#formats" },
];

export const outsourcingLink: NavLink = { label: "Engineering Outsourcing & Subcontract Support", href: "/engineering-outsourcing" };
export const applicationsLink: NavLink = { label: "Structures & Applications", href: "/applications" };

export const experienceDisclaimer =
  "Selected project experience reflects work undertaken by senior team members during previous employment and professional engagements with established EPC, engineering and construction organizations. Project/client references are provided to demonstrate relevant experience and do not imply that the present company directly contracted with the named asset owners.";

export const portfolioNote =
  "Selected experience shown on this website includes projects undertaken by senior team members during previous employment or engagements with established EPC, engineering and construction organizations. Project and client names are presented solely to demonstrate relevant professional experience and do not imply direct contractual relationships with this company.";

/**
 * Asset owners referenced in the senior team's prior project experience
 * (spec v2 §12.4). Listed only where the owner is recorded against a project in
 * src/lib/projects.ts, and always shown with that project: never as clients,
 * partners or endorsements. TODO_VERIFY publication permission with the owner.
 * Removed pending verification (no recorded project): Maersk Oil Qatar, SABIC, BHP.
 */
export const referencedAssetOwners: { name: string; projectIds: string[] }[] = [
  { name: "ADNOC", projectIds: ["onshore-civil-structural"] },
  { name: "ADMA", projectIds: ["offshore-structural"] },
  { name: "Saudi Aramco", projectIds: ["rcc-detailing"] },
  { name: "Dolphin Energy / QOC", projectIds: ["drawings-qaqc"] },
];

/** Sitewide standards statement (spec v2 §9.1). */
export const standardsStatement =
  "Project-specific standards, specifications and client procedures are reviewed and incorporated into the agreed documentation and detailing scope. Applicability, editions, deviations and approval responsibilities are confirmed before work proceeds.";

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

/**
 * "30+ Years" refers to senior personnel's professional experience, never
 * company age. TODO_VERIFY: whose experience and the basis, against the CV.
 */
export const trustMetrics: Metric[] = [
  { value: "30+ Years", label: "Senior Professional Experience" },
  { value: "Onshore + Offshore", label: "Project Exposure" },
  { value: "GCC / MENA", label: "Energy Project Experience" },
  { value: "Steel + RCC", label: "Structural Capability" },
  { value: "Greenfield + Brownfield", label: "Project Experience" },
];

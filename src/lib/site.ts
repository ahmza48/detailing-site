/**
 * Central site configuration.
 *
 * Company identity and contact details. Every page, metadata tag and JSON-LD
 * block reads from here.
 */
export const site = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "PetroHill",
  shortName: process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME || "PetroHill",
  descriptor: "Civil & Structural Engineering Support, Modelling & Detailing",
  tagline:
    "Civil & structural engineering support, modelling and detailing for energy and industrial projects",
  description:
    "Civil and structural CAD drafting, TEKLA Structures modelling, steel fabrication detailing, RCC reinforcement documentation and brownfield modification packages for EPC contractors, engineering consultancies and steel fabricators in the energy and industrial sectors.",
  /**
   * Canonical origin. NEXT_PUBLIC_SITE_URL should be set to the custom domain; until it is, Vercel's
   * production domain (provided at build time) keeps canonicals, robots and the sitemap on a real host.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    // Local development only; production reads NEXT_PUBLIC_SITE_URL (set to https://petrohill.com once live).
    "https://petrohill.com"
  ).replace(/\/$/, ""),
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
    message: "Hello PetroHill, I would like to discuss a structural detailing / modelling scope.",
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
/** `short` is the desktop-header label, so the full menu, logo and CTA fit on one line from 1280px. */
export type NavItem = NavLink & { menu?: NavMenuId; short?: string };

/** Desktop and mobile navigation (spec 3.2). "Request a Quote" is rendered separately as the CTA. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "Projects & Work Samples", short: "Projects", href: "/project-experience" },
  { label: "Technical Capabilities", short: "Capabilities", href: "/capabilities", menu: "capabilities" },
  { label: "Resources", href: "/resources" },
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

// Organisations from prior experience (asset owners, former employers) live in ./experience-orgs.ts.

/** Sitewide standards statement (spec v2 §9.1). */
export const standardsStatement =
  "Project-specific standards, specifications and client procedures are reviewed and incorporated into the agreed documentation and detailing scope. Applicability, editions, deviations and approval responsibilities are confirmed before work proceeds.";


export type Metric = { value: string; label: string };

/**
 * "30+ Years" refers to senior personnel's professional experience, never
 * company age. TODO_VERIFY: whose experience and the basis, against the CV.
 */
export const trustMetrics: Metric[] = [
  { value: "30+ Years", label: "Senior Professional Experience" },
  { value: "Onshore & Offshore", label: "Previous Project Exposure" },
  { value: "Steel & RCC", label: "Structural Deliverables" },
  { value: "GCC & International", label: "Prior Project Environments" },
  { value: "Greenfield + Brownfield", label: "Prior Project Experience" },
];

/** Mission, vision and delivery commitment (Home / About brief, section C). Shown on Home and About. */
export const purpose = [
  {
    title: "Our Mission",
    text: "To support engineering and fabrication teams with clear structural drawings, coordinated models and well-managed technical documentation, developed from agreed project inputs and requirements.",
  },
  {
    title: "Our Vision",
    text: "To become a trusted technical-production partner for energy and industrial infrastructure projects, recognised for dependable collaboration and precise engineering deliverables.",
  },
  {
    title: "Our Delivery Commitment",
    text: "We aim to establish deliverables and responsibilities early, raise technical queries promptly, follow agreed checking and review arrangements, and maintain traceable drawing revisions through issue.",
  },
];

export const motto = "Engineering clarity. Detail by detail.";

/** Visible disclaimers for the experience tickers. */
export const tickerDisclaimers = {
  assetOwner:
    `Historical professional project exposure only. Names are shown for experience context; these organisations are not presented as clients, partners or endorsers of ${site.name}.`,
  formerEmployer:
    "Organisations where senior team members previously worked or were engaged. Shown as career background only; not current partnerships, clients or endorsements.",
};

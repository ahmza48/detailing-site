/**
 * Central site configuration.
 *
 * Company identity and contact details. Every page, metadata tag and JSON-LD
 * block reads from here.
 */
import { publishedOrgs } from "./experience-orgs";

export const site = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "PetroHill",
  shortName: process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME || "PetroHill",
  descriptor: "Civil & Structural Engineering Support, Modelling & Detailing",
  tagline:
    "Civil & structural engineering support, modelling and detailing for energy and industrial projects",
  description:
    "Civil and structural CAD drafting, TEKLA Structures modelling, steel fabrication detailing, RCC reinforcement documentation and brownfield modification packages for EPC contractors, engineering consultancies and steel fabricators in the energy and industrial sectors.",
  /**
   * Canonical origin, www.petrohill.com. Vercel's production domain (provided at build time) is the
   * fallback when NEXT_PUBLIC_SITE_URL is unset, so canonicals, robots and the sitemap stay on a real host.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://www.petrohill.com"
  ).replace(/\/$/, ""),
  /** Public mailboxes: projects@ for quotes and project scopes, info@ for everything else. */
  email: {
    projects: "projects@petrohill.com",
    info: "info@petrohill.com",
  },
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
  /**
   * Official profiles (LinkedIn company page, directory listings), emitted as Organization sameAs.
   * TODO (owner): add the LinkedIn company page URL once it exists.
   */
  sameAs: [] as string[],
  /**
   * Named author and technical reviewer of the /resources articles, shown as a byline and emitted
   * as a schema.org Person. TODO (owner): fill in from the real CV; until then articles stay
   * attributed to the organisation.
   */
  articleAuthor: undefined as ArticleAuthor | undefined,
  ogImage: "/images/og-default.jpg",
  locale: "en",
} as const;

export type ArticleAuthor = {
  name: string;
  jobTitle: string;
  /** Profile page on this site, e.g. /about#team. */
  url?: string;
  /** LinkedIn and other profiles. */
  sameAs?: string[];
};

export const telHref = `tel:${site.phone.e164}`;
export const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

export type NavLink = { label: string; href: string };
export type NavMenuId = "services" | "industries" | "markets" | "capabilities";
/** `short` is the desktop-header label, so the full menu, logo and CTA fit on one line from 1280px. */
export type NavItem = NavLink & { menu?: NavMenuId; short?: string };

/** Desktop and mobile navigation (spec 3.2). "Request a Quote" is rendered separately as the CTA. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "Markets We Serve", short: "Markets", href: "/markets", menu: "markets" },
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

const listNames = (names: string[]) =>
  names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : (names[0] ?? "");

/**
 * The single statement about project references, shown once near the projects on Home and
 * Project Experience. It attributes the work to the team's prior roles without a negative
 * disclaimer (owner decision). Employers are the confirmed, approved former employers in
 * ./experience-orgs.ts.
 */
export const experienceNote = `Project references reflect our senior team's experience in prior roles at ${listNames(
  publishedOrgs("formerEmployer").map((org) => org.name),
)}.`;

// Organisations from prior experience (asset owners, former employers) live in ./experience-orgs.ts.

export const drawingSamplesNote =
  "Excerpts from drawings produced by our senior team during previous professional engagements. They are confidential, so they are reduced, watermarked and shown without title blocks. Full drawings are for clients only.";

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

/**
 * Commercial terms confirmed by the owner (6 Nov 2026). Every page that states a response time,
 * pilot offer, NDA or delivery format reads from here, so a change is made once.
 */
export const offer = {
  /** Quote reply promise. */
  quoteResponse: "within 24 hours (GCC working day)",
  quoteResponseShort: "24-hour",
  pilot: {
    scope: "one assembly or a 5–10 t package",
    price: "fixed price",
    delivery: "5 working days",
    summary: "One assembly or a 5–10 t package, fixed price, delivered in 5 working days.",
  },
  nda: "NDA on request",
  /** Formats already listed on the service pages; machine files only where contracted. */
  formats: ["Tekla model", "DWG", "PDF", "IFC", "NC / DSTV"],
  /** Project names from the team's prior roles (see ./projects.ts). */
  proofProjects: ["Hail & Ghasha", "Umm Lulu", "Hawiyah NGL", "Dolphin Energy"],
} as const;

export type TimeZoneFocus = "gcc" | "us" | "uk" | "europe" | "australia";

const lahore = { place: "Lahore", offset: "UTC+5", note: "Our office (no daylight saving)" };
const uae = { place: "UAE", offset: "UTC+4", note: "1 hour behind Lahore" };
const ksa = { place: "Saudi Arabia", offset: "UTC+3", note: "2 hours behind Lahore" };
const usGulf = { place: "US Gulf Coast", offset: "UTC−6 / −5", note: "Overnight working" };

/**
 * Lahore (UTC+5) against the markets served; the US entry is approved for agreed packages.
 * Each market page shows its own message first and its own clocks; the homepage shows GCC and US.
 */
export const timeZoneStory = {
  heading: "Working Your Hours",
  lines: {
    gcc: "Lahore is UTC+5: one hour ahead of the UAE and two ahead of Saudi Arabia and Qatar, so we work your full business day.",
    us: "For US clients, we work while you sleep and deliver agreed packages by your morning.",
    uk: "The UK is four to five hours behind Lahore. Your morning overlaps our afternoon for calls and queries, and comments sent in your afternoon are picked up at the start of our next day.",
    europe: "Central Europe is three to four hours behind Lahore. Your morning overlaps our afternoon for calls and queries, and comments sent in your afternoon are picked up at the start of our next day.",
    australia: "Australia's east coast is five to six hours ahead of Lahore, and Perth three. Our morning overlaps your afternoon for calls, and drawings issued at the end of our day are waiting when you start the next morning.",
  } satisfies Record<TimeZoneFocus, string>,
  zones: {
    both: [lahore, uae, ksa, usGulf],
    gcc: [lahore, uae, ksa, { place: "Qatar", offset: "UTC+3", note: "2 hours behind Lahore" }],
    us: [lahore, usGulf, { place: "US East Coast", offset: "UTC−5 / −4", note: "Overnight working" }, uae],
    uk: [lahore, { place: "United Kingdom", offset: "UTC+0 / +1", note: "4–5 hours behind Lahore" }],
    europe: [
      lahore,
      { place: "Central Europe", offset: "UTC+1 / +2", note: "3–4 hours behind Lahore" },
      { place: "UK & Portugal", offset: "UTC+0 / +1", note: "4–5 hours behind Lahore" },
      { place: "Eastern Europe", offset: "UTC+2 / +3", note: "2–3 hours behind Lahore" },
    ],
    australia: [
      lahore,
      { place: "Perth", offset: "UTC+8", note: "3 hours ahead of Lahore" },
      { place: "Brisbane", offset: "UTC+10", note: "5 hours ahead of Lahore" },
      { place: "Sydney & Melbourne", offset: "UTC+10 / +11", note: "5–6 hours ahead of Lahore" },
    ],
  },
};

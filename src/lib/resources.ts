import fs from "node:fs";
import path from "node:path";
import { site } from "./site";
import type { ServiceSlug } from "./services";

/**
 * /resources articles (seo-content-strategy-and-10-articles.md, v2). Metadata comes from each
 * article's brief; bodies live in src/content/resources/{slug}.md, copied from between the
 * ARTICLE-BODY markers, with the brand stored as "{brand}" and filled from site.ts at render.
 * Titles here omit the brand: the layout's title template appends it.
 * TODO_VERIFY (owner): technical review of every article before launch; the point-cloud FAQ in
 * brownfield-structural-modification-drawings.
 */
export type ResourceHub = "A" | "B" | "C" | "D";

export type Resource = {
  num: number;
  slug: string;
  hub: ResourceHub;
  title: string;
  h1: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  primaryKeyword: string;
  readingMinutes: number;
  relatedServices: ServiceSlug[];
  relatedPages: { href: string; label: string }[];
  sources: { title: string; url: string; publisher: string }[];
};

export const resourceHubs: { id: ResourceHub; title: string; text: string }[] = [
  { id: "A", title: "Steel Detailing", text: "What detailing includes, the drawings it produces, the inputs it needs and who is responsible for what." },
  { id: "B", title: "Buying & Outsourcing", text: "How to define, evaluate and request quotations for a detailing or drafting package." },
  { id: "C", title: "Models & Quantities", text: "Specifying Tekla model packages and producing structural material take-offs." },
  { id: "D", title: "Concrete & Existing Plant", text: "Rebar placing drawings and bar bending schedules, and drawing work on operating facilities." },
];

/** First published on the site; update dateModified when an article changes. */
export const RESOURCES_PUBLISHED = "2026-11-01";
export const RESOURCES_MODIFIED = "2026-11-01";

export const resources: Resource[] = [
  {
    num: 1,
    slug: "what-is-structural-steel-detailing",
    hub: "A",
    title: "What Is Structural Steel Detailing? Scope & Deliverables",
    h1: "What Is Structural Steel Detailing?",
    description: "A clear explanation of structural steel detailing: what detailers produce, the design inputs they need, how it differs from design, and how packages are reviewed.",
    ogTitle: "Structural Steel Detailing, Explained",
    ogDescription: "Inputs, outputs and responsibilities in plain engineering language.",
    primaryKeyword: "what is structural steel detailing",
    readingMinutes: 5,
    relatedServices: ["steel-detailing-fabrication"],
    relatedPages: [],
    sources: [
      { title: "ANSI/AISC 303-22 Code of Standard Practice", url: "https://welovesteelconstruction.ssi-steel.com/wp-content/uploads/2024/08/Specification-AISC-303-22_Code-of-Standard-Practice-for-Steel-Buildings-and-Bridges.pdf", publisher: "AISC (copy hosted by SSI)" },
      { title: "Structural Steel Detailing Practices—Good and Bad", url: "https://ej.aisc.org/index.php/engj/article/download/831/830/830", publisher: "AISC Engineering Journal" },
      { title: "Drawings in Tekla Structures", url: "https://support.tekla.com/doc/tekla-structures/2024/dra_drawing_contents", publisher: "Trimble" },
    ],
  },
  {
    num: 2,
    slug: "steel-drawing-types-explained",
    hub: "A",
    title: "GA vs Shop vs Assembly vs Erection Drawings",
    h1: "Steel Drawing Types: GA, Shop, Assembly, Single-Part and Erection Drawings",
    description: "Understand the difference between general arrangement, assembly, single-part, erection and anchor bolt drawings, who uses each one and what each must show.",
    ogTitle: "Which Steel Drawing Does What?",
    ogDescription: "A practical comparison for fabricators and EPC teams.",
    primaryKeyword: "",
    readingMinutes: 4,
    relatedServices: ["steel-detailing-fabrication","civil-structural-drafting"],
    relatedPages: [],
    sources: [
      { title: "Quick start to Tekla Structures drawings (2026)", url: "https://support.tekla.com/doc/tekla-structures/2026/dra_quick_start_to_ts_drawings", publisher: "Trimble" },
      { title: "Drawings in Tekla Structures (2024)", url: "https://support.tekla.com/doc/tekla-structures/2024/dra_drawing_contents", publisher: "Trimble" },
      { title: "Assembly drawings (2021)", url: "https://support.tekla.com/doc/tekla-structures/2021/dra_assembly_drawings", publisher: "Trimble" },
      { title: "ANSI/AISC 303-22", url: "(as Article 1)", publisher: "AISC" },
    ],
  },
  {
    num: 3,
    slug: "structural-detailing-input-checklist",
    hub: "A",
    title: "Steel Detailing Input Checklist for EPC Teams",
    h1: "What Inputs Does a Steel Detailer Need Before Work Starts?",
    description: "A practical checklist of the design drawings, specifications, connection criteria, vendor data and standards a steel detailer needs before modelling begins.",
    ogTitle: "Steel Detailing Input Checklist for EPC Teams",
    ogDescription: "A practical checklist of the design drawings, specifications, connection criteria, vendor data and standards a steel detailer needs before modelling begins.",
    primaryKeyword: "",
    readingMinutes: 4,
    relatedServices: ["steel-detailing-fabrication"],
    relatedPages: [],
    sources: [
      { title: "ANSI/AISC 303-22", url: "(as Article 1)", publisher: "AISC" },
      { title: "BS EN 1090 and Execution Classes, Explained", url: "https://www.koyda.com/guides/bs-en-1090-execution-classes/", publisher: "Koyda" },
      { title: "Execution of Steel Structures (SN32)", url: "https://bcsa.org.uk/upload/Resources/Fabrication%20Technical%20and%20Design/Signs/SIGNS-SN32.pdf", publisher: "BCSA" },
    ],
  },
  {
    num: 4,
    slug: "outsourcing-structural-steel-detailing-guide",
    hub: "B",
    title: "Outsourcing Steel Detailing: A Guide for EPC Teams",
    h1: "Outsourcing Structural Steel Detailing: A Practical Guide for EPC Teams",
    description: "How EPC contractors and fabricators define, evaluate and manage an outsourced steel detailing package: scope, responsibilities, reviews, data security and handover.",
    ogTitle: "Outsourcing Steel Detailing: A Guide for EPC Teams",
    ogDescription: "How EPC contractors and fabricators define, evaluate and manage an outsourced steel detailing package: scope, responsibilities, reviews, data security and handover.",
    primaryKeyword: "",
    readingMinutes: 4,
    relatedServices: ["steel-detailing-fabrication"],
    relatedPages: [{ href: "/engineering-outsourcing", label: "Engineering Outsourcing & Subcontract Support" }],
    sources: [
      { title: "Structural Steel Detailing Practices—Good and Bad", url: "https://ej.aisc.org/index.php/engj/article/download/831/830/830", publisher: "AISC EJ" },
    ],
  },
  {
    num: 5,
    slug: "tekla-model-deliverables-guide",
    hub: "C",
    title: "Tekla Model Deliverables: What to Specify",
    h1: "How to Specify a Tekla Structures Model Package",
    description: "What to specify when commissioning a Tekla Structures model: modelling scope, level of detail, numbering, versions, IFC, DWG and DSTV NC exports, and handover.",
    ogTitle: "Tekla Model Deliverables: What to Specify",
    ogDescription: "What to specify when commissioning a Tekla Structures model: modelling scope, level of detail, numbering, versions, IFC, DWG and DSTV NC exports, and handover.",
    primaryKeyword: "",
    readingMinutes: 3,
    relatedServices: ["plant-structural-3d-modelling"],
    relatedPages: [],
    sources: [
      { title: "Tekla Structures data exchange formats (2026)", url: "https://support.tekla.com/doc/tekla-structures/2026/int_compatible_software", publisher: "Trimble" },
      { title: "NC files (2026)", url: "https://support.tekla.com/doc/tekla-structures/2026/int_create_nc_files", publisher: "Trimble" },
      { title: "Quick start to Tekla Structures drawings (2026)", url: "https://support.tekla.com/doc/tekla-structures/2026/dra_quick_start_to_ts_drawings", publisher: "Trimble" },
      { title: "Save a model (2026)", url: "Trimble Tekla Structures 2026 user documentation (\"Save a model\")", publisher: "Trimble" },
    ],
  },
  {
    num: 6,
    slug: "rebar-placing-drawings-and-bar-bending-schedules",
    hub: "D",
    title: "Rebar Detailing & Bar Bending Schedules Explained",
    h1: "Reinforcement Placing Drawings and Bar Bending Schedules Explained",
    description: "What reinforcement placing drawings and bar bending schedules contain, how BS 8666 and ACI 315 conventions apply, and what inputs a rebar detailer needs.",
    ogTitle: "Rebar Detailing & Bar Bending Schedules Explained",
    ogDescription: "What reinforcement placing drawings and bar bending schedules contain, how BS 8666 and ACI 315 conventions apply, and what inputs a rebar detailer needs.",
    primaryKeyword: "",
    readingMinutes: 4,
    relatedServices: ["rcc-reinforcement-detailing"],
    relatedPages: [],
    sources: [
      { title: "Details and Detailing of Concrete Reinforcement (ACI 315)", url: "https://regbar.com/wp-content/uploads/2019/09/ACI-315.pdf", publisher: "ACI (copy hosted by Regbar)" },
      { title: "BS 8666:2020 shape codes", url: "https://kbrebar.co.uk/downloads/kbshapecodes.pdf", publisher: "KB Rebar (summary of BSI standard)" },
      { title: "BS8666 Shape Codes", url: "https://rebar.co.uk/bs8666-shape-codes/", publisher: "Collins Reinforcements" },
    ],
  },
  {
    num: 7,
    slug: "structural-steel-material-take-off-guide",
    hub: "C",
    title: "Structural Steel MTO: Production, Revisions and Use",
    h1: "Structural Steel Material Take-Off (MTO): A Practical Guide",
    description: "How structural steel material take-offs are produced from drawings or models, how MTO, BOM and BOQ differ, and how to keep quantities reconciled with revisions.",
    ogTitle: "Structural Steel MTO: Production, Revisions and Use",
    ogDescription: "How structural steel material take-offs are produced from drawings or models, how MTO, BOM and BOQ differ, and how to keep quantities reconciled with revisions.",
    primaryKeyword: "",
    readingMinutes: 3,
    relatedServices: ["material-takeoffs-documentation"],
    relatedPages: [],
    sources: [
      { title: "Takeoff (construction)", url: "https://en.wikipedia.org/wiki/Takeoff_(construction)", publisher: "Wikipedia" },
      { title: "Q&A: Difference between BOM and MTO", url: "https://www.researchgate.net/post/Whats_the_difference_between_bill_of_materials_BOM_and_material_take_off_MTO", publisher: "ResearchGate (practitioner discussion)" },
      { title: "What Is a Material Takeoff", url: "https://www.meltplan.com/glossary/what-is-material-takeoff", publisher: "Meltplan" },
    ],
  },
  {
    num: 8,
    slug: "brownfield-structural-modification-drawings",
    hub: "D",
    title: "Brownfield Structural Modification Drawings",
    h1: "Brownfield Structural Modifications: Drawings, Verification and As-Builts",
    description: "How structural modification drawings are prepared on operating plants: verifying existing conditions, existing/removed/new work drawings, tie-ins and as-built updates.",
    ogTitle: "Brownfield Structural Modification Drawings",
    ogDescription: "How structural modification drawings are prepared on operating plants: verifying existing conditions, existing/removed/new work drawings, tie-ins and as-built updates.",
    primaryKeyword: "",
    readingMinutes: 4,
    relatedServices: ["brownfield-structural-modifications"],
    relatedPages: [],
    sources: [
      { title: "Laser scanning and 3D modelling in brownfield offshore facilities: Case studies", url: "https://www.researchgate.net/publication/325687504_Laser_scanning_and_3D_modelling_in_brownfield_offshore_facilities_Case_studies", publisher: "ResearchGate (paper abstract)" },
      { title: "Brownfield Modifications", url: "https://nbsurveys.com/where/brownfield-modifications", publisher: "NB Group" },
    ],
  },
  {
    num: 9,
    slug: "structural-design-vs-detailing-responsibilities",
    hub: "A",
    title: "Design vs Detailing: Who Is Responsible for What?",
    h1: "Structural Design vs Detailing: Who Is Responsible for What?",
    description: "How responsibility is split between structural design, modelling, detailing and drafting, with AISC 303-22 connection options and BS EN 1090-2 execution specifications.",
    ogTitle: "Design vs Detailing: Who Is Responsible for What?",
    ogDescription: "How responsibility is split between structural design, modelling, detailing and drafting, with AISC 303-22 connection options and BS EN 1090-2 execution specifications.",
    primaryKeyword: "",
    readingMinutes: 4,
    relatedServices: ["steel-detailing-fabrication"],
    relatedPages: [{ href: "/capabilities/codes-standards", label: "Project-Specific Engineering Standards" }],
    sources: [
      { title: "ANSI/AISC 303-22", url: "https://welovesteelconstruction.ssi-steel.com/wp-content/uploads/2024/08/Specification-AISC-303-22_Code-of-Standard-Practice-for-Steel-Buildings-and-Bridges.pdf", publisher: "AISC" },
      { title: "Structural Steel Shop Drawings: AISC 303 Rules", url: "https://techdrawai.com/blog/structural-steel-shop-drawings", publisher: "TechDraw AI (secondary)" },
      { title: "BS EN 1090-2 preview", url: "https://webstore.ansi.org/preview-pages/bsi/preview_30320417.pdf", publisher: "BSI via ANSI" },
      { title: "EN 1090-2:2018+A1:2024", url: "https://standards.iteh.ai/catalog/standards/cen/0ca58a93-b883-40b6-8830-1b959bd16637/en-1090-2-2018a1-2024", publisher: "iTeh (CEN catalogue)" },
      { title: "Specifying the right Execution Class", url: "https://www.newsteelconstruction.com/wp/specifying-the-right-execution-class/", publisher: "New Steel Construction" },
    ],
  },
  {
    num: 10,
    slug: "how-to-write-an-rfq-for-structural-detailing",
    hub: "B",
    title: "How to Write an RFQ for Structural Detailing",
    h1: "How to Write an RFQ for a Structural Detailing Package",
    description: "What to include in a request for quotation for steel or RCC detailing so suppliers can price accurately: scope, inputs, deliverables, standards, schedule and review terms.",
    ogTitle: "How to Write an RFQ for Structural Detailing",
    ogDescription: "What to include in a request for quotation for steel or RCC detailing so suppliers can price accurately: scope, inputs, deliverables, standards, schedule and review terms.",
    primaryKeyword: "",
    readingMinutes: 4,
    relatedServices: [],
    relatedPages: [{ href: "/engineering-outsourcing", label: "Engineering Outsourcing & Subcontract Support" }, { href: "/quality-delivery", label: "Quality & Delivery" }],
    sources: [
      { title: "PetroHill homepage FAQ (staging)", url: "https://detailing-site-liart.vercel.app/", publisher: "PetroHill" },
      { title: "Tekla data exchange formats", url: "https://support.tekla.com/doc/tekla-structures/2026/int_compatible_software", publisher: "Trimble" },
    ],
  },
];

export const resourceBySlug = (slug: string) => resources.find((r) => r.slug === slug);
export const resourcePath = (slug: string) => `/resources/${slug}`;
export const resourcesInHub = (hub: ResourceHub) => resources.filter((r) => r.hub === hub);

/** Markdown body with the brand filled in. Read at build time (pages are statically generated). */
export function resourceBody(slug: string): string {
  const file = path.join(process.cwd(), "src", "content", "resources", `${slug}.md`);
  return fs.readFileSync(file, "utf8").replace(/\{brand\}/g, site.name);
}

/** Related guides: articles the body links to first, then hub siblings, up to three. */
export function relatedResources(resource: Resource): Resource[] {
  const body = fs.readFileSync(path.join(process.cwd(), "src", "content", "resources", `${resource.slug}.md`), "utf8");
  const linked = [...body.matchAll(/\]\(\/resources\/([a-z0-9-]+)\)/g)].map((m) => m[1]);
  const siblings = resourcesInHub(resource.hub).map((r) => r.slug);
  const slugs = [...new Set([...linked, ...siblings])].filter((s) => s !== resource.slug);
  return slugs
    .map(resourceBySlug)
    .filter((r): r is Resource => r !== undefined)
    .slice(0, 3);
}

/** Guides relevant to a service page, for its "Related guides" block (spec section 18). */
export const resourcesForService = (slug: ServiceSlug) => resources.filter((r) => r.relatedServices.includes(slug));

import type { Faq } from "./faqs";
import type { ServiceSlug } from "./services";
import { offer } from "./site";

/**
 * Rankable landing pages (fix prompt, phase 4): three markets and three specialisms.
 * /pilot is a separate conversion page (src/app/pilot/page.tsx).
 *
 * Content rules: facts come from what the site already documents (projects.ts, standards.ts,
 * software.ts, services.ts) or the owner-confirmed `offer` in site.ts. Project references are the
 * senior team's prior roles. Standards are the ones a project may specify, never a certification.
 */
export type LandingSlug =
  | "steel-detailing-uae"
  | "steel-detailing-saudi-arabia"
  | "steel-detailing-usa"
  | "pipe-rack-detailing"
  | "tekla-detailing-outsourcing"
  | "offshore-structural-detailing";

export type LandingPage = {
  slug: LandingSlug;
  kind: "market" | "specialism";
  /** Menu label and one-line menu description. */
  nav: { label: string; text: string };
  seo: { title: string; description: string; keyword: string };
  hero: { eyebrow: string; title: string; accent: string; intro: string; image: string; imageAlt: string };
  overview: { heading: string; paragraphs: string[] };
  glance: string[];
  scope: { heading: string; items: string[] }[];
  standards: { refs: string[]; note: string };
  timezone: "gcc" | "us";
  process: { title: string; text: string }[];
  experience: { intro: string; projectIds: string[] };
  faqs: Faq[];
  related: { services: ServiceSlug[]; guides: string[]; pages: LandingSlug[] };
  form: { countryPage: string; defaultCountry: string; defaultService: ServiceSlug };
  schema: { serviceType: string; areaServed: string[] };
};

export const landingPath = (slug: LandingSlug) => `/${slug}`;

const formats = offer.formats.join(", ");

const quoteFaq = (id: string): Faq => ({
  id: `${id}-quote`,
  q: "How quickly will we receive a quote?",
  a: `We reply to quote requests ${offer.quoteResponse}. Send drawings or a scope summary with the deliverables, standards and target dates you have; where inputs are incomplete we list the assumptions we priced and the questions to close.`,
});

const pilotFaq = (id: string): Faq => ({
  id: `${id}-pilot`,
  q: "Can we start with a small trial package?",
  a: `Yes. Our pilot is ${offer.pilot.scope}, at a ${offer.pilot.price}, delivered in ${offer.pilot.delivery} from receipt of complete inputs. It lets you check our model, drawing standard and checking on your own project before committing a larger package. ${offer.nda}.`,
});

export const landingPages: LandingPage[] = [
  {
    slug: "steel-detailing-uae",
    kind: "market",
    nav: { label: "UAE", text: "Dubai, Abu Dhabi and Sharjah fabricators and EPC teams" },
    seo: {
      title: "Steel Detailing Company for UAE Projects",
      description:
        "Structural steel detailing and Tekla modelling for UAE fabricators and EPC teams in Dubai, Abu Dhabi and Sharjah. GST-hours support and 24-hour quotes.",
      keyword: "steel detailing company UAE",
    },
    hero: {
      eyebrow: "Dubai · Abu Dhabi · Sharjah",
      title: "Steel Detailing Services",
      accent: "for UAE Fabricators & EPC Projects",
      intro:
        "Tekla models, shop and erection drawings for UAE oil and gas, industrial and infrastructure steelwork, from a senior team with ADNOC-group project experience, working within Gulf Standard Time.",
      image: "/images/industry-oil-gas.jpg",
      imageAlt: "Large oil and gas processing complex with pipes, tanks and structures",
    },
    overview: {
      heading: "Detailing Capacity for the UAE Market",
      paragraphs: [
        "PetroHill provides structural steel detailing, Tekla modelling and fabrication drawings for fabricators and EPC contractors working on UAE oil and gas, industrial and infrastructure projects. We work remotely from Lahore, one hour ahead of Gulf Standard Time, so drawings, technical queries and revisions move inside your business day rather than overnight.",
        "Our senior team's experience is rooted in UAE energy work. In prior roles they produced structural steel drawings and material take-offs for pipe bridges, platforms and crossover structures on the Hail & Ghasha onshore facilities, offshore structural detailing and shop drawings on the Umm Lulu full development, and structural checking and modification details at BAB and ASAB. That background shapes how we read ADNOC-group specifications, document hierarchies and the requirements fabricators place on a drawing set.",
        "We support steel fabricators in Jebel Ali, Sharjah and Mussafah that need extra detailing capacity during peaks, and EPC teams in Abu Dhabi and Dubai that want a defined package (pipe racks, platforms, equipment supports, shelters or modification steel) modelled and drawn to their standards. Design stays with your engineer of record; our job is to turn the approved design into complete, checked and traceable fabrication information.",
        "Each package starts with a scope review: we confirm the inputs you hold, the drawing standard, numbering and phasing, the deliverables and the issue dates before modelling begins, and we raise information gaps as formal queries instead of assuming.",
      ],
    },
    glance: [
      `Quote reply ${offer.quoteResponse}`,
      "Working hours overlap GST fully",
      `Pilot: ${offer.pilot.summary}`,
      offer.nda,
      `Formats: ${formats}`,
    ],
    scope: [
      {
        heading: "Typical UAE packages",
        items: [
          "Pipe racks, pipe bridges and modular rack steel",
          "Access platforms, stairs, ladders and handrails",
          "Equipment supports, skids and shelters",
          "Industrial steel buildings and sheds",
          "Brownfield modification steel from verified survey data",
          "Secondary and miscellaneous steel",
        ],
      },
      {
        heading: "Deliverables",
        items: [
          "Tekla Structures detailing model",
          "General arrangement and erection drawings",
          "Assembly and single-part shop drawings",
          "Anchor bolt and embed plans",
          "Member, bolt and material lists (MTO)",
          "NC / DSTV files and IFC exports where contracted",
        ],
      },
    ],
    standards: {
      refs: ["client-project", "aisc-303", "aisc-360", "eurocodes", "aws-d11"],
      note: "On ADNOC-group work the project specifications and AGES-based documents supplied by the EPC sit at the top of the hierarchy; we detail to them as issued, alongside the AISC or BS EN design basis your engineer has specified. Working to a standard is not a claim of certification.",
    },
    timezone: "gcc",
    process: [
      { title: "Inputs", text: "Approved design, specifications, grades and your drawing standard; gaps logged as queries before modelling." },
      { title: "Model", text: "Tekla model built to your numbering, phasing and assembly rules." },
      { title: "Checks", text: "Model and drawings checked against the design and the query log before issue." },
      { title: "Drawings", text: "GA, erection, assembly and part drawings with reports, issued per your transmittal." },
      { title: "Revisions", text: "Comments and design changes clouded, re-issued and tracked in the revision register." },
    ],
    experience: {
      intro: "UAE projects from our senior team's prior roles.",
      projectIds: ["onshore-civil-structural", "offshore-structural", "brownfield-modifications"],
    },
    faqs: [
      {
        id: "uae-office",
        q: "Do you have an office in the UAE?",
        a: "No. We work remotely from our office in Lahore, Pakistan, one hour ahead of the UAE. Drawings, models and comments are exchanged through your document system or an agreed transfer method, and calls are held in UAE working hours.",
      },
      {
        id: "uae-specs",
        q: "Can you detail to ADNOC or EPC project specifications?",
        a: "Yes. Send the project specifications, drawing standards and any client procedures that apply; we review them with the scope and detail to them as issued. Approval, certification and design responsibility remain with the project's responsible parties.",
      },
      {
        id: "uae-formats",
        q: "Which formats can you deliver to a UAE fabricator?",
        a: `Typically ${formats}. Machine files and model exchange formats are confirmed during scope review against your Tekla version and workshop software.`,
      },
      quoteFaq("uae"),
      pilotFaq("uae"),
    ],
    related: {
      services: ["steel-detailing-fabrication", "plant-structural-3d-modelling", "brownfield-structural-modifications"],
      guides: ["outsourcing-structural-steel-detailing-guide", "structural-detailing-input-checklist", "how-to-write-an-rfq-for-structural-detailing"],
      pages: ["steel-detailing-saudi-arabia", "pipe-rack-detailing", "offshore-structural-detailing"],
    },
    form: { countryPage: "uae", defaultCountry: "United Arab Emirates", defaultService: "steel-detailing-fabrication" },
    schema: { serviceType: "Structural steel detailing", areaServed: ["AE"] },
  },
  {
    slug: "steel-detailing-saudi-arabia",
    kind: "market",
    nav: { label: "Saudi Arabia", text: "Jubail, Dammam and Riyadh fabricators and EPC teams" },
    seo: {
      title: "Steel Detailing Services for Saudi Arabia",
      description:
        "Steel detailing and Tekla modelling for Saudi Arabia: Jubail, Dammam and Riyadh fabricators and EPC teams, SAES/SAMSS literacy and KSA working hours.",
      keyword: "steel detailing Saudi Arabia",
    },
    hero: {
      eyebrow: "Jubail · Dammam · Riyadh",
      title: "Steel Detailing for",
      accent: "Saudi Arabia Projects",
      intro:
        "Fabrication drawings, Tekla models and rebar documentation for Saudi industrial and gas-processing work, from a senior team with Saudi Aramco-associated project experience, two hours ahead of KSA time.",
      image: "/images/industry-gas-processing.jpg",
      imageAlt: "Spherical storage tanks and process towers at a gas facility",
    },
    overview: {
      heading: "Detailing Support for Saudi Fabricators and EPCs",
      paragraphs: [
        "PetroHill supports fabricators and EPC contractors delivering steel and concrete structures for Saudi Arabia's oil, gas, petrochemical and industrial projects. We work from Lahore, two hours ahead of Arabia Standard Time, so our working day covers the whole Saudi business day.",
        "Saudi work is document-heavy. Project specifications refer to Saudi Aramco engineering standards (SAES) and materials system specifications (SAMSS), contractor procedures and vendor data, and fabricators need drawings that survive inspection against all of them. Our senior team's experience here includes the Hawiyah NGL Recovery Project, where in a prior role they produced RCC structure and pipe rack layout drawings with general arrangements and bar bending schedules.",
        "We detail to the SAES, SAMSS and project specifications supplied with each package and record which document governs each requirement. We do not claim approval or registration with Saudi Aramco or any other operator; approval routes and vendor qualification remain with the EPC and the fabricator.",
        "Typical scopes are steel packages for Jubail and Dammam fabrication yards, pipe racks and equipment structures for gas processing and petrochemical units, and reinforcement documentation for foundations and pedestals where the RCC design is complete.",
      ],
    },
    glance: [
      `Quote reply ${offer.quoteResponse}`,
      "Covers the full KSA working day",
      `Pilot: ${offer.pilot.summary}`,
      offer.nda,
      `Formats: ${formats}`,
    ],
    scope: [
      {
        heading: "Typical Saudi packages",
        items: [
          "Pipe racks and pipe bridges for gas processing units",
          "Equipment structures, platforms and access steel",
          "Shelters, sheds and industrial buildings",
          "Foundations, pedestals and equipment bases (RCC drawings)",
          "Rebar placing drawings and bar bending schedules",
          "Brownfield tie-in and modification steel",
        ],
      },
      {
        heading: "Deliverables",
        items: [
          "Tekla Structures detailing model",
          "GA, erection, assembly and part drawings",
          "Anchor bolt plans and embed details",
          "Bar bending schedules to the specified standard",
          "MTO, bolt lists and revision registers",
          "NC / DSTV files and IFC exports where contracted",
        ],
      },
    ],
    standards: {
      refs: ["client-project", "aisc-303", "aisc-360", "aci-318", "aci-315", "bs-8666"],
      note: "Saudi Aramco SAES and SAMSS documents, EPC procedures and the project specification govern where they apply; we detail to them as supplied and flag conflicts with the general codes for the engineer to resolve. Working to a standard is not a claim of approval or certification.",
    },
    timezone: "gcc",
    process: [
      { title: "Inputs", text: "Design drawings, SAES / SAMSS references, project specifications and vendor data reviewed and logged." },
      { title: "Model", text: "Tekla model or RCC drawings set up to the project numbering and phasing." },
      { title: "Checks", text: "Model and drawings checked against the design, specifications and the query log." },
      { title: "Drawings", text: "Fabrication, erection and reinforcement documents issued per your transmittal." },
      { title: "Revisions", text: "Inspection and client comments incorporated, clouded and tracked to closure." },
    ],
    experience: {
      intro: "Saudi and regional gas-processing experience from our senior team's prior roles.",
      projectIds: ["rcc-detailing", "onshore-civil-structural", "drawings-qaqc"],
    },
    faqs: [
      {
        id: "ksa-aramco",
        q: "Are you approved by Saudi Aramco?",
        a: "No, and we do not claim to be. Our senior team has worked on Saudi Aramco-associated projects in prior roles, and we detail to the SAES, SAMSS and project specifications supplied with each package. Vendor approval and qualification remain with the EPC and the fabricator.",
      },
      {
        id: "ksa-rebar",
        q: "Do you produce rebar drawings and BBS for Saudi projects?",
        a: "Yes, where the reinforcement design is complete. We prepare placing drawings and bar bending schedules to the scheduling convention the project specifies, such as BS 8666 or the ACI 315 family, and raise queries on laps, cover and embed clashes.",
      },
      {
        id: "ksa-hours",
        q: "How do you handle the Saudi working week?",
        a: "Lahore is two hours ahead of Saudi Arabia, so our day covers yours. Weekly progress, query lists and drawing issues are planned around your working week and milestone dates.",
      },
      quoteFaq("ksa"),
      pilotFaq("ksa"),
    ],
    related: {
      services: ["steel-detailing-fabrication", "rcc-reinforcement-detailing", "material-takeoffs-documentation"],
      guides: ["rebar-placing-drawings-and-bar-bending-schedules", "structural-detailing-input-checklist", "structural-design-vs-detailing-responsibilities"],
      pages: ["steel-detailing-uae", "pipe-rack-detailing", "tekla-detailing-outsourcing"],
    },
    form: { countryPage: "saudi-arabia", defaultCountry: "Saudi Arabia", defaultService: "steel-detailing-fabrication" },
    schema: { serviceType: "Structural steel detailing", areaServed: ["SA"] },
  },
  {
    slug: "steel-detailing-usa",
    kind: "market",
    nav: { label: "USA", text: "Overnight detailing support for US fabricators" },
    seo: {
      title: "Outsource Steel Detailing Services (USA)",
      description:
        "Outsource steel detailing to a senior Tekla team: AISC 303/360 detailing, overnight work for agreed packages and 24-hour quotes for US fabricators.",
      keyword: "outsource steel detailing",
    },
    hero: {
      eyebrow: "Overnight support for US fabricators",
      title: "Outsource Steel Detailing",
      accent: "to a Senior Tekla Team",
      intro:
        "AISC-based shop and erection drawings for US fabricators and EPC teams on industrial and petrochemical work. We detail while you sleep and deliver agreed packages by your morning.",
      image: "/images/industry-refinery.jpg",
      imageAlt: "Refinery stacks and columns lit at night",
    },
    overview: {
      heading: "An Overnight Detailing Partner",
      paragraphs: [
        "PetroHill gives US steel fabricators, detailing firms and EPC teams extra detailing capacity without adding headcount. Our office in Lahore is ten to eleven hours ahead of US Central time, so we work through your night: comments sent at the end of your day can be worked overnight and agreed packages delivered by your next morning.",
        "Our senior team brings more than thirty years of experience on heavy industrial and energy steel: refinery expansions, gas-processing units, offshore topsides and brownfield modifications. That experience comes from oil and gas projects in the Middle East and Central Asia rather than US jobs, so for US work we confirm your detailing standards, connection conventions and shop preferences in a scope review before modelling starts.",
        "We detail to the design basis your engineer of record specifies, typically AISC 360 with AISC 303 practice, AWS D1.1 welding symbols and RCSC bolting requirements. Connection design stays with the engineer or your connection designer; we model and draw the approved connections and flag anything that does not close.",
        "Industrial and petrochemical work on the Gulf Coast and elsewhere suits our background best: pipe racks, equipment platforms, process structures, shelters and plant modifications, where member counts are high and fabricators need clean, consistent shop drawings and accurate material lists.",
      ],
    },
    glance: [
      `Quote reply ${offer.quoteResponse}`,
      "Overnight working for agreed packages",
      `Pilot: ${offer.pilot.summary}`,
      offer.nda,
      `Formats: ${formats}`,
    ],
    scope: [
      {
        heading: "Typical US packages",
        items: [
          "Pipe racks and process structures",
          "Equipment platforms, stairs, ladders and handrails",
          "Industrial buildings and shelters",
          "Plant modification and tie-in steel",
          "Overflow detailing for detailing firms",
          "Model-to-drawing production on your Tekla model",
        ],
      },
      {
        heading: "Deliverables",
        items: [
          "Tekla Structures detailing model",
          "Erection drawings and anchor bolt plans",
          "Shop drawings: assembly and single-part",
          "Field bolt lists and material lists",
          "NC / DSTV files where contracted",
          "IFC exports and revision registers",
        ],
      },
    ],
    standards: {
      refs: ["aisc-303", "aisc-360", "aws-d11", "rcsc", "client-project"],
      note: "We detail to the edition of each standard named in your contract documents, and to your shop standards. Working to AISC 303 or AWS D1.1 is not AISC certification; certification of the fabricator and design responsibility stay with the project parties.",
    },
    timezone: "us",
    process: [
      { title: "Inputs", text: "Contract drawings, specifications and your shop standards; RFIs listed before modelling." },
      { title: "Model", text: "Tekla model with your piece marks, phases and connection conventions." },
      { title: "Checks", text: "Model and drawings checked against the contract drawings and RFI answers." },
      { title: "Drawings", text: "Erection, shop and field-bolt documents delivered for your morning." },
      { title: "Revisions", text: "Approval comments and design changes turned around overnight and tracked." },
    ],
    experience: {
      intro: "Heavy industrial projects from our senior team's prior roles.",
      projectIds: ["steel-detailing", "plant-3d-modelling", "onshore-civil-structural"],
    },
    faqs: [
      {
        id: "usa-overnight",
        q: "How does overnight detailing work?",
        a: "You send comments or new information at the end of your day. We work during your night and deliver the agreed package or revision by your next morning. Overnight delivery applies to packages and revision scopes agreed in advance.",
      },
      {
        id: "usa-aisc",
        q: "Do you detail to AISC standards?",
        a: "Yes. We detail to the AISC 360 design basis and AISC 303 practice named in your contract documents, with AWS D1.1 welding and RCSC bolting requirements as specified. Connection design is not included unless separately agreed with a qualified engineer.",
      },
      {
        id: "usa-software",
        q: "Which software do you use?",
        a: "Tekla Structures for detailing models and drawings, with AutoCAD and Navisworks for drawing work and model review. Versions and exchange formats are confirmed with you before work starts.",
      },
      quoteFaq("usa"),
      pilotFaq("usa"),
    ],
    related: {
      services: ["steel-detailing-fabrication", "plant-structural-3d-modelling", "material-takeoffs-documentation"],
      guides: ["outsourcing-structural-steel-detailing-guide", "what-is-structural-steel-detailing", "steel-drawing-types-explained"],
      pages: ["tekla-detailing-outsourcing", "pipe-rack-detailing", "steel-detailing-uae"],
    },
    form: { countryPage: "usa", defaultCountry: "United States", defaultService: "steel-detailing-fabrication" },
    schema: { serviceType: "Structural steel detailing", areaServed: ["US"] },
  },
  {
    slug: "pipe-rack-detailing",
    kind: "specialism",
    nav: { label: "Pipe Rack Detailing", text: "Modular and stick-built racks, bents and supports" },
    seo: {
      title: "Pipe Rack Detailing & Shop Drawings",
      description:
        "Pipe rack detailing for modular and stick-built racks: bents, bracing, cable tray and equipment supports, shop drawings and MTO from a Tekla model.",
      keyword: "pipe rack detailing",
    },
    hero: {
      eyebrow: "Specialist detailing",
      title: "Pipe Rack Detailing",
      accent: "& Shop Drawings",
      intro:
        "Modular and stick-built pipe racks modelled in Tekla and drawn for fabrication and erection: bents, longitudinal bracing, cable tray and equipment supports, with material take-off.",
      image: "/images/onshore-pipe-rack.jpg",
      imageAlt: "Steel pipe rack and process structures at an onshore plant",
    },
    overview: {
      heading: "Pipe Racks Are Our Home Ground",
      paragraphs: [
        "Pipe racks carry the plant: process lines, utilities, cable trays and, often, air coolers and walkways. They are also repetitive in the best and worst ways. Hundreds of near-identical bents make numbering, phasing and revision control decisive, and a single change to a pipe support or tray level can ripple through every drawing.",
        "PetroHill details pipe racks and pipe bridges for fabricators and EPC teams in a Tekla model that carries the whole structure: transverse bents, longitudinal struts and bracing, stringers, cable tray supports, ladders and platforms. Our senior team's experience includes structural steel pipe bridges and crossover structures on the Hail & Ghasha onshore facilities and pipe rack layouts on the Hawiyah NGL Recovery Project.",
        "We set up assembly marks and phasing so that modular racks can be fabricated as transportable units and stick-built racks can be erected bay by bay, and we keep piping and electrical interfaces visible so the loads and support positions your engineers approved arrive on the shop floor unchanged.",
        "Every rack package ends with a reconciled material take-off, because steel tonnage on a rack is where estimate and reality most often part company.",
      ],
    },
    glance: [
      `Quote reply ${offer.quoteResponse}`,
      "Modular and stick-built racks",
      `Pilot: ${offer.pilot.summary}`,
      offer.nda,
      `Formats: ${formats}`,
    ],
    scope: [
      {
        heading: "Rack scope",
        items: [
          "Transverse bents and portal frames",
          "Longitudinal struts, stringers and bracing",
          "Modular rack units with transport and lifting steel",
          "Cable tray, pipe shoe and guide supports",
          "Air-cooler and equipment support steel",
          "Ladders, platforms, walkways and handrails",
        ],
      },
      {
        heading: "Deliverables",
        items: [
          "Tekla model with bay and module phasing",
          "Rack GA, bent elevations and erection drawings",
          "Assembly and single-part shop drawings",
          "Anchor bolt plans for rack foundations",
          "Material take-off and bolt lists",
          "NC / DSTV files and IFC exports where contracted",
        ],
      },
    ],
    standards: {
      refs: ["client-project", "aisc-303", "aisc-360", "eurocodes", "aws-d11"],
      note: "Rack design, load cases and connection design remain with the engineer of record; we detail to the approved design and the project specification. Working to a standard is not a claim of certification.",
    },
    timezone: "gcc",
    process: [
      { title: "Inputs", text: "Rack GA, design sections, pipe and tray loading plans and support schedules reviewed." },
      { title: "Model", text: "Bents, bays and modules modelled with interface positions from piping and electrical." },
      { title: "Checks", text: "Elevations, support positions and connections checked against the design and interfaces." },
      { title: "Drawings", text: "Bent, erection and shop drawings issued with MTO and bolt lists." },
      { title: "Revisions", text: "Support relocations and late piping changes tracked through every affected drawing." },
    ],
    experience: {
      intro: "Pipe rack and pipe bridge experience from our senior team's prior roles.",
      projectIds: ["onshore-civil-structural", "rcc-detailing", "steel-detailing"],
    },
    faqs: [
      {
        id: "rack-modular",
        q: "Do you detail modular pipe racks?",
        a: "Yes. We phase the model by module, add the lifting and transport steel your engineer specifies and keep the module interfaces visible on the erection drawings, so modules can be fabricated, shipped and set as units.",
      },
      {
        id: "rack-interfaces",
        q: "How do you handle piping and electrical interfaces?",
        a: "We work from the approved support and loading information and, where available, the piping and electrical models. Clashes and missing support details are raised as queries; we do not move supports or change loads without the engineer's approval.",
      },
      {
        id: "rack-mto",
        q: "Can you provide a material take-off for the rack?",
        a: "Yes. Every rack package includes a material take-off and bolt lists generated from the model and reconciled against the issued drawings.",
      },
      quoteFaq("rack"),
      pilotFaq("rack"),
    ],
    related: {
      services: ["steel-detailing-fabrication", "plant-structural-3d-modelling", "material-takeoffs-documentation"],
      guides: ["structural-steel-material-take-off-guide", "tekla-model-deliverables-guide", "steel-drawing-types-explained"],
      pages: ["steel-detailing-uae", "steel-detailing-saudi-arabia", "steel-detailing-usa"],
    },
    form: { countryPage: "", defaultCountry: "", defaultService: "steel-detailing-fabrication" },
    schema: { serviceType: "Pipe rack detailing", areaServed: ["AE", "SA", "QA", "KW", "OM", "US", "GB"] },
  },
  {
    slug: "tekla-detailing-outsourcing",
    kind: "specialism",
    nav: { label: "Tekla Detailing Outsourcing", text: "Overflow modelling and drawings for detailing firms" },
    seo: {
      title: "Tekla Detailing Outsourcing",
      description:
        "Outsource Tekla detailing to a senior team: models built to your numbering and templates, drawings, reports and IFC/DSTV handover with revision control.",
      keyword: "Tekla detailing outsourcing",
    },
    hero: {
      eyebrow: "Specialist detailing",
      title: "Tekla Detailing",
      accent: "Outsourcing",
      intro:
        "An overflow Tekla team for fabricators and detailing firms: models built to your numbering, templates and phasing, with drawings, reports and a clean handover you can take straight back into your workflow.",
      image: "/images/tekla-model.jpg",
      imageAlt: "Bolted structural steel connection where four members meet",
    },
    overview: {
      heading: "Your Model, Your Standards, More Capacity",
      paragraphs: [
        "Most detailing backlogs are not about skill but about hours. PetroHill works as an overflow partner for fabricators and detailing firms that run Tekla Structures: we take a defined part of the model, or a defined set of drawings, and return it built to your conventions so it merges cleanly with the rest of the job.",
        "That means working to your numbering series, drawing templates, report formats, phase and lot structure and the version of Tekla you run. Before we start we agree how the model will be exchanged, whether as a native model, a shared model, or IFC reference files, and who owns which parts of it, so two teams never edit the same members.",
        "Our senior team has used Tekla Structures for detailed structural work on refinery and oil and gas projects, alongside AutoCAD, MicroStation and Navisworks, and earlier plant-design environments such as PDS and FrameWorks Plus. The common thread is disciplined model management: consistent marks, controlled revisions and reports that reconcile with the drawings.",
        "Handover is part of the scope, not an afterthought. You receive the model, drawings, reports and machine files agreed for the package, with a revision register that shows what changed and why.",
      ],
    },
    glance: [
      `Quote reply ${offer.quoteResponse}`,
      "Works to your templates and numbering",
      `Pilot: ${offer.pilot.summary}`,
      offer.nda,
      `Formats: ${formats}`,
    ],
    scope: [
      {
        heading: "What we take on",
        items: [
          "Modelling of defined areas, phases or lots",
          "Drawing production from your model",
          "Connection modelling to approved details",
          "Model clean-up and numbering reconciliation",
          "Revision incorporation on issued packages",
          "Report and MTO generation to your formats",
        ],
      },
      {
        heading: "Handover",
        items: [
          "Native Tekla model or model merge files",
          "IFC exports for coordination",
          "NC / DSTV files where contracted",
          "GA, erection, assembly and part drawings (PDF and DWG)",
          "Bolt, part and assembly reports",
          "Revision register and query log",
        ],
      },
    ],
    standards: {
      refs: ["client-project", "aisc-303", "eurocodes", "iso-19650"],
      note: "We follow your company detailing standard and the project specification; where they differ from the general codes we ask, rather than choose. Native model exchange depends on software versions and licensing, confirmed before work starts.",
    },
    timezone: "us",
    process: [
      { title: "Set-up", text: "Agree Tekla version, templates, numbering series, phases and exchange method." },
      { title: "Model", text: "Model the agreed areas to your conventions and ownership boundaries." },
      { title: "Checks", text: "Numbering, clashes, reports and drawings checked before handover." },
      { title: "Drawings", text: "Drawings and reports produced on your templates." },
      { title: "Handover", text: "Model, drawings, files and revision register returned for merge." },
    ],
    experience: {
      intro: "Tekla and plant-modelling experience from our senior team's prior roles.",
      projectIds: ["steel-detailing", "plant-3d-modelling", "offshore-structural"],
    },
    faqs: [
      {
        id: "tekla-version",
        q: "Which Tekla versions can you work in?",
        a: "We confirm your Tekla Structures version and environment before work starts, and work in the version needed for a clean merge. Native model exchange depends on version compatibility and licensing.",
      },
      {
        id: "tekla-standards",
        q: "Can you use our numbering and drawing templates?",
        a: "Yes. Working to your numbering series, templates, report formats and phasing is the core of the service, so the package merges with your model without rework.",
      },
      {
        id: "tekla-handover",
        q: "What do we receive at handover?",
        a: `The model or merge files, drawings, reports and the exchange formats agreed for the package (typically ${formats}), with a revision register and the query log.`,
      },
      quoteFaq("tekla"),
      pilotFaq("tekla"),
    ],
    related: {
      services: ["steel-detailing-fabrication", "plant-structural-3d-modelling"],
      guides: ["tekla-model-deliverables-guide", "outsourcing-structural-steel-detailing-guide", "structural-design-vs-detailing-responsibilities"],
      pages: ["steel-detailing-usa", "pipe-rack-detailing", "offshore-structural-detailing"],
    },
    form: { countryPage: "", defaultCountry: "", defaultService: "steel-detailing-fabrication" },
    schema: { serviceType: "Tekla detailing outsourcing", areaServed: ["AE", "SA", "QA", "KW", "OM", "US", "GB"] },
  },
  {
    slug: "offshore-structural-detailing",
    kind: "specialism",
    nav: { label: "Offshore Structural Detailing", text: "Topsides, jackets, secondary steel and modifications" },
    seo: {
      title: "Offshore Structural Detailing",
      description:
        "Offshore structural detailing for topsides, jackets and secondary steel, plus brownfield modifications, from a team with Umm Lulu project experience.",
      keyword: "offshore structural detailing",
    },
    hero: {
      eyebrow: "Specialist detailing",
      title: "Offshore Structural",
      accent: "Detailing",
      intro:
        "Shop and detail drawings for offshore topsides, jacket secondary steel and brownfield modifications, from a senior team whose prior roles include structural detailing on the Umm Lulu full development.",
      image: "/images/offshore-platform.jpg",
      imageAlt: "Offshore platform topsides and steelwork lit at night",
    },
    overview: {
      heading: "Detailing for Offshore Fabrication Yards",
      paragraphs: [
        "Offshore steel is detailed for a fabrication yard and installed by a marine spread, which changes what a good drawing looks like. Plate girders, tubular joints, lifting points, sea-fastening and weight control all need to be visible and consistent, and every piece must fit first time because there is no workshop on the platform.",
        "PetroHill produces detailed and shop drawings for offshore topsides, jacket appurtenances and secondary steel, and modification packages for operating platforms. Our senior team's experience includes structural detailing for offshore steelwork on the Umm Lulu full development in a prior role, producing detailed drawings and shop drawings.",
        "Typical scopes are secondary and tertiary steel such as walkways, stairs, handrails, cable tray and pipe supports, and equipment and instrument supports, together with modification steel that has to be tied into existing members surveyed in the field. Primary structural design and analysis remain with the responsible offshore engineer.",
        "We keep weight and centre-of-gravity information traceable through the model, raise interface questions early with mechanical, piping and electrical teams, and track every revision to closure.",
      ],
    },
    glance: [
      `Quote reply ${offer.quoteResponse}`,
      "Topsides, jackets and modifications",
      `Pilot: ${offer.pilot.summary}`,
      offer.nda,
      `Formats: ${formats}`,
    ],
    scope: [
      {
        heading: "Offshore scope",
        items: [
          "Topsides secondary and tertiary steel",
          "Jacket appurtenances: boat landings, risers and caisson supports, walkways",
          "Equipment and instrument support steel",
          "Stairs, ladders, walkways and handrails",
          "Brownfield modification and tie-in steel",
          "Lifting and sea-fastening steel to the engineer's design",
        ],
      },
      {
        heading: "Deliverables",
        items: [
          "Tekla model or detailed drawings to the project system",
          "Yard fabrication and assembly drawings",
          "Single-part and plate drawings",
          "Weight and material reports",
          "Modification drawings: existing, removal and new",
          "Revision registers and query logs",
        ],
      },
    ],
    standards: {
      refs: ["client-project", "iso-19902", "iso-19901-3", "aisc-360", "aws-d11"],
      note: "Offshore projects are governed by the operator's specifications and the design basis your engineer has specified, such as ISO 19902 for fixed steel structures and ISO 19901-3 for topsides structure. We detail to them as supplied; design, analysis and certification stay with the responsible parties.",
    },
    timezone: "gcc",
    process: [
      { title: "Inputs", text: "Design drawings, weight control requirements, survey data and interface information." },
      { title: "Model", text: "Structure modelled with yard assembly, lifting and weight tracking in mind." },
      { title: "Checks", text: "Fit-up, interfaces and weights checked against the design and survey." },
      { title: "Drawings", text: "Yard fabrication, assembly and modification drawings issued per transmittal." },
      { title: "Revisions", text: "Field queries and design changes tracked through every affected drawing." },
    ],
    experience: {
      intro: "Offshore and brownfield experience from our senior team's prior roles.",
      projectIds: ["offshore-structural", "brownfield-modifications", "drawings-qaqc"],
    },
    faqs: [
      {
        id: "offshore-design",
        q: "Do you do offshore structural design or analysis?",
        a: "No. We detail from the approved design. Structural analysis, in-place, lift and transport checks and certification remain with the responsible offshore engineer and the certifying authority.",
      },
      {
        id: "offshore-brownfield",
        q: "Can you detail modifications to an operating platform?",
        a: "Yes, from verified survey data and the approved modification design. We produce existing, removal and new-work drawings and raise any conflict between the survey and the existing records as a query.",
      },
      {
        id: "offshore-weight",
        q: "How do you support weight control?",
        a: "Weights and centres of gravity are reported from the model at each issue so they can be fed into the project's weight control system, and changes between revisions are visible.",
      },
      quoteFaq("offshore"),
      pilotFaq("offshore"),
    ],
    related: {
      services: ["steel-detailing-fabrication", "brownfield-structural-modifications", "plant-structural-3d-modelling"],
      guides: ["brownfield-structural-modification-drawings", "structural-design-vs-detailing-responsibilities", "steel-drawing-types-explained"],
      pages: ["steel-detailing-uae", "pipe-rack-detailing", "tekla-detailing-outsourcing"],
    },
    form: { countryPage: "", defaultCountry: "", defaultService: "steel-detailing-fabrication" },
    schema: { serviceType: "Offshore structural detailing", areaServed: ["AE", "SA", "QA", "KW", "OM", "US", "GB"] },
  },
];

export const landingBySlug = (slug: LandingSlug) => landingPages.find((page) => page.slug === slug)!;
export const marketPages = landingPages.filter((page) => page.kind === "market");
export const specialistPages = landingPages.filter((page) => page.kind === "specialism");

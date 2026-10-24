/**
 * Canonical service catalogue (S01–S06): the publishing source of truth.
 *
 * Rules (see Hormuz_Energy_Copilot_Website_Restructure_Spec.md, sections 3–4):
 * - Every marketed deliverable has one primary service. Other pages may
 *   reference it, never re-sell it as a separate service line.
 * - Onshore / offshore are industries (src/lib/industries.ts), not services.
 * - Engineering Outsourcing is an engagement route, not a seventh service.
 * - Production checking lives on the Quality & Delivery page; independent
 *   design verification is not offered as a core service.
 * - Subservice order is explicit and must be preserved.
 */
export type ServiceSlug =
  | "civil-structural-drafting"
  | "plant-structural-3d-modelling"
  | "steel-detailing-fabrication"
  | "rcc-reinforcement-detailing"
  | "brownfield-structural-modifications"
  | "material-takeoffs-documentation";

export type ServiceId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06";

export type ServiceGroupId = "drawings-models" | "detailing" | "modifications-docs";

/** Capability tier (spec 1.3). Every listed service is currently "confirmed"; TODO_VERIFY with the owner. */
export type CapabilityStatus = "confirmed" | "extended" | "on-request";

export type Subservice = { id: string; title: string; description: string };
export type SubserviceGroup = { heading?: string; items: Subservice[] };

export type Service = {
  id: ServiceId;
  slug: ServiceSlug;
  status: CapabilityStatus;
  group: ServiceGroupId;
  /** Card headline and menu label. */
  title: string;
  /** One-line description for the navigation menu. */
  menuText: string;
  /** H1, split so the second part carries the accent colour. */
  heading: [string, string];
  image: string;
  imageAlt: string;
  /** Card teaser. */
  summary: string;
  intro: string[];
  /** 3–5 items for overview listings. */
  highlights: string[];
  /** What the deliverable is, for the "At a glance" panel. */
  deliverableType: string;
  subserviceGroups: SubserviceGroup[];
  inputs: string[];
  outputs: string[];
  applications: string[];
  tags: string[];
  standardsRefs: string[];
  standardsNote: string;
  software: { tools: string[]; note: string };
  /** Page-specific technical sequence. */
  workflow: { title: string; text: string }[];
  /** Responsibility boundaries: what is not included by implication. */
  boundaries: string[];
  /** How this service relates to neighbouring services. */
  boundaryNote: string;
  faqs: { q: string; a: string }[];
  /** Project shown first as evidence (keeps the anchor each service used before the restructure). */
  leadProject: string;
  /** 2–4 closely related next steps. */
  related: { href: string; label: string; text: string }[];
  seo: { title: string; description: string; keywords: string[] };
};

export const serviceGroups: { id: ServiceGroupId; title: string; text: string }[] = [
  {
    id: "drawings-models",
    title: "Engineering Drawings & Models",
    text: "Arrangement drawings and 3D structural models developed from approved engineering information.",
  },
  {
    id: "detailing",
    title: "Fabrication & Construction Detailing",
    text: "Steel shop, assembly and erection information, and reinforcement detailing with bar bending schedules.",
  },
  {
    id: "modifications-docs",
    title: "Modifications & Documentation",
    text: "Packages for existing plant, and the quantities, registers and controlled issue that support every package.",
  },
];

export const services: Service[] = [
  /* ------------------------------------------------------------------ S01 */
  {
    id: "S01",
    leadProject: "onshore-civil-structural",
    slug: "civil-structural-drafting",
    status: "confirmed",
    group: "drawings-models",
    title: "Civil & Structural Engineering Drafting",
    menuText: "GA, plans, sections and foundation layouts",
    heading: ["Civil & Structural", "CAD Drafting Services"],
    image: "/images/drawings-qaqc.jpg",
    imageAlt: "Engineering drawings on a desk with drafting pencils and a scale rule",
    summary:
      "General arrangements, framing layouts, structural plans, foundations, sections and coordinated drawing revisions based on approved engineering inputs.",
    intro: [
      "Engineering drawings are the record every other discipline works from. We prepare and update 2D civil and structural arrangement documentation from approved design information: general arrangements, framing plans, elevations, sections and foundation layouts.",
      "This service covers engineering arrangement drawings. Fabrication and erection shop drawings belong to Structural Steel Detailing, and reinforcement detailing with bar bending schedules to RCC & Reinforcement Detailing, so each deliverable has one clear home.",
    ],
    highlights: [
      "General arrangement and layout drawings",
      "Plans, elevations and sections",
      "Foundation and equipment-base arrangements",
      "Interface and coordination drawings",
      "Drawing revisions and redrafting",
    ],
    deliverableType: "2D engineering arrangement drawings",
    subserviceGroups: [
      {
        items: [
          {
            id: "S01.1",
            title: "Drawing setup, grids and reference levels",
            description: "Coordinate systems, grid references, levels, drawing templates and the project's drafting conventions.",
          },
          {
            id: "S01.2",
            title: "General arrangement and layout drawings",
            description: "Structural GA drawings positioning primary systems, framing and support arrangements.",
          },
          {
            id: "S01.3",
            title: "Structural plans, elevations and sections",
            description: "Framing plans, elevations, longitudinal and transverse sections with member references.",
          },
          {
            id: "S01.4",
            title: "Civil and foundation arrangement drawings",
            description: "Foundations, equipment bases, pedestals, substation bases and setting-out details.",
          },
          {
            id: "S01.5",
            title: "Steel and concrete arrangement documentation",
            description: "Steel framing arrangements and RCC structural arrangements. Shop and rebar fabrication output sits in S03 and S04.",
          },
          {
            id: "S01.6",
            title: "Structural interfaces and coordination documentation",
            description: "Equipment, piping, cable tray and vendor interface information shown on structural drawings, where provided.",
          },
          {
            id: "S01.7",
            title: "CAD drawing revisions and reconstruction",
            description: "Redline incorporation, issued-drawing updates and redrafting from suitable, verified source documents.",
          },
        ],
      },
    ],
    inputs: [
      "Issued-for-design or approved drawings and sketches",
      "Approved calculations or design summaries, where relevant",
      "Grids, levels and setting-out information",
      "Project specifications and drawing conventions",
      "Equipment and vendor information",
      "Reference models and client title blocks",
      "Current revisions and revision instructions",
    ],
    outputs: [
      "Civil and structural GA drawings",
      "Plans, elevations and sections",
      "Foundation and equipment-base layouts",
      "Detail views as scoped",
      "Native CAD files in the agreed format (for example DWG or DGN)",
      "PDF sets",
      "Drawing list with revision status",
    ],
    applications: [
      "Plant buildings",
      "Pipe racks",
      "Pipe bridges",
      "Support frames",
      "Platforms",
      "Equipment foundations",
      "Substation bases",
      "Industrial civil and steel structures",
    ],
    tags: ["Greenfield", "Brownfield", "Steel", "RCC"],
    standardsRefs: ["client-project", "aisc-360", "aci-318", "eurocodes"],
    standardsNote:
      "Drawings follow the client's design basis, drawing conventions and title blocks. Design codes referenced on drawings are those specified by the responsible designer.",
    software: {
      tools: ["AutoCAD", "MicroStation"],
      note: "Platform, version and file format are confirmed during scope review.",
    },
    workflow: [
      { title: "Inputs and drawing basis", text: "Design inputs, standards and conventions confirmed; queries raised early." },
      { title: "Grids and general arrangement", text: "Grids, levels and the GA established as the reference for all sheets." },
      { title: "Plans, elevations and sections", text: "Framing and arrangement views developed with member references." },
      { title: "Interface coordination", text: "Equipment, piping and electrical interfaces shown from the information provided." },
      { title: "Checks and revisions", text: "Production checks against inputs; client comments incorporated." },
      { title: "Controlled issue", text: "Native and PDF files issued with the drawing list and revision status." },
    ],
    boundaries: [
      "Structural member sizing and design calculations",
      "Geotechnical and foundation design",
      "Construction approvals or an engineer's stamp",
      "Independent design verification",
    ],
    boundaryNote:
      "Rebar detailing and BBS are provided under RCC & Reinforcement Detailing, fabrication and erection shop drawings under Structural Steel Detailing, and standalone quantities under MTO & Engineering Documentation.",
    faqs: [
      {
        q: "Do you design the structures you draw?",
        a: "No. We provide drafting and design support. Design responsibility stays with your responsible engineer; we develop arrangement drawings from the approved design information you issue.",
      },
      {
        q: "Can you redraft existing drawings from PDFs or scans?",
        a: "Yes, where the source is legible and its status is confirmed. Redrafted drawings are checked against the source and issued with its revision reference.",
      },
      {
        q: "Can you work to our CAD standards?",
        a: "Drawings follow your title blocks, layers and numbering. The platform and version are confirmed during scope review.",
      },
    ],
    related: [
      { href: "/services/plant-structural-3d-modelling", label: "3D Structural & Plant Modelling", text: "When the arrangement needs a coordinated model." },
      { href: "/services/steel-detailing-fabrication", label: "Structural Steel Detailing", text: "Shop and erection drawings from the approved arrangement." },
      { href: "/services/rcc-reinforcement-detailing", label: "RCC & Reinforcement Detailing", text: "Rebar detailing and BBS for foundations and concrete." },
      { href: "/services/brownfield-structural-modifications", label: "Brownfield Modifications", text: "Drawing updates for existing plant." },
    ],
    seo: {
      title: "Civil & Structural CAD Drafting Services",
      description:
        "Civil and structural CAD drafting for industrial projects: GA plans, framing layouts, foundations, sections, revisions and agreed native/PDF deliverables.",
      keywords: [
        "structural CAD drafting",
        "GA drawings",
        "structural drawings",
        "foundation layout drawings",
        "industrial structural drafting",
      ],
    },
  },

  /* ------------------------------------------------------------------ S02 */
  {
    id: "S02",
    leadProject: "plant-3d-modelling",
    slug: "plant-structural-3d-modelling",
    status: "confirmed",
    group: "drawings-models",
    title: "3D Structural Modelling & Plant Model Support",
    menuText: "TEKLA and plant models, updates and exchanges",
    heading: ["TEKLA Structures &", "3D Structural Modelling"],
    image: "/images/plant-model.jpg",
    imageAlt: "Tall steel process structure with platforms and piping against a blue sky",
    summary:
      "TEKLA Structures modelling, plant structural modelling workflows, model updates, geometric coordination and agreed model exchanges.",
    intro: [
      "On energy projects the structural model is one discipline inside a shared plant model. Structures have to be modelled to the project's conventions and kept current as other disciplines move.",
      "A modelling assignment delivers the model and the agreed reports and exchanges. Fabrication and erection drawings are a separate scope under Structural Steel Detailing; where both are needed, the model is delivered as part of that package rather than sold twice.",
    ],
    highlights: [
      "TEKLA structural steel models",
      "Plant structural modelling environments",
      "Existing-model updates",
      "Geometric coordination and clash review",
      "Agreed model exchanges",
    ],
    deliverableType: "3D structural and plant models with agreed exchanges",
    subserviceGroups: [
      {
        heading: "TEKLA structural modelling",
        items: [
          {
            id: "S02.1",
            title: "Model setup and reference definition",
            description: "Units, coordinates, grids, levels, software version, reference inputs and naming rules.",
          },
          {
            id: "S02.2",
            title: "TEKLA structural steel model development",
            description: "Beams, columns, bracing, plates, industrial platforms, pipe rack members and equipment supports.",
          },
          {
            id: "S02.3",
            title: "Approved component and connection modelling",
            description: "Plates, bolts, stiffeners and engineer-specified connection components to the agreed level of detail.",
          },
        ],
      },
      {
        heading: "Plant structural and legacy environments",
        items: [
          {
            id: "S02.4",
            title: "Plant structural environment modelling",
            description: "PDS, FrameWorks Plus or compatible environments, where access, licences and file interoperability are confirmed for the project.",
          },
          {
            id: "S02.5",
            title: "Existing-model revision and conversion assessment",
            description: "Updates to existing models and model data; conversions assessed and carried out only where practical.",
          },
        ],
      },
      {
        heading: "Coordination, changes and exchange",
        items: [
          {
            id: "S02.6",
            title: "Coordination and geometric review",
            description: "Model checking, interface review and clash identification. This is geometric coordination, not structural design verification.",
          },
          {
            id: "S02.7",
            title: "Model-derived outputs and exchanges",
            description: "Views, GA drawings where scoped, material reports, native files and IFC or other exchange formats where supported.",
          },
        ],
      },
    ],
    inputs: [
      "Approved design information",
      "Discipline reference models",
      "Model origin and coordinate system",
      "Software and version requirements",
      "Agreed level of detail and information",
      "Connection data, where components are modelled",
      "Client modelling rules and naming conventions",
    ],
    outputs: [
      "Native 3D structural or plant models",
      "Compatible exchange formats, as agreed",
      "Geometric coordination views and comments",
      "Agreed model reports and quantities",
      "Drawings only where included in the scope",
    ],
    applications: [
      "Pipe racks and pipe bridges",
      "Process and access platforms",
      "Equipment support structures",
      "Concrete and steel plant buildings",
      "Underground facilities",
      "Existing plant models",
    ],
    tags: ["TEKLA", "Legacy Plant Model", "Greenfield", "Brownfield"],
    standardsRefs: ["client-project", "iso-19650"],
    standardsNote:
      "Models follow the client's modelling rules, naming and level of detail. ISO 19650 information management is followed where the project adopts it.",
    software: {
      tools: ["Tekla Structures", "PDS", "Frameworks Plus", "MicroStation", "PDMS", "Navisworks"],
      note: "Plant environments listed here come from senior personnel's prior project experience. Access, licence and version for a new package are confirmed during scope review.",
    },
    workflow: [
      { title: "Model basis", text: "Origin, grids, version, naming and level of detail agreed." },
      { title: "Model geometry", text: "Primary and secondary members modelled from approved inputs." },
      { title: "Specified components", text: "Plates, bolts and connection components as defined by the engineer." },
      { title: "Interfaces and coordination", text: "Geometry reviewed against other disciplines; clashes raised." },
      { title: "Updates", text: "Design changes incorporated and tracked against revisions." },
      { title: "Exchanges and reports", text: "Native models, exchange files and agreed reports issued." },
    ],
    boundaries: [
      "Multidisciplinary plant, process or piping design",
      "Structural analysis or design adequacy of the modelled structure",
      "Code compliance demonstrated by a model or rendering",
      "Independent structural design verification",
    ],
    boundaryNote:
      "PDS or PDMS experience does not imply full plant design services. Fabrication drawings extracted from a model are scoped under Structural Steel Detailing.",
    faqs: [
      {
        q: "Is this architectural BIM?",
        a: "No. This is structural modelling for energy and process facilities, coordinated with piping, equipment and electrical disciplines.",
      },
      {
        q: "Can we buy only the model, without drawings?",
        a: "Yes. A modelling assignment delivers the model and the agreed exchanges and reports. Drawings are added only if they are in the scope.",
      },
      {
        q: "Which modelling environments has the team worked in?",
        a: "Tekla Structures, PDS with Frameworks Plus and MicroStation, with exposure to PDMS, and Navisworks for review. Availability of a specific environment and version is confirmed for each package.",
      },
    ],
    related: [
      { href: "/services/steel-detailing-fabrication", label: "Structural Steel Detailing", text: "Shop, assembly and erection drawings from the model." },
      { href: "/services/brownfield-structural-modifications", label: "Brownfield Modifications", text: "Existing-model updates for modification packages." },
      { href: "/services/material-takeoffs-documentation", label: "MTO & Engineering Documentation", text: "Model-based quantities and schedules." },
      { href: "/capabilities#formats", label: "Software & file formats", text: "How platforms and versions are agreed." },
    ],
    seo: {
      title: "TEKLA Structures & 3D Structural Modelling Services",
      description:
        "TEKLA Structures and structural 3D modelling support, model updates, geometric coordination and agreed digital outputs for energy and industrial projects.",
      keywords: [
        "Tekla structural modelling",
        "plant structural modelling",
        "PDS structural modelling",
        "3D steel model",
        "industrial plant modelling",
      ],
    },
  },

  /* ------------------------------------------------------------------ S03 */
  {
    id: "S03",
    leadProject: "steel-detailing",
    slug: "steel-detailing-fabrication",
    status: "confirmed",
    group: "detailing",
    title: "Structural Steel Detailing & Fabrication Documentation",
    menuText: "Shop, assembly and erection drawings",
    heading: ["Structural Steel Detailing &", "Shop Drawing Services"],
    image: "/images/tekla-model.jpg",
    imageAlt: "Bolted structural steel connection where four members meet",
    summary:
      "Shop and assembly drawings, single-part details, erection documentation, specified connections and material schedules for steel structures.",
    intro: [
      "Structural steel detailing sits between the engineer's design and the fabricator's workshop. The model and drawings decide whether steel arrives on site and fits.",
      "We develop fabrication, assembly and erection information from an approved structural and connection design basis. Arrangement drawings, shop drawings and lists are extracted from one detailing model so they stay consistent through revisions.",
    ],
    highlights: [
      "Detailing model and member arrangement",
      "Assembly and shop drawings",
      "Single-part drawings",
      "Erection drawings",
      "BOM, bolt and part lists",
    ],
    deliverableType: "Fabrication and erection documentation package",
    subserviceGroups: [
      {
        items: [
          {
            id: "S03.1",
            title: "Detailing model and steel member arrangement",
            description: "Detailed steel geometry built from the reference design, with member identification and numbering.",
          },
          {
            id: "S03.2",
            title: "Structural connection detailing",
            description: "Approved bolt and weld layouts, base plates, end plates, gussets, splices, stiffeners and anchors from the engineer's connection design.",
          },
          {
            id: "S03.3",
            title: "Assembly and shop fabrication drawings",
            description: "Assembly geometry, hole locations, cuts, weld symbols where defined, fabrication marks and dimensions.",
          },
          {
            id: "S03.4",
            title: "Single-part and component drawings",
            description: "Individual members and plates with marking and fabrication dimensions.",
          },
          {
            id: "S03.5",
            title: "Erection and installation drawings",
            description: "Erection plans, member positions, field connections, marks and documented interfaces.",
          },
          {
            id: "S03.6",
            title: "Fabrication schedules and digital outputs",
            description: "BOM / MTO, bolt lists, cut and part lists, and NC / DSTV files where supported and contracted.",
          },
          {
            id: "S03.7",
            title: "Fabrication revisions and coordinated issue",
            description: "Production changes, model-to-drawing reconciliation, review comments and revised packages.",
          },
        ],
      },
    ],
    inputs: [
      "Approved structural GA and design drawings",
      "Approved connection design information from the engineer",
      "Material grades and steel specifications",
      "Welding and bolting requirements",
      "Fabrication and erection specifications",
      "Applicable codes and editions",
      "Fabricator shop standards and release status",
    ],
    outputs: [
      "Detailing model, where included",
      "Assembly and shop drawings",
      "Single-part drawings",
      "Erection arrangement drawings",
      "Bolt, part and material lists",
      "PDF and native drawing files",
      "Agreed machine files (NC / DSTV)",
    ],
    applications: [
      "Steel pipe racks and pipe bridges",
      "Process and access platforms",
      "Stairs, ladders and handrails",
      "Equipment support structures",
      "Industrial sheds and steel buildings",
      "Offshore access and secondary steel, where suitable",
    ],
    tags: ["Steel", "TEKLA", "Greenfield", "Brownfield"],
    standardsRefs: ["aisc-303", "aisc-360", "aws-d11", "rcsc", "client-project"],
    standardsNote:
      "Detailing follows the project-specified steel, welding and bolting standards and the approved connection design. The scope of work records the applicable editions.",
    software: {
      tools: ["Tekla Structures", "AutoCAD", "Navisworks"],
      note: "Tekla Structures is the primary detailing platform. Version and machine-file formats are confirmed during scope review.",
    },
    workflow: [
      { title: "Approved design inputs", text: "Structural GA, connection design and specifications confirmed." },
      { title: "Detailing model", text: "Members modelled and numbered from the reference design." },
      { title: "Connection details", text: "Approved bolt and weld details added to the model." },
      { title: "Assembly and part drawings", text: "Shop and single-part drawings extracted from the model." },
      { title: "Erection drawings", text: "Member positions, marks and field connections shown for site." },
      { title: "Lists and digital outputs", text: "BOM, bolt and part lists and agreed machine files issued." },
      { title: "Checks and revisions", text: "Model and drawings reconciled; comments closed out and re-issued." },
    ],
    boundaries: [
      "Connection engineering design and calculations",
      "Fabrication, welding or erection works",
      "Lifting design and temporary works",
      "Construction supervision",
      "Independent certification",
    ],
    boundaryNote:
      "Connections are detailed from the engineer's connection design. A standalone model without drawings is scoped under 3D Structural & Plant Modelling.",
    faqs: [
      {
        q: "Do you design connections?",
        a: "No. Connections are detailed from the connection design information provided by the responsible engineer. We do not undertake connection design calculations.",
      },
      {
        q: "What does the fabricator receive?",
        a: "Assembly and single-part shop drawings, erection drawings, bolt, part and material lists, and NC / DSTV files where supported and agreed, all extracted from one model.",
      },
      {
        q: "Can you work from our existing Tekla model?",
        a: "Yes. A client-supplied model can be the input to the drawing package; its version and status are confirmed during scope review.",
      },
    ],
    related: [
      { href: "/services/plant-structural-3d-modelling", label: "TEKLA & 3D Modelling", text: "Model-only assignments and coordination." },
      { href: "/services/material-takeoffs-documentation", label: "MTO & Engineering Documentation", text: "Standalone steel MTO and schedules." },
      { href: "/capabilities/codes-standards", label: "Codes & Standards", text: "How AISC, AWS and RCSC references are applied." },
      { href: "/project-experience#steel-detailing", label: "Steel detailing experience", text: "Prior professional project experience." },
    ],
    seo: {
      title: "Structural Steel Detailing & Fabrication Drawing Services",
      description:
        "Structural steel detailing for pipe racks, platforms and industrial steelwork, including assembly, part, shop and erection drawings and material schedules.",
      keywords: [
        "structural steel detailing services",
        "steel detailing outsourcing",
        "Tekla detailing services",
        "steel shop drawings",
        "fabrication drawings",
        "erection drawings",
        "industrial steel detailing",
        "oil and gas steel detailing",
      ],
    },
  },

  /* ------------------------------------------------------------------ S04 */
  {
    id: "S04",
    leadProject: "rcc-detailing",
    slug: "rcc-reinforcement-detailing",
    status: "confirmed",
    group: "detailing",
    title: "Reinforced Concrete & Rebar Detailing",
    menuText: "RCC details, rebar drawings and BBS",
    heading: ["Reinforced Concrete, Rebar", "Detailing & BBS Services"],
    image: "/images/rcc-detailing.jpg",
    imageAlt: "Reinforcement cages being fixed for a concrete structure",
    summary:
      "Concrete structure drawings, equipment foundations, rebar placing details, reinforcement schedules and bar bending schedules.",
    intro: [
      "Concrete work on energy projects is governed by what it supports: steel columns, equipment, pipe racks and buildings. Reinforcement detailing has to carry those requirements into bars that can be fixed on site without clashes.",
      "We produce concrete construction drawings, reinforcement placing information and bar bending schedules from the approved concrete design. Where the drawings support it, pedestals and embedded items are coordinated with the steelwork they carry.",
    ],
    highlights: [
      "Foundation and equipment-base details",
      "Concrete member drawings",
      "Reinforcement placing drawings",
      "Bar bending schedules",
      "Concrete and rebar quantities",
    ],
    deliverableType: "RCC drawings, rebar details and BBS",
    subserviceGroups: [
      {
        items: [
          {
            id: "S04.1",
            title: "Review of approved concrete GA and design inputs",
            description: "Geometry, levels, cover criteria and reinforcement design information confirmed before detailing.",
          },
          {
            id: "S04.2",
            title: "Foundation and equipment-base concrete details",
            description: "Footings, plinths, pedestals, slabs, bases and embedded items.",
          },
          {
            id: "S04.3",
            title: "Structural concrete member drawings",
            description: "Beams, columns, slabs, walls and other concrete members.",
          },
          {
            id: "S04.4",
            title: "Reinforcement placing and rebar details",
            description: "Bars, marks, laps, anchorage, spacing and shapes, detailed only from approved engineering requirements.",
          },
          {
            id: "S04.5",
            title: "Bar bending schedules",
            description: "Bar marks, shapes, bending dimensions, lengths and quantities to the specified scheduling standard.",
          },
          {
            id: "S04.6",
            title: "Rebar and concrete quantities",
            description: "Take-offs with source-revision references and stated quantity assumptions.",
          },
          {
            id: "S04.7",
            title: "Revisions, reconciliation and issue",
            description: "Drawings, BBS and quantities updated together in response to approved revisions.",
          },
        ],
      },
    ],
    inputs: [
      "Approved structural design and concrete GA",
      "Reinforcement design schedules or instructions",
      "Concrete grades and cover requirements",
      "Base plate, anchor bolt and embedment details",
      "Equipment and vendor foundation data",
      "Bar scheduling rules",
      "Current drawing register",
    ],
    outputs: [
      "RCC arrangement and detail drawings",
      "Foundation details",
      "Reinforcement placing drawings",
      "Bar bending schedules",
      "Concrete and rebar quantity schedules",
      "PDF and native files",
    ],
    applications: [
      "Concrete structural buildings",
      "RCC industrial structures",
      "Pipe rack foundations and pedestals",
      "Equipment bases and plinths",
      "Substation bases",
    ],
    tags: ["RCC", "Greenfield", "Brownfield"],
    standardsRefs: ["aci-318", "aci-315", "bs-8666", "eurocodes", "client-project"],
    standardsNote:
      "Reinforcement is detailed and scheduled to the concrete and bar-scheduling standards specified for the project, for example ACI or BS practice.",
    software: {
      tools: ["AutoCAD"],
      note: "RCC drawings and schedules are produced to the project's CAD standards; the platform and version are confirmed during scope review.",
    },
    workflow: [
      { title: "Approved concrete geometry", text: "Concrete GA, levels, cover and design requirements confirmed." },
      { title: "Element details", text: "Foundations, bases and members drawn with their embedded items." },
      { title: "Reinforcement placing", text: "Bars, marks, laps and spacing detailed from the approved design." },
      { title: "BBS and quantities", text: "Schedules and quantities prepared from the reinforcement drawings." },
      { title: "Check, review and issue", text: "Drawings and BBS checked bar for bar, then issued together." },
    ],
    boundaries: [
      "Structural and foundation design",
      "Reinforcement design decisions",
      "Soil and geotechnical design",
      "Design approvals",
    ],
    boundaryNote:
      "Arrangement drawings without reinforcement sit under Civil & Structural CAD Drafting; separately purchased quantity reconciliation under MTO & Engineering Documentation.",
    faqs: [
      {
        q: "Do you prepare bar bending schedules?",
        a: "Yes. Bar bending schedules are prepared from the reinforcement drawings and checked to match them bar for bar.",
      },
      {
        q: "Do you coordinate concrete with the steelwork it supports?",
        a: "Where the drawings support it, pedestals, bases and embedded items are coordinated with the supported steelwork so both packages describe the same interface.",
      },
      {
        q: "Which bar-scheduling standard do you follow?",
        a: "The one specified for the project, for example BS 8666 or ACI practice. The edition is recorded in the scope of work.",
      },
    ],
    related: [
      { href: "/services/civil-structural-drafting", label: "Civil & Structural CAD Drafting", text: "Concrete and foundation arrangement drawings." },
      { href: "/services/material-takeoffs-documentation", label: "MTO & Engineering Documentation", text: "Concrete and rebar quantity reconciliation." },
      { href: "/capabilities/codes-standards", label: "Codes & Standards", text: "ACI and BS reinforcement references." },
      { href: "/project-experience#rcc-detailing", label: "RCC experience", text: "Prior professional project experience." },
    ],
    seo: {
      title: "RCC & Reinforcement Detailing, Rebar Drawings and BBS",
      description:
        "Concrete and reinforcement detailing from approved designs, including foundations, rebar drawings, placing details, bar bending schedules and quantities.",
      keywords: [
        "RCC detailing services",
        "reinforcement detailing",
        "rebar detailing",
        "bar bending schedule services",
        "foundation rebar drawings",
      ],
    },
  },

  /* ------------------------------------------------------------------ S05 */
  {
    id: "S05",
    leadProject: "brownfield-modifications",
    slug: "brownfield-structural-modifications",
    status: "confirmed",
    group: "modifications-docs",
    title: "Brownfield Structural Modifications & As-Built Documentation",
    menuText: "Modification packages and as-builts",
    heading: ["Brownfield Structural Modifications", "& As-Built Drawings"],
    image: "/images/brownfield-structure.jpg",
    imageAlt: "Existing refinery units with columns, piping and steel structures",
    summary:
      "Existing-structure modifications, plant support changes, replacement steelwork, updated models and as-built documentation from verified records.",
    intro: [
      "Most work on operating facilities is brownfield: structures that already exist, drawings that may not match what was built, and modifications that have to be planned around limited shutdown windows.",
      "This is a packaged service for existing plant. It brings together drawing, modelling, steel and RCC deliverables around one modification, with existing, removed and new work clearly distinguished, and closes out with as-builts based on verified completion records.",
    ],
    highlights: [
      "Existing records review",
      "Modification drawings and models",
      "Rehabilitation documentation",
      "Revised quantities and coordination",
      "As-built updates from verified records",
    ],
    deliverableType: "Modification package for existing plant",
    subserviceGroups: [
      {
        items: [
          {
            id: "S05.1",
            title: "Existing drawings, models and records review",
            description: "Available reference information and revisions assessed before any new work is drawn.",
          },
          {
            id: "S05.2",
            title: "Verified existing-condition information",
            description: "Client survey, as-found records and mark-ups incorporated; unresolved discrepancies logged for verification.",
          },
          {
            id: "S05.3",
            title: "Approved modification scope documentation",
            description: "Retained, removed and proposed work distinguished, with assumptions and tie-ins identified.",
          },
          {
            id: "S05.4",
            title: "Structural modification drawings and models",
            description: "Equipment and cable tray supports, pipe rack changes, member replacements, platforms and connection interfaces.",
          },
          {
            id: "S05.5",
            title: "Rehabilitation and reinstatement detailing",
            description: "Documentation support for approved rehabilitation and integrity reinstatement works. This is not an integrity certification.",
          },
          {
            id: "S05.6",
            title: "Revised quantities and coordination",
            description: "Change schedules, interfaces, MTO and model-to-drawing consistency.",
          },
          {
            id: "S05.7",
            title: "Issued and verified as-built updates",
            description: "Close-out drawings based on verified completed-work records supplied or approved by the responsible party.",
          },
        ],
      },
    ],
    inputs: [
      "Existing as-built drawings and models",
      "Survey data or point clouds, where supplied and supported",
      "Site photographs and marked-up changes",
      "Approved design decisions and connection inputs",
      "Outage and tie-in constraints",
      "Current models and drawing registers",
    ],
    outputs: [
      "Modification drawings",
      "Existing / removed / new legends",
      "Revised steel and RCC details",
      "Updated models",
      "Change schedules and MTO",
      "As-built records from verified sources",
    ],
    applications: [
      "Existing steel structures",
      "Pipe racks and pipe supports",
      "Pipeline and flowline supports",
      "Equipment support structures",
      "Cable tray supports",
      "Platforms and access structures",
    ],
    tags: ["Brownfield", "Steel", "RCC", "Onshore", "Offshore"],
    standardsRefs: ["client-project", "aisc-360", "aci-318", "iso-19902"],
    standardsNote:
      "Modifications follow the owner's facility specifications and the approved modification design. Offshore standards apply where the asset and contract require them.",
    software: {
      tools: ["Tekla Structures", "AutoCAD", "Navisworks"],
      note: "Navisworks model review supports fit checks against the existing plant model where one is provided.",
    },
    workflow: [
      { title: "Existing records", text: "Drawings, models and registers gathered and their status confirmed." },
      { title: "Discrepancies and verification", text: "Differences from site information logged for client verification." },
      { title: "Approved modifications", text: "Retained, removed and new work defined from the approved design." },
      { title: "Updated drawings and models", text: "Modification drawings and model changes produced." },
      { title: "Quantities and reviews", text: "Change schedules and MTO coordinated; comments closed out." },
      { title: "Issue", text: "Modification package issued under revision control." },
      { title: "Verified as-builts", text: "Records updated from verified completion information." },
    ],
    boundaries: [
      "Site survey and field verification",
      "Structural integrity assessment or fitness for service",
      "Shutdown engineering",
      "Safety-critical design and independent approval",
    ],
    boundaryNote:
      "A brownfield package can include drafting, modelling, steel and RCC deliverables as components. Each remains defined by its own service.",
    faqs: [
      {
        q: "What if the existing drawings don't match the site?",
        a: "We start from the available records and survey information, log discrepancies for verification by the responsible party, and show assumptions on the drawings so they can be confirmed before fabrication.",
      },
      {
        q: "How are existing, removed and new members shown?",
        a: "Modification drawings distinguish existing, demolished and new work with clear legends, so site and fabrication teams can read the scope at a glance.",
      },
      {
        q: "Do you produce as-built drawings?",
        a: "Yes, from verified completed-work records supplied or approved by the responsible party, so the next change starts from accurate records.",
      },
    ],
    related: [
      { href: "/services/civil-structural-drafting", label: "Civil & Structural CAD Drafting", text: "Drawing updates and redrafting." },
      { href: "/services/plant-structural-3d-modelling", label: "3D Model Updates", text: "Existing-model revision and coordination." },
      { href: "/services/steel-detailing-fabrication", label: "Structural Steel Detailing", text: "Shop drawings for replacement steel." },
      { href: "/quality-delivery", label: "Quality & Delivery", text: "How records, checks and as-builts are handled." },
    ],
    seo: {
      title: "Brownfield Structural Modifications & As-Built Documentation",
      description:
        "Brownfield structural drawing and model modifications, steel support changes, reinstatement documentation and as-built updates from verified site records.",
      keywords: [
        "brownfield structural modifications",
        "existing structure detailing",
        "structural rehabilitation drawings",
        "as-built drawings",
        "refinery drawing revisions",
      ],
    },
  },

  /* ------------------------------------------------------------------ S06 */
  {
    id: "S06",
    leadProject: "drawings-qaqc",
    slug: "material-takeoffs-documentation",
    status: "confirmed",
    group: "modifications-docs",
    title: "Material Take-Offs, BOM & Engineering Documentation",
    menuText: "Quantities, registers and controlled issue",
    heading: ["Structural Material Take-Offs,", "BOM & Drawing Documentation"],
    image: "/images/services-overview.jpg",
    imageAlt: "Multi-level steel process structure with large-bore piping",
    summary:
      "Steel and concrete quantities, bills of materials, drawing registers, review-comment incorporation and revision-controlled handover packages.",
    intro: [
      "Quantities and documentation decide whether a package can be procured, tracked and handed over. We prepare them as a standalone service, and as embedded deliverables within other services when contracted.",
      "Checks in this service are production-level documentation checks: completeness, references, model-to-drawing consistency and reconciliation. They are not independent engineering verification.",
    ],
    highlights: [
      "Steel MTO and BOM",
      "Concrete and rebar quantities",
      "Drawing and deliverable registers",
      "Comment and revision logs",
      "Issue-package checks",
    ],
    deliverableType: "Quantities, registers and controlled document packages",
    subserviceGroups: [
      {
        heading: "Material quantification",
        items: [
          { id: "S06.A1", title: "Measurement basis and source definition", description: "Drawings or model revision and measurement rules agreed before extraction." },
          { id: "S06.A2", title: "Steel MTO, BOM and schedules", description: "Member, plate and bolt schedules and bills of materials." },
          { id: "S06.A3", title: "Concrete and reinforcement quantities", description: "Concrete and rebar quantity reports, with BBS reconciliation." },
          { id: "S06.A4", title: "Model-based extraction and revision tracking", description: "Quantities extracted from models with the source revision recorded." },
          { id: "S06.A5", title: "Quantity changes and reconciliation", description: "Changes between revisions reconciled and schedules re-issued." },
        ],
      },
      {
        heading: "Engineering drawing documentation",
        items: [
          { id: "S06.B1", title: "Drawing and deliverable registers", description: "Registers listing every deliverable with status and revision." },
          { id: "S06.B2", title: "Numbering, title blocks and templates", description: "Sheet numbering and drafting template standardisation." },
          { id: "S06.B3", title: "Review comments, redlines and change logs", description: "Comments and redlines tracked through to incorporation." },
          { id: "S06.B4", title: "Revision status, transmittals and handover", description: "Revision control, transmittals and native / PDF handover." },
        ],
      },
      {
        heading: "Production-level documentation checks",
        items: [
          { id: "S06.C1", title: "Drawing completeness and references", description: "Sheets, references and title-block information checked for completeness." },
          { id: "S06.C2", title: "Model-to-drawing consistency", description: "Drawings checked against the model revision they were extracted from." },
          { id: "S06.C3", title: "MTO reconciliation and comment closure", description: "Quantities reconciled to source; approved comments confirmed closed." },
          { id: "S06.C4", title: "Issue-package completeness", description: "Package contents and revisions verified before issue." },
        ],
      },
    ],
    inputs: [
      "Approved, current source drawings and models",
      "MTO measurement rules",
      "Material, plate and bolt catalogue basis",
      "Deliverable register and documentation standard",
    ],
    outputs: [
      "MTO and BOM",
      "Bolt and part lists",
      "Quantity spreadsheets",
      "Revision logs and registers",
      "Submittal packages",
      "Agreed checked or reconciled reports",
    ],
    applications: [
      "EPC detailed engineering packages",
      "Fabricator drawing packages",
      "Brownfield record updates",
      "Documentation backlogs",
    ],
    tags: ["Steel", "RCC", "Greenfield", "Brownfield"],
    standardsRefs: ["client-project", "bs-8666"],
    standardsNote:
      "Quantities follow the project's measurement rules; registers and transmittals follow the client's document control procedure.",
    software: {
      tools: ["AutoCAD", "Tekla Structures"],
      note: "Model-based quantities depend on access to the source model and version, confirmed during scope review.",
    },
    workflow: [
      { title: "Agree basis", text: "Source revision, measurement rules and register format agreed." },
      { title: "Extract and prepare", text: "Quantities and documentation prepared from the source." },
      { title: "Reconcile", text: "Quantities reconciled to drawings, models and earlier issues." },
      { title: "Document changes", text: "Changes, comments and revisions recorded." },
      { title: "Production check", text: "Completeness and consistency checked before issue." },
      { title: "Controlled issue", text: "Deliverables issued with transmittals and revision status." },
    ],
    boundaries: [
      "Quantity surveying certification",
      "Engineering verification",
      "Commercial procurement approval",
      "Statutory certification",
    ],
    boundaryNote:
      "Production checking of every package is described on the Quality & Delivery page. Bar bending schedules originate in RCC & Reinforcement Detailing; this service can compile and reconcile them for procurement.",
    faqs: [
      {
        q: "Can you check drawings produced by another team?",
        a: "We can carry out production-level documentation checks: completeness, references, model-to-drawing consistency and quantity reconciliation. Formal independent engineering verification is not part of this service.",
      },
      {
        q: "Do you provide MTO without the drawings?",
        a: "Yes. Standalone MTO and BOM can be prepared from your approved drawings or models, with the measurement basis and source revision agreed first.",
      },
      {
        q: "Can you manage our drawing register and transmittals?",
        a: "Yes, following your document control procedure, including revision status, transmittals and native / PDF handover.",
      },
    ],
    related: [
      { href: "/services/steel-detailing-fabrication", label: "Structural Steel Detailing", text: "Model-based steel quantities and lists." },
      { href: "/services/rcc-reinforcement-detailing", label: "RCC & Reinforcement Detailing", text: "Where bar bending schedules originate." },
      { href: "/quality-delivery", label: "Quality & Delivery", text: "Checking, revision control and handover." },
      { href: "/engineering-outsourcing", label: "Engineering Outsourcing", text: "Clearing documentation backlogs." },
    ],
    seo: {
      title: "Structural Material Take-Offs, BOM & Engineering Documentation",
      description:
        "Structural steel MTO, BOM, reinforcement and concrete quantity reports, drawing registers and controlled engineering documentation packages.",
      keywords: ["steel MTO", "BOM", "model-based quantities", "drawing registers", "material take-off services"],
    },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;

export const servicesInGroup = (group: ServiceGroupId) => services.filter((s) => s.group === group);

/** Old service slugs, kept so links like /contact?service=<old> still preselect sensibly. */
export const legacyServiceSlugs: Record<string, ServiceSlug | "engineering-outsourcing"> = {
  "onshore-civil-structural-design-detailing": "civil-structural-drafting",
  "offshore-structural-design-detailing": "steel-detailing-fabrication",
  "structural-drawings-mto-qaqc": "material-takeoffs-documentation",
};

/**
 * Canonical service catalogue (S01–S06): the publishing source of truth.
 *
 * Rules (see the v2 deep-research implementation spec, sections 3–4):
 * - Every marketed deliverable has one primary service. Other pages may
 *   reference it, never re-sell it as a separate service line.
 * - Onshore / offshore are industries (src/lib/industries.ts), not services.
 * - Engineering Outsourcing is an engagement route, not a seventh service.
 * - Production checking lives on the Quality & Delivery page; independent
 *   design verification is not offered as a core service.
 * - Subservice order is explicit and must be preserved.
 * - Copy describes drafting, modelling and detailing from approved inputs;
 *   design responsibility stays with the responsible engineer.
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

export type ScopeGroup = { heading?: string; items: string[] };

export type Subservice = { id: string; title: string; description: string };
export type SubserviceGroup = { heading?: string; items: Subservice[] };

/**
 * Related next step (spec v2 §14.4). Service and application labels are
 * resolved from their registries so a rename can never leave a stale label.
 */
export type RelatedLink =
  | { service: ServiceSlug; text: string }
  | { application: string; text: string }
  | { href: string; label: string; text: string };

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
  /** "Where this service fits": independent or downstream of approved inputs (spec v2 §4.0.2). */
  fit: string[];
  /** 3–5 items for overview listings. */
  highlights: string[];
  /** What the deliverable is, for the "At a glance" panel. */
  deliverableType: string;
  /** Full core-services checklist shown beside "Where this service fits" (owner brief, Oct 2026). */
  coreScope: ScopeGroup[];
  /** Qualification shown under the checklist. */
  coreScopeNote?: string;
  subserviceGroups: SubserviceGroup[];
  inputs: string[];
  outputs: string[];
  applications: string[];
  tags: string[];
  /** Project requirement families that govern the package (spec v2 §4.0.6). */
  requirements: { title: string; text: string }[];
  /** Example standards a project may specify: illustrative, never exhaustive. */
  standardsRefs: string[];
  standardsNote: string;
  software: { tools: string[]; formats: string[]; note: string };
  /** Page-specific technical sequence (4–7 steps). */
  workflow: { title: string; text: string }[];
  /** Drawing / model review: factual checking, not design approval (spec v2 §4.0.9). */
  review: string;
  /** Technical responsibility statement. */
  responsibility: string;
  /** Responsibility boundaries: what is not included by implication. */
  boundaries: string[];
  /** How this service relates to neighbouring services. */
  boundaryNote: string;
  faqs: { q: string; a: string }[];
  /** Project shown first as evidence (keeps the anchor each service used before the restructure). */
  leadProject: string;
  /** 2–4 closely related next steps. */
  related: RelatedLink[];
  /** Package-specific RFQ prompt for the closing CTA. */
  cta: string;
  seo: { title: string; description: string; keywords: string[] };
};

export const serviceGroups: {
  id: ServiceGroupId;
  title: string;
  text: string;
}[] = [
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
      "Prepare and update structural general arrangements, framing plans, elevations, sections, foundation and equipment-base drawings from approved engineering inputs. Dimensions, reference levels, interfaces and revisions are coordinated within your drawing standards.",
    intro: [
      "We prepare civil and structural CAD documentation for EPC contractors, structural engineering consultancies and industrial project teams, developed from approved design information for energy and industrial facilities.",
      "Drawing packages may cover structural general arrangements, framing plans, sections and elevations, foundation and equipment-base drawings, and the interface details needed for coordination, technical review and downstream construction documentation.",
      "We work within your drawing standards, numbering system, reference coordinates, revisions and approved design inputs. An assignment can be a new drawing package, development of marked-up documentation, revisions to existing drawings or record-drawing updates from verified information. The aim is clear, consistently organised production documents, not a replacement for the designated engineer's design or approval responsibilities.",
    ],
    fit: [
      "Downstream of approved engineering. The responsible engineer designs the structure; we turn the approved design into arrangement drawings. On many packages these drawings become the reference that 3D modelling, steel shop drawings and rebar detailing are built from.",
      "Detailed rebar and bar bending schedules belong to Reinforced Concrete & Rebar Detailing, and steel shop and assembly drawings to Structural Steel Detailing & Fabrication Documentation, so each deliverable has one clear home.",
    ],
    highlights: [
      "General arrangement and layout drawings",
      "Plans, elevations and sections",
      "Foundation and equipment-base arrangements",
      "Interface and coordination drawings",
      "Drawing revisions and as-built updates",
    ],
    deliverableType: "2D engineering arrangement drawings",
    coreScope: [
      {
        items: [
          "General arrangement (GA) drawings",
          "Structural plans, elevations, sections and detailed drawings",
          "Steel structural arrangement and framing drawings",
          "Column, beam, bracing and grid layout drawings",
          "Structural setting-out, levels and dimensional drawings",
          "Foundation plans, sections and details",
          "Equipment foundations, bases and concrete plinth drawings",
          "Pipe rack, pipe bridge and industrial structure arrangement drawings",
          "Substation foundation and structural drawings",
          "Industrial building and steel-framed structure drawings",
          "Structural support and equipment-support drawings",
          "RCC structural drawings for columns, beams, slabs and foundations",
          "Concrete-to-steel interface drawings",
          "Drawing conversion, redrafting and CAD reconstruction from suitable reference information",
          "Existing drawing updates and revisions",
          "Redline and markup incorporation",
          "As-built drawing preparation based on verified site information",
          "Sheet setup, dimensions, annotations, notes and cross-references",
          "Title blocks, drawing numbering and client drafting standards",
          "Drawing registers, revision identification and drawing-package preparation",
        ],
      },
    ],
    subserviceGroups: [
      {
        items: [
          {
            id: "S01.1",
            title: "Drawing basis, layouts and reference coordination",
            description:
              "Supplied templates, project grids, reference levels, coordinate systems and drawing references set up before production. Inconsistencies in the inputs are raised as clarifications.",
          },
          {
            id: "S01.2",
            title: "Structural general arrangement (GA) drawings",
            description:
              "Overall steel and concrete arrangement plans and equipment or facility structural layouts from approved design information, showing principal member positions, grids, levels and references.",
          },
          {
            id: "S01.3",
            title: "Structural plans, elevations and sections",
            description:
              "Framing plans, elevations, key sections and member layout information that communicate geometry and interdisciplinary interfaces.",
          },
          {
            id: "S01.4",
            title: "Civil and foundation arrangement drawings",
            description:
              "Foundation plans, equipment bases, plinths, pedestals, substation bases and setting-out from approved design layouts. Detailed reinforcement and BBS packages sit in Reinforced Concrete & Rebar Detailing.",
          },
          {
            id: "S01.5",
            title: "Steel and concrete interface documentation",
            description:
              "Base-plate and foundation interfaces, embedment locations from the approved design, and structural supports relative to vendor equipment, piping and cable tray. Anchor and connection design are not implied.",
          },
          {
            id: "S01.6",
            title: "CAD drawing development and redline incorporation",
            description:
              "Updates to existing drawings, client engineering mark-ups, title-block and annotation updates, layer and line-type consistency, drawing comparison and revisions.",
          },
          {
            id: "S01.7",
            title: "Existing drawings and as-built documentation",
            description:
              "Record drawings reconstructed or updated from supplied verified site records, approved redlines or survey information. Uncertain conditions are flagged, never presented as survey-verified.",
          },
        ],
      },
    ],
    inputs: [
      "Approved structural and civil design drawings or sketches",
      "Design notes, where relevant",
      "Layouts, reference grids and coordinate system",
      "Client CAD standards, title blocks and numbering",
      "Current revisions and approved redlines",
      "Vendor equipment and interface data",
      "Verified existing-site information, where applicable",
    ],
    outputs: [
      "GA drawings, plans, elevations and sections",
      "Civil, foundation and equipment-base drawings",
      "Structural interface and reference details",
      "Revised and as-built drawing packages",
      "Native CAD (DWG or DGN) and PDF issues",
      "Drawing register with revision status",
    ],
    applications: [
      "Pipe racks and pipe bridges",
      "Platforms and secondary access steelwork",
      "Industrial steel frames",
      "Equipment and cable tray support structures",
      "Process-facility civil works",
      "Machinery and equipment foundations",
      "Substation and utility structures",
      "Steel and concrete interfaces",
    ],
    tags: ["Greenfield", "Brownfield", "Steel", "RCC"],
    requirements: [
      {
        title: "Design Basis & Criteria",
        text: "Codes, editions and design criteria are those set by the responsible designer and the project specification. Drawings present them; drafting does not select them.",
      },
      {
        title: "Client Drawing Procedures",
        text: "Title blocks, numbering, layers, scales, CAD standards and issue-status codes follow the client's procedures.",
      },
      {
        title: "Discipline & Vendor Interfaces",
        text: "Equipment, piping, cable tray and vendor information is shown as issued. Conflicts are raised as technical queries, not resolved by assumption.",
      },
      {
        title: "Software & Revisions",
        text: "Native platform, version, file format and revision convention are agreed before production starts.",
      },
    ],
    standardsRefs: ["client-project", "aisc-360", "aci-318", "eurocodes"],
    standardsNote:
      "Drawings follow the client's design basis, drawing conventions and title blocks. Design codes referenced on drawings are those specified by the responsible designer.",
    software: {
      tools: ["AutoCAD", "MicroStation"],
      formats: ["DWG", "DGN", "PDF"],
      note: "Platform, version and file format are confirmed during scope review.",
    },
    workflow: [
      {
        title: "Confirm drawing basis",
        text: "Approved inputs, standards, grids and conventions confirmed; gaps raised early.",
      },
      {
        title: "GA and layouts",
        text: "General arrangement and layouts prepared as the reference for all sheets.",
      },
      {
        title: "Plans and sections",
        text: "Structural and civil plans, elevations and sections developed with references.",
      },
      {
        title: "Interfaces and queries",
        text: "Discipline and vendor interfaces coordinated; technical queries raised and logged.",
      },
      {
        title: "Production checks",
        text: "Sheets checked against inputs, references and the drawing register.",
      },
      {
        title: "Client review",
        text: "Issued for the designated client review; instructed comments incorporated.",
      },
      {
        title: "Controlled handover",
        text: "Native and PDF deliverables handed over with revision status.",
      },
    ],
    review:
      "Every sheet is checked at production level against the approved inputs, the grid and level references and the drawing register before issue. Client comments are logged and incorporated as instructed, with clouded changes and a revision history. These checks confirm the drawing reflects its inputs; they are not a structural design approval.",
    responsibility:
      "These are drafting and engineering documentation services from client-approved engineering design and instructions. Independent analysis, foundation design, connection calculations, site survey and statutory certification are outside the standard drafting scope.",
    boundaries: [
      "Structural member sizing and design calculations",
      "Geotechnical and foundation design",
      "Construction approvals or an engineer's stamp",
      "Independent design verification",
    ],
    boundaryNote:
      "Rebar detailing and BBS are provided under Reinforced Concrete & Rebar Detailing, steel shop and assembly drawings under Structural Steel Detailing & Fabrication Documentation, and standalone quantities under Material Take-Offs, BOM & Engineering Documentation.",
    faqs: [
      {
        q: "Do you design the structures you draw?",
        a: "No. We provide drafting and design support. Design responsibility stays with your responsible engineer; we develop arrangement drawings from the approved design information you issue.",
      },
      {
        q: "Can you work from existing DWG or PDF drawings?",
        a: "Existing native CAD files, PDFs, sketches and redlines can be used, subject to legibility, source reliability and file compatibility. Reconstruction from scans is scoped separately and checked against authoritative source data.",
      },
      {
        q: "Can you take on drawing revision backlogs?",
        a: "Yes. Work can be packaged by drawing register, discipline, issue milestone or an agreed resource arrangement once the inputs, standards and complexity have been reviewed.",
      },
      {
        q: "Can reinforcement schedules and shop drawings be included?",
        a: "They can be part of an integrated assignment, but detailed rebar and BBS work belongs to Reinforced Concrete & Rebar Detailing and steel shop and assembly drawings to Structural Steel Detailing & Fabrication Documentation.",
      },
    ],
    related: [
      {
        service: "plant-structural-3d-modelling",
        text: "When the arrangement needs a coordinated 3D model.",
      },
      {
        service: "rcc-reinforcement-detailing",
        text: "Rebar detailing and BBS for foundations and concrete members.",
      },
      {
        service: "brownfield-structural-modifications",
        text: "Drawing revisions and as-builts for existing plant.",
      },
      {
        service: "material-takeoffs-documentation",
        text: "Quantities, registers and controlled issue for the drawing set.",
      },
    ],
    cta: "Need a civil or structural CAD drawing package? Share your drawing register, approved design inputs, required formats and target submission dates for a technical and commercial review.",
    seo: {
      title: "Civil & Structural CAD Drafting Services",
      description:
        "Structural GA drawings, framing layouts, foundations, sections and coordinated CAD revisions based on approved engineering design inputs.",
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
    heading: ["Tekla Structures &", "3D Structural Modelling Services"],
    image: "/images/plant-model.jpg",
    imageAlt: "Tall steel process structure with platforms and piping against a blue sky",
    summary:
      "Tekla steel models and suitable plant structural model updates developed from agreed design information in supported software environments, with coordination views, exchange files and documentation outputs where included in scope.",
    intro: [
      "We support structural steel and industrial project teams with 3D model development, updates, coordination and model-based documentation.",
      "Work may involve a Tekla Structures model developed from approved engineering drawings, a modification to an existing steel model, or structural modelling support within a compatible plant design environment.",
      "Model purpose and level of development are confirmed at the outset: a coordination model, a detailed steel model, a fabrication-oriented model and an existing-plant update need different inputs, attributes and outputs. Coordinates, member identification, modelling conventions, software versions and native or exchange formats are agreed before production. Drawing packages and independent engineering verification are separate deliverables, not implied by a model.",
    ],
    fit: [
      "Can be scoped on its own as a model-only package, or as the first stage of a steel detailing package. In both cases the model is built from approved design information, to a purpose and level of information agreed at the start.",
      "Where shop and erection drawings are needed, they are scoped under Structural Steel Detailing & Fabrication Documentation, and the detailing model is delivered as part of that package rather than sold twice.",
    ],
    highlights: [
      "TEKLA structural steel models",
      "Plant structural model support",
      "Existing and legacy model updates",
      "Interface review and coordination",
      "Agreed native and exchange formats",
    ],
    deliverableType: "3D structural and plant models with agreed exchanges",
    coreScope: [
      {
        heading: "Tekla Structures & 3D Modelling",
        items: [
          "3D structural steel modelling using Tekla Structures",
          "Beams, columns, bracing and secondary structural members",
          "Plates, stiffeners, brackets and connection components",
          "Hollow-section structures and storage-tank structural steelwork",
          "Pipe racks, platforms, access structures and equipment-support frames",
          "Warehouses, factories and industrial sheds",
          "Model development from approved 2D drawings and design information",
          "Existing model updates from approved revisions and markups",
          "Structural member numbering and model organisation",
          "Model-based GA, fabrication, assembly and erection drawings",
          "3D views and model-generated drawing views",
          "Model-based material take-offs and component schedules",
          "Model and drawing consistency checks",
          "Geometric coordination and clash identification within the agreed scope",
          "Model updates for brownfield modifications and structural replacements",
          "Model and drawing revision coordination",
          "IFC and other agreed model-exchange formats, where supported",
          "Native model handover, subject to software compatibility, licensing and contract",
        ],
      },
      {
        heading: "Plant Design & Legacy Model Support",
        items: [
          "Compatible legacy plant-design models and drawing workflows",
          "PDS-based modelling and drawing support, where current capability is available",
          "FrameWorks Plus (FWP) modelling and drawing workflows, where supported",
          "SPR-related model and drawing workflows, where applicable",
          "MicroStation drafting and legacy drawing updates",
          "Existing plant-model updates and drawing revisions",
          "Facility layout and structural-interface documentation",
          "Underground facility modelling, within the agreed scope",
          "Structural steelwork coordination with piping and facility layouts",
          "Pipe rack and pipe bridge interface coordination",
          "Legacy drawing conversion and documentation updates",
          "Model-based quantity extraction, where supported",
        ],
      },
    ],
    coreScopeNote:
      "PDMS-related support and piping layout or isometric drawing support are offered only after the available software, compatible files, personnel expertise and project requirements are confirmed. Complete piping design, piping stress analysis, process engineering and mechanical design are not implied.",
    subserviceGroups: [
      {
        heading: "Model Setup & Development",
        items: [
          {
            id: "S02.1",
            title: "Model setup, reference grids and coordinates",
            description:
              "Client origins, levels, reference models, units, libraries and model conventions established, together with the agreed model purpose and level of information.",
          },
          {
            id: "S02.2",
            title: "3D structural steel model development",
            description:
              "Framing members, beams, columns, bracing, platforms, pipe-support structures and agreed secondary steel modelled from the approved design.",
          },
          {
            id: "S02.3",
            title: "Structural component and connection modelling",
            description:
              "Plates, stiffeners, specified connection geometry and associated steel components to the agreed detail level. Connection design remains a separate responsibility.",
          },
        ],
      },
      {
        heading: "Plant & Existing Models",
        items: [
          {
            id: "S02.4",
            title: "Plant structural model support",
            description:
              "Structural models and references developed or updated in supported plant environments, such as PDS with FrameWorks Plus and MicroStation, where access, licences and file compatibility are confirmed. This is not full multidiscipline plant design.",
          },
          {
            id: "S02.5",
            title: "Existing and legacy model updates",
            description:
              "Approved revision mark-ups, steel replacement and modification information applied to existing plant and structural models where a compatible update is feasible.",
          },
        ],
      },
      {
        heading: "Coordination, Outputs & Handover",
        items: [
          {
            id: "S02.6",
            title: "3D model review and interface coordination",
            description:
              "Relevant geometry, discipline interfaces and identified clashes checked, with comments and queries issued. Resolution of other disciplines' clashes stays with their owners.",
          },
          {
            id: "S02.7",
            title: "Model-derived views, drawings and quantities",
            description:
              "Agreed model views, documentation and model-derived quantities. Fabrication and shop drawing packages sit in Structural Steel Detailing unless explicitly included.",
          },
          {
            id: "S02.8",
            title: "Native model and exchange-format handover",
            description:
              "Accepted native versions, IFC or other supported interchange files, reports and revision notes as contracted, with formats and software confirmed before acceptance.",
          },
        ],
      },
    ],
    inputs: [
      "Approved structural layouts and steel schedules",
      "Connection requirements, where components are modelled",
      "Model origin, coordinate basis and grids",
      "Discipline reference models",
      "Software version, template, libraries and naming rules",
      "Client review mark-ups and interface information",
      "Agreed quantification rules, where reports are included",
    ],
    outputs: [
      "3D model at the agreed detail and information level",
      "Coordinated model views",
      "Native, IFC or compatible exchange files",
      "Model updates with revision notes",
      "Issue and coordination register",
      "Model-derived MTO and reports, where included",
    ],
    applications: [
      "Pipe racks and pipe bridges",
      "Structural steel platforms",
      "Equipment support structures",
      "Industrial steel frames",
      "Refinery and gas processing plant structures",
      "Offshore structural packages, within verified scope",
      "Structural modifications to existing plant",
    ],
    tags: ["TEKLA", "Legacy Plant Model", "Greenfield", "Brownfield"],
    requirements: [
      {
        title: "Model Purpose & Level of Information",
        text: "Whether the model serves coordination, detailing, fabrication or an existing-plant update is agreed first, with the attributes each purpose needs.",
      },
      {
        title: "Client Modelling Rules",
        text: "Origins, units, naming, numbering, profile and material catalogues and modelling conventions follow the client's rules.",
      },
      {
        title: "Discipline Interfaces",
        text: "Piping, equipment and electrical reference models are used as supplied. Ownership of clash resolution stays as defined in the contract.",
      },
      {
        title: "Software, Versions & Data Rights",
        text: "Platform, version, licences and the right to work on client model data are confirmed before any update or exchange.",
      },
    ],
    standardsRefs: ["client-project", "iso-19650"],
    standardsNote:
      "Models follow the client's modelling rules, naming and level of detail. ISO 19650 information management is followed where the project adopts it.",
    software: {
      tools: ["Tekla Structures", "PDS", "FrameWorks Plus", "MicroStation", "PDMS", "Navisworks"],
      formats: ["Native Tekla model", "IFC", "DGN", "PDF views and reports"],
      note: "Plant environments listed here come from senior personnel's prior project experience; historical PDS or PDMS competence does not establish a present licence. Access, licence and version for a new package are confirmed during scope review.",
    },
    workflow: [
      {
        title: "Compatibility and data rights",
        text: "Existing files, versions, licences and data rights checked.",
      },
      {
        title: "Model purpose and basis",
        text: "Purpose, level of information, origin and coordinates agreed.",
      },
      {
        title: "Structural geometry",
        text: "Primary and secondary members modelled from approved inputs.",
      },
      {
        title: "Detail to scope",
        text: "Plates, bolts and specified components added to the agreed level.",
      },
      {
        title: "Interfaces and RFIs",
        text: "Geometry reviewed against other disciplines; queries and clashes raised.",
      },
      {
        title: "Approved revisions",
        text: "Approved changes incorporated and tracked against revisions.",
      },
      {
        title: "Exchange and issue",
        text: "Native, IFC or other agreed models and reports issued.",
      },
    ],
    review:
      "Models are reviewed for geometry, member identification and agreement with the approved inputs before each issue, and selected interfaces are checked against the reference models supplied. Comments and clashes are logged and closed out through controlled model revisions. A correctly formed model is not proof of structural adequacy, code compliance or clash-free construction.",
    responsibility:
      "These are modelling and model-documentation services from approved engineering inputs. Structural analysis, design adequacy, design approval and the authority to resolve other disciplines' clashes remain with the parties defined in the contract. Tekla and other tools are used only where legitimately available and supported.",
    boundaries: [
      "Multidisciplinary plant, process or piping design",
      "Structural analysis or design adequacy of the modelled structure",
      "Code compliance demonstrated by a model or rendering",
      "Independent structural design verification",
    ],
    boundaryNote:
      "PDS or PDMS experience does not imply full plant design services. Fabrication and erection drawings extracted from a model are scoped under Structural Steel Detailing & Fabrication Documentation.",
    faqs: [
      {
        q: "Do we have to commission shop drawings with the model?",
        a: "No. A model-only package can be scoped on its own. Steel shop and erection documentation is handled through Structural Steel Detailing & Fabrication Documentation.",
      },
      {
        q: "Can you update our existing plant structural model?",
        a: "We first examine the available files, project and version compatibility, required licences, data integrity and the scope of authorised changes, then confirm whether a direct model update is feasible.",
      },
      {
        q: "Can you identify clashes with piping or equipment?",
        a: "Selected geometric interfaces can be reviewed against the reference models available. Clash ownership, resolution authority and final acceptance remain as defined in the contract.",
      },
      {
        q: "Which modelling environments has the team worked in?",
        a: "Tekla Structures, PDS with FrameWorks Plus and MicroStation, with exposure to PDMS, and Navisworks for review. Availability of a specific environment and version is confirmed for each package.",
      },
    ],
    related: [
      {
        service: "civil-structural-drafting",
        text: "Arrangement drawings the model is built from or issued with.",
      },
      {
        service: "steel-detailing-fabrication",
        text: "Shop, assembly and erection drawings from the model.",
      },
      {
        service: "brownfield-structural-modifications",
        text: "Existing-model updates for modification packages.",
      },
      {
        service: "material-takeoffs-documentation",
        text: "Model-based quantities and schedules.",
      },
    ],
    cta: "Share your existing model or approved structural drawings, required modelling platform and version, reference coordinates and expected outputs to discuss a 3D modelling package.",
    seo: {
      title: "Tekla Structures & 3D Structural Modelling",
      description:
        "Tekla structural modelling, plant model updates, coordination views and agreed model exchange outputs for industrial engineering packages.",
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
      "Engineer-approved structural information translated into steel detailing models, assembly and single-part shop drawings, specified connection details, erection plans and fabrication schedules for pipe racks, platforms and industrial steelwork.",
    intro: [
      "We provide structural steel detailing support for industrial facilities, pipe racks, pipe bridges, access platforms, equipment supports and associated steelwork.",
      "The service translates approved structural design information, connection requirements and fabricator practices into a coordinated detailing model, fabrication documents, erection information and material schedules for project review and workshop use.",
      "Depending on the assignment, a package can comprise a Tekla Structures model, general arrangement and erection information, assembly drawings, single-part drawings, member and part marks, bolt and material lists, and supported digital fabrication outputs. Detail level, approval stages, connection-design responsibility and formats are agreed before work begins.",
    ],
    fit: [
      "Downstream of approved structural and connection design, upstream of the fabricator's workshop. We detail what the engineer has designed; the engineer and the fabricator keep their own review and approval roles.",
      "A model-only assignment without drawings is scoped under 3D Structural Modelling & Plant Model Support. Standalone quantities can be purchased under Material Take-Offs, BOM & Engineering Documentation.",
    ],
    highlights: [
      "Detailing model and member arrangement",
      "Assembly and shop drawings",
      "Single-part drawings",
      "Erection drawings",
      "BOM, bolt and part lists",
    ],
    deliverableType: "Fabrication and erection documentation package",
    coreScope: [
      {
        heading: "Steel Detailing & Fabrication Drawings",
        items: [
          "Structural steel detailing from approved design drawings and engineering information",
          "Steel general arrangement and framing drawings",
          "Shop and fabrication drawings",
          "Erection and installation drawings",
          "Assembly drawings and single-part drawings",
          "Beam, column, bracing and secondary-steel detailing",
          "Beam-to-column and beam-to-beam connection detailing",
          "Base plates, end plates, gusset plates and stiffener details",
          "Bolted and welded connection details to the approved engineering design",
          "Structural plates, brackets, cleats and connection components",
          "Platforms, walkways, stairs, ladders and handrails",
          "Pipe rack and pipe bridge steel detailing",
          "Equipment-support frames and structural skids",
          "Cable tray supports and other secondary steelwork",
          "Member identification, part marking and assembly numbering",
          "Fabrication dimensions, cutting information and component schedules",
          "Bolt lists and connection material lists",
          "Bills of materials (BOMs) and material take-offs (MTOs)",
          "NC / DSTV and other agreed machine outputs, subject to project requirements and software capability",
          "Fabrication and erection coordination documentation",
          "Incorporation of fabrication comments and approved revisions",
          "Modification, replacement and additional-steel detailing",
          "Rehabilitation and strengthening-related drawing updates from approved engineering information",
        ],
      },
      {
        heading: "Industrial Structures & Specialist Steelwork",
        items: [
          "Pipe racks, multilevel pipe racks, pipe bridges and crossovers",
          "Equipment-support structures and equipment frames",
          "Equipment, maintenance and industrial access platforms",
          "Industrial sheds and steel-framed industrial buildings",
          "Structural frames and secondary steelwork",
          "Transformer and electrical equipment skids",
          "Cladding and roofing support steelwork",
          "Monorail and lifting-support steelwork, subject to specialist design criteria and approved information",
          "Process-facility structural supports within the agreed civil and structural scope",
          "Structural interfaces with equipment, piping and electrical installations",
          "Replacement steelwork, additional supports and facility expansion structures",
          "Rehabilitation and reinstatement drawing packages",
        ],
      },
    ],
    subserviceGroups: [
      {
        heading: "Input Review & Detailing Model",
        items: [
          {
            id: "S03.1",
            title: "Approved steel design and connection information review",
            description:
              "Framing drawings, member sizes, engineer-specified connections, design marks, material grades, project standards and fabrication preferences reviewed; missing information raised as queries.",
          },
          {
            id: "S03.2",
            title: "Structural steel detailing model",
            description:
              "Agreed model geometry for steel members, bracing, beams, columns, platforms and secondary components, built with supported tools.",
          },
          {
            id: "S03.3",
            title: "Member, plate and connection detailing",
            description:
              "Specified base and end plates, gussets, stiffeners, connection plates, bolts and weld information documented from approved design instructions. Design calculations are not implied.",
          },
        ],
      },
      {
        heading: "Drawing Package",
        items: [
          {
            id: "S03.4",
            title: "General arrangement and erection information",
            description:
              "Members and assemblies located with grids, levels, marks and orientation, with erection plans and elevations and field connection indications.",
          },
          {
            id: "S03.5",
            title: "Steel assembly / shop drawings",
            description:
              "Workshop information for each fabricated assembly: components, dimensions, fabrication positions, connections and relevant notes.",
          },
          {
            id: "S03.6",
            title: "Single-part / component drawings",
            description:
              "Isolated member and plate information with part identification, material, dimensions, holes, cuts and the necessary workshop details.",
          },
          {
            id: "S03.7",
            title: "Erection drawings and installation documentation",
            description:
              "Erection plans, member and assembly IDs, field connections and agreed installation-location information. Erection methodology and temporary works design stay separate.",
          },
        ],
      },
      {
        heading: "Schedules, Data & Revisions",
        items: [
          {
            id: "S03.8",
            title: "BOM, MTO and fabrication schedules",
            description:
              "Drawing- and model-derived member, plate, bolt and material schedules with a defined measurement and revision basis.",
          },
          {
            id: "S03.9",
            title: "Digital fabrication data",
            description:
              "NC / DSTV or other machine data, only after the software workflow, the fabricator's equipment requirements and present capability are validated for the package.",
          },
          {
            id: "S03.10",
            title: "Shop drawing revisions, RFIs and comment close-out",
            description:
              "Approved design and fabricator feedback incorporated, models, drawings and lists kept consistent, and controlled revision records issued.",
          },
        ],
      },
    ],
    inputs: [
      "Approved structural GA and member design information",
      "Connection design or criteria, with the design authority confirmed",
      "Material grades, bolting and welding requirements",
      "Project and fabricator shop standards",
      "Erection boundaries and interface records",
      "Required issue stages and machine-file format",
    ],
    outputs: [
      "Detailing model and GA / erection views",
      "Assembly and single-part drawings",
      "Fabrication sheets with member and part marks",
      "Erection drawings and field connection records",
      "MTO, BOM and bolt lists",
      "Machine files (NC / DSTV), where contracted",
    ],
    applications: [
      "Pipe racks and pipe bridges",
      "Process and maintenance platforms",
      "Structural steel frames",
      "Secondary steel supports",
      "Equipment platforms and skids",
      "Stairs, ladders and handrails",
      "Industrial buildings and sheds",
      "Offshore steelwork, within verified scope",
      "Replacement steel for approved modifications",
    ],
    tags: ["Steel", "TEKLA", "Greenfield", "Brownfield"],
    requirements: [
      {
        title: "Design & Connection Authority",
        text: "Member and connection design come from the responsible engineer. The detailing basis records who owns each before modelling starts.",
      },
      {
        title: "Fabricator Shop Standards",
        text: "Marks, numbering, title blocks, drawing presentation and bolt and weld conventions follow the fabricator's or client's agreed standards.",
      },
      {
        title: "Project Specifications",
        text: "Material grades, welding, bolting, coating notes and tolerances as stated in the project specification and its editions.",
      },
      {
        title: "Software, Formats & Revisions",
        text: "Tekla version, drawing formats, machine-file requirements and review stages are agreed before production.",
      },
    ],
    standardsRefs: ["aisc-303", "aisc-360", "aws-d11", "rcsc", "client-project"],
    standardsNote:
      "Detailing follows the project-specified steel, welding and bolting standards and the approved connection design. The scope of work records the applicable editions.",
    software: {
      tools: ["Tekla Structures", "AutoCAD", "Navisworks"],
      formats: ["Native Tekla model", "DWG", "PDF", "NC / DSTV, where contracted"],
      note: "Tekla Structures is the primary detailing platform. Machine data is issued only after the fabricator's equipment requirements and the software workflow are validated for the package.",
    },
    workflow: [
      {
        title: "Input review and RFIs",
        text: "Approved design, connections and standards reviewed; queries raised.",
      },
      {
        title: "Detailing basis",
        text: "Model conventions, marks, detail level and approval stages defined.",
      },
      {
        title: "Steel and connection model",
        text: "Members and approved connections modelled to the agreed level.",
      },
      {
        title: "Drawing sheets",
        text: "Arrangement, assembly, single-part and erection sheets prepared.",
      },
      {
        title: "Lists and reconciliation",
        text: "MTO, BOM and bolt lists prepared and reconciled with the model.",
      },
      {
        title: "Consistency checks",
        text: "Geometric and document consistency checked before submission.",
      },
      {
        title: "Review and revisions",
        text: "Engineer and fabricator comments incorporated; revisions re-issued.",
      },
    ],
    review:
      "Coordinated structural steel detailing helps project and fabrication teams identify interface issues, maintain member and assembly identification and minimise avoidable discrepancies between models, shop drawings and material documentation. Changes are reviewed against the agreed design basis and incorporated through controlled model and drawing revisions. Deliverables remain subject to the review and approval responsibilities assigned under the project contract.",
    responsibility:
      "The structural designer or connection designer remains responsible for engineering design decisions and calculations unless a separately qualified design scope is expressly contracted. A steel detailer's production checks do not remove the engineer's or fabricator's contractual reviews.",
    boundaries: [
      "Connection engineering design and calculations",
      "Fabrication, welding or erection works",
      "Lifting design and temporary works",
      "Construction supervision",
      "Independent certification",
    ],
    boundaryNote:
      "Connections are detailed from the engineer's connection design. A standalone model without drawings is scoped under 3D Structural Modelling & Plant Model Support.",
    faqs: [
      {
        q: "Can you detail steel connections?",
        a: "Yes. Detailing of engineer-provided or approved connection requirements can be included. Connection engineering calculations and design approval are scoped separately and not assumed.",
      },
      {
        q: "What do you deliver to a fabricator?",
        a: "Depending on scope: the model, assembly drawings, single-part drawings, erection documentation, BOM / MTO, bolt lists and agreed exchange or machine files.",
      },
      {
        q: "Can you use a fabricator's drawing templates?",
        a: "Project-specific marks, title blocks, numbering, detailing preferences and submission conventions can be assessed and incorporated when compatible and agreed.",
      },
      {
        q: "Can you handle changes after shop drawing review?",
        a: "Yes, within the agreed review and revision scope. Changes and rework outside the original inputs are managed both technically and commercially.",
      },
    ],
    related: [
      {
        service: "plant-structural-3d-modelling",
        text: "Model-only assignments and coordination.",
      },
      {
        service: "brownfield-structural-modifications",
        text: "Replacement and modification steel for existing plant.",
      },
      {
        service: "material-takeoffs-documentation",
        text: "Standalone steel MTO, BOM and schedules.",
      },
      {
        application: "pipe-racks",
        text: "Drawings and models typically produced for pipe racks.",
      },
    ],
    cta: "Request a steel detailing proposal. Send approved structural drawings, connection information, project or fabricator standards, approximate tonnage or drawing volume, and the required issue programme.",
    seo: {
      title: "Structural Steel Detailing & Shop Drawings",
      description:
        "Steel assembly, single-part and erection drawings, approved connection detailing and material schedules for fabricators and EPC projects.",
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
      "Concrete structural details, foundation and equipment-base drawings, reinforcing-bar placing details and bar bending schedules (BBS), based on approved concrete design and project detailing requirements.",
    intro: [
      "We prepare reinforced concrete (RCC) and rebar detailing documentation from approved structural design information for energy and industrial project packages.",
      "Work can include foundation and equipment-base details, beams, columns, slabs and pedestals, reinforcement layouts and placing drawings, embedded-item interfaces and bar bending schedules.",
      "The drawing set communicates the approved concrete geometry and reinforcement requirements clearly to construction and reinforcement supply teams. Bar marks, schedules, sections and revisions are coordinated to the project's detailing rules, drawing conventions and reinforcement standards. The structural designer keeps responsibility for reinforcement design, structural adequacy and engineering approval unless the contract defines otherwise.",
    ],
    fit: [
      "Downstream of approved concrete and reinforcement design. The designer specifies bar sizes, spacing, cover, laps and anchorage; we detail and schedule them so they can be fixed on site and supplied.",
      "Concrete arrangement drawings without reinforcement sit under Civil & Structural Engineering Drafting. Where the steel a foundation supports is also being detailed, pedestals and embedded items are coordinated so both packages describe the same interface.",
    ],
    highlights: [
      "Foundation and equipment-base details",
      "Concrete member drawings",
      "Reinforcement placing drawings",
      "Bar bending schedules",
      "Concrete and rebar quantities",
    ],
    deliverableType: "RCC drawings, rebar details and BBS",
    coreScope: [
      {
        items: [
          "Reinforced concrete (RCC) structural drawings",
          "Concrete foundation plans, sections and details",
          "Equipment foundations, bases and plinths",
          "Column, beam and slab drawings from approved design information",
          "Concrete structural arrangements for industrial facilities",
          "Reinforcement detailing",
          "Bar bending schedules (BBS)",
          "Reinforcement and concrete quantity schedules",
          "Foundation layouts, levels, dimensions and setting-out details",
          "Substation foundations and equipment bases",
          "Concrete support and base drawings",
          "Steel-to-concrete interface details",
          "Anchor-bolt and embedded-item layouts, where specified in approved design information",
          "Existing concrete structure drawing updates",
          "Concrete structural modification drawings",
          "Concrete material take-offs and reinforcement quantity documentation",
          "As-built concrete drawings based on verified site records",
        ],
      },
    ],
    subserviceGroups: [
      {
        items: [
          {
            id: "S04.1",
            title: "Concrete design-input review and arrangement confirmation",
            description:
              "Approved concrete dimensions, structural notes, reference grids, reinforcement design information and vendor, anchor and embedment data checked before detailing.",
          },
          {
            id: "S04.2",
            title: "Foundation, equipment base and pedestal detailing",
            description:
              "Concrete foundation outlines, sections, plinths, pedestals and equipment-base details prepared from approved design requirements.",
          },
          {
            id: "S04.3",
            title: "Concrete member detailing",
            description:
              "Approved concrete beams, columns, slabs, walls, pits and other structural concrete elements within the agreed scope.",
          },
          {
            id: "S04.4",
            title: "Reinforcement layouts and rebar detailing",
            description:
              "Bar arrangements, spacing, reinforcement sections, bends, laps, anchorage and bar references detailed consistently with the designer's instructions.",
          },
          {
            id: "S04.5",
            title: "Embedded items and steel-to-concrete interfaces",
            description:
              "Specified anchor bolt settings, embedded plates, sleeves and structural interface references coordinated. Anchor design is not implied.",
          },
          {
            id: "S04.6",
            title: "Rebar placing drawings",
            description: "Site-usable reinforcement placing plans, sections, schedules, bar marks and placement notes.",
          },
          {
            id: "S04.7",
            title: "Bar bending schedules (BBS)",
            description:
              "Shape, size, length and quantity lists prepared to the contractual scheduling convention and the applicable bending standard.",
          },
          {
            id: "S04.8",
            title: "Reinforcement quantity and drawing revisions",
            description:
              "Schedules and quantities updated after approved changes, with linked drawings and mark-ups cross-checked.",
          },
        ],
      },
    ],
    inputs: [
      "Approved concrete drawings or reinforcement design information",
      "Rebar specifications with cover, lap and anchorage requirements",
      "Owner or EPC detailing standards",
      "Required BBS format and scheduling convention",
      "Anchor, embedment and vendor interface drawings",
      "Comments and approved design revisions",
    ],
    outputs: [
      "Concrete arrangement and detail drawings",
      "Rebar placing plans, elevations and sections",
      "Bar bending schedules with bar marks and quantities",
      "Interface and embedded-item details",
      "Updated native / PDF drawings and BBS revisions",
    ],
    applications: [
      "Industrial equipment foundations",
      "Pipe rack foundations",
      "Pedestals and plinths",
      "Concrete slabs and frames",
      "Utility and substation equipment bases",
      "Existing foundation modifications, from approved design",
      "RCC members of industrial facilities",
    ],
    tags: ["RCC", "Greenfield", "Brownfield"],
    requirements: [
      {
        title: "Reinforcement Design Information",
        text: "Bar sizes, spacing, cover, laps and anchorage are taken from the designer's approved information; detailing does not set them.",
      },
      {
        title: "Bar Scheduling Convention",
        text: "Shape codes, bending dimensions and schedule format follow the convention the project specifies, for example BS 8666 or ACI practice.",
      },
      {
        title: "Owner / EPC Detailing Standards",
        text: "Drawing presentation, bar marking, notes and numbering follow the project's detailing rules.",
      },
      {
        title: "Interfaces & Revisions",
        text: "Anchor bolts, embedded plates and sleeves follow the issued vendor and steel drawings; drawings and BBS are revised together.",
      },
    ],
    standardsRefs: ["aci-318", "aci-315", "bs-8666", "eurocodes", "client-project"],
    standardsNote:
      "Reinforcement is detailed and scheduled to the concrete and bar-scheduling standards specified for the project, for example ACI or BS practice.",
    software: {
      tools: ["AutoCAD"],
      formats: ["DWG", "PDF", "BBS as spreadsheet or PDF"],
      note: "RCC drawings and schedules are produced to the project's CAD standards; the platform and version are confirmed during scope review.",
    },
    workflow: [
      {
        title: "Confirm design basis",
        text: "Approved concrete and reinforcement information confirmed.",
      },
      {
        title: "Element geometry",
        text: "Foundations, bases and members drawn with their sections.",
      },
      {
        title: "Rebar and interfaces",
        text: "Bars detailed and embedded items coordinated from the design.",
      },
      {
        title: "Placing drawings",
        text: "Site-usable placing plans, sections and bar marks produced.",
      },
      {
        title: "BBS and quantities",
        text: "Schedules and quantities prepared from the placing drawings.",
      },
      {
        title: "Consistency checks",
        text: "Drawings and BBS checked against each other and the design.",
      },
      {
        title: "Issue and revise",
        text: "Submitted for review; drawings and schedules revised together.",
      },
    ],
    review:
      "Drawings and bar bending schedules are checked against each other, bar mark by bar mark, and against the approved reinforcement design before issue. Review comments are incorporated and the drawings, BBS and quantities are revised together. Producing a BBS does not constitute structural design approval.",
    responsibility:
      "This is detailing and documentation derived from the qualified designer's approved inputs. Reinforcement design, foundation design and concrete structural adequacy remain with the responsible designer, and the designer's reinforcement information stays distinct from the placing and fabrication documents we produce.",
    boundaries: [
      "Structural and foundation design",
      "Reinforcement design decisions",
      "Soil and geotechnical design",
      "Design approvals",
    ],
    boundaryNote:
      "Arrangement drawings without reinforcement sit under Civil & Structural Engineering Drafting; separately purchased quantity reconciliation under Material Take-Offs, BOM & Engineering Documentation.",
    faqs: [
      {
        q: "Is this structural foundation design?",
        a: "Not by default. It is detailing and documentation derived from the qualified designer's approved inputs.",
      },
      {
        q: "Can you produce a BBS on its own?",
        a: "A separately defined BBS package can be assessed, based on suitable approved drawings and the scheduling rules for the project.",
      },
      {
        q: "Can you match our regional standards?",
        a: "The applicable project requirements and the BBS and detailing conventions are evaluated against your specification during the RFQ, for example BS 8666 or ACI practice.",
      },
      {
        q: "Do you coordinate concrete with the steelwork it supports?",
        a: "Where the drawings support it, pedestals, bases and embedded items are coordinated with the supported steelwork so both packages describe the same interface.",
      },
    ],
    related: [
      {
        service: "civil-structural-drafting",
        text: "Concrete and foundation arrangement drawings.",
      },
      {
        service: "material-takeoffs-documentation",
        text: "Concrete and rebar quantity reconciliation.",
      },
      {
        application: "foundations",
        text: "Foundations, pedestals and equipment bases by structure type.",
      },
    ],
    cta: "Need reinforced concrete details or BBS for foundations, equipment bases or structural members? Send the approved concrete and reinforcement design, project detailing rules and expected deliverables.",
    seo: {
      title: "Reinforced Concrete & Rebar Detailing",
      description:
        "Equipment foundation details, reinforcement placing drawings, rebar schedules and bar bending schedules from approved concrete design information.",
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
      "Drawings and model updates for existing facilities, including replacement steelwork, equipment-support changes, structural interfaces and existing, removed and new work. Records are updated from authorised, verified field information.",
    intro: [
      "Existing onshore and offshore facilities often need structural changes while relying on drawing records, survey information and models from earlier project stages.",
      "We support agreed brownfield modification work by preparing existing-condition, removal and proposed-work drawings, replacement steel details, structural model updates, material schedules and final record-drawing updates based on approved engineering inputs.",
      "Brownfield documentation depends on knowing the difference between documented, observed and approved conditions. We work from available record drawings and verified site information, identify discrepancies for client resolution, and clearly distinguish existing, removed and new work within the agreed drawing conventions. Structural integrity assessment, fitness-for-service decisions and engineering approval are separate responsibilities unless specifically resourced and contracted.",
    ],
    fit: [
      "A packaged service for existing facilities. It brings drafting, modelling, steel, concrete and quantity deliverables together around one approved modification, so existing, removed and new work stay consistent across the package.",
      "It sits downstream of the approved modification or repair design and of verified site information supplied by the client or responsible site engineer. Each component deliverable remains defined by its own service.",
    ],
    highlights: [
      "Existing records review",
      "Existing, removed and new work",
      "Modification drawings and models",
      "Revised quantities and interfaces",
      "As-built updates from verified records",
    ],
    deliverableType: "Modification package for existing plant",
    coreScope: [
      {
        items: [
          "Review and updating of existing structural drawings and models",
          "Documentation of existing structures from supplied or verified information",
          "Structural modification and replacement drawings",
          "New members, secondary steel and structural supports",
          "Equipment-support modification and replacement drawings",
          "Cable tray support modification and replacement",
          "Structural documentation for approved pipeline rerouting or relocation",
          "Rehabilitation, reinstatement and strengthening-related drawing updates",
          "Drawing revisions for operating and live facilities",
          "Greenfield-to-existing-facility interface documentation",
          "Existing-versus-proposed drawing comparisons",
          "Redline and markup incorporation",
          "Approved engineering change updates",
          "Revised structural models and drawings",
          "Updated material take-offs and component schedules",
          "As-built drawing preparation based on verified site records",
          "Removal or demolition-related structural drawings from approved engineering information",
        ],
      },
    ],
    subserviceGroups: [
      {
        items: [
          {
            id: "S05.1",
            title: "Existing-condition drawing and model review",
            description:
              "Available approved record drawings, plant structural models, photographs, surveys and mark-ups examined; inconsistencies needing confirmation identified.",
          },
          {
            id: "S05.2",
            title: "Existing, removal and proposed scope identification",
            description:
              "Retained, removed, modified and new elements differentiated on layouts and drawings as defined by the approved scope.",
          },
          {
            id: "S05.3",
            title: "Structural alteration and replacement documentation",
            description:
              "Engineer-approved member additions and replacements, bracing and plate alterations, and platform and access steel modifications documented.",
          },
          {
            id: "S05.4",
            title: "Equipment, pipe and cable tray support modifications",
            description:
              "Approved support moves, replacements, extensions and structural interfaces relevant to plant changes.",
          },
          {
            id: "S05.5",
            title: "Rehabilitation and reinstatement detailing",
            description:
              "Modification and reinstatement documentation prepared from approved integrity or repair engineering decisions. The drawings are not an integrity certification.",
          },
          {
            id: "S05.6",
            title: "Existing model and drawing revision updates",
            description:
              "Suitable CAD, Tekla or legacy models updated to reflect approved changes, keeping coordinates and revisions consistent.",
          },
          {
            id: "S05.7",
            title: "Tie-in / interface documentation and revised MTO",
            description:
              "Approved interfaces to retained works detailed, relevant field constraints identified and material updates prepared.",
          },
          {
            id: "S05.8",
            title: "As-built / record drawing updates",
            description:
              "Validated final field mark-ups and client-authorised construction records incorporated. Unresolved assumptions remain flagged.",
          },
        ],
      },
    ],
    inputs: [
      "Existing GA and as-built drawings and models",
      "Verified survey data, photographs and site mark-ups",
      "Discrepancies register, where one exists",
      "Approved modification or repair design decisions",
      "Shutdown and tie-in constraints",
      "Plant, equipment and piping references",
      "Verified completion and redline records",
    ],
    outputs: [
      "Existing / removal / proposed plans and sections",
      "Structural modification and replacement details",
      "Updated compatible models",
      "Coordinated drawing revisions",
      "Revised MTO / BOM and interface notes",
      "As-built and record updates, where contracted",
    ],
    applications: [
      "Existing steel structures",
      "Pipe racks and pipe supports",
      "Pipeline and flowline supports",
      "Equipment support structures",
      "Cable tray supports",
      "Platforms and access structures",
      "Replacement and reinstatement steel",
    ],
    tags: ["Brownfield", "Steel", "RCC", "Onshore", "Offshore"],
    requirements: [
      {
        title: "Owner Facility Specifications",
        text: "Modifications follow the owner's facility specifications, existing drawing conventions and the approved modification design.",
      },
      {
        title: "Existing / Removed / New Conventions",
        text: "Legends, line styles and notes that distinguish retained, removed and new work are agreed before drawing starts.",
      },
      {
        title: "Site Verification",
        text: "Existing conditions are taken from verified information supplied by the client. Unverified assumptions are flagged, never presented as site fact.",
      },
      {
        title: "Tie-Ins, Shutdowns & Revisions",
        text: "Tie-in points, shutdown constraints and the issue sequence are recorded alongside the drawing and model revisions.",
      },
    ],
    standardsRefs: ["client-project", "aisc-360", "aci-318", "iso-19902"],
    standardsNote:
      "Modifications follow the owner's facility specifications and the approved modification design. Offshore standards apply where the asset and contract require them.",
    software: {
      tools: ["Tekla Structures", "AutoCAD", "Navisworks"],
      formats: ["DWG", "Native Tekla model", "PDF"],
      note: "Navisworks model review supports interface checks against the existing plant model where one is provided.",
    },
    workflow: [
      {
        title: "Existing records",
        text: "Drawings, models and registers gathered and their status confirmed.",
      },
      {
        title: "Verified site information",
        text: "Site data incorporated; discrepancies logged for client verification.",
      },
      {
        title: "Approved modification basis",
        text: "Modification or repair decisions confirmed by the responsible engineer.",
      },
      {
        title: "Existing, removed and new",
        text: "Retained, removed and new work differentiated on the drawings.",
      },
      {
        title: "Details and model updates",
        text: "Modification details produced and models updated.",
      },
      {
        title: "Checks and controlled issue",
        text: "Interfaces and MTO checked; package reviewed and issued.",
      },
      {
        title: "Verified as-builts",
        text: "Records updated from verified completion information.",
      },
    ],
    review:
      "Modification drawings are checked against the existing records, the verified site information and the approved modification basis, and interfaces to retained works are reviewed before issue. Discrepancies are recorded and returned to the client or responsible site engineer for verification rather than redrawn as fact. Final as-builts are updated only from verified completion records.",
    responsibility:
      "We document approved modification and repair decisions. Site verification, structural integrity assessment and fitness-for-service decisions are not carried out unless a distinct, qualified scope is contracted, and drawings prepared from approved repair engineering are not an integrity certification.",
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
        q: "What if the existing drawing is inconsistent with the site?",
        a: "The discrepancy is recorded and the client or responsible site engineer is asked to verify it. It is not silently redrawn as fact.",
      },
      {
        q: "Do you carry out structural integrity assessments?",
        a: "Not as part of drafting or model updates. That requires a distinct, authorised structural engineering scope.",
      },
      {
        q: "Can you produce modified support steel for a live plant?",
        a: "Yes, for a suitably scoped package with an approved design, site reference information, interfaces and the required issue and field conventions. Capacity for urgent or live-facility work is confirmed commercially.",
      },
      {
        q: "How are existing, removed and new members shown?",
        a: "Modification drawings distinguish existing, removed and new work with agreed legends, so site and fabrication teams can read the scope at a glance.",
      },
    ],
    related: [
      {
        service: "civil-structural-drafting",
        text: "Drawing revisions and redrafting.",
      },
      {
        service: "plant-structural-3d-modelling",
        text: "Existing-model revision and coordination.",
      },
      {
        service: "steel-detailing-fabrication",
        text: "Shop drawings for replacement steel.",
      },
      {
        service: "material-takeoffs-documentation",
        text: "Revised quantities for the modification.",
      },
    ],
    cta: "Have an existing pipe rack, platform or equipment-support modification? Send existing drawings, verified site data, approved modification information and the target issue sequence for scope review.",
    seo: {
      title: "Brownfield Structural Modifications & As-Builts",
      description:
        "Existing-facility structural drawing revisions, replacement supports, model updates, material changes and as-built records from verified site information.",
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
      "Structural steel quantities, bills of materials, member and bolt schedules, reinforcement quantities and revision-controlled drawing records, reconciled with the agreed source revision and measurement basis.",
    intro: [
      "We prepare structural quantity information and supporting drawing documentation for steel, concrete and reinforcement packages.",
      "Depending on the agreed source and measurement basis, assignments may include steel material take-offs, member, profile and plate lists, bolt schedules, bills of materials, reinforcement schedules and model-derived quantity reports. We also support drawing registers, review-comment incorporation, revision records and native and PDF package preparation.",
      "For quantities to be useful, the governing drawing or model revision, units, inclusions, exclusions and treatment of changes must be clear. Production-level drawing and model checks support consistency within the agreed scope, but they are not independent structural design verification or commercial quantity certification.",
    ],
    fit: [
      "Available standalone, or as embedded deliverables within other services when contracted. Every quantity and register depends on an issued source revision, so the source and measurement basis are agreed before extraction.",
      "Bar bending schedules originate in Reinforced Concrete & Rebar Detailing; this service can compile and reconcile them for procurement. The company-wide checking process is described on the Quality & Delivery page.",
    ],
    highlights: [
      "Steel MTO and BOM",
      "Concrete and rebar quantities",
      "Drawing and deliverable registers",
      "Comment and revision logs",
      "Transmittals and handover packages",
    ],
    deliverableType: "Quantities, registers and controlled document packages",
    coreScope: [
      {
        heading: "Material Take-Offs, BOMs & Quantities",
        items: [
          "Structural steel material take-offs",
          "Member, plate, profile and component quantities",
          "Bolts, connection components and associated material lists",
          "Bills of materials (BOMs)",
          "Part-mark and assembly schedules",
          "Model-based quantity extraction",
          "Concrete quantity take-offs",
          "Reinforcement quantities and bar bending schedules",
          "Material schedules for structural fabrication and procurement",
          "Drawing-to-quantity cross-checks",
          "MTO checking and reconciliation",
          "Quantity updates following approved drawing or model revisions",
          "Revised material lists for modifications and replacement steelwork",
          "Quantity reports in agreed spreadsheet or model-report formats",
        ],
      },
      {
        heading: "Drawing Review, Production Checking & Document Control",
        items: [
          "Drawing completeness checks",
          "Dimension, annotation, note and reference consistency checks",
          "Drawing-to-model consistency checks",
          "Cross-checks of drawings against material schedules",
          "Drawing numbering and revision identification",
          "Drawing register preparation and updating",
          "Revision tracking and issue-status coordination",
          "Incorporation and tracking of review comments and markups",
          "Drawing comparisons to identify revisions",
          "Drawing-package compilation",
          "PDF markup and drawing review support",
          "Title-block and client drafting-standard compliance checks",
          "File naming and deliverable organisation",
          "Technical document formatting",
          "Transmittal preparation and issue-package coordination",
          "Preparation of agreed PDF, CAD and model deliverables",
          "Coordination of drawing, model and material-schedule revisions",
        ],
      },
    ],
    coreScopeNote:
      "These are production-level checks and document-control services; they do not replace independent engineering verification, formal design approval or professional certification.",
    subserviceGroups: [
      {
        heading: "Structural Quantities & Material Documentation",
        items: [
          {
            id: "S06.A1",
            title: "Quantity basis and source-revision confirmation",
            description:
              "Issued drawings or models, units, measurement method, exclusions and the required report structure agreed first.",
          },
          {
            id: "S06.A2",
            title: "Structural steel MTO and member schedules",
            description:
              "Lengths, counts, sectional weights where defined, and grade and member identification from the source information.",
          },
          {
            id: "S06.A3",
            title: "Plate, bolt and component lists",
            description:
              "Drawing- or model-derived plate, bracket, bolt and connection material schedules where the source information is adequate.",
          },
          {
            id: "S06.A4",
            title: "Bills of materials (BOM) and model reports",
            description:
              "Assembly- and member-based material reports with consistent marks, units and source revision.",
          },
          {
            id: "S06.A5",
            title: "Concrete and reinforcement quantity documentation",
            description:
              "Measurable concrete volumes and reinforcement and BBS-related quantity schedules based on defined input revisions.",
          },
          {
            id: "S06.A6",
            title: "Quantity reconciliation and revisions",
            description:
              "Reports compared with the drawings and updated after approved changes, recording the basis and superseded versions.",
          },
        ],
      },
      {
        heading: "Drawing & Deliverable Administration",
        items: [
          {
            id: "S06.B1",
            title: "Drawing registers and deliverable lists",
            description: "Document IDs, titles, issue dates, revisions, purpose of issue and agreed status codes.",
          },
          {
            id: "S06.B2",
            title: "CAD standardisation and document formatting",
            description: "Client template conformity, naming, annotation, title blocks and references.",
          },
          {
            id: "S06.B3",
            title: "Review comment and redline incorporation",
            description: "Authorised changes incorporated with a checkable revision history.",
          },
          {
            id: "S06.B4",
            title: "Transmittals and final handover packages",
            description: "Agreed native and PDF files, registers, lists and technical documentation.",
          },
        ],
      },
      {
        heading: "Production Checks, Only When Expressly Included",
        items: [
          {
            id: "S06.C1",
            title: "Drawing completeness and reference consistency",
            description:
              "Sheets, references, dimensions and title-block information checked. This is not independent engineering approval.",
          },
          {
            id: "S06.C2",
            title: "Model-to-drawing comparison",
            description: "Drawings compared with the model revision they were extracted from.",
          },
          {
            id: "S06.C3",
            title: "Member and list reconciliation",
            description: "Member and list quantities reconciled to source; approved comments confirmed closed.",
          },
          {
            id: "S06.C4",
            title: "Deliverable-package checking",
            description: "Package contents, revisions and transmittals verified before issue.",
          },
        ],
      },
    ],
    inputs: [
      "Approved drawing or model issue with its revision",
      "Agreed quantity and measurement basis",
      "Material grades and unit conventions",
      "Concrete and rebar detail drawings",
      "Client numbering, review and transmittal requirements",
    ],
    outputs: [
      "Steel MTO and member, plate and component reports",
      "BOM and bolt lists, where source data allows",
      "Concrete quantities and reinforcement schedules",
      "Drawing registers and revision logs",
      "Comment logs and native / PDF issue packages",
    ],
    applications: [
      "EPC detailed engineering packages",
      "Fabricator drawing packages",
      "Brownfield record updates",
      "Documentation backlogs",
    ],
    tags: ["Steel", "RCC", "Greenfield", "Brownfield"],
    requirements: [
      {
        title: "Measurement Basis",
        text: "Units, measurement method, inclusions, exclusions and rounding are agreed before extraction and stated on every schedule.",
      },
      {
        title: "Source Revision",
        text: "Each schedule names the drawing or model revision it was taken from; superseded versions are recorded, not overwritten.",
      },
      {
        title: "Document Control Procedure",
        text: "Numbering, status codes, purpose of issue, review cycles and transmittals follow the client's document control procedure.",
      },
      {
        title: "Formats & Report Structure",
        text: "Report layout, spreadsheet structure and native / PDF handover follow the agreed format.",
      },
    ],
    standardsRefs: ["client-project", "bs-8666"],
    standardsNote:
      "Quantities follow the project's measurement rules; registers and transmittals follow the client's document control procedure.",
    software: {
      tools: ["AutoCAD", "Tekla Structures"],
      formats: ["Spreadsheet schedules (XLSX / CSV)", "PDF", "DWG"],
      note: "Model-based quantities depend on access to the source model and version, confirmed during scope review.",
    },
    workflow: [
      {
        title: "Agree basis",
        text: "Measurement rules, report structure and register format agreed.",
      },
      {
        title: "Validate source revision",
        text: "Governing drawing or model revision confirmed.",
      },
      {
        title: "Extract and prepare",
        text: "Quantities and documentation prepared from the source.",
      },
      {
        title: "Reconcile",
        text: "Quantities reconciled against the model and drawings.",
      },
      {
        title: "State assumptions",
        text: "Exclusions and assumptions annotated on the schedule.",
      },
      {
        title: "Revision-tagged issue",
        text: "Schedules and records issued with their source revision.",
      },
      {
        title: "Update after changes",
        text: "Re-issued after approved revisions, superseded versions kept.",
      },
    ],
    review:
      "Schedules are reconciled against the drawings or model they were taken from before issue, and comment logs track each review comment to closure. Where production checks are contracted, the checklist used and its findings are recorded with the package. No independent quantity-surveyor or commercial certification is implied.",
    responsibility:
      "Quantities and documentation are prepared from the client's issued sources and the agreed measurement basis. Procurement quantities, commercial certification and engineering verification remain with the client's responsible parties.",
    boundaries: [
      "Quantity surveying certification",
      "Engineering verification",
      "Commercial procurement approval",
      "Statutory certification",
    ],
    boundaryNote:
      "Production checking of every package is described on the Quality & Delivery page. Bar bending schedules originate in Reinforced Concrete & Rebar Detailing; this service can compile and reconcile them for procurement.",
    faqs: [
      {
        q: "Is the MTO taken from a 3D model or 2D drawings?",
        a: "Either can be assessed. The method and accuracy depend on how complete the source is, which is reviewed before the basis is agreed.",
      },
      {
        q: "Do you certify procurement quantities?",
        a: "No. No independent quantity-surveyor or commercial certification is implied; quantities are reported against their stated source and basis.",
      },
      {
        q: "Can you manage revision and documentation backlogs?",
        a: "Yes, where the scope and the document-control interfaces are agreed, including revision status, transmittals and native / PDF handover.",
      },
      {
        q: "Can you check drawings produced by another team?",
        a: "We can carry out production-level documentation checks: completeness, references, model-to-drawing consistency and quantity reconciliation. Formal independent engineering verification is not part of this service.",
      },
    ],
    related: [
      {
        service: "plant-structural-3d-modelling",
        text: "Model-based quantity sources.",
      },
      {
        service: "steel-detailing-fabrication",
        text: "Steel quantities and lists from the detailing model.",
      },
      {
        service: "rcc-reinforcement-detailing",
        text: "Where bar bending schedules originate.",
      },
      {
        href: "/quality-delivery",
        label: "Quality & Delivery",
        text: "Checking, revision control and handover.",
      },
    ],
    cta: "Share your drawing or model package, current revision, required material categories and reporting format to request structural MTO, BOM or documentation support.",
    seo: {
      title: "Structural MTO, BOM & Engineering Documentation",
      description:
        "Structural steel material take-offs, bills of materials, quantity reports, drawing registers and controlled revision documentation.",
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

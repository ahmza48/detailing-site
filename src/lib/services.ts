export type ServiceSlug =
  | "onshore-civil-structural-design-detailing"
  | "offshore-structural-design-detailing"
  | "brownfield-structural-modifications"
  | "steel-detailing-fabrication"
  | "rcc-reinforcement-detailing"
  | "plant-structural-3d-modelling"
  | "structural-drawings-mto-qaqc";

export type Service = {
  slug: ServiceSlug;
  /** Full category name, used in navigation, headings and the enquiry form. */
  title: string;
  /** Hero heading split so the second part can carry the accent colour. */
  heading: [string, string];
  /** Anchor of the matching case study on /project-experience. */
  projectAnchor: string;
  image: string;
  imageAlt: string;
  summary: string;
  intro: string[];
  /** 3–5 representative capabilities for overview listings. */
  highlights: string[];
  deliver: { title: string; description: string }[];
  /** A section unique to each service so the pages do not read as a template. */
  focus: { eyebrow: string; heading: string; body: string; points: string[] };
  applications: string[];
  deliverables: string[];
  software?: { tools: string[]; note: string };
  seo: { title: string; description: string; keywords: string[] };
};

export const services: Service[] = [
  {
    slug: "onshore-civil-structural-design-detailing",
    title: "Onshore Civil & Structural Design & Detailing",
    heading: ["Onshore Civil & Structural", "Design & Detailing"],
    projectAnchor: "onshore-civil-structural",
    image: "/images/onshore-pipe-rack.jpg",
    imageAlt: "Steel pipe rack and process structures at an onshore plant",
    summary:
      "Steel and concrete design support and detailing for pipe racks, pipe bridges, platforms, equipment supports and industrial plant buildings.",
    intro: [
      "Onshore energy facilities depend on a large volume of steel and concrete structures that have to be coordinated with piping, equipment and electrical layouts. We provide the design support and detailing that turns those layouts into clear, buildable structural deliverables.",
      "Our senior team's experience covers industrial structural detailing for refineries, gas processing and oil & gas facilities, including pipe rack detailing, pipe bridge detailing, process platform detailing and equipment support detailing.",
    ],
    highlights: [
      "Pipe racks and pipe bridges",
      "Process and access platforms",
      "Equipment support and skid structures",
      "Industrial plant buildings and sheds",
      "Reinforced concrete structures",
    ],
    deliver: [
      {
        title: "Steel & concrete structural design support",
        description:
          "Design support alongside the responsible engineering team: developing structural layouts, framing and details from design inputs and project standards.",
      },
      {
        title: "Pipe racks and pipe bridges",
        description:
          "Arrangement and detail drawings for multi-tier racks, pipe bridges and crossover structures, coordinated with piping and cable tray routing.",
      },
      {
        title: "Platforms and access structures",
        description:
          "Process platforms, access platforms, stairs, ladders and handrailing detailed for fabrication and safe operation and maintenance access.",
      },
      {
        title: "Equipment support structures",
        description:
          "Support frames, equipment skid structures and cable tray supports detailed around vendor data and equipment layouts.",
      },
      {
        title: "Plant buildings and concrete structures",
        description:
          "Industrial plant buildings, structural frames, sheds, reinforced concrete structures and substation base detailing.",
      },
    ],
    focus: {
      eyebrow: "Coordination",
      heading: "Detailing that follows the plant, not the other way round",
      body: "Onshore structures rarely stand alone. Racks carry piping and cable trays, platforms wrap equipment, and foundations follow vendor data that changes late. Our detailing is organised around those interfaces so that revisions are absorbed in a controlled way.",
      points: [
        "Structures developed against current piping, equipment and electrical layouts",
        "Steel and RCC interfaces checked at base plates, pedestals and embedded items",
        "Material take-off issued in step with drawing revisions",
      ],
    },
    applications: [
      "Industrial steel structures",
      "Pipe racks",
      "Pipe bridges",
      "Process platforms",
      "Access platforms",
      "Equipment support structures",
      "Equipment skid structures",
      "Cable tray support structures",
      "Industrial plant buildings",
      "Structural frames",
      "Stairs",
      "Ladders",
      "Access structures",
      "Industrial sheds",
      "Reinforced concrete structures",
      "Substation bases",
    ],
    deliverables: [
      "General arrangement drawings",
      "Structural steel arrangement and detail drawings",
      "RCC arrangement and detail drawings",
      "Structural layouts",
      "Material take-off (MTO)",
      "3D structural models",
    ],
    software: {
      tools: ["Tekla Structures", "AutoCAD", "PDS", "Frameworks Plus", "MicroStation", "Navisworks"],
      note: "Delivered in the modelling and drawing environment specified for the project.",
    },
    seo: {
      title: "Onshore Civil & Structural Design & Detailing",
      description:
        "Industrial structural detailing for onshore energy facilities: pipe rack detailing, pipe bridge detailing, process platform detailing and equipment support detailing in steel and RCC.",
      keywords: [
        "industrial structural detailing",
        "pipe rack detailing",
        "pipe bridge detailing",
        "process platform detailing",
        "equipment support detailing",
      ],
    },
  },
  {
    slug: "offshore-structural-design-detailing",
    title: "Offshore Structural Design & Detailing",
    heading: ["Offshore Structural", "Design & Detailing"],
    projectAnchor: "offshore-structural",
    image: "/images/offshore-platform.jpg",
    imageAlt: "Offshore platform topsides and steelwork lit at night",
    summary:
      "Offshore structural modelling, steel detailing and shop drawing production for platforms, access structures and offshore modifications.",
    intro: [
      "Offshore structures are fabricated onshore, to tight tolerances, and installed where rework is expensive. The detailing has to be right before steel is cut.",
      "Our senior team's offshore structural detailing experience was gained within established offshore EPC and fabrication environments, producing detailed drawings, shop drawings and models for offshore platforms and their modifications.",
    ],
    highlights: [
      "Offshore structural modelling",
      "Offshore steel detailing",
      "Shop and fabrication drawings",
      "Offshore structural modifications",
      "MTO",
    ],
    deliver: [
      {
        title: "Offshore structural modelling",
        description:
          "3D modelling of offshore steelwork as the basis for arrangement drawings, shop drawings and material take-off.",
      },
      {
        title: "Offshore steel detailing",
        description:
          "Detailed drawings for platform steelwork and access structures, prepared to project specifications and fabrication yard practice.",
      },
      {
        title: "Shop and fabrication drawings",
        description:
          "Assembly and single-part drawings that give the fabrication yard the information needed to cut, fit and weld.",
      },
      {
        title: "Offshore modifications and brownfield support",
        description:
          "Structural modifications to existing offshore facilities, including updates to existing structural models.",
      },
    ],
    focus: {
      eyebrow: "Scope clarity",
      heading: "Detailing and modelling support for offshore steelwork",
      body: "Our offshore scope is structural modelling, detailing and drawing production. We work from the design issued by the responsible engineering organization and convert it into fabrication-ready information.",
      points: [
        "Detailing driven by issued design drawings and project specifications",
        "Existing structural models modified and kept current",
        "Drawings and MTO structured around fabrication sequence",
      ],
    },
    applications: [
      "Offshore platforms",
      "Platform deck steelwork",
      "Access structures",
      "Stairs, ladders and walkways",
      "Offshore structural modifications",
      "Brownfield offshore additions",
    ],
    deliverables: [
      "Detailed structural drawings",
      "Shop drawings",
      "Fabrication drawings",
      "Material take-off (MTO)",
      "Updated structural models",
    ],
    software: {
      tools: ["Tekla Structures", "AutoCAD"],
      note: "Tools used by senior team members on offshore structural detailing assignments.",
    },
    seo: {
      title: "Offshore Structural Design & Detailing",
      description:
        "Offshore structural detailing, offshore steel detailing and offshore structural drafting support: structural models, detailed drawings, shop drawings and MTO for offshore platforms.",
      keywords: [
        "offshore structural detailing",
        "offshore steel detailing",
        "offshore structural drafting",
      ],
    },
  },
  {
    slug: "brownfield-structural-modifications",
    title: "Brownfield Structural Modifications & Rehabilitation",
    heading: ["Brownfield Structural", "Modifications & Rehabilitation"],
    projectAnchor: "brownfield-modifications",
    image: "/images/brownfield-structure.jpg",
    imageAlt:
      "Existing refinery units with columns, piping and steel structures",
    summary:
      "Modification, rehabilitation and integrity reinstatement support for existing structures, with model updates and as-built drawing development.",
    intro: [
      "Most work on operating facilities is brownfield: structures that already exist, drawings that may not match what was built, and modifications that have to fit first time during limited shutdown windows.",
      "Brownfield structural modifications are a demonstrated strength of our senior team, with rehabilitation and integrity reinstatement experience on producing onshore fields and existing plant.",
    ],
    highlights: [
      "Existing structure modifications",
      "Structural rehabilitation",
      "Integrity reinstatement support",
      "Existing model updates",
      "As-built drawing development",
    ],
    deliver: [
      {
        title: "Existing structure modifications",
        description:
          "Modification drawings for existing steel structures, clearly distinguishing existing, removed and new members.",
      },
      {
        title: "Rehabilitation and integrity reinstatement support",
        description:
          "Structural rehabilitation drawings and supporting detail for integrity reinstatement programmes on ageing assets.",
      },
      {
        title: "Pipeline and flowline support modifications",
        description:
          "Structural support modifications for pipelines and flowlines, including replacement and strengthening of existing supports.",
      },
      {
        title: "Equipment replacement modifications",
        description:
          "Structural modifications to accommodate replacement equipment, revised loads and changed access requirements.",
      },
      {
        title: "Cable tray and support modifications",
        description: "Additions and changes to cable tray and secondary support steelwork on existing structures.",
      },
      {
        title: "Model updates and as-built drawings",
        description:
          "Existing model updates, brownfield drawing updates and as-built drawing development so records match the facility.",
      },
    ],
    focus: {
      eyebrow: "Why it matters",
      heading: "Existing structures demand a different discipline",
      body: "Brownfield packages succeed when the existing condition is understood before anything new is drawn. Our approach starts from the available records and survey information and makes every assumption visible on the drawing.",
      points: [
        "Existing, demolished and new steel clearly differentiated",
        "Tie-in details developed around what is physically on site",
        "Model review to confirm fit with surrounding plant",
        "As-builts closed out so the next modification starts from accurate records",
      ],
    },
    applications: [
      "Existing steel structures",
      "Pipe racks and pipe supports",
      "Pipeline and flowline supports",
      "Equipment support structures",
      "Cable tray supports",
      "Platforms and access structures",
    ],
    deliverables: [
      "Structural modification drawings",
      "Structural rehabilitation drawings",
      "Civil and steel structural drawings",
      "Updated 3D models",
      "As-built drawings",
      "Material take-off (MTO)",
    ],
    software: {
      tools: ["Tekla Structures", "AutoCAD", "Navisworks"],
      note: "Navisworks model review supports fit and coordination checks against the existing plant model.",
    },
    seo: {
      title: "Brownfield Structural Modifications & Rehabilitation",
      description:
        "Brownfield structural modifications, existing structure detailing and structural rehabilitation drawings for operating energy facilities, with model updates and as-built drawings.",
      keywords: [
        "brownfield structural modifications",
        "existing structure detailing",
        "structural rehabilitation drawings",
      ],
    },
  },
  {
    slug: "steel-detailing-fabrication",
    title: "Steel Detailing & Fabrication Drawings",
    heading: ["Steel Detailing &", "Fabrication Drawings"],
    projectAnchor: "steel-detailing",
    image: "/images/tekla-model.jpg",
    imageAlt: "Bolted structural steel connection where four members meet",
    summary:
      "Tekla Structures modelling, general arrangement, shop and fabrication drawings for industrial and energy-sector steelwork.",
    intro: [
      "Structural steel detailing services sit between the engineer's design and the fabricator's workshop. The model and drawings decide whether steel arrives on site and fits.",
      "We provide Tekla detailing services for industrial steel detailing scopes: pipe racks, platforms, stairs, ladders and plant buildings, with steel shop drawings and fabrication drawings extracted from a single coordinated model.",
    ],
    highlights: [
      "Tekla Structures 3D modelling",
      "General arrangement drawings",
      "Shop and fabrication drawings",
      "Pipe rack and platform detailing",
      "MTO",
    ],
    deliver: [
      {
        title: "Tekla Structures 3D modelling",
        description:
          "A coordinated steel model built from design drawings, used as the single source for drawings and material lists.",
      },
      {
        title: "General arrangement drawings",
        description: "Plans, elevations and sections that locate every member and connection for erection.",
      },
      {
        title: "Shop and fabrication drawings",
        description:
          "Assembly and single-part drawings with dimensions, holes, cuts and weld information for the workshop.",
      },
      {
        title: "Rack, platform, stair and ladder detailing",
        description:
          "Pipe rack detailing, platform detailing, stair and ladder detailing and structural building details.",
      },
      {
        title: "Material take-off",
        description: "MTO generated from the model to support procurement and fabrication planning.",
      },
    ],
    focus: {
      eyebrow: "For fabricators & EPC teams",
      heading: "One model. Drawings that agree with each other.",
      body: "Steel detailing outsourcing only works when the output can be trusted without re-checking every sheet. Extracting arrangement drawings, shop drawings and MTO from one Tekla model keeps them consistent through revisions.",
      points: [
        "Energy-sector steel detailing for oil and gas and refinery structures",
        "Drawings and lists regenerated from the model at each revision",
        "Detailing aligned to project specifications and fabricator practice",
      ],
    },
    applications: [
      "Pipe racks",
      "Process and access platforms",
      "Stairs and ladders",
      "Equipment support structures",
      "Industrial plant buildings",
      "Structural frames and sheds",
    ],
    deliverables: [
      "Tekla Structures 3D model",
      "General arrangement drawings",
      "Arrangement drawings",
      "Detailed structural drawings",
      "Shop drawings",
      "Fabrication drawings",
      "Material take-off (MTO)",
    ],
    software: {
      tools: ["Tekla Structures", "AutoCAD", "Navisworks"],
      note: "Tekla Structures is the primary steel detailing platform.",
    },
    seo: {
      title: "Structural Steel Detailing & Fabrication Drawings",
      description:
        "Structural steel detailing services for the energy sector: Tekla steel detailing, steel shop drawings, fabrication drawings and MTO for oil and gas and industrial steelwork.",
      keywords: [
        "structural steel detailing services",
        "steel detailing outsourcing",
        "Tekla detailing services",
        "Tekla steel detailing",
        "steel shop drawings",
        "fabrication drawings",
        "industrial steel detailing",
        "oil and gas steel detailing",
      ],
    },
  },
  {
    slug: "rcc-reinforcement-detailing",
    title: "RCC & Reinforcement Detailing",
    heading: ["RCC & Reinforcement", "Detailing"],
    projectAnchor: "rcc-detailing",
    image: "/images/rcc-detailing.jpg",
    imageAlt: "Reinforcement cages being fixed for a concrete structure",
    summary:
      "RCC arrangement and detail drawings, reinforcement detailing and bar bending schedules for industrial concrete structures.",
    intro: [
      "Concrete work on energy projects is governed by what it supports: steel columns, equipment, pipe racks and buildings. RCC detailing has to carry those requirements into reinforcement that can be fixed on site without clashes.",
      "We provide RCC detailing services covering arrangement drawings, reinforcement detailing and bar bending schedule preparation for industrial concrete detailing scopes.",
    ],
    highlights: [
      "RCC arrangement and detail drawings",
      "Reinforcement detailing",
      "Bar bending schedules",
      "RCC industrial structures",
      "Substation base detailing",
    ],
    deliver: [
      {
        title: "RCC arrangement drawings",
        description: "General arrangement of concrete structures showing geometry, levels and interfaces.",
      },
      {
        title: "RCC detail drawings",
        description: "Sections and details defining concrete outlines, joints and embedded items.",
      },
      {
        title: "Reinforcement detailing",
        description:
          "Rebar detailing with bar marks, spacing, laps and cover shown clearly for the fixing crew.",
      },
      {
        title: "Bar bending schedules",
        description: "Bar bending schedules prepared from the reinforcement drawings for cutting and bending.",
      },
    ],
    focus: {
      eyebrow: "Steel / RCC interface",
      heading: "Concrete detailed with the steel it carries in view",
      body: "Anchor bolts, base plates and embedded items are where steel and concrete packages most often disagree. Where the drawings support it, we coordinate RCC details against the steel arrangement so both packages describe the same interface.",
      points: [
        "Pedestals and bases coordinated with supported steelwork",
        "Reinforcement arranged to keep anchor and embedment zones workable",
        "Schedules that match the drawings bar for bar",
      ],
    },
    applications: [
      "Concrete structural buildings",
      "RCC industrial structures",
      "Pipe rack foundations and pedestals",
      "Equipment bases",
      "Substation bases",
    ],
    deliverables: [
      "RCC arrangement drawings",
      "RCC detail drawings",
      "Reinforcement drawings",
      "Bar bending schedules (BBS)",
    ],
    software: {
      tools: ["AutoCAD"],
      note: "RCC drawings and schedules are produced to the project's CAD standards.",
    },
    seo: {
      title: "RCC & Reinforcement Detailing",
      description:
        "RCC detailing services for industrial and energy projects: reinforcement detailing, rebar detailing and bar bending schedule services for concrete structures and foundations.",
      keywords: [
        "RCC detailing services",
        "reinforcement detailing",
        "rebar detailing",
        "bar bending schedule services",
        "industrial concrete detailing",
      ],
    },
  },
  {
    slug: "plant-structural-3d-modelling",
    title: "Plant Structural 3D Modelling",
    heading: ["Plant Structural", "3D Modelling"],
    projectAnchor: "plant-3d-modelling",
    image: "/images/plant-model.jpg",
    imageAlt: "Tall steel process structure with platforms and piping against a blue sky",
    summary:
      "Structural modelling inside plant design environments for refinery, oil & gas and process plant projects, including brownfield model updates.",
    intro: [
      "On energy projects the structural model is one discipline inside a shared plant model. Structures have to be modelled in the project's chosen environment, to its conventions, and kept current as other disciplines move.",
      "Our senior team's plant structural modelling experience spans Tekla structural modelling, PDS structural modelling and Frameworks Plus on refinery and process plant projects. This is industrial plant modelling, not architectural BIM.",
    ],
    highlights: [
      "Tekla structural modelling",
      "PDS and Frameworks Plus modelling",
      "Underground facility 3D modelling",
      "Brownfield model updates",
      "Navisworks model review",
    ],
    deliver: [
      {
        title: "Tekla structural modelling",
        description: "Steel structure models built for detailing and drawing extraction.",
      },
      {
        title: "PDS and Frameworks Plus modelling",
        description:
          "Structural modelling of steel and concrete structures within PDS-based plant models using Frameworks Plus.",
      },
      {
        title: "MicroStation drawings and modelling",
        description: "Structural drawings and modelling on MicroStation-based project standards.",
      },
      {
        title: "PDMS environments",
        description: "Exposure to structural modelling within PDMS project environments.",
      },
      {
        title: "Underground facility 3D modelling",
        description: "3D modelling of underground facilities so buried services and foundations are coordinated.",
      },
      {
        title: "Model modification and review",
        description:
          "Existing model modification, brownfield model updates and Navisworks model review and coordination.",
      },
    ],
    focus: {
      eyebrow: "Plant environments",
      heading: "Structural modelling inside the project's own platform",
      body: "EPC projects standardise on a plant design environment early. We model structures within that environment so the structural discipline stays visible to piping, equipment and electrical teams throughout design.",
      points: [
        "Positioned for energy, oil & gas, refinery and process plants",
        "Steel and concrete structures, pipe racks, platforms, stairs and ladders",
        "Arrangement drawings extracted from the model",
      ],
    },
    applications: [
      "Refinery units",
      "Oil & gas processing facilities",
      "Process plants",
      "Pipe racks and platforms",
      "Concrete and steel buildings",
      "Underground facilities",
    ],
    deliverables: [
      "Structural 3D models",
      "Steel structural arrangement drawings",
      "Updated and modified existing models",
      "Model review comments and coordination records",
    ],
    software: {
      tools: ["Tekla Structures", "PDS", "Frameworks Plus", "MicroStation", "PDMS", "Navisworks"],
      note: "Capabilities reflect the plant modelling environments used by senior team members on prior projects.",
    },
    seo: {
      title: "Plant Structural 3D Modelling",
      description:
        "Plant structural modelling for energy and process facilities: Tekla structural modelling, PDS structural modelling and Frameworks Plus industrial plant modelling with model review.",
      keywords: [
        "plant structural modelling",
        "Tekla structural modelling",
        "PDS structural modelling",
        "industrial plant modelling",
      ],
    },
  },
  {
    slug: "structural-drawings-mto-qaqc",
    title: "Structural Drawings, MTO & QA/QC",
    heading: ["Structural Drawings,", "MTO & QA/QC"],
    projectAnchor: "drawings-qaqc",
    image: "/images/drawings-qaqc.jpg",
    imageAlt: "Engineering drawings on a desk with drafting pencils and a scale rule",
    summary:
      "Structural drawing production, material take-off and independent drawing and model checking, from general arrangements to as-builts.",
    intro: [
      "A structural package is judged by its deliverables: drawings that are complete, quantities that can be relied on, and revisions that are traceable.",
      "We produce and check the full range of structural drawings and schedules, and provide drawing checking and model review as a standalone service for teams that need additional review capacity.",
    ],
    highlights: [
      "General arrangement and detail drawings",
      "As-built drawings",
      "Material take-off",
      "Drawing checking and model review",
      "Revision incorporation",
    ],
    deliver: [
      {
        title: "Arrangement and detail drawings",
        description: "General arrangement drawings, arrangement drawings, structural layouts and detail drawings.",
      },
      {
        title: "Shop and fabrication drawings",
        description: "Workshop-level drawings for structural steel fabrication.",
      },
      {
        title: "As-built drawings",
        description: "As-built drawing development from marked-up records and site information.",
      },
      {
        title: "MTO and bar bending schedules",
        description: "Material take-off for steel and bar bending schedules for reinforced concrete.",
      },
      {
        title: "Drawing checking and model review",
        description:
          "Structured checking of drawings and review of models against design inputs and project standards.",
      },
      {
        title: "Revision incorporation",
        description: "Controlled incorporation of comments and design changes across affected drawings.",
      },
    ],
    focus: {
      eyebrow: "QA/QC",
      heading: "Checked before it is issued",
      body: "Every deliverable passes through a defined check before issue. The reviewer is not the originator, comments are recorded, and close-out is confirmed against the revised drawing.",
      points: [
        "Self-check by the originator against inputs and standards",
        "Independent check by a senior detailer or checker",
        "Model review for interfaces and clashes where a model exists",
        "Comment close-out verified before issue",
      ],
    },
    applications: [
      "EPC detailed engineering packages",
      "Fabricator drawing packages",
      "Brownfield record updates",
      "Third-party drawing and model checking",
    ],
    deliverables: [
      "General arrangement drawings",
      "Arrangement drawings",
      "Detail drawings",
      "Shop drawings",
      "Fabrication drawings",
      "Structural layouts",
      "As-built drawings",
      "Isometric support drawings, where applicable",
      "Material take-off (MTO)",
      "Bar bending schedules",
    ],
    software: {
      tools: ["AutoCAD", "Tekla Structures", "MicroStation", "PDS", "Navisworks"],
      note: "Model review is carried out in the project's review tool, typically Navisworks.",
    },
    seo: {
      title: "Structural Drawings, MTO & QA/QC",
      description:
        "Structural drawing production, material take-off and QA/QC for energy projects: GA, detail, shop and as-built drawings, bar bending schedules, drawing checking and model review.",
      keywords: [
        "structural drawings",
        "material take-off",
        "structural drawing checking",
        "as-built drawings",
        "model review",
      ],
    },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;

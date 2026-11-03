import type { Faq } from "./faqs";
import type { ServiceSlug } from "./services";

/**
 * Industries / project environments (spec section 5.1). These describe where
 * services are applied; they are not services. The former onshore and
 * offshore service pages now live here, with their sector-specific content.
 */
export type IndustrySlug =
  | "onshore-oil-gas"
  | "gas-processing-ngl"
  | "offshore-energy"
  | "refining-petrochemicals"
  | "process-plants"
  | "power-industrial";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  /** Short label for menus and compact listings. */
  short: string;
  /** Anchors used by the previous single-page industries layout, kept as aliases. */
  legacyAnchors: string[];
  image: string;
  imageAlt: string;
  summary: string;
  intro: string[];
  structures: string[];
  /** Core services commissioned in this sector (owner brief, Oct 2026). */
  scope: string[];
  /** Relevant service packages, with what each contributes in this environment. */
  packages: { service: ServiceSlug; note: string }[];
  /** Typical inputs and constraints in this environment. */
  constraints: string[];
  focus: { heading: string; body: string; points: string[] };
  standardsRefs: string[];
  standardsNote: string;
  /** What is not implied for this environment. */
  boundaries?: string[];
  /** Sector-specific questions, shown on the industry page. */
  faqs: Faq[];
  seo: { title: string; description: string };
};

export const industries: Industry[] = [
  {
    slug: "onshore-oil-gas",
    scope: [
      "Structural drafting and detailing for onshore oil and gas facilities",
      "Wellhead and pipeline-main structural GA drawings",
      "Wellhead access platforms",
      "Pipe rack manifold structures",
      "Pipe racks, pipe bridges and associated structural steelwork",
      "Flowline and trunk-line structural-support documentation",
      "Equipment-support structures, platforms and skid frames",
      "Structural supports for cable trays and facility services",
      "Steel and concrete structural drawing packages",
      "Greenfield drawing and modelling production",
      "Brownfield facility updates and modifications",
      "Structural replacement and rerouting-related drawing updates",
    ],
    name: "Onshore Oil & Gas Facilities",
    short: "Onshore Oil & Gas",
    legacyAnchors: ["oil-gas"],
    image: "/images/industry-oil-gas.jpg",
    imageAlt: "Large oil and gas processing complex with pipes, tanks and structures",
    summary:
      "Production, gathering and processing facilities, where structural scope ranges from new process areas to modifications across producing fields.",
    intro: [
      "Onshore energy facilities depend on a large volume of steel and concrete structures that have to be coordinated with piping, equipment and electrical layouts.",
      "Our senior team's experience covers pipe racks and pipe bridges, process and access platforms, equipment supports and plant buildings on onshore oil and gas developments, in new process areas and on producing fields.",
    ],
    structures: [
      "Pipe racks and pipe bridges",
      "Process and access platforms",
      "Equipment and skid supports",
      "Cable tray support structures",
      "Flowline and pipeline supports",
      "Plant buildings and sheds",
      "Equipment foundations and substation bases",
    ],
    packages: [
      { service: "civil-structural-drafting", note: "GA and layout drawings for racks, platforms and foundations." },
      { service: "plant-structural-3d-modelling", note: "Structural models inside the project's plant environment." },
      { service: "steel-detailing-fabrication", note: "Shop and erection drawings for racks, platforms and supports." },
      { service: "rcc-reinforcement-detailing", note: "Foundation, pedestal and equipment-base reinforcement." },
      { service: "brownfield-structural-modifications", note: "Modification packages on producing facilities." },
    ],
    constraints: [
      "Current piping, equipment and electrical layouts",
      "Vendor data that can change late in design",
      "Plot plans and civil layouts",
      "Existing facility records for brownfield work",
    ],
    focus: {
      heading: "Detailing that follows the plant, not the other way round",
      body: "Onshore structures rarely stand alone. Racks carry piping and cable trays, platforms wrap equipment, and foundations follow vendor data that changes late. Documentation is organised around those interfaces so revisions are absorbed in a controlled way.",
      points: [
        "Structures developed against current piping, equipment and electrical layouts",
        "Steel and RCC interfaces checked at base plates, pedestals and embedded items",
        "Material take-off issued in step with drawing revisions",
      ],
    },
    standardsRefs: ["client-project", "aisc-360", "aci-318"],
    standardsNote: "Owner and EPC specifications generally govern, with steel and concrete design codes as specified by the responsible designer.",
    faqs: [
      {
        id: "onshore-pipe-rack-drawings",
        q: "What drawings does an onshore pipe rack package usually need?",
        a: "General arrangement and framing plans, sections and elevations showing tiers, bents and longitudinal bracing, plus anchor-bolt and foundation layouts. Once connections are approved, the detailing stage adds assembly, single-part and erection drawings with member and bolt lists. Pipe-support attachments, cable-tray brackets and access platforms are usually listed separately so their revisions can be tracked against the piping layout.",
      },
      {
        id: "onshore-vendor-data",
        q: "How are late vendor-data changes handled on equipment foundations?",
        a: "Foundation and pedestal drawings note the vendor-data revision they are based on. When certified vendor data arrives, anchor-bolt patterns, pocket sizes and grout levels are checked against it, and the affected drawings, bar bending schedules and MTO are reissued together under the next revision with clouded changes.",
      },
      {
        id: "onshore-producing-field",
        q: "Can modification drawings be prepared for a producing field without site access?",
        a: "Yes, where verified site information is supplied: survey records, laser-scan point clouds, photographs and existing drawings marked up by the site team. Existing conditions that cannot be confirmed from those records are flagged on the drawings as hold points for site verification rather than assumed.",
      },
    ],
    seo: {
      title: "Onshore Oil & Gas Structural Detailing",
      description:
        "Structural drafting, modelling, steel and RCC detailing and brownfield packages for onshore oil and gas: pipe racks, platforms, supports and foundations.",
    },
  },
  {
    slug: "gas-processing-ngl",
    scope: [
      "Process-industry structural arrangements",
      "Pipe racks, pipe bridges and associated structural steelwork",
      "Equipment-support structures, platforms and skid frames",
      "Equipment foundations, bases and plinths with reinforcement detailing",
      "Steel and concrete structural drawing packages",
      "Structural modelling and fabrication documentation",
      "Model-based quantity extraction and material documentation",
      "Plant upgrade and expansion packages",
    ],
    name: "Gas Processing & NGL Facilities",
    short: "Gas Processing / NGL",
    legacyAnchors: ["gas-processing-ngl"],
    image: "/images/industry-gas-processing.jpg",
    imageAlt: "Spherical storage tanks and process towers at a gas facility",
    summary:
      "Gas processing and NGL recovery facilities combining substantial RCC work with pipe rack and equipment support steel.",
    intro: [
      "Gas processing and NGL plants carry a high proportion of concrete: foundations, pedestals and equipment bases under heavy rotating and static equipment, alongside pipe racks and access steel.",
      "Senior team experience includes RCC structures, pipe rack layouts, GA drawings and bar bending schedules on NGL recovery work.",
    ],
    structures: [
      "RCC structures and foundations",
      "Equipment bases and plinths",
      "Pipe rack layouts",
      "Access platforms",
    ],
    packages: [
      { service: "civil-structural-drafting", note: "Concrete and foundation arrangement drawings and rack layouts." },
      { service: "plant-structural-3d-modelling", note: "Structural models for racks and plant structures, where supported." },
      { service: "rcc-reinforcement-detailing", note: "Reinforcement detailing and bar bending schedules." },
      { service: "steel-detailing-fabrication", note: "Pipe rack and platform steel." },
      { service: "material-takeoffs-documentation", note: "Concrete, rebar and steel quantities." },
    ],
    constraints: [
      "Equipment and vendor foundation data",
      "Anchor bolt and embedment details",
      "Bar scheduling standard for the project",
      "Interfaces between concrete and supported steel",
    ],
    focus: {
      heading: "Concrete detailed with the steel it carries in view",
      body: "Anchor bolts, base plates and embedded items are where steel and concrete packages most often disagree. Where the drawings support it, concrete details are coordinated against the steel arrangement.",
      points: [
        "Pedestals and bases coordinated with supported steelwork",
        "Reinforcement arranged to keep anchor and embedment zones workable",
        "Schedules that match the drawings bar for bar",
      ],
    },
    standardsRefs: ["client-project", "aci-318", "bs-8666"],
    standardsNote: "Concrete and bar-scheduling standards follow the project specification, for example ACI or BS practice.",
    faqs: [
      {
        id: "gas-typical-structures",
        q: "What structures are typical in a gas processing or NGL plant?",
        a: "Pipe racks between process units, compressor and pump shelters, platforms around columns, exchangers and vessels, and supports for cold-service piping. The concrete scope is often heavy: compressor blocks, ring walls and large mats with dense reinforcement and many embedded items.",
      },
      {
        id: "gas-compressor-foundations",
        q: "Can you detail compressor and rotating-equipment foundations?",
        a: "We prepare concrete outline and reinforcement drawings and bar bending schedules from the foundation design issued by the responsible engineer, including anchor-bolt sleeves, embedded plates and grout pockets taken from certified vendor data. Dynamic analysis and foundation sizing stay with the designer.",
      },
      {
        id: "gas-cold-service",
        q: "How are cold-service pipe supports shown in the structural package?",
        a: "Support locations and loads come from the piping and stress team. The structural package shows the support steel, attachment details and any insulation or shoe clearances they specify. Steel grades for low-temperature service follow the project specification and are carried through to the MTO.",
      },
    ],
    seo: {
      title: "Gas Processing & NGL Structural Detailing",
      description:
        "RCC and reinforcement detailing, bar bending schedules, pipe rack layouts and quantities for gas processing and NGL recovery facilities.",
    },
  },
  {
    slug: "offshore-energy",
    scope: [
      "Structural drafting and detailing for offshore facilities, within the available project scope and competence",
      "FrameWorks Plus steel structure GA, plans, elevations and model sections",
      "Platform access structures, walkways and secondary steelwork",
      "Equipment-support and access-structure modifications",
      "Spreader bar section and detail drawings, from approved lifting design",
      "Structural modelling and fabrication documentation",
      "Brownfield facility updates and modifications",
      "Model-based quantity extraction and material documentation",
    ],
    name: "Offshore Energy Facilities",
    short: "Offshore Energy",
    legacyAnchors: ["offshore"],
    image: "/images/offshore-platform.jpg",
    imageAlt: "Offshore platform topsides and steelwork lit at night",
    summary:
      "Offshore oil and gas platforms, where structural detailing and shop drawings are produced for yard fabrication and offshore modification.",
    intro: [
      "Offshore facilities combine structural steelwork, access arrangements, equipment interfaces and modifications within demanding installation and operational environments. Documentation for a selected offshore work package may include steel framing and access drawings, specified connection and fabrication details, supported 3D model updates, material schedules and controlled revision records.",
      "Assignments use the applicable project basis, owner specifications and approved offshore engineering inputs. They do not, by themselves, constitute offshore structural analysis, marine engineering or approval of platform integrity. Our senior team's offshore experience was gained within established offshore EPC and fabrication environments.",
    ],
    structures: [
      "Platform deck steelwork",
      "Access structures, stairs and walkways",
      "Secondary and support steel",
      "Offshore structural modifications",
      "Brownfield offshore additions",
    ],
    packages: [
      { service: "plant-structural-3d-modelling", note: "Offshore structural models and existing-model updates." },
      { service: "steel-detailing-fabrication", note: "Detailed, shop and fabrication drawings with MTO for the yard." },
      { service: "brownfield-structural-modifications", note: "Modification packages for existing platforms." },
    ],
    constraints: [
      "Issued structural design drawings",
      "Project and fabrication yard specifications",
      "Existing structural models, for modification scopes",
      "Material and MTO requirements",
      "Client drafting and numbering standards",
    ],
    focus: {
      heading: "Detailing and modelling support for offshore steelwork",
      body: "Our offshore scope is structural modelling, detailing and drawing production. We work from the design issued by the responsible engineering organization and convert it into fabrication and erection information, with existing offshore records used when modifying facilities.",
      points: [
        "Detailing driven by issued design drawings and project specifications",
        "Existing structural models modified and kept current",
        "Drawings and MTO structured around fabrication sequence",
      ],
    },
    standardsRefs: ["iso-19902", "iso-19901-3", "aws-d11", "client-project"],
    standardsNote: "Offshore standards apply where the contract designates them; the scope of work records the applicable editions.",
    boundaries: [
      "Offshore structural analysis, including jacket, wave or fatigue analysis",
      "Primary structure design and lifting design",
      "Independent verification of topsides structures",
    ],
    faqs: [
      {
        id: "offshore-topsides-mods",
        q: "Which drawings does an offshore topsides modification need?",
        a: "Existing, removed and new structural drawings, tie-in details to the existing deck framing, and shop drawings with pieces sized for transport, lifting and access offshore. Weld and inspection categories are shown as specified by the designer, typically to AWS D1.1 or the project's own offshore structural specification.",
      },
      {
        id: "offshore-vs-onshore",
        q: "How does offshore structural detailing differ from onshore work?",
        a: "Weight and space are tighter, so weight reports and the MTO matter more; most connections are welded rather than bolted; pieces must suit lifting and access limits; and coating and inspection requirements are usually more demanding. Weld categories and NDT extents are taken from the design and specification, not chosen at the detailing stage.",
      },
      {
        id: "offshore-laser-scans",
        q: "Can existing platform steel be modelled from laser scans?",
        a: "Yes. Point clouds or scan-derived models can be used to model existing steel and route new members around it. The drawings record which dimensions come from scans and which still need site verification before fabrication.",
      },
    ],
    seo: {
      title: "Offshore Structural Detailing & Modelling",
      description:
        "Offshore structural and steel detailing and modelling support: detailed drawings, shop drawings, MTO and modification packages for offshore platforms.",
    },
  },
  {
    slug: "refining-petrochemicals",
    scope: [
      "Refinery and petrochemical facility structural drawings",
      "Process-industry structural arrangements",
      "Pipe racks, pipe bridges and associated structural steelwork",
      "Equipment-support structures, platforms and maintenance access",
      "Plant upgrade, expansion and reinstatement packages",
      "Brownfield facility updates and modifications",
      "Structural replacement and rerouting-related drawing updates",
      "Structural modelling in PDS / FrameWorks Plus environments, where supported",
    ],
    name: "Refining & Petrochemical Facilities",
    short: "Refining & Petrochemicals",
    legacyAnchors: ["refineries", "petrochemical"],
    image: "/images/industry-refinery.jpg",
    imageAlt: "Refinery stacks and columns lit at night",
    summary:
      "Refinery expansion and reconstruction, and petrochemical units with dense steelwork, heavy equipment structures and shared plant models.",
    intro: [
      "Refineries and petrochemical units combine congested process structures with operating-facility constraints. Steel detailing accuracy and model coordination decide constructability.",
      "Senior team experience includes Tekla detailing on a refinery expansion and plant structural modelling on a refinery reconstruction.",
    ],
    structures: [
      "Multi-tier pipe racks",
      "Equipment and vessel structures",
      "Process structures and platforms",
      "Plant buildings",
      "Stairs, ladders and access",
    ],
    packages: [
      { service: "civil-structural-drafting", note: "Arrangement drawings for process structures and buildings." },
      { service: "plant-structural-3d-modelling", note: "Structural modelling within the plant environment." },
      { service: "steel-detailing-fabrication", note: "Shop and erection drawings for dense steelwork." },
      { service: "brownfield-structural-modifications", note: "Modifications within operating units." },
    ],
    constraints: [
      "Plant design environment and catalogues",
      "Discipline models for coordination",
      "Operating-unit access and outage windows",
      "Existing models for brownfield updates",
    ],
    focus: {
      heading: "Modelling inside the project's own environment",
      body: "Refinery projects standardise on a plant design environment early. Structures are modelled within it so the structural discipline stays visible to piping, equipment and electrical teams.",
      points: [
        "Steel and concrete structures, pipe racks, platforms, stairs and ladders",
        "Arrangement drawings extracted from the model",
        "Model review for interfaces and clashes",
      ],
    },
    standardsRefs: ["client-project", "aisc-360", "aws-d11"],
    standardsNote: "Owner and licensor specifications typically govern, with structural codes as specified by the responsible designer.",
    faqs: [
      {
        id: "refinery-turnaround",
        q: "What does a turnaround structural package usually include?",
        a: "Modification drawings for platforms, pipe supports and equipment access that must be installed during a shutdown, with pieces sized for the available access and lifting, a clear existing/removed/new presentation, and material take-offs issued early enough for procurement before the shutdown window.",
      },
      {
        id: "refinery-hot-work",
        q: "How is structural work near live plant reflected in the drawings?",
        a: "Connection types that reduce hot work on site, such as bolted or clamped attachments, are shown where the responsible engineer has specified them. Locations where site conditions may affect fit-up are flagged on the drawings for verification.",
      },
      {
        id: "refinery-standards",
        q: "Which standards apply on refinery and petrochemical structural packages?",
        a: "The owner's engineering standards and the project specification normally govern. They typically reference codes such as AISC 360 and AWS D1.1 for steel and ACI 318 for concrete, or their Eurocode and BS equivalents. Applicable editions are confirmed at scope review.",
      },
    ],
    seo: {
      title: "Refinery & Petrochemical Structural Detailing",
      description:
        "Structural drafting, plant modelling, steel detailing and brownfield modification packages for refineries and petrochemical units.",
    },
  },
  {
    slug: "process-plants",
    scope: [
      "Process-industry structural arrangements",
      "Structural framing, pipe rack and equipment-support drawings",
      "Platforms, walkways and secondary steelwork",
      "Concrete supports, equipment foundations and bases",
      "Steel and concrete structural drawing packages",
      "Structural modelling and fabrication documentation",
      "Plant upgrade and expansion packages",
      "Model-based quantity extraction and material documentation",
    ],
    name: "Fertiliser, Chemical & Process Plants",
    short: "Fertiliser / Process Plants",
    legacyAnchors: ["fertilizer-process"],
    image: "/images/industry-fertilizer.jpg",
    imageAlt: "Process plant complex at dusk",
    summary:
      "Fertiliser and general process plants requiring steel and concrete structures for process units, storage and material handling.",
    intro: [
      "Process plants share the structural needs of energy facilities: support structures, industrial frames and civil works coordinated with process equipment.",
      "We support these facilities with the same drawing, modelling and detailing services used across the energy sector.",
    ],
    structures: [
      "Process unit structures",
      "Industrial frames and sheds",
      "RCC industrial structures",
      "Platforms and access",
    ],
    packages: [
      { service: "civil-structural-drafting", note: "Civil and steel arrangement drawings." },
      { service: "plant-structural-3d-modelling", note: "Structural models for plant coordination." },
      { service: "steel-detailing-fabrication", note: "Shop drawings for frames, platforms and supports." },
      { service: "rcc-reinforcement-detailing", note: "Foundations and RCC structures." },
    ],
    constraints: [
      "Process equipment layouts and vendor data",
      "Client drafting and material specifications",
      "Interfaces between steel and concrete",
    ],
    focus: {
      heading: "The same disciplines, a different process",
      body: "Structural documentation for a process plant follows the same disciplined sequence as an energy project: approved inputs, coordinated drawings and models, production checks and controlled issue.",
      points: [
        "Steel and RCC structures for process units",
        "Coordination with equipment and piping layouts",
        "Quantities issued with the drawings",
      ],
    },
    standardsRefs: ["client-project", "aisc-360", "aci-318"],
    standardsNote: "Project specifications govern, with design codes as specified by the responsible designer.",
    faqs: [
      {
        id: "process-typical-structures",
        q: "What structures are common in fertiliser and chemical plants?",
        a: "Multi-level process structures, prilling or granulation tower steelwork, conveyor galleries and transfer towers, pipe racks, and concrete bunds, sumps and equipment bases. Corrosive environments often bring specific coating systems or concrete cover requirements, which are taken from the project specification.",
      },
      {
        id: "process-conveyors",
        q: "Can you detail conveyor galleries and transfer towers?",
        a: "Yes, from the approved structural design: gallery trusses and stringers, transfer-tower framing, walkways, handrails and support bents, with erection marks and a material take-off.",
      },
      {
        id: "process-corrosion",
        q: "How are corrosion-protection requirements shown in the drawings?",
        a: "Coating systems, galvanizing, drain holes, vent holes for hot-dip galvanizing and concrete cover are shown as specified. Where the specification is silent on a detail, it is raised as a technical query before detailing continues.",
      },
    ],
    seo: {
      title: "Fertiliser & Process Plant Structural Detailing",
      description:
        "Civil and structural drafting, modelling, steel and RCC detailing for fertiliser, chemical and general process plants.",
    },
  },
  {
    slug: "power-industrial",
    scope: [
      "Substation foundations and equipment bases",
      "Transformer and electrical equipment skids",
      "Cable tray support structures",
      "Structural framing, steel buildings and industrial sheds",
      "Access platforms, stairs, ladders and handrails",
      "Industrial foundation drawing packages",
      "Monorail and lifting-support steelwork, subject to specialist design criteria",
      "Facility expansion structures and replacement steelwork",
    ],
    name: "Power Generation & Industrial Facilities",
    short: "Power & Industrial",
    legacyAnchors: ["power-electrical", "industrial-energy"],
    image: "/images/industry-power.jpg",
    imageAlt: "Steel gantry structures in an electrical substation",
    summary:
      "Power and electrical infrastructure associated with industrial facilities, and the utilities and supporting structures around energy assets.",
    intro: [
      "Electrical and utility systems on industrial sites need their own structures: substation bases, cable tray supports, equipment supports and utility racks.",
      "These are often delivered as modification or extension packages on existing plant, using the same drafting, steel and RCC services.",
    ],
    structures: [
      "Substation bases",
      "Cable tray support structures",
      "Equipment support structures",
      "Utility pipe racks",
      "Industrial sheds and structural frames",
    ],
    packages: [
      { service: "civil-structural-drafting", note: "Arrangement drawings for bases, frames and supports." },
      { service: "steel-detailing-fabrication", note: "Shop drawings for supports, frames and racks." },
      { service: "rcc-reinforcement-detailing", note: "Substation and equipment bases." },
      { service: "material-takeoffs-documentation", note: "Quantities and drawing registers for foundation and steel packages." },
    ],
    constraints: [
      "Electrical equipment layouts and vendor data",
      "Cable tray routing",
      "Existing site records for extensions",
    ],
    focus: {
      heading: "Supporting structures for electrical systems",
      body: "The structures that carry and house electrical systems are small individually and numerous together. Consistent drawing standards and quantities keep them manageable.",
      points: [
        "Substation base detailing",
        "Cable tray and equipment supports",
        "Extensions to existing industrial plant",
      ],
    },
    standardsRefs: ["client-project", "aci-318", "aisc-360"],
    standardsNote: "Project specifications govern, with design codes as specified by the responsible designer.",
    faqs: [
      {
        id: "power-typical-packages",
        q: "What structural packages are typical for power and industrial facilities?",
        a: "Boiler and HRSG access steelwork, turbine-hall and industrial building framing, transformer and switchyard foundations, cable-tray supports, pipe racks, and crane girders and runway beams in industrial buildings.",
      },
      {
        id: "power-crane-runways",
        q: "Can you detail crane runway beams and building steelwork?",
        a: "Yes, from the approved design: runway girders, rail and end-stop details as specified, column brackets, bracing and cladding supports. Crane loads and fatigue design remain with the responsible engineer.",
      },
      {
        id: "power-transformer-foundations",
        q: "Can you prepare transformer and substation foundation drawings?",
        a: "Yes: concrete outlines, reinforcement drawings and bar bending schedules for transformer bases, oil-containment bunds, cable trenches and equipment plinths, with embedded items taken from the electrical vendor's data.",
      },
    ],
    seo: {
      title: "Power & Industrial Facility Structural Detailing",
      description:
        "Structural drafting, steel and RCC detailing for substation bases, cable tray and equipment supports and industrial structures.",
    },
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
export const industryPath = (slug: IndustrySlug) => `/industries/${slug}`;

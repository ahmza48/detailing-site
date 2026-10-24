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
  /** Relevant service packages, with what each contributes in this environment. */
  packages: { service: ServiceSlug; note: string }[];
  /** Typical inputs and constraints in this environment. */
  constraints: string[];
  focus: { heading: string; body: string; points: string[] };
  standardsRefs: string[];
  standardsNote: string;
  /** What is not implied for this environment. */
  boundaries?: string[];
  seo: { title: string; description: string };
};

export const industries: Industry[] = [
  {
    slug: "onshore-oil-gas",
    name: "Onshore Oil & Gas",
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
    seo: {
      title: "Onshore Oil & Gas Structural Detailing",
      description:
        "Structural drafting, modelling, steel and RCC detailing and brownfield modification packages for onshore oil and gas facilities: pipe racks, platforms, supports and foundations.",
    },
  },
  {
    slug: "gas-processing-ngl",
    name: "Gas Processing / NGL",
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
    seo: {
      title: "Gas Processing & NGL Structural Detailing",
      description:
        "RCC and reinforcement detailing, bar bending schedules, pipe rack layouts and quantities for gas processing and NGL recovery facilities.",
    },
  },
  {
    slug: "offshore-energy",
    name: "Offshore Energy Facilities",
    short: "Offshore Energy",
    legacyAnchors: ["offshore"],
    image: "/images/offshore-platform.jpg",
    imageAlt: "Offshore platform topsides and steelwork lit at night",
    summary:
      "Offshore oil and gas platforms, where structural detailing and shop drawings are produced for yard fabrication and offshore modification.",
    intro: [
      "Offshore structures are fabricated onshore, to tight tolerances, and installed where rework is expensive. The detailing has to be right before steel is cut.",
      "Our senior team's offshore experience was gained within established offshore EPC and fabrication environments, producing detailed drawings, shop drawings and models for offshore platforms and their modifications.",
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
      body: "Our offshore scope is structural modelling, detailing and drawing production. We work from the design issued by the responsible engineering organization and convert it into fabrication-ready information.",
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
    seo: {
      title: "Offshore Structural Detailing & Modelling",
      description:
        "Offshore structural detailing, offshore steel detailing and modelling support: detailed drawings, shop drawings, MTO and modification packages for offshore platforms.",
    },
  },
  {
    slug: "refining-petrochemicals",
    name: "Refining & Petrochemicals",
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
    seo: {
      title: "Refinery & Petrochemical Structural Detailing",
      description:
        "Structural drafting, plant modelling, steel detailing and brownfield modification packages for refineries and petrochemical units.",
    },
  },
  {
    slug: "process-plants",
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
    seo: {
      title: "Fertiliser & Process Plant Structural Detailing",
      description:
        "Civil and structural drafting, modelling, steel and RCC detailing for fertiliser, chemical and general process plants.",
    },
  },
  {
    slug: "power-industrial",
    name: "Power & Industrial Facilities",
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
    seo: {
      title: "Power & Industrial Facility Structural Detailing",
      description:
        "Structural drafting, steel and RCC detailing for substation bases, cable tray and equipment supports and industrial structures.",
    },
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
export const industryPath = (slug: IndustrySlug) => `/industries/${slug}`;

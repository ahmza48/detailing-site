import type { ServiceSlug } from "./services";

export type ProjectDiagram = {
  src: string;
  /** Drawing or model type the placeholder stands in for. */
  type: string;
  alt: string;
};

export type Project = {
  /** Anchor ID on /project-experience. */
  id: string;
  serviceSlug: ServiceSlug;
  name: string;
  subtitle?: string;
  sector: string;
  environment?: string;
  location: string;
  /** Organizations the senior team member's engagement ran through or was associated with. */
  experienceThrough: string[];
  teamRole: string;
  services: string[];
  /** Only tools evidenced for this project; omitted when not confirmed. */
  tools?: string[];
  deliverables: string[];
  description: string;
  image: string;
  imageAlt: string;
  diagrams: ProjectDiagram[];
};

const placeholder = (id: string, n: number, type: string): ProjectDiagram => ({
  src: `/images/projects/${id}-${n}.jpg`,
  type,
  alt: `Placeholder illustration representing a ${type.toLowerCase()}; not an actual project drawing`,
});

/**
 * Representative projects from the prior professional experience of senior
 * team members. Wording must never present these as contracts held by the
 * company itself.
 */
export const projects: Project[] = [
  {
    id: "onshore-civil-structural",
    serviceSlug: "onshore-civil-structural-design-detailing",
    name: "Hail & Ghasha Development Project",
    subtitle: "Package 2 – Onshore Facilities",
    sector: "Oil & Gas",
    environment: "Onshore",
    location: "Abu Dhabi, UAE",
    experienceThrough: ["Penspen", "Tecnimont", "ADNOC-associated project"],
    teamRole: "Structural design and detailing support, as part of a senior team member's prior engagement",
    services: [
      "Structural steel pipe bridges",
      "Platforms",
      "Crossover steel structures",
    ],
    deliverables: ["Structural steel drawings", "Material take-off (MTO)"],
    description:
      "Senior team experience on the onshore facilities package included structural steel pipe bridges, platforms and crossover steel structures, with the associated drawings and material take-off.",
    image: "/images/project-hail-ghasha.jpg",
    imageAlt: "Steel pipe bridge carrying pipework between structures",
    diagrams: [
      placeholder("onshore-civil-structural", 1, "GA drawing"),
      placeholder("onshore-civil-structural", 2, "Platform framing plan"),
      placeholder("onshore-civil-structural", 3, "Structural drawing"),
    ],
  },
  {
    id: "offshore-structural",
    serviceSlug: "offshore-structural-design-detailing",
    name: "Umm Lulu Full Development Project",
    subtitle: "Package 1",
    sector: "Oil & Gas",
    environment: "Offshore",
    location: "Offshore Abu Dhabi, UAE",
    experienceThrough: ["NPCC", "ADMA"],
    teamRole: "Offshore structural detailing, as part of a senior team member's prior engagement",
    services: ["Offshore structural detailing", "Detailed drawings", "Shop drawings"],
    tools: ["AutoCAD", "Tekla"],
    deliverables: ["Detailed structural drawings", "Shop drawings"],
    description:
      "Senior team experience on this offshore development covered structural detailing for offshore steelwork, producing detailed drawings and shop drawings in AutoCAD and Tekla.",
    image: "/images/project-umm-lulu.jpg",
    imageAlt: "Offshore platform topsides at a fabrication yard",
    diagrams: [
      placeholder("offshore-structural", 1, "Structural drawing"),
      placeholder("offshore-structural", 2, "Shop drawing"),
      placeholder("offshore-structural", 3, "Tekla model"),
    ],
  },
  {
    id: "brownfield-modifications",
    serviceSlug: "brownfield-structural-modifications",
    name: "BAB & ASAB",
    subtitle: "Rehabilitation and Integrity Reinstatement",
    sector: "Oil & Gas",
    environment: "Brownfield / Onshore",
    location: "Abu Dhabi, UAE",
    experienceThrough: ["Penspen", "Galfar Engineering & Contracting"],
    teamRole:
      "Structural checking and design/detail support, as part of a senior team member's prior engagement",
    services: [
      "Structural checking",
      "Design and detail support",
      "Structural modifications",
      "Navisworks model review",
    ],
    tools: ["Navisworks"],
    deliverables: [
      "Civil structural drawings",
      "Steel structural drawings",
      "Material take-off (MTO)",
    ],
    description:
      "Senior team experience on this rehabilitation and integrity reinstatement programme included structural checking, design and detail support, civil and steel structural drawings for structural modifications, MTO and model review in Navisworks.",
    image: "/images/project-bab-asab.jpg",
    imageAlt: "Existing process structure illuminated at night",
    diagrams: [
      placeholder("brownfield-modifications", 1, "Modification drawing"),
      placeholder("brownfield-modifications", 2, "Structural detail drawing"),
      placeholder("brownfield-modifications", 3, "Plant 3D model"),
    ],
  },
  {
    id: "steel-detailing",
    serviceSlug: "steel-detailing-fabrication",
    name: "70,000 BPD Diwaniya Refinery Expansion Project",
    sector: "Refinery",
    environment: "Onshore",
    location: "Iraq",
    experienceThrough: ["Carbon Energies", "Midland Refineries Company", "Daura Refineries"],
    teamRole: "Detailed structural work in Tekla Structures, as part of a senior team member's prior engagement",
    services: ["Detailed structural work in Tekla Structures"],
    tools: ["Tekla Structures"],
    deliverables: ["Tekla Structures model", "Detailed structural drawings"],
    description:
      "Senior team experience on this refinery expansion comprised detailed structural work carried out in Tekla Structures.",
    image: "/images/project-diwaniya.jpg",
    imageAlt: "Heavy structural steel trusses and bracing",
    diagrams: [
      placeholder("steel-detailing", 1, "Tekla model"),
      placeholder("steel-detailing", 2, "Fabrication drawing"),
      placeholder("steel-detailing", 3, "GA drawing"),
      placeholder("steel-detailing", 4, "Pipe rack diagram"),
    ],
  },
  {
    id: "rcc-detailing",
    serviceSlug: "rcc-reinforcement-detailing",
    name: "Hawiyah NGL Recovery Project",
    sector: "NGL / Gas Processing",
    environment: "Onshore",
    location: "Saudi Arabia",
    experienceThrough: ["Dar Al Riyadh", "Tecnicas", "Saudi Aramco-associated project"],
    teamRole: "RCC and structural drawing production, as part of a senior team member's prior engagement",
    services: ["RCC structures", "Pipe rack layouts"],
    deliverables: [
      "GA drawings",
      "Isometric drawings",
      "Bar bending schedules",
    ],
    description:
      "Senior team experience on this NGL recovery project included RCC structures and pipe rack layouts, with general arrangement drawings, isometric drawings and bar bending schedules.",
    image: "/images/project-hawiyah.jpg",
    imageAlt: "Stacked steel reinforcement bars",
    diagrams: [
      placeholder("rcc-detailing", 1, "RCC detail"),
      placeholder("rcc-detailing", 2, "Pipe rack diagram"),
      placeholder("rcc-detailing", 3, "GA drawing"),
    ],
  },
  {
    id: "plant-3d-modelling",
    serviceSlug: "plant-structural-3d-modelling",
    name: "Atyrau Refinery Reconstruction Project",
    subtitle: "Kazakhstan",
    sector: "Refinery",
    environment: "Onshore",
    location: "Atyrau, Kazakhstan",
    experienceThrough: ["JGC Descon"],
    teamRole: "Plant structural 3D modelling, as part of a senior team member's prior engagement",
    services: [
      "Frameworks Plus 3D modelling",
      "Concrete and steel buildings",
      "Platforms, pipe racks, stairs and ladders",
      "Underground facility PDS 3D modelling",
    ],
    tools: ["Frameworks Plus", "PDS"],
    deliverables: ["Structural 3D models", "Steel structural arrangement drawings"],
    description:
      "Senior team experience on this refinery reconstruction covered Frameworks Plus 3D modelling and steel structural arrangement drawings for concrete and steel buildings, platforms, pipe racks, stairs and ladders, together with PDS 3D modelling of underground facilities.",
    image: "/images/project-atyrau.jpg",
    imageAlt: "Refinery columns and steel structures at dusk",
    diagrams: [
      placeholder("plant-3d-modelling", 1, "Plant 3D model"),
      placeholder("plant-3d-modelling", 2, "Arrangement drawing"),
      placeholder("plant-3d-modelling", 3, "Plant 3D model"),
      placeholder("plant-3d-modelling", 4, "Pipe rack diagram"),
    ],
  },
  {
    id: "drawings-qaqc",
    serviceSlug: "structural-drawings-mto-qaqc",
    name: "Dolphin Energy Project",
    sector: "Gas / Energy",
    location: "Qatar / UAE",
    experienceThrough: ["VECO Engineering", "CH2M Hill", "QOC", "Relevant historical project engagements"],
    teamRole: "Detailed engineering drawings, modelling and model review, as part of a senior team member's prior engagements",
    services: [
      "Detailed engineering drawings",
      "PDS modelling",
      "Navigator / model review",
    ],
    tools: ["PDS", "Frameworks Plus", "SPR", "Navigator"],
    deliverables: ["Detailed engineering drawings", "Structural models", "Material take-off (MTO)"],
    description:
      "Senior team experience included detailed engineering drawings, PDS modelling with Frameworks Plus, model review using Navigator and SPR, and material take-off.",
    image: "/images/project-dolphin.jpg",
    imageAlt: "Gas processing facility lit at night",
    diagrams: [
      placeholder("drawings-qaqc", 1, "Structural drawing"),
      placeholder("drawings-qaqc", 2, "Plant 3D model"),
      placeholder("drawings-qaqc", 3, "Detail drawing & material list"),
    ],
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);
export const projectByService = (slug: ServiceSlug) => projects.find((p) => p.serviceSlug === slug);
export const projectPath = (id: string) => `/project-experience#${id}`;

/** Projects featured on the homepage. */
export const featuredProjectIds = [
  "onshore-civil-structural",
  "offshore-structural",
  "brownfield-modifications",
  "rcc-detailing",
];

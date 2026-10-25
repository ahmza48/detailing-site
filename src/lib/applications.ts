import type { IndustrySlug } from "./industries";
import type { ServiceSlug } from "./services";

/**
 * Structures & applications directory (spec 5.2). Applications are a second
 * way in for buyers who search by structure type. They link to canonical
 * services; they are not services themselves.
 */
export type Application = {
  id: string;
  title: string;
  /** Short landing paragraph (spec v2 §8.3): what a buyer might mean, never design ownership. */
  description: string;
  examples: string[];
  /** The documentation path for this structure type, in typical order. */
  path: { service?: ServiceSlug; industry?: IndustrySlug; role: string }[];
  image: string;
  imageAlt: string;
};

export const applications: Application[] = [
  {
    id: "pipe-racks",
    title: "Pipe racks & pipe bridges",
    description:
      "Pipe rack and pipe bridge packages combine structural framing, equipment and piping interfaces and fabrication documentation. Depending on the project stage, an assignment may involve GA drawings showing bays, levels and framing, a coordinated structural model, engineer-approved connection detailing, assembly and single-part shop drawings, erection plans and material schedules. For an existing rack, verified site information and an approved modification design become critical inputs. Piping stress, pipe routing and rack design calculations are not part of these packages.",
    examples: ["Single and multi-level pipe racks", "Pipe bridges", "Crossover structures", "Pipe support frames"],
    path: [
      { service: "civil-structural-drafting", role: "GA and layout drawings" },
      { service: "plant-structural-3d-modelling", role: "3D structural model" },
      { service: "steel-detailing-fabrication", role: "Shop and erection drawings" },
      { service: "material-takeoffs-documentation", role: "MTO and BOM" },
      { service: "brownfield-structural-modifications", role: "Changes to existing racks" },
    ],
    image: "/images/onshore-pipe-rack.jpg",
    imageAlt: "Steel pipe rack and process structures at an onshore plant",
  },
  {
    id: "platforms",
    title: "Access platforms, walkways, stairs & handrails",
    description:
      "Arrangement, fabrication, erection or modification documentation for maintenance and process platforms and their access steel, developed from the approved platform design and the equipment and piping it serves.",
    examples: ["Maintenance and process platforms", "Stairways and walkways", "Ladders", "Guardrails and handrails"],
    path: [
      { service: "civil-structural-drafting", role: "Platform arrangements" },
      { service: "steel-detailing-fabrication", role: "Shop and erection drawings" },
      { service: "brownfield-structural-modifications", role: "Additions to existing plant" },
    ],
    image: "/images/plant-model.jpg",
    imageAlt: "Tall steel process structure with platforms and piping against a blue sky",
  },
  {
    id: "supports",
    title: "Equipment supports & skid steelwork",
    description:
      "Support framing and plant interfaces for equipment and skids: arrangements, coordinated models and fabrication drawings developed from approved support design and vendor equipment data.",
    examples: ["Equipment skids and support frames", "Transformer and electrical supports", "Secondary support steel"],
    path: [
      { service: "civil-structural-drafting", role: "Support arrangements" },
      { service: "plant-structural-3d-modelling", role: "Coordinated support models" },
      { service: "steel-detailing-fabrication", role: "Fabrication drawings" },
      { service: "brownfield-structural-modifications", role: "Replacement and modified supports" },
    ],
    image: "/images/industry-petrochemical.jpg",
    imageAlt: "Process plant structures, platforms and equipment lit at night",
  },
  {
    id: "cable-pipeline-supports",
    title: "Cable tray & pipeline support steel",
    description:
      "Steel support documentation for cable tray routes, pipelines and flowlines, and drawings for approved changes to existing supports. Support locations and loads come from the responsible discipline engineers.",
    examples: ["Cable tray support frames", "Pipeline and flowline supports", "Pipe support steel"],
    path: [
      { service: "civil-structural-drafting", role: "Support arrangements" },
      { service: "steel-detailing-fabrication", role: "Fabrication drawings" },
      { service: "brownfield-structural-modifications", role: "Approved support changes" },
    ],
    image: "/images/industry-industrial-energy.jpg",
    imageAlt: "Dense network of industrial pipes and valves",
  },
  {
    id: "buildings",
    title: "Industrial steel buildings & sheds",
    description:
      "Steel framing arrangements, frame models and shop and erection sets for industrial sheds and plant buildings, from the approved building design.",
    examples: ["Industrial sheds", "Portal frames", "Roof and cladding support arrangements", "Plant buildings"],
    path: [
      { service: "civil-structural-drafting", role: "Building arrangements" },
      { service: "plant-structural-3d-modelling", role: "Frame models" },
      { service: "steel-detailing-fabrication", role: "Shop and erection drawings" },
    ],
    image: "/images/capabilities-overview.jpg",
    imageAlt: "Structural steel framing seen from below",
  },
  {
    id: "foundations",
    title: "Foundations, pedestals & equipment bases",
    description:
      "Concrete arrangement and detail drawings, rebar placing drawings and bar bending schedules for foundations, pedestals and equipment bases, from approved concrete design and vendor anchor data.",
    examples: ["Footings and pedestals", "Plinths and slabs", "Equipment bases", "Substation bases"],
    path: [
      { service: "civil-structural-drafting", role: "Concrete and foundation arrangements" },
      { service: "rcc-reinforcement-detailing", role: "Reinforcement detailing and BBS" },
      { service: "material-takeoffs-documentation", role: "Concrete and rebar quantities" },
    ],
    image: "/images/rcc-detailing.jpg",
    imageAlt: "Reinforcement cages being fixed for a concrete structure",
  },
  {
    id: "brownfield-alterations",
    title: "Existing plant rehabilitation documentation",
    description:
      "Existing, removed and new steel details and revised records for approved rehabilitation and modification work. Drawings document approved repair decisions; they are not an integrity assessment.",
    examples: ["Existing, removed and new steel", "Support replacements", "Model and as-built updates"],
    path: [
      { service: "brownfield-structural-modifications", role: "Leads the modification package" },
      { service: "steel-detailing-fabrication", role: "Replacement steel drawings" },
      { service: "material-takeoffs-documentation", role: "Revised quantities and records" },
    ],
    image: "/images/brownfield-structure.jpg",
    imageAlt: "Existing refinery units with columns, piping and steel structures",
  },
  {
    id: "offshore-packages",
    title: "Offshore access & secondary steelwork",
    description:
      "Detailed steel, plant model updates and existing-platform modifications for offshore access and secondary steelwork, within the scope of the approved offshore design inputs.",
    examples: ["Platform deck and access steel", "Secondary and support steel", "Offshore modifications"],
    path: [
      { industry: "offshore-energy", role: "Offshore environment and standards" },
      { service: "plant-structural-3d-modelling", role: "Offshore models" },
      { service: "steel-detailing-fabrication", role: "Shop and fabrication drawings" },
      { service: "brownfield-structural-modifications", role: "Platform modifications" },
    ],
    image: "/images/industry-offshore.jpg",
    imageAlt: "Offshore platforms on the horizon above breaking waves",
  },
];

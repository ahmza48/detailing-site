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
  examples: string[];
  /** The documentation path for this structure type, in typical order. */
  path: { service?: ServiceSlug; industry?: IndustrySlug; role: string }[];
  image: string;
  imageAlt: string;
};

export const applications: Application[] = [
  {
    id: "pipe-racks",
    title: "Pipe racks, pipe bridges and crossovers",
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
    title: "Industrial platforms and access steel",
    examples: ["Maintenance and process platforms", "Stairways and walkways", "Ladders", "Guardrails and handrails"],
    path: [
      { service: "civil-structural-drafting", role: "Platform arrangements" },
      { service: "plant-structural-3d-modelling", role: "Platform models" },
      { service: "steel-detailing-fabrication", role: "Shop and erection drawings" },
      { service: "brownfield-structural-modifications", role: "Additions to existing plant" },
    ],
    image: "/images/plant-model.jpg",
    imageAlt: "Tall steel process structure with platforms and piping against a blue sky",
  },
  {
    id: "supports",
    title: "Equipment and cable tray supports",
    examples: ["Equipment skids and support frames", "Cable tray supports", "Transformer and electrical supports"],
    path: [
      { service: "civil-structural-drafting", role: "Support arrangements" },
      { service: "plant-structural-3d-modelling", role: "Coordinated support models" },
      { service: "steel-detailing-fabrication", role: "Fabrication drawings" },
      { service: "brownfield-structural-modifications", role: "Replacement and modified supports" },
    ],
    image: "/images/industry-industrial-energy.jpg",
    imageAlt: "Dense network of industrial pipes and valves",
  },
  {
    id: "buildings",
    title: "Industrial buildings and steel frames",
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
    title: "RCC civil works and foundations",
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
    title: "Brownfield plant alterations",
    examples: ["Existing, removed and new steel", "Support replacements", "Model and as-built updates"],
    path: [
      { service: "brownfield-structural-modifications", role: "Leads the modification package" },
      { service: "civil-structural-drafting", role: "Drawing updates" },
      { service: "steel-detailing-fabrication", role: "Replacement steel drawings" },
    ],
    image: "/images/brownfield-structure.jpg",
    imageAlt: "Existing refinery units with columns, piping and steel structures",
  },
  {
    id: "offshore-packages",
    title: "Offshore structural packages",
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

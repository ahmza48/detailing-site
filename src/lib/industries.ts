import type { ServiceSlug } from "./services";

export type Industry = {
  id: string;
  name: string;
  /** Short label for compact listings. */
  short: string;
  image: string;
  imageAlt: string;
  description: string;
  structures: string[];
  services: ServiceSlug[];
};

export const industries: Industry[] = [
  {
    id: "oil-gas",
    name: "Oil & Gas",
    short: "Oil & Gas",
    image: "/images/industry-oil-gas.jpg",
    imageAlt: "Large oil and gas processing complex with pipes, tanks and structures",
    description:
      "Onshore production, gathering and processing facilities, where structural scope ranges from new process areas to modifications across producing fields.",
    structures: ["Pipe racks and pipe bridges", "Process and access platforms", "Equipment supports", "Flowline and pipeline supports"],
    services: [
      "onshore-civil-structural-design-detailing",
      "brownfield-structural-modifications",
      "steel-detailing-fabrication",
    ],
  },
  {
    id: "refineries",
    name: "Refineries",
    short: "Refining",
    image: "/images/industry-refinery.jpg",
    imageAlt: "Refinery stacks and columns lit at night",
    description:
      "Refinery expansion and reconstruction projects with dense steelwork, heavy equipment structures and structural models shared across disciplines.",
    structures: ["Multi-tier pipe racks", "Equipment and vessel structures", "Plant buildings", "Stairs, ladders and platforms"],
    services: [
      "steel-detailing-fabrication",
      "plant-structural-3d-modelling",
      "structural-drawings-mto-qaqc",
    ],
  },
  {
    id: "gas-processing-ngl",
    name: "Gas Processing / NGL",
    short: "Gas Processing / NGL",
    image: "/images/industry-gas-processing.jpg",
    imageAlt: "Spherical storage tanks and process towers at a gas facility",
    description:
      "Gas processing and NGL recovery facilities combining substantial RCC work with pipe rack and equipment support steel.",
    structures: ["RCC structures and foundations", "Pipe rack layouts", "Equipment bases", "Access platforms"],
    services: [
      "rcc-reinforcement-detailing",
      "onshore-civil-structural-design-detailing",
      "structural-drawings-mto-qaqc",
    ],
  },
  {
    id: "petrochemical",
    name: "Petrochemical",
    short: "Petrochemical",
    image: "/images/industry-petrochemical.jpg",
    imageAlt: "Petrochemical plant illuminated at night",
    description:
      "Petrochemical units with congested process structures, where steel detailing accuracy and model coordination determine constructability.",
    structures: ["Process structures", "Pipe racks", "Equipment support structures", "Industrial buildings"],
    services: [
      "onshore-civil-structural-design-detailing",
      "steel-detailing-fabrication",
      "plant-structural-3d-modelling",
    ],
  },
  {
    id: "fertilizer-process",
    name: "Fertilizer / Process Facilities",
    short: "Fertilizer / Process Plants",
    image: "/images/industry-fertilizer.jpg",
    imageAlt: "Process plant complex at dusk",
    description:
      "Fertilizer and general process plants requiring steel and concrete structures for process units, storage and material handling areas.",
    structures: ["Process unit structures", "Industrial sheds", "RCC industrial structures", "Platforms and access"],
    services: [
      "onshore-civil-structural-design-detailing",
      "rcc-reinforcement-detailing",
      "steel-detailing-fabrication",
    ],
  },
  {
    id: "industrial-energy",
    name: "Industrial Energy Facilities",
    short: "Industrial Energy Facilities",
    image: "/images/industry-industrial-energy.jpg",
    imageAlt: "Dense network of industrial pipes and valves",
    description:
      "Utilities and supporting industrial facilities around energy assets, often delivered as modification or extension packages on existing plant.",
    structures: ["Utility pipe racks", "Equipment skid structures", "Industrial sheds", "Structural frames"],
    services: [
      "brownfield-structural-modifications",
      "onshore-civil-structural-design-detailing",
      "structural-drawings-mto-qaqc",
    ],
  },
  {
    id: "offshore",
    name: "Offshore Energy Facilities",
    short: "Offshore Facilities",
    image: "/images/industry-offshore.jpg",
    imageAlt: "Offshore platforms on the horizon above breaking waves",
    description:
      "Offshore oil and gas platforms, where structural detailing and shop drawings are produced for yard fabrication and offshore modification.",
    structures: ["Offshore platforms", "Deck steelwork", "Access structures", "Offshore modifications"],
    services: [
      "offshore-structural-design-detailing",
      "steel-detailing-fabrication",
      "brownfield-structural-modifications",
    ],
  },
  {
    id: "power-electrical",
    name: "Power / Electrical Industrial Infrastructure",
    short: "Power / Electrical Support Structures",
    image: "/images/industry-power.jpg",
    imageAlt: "Steel gantry structures in an electrical substation",
    description:
      "Power and electrical infrastructure associated with industrial facilities: the structures that carry and house electrical systems on energy sites.",
    structures: ["Substation base detailing", "Cable tray support structures", "Equipment support structures"],
    services: [
      "onshore-civil-structural-design-detailing",
      "rcc-reinforcement-detailing",
      "structural-drawings-mto-qaqc",
    ],
  },
];

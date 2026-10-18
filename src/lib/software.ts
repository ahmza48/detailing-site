export type SoftwareTool = {
  name: string;
  discipline: string;
  use: string;
};

/**
 * Only tools evidenced by the senior team's project experience.
 * Analysis packages (STAAD, SACS, SAP2000) are intentionally not listed.
 */
export const software: SoftwareTool[] = [
  {
    name: "Tekla Structures",
    discipline: "Steel modelling & detailing",
    use: "3D structural steel models, general arrangement, shop and fabrication drawings, and model-derived MTO.",
  },
  {
    name: "AutoCAD",
    discipline: "2D drawing production",
    use: "Arrangement, detail, RCC and as-built drawings, and revision incorporation on existing drawing sets.",
  },
  {
    name: "PDS",
    discipline: "Plant design environment",
    use: "Structural and underground facility modelling within integrated plant models.",
  },
  {
    name: "Frameworks Plus",
    discipline: "Plant structural modelling",
    use: "Steel and concrete structural modelling and arrangement drawing extraction in PDS-based projects.",
  },
  {
    name: "MicroStation",
    discipline: "Drawing & modelling platform",
    use: "Structural drawings and modelling for projects delivered on MicroStation-based standards.",
  },
  {
    name: "PDMS",
    discipline: "Plant design environment",
    use: "Exposure to structural modelling within PDMS project environments.",
  },
  {
    name: "Navisworks",
    discipline: "Model review & coordination",
    use: "Model review, walkthrough and coordination checks against other disciplines.",
  },
];

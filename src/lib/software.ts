import type { ServiceSlug } from "./services";

export type SoftwareTool = {
  name: string;
  discipline: string;
  use: string;
  /** Services this tool supports (software is a capability, not a service). */
  services: ServiceSlug[];
  /**
   * Basis of the listing. All tools are evidenced by senior personnel's prior
   * project experience. TODO_VERIFY: current company licences and versions
   * per tool before any tool is presented as currently held.
   */
  basis: "prior-project-experience";
  /** Legacy plant environments: availability is especially project-dependent. */
  legacy?: boolean;
  /** What listing the tool does not prove (spec v2 §10.2). */
  caution: string;
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
    services: ["plant-structural-3d-modelling", "steel-detailing-fabrication", "material-takeoffs-documentation"],
    basis: "prior-project-experience",
    caution: "Current staff availability and a compatible licensed version are confirmed for each package.",
  },
  {
    name: "AutoCAD",
    discipline: "2D drawing production",
    use: "Arrangement, detail, RCC and as-built drawings, and revision incorporation on existing drawing sets.",
    services: ["civil-structural-drafting", "rcc-reinforcement-detailing", "brownfield-structural-modifications"],
    basis: "prior-project-experience",
    caution: "A PDF-to-CAD conversion does not create a verified as-built survey.",
  },
  {
    name: "PDS",
    discipline: "Plant design environment",
    use: "Structural and underground facility modelling within integrated plant models.",
    services: ["plant-structural-3d-modelling"],
    basis: "prior-project-experience",
    legacy: true,
    caution: "Structural model support only; no process, pipe stress or full plant engineering design is implied.",
  },
  {
    name: "FrameWorks Plus",
    discipline: "Plant structural modelling",
    use: "Steel and concrete structural modelling and arrangement drawing extraction in PDS-based projects.",
    services: ["plant-structural-3d-modelling"],
    basis: "prior-project-experience",
    legacy: true,
    caution: "Legacy formats, availability and import / export compatibility are assessed per package.",
  },
  {
    name: "MicroStation",
    discipline: "Drawing & modelling platform",
    use: "Structural drawings and modelling for projects delivered on MicroStation-based standards.",
    services: ["civil-structural-drafting", "plant-structural-3d-modelling"],
    basis: "prior-project-experience",
    caution: "Previous experience does not establish a current licence.",
  },
  {
    name: "PDMS",
    discipline: "Plant design environment (historical)",
    use: "Historical exposure to structural modelling within PDMS project environments.",
    services: ["plant-structural-3d-modelling"],
    basis: "prior-project-experience",
    legacy: true,
    caution: "Listed as historical exposure; offered only where genuinely in scope and available.",
  },
  {
    name: "Navisworks",
    discipline: "Model review & coordination",
    use: "Model review, walkthrough and coordination checks against other disciplines.",
    services: ["plant-structural-3d-modelling", "brownfield-structural-modifications"],
    basis: "prior-project-experience",
    caution: "Clash checking is geometric coordination, not verification of structural adequacy.",
  },
];

/** Shown wherever software is listed, so experience is never read as a licence or version promise. */
export const softwareQualifier =
  "Software listed reflects the senior team's project experience. Supported platforms, versions and file formats for a new package are confirmed during scope review.";

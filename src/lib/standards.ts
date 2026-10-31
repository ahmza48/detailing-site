import type { ServiceSlug } from "./services";
import { site } from "@/lib/site";

/**
 * Standards register used by the Codes & Standards page and service pages.
 *
 * These are reference families that a project may specify. Listing one is
 * not a claim of certification, and editions are deliberately left blank:
 * the applicable edition is fixed per project in the scope of work.
 * Populate `edition` / `lastVerified` only from a verified project basis.
 */
export type StandardGroup = "design-construction" | "project-specs" | "information" | "quality";

export type StandardReference = {
  id: string;
  publisher: string;
  identifier: string;
  title: string;
  group: StandardGroup;
  /** Where it is typically relevant to our deliverables. */
  context: string;
  relevantServices: ServiceSlug[];
  /** Who normally owns compliance decisions under this standard. */
  responsibility: string;
  caution: string;
  edition?: string;
  sourceUrl?: string;
  lastVerified?: string;
};

export const standards: StandardReference[] = [
  {
    id: "client-project",
    publisher: "Client / EPC / asset owner",
    identifier: "Project specifications",
    title: "Client, EPC and owner standards and project specifications",
    group: "project-specs",
    context: "Drafting and modelling standards, title blocks, numbering, material specifications and file formats for the specific project.",
    relevantServices: [
      "civil-structural-drafting",
      "plant-structural-3d-modelling",
      "steel-detailing-fabrication",
      "rcc-reinforcement-detailing",
      "brownfield-structural-modifications",
      "material-takeoffs-documentation",
    ],
    responsibility: "Client / project engineering team",
    caution: "Usually override or supplement general standards within the contract hierarchy agreed for the project.",
  },
  {
    id: "aisc-303",
    publisher: "AISC",
    identifier: "AISC 303",
    title: "Code of Standard Practice for Steel Buildings and Bridges",
    group: "design-construction",
    context: "Structural steel detailing, fabrication and erection practice, including the exchange of design and detailing information.",
    relevantServices: ["steel-detailing-fabrication"],
    responsibility: "Contract parties as defined in the project; design by the engineer of record",
    caution: "Working to AISC 303 does not imply AISC certification.",
    sourceUrl: "https://www.aisc.org/aisc/publications/current-standards/aisc-303/",
  },
  {
    id: "aisc-360",
    publisher: "AISC",
    identifier: "AISC 360",
    title: "Specification for Structural Steel Buildings",
    group: "design-construction",
    context: "Steel design framework referenced by the responsible designer; relevant to how design information is presented on drawings.",
    relevantServices: ["civil-structural-drafting", "steel-detailing-fabrication"],
    responsibility: "Responsible structural designer",
    caution: "Design requirements are set by a qualified design authority; detailing does not perform or approve design.",
  },
  {
    id: "aws-d11",
    publisher: "AWS",
    identifier: "AWS D1.1",
    title: "Structural Welding Code — Steel",
    group: "design-construction",
    context: "Weld symbols and weld-related information shown on steel shop drawings, as specified by the design.",
    relevantServices: ["steel-detailing-fabrication"],
    responsibility: "Responsible designer and fabricator",
    caution: "Weld notation on drawings is not a welding service or welding certification.",
    sourceUrl: "https://cm.aws.org/standards-and-publications/codes-and-standards/d1-1/",
  },
  {
    id: "rcsc",
    publisher: "RCSC",
    identifier: "RCSC Specification",
    title: "Specification for Structural Joints Using High-Strength Bolts",
    group: "design-construction",
    context: "Bolt types, joint designations and bolt lists on steel connection details.",
    relevantServices: ["steel-detailing-fabrication"],
    responsibility: "Responsible designer",
    caution: "Followed as specified in the approved design and contract edition.",
  },
  {
    id: "aci-318",
    publisher: "ACI",
    identifier: "ACI 318",
    title: "Building Code Requirements for Structural Concrete",
    group: "design-construction",
    context: "Concrete design framework referenced by the responsible designer; governs cover, laps and anchorage shown on detailing.",
    relevantServices: ["civil-structural-drafting", "rcc-reinforcement-detailing"],
    responsibility: "Responsible structural designer",
    caution: "Reinforcement is detailed from approved design requirements; detailing is not concrete design approval.",
  },
  {
    id: "aci-315",
    publisher: "ACI",
    identifier: "ACI 315 family",
    title: "Guidance on detailing concrete reinforcement",
    group: "design-construction",
    context: "Presentation of reinforcement drawings, bar marks and placing information.",
    relevantServices: ["rcc-reinforcement-detailing"],
    responsibility: "Detailer, to the project-specified reference",
    caution: "Applicable document and edition confirmed per project.",
  },
  {
    id: "bs-8666",
    publisher: "BSI",
    identifier: "BS 8666",
    title: "Scheduling, dimensioning, cutting and bending of steel reinforcement",
    group: "design-construction",
    context: "Bar shape codes and bar bending schedules where the contract specifies British practice.",
    relevantServices: ["rcc-reinforcement-detailing", "material-takeoffs-documentation"],
    responsibility: "Detailer, to the project-specified edition",
    caution: "Exact edition and adoption confirmed for each project.",
  },
  {
    id: "eurocodes",
    publisher: "CEN",
    identifier: "Eurocodes",
    title: "Eurocodes with the applicable National Annex",
    group: "design-construction",
    context: "Steel and concrete design basis on projects that adopt European standards.",
    relevantServices: ["civil-structural-drafting", "steel-detailing-fabrication", "rcc-reinforcement-detailing"],
    responsibility: "Responsible structural designer",
    caution: "Not mixed with incompatible design bases; the project design basis governs.",
  },
  {
    id: "iso-19902",
    publisher: "ISO",
    identifier: "ISO 19902",
    title: "Fixed steel offshore structures",
    group: "design-construction",
    context: "Offshore structural packages where the contract designates this standard.",
    relevantServices: ["steel-detailing-fabrication", "brownfield-structural-modifications"],
    responsibility: "Responsible offshore structural designer",
    caution: "Relevant only where the contract applies it; no offshore structural analysis is implied.",
  },
  {
    id: "iso-19901-3",
    publisher: "ISO",
    identifier: "ISO 19901-3",
    title: "Topsides structure",
    group: "design-construction",
    context: "Offshore topsides structural requirements where specified.",
    relevantServices: ["steel-detailing-fabrication"],
    responsibility: "Responsible offshore structural designer",
    caution: "Exact contract edition and discipline scope confirmed per project.",
  },
  {
    id: "iso-19650",
    publisher: "ISO",
    identifier: "ISO 19650 series",
    title: "Information management using building information modelling",
    group: "information",
    context: "Model information exchange and naming where a project adopts it.",
    relevantServices: ["plant-structural-3d-modelling"],
    responsibility: "Project information manager / client",
    caution: "Working within an ISO 19650 process does not confer BIM certification.",
  },
  {
    id: "iso-9001",
    publisher: "ISO",
    identifier: "ISO 9001",
    title: "Quality management systems",
    group: "quality",
    context: "Organisational quality-management framework some clients reference in their supplier requirements.",
    relevantServices: [],
    responsibility: "Certifying body (where a certificate is held)",
    caution: `${site.name} does not claim ISO 9001 certification.`,
  },
];

export const standardById = (id: string) => standards.find((s) => s.id === id);

export const standardGroups: { id: StandardGroup; title: string; text: string }[] = [
  {
    id: "design-construction",
    title: "Engineering design and construction standards",
    text: "Used by the responsible designer and fabricator. We present the information they require on drawings and models; we do not certify compliance.",
  },
  {
    id: "project-specs",
    title: "Client and project specifications",
    text: "Drafting, modelling and material requirements issued for the project, which normally take precedence within the agreed contract hierarchy.",
  },
  {
    id: "information",
    title: "Modelling, information exchange and document control",
    text: "Procedures for model information, file exchange and revision control, followed where the project adopts them.",
  },
  {
    id: "quality",
    title: "Checking, design authority and approvals",
    text: "Quality frameworks and approval responsibilities. Production checking is ours; design verification and approvals remain with the authorised parties.",
  },
];

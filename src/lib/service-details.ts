import type { ServiceSlug } from "./services";

export type ServiceDetail = {
  /** Where the service applies, shown in the "At a glance" panel. */
  environment: string;
  /** What the client typically provides at the start of a package. */
  inputs: string[];
  /** Short, factual answers. Stay within proven scope. */
  faqs: { q: string; a: string }[];
};

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  "onshore-civil-structural-design-detailing": {
    environment: "Onshore · greenfield and brownfield",
    inputs: [
      "Structural design drawings and design basis from the responsible engineer",
      "Piping, equipment and cable tray layouts",
      "Plot plans and civil layouts",
      "Vendor data for equipment and skids",
      "Project specifications and drawing standards",
    ],
    faqs: [
      {
        q: "Do you provide structural design or detailing?",
        a: "We provide structural design support and detailing. Design responsibility stays with your responsible engineer; we develop layouts, framing, details, drawings and MTO from the design inputs and project standards you issue.",
      },
      {
        q: "Which onshore structures do you typically work on?",
        a: "Pipe racks and pipe bridges, process and access platforms, equipment and skid supports, cable tray supports, plant buildings, sheds, stairs, ladders and reinforced concrete structures, including substation bases.",
      },
      {
        q: "Can you work to our project's CAD and modelling standards?",
        a: "Yes. Drawings and models are produced in the environment the project specifies, including Tekla Structures, AutoCAD, PDS / Frameworks Plus and MicroStation, using the project's drawing standards and title blocks.",
      },
    ],
  },
  "offshore-structural-design-detailing": {
    environment: "Offshore · new build and modifications",
    inputs: [
      "Issued structural design drawings",
      "Project and fabrication yard specifications",
      "Existing structural models, for modification scopes",
      "Material and MTO requirements",
      "Client drafting and numbering standards",
    ],
    faqs: [
      {
        q: "Do you carry out offshore structural analysis?",
        a: "No. Our offshore scope is structural modelling, detailing, shop and fabrication drawings and MTO, prepared from the design issued by the responsible engineering organization.",
      },
      {
        q: "Can you update existing offshore structural models?",
        a: "Yes. Existing model modification and brownfield offshore support are part of the scope, so models and drawings stay consistent with the modification being made.",
      },
      {
        q: "Which tools have been used on offshore work?",
        a: "Senior team members have produced offshore detailed drawings and shop drawings in Tekla and AutoCAD.",
      },
    ],
  },
  "brownfield-structural-modifications": {
    environment: "Brownfield · operating facilities",
    inputs: [
      "Existing drawings and as-built records",
      "Site survey data, photographs and mark-ups",
      "Existing 3D models, where available",
      "Modification scope and design inputs",
      "Shutdown and tie-in constraints",
    ],
    faqs: [
      {
        q: "What if the existing drawings don't match the site?",
        a: "We start from the available records and survey information, raise discrepancies as queries, and show assumptions on the drawings so they can be verified before fabrication.",
      },
      {
        q: "How are existing, removed and new members shown?",
        a: "Modification drawings clearly distinguish existing, demolished and new steel, so site and fabrication teams can read the scope at a glance.",
      },
      {
        q: "Do you update the records once the work is done?",
        a: "Yes. As-built drawing development and existing model updates close out each modification package, so the next change starts from accurate records.",
      },
    ],
  },
  "steel-detailing-fabrication": {
    environment: "Onshore and offshore steelwork",
    inputs: [
      "Approved structural design drawings",
      "Connection design information from the responsible engineer",
      "Project steel specifications and material grades",
      "Fabricator shop standards and preferences",
      "Interface drawings from other disciplines",
    ],
    faqs: [
      {
        q: "Do you design connections?",
        a: "Connections are detailed from the connection design information provided by the responsible engineer. We do not undertake connection design calculations.",
      },
      {
        q: "What does the fabricator receive?",
        a: "General arrangement drawings, assembly and single-part shop drawings, fabrication drawings and MTO, extracted from one Tekla Structures model so they stay consistent through revisions.",
      },
      {
        q: "Can the drawings follow our shop standards?",
        a: "Yes. Drawing layouts, marking conventions and material lists are set up to the project specification and your fabrication practice.",
      },
    ],
  },
  "rcc-reinforcement-detailing": {
    environment: "Industrial concrete structures",
    inputs: [
      "Concrete outline and structural design drawings",
      "Reinforcement requirements from the responsible engineer",
      "Base plate, anchor bolt and embedment details",
      "Equipment and vendor foundation data",
      "Bar size, cover and lap standards",
    ],
    faqs: [
      {
        q: "Do you prepare bar bending schedules?",
        a: "Yes. Bar bending schedules are prepared from the reinforcement drawings for cutting and bending, and checked to match the drawings bar for bar.",
      },
      {
        q: "Do you coordinate concrete with the steelwork it supports?",
        a: "Where the drawings support it, pedestals, bases and embedded items are coordinated with the supported steelwork so both packages describe the same interface.",
      },
      {
        q: "Which concrete structures do you detail?",
        a: "Concrete structural buildings, RCC industrial structures, pipe rack foundations and pedestals, equipment bases and substation bases.",
      },
    ],
  },
  "plant-structural-3d-modelling": {
    environment: "Refinery, oil & gas and process plants",
    inputs: [
      "The project's plant design environment and catalogues",
      "Structural design drawings",
      "Discipline models for coordination",
      "Existing plant models, for brownfield updates",
      "Model review procedures and milestones",
    ],
    faqs: [
      {
        q: "Is this architectural BIM?",
        a: "No. This is structural modelling inside plant design environments for energy and process facilities, coordinated with piping, equipment and electrical disciplines.",
      },
      {
        q: "Which modelling environments has the team worked in?",
        a: "Tekla Structures, PDS with Frameworks Plus and MicroStation, with exposure to PDMS. Model review and coordination is carried out in Navisworks.",
      },
      {
        q: "Can you work on an existing plant model?",
        a: "Yes. Existing model modification and brownfield model updates are a regular part of the scope.",
      },
    ],
  },
  "structural-drawings-mto-qaqc": {
    environment: "All structural packages",
    inputs: [
      "Drawings or models to be produced or checked",
      "Design inputs and project standards",
      "Comment sheets and mark-ups",
      "Revision and document control requirements",
      "Survey and site information, for as-builts",
    ],
    faqs: [
      {
        q: "Can you check drawings produced by another team?",
        a: "Yes. Drawing checking and model review are available as a standalone service, with comments recorded and close-out confirmed against the revised drawing.",
      },
      {
        q: "How are revisions controlled?",
        a: "Comments and design changes are incorporated across every affected drawing, under the project's revision and document control requirements, and verified before re-issue.",
      },
      {
        q: "Do you produce material take-off and bar bending schedules?",
        a: "Yes. MTO for structural steel and bar bending schedules for reinforced concrete are prepared alongside the drawings they belong to.",
      },
    ],
  },
};

/** Common delivery sequence shown on every service page. */
export const deliverySteps = [
  { title: "Scope & inputs review", text: "Design inputs, standards and interfaces are confirmed, and queries raised before production starts." },
  { title: "Modelling & detailing", text: "Models and drawings are produced in your specified environment, with MTO from the same source." },
  { title: "Independent checking", text: "Every deliverable is self-checked, then checked by a senior detailer who did not originate it." },
  { title: "Issue & revisions", text: "Packages are issued under revision control, and comments are closed out through to as-built records." },
];

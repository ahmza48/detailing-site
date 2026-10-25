/**
 * Engagement and quality process content (spec 7.8–7.9, 9.5).
 *
 * Wording is deliberately conditional: an independent production check is
 * only promised "where resourced and agreed in the scope". TODO_VERIFY with
 * the owner: confirm a named checker exists before strengthening any wording.
 */

/** How a package moves from enquiry to handover (homepage, outsourcing). */
export const engagementSteps = [
  { title: "Request for quotation", text: "Share the scope of work, the design inputs you have and your target schedule." },
  { title: "Scope clarification", text: "We review the inputs, confirm standards, software and formats, and raise questions." },
  { title: "Proposal", text: "A defined scope, deliverables list, assumptions and exclusions for your approval." },
  { title: "Production and coordination", text: "Drawings, models and schedules produced, with queries raised as they arise." },
  { title: "Checks and your comments", text: "Production checks before issue; your review comments incorporated." },
  { title: "Handover", text: "Native and PDF deliverables issued with registers and revision status." },
];

/** Technical delivery sequence (spec v2 §11.1). */
export const qualityProcess = [
  {
    title: "Scope & deliverable definition",
    text: "Output list, models, drawing types, package boundaries, interfaces, submission stages, design authority and exclusions confirmed.",
  },
  {
    title: "Approved technical inputs & queries",
    text: "Source drawings and models, issue status, specifications, applicable codes and editions and missing engineering decisions recorded; RFIs and technical queries raised for incomplete or contradictory data.",
  },
  {
    title: "Production setup & coordination",
    text: "Grids, model coordinates, templates, layer and part-mark conventions, fabrication preferences, reference models and file versions agreed.",
  },
  {
    title: "Drafting, modelling & detailing",
    text: "The commissioned output prepared from accepted source material, keeping related drawings, schedules and models linked as required.",
  },
  {
    title: "Defined production checks",
    text: "Scope-specific completeness, dimensions, references, revision tags, model-to-drawing consistency and material reconciliation checked under the agreed procedure.",
  },
  {
    title: "Client review & technical changes",
    text: "Submitted for the designated review; returned comments logged, approval sought for engineering changes, and contracted revisions distinguished from scope changes.",
  },
  {
    title: "Controlled issue & handover",
    text: "Agreed native, PDF, model and schedule files issued with registers and transmittal records. As-built updates only from verified final information, where included.",
  },
];

/** Records that can be set up for a package where the project requires them. */
export const qualityRecords = [
  "Input register",
  "Technical query (RFI) log",
  "Drawing and deliverable register",
  "Drawing check record",
  "Mark-up and comment log",
  "Transmittals",
  "Final issue register",
  "MTO reconciliation",
];

/** Quality terminology, kept technically precise (spec v2 §11.2). */
export const checkTypes = [
  {
    title: "Self-check / production checking",
    included: "Included",
    text: "Whether the drafting or detailing output agrees with the approved input, dimensions, references, registers and scope. The extent depends on the agreed procedure.",
  },
  {
    title: "Peer / senior checking",
    included: "Where resourced and agreed",
    text: "A second-person review, only where it is resourced and part of the accepted procedure for the package.",
  },
  {
    title: "Interdisciplinary model review",
    included: "Where included in scope",
    text: "A geometric or information-interface check against supplied reference models. Not a guarantee of clash-free construction.",
  },
  {
    title: "Design verification / independent certification",
    included: "Not included",
    text: "Engineering analysis and professional assessment, separate from drawing checking and provided only under a separately established scope.",
  },
  {
    title: "Client acceptance",
    included: "Client / contract role",
    text: "An agreed submission status under the contract, not automatic legal approval or fitness for construction.",
  },
  {
    title: "As-built verification",
    included: "Requires verified source",
    text: "The actual final field condition needs a reliable, authorised source, not inference from the last construction drawing.",
  },
];

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

/** Quality & Delivery page process (spec 7.8). */
export const qualityProcess = [
  { title: "RFQ and scope", text: "Scope, deliverables, exclusions and responsibilities agreed before work starts." },
  { title: "Approved inputs and revision control", text: "Input documents logged with their revision and status; superseded inputs withdrawn." },
  { title: "Model and drawing setup", text: "Templates, grids, numbering, title blocks and software version set up to the project requirements." },
  { title: "Production and self-check", text: "The originator checks each drawing or model against the inputs and standards." },
  {
    title: "Independent production check",
    text: "A second detailer or checker reviews the deliverable where this is resourced and agreed in the scope.",
  },
  { title: "Queries and coordination", text: "Technical queries raised in writing; interfaces with other disciplines coordinated." },
  { title: "Client comments and approvals", text: "Your review comments incorporated; design approvals remain with the responsible engineer." },
  { title: "Revision history", text: "Every re-issue carries its revision, description and the comments it closes." },
  { title: "File and document handover", text: "Native files, PDFs, registers and transmittals issued in the agreed format." },
  { title: "Close-out and records", text: "The issued package and its records retained for future revisions and as-builts." },
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

/** Distinguishes checking activities (spec 7.8 / 9.1). */
export const checkTypes = [
  {
    title: "Production checking",
    included: "Included",
    text: "Completeness, consistency and source/revision checks of drawings, models and schedules within the agreed production scope.",
  },
  {
    title: "Independent production check",
    included: "Where resourced and agreed",
    text: "A review of the deliverable by a detailer or checker other than the originator.",
  },
  {
    title: "Independent engineering design verification",
    included: "Not included",
    text: "A separate professional engineering role that verifies design. It is not part of our production checking.",
  },
  {
    title: "Statutory approvals and certification",
    included: "Not included",
    text: "Approvals by authorities, certifying bodies or the engineer of record remain with those parties.",
  },
];

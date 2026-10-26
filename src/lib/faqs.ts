/**
 * Central FAQ registry (Home / About / FAQ brief, section F). The /faq hub shows every entry;
 * Home and About show small, non-repeating subsets. Answers are visible HTML only — no FAQPage
 * schema is emitted, because FAQ rich results are not a traffic strategy for this site.
 */
export type Faq = { id: string; q: string; a: string; links?: { href: string; label: string }[] };

export const faqs: Faq[] = [
  {
    id: "services",
    q: "What engineering services does Hormuz-Energy provide?",
    a: "We provide civil and structural CAD drafting, 3D structural and plant modelling, structural steel detailing and fabrication documentation, RCC and reinforcement detailing, brownfield drawing updates, material take-offs and engineering documentation. Each package is defined against the available design inputs and required outputs.",
    links: [{ href: "/services", label: "All services" }],
  },
  {
    id: "outsource-tekla",
    q: "Can we outsource a Tekla or structural steel detailing package?",
    a: "Yes. A defined package may include a structural modelling scope, shop, assembly and single-part drawings, erection documentation and agreed material reports. We first confirm design inputs, approved connection details, software versions, drawing standards, responsibilities and review milestones.",
    links: [
      { href: "/services/steel-detailing-fabrication", label: "Structural steel detailing" },
      { href: "/engineering-outsourcing", label: "Engineering outsourcing" },
    ],
  },
  {
    id: "quotation",
    q: "What information should we send for a quotation?",
    a: "Share a scope of work or deliverable list, available approved drawings or models, structural specifications, project location, desired output formats, the approximate drawing or tonnage scope where known, and target dates. Where inputs are incomplete, tell us what is available so we can identify assumptions and questions.",
    links: [{ href: "/contact", label: "Request a quote" }],
  },
  {
    id: "connection-design",
    q: "Do you undertake connection design or certify structural calculations?",
    a: "Our standard offer is modelling, drafting and detailing support using the engineering information provided by the responsible design team. Connection engineering, structural calculations, certification and approval responsibilities are not included unless separately agreed with appropriately authorised professionals.",
    links: [{ href: "/capabilities/codes-standards#responsibility", label: "Responsibility matrix" }],
  },
  {
    id: "owner-standards",
    q: "Can you work to Saudi Aramco, ADNOC or other project-specific standards?",
    a: "We can review the codes, standards, document conventions and project specifications you supply and confirm which requirements can be supported for the proposed package. Specific code editions, responsibilities and checking and approval arrangements are agreed before work begins. This does not imply approval or vendor status with any project owner.",
    links: [{ href: "/capabilities/codes-standards", label: "Project-specific standards" }],
  },
  {
    id: "onshore-offshore",
    q: "Can you support onshore and offshore industrial structures?",
    a: "Relevant senior professional experience includes both onshore and offshore project environments. Potential packages include pipe racks, access platforms, equipment supports, industrial steel frames and related structural documentation, depending on agreed resources and design inputs.",
    links: [{ href: "/industries", label: "Industries" }],
  },
  {
    id: "rcc-bbs",
    q: "Can you prepare RCC reinforcement drawings and BBS?",
    a: "Yes, within an agreed scope based on supplied structural and reinforcement design information. Deliverables can include foundation and RCC details, rebar placing information and bar bending schedules.",
    links: [{ href: "/services/rcc-reinforcement-detailing", label: "Reinforced concrete & rebar detailing" }],
  },
  {
    id: "brownfield",
    q: "Do you undertake brownfield modifications and as-built drawings?",
    a: "We can support updates to existing structural drawings and models using verified existing records, site surveys or client-provided markups and approved modification information. The accuracy and availability of source records are confirmed during scope review.",
    links: [{ href: "/services/brownfield-structural-modifications", label: "Brownfield modifications" }],
  },
  {
    id: "software",
    q: "What software and file formats do you use?",
    a: "The senior team has experience in Tekla Structures, AutoCAD and other modelling and drawing environments relevant to industrial projects. Current supported software, licence availability, version compatibility, native files, PDFs and exchange formats are confirmed for each engagement.",
    links: [{ href: "/capabilities#formats", label: "File formats & workflow" }],
  },
  {
    id: "quality",
    q: "How are reviews, revisions and quality checks managed?",
    a: "The project-specific delivery plan defines document numbering, input versions, production checks, client review stages, comment resolution and issue status. Any independent checking or specialist verification must be agreed explicitly and is not presumed on every assignment.",
    links: [{ href: "/quality-delivery", label: "Quality & delivery" }],
  },
  {
    id: "remote",
    q: "Can you work remotely with overseas EPC project teams?",
    a: "Our engagement model is remote technical production, with defined communication, queries, model and drawing exchanges and client review interfaces. Meeting times, access controls and milestone schedules are confirmed for each project.",
  },
  {
    id: "confidentiality",
    q: "How do you handle confidential drawings and project information?",
    a: "Confidentiality requirements, non-disclosure terms, authorised access, permitted uses and file exchange methods should be agreed before sensitive project files are shared. Send an NDA for review if your project requires one.",
    links: [{ href: "/privacy-policy", label: "Privacy policy" }],
  },
  {
    id: "prior-experience",
    q: "Does the prior project experience on this website belong to Hormuz-Energy?",
    a: "No. Selected projects and organisations are cited as previous professional experience of senior personnel through earlier employment or engagements. They are not presented as direct Hormuz-Energy contracts or endorsements.",
    links: [{ href: "/project-experience", label: "Project experience" }],
  },
  {
    id: "sectors-regions",
    q: "Which sectors and regions do you serve?",
    a: "Our services are relevant to oil and gas, gas processing, refining, petrochemicals, offshore facilities, power and industrial infrastructure. We are based in Pakistan and seek to support GCC and international engineering organisations, subject to project requirements and capacity.",
    links: [{ href: "/industries", label: "Industries" }],
  },
];

export const faqById = (id: string) => faqs.find((faq) => faq.id === id);
const pick = (ids: string[]) => ids.map(faqById).filter((faq): faq is Faq => faq !== undefined);

export const homeFaqs = pick(["services", "outsource-tekla", "quotation", "connection-design", "quality"]);
export const aboutFaqs = pick(["onshore-offshore", "prior-experience", "confidentiality"]);

/** Groups for the /faq hub. */
export const faqGroups = [
  { title: "Services & Scope", ids: ["services", "outsource-tekla", "rcc-bbs", "brownfield", "onshore-offshore", "sectors-regions"] },
  { title: "Quotations & Working Together", ids: ["quotation", "remote", "confidentiality"] },
  { title: "Responsibility, Standards & Quality", ids: ["connection-design", "owner-standards", "quality", "software"] },
].map((group) => ({ title: group.title, faqs: pick(group.ids) }));

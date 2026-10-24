import { services } from "./services";

/** Shared between the form UI and the server action. */

export const projectTypes = [
  "Greenfield",
  "Brownfield / Modification",
  "Onshore",
  "Offshore",
  "Not yet defined",
] as const;

export const mixedPackageOption = "Not sure / Mixed work package";
export const otherEnquiryOption = "Other related enquiry";
export const outsourcingOption = "Engineering Outsourcing & Subcontract Support";
/** Primary service on the RFQ: the six canonical services (S01–S06), outsourcing, and two open options. */
export const serviceOptions = [
  ...services.map((service) => service.title),
  outsourcingOption,
  mixedPackageOption,
  otherEnquiryOption,
];
/** Technical service lines that can be ticked alongside the primary service. */
export const technicalServiceOptions = services.map((service) => service.title);

/** Buyer types (not industries). */
export const clientTypes = [
  "EPC Contractor",
  "Engineering Consultancy",
  "Steel Fabricator",
  "Industrial Contractor",
  "Other",
] as const;

export const industryOptions = [
  "Onshore Oil & Gas",
  "Gas Processing / NGL",
  "Offshore Energy",
  "Refining & Petrochemicals",
  "Fertiliser / Process Plants",
  "Power & Industrial",
  "Other",
] as const;

export const designStatusOptions = [
  "Approved for construction / IFC",
  "Issued for design / in progress",
  "Existing records only (brownfield)",
  "Not yet defined",
] as const;

export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".dwg", ".dxf", ".zip", ".png", ".jpg", ".jpeg"];

export type EnquiryField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "country"
  | "clientType"
  | "service"
  | "technicalServices"
  | "projectType"
  | "industry"
  | "designStatus"
  | "software"
  | "deliverables"
  | "targetDate"
  | "nda"
  | "message"
  | "attachment";

/** All submitted values as strings (multi-selects joined with ", "; the NDA tick as "Yes"/""). */
export type EnquiryValues = Record<Exclude<EnquiryField, "attachment">, string>;

/** Labels used when the enquiry is delivered, in reading order. */
export const enquiryLabels: Record<Exclude<EnquiryField, "attachment" | "message">, string> = {
  name: "Name",
  company: "Organisation",
  email: "Work email",
  phone: "Phone",
  country: "Country / project location",
  clientType: "Client type",
  service: "Service needed",
  technicalServices: "Technical services involved",
  projectType: "Project type",
  industry: "Industry",
  designStatus: "Design status",
  software: "Software and version",
  deliverables: "Required deliverables / quantity",
  targetDate: "Target start or milestone",
  nda: "NDA requested before file exchange",
};

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  /** Echoed back so the form keeps what was typed when validation fails. */
  values?: Partial<EnquiryValues>;
};

export const initialEnquiryState: EnquiryState = { status: "idle" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{6,24}$/;

const text = (form: FormData, key: string, max = 200) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
};

/** Optional select: empty, or one of the allowed values. */
const choice = (value: string, allowed: readonly string[]) => (allowed.includes(value) ? value : "");

export type ParsedEnquiry =
  | { ok: true; values: EnquiryValues; attachment?: File }
  | { ok: false; values: EnquiryValues; errors: Partial<Record<EnquiryField, string>> };

export function parseEnquiry(form: FormData): ParsedEnquiry {
  const technical = form
    .getAll("technicalServices")
    .filter((v): v is string => typeof v === "string" && technicalServiceOptions.includes(v));

  const values: EnquiryValues = {
    name: text(form, "name"),
    company: text(form, "company"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    country: text(form, "country", 120),
    clientType: choice(text(form, "clientType"), clientTypes),
    service: text(form, "service"),
    technicalServices: [...new Set(technical)].join(", "),
    projectType: choice(text(form, "projectType"), projectTypes),
    industry: choice(text(form, "industry"), industryOptions),
    designStatus: choice(text(form, "designStatus"), designStatusOptions),
    software: text(form, "software", 160),
    deliverables: text(form, "deliverables", 600),
    targetDate: text(form, "targetDate", 120),
    nda: form.get("nda") === "yes" ? "Yes" : "",
    message: text(form, "message", 6000),
  };
  const errors: Partial<Record<EnquiryField, string>> = {};

  if (values.name.length < 2) errors.name = "Enter your name.";
  else if (values.name.length > 120) errors.name = "Name is too long.";

  if (values.company.length < 2) errors.company = "Enter your organisation's name.";
  else if (values.company.length > 160) errors.company = "Organisation name is too long.";

  if (!EMAIL.test(values.email) || values.email.length > 200) errors.email = "Enter a valid work email address.";

  if (values.phone && !PHONE.test(values.phone)) errors.phone = "Enter a valid phone number, or leave this blank.";

  if (!serviceOptions.includes(values.service)) errors.service = "Select the service you need.";

  if (values.message.length < 20) errors.message = "Describe your scope in at least 20 characters.";
  else if (values.message.length > 5000) errors.message = "Keep the scope summary under 5,000 characters.";

  const file = form.get("attachment");
  let attachment: File | undefined;
  if (file instanceof File && file.size > 0) {
    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (file.size > MAX_FILE_BYTES) errors.attachment = "The file must be 8 MB or smaller.";
    else if (!ACCEPTED_FILE_EXTENSIONS.includes(extension))
      errors.attachment = `Accepted file types: ${ACCEPTED_FILE_EXTENSIONS.join(", ")}.`;
    else attachment = file;
  }

  return Object.keys(errors).length > 0 ? { ok: false, values, errors } : { ok: true, values, attachment };
}

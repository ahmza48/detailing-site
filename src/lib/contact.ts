import { services } from "./services";

/** Shared between the form UI and the server action. */

export const projectTypes = [
  "Greenfield",
  "Brownfield / Modification",
  "Onshore",
  "Offshore",
  "Not yet defined",
] as const;

export const generalEnquiry = "General enquiry";
export const serviceOptions = [...services.map((service) => service.title), generalEnquiry];

export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".dwg", ".dxf", ".zip", ".png", ".jpg", ".jpeg"];

export type EnquiryField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "country"
  | "service"
  | "projectType"
  | "message"
  | "attachment";

export type EnquiryValues = Record<Exclude<EnquiryField, "attachment">, string>;

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

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export type ParsedEnquiry =
  | { ok: true; values: EnquiryValues; attachment?: File }
  | { ok: false; values: EnquiryValues; errors: Partial<Record<EnquiryField, string>> };

export function parseEnquiry(form: FormData): ParsedEnquiry {
  const values: EnquiryValues = {
    name: text(form, "name"),
    company: text(form, "company"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    country: text(form, "country"),
    service: text(form, "service"),
    projectType: text(form, "projectType"),
    message: text(form, "message"),
  };
  const errors: Partial<Record<EnquiryField, string>> = {};

  if (values.name.length < 2) errors.name = "Enter your name.";
  else if (values.name.length > 120) errors.name = "Name is too long.";

  if (values.company.length < 2) errors.company = "Enter your company name.";
  else if (values.company.length > 160) errors.company = "Company name is too long.";

  if (!EMAIL.test(values.email) || values.email.length > 200) errors.email = "Enter a valid work email address.";

  if (values.phone && !PHONE.test(values.phone)) errors.phone = "Enter a valid phone number, or leave this blank.";

  if (values.country.length < 2) errors.country = "Enter your country.";
  else if (values.country.length > 80) errors.country = "Country is too long.";

  if (!serviceOptions.includes(values.service)) errors.service = "Select the service you need.";

  if (!(projectTypes as readonly string[]).includes(values.projectType)) errors.projectType = "Select a project type.";

  if (values.message.length < 20) errors.message = "Describe your scope in at least 20 characters.";
  else if (values.message.length > 5000) errors.message = "Keep the message under 5,000 characters.";

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

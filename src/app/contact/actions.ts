"use server";

import { parseEnquiry, type EnquiryState } from "@/lib/contact";
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { site } from "@/lib/site";

export async function submitEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field. Report success without sending.
  if (formData.get("website")) {
    return { status: "success", message: "Thank you. Your enquiry has been received." };
  }

  const parsed = parseEnquiry(formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and submit again.",
      errors: parsed.errors,
      values: parsed.values,
    };
  }

  const result = await deliverEnquiry(parsed.values, parsed.attachment);
  if (!result.ok) {
    const fallback = site.contactEmail ? ` Please email us directly at ${site.contactEmail}.` : " Please try again shortly.";
    return {
      status: "error",
      message: `We could not send your enquiry at this time.${fallback}`,
      values: parsed.values,
    };
  }

  return {
    status: "success",
    message: "Thank you. Your project enquiry has been received and our team will respond by email.",
  };
}

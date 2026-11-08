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
    // deliverEnquiry has already logged the cause (missing settings or provider error) on the server.
    return {
      status: "error",
      message: `We could not send your enquiry just now. Your details are still in the form below. Please try again shortly, or send your scope straight to an engineer by WhatsApp or email at ${site.email.projects}.`,
      values: parsed.values,
      deliveryFailed: true,
    };
  }

  return {
    status: "success",
    message: "Thank you. Your project enquiry has been received and our team will respond by email.",
  };
}

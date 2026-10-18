import type { EnquiryValues } from "./contact";
import { site } from "./site";

/**
 * Enquiry delivery abstraction.
 *
 * Sends through the Resend HTTP API when configured. Swap the body of
 * `deliverEnquiry` to use another provider (SMTP relay, SES, a CRM webhook)
 * without touching the form or the server action.
 *
 * Required environment variables (server-side only, see .env.example):
 *   RESEND_API_KEY      API key
 *   CONTACT_TO_EMAIL    inbox that receives enquiries
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Website <enquiries@yourdomain.com>"
 */

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function deliverEnquiry(values: EnquiryValues, attachment?: File): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Company", values.company],
    ["Work email", values.email],
    ["Phone", values.phone || "—"],
    ["Country", values.country],
    ["Service needed", values.service],
    ["Project type", values.projectType],
  ];

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without credentials: log instead of sending.
      console.info("[enquiry] Email delivery is not configured. Enquiry received:", {
        ...Object.fromEntries(rows),
        message: values.message,
        attachment: attachment ? `${attachment.name} (${attachment.size} bytes)` : "none",
      });
      return { ok: true };
    }
    console.error("[enquiry] RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must be set to deliver enquiries.");
    return { ok: false, reason: "not-configured" };
  }

  const textBody = [...rows.map(([label, value]) => `${label}: ${value}`), "", values.message].join("\n");
  const htmlBody = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(values.message)}</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Project enquiry: ${values.service} — ${values.company}`.replace(/[\r\n]+/g, " "),
        text: textBody,
        html: htmlBody,
        attachments: attachment
          ? [{ filename: attachment.name, content: Buffer.from(await attachment.arrayBuffer()).toString("base64") }]
          : undefined,
      }),
    });

    if (!response.ok) {
      console.error(`[enquiry] ${site.name}: provider responded with ${response.status}`);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[enquiry] Delivery failed", error);
    return { ok: false, reason: "provider-error" };
  }
}

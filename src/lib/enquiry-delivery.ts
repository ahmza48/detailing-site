import nodemailer from "nodemailer";
import { enquiryLabels, type EnquiryValues } from "./contact";
import { site } from "./site";

/**
 * Enquiry delivery abstraction.
 *
 * Two providers, chosen by which environment variables are set (server-side only, see .env.example):
 *
 *   Gmail (current)   GMAIL_USER, GMAIL_APP_PASSWORD
 *                     Sends through the Gmail account's SMTP server with a Google App Password.
 *   Resend (future)   RESEND_API_KEY, CONTACT_FROM_EMAIL (a sender on a domain verified with Resend)
 *
 * Gmail is used when its variables are present; otherwise Resend. Switching later is a settings
 * change, not a code change. Both need:
 *   CONTACT_TO_EMAIL  inbox(es) that receive enquiries; separate several with commas
 */

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

type Message = { to: string[]; replyTo: string; subject: string; text: string; html: string; attachment?: File };

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

async function sendWithGmail(message: Message, user: string, appPassword: string): Promise<boolean> {
  const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass: appPassword } });
  await transport.sendMail({
    // Gmail only sends as the authenticated account; the display name is free.
    from: { name: `${site.name} Website`, address: user },
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
    attachments: message.attachment
      ? [{ filename: message.attachment.name, content: Buffer.from(await message.attachment.arrayBuffer()) }]
      : undefined,
  });
  return true;
}

async function sendWithResend(message: Message, apiKey: string, from: string): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: message.to,
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
      attachments: message.attachment
        ? [{ filename: message.attachment.name, content: Buffer.from(await message.attachment.arrayBuffer()).toString("base64") }]
        : undefined,
    }),
  });
  if (!response.ok) console.error(`[enquiry] ${site.name}: Resend responded with ${response.status}`);
  return response.ok;
}

export async function deliverEnquiry(values: EnquiryValues, attachment?: File): Promise<DeliveryResult> {
  const to = (process.env.CONTACT_TO_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.CONTACT_FROM_EMAIL;
  const useGmail = Boolean(gmailUser && gmailPassword);
  const useResend = !useGmail && Boolean(resendKey && resendFrom);

  // Every labelled field, in form order; blanks shown as a dash so the reader sees what was left empty.
  const rows = (Object.keys(enquiryLabels) as (keyof typeof enquiryLabels)[]).map(
    (key): [string, string] => [enquiryLabels[key], values[key] || "—"],
  );

  if (to.length === 0 || (!useGmail && !useResend)) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without credentials: log instead of sending.
      console.info("[enquiry] Email delivery is not configured. Enquiry received:", {
        ...Object.fromEntries(rows),
        message: values.message,
        attachment: attachment ? `${attachment.name} (${attachment.size} bytes)` : "none",
      });
      return { ok: true };
    }
    console.error(
      "[enquiry] Set CONTACT_TO_EMAIL plus either GMAIL_USER and GMAIL_APP_PASSWORD, or RESEND_API_KEY and CONTACT_FROM_EMAIL.",
    );
    return { ok: false, reason: "not-configured" };
  }

  const message: Message = {
    to,
    replyTo: values.email,
    subject: `Project enquiry: ${values.service} — ${values.company}`.replace(/[\r\n]+/g, " "),
    text: [...rows.map(([label, value]) => `${label}: ${value}`), "", values.message].join("\n"),
    html: `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
      .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
      .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(values.message)}</p>`,
    attachment,
  };

  try {
    const sent = useGmail
      ? await sendWithGmail(message, gmailUser!, gmailPassword!)
      : await sendWithResend(message, resendKey!, resendFrom!);
    return sent ? { ok: true } : { ok: false, reason: "provider-error" };
  } catch (error) {
    console.error("[enquiry] Delivery failed", error);
    return { ok: false, reason: "provider-error" };
  }
}

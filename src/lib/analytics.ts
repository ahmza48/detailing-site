/**
 * GTM dataLayer events (container GTM-NHFF8PJW, loaded in the root layout on production only).
 * Each event needs a Custom Event trigger and a GA4 Event tag in Tag Manager before it is reported:
 *
 *   rfq_submit       enquiry form sent successfully     { form_location, country_page }
 *   whatsapp_click   any wa.me link                     { link_location, page_path }
 *   email_click      any mailto: link                   { link_location, page_path }
 *   phone_click      any tel: link                      { link_location, page_path }
 *   pilot_cta_click  links to /pilot or data-track="pilot_cta"   { link_location, page_path }
 */
export type AnalyticsEvent = "rfq_submit" | "whatsapp_click" | "email_click" | "phone_click" | "pilot_cta_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Safe without GTM (localhost, previews): the array just collects the events. */
export function trackEvent(event: AnalyticsEvent, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

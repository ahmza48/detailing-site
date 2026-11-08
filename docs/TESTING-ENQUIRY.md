# Enquiry form and tracking: manual test

Run after any change to the contact form, `src/app/contact/actions.ts`, `src/lib/enquiry-delivery.ts`
or the email settings in Vercel. There is no automated test suite in this repo.

## 1. Delivery works (production)

1. On a phone using mobile data, open https://www.petrohill.com/contact (reload first if the page
   was already open: a page loaded before a deployment cannot submit to the new one).
2. Fill in name, organisation, work email, service and scope summary. Submit.
3. Expect "Enquiry received". The email arrives in every inbox listed in `CONTACT_TO_EMAIL`
   (check spam), with Reply-To set to the email you entered.

## 2. Failure keeps the lead (local)

1. In `.env.local`, temporarily blank `GMAIL_APP_PASSWORD` and `RESEND_API_KEY`.
2. `npm run build && npm start` (production mode: development logs the enquiry instead of failing).
3. Submit a valid enquiry at http://localhost:3000/contact.
4. Expect the red message with working **WhatsApp** and **projects@petrohill.com** links, every
   field still filled in, and `[enquiry] Set CONTACT_TO_EMAIL plus either ...` in the server log.
5. Restore `.env.local`.

## 3. Spam and validation

- Submitting with required fields empty shows field errors and sends nothing.
- The hidden `website` field (honeypot) makes the server report success without sending.

## 4. dataLayer events

In the browser console on any page (`window.dataLayer` exists even where GTM does not load):

| Action | Expected last entry in `window.dataLayer` |
|---|---|
| Successful form submission | `{ event: "rfq_submit", form_location: "contact_page", country_page: "" }` |
| Click the floating WhatsApp button | `{ event: "whatsapp_click", link_location: "floating_button", page_path: "/..." }` |
| Click an email address in the footer | `{ event: "email_click", link_location: "footer", ... }` |
| Click the phone number on /contact | `{ event: "phone_click", link_location: ..., ... }` |
| Click a link to `/pilot` (or with `data-track="pilot_cta"`) | `{ event: "pilot_cta_click", ... }` |

In production, confirm the same events in GTM Preview mode (Tag Assistant).

import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { LegalDocument, type LegalSection } from "@/components/LegalDocument";
import { ACCEPTED_FILE_EXTENSIONS } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you send through this website's quote form, by phone or by WhatsApp.`,
  path: "/privacy-policy",
  image: "/images/contact-overview.jpg",
});

/**
 * Describes the website as actually built (checked Oct 2026): quote form delivered by email
 * (Gmail via GMAIL_* settings, or Resend), hosting on Vercel, no cookies, no analytics, fonts and
 * images self-hosted. Update this page whenever any of that changes.
 * TODO_VERIFY with the owner and counsel: registered legal entity, retention period, privacy contact.
 */
const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    body: (
      <>
        <p>
          This website is operated by the business trading as {site.name}, {site.address.lines.join(", ")}. You can
          contact us about privacy through the <Link href="/contact">enquiry form</Link>, by phone on{" "}
          <a href={telHref}>{site.phone.display}</a> or on{" "}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>We only collect what you choose to send us. Through the quote form this is:</p>
        <ul>
          <li>Your name, organisation, work email address, the service you need and a description of your project (required).</li>
          <li>
            Optional details: phone number, country, client type, industry, project type, design status, services involved,
            software, deliverables, target date and whether you would like us to contact you about an NDA or secure file
            transfer first.
          </li>
          <li>
            One optional file of up to 8 MB ({ACCEPTED_FILE_EXTENSIONS.join(", ")}). Please do not send confidential
            drawings through the form; project files are exchanged after first contact, under an NDA if required.
          </li>
        </ul>
        <p>
          If you call or message us, we receive your phone number and what you tell us. Our hosting provider also processes
          technical request data, such as IP address and browser type, to deliver and protect the website.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How We Use It",
    body: (
      <ul>
        <li>To reply to your enquiry and discuss the engineering scope you describe.</li>
        <li>To prepare a quotation or proposal if you ask for one.</li>
        <li>To keep the website running securely and to meet legal obligations.</li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Analytics",
    body: (
      <p>
        This website does not set cookies and does not use analytics, advertising or tracking tools. Fonts and images are
        served from the website itself rather than from third-party services. If this changes, we will update this page
        before the change takes effect.
      </p>
    ),
  },
  {
    id: "providers",
    title: "Service Providers & Sharing",
    body: (
      <>
        <p>We use a small number of providers to run the website and receive enquiries:</p>
        <ul>
          <li>
            <strong>Vercel</strong> hosts the website and processes the form submission on its servers.
          </li>
          <li>
            <strong>Google (Gmail)</strong> delivers form submissions to our team&rsquo;s inboxes, where they are stored as
            email. The website itself does not keep form submissions in a database.
          </li>
          <li>
            <strong>WhatsApp</strong> (Meta) handles any conversation you start through the WhatsApp link, under its own
            terms and privacy policy.
          </li>
        </ul>
        <p>
          We do not sell your information. We share it only with these providers to run our operations, with professional
          advisers where necessary, or where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: "international",
    title: "International Processing",
    body: (
      <p>
        Our providers operate infrastructure in several countries, so your information may be processed outside Pakistan,
        including in countries with different data-protection rules.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How Long We Keep It",
    body: (
      <p>
        We keep enquiry emails and attachments for as long as they are needed to respond to the enquiry, prepare any
        quotation and maintain our business records. When they are no longer needed, they are deleted. Records of
        contracted projects are kept under the terms agreed for that project.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The website is served over HTTPS, the form accepts limited file types and sizes, and access to enquiry inboxes is
        restricted to authorised team members. No method of transmission or storage is completely secure, so please share
        sensitive project information only through an agreed channel.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Choices & Requests",
    body: (
      <p>
        You can ask us what information we hold about you, or ask us to correct or delete it, using the contact details
        above. We will respond subject to applicable law and may need to confirm your identity first.
      </p>
    ),
  },
  {
    id: "other",
    title: "External Links, Children & Changes",
    body: (
      <>
        <p>
          Links to other websites are governed by those websites&rsquo; own policies. This website is intended for business
          enquiries and is not directed at children.
        </p>
        <p>
          We will update this page when our practices change and show the date of the latest version at the top. See also
          our <Link href="/terms-of-use">Website Terms of Use</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`How ${site.name} handles the information you send through this website.`}
        image="/images/contact-overview.jpg"
        imageAlt="Process towers and a crane under an evening sky"
        crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
      />
      <LegalDocument
        updated="27 October 2026"
        notice={
          <>This notice describes how the website currently works. It is being reviewed with legal advisers and may be updated.</>
        }
        sections={sections}
      />
    </>
  );
}

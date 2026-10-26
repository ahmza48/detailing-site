import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { LegalDocument, type LegalSection } from "@/components/LegalDocument";
import { pageMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Terms of Use",
  description: `Terms for using the ${site.name} website. Engineering services are governed by a separately agreed proposal or contract.`,
  path: "/terms-of-use",
  image: "/images/drawings-qaqc.jpg",
});

/**
 * Website terms only: not a master services agreement. Governing law, forum, liability and
 * indemnity wording are deliberately omitted until reviewed by counsel (TODO_VERIFY).
 */
const sections: LegalSection[] = [
  {
    id: "about-this-site",
    title: "About This Site",
    body: (
      <p>
        This website is operated by the business trading as {site.name}, {site.address.lines.join(", ")}. It provides
        general information about the engineering production services offered under the {site.name} brand. By using the
        site you agree to these terms.
      </p>
    ),
  },
  {
    id: "information-only",
    title: "Information Only",
    body: (
      <p>
        Service descriptions and project references on this site are informational and may be updated. They do not
        constitute engineering advice, a binding quotation, a warranty or an offer of professional certification.
      </p>
    ),
  },
  {
    id: "quotations",
    title: "Quotations & Contracts",
    body: (
      <p>
        Submitting a request for quotation or contacting us does not establish a customer engagement. Project scope,
        deliverables, responsibilities, fees, schedule, confidentiality, intellectual property, liabilities and applicable
        technical standards are governed by a separately agreed proposal or contract.
      </p>
    ),
  },
  {
    id: "engineering-boundaries",
    title: "Engineering Boundaries",
    body: (
      <p>
        Descriptions of technical support do not imply independent design authority, certification or regulatory
        approval. Such services require express agreement and appropriately authorised professionals.
      </p>
    ),
  },
  {
    id: "content",
    title: "Content Ownership & Permitted Use",
    body: (
      <p>
        The text, graphics and other materials on this site are owned by or licensed to their respective owners. You may
        view the site and share links to it. You may not reproduce documents, drawings or third-party branding from the
        site without permission, except as allowed by applicable law.
      </p>
    ),
  },
  {
    id: "third-party-names",
    title: "Third-Party Names & Projects",
    body: (
      <p>
        Historical project and employer references relate to the prior individual professional experience of senior team
        members, not to an endorsement of, or contractual relationship with, the present company. Third-party names and
        marks belong to their owners. Photographs are representative industry images unless stated otherwise.
      </p>
    ),
  },
  {
    id: "uploads",
    title: "Confidentiality & Uploads",
    body: (
      <p>
        Please do not upload confidential or proprietary project files until an appropriate channel and confidentiality
        terms are agreed. Material sent through the contact form should be limited to what is necessary for an initial
        enquiry.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External Links",
    body: <p>Links to other websites are provided for convenience. We do not control and are not responsible for their content.</p>,
  },
  {
    id: "availability",
    title: "Availability",
    body: (
      <p>
        We aim to keep the site available and accurate but do not promise uninterrupted access or that it will be free of
        errors. Nothing in these terms excludes or limits any liability that cannot be excluded or limited under applicable
        law.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        How we handle information you send us is described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "changes-contact",
    title: "Changes & Contact",
    body: (
      <p>
        We may update these terms; the date of the current version is shown at the top of this page. Questions can be sent
        through our <Link href="/contact">enquiry form</Link> or by phone on <a href={telHref}>{site.phone.display}</a>.
      </p>
    ),
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Website Terms of Use"
        intro="The terms that apply to using this website. Engineering work is always governed by a separately agreed proposal or contract."
        image="/images/drawings-qaqc.jpg"
        imageAlt="Engineering drawings on a desk with drafting pencils and a scale rule"
        crumbs={[{ name: "Terms of Use", path: "/terms-of-use" }]}
      />
      <LegalDocument
        updated="27 October 2026"
        notice={<>These website terms are being reviewed with legal advisers and may be updated.</>}
        sections={sections}
      />
    </>
  );
}

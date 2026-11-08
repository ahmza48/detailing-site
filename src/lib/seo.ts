import type { Metadata } from "next";
import { site } from "./site";
import { services, servicePath, type Service } from "./services";

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function pageMetadata({ title, description, path, keywords, image }: PageMeta): Metadata {
  const ogImage = image ?? site.ogImage;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

export type Crumb = { name: string; path: string };

export const breadcrumbJsonLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

const organizationId = `${site.url}/#organization`;

/** Markets served (fix prompt 3.1): ISO 3166 codes, as Country nodes where a Place is expected. */
export const areaServedCodes = ["AE", "SA", "QA", "KW", "OM", "US", "GB", "AU"] as const;
const areaServed = areaServedCodes.map((code) => ({ "@type": "Country", name: code }));

/**
 * FAQPage for questions that are visible on the page (fix prompt 3.4). Emit once per page,
 * with exactly the questions rendered there.
 */
export const faqPageJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

/** Organization + ProfessionalService. No reviews or ratings are asserted. */
export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: site.url,
      description: site.description,
      logo: absoluteUrl("/logo/petrohill-energy-logo.png"),
      telephone: site.phone.e164,
      address: postalAddress,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phone.e164,
        contactType: "sales",
        email: site.email.projects,
        areaServed: [...areaServedCodes],
        availableLanguage: ["English"],
      },
      email: site.email.info,
      ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.name,
      url: site.url,
      image: absoluteUrl(site.ogImage),
      description: site.tagline,
      parentOrganization: { "@id": organizationId },
      telephone: site.phone.e164,
      email: site.email.projects,
      address: postalAddress,
      areaServed,
      knowsAbout: [
        "Structural steel detailing",
        "Tekla modelling",
        "Pipe rack detailing",
        "Offshore structural detailing",
        "Rebar detailing",
        "Brownfield as-built documentation",
        "Plant structural 3D modelling",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Civil & structural design, detailing and modelling services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: absoluteUrl(servicePath(service.slug)),
          },
        })),
      },
    },
  ],
});

export const serviceJsonLd = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  serviceType: service.title,
  description: service.seo.description,
  url: absoluteUrl(servicePath(service.slug)),
  image: absoluteUrl(service.image),
  provider: { "@id": organizationId },
  areaServed,
  audience: {
    "@type": "BusinessAudience",
    name: "EPC contractors, engineering consultancies and steel fabricators in the energy sector",
  },
});

/** Service schema for a market or specialism landing page (fix prompt 3.2 / phase 4). */
export const landingServiceJsonLd = (page: {
  slug: string;
  seo: { title: string; description: string };
  hero: { image: string };
  schema: { serviceType: string; areaServed: string[] };
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: page.seo.title,
  serviceType: page.schema.serviceType,
  description: page.seo.description,
  url: absoluteUrl(`/${page.slug}`),
  image: absoluteUrl(page.hero.image),
  provider: { "@id": organizationId },
  // ISO country codes become Country nodes; a region name such as "Europe" becomes a Place.
  areaServed: page.schema.areaServed.map((area) => ({ "@type": area.length === 2 ? "Country" : "Place", name: area })),
});

/**
 * BlogPosting for /resources articles. The author is site.articleAuthor as a Person when set, otherwise
 * the PetroHill Organization node emitted on every page. No FAQPage schema: FAQs stay as visible content only.
 */
export const blogPostingJsonLd = (article: {
  path: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  keyword?: string;
}) => {
  const organization = { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name };
  const person = site.articleAuthor && {
    "@type": "Person",
    name: site.articleAuthor.name,
    jobTitle: site.articleAuthor.jobTitle,
    ...(site.articleAuthor.url ? { url: absoluteUrl(site.articleAuthor.url) } : {}),
    ...(site.articleAuthor.sameAs?.length ? { sameAs: site.articleAuthor.sameAs } : {}),
    worksFor: { "@id": organizationId },
  };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.headline,
    description: article.description,
    image: absoluteUrl(article.image),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: "en",
    ...(article.keyword ? { keywords: article.keyword } : {}),
    author: person ?? organization,
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(article.path) },
  };
};

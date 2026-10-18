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
      locale: "en_US",
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
      telephone: site.phone.e164,
      address: postalAddress,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phone.e164,
        contactType: "sales",
        areaServed: ["PK", "AE", "SA", "QA"],
        availableLanguage: ["English"],
      },
      ...(site.contactEmail ? { email: site.contactEmail } : {}),
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
      address: postalAddress,
      knowsAbout: [
        "Structural steel detailing",
        "RCC and reinforcement detailing",
        "Plant structural 3D modelling",
        "Offshore structural detailing",
        "Brownfield structural modifications",
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
  audience: {
    "@type": "BusinessAudience",
    name: "EPC contractors, engineering consultancies and steel fabricators in the energy sector",
  },
});

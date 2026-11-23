import type { Metadata } from "next";

export const SITE_URL = "https://obsidiansix.com";
export const SITE_NAME = "Obsidian Six";

/**
 * Builds an absolute canonical URL. The site runs with `trailingSlash: true`,
 * so every canonical ends with a slash to match the URL Google actually crawls.
 */
export function canonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

type PageMetaInput = {
  path: string;
  /** Page title without the brand. The root layout template appends "| Obsidian Six". */
  title: string;
  description: string;
  /** Use when the title already carries the brand or must skip the template. */
  absoluteTitle?: boolean;
  image?: string | undefined;
  noIndex?: boolean;
};

/** One place to build title, description, canonical and social tags for a page. */
export function pageMeta({
  path,
  title,
  description,
  absoluteTitle,
  image,
  noIndex,
}: PageMetaInput): Metadata {
  const url = canonicalUrl(path);
  image = image || "/images/logo/logo2.png";
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: image }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }
      : {}),
  };
}

/** Business details. Keep these identical to Google Business Profile, JustDial, Clutch and LinkedIn. */
export const BUSINESS = {
  name: SITE_NAME,
  phone: "+91 80856 52729",
  phoneE164: "+918085652729",
  email: "info@obsidiansix.com",
  offices: [
    {
      name: "Obsidian Six – Mumbai",
      streetAddress: "Platinum BKC, 3rd Floor, Bandra",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400051",
    },
    {
      name: "Obsidian Six – Bhopal",
      streetAddress: "Danish Nagar, Hoshangabad Road",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462026",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/obsidian-six/",
    "https://www.instagram.com/obsidiansixofficial/",
  ],
};

export function organizationSchema() {
  const address = BUSINESS.offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.streetAddress,
    addressLocality: o.addressLocality,
    addressRegion: o.addressRegion,
    postalCode: o.postalCode,
    addressCountry: "IN",
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BUSINESS.name,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/logo/logo2.png`,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        founder: { "@type": "Person", name: "Aadarsh Kumar" },
        address: address[0],
        sameAs: BUSINESS.sameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: BUSINESS.phone,
            contactType: "sales",
            email: BUSINESS.email,
            areaServed: ["IN", "AE", "GB", "US"],
            availableLanguage: ["en", "hi"],
          },
        ],
      },
      ...BUSINESS.offices.map((o, i) => ({
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#office-${o.addressLocality.toLowerCase()}`,
        name: o.name,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/images/logo/logo2.png`,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        priceRange: "₹₹",
        address: address[i],
        areaServed: [
          { "@type": "City", name: o.addressLocality },
          { "@type": "Country", name: "India" },
        ],
        knowsAbout: [
          "Digital marketing",
          "Search engine optimisation",
          "Performance marketing",
          "Branding",
          "Web development",
          "E-commerce development",
          "Mobile app development",
        ],
      })),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: BUSINESS.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

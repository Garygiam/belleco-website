import { brand } from "@/config/brand";
import { absoluteUrl } from "@/lib/seo/urls";

type ServiceInput = {
  name: string;
  url: string;
  description?: string;
};

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#local-business"),
    name: brand.name,
    description: brand.subTagline,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo-dark.png"),
    image: absoluteUrl("/brand/logo-dark.png"),
    telephone: brand.contact.phoneDisplay,
    email: brand.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.contact.addressLines[0],
      addressLocality: "Kuala Lumpur",
      addressRegion: "Kuala Lumpur",
      addressCountry: "MY",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: brand.contact.phoneDisplay,
      email: brand.contact.email,
      availableLanguage: ["en", "zh", "ms"],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "11:00",
        closes: "18:00",
      },
    ],
    sameAs: [brand.links.instagram, brand.links.facebook, brand.links.youtube],
  } as const;
}

export function buildServiceJsonLd(input: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${input.url}#service`,
    name: input.name,
    url: input.url,
    description: input.description,
    serviceType: input.name,
    provider: {
      "@id": absoluteUrl("/#local-business"),
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kuala Lumpur",
    },
  } as const;
}

type Faq = {
  q: string;
  a: string;
};

export function buildFaqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  } as const;
}

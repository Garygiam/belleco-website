import { brand } from "@/config/brand";
import { absoluteUrl } from "@/lib/seo/urls";
import { describe, expect, it } from "vitest";

import { buildFaqJsonLd, buildLocalBusinessJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonLd";

describe("jsonLd", () => {
  it("builds LocalBusiness JSON-LD with rich local entity fields", () => {
    const json = buildLocalBusinessJsonLd();

    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("LocalBusiness");
    expect(json["@id"]).toBe(absoluteUrl("/#local-business"));
    expect(json.name).toBe(brand.name);
    expect(json.description).toBe(brand.subTagline);
    expect(json.telephone).toBe(brand.contact.phoneDisplay);
    expect(json.email).toBe(brand.contact.email);
    expect(json.url).toBe(absoluteUrl("/"));
    expect(json.logo).toBe(absoluteUrl("/brand/logo-dark.png"));
    expect(json.image).toBe(absoluteUrl("/brand/logo-dark.png"));

    expect(json.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: brand.contact.addressLines[0],
      addressLocality: "Kuala Lumpur",
      addressRegion: "Kuala Lumpur",
      addressCountry: "MY",
    });

    expect(json.contactPoint).toEqual({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: brand.contact.phoneDisplay,
      email: brand.contact.email,
      availableLanguage: ["en", "zh", "ms"],
    });
    expect(json.openingHoursSpecification).toEqual([
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
    ]);
    expect(json.sameAs).toEqual([
      brand.links.instagram,
      brand.links.facebook,
      brand.links.youtube,
    ]);
  });

  it("builds Service JSON-LD with a linked LocalBusiness provider", () => {
    const serviceUrl = absoluteUrl("/services/acne-treatment-kuala-lumpur");

    const json = buildServiceJsonLd({
      name: "Acne Treatment",
      url: serviceUrl,
      description: "Diagnosis-led acne care in Kuala Lumpur.",
    });

    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("Service");
    expect(json["@id"]).toBe(`${serviceUrl}#service`);
    expect(json.name).toBe("Acne Treatment");
    expect(json.url).toBe(serviceUrl);
    expect(json.provider).toEqual({
      "@id": absoluteUrl("/#local-business"),
    });
    expect(json.areaServed).toEqual({
      "@type": "AdministrativeArea",
      name: "Kuala Lumpur",
    });
    expect(json.description).toBe("Diagnosis-led acne care in Kuala Lumpur.");
  });

  it("builds FAQPage JSON-LD from visible service FAQs", () => {
    const json = buildFaqJsonLd([
      {
        q: "How many sessions do I need?",
        a: "It depends on your skin condition and treatment goals.",
      },
    ]);

    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("FAQPage");
    expect(json.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "How many sessions do I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on your skin condition and treatment goals.",
        },
      },
    ]);
  });
});

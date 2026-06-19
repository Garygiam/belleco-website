import type { Metadata } from "next";
import { ServicePage } from "../_components/ServicePage";
import { brand } from "@/config/brand";
import { getDictionary, getServiceContent } from "@/lib/i18n";
import { buildFaqJsonLd, buildLocalBusinessJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

const canonicalPath = "/services/facial-kuchai-lama";
const serviceUrl = absoluteUrl(canonicalPath);
const content = getServiceContent("en", "facial-kuchai-lama");
const dictionary = getDictionary("en");
const supportingLinks = [
  { href: "/en", label: brand.name },
  { href: "/en#treatments", label: dictionary.common.exploreTreatments },
  { href: "/en#before-after-results", label: dictionary.common.viewResults },
];

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: {
    canonical: serviceUrl,
  },
};

export default function Page() {
  return (
    <ServicePage
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      bullets={content.bullets}
      suitability={content.suitability}
      process={content.process}
      expectations={content.expectations}
      faqs={content.faqs}
      labels={dictionary.services.labels}
      supportingLinks={supportingLinks}
      jsonLd={[
        buildLocalBusinessJsonLd(),
        buildServiceJsonLd({
          name: content.title,
          url: serviceUrl,
          description: content.description,
        }),
        buildFaqJsonLd(content.faqs),
      ]}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/app/services/_components/ServicePage";
import {
  getDictionary,
  getServiceContent,
  isLocale,
  isServiceSlug,
  locales,
  serviceSlugs,
} from "@/lib/i18n";
import { brand } from "@/config/brand";
import { buildFaqJsonLd, buildLocalBusinessJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

function buildServiceLanguages(slug: string) {
  return {
    en: absoluteUrl(`/en/services/${slug}`),
    zh: absoluteUrl(`/zh/services/${slug}`),
    ms: absoluteUrl(`/ms/services/${slug}`),
    "x-default": absoluteUrl(`/en/services/${slug}`),
  };
}

export async function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isLocale(lang) || !isServiceSlug(slug)) {
    return {};
  }

  const content = getServiceContent(lang, slug);
  const canonicalPath = `/${lang}/services/${slug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: buildServiceLanguages(slug),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;

  if (!isLocale(lang) || !isServiceSlug(slug)) {
    notFound();
  }

  const content = getServiceContent(lang, slug);
  const dictionary = getDictionary(lang);
  const localizedServiceUrl = absoluteUrl(`/${lang}/services/${slug}`);
  const supportingLinks = [
    { href: `/${lang}`, label: brand.name },
    { href: `/${lang}#treatments`, label: dictionary.common.exploreTreatments },
    { href: `/${lang}#before-after-results`, label: dictionary.common.viewResults },
  ];

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
      bookingHref={`/${lang}/book`}
      labels={dictionary.services.labels}
      supportingLinks={supportingLinks}
      jsonLd={[
        buildLocalBusinessJsonLd(),
        buildServiceJsonLd({
          name: content.title,
          url: localizedServiceUrl,
          description: content.description,
        }),
        buildFaqJsonLd(content.faqs),
      ]}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";
import { BookingBanner } from "@/components/BookingBanner";
import { ClientVideosSection } from "@/components/ClientVideosSection";
import { HomeHero } from "@/components/HomeHero";
import { JsonLdScripts } from "@/components/JsonLdScripts";
import { MobileStickyWhatsappCta } from "@/components/MobileStickyWhatsappCta";
import { PopularServicesSection } from "@/components/PopularServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildLocalBusinessJsonLd } from "@/lib/seo/jsonLd";
import { buildHomeMetadata } from "@/lib/seo/page-metadata";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  return buildHomeMetadata(lang);
}

export default async function LocaleHomePage({
  params,
}: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <main className="cinematic-bg cinematic-grain flex-1 bg-page">
      <HomeHero locale={locale} dictionary={dictionary} />
      <TreatmentsSection locale={locale} dictionary={dictionary} />
      <PopularServicesSection locale={locale} dictionary={dictionary} />
      <BeforeAfterResultsSection locale={locale} dictionary={dictionary} />
      <TestimonialsSection locale={locale} dictionary={dictionary} />
      <ClientVideosSection locale={locale} dictionary={dictionary} />
      <BookingBanner locale={locale} dictionary={dictionary} />
      <MobileStickyWhatsappCta locale={locale} dictionary={dictionary} />
      <JsonLdScripts items={[buildLocalBusinessJsonLd()]} />
    </main>
  );
}

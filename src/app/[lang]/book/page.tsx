import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingForm } from "@/app/book/BookingForm";
import { JsonLdScripts } from "@/components/JsonLdScripts";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildLocalBusinessJsonLd } from "@/lib/seo/jsonLd";
import { buildBookingMetadata } from "@/lib/seo/page-metadata";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  return buildBookingMetadata(lang);
}

export default async function LocaleBookPage({
  params,
}: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <main className="flex-1 bg-page">
      <section className="bg-page">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <BookingForm locale={locale} dictionary={dictionary} />
        </div>
      </section>
      <JsonLdScripts items={[buildLocalBusinessJsonLd()]} />
    </main>
  );
}

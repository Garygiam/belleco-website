import type { Metadata } from "next";
import { BookingForm } from "@/app/book/BookingForm";
import { JsonLdScripts } from "@/components/JsonLdScripts";
import { dictionaries } from "@/lib/i18n";
import { buildLocalBusinessJsonLd } from "@/lib/seo/jsonLd";
import { buildBookingMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildBookingMetadata("en");

export default function BookPage() {
  const locale = "en";
  const dictionary = dictionaries.en;

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

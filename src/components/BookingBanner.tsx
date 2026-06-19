import Link from "next/link";
import { brand } from "@/config/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function BookingBanner({ locale, dictionary }: Props) {
  const copy = uiCopy[locale].bookingBanner;
  return (
    <section className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="cinematic-glow relative">
          <div className="cinematic-panel relative overflow-hidden rounded-[2.5rem] px-8 py-12 md:px-12 md:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,168,128,0.22),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(197,168,128,0.14),transparent_60%)]" />
            <div className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  {copy.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-5xl">
                  {copy.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted">{copy.description}</p>
                <a
                  href={`https://wa.me/${brand.contact.phoneE164.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex text-sm font-semibold text-ink underline decoration-border underline-offset-4 transition hover:decoration-ink"
                >
                  {copy.whatsappLabel}: {brand.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <Link
                  href={`/${locale}/book`}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
                >
                  {dictionary.common.bookNow}
                </Link>
                <a
                  href={`https://wa.me/${brand.contact.phoneE164.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-8 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
                >
                  {dictionary.common.whatsapp}
                </a>
                <a
                  href={brand.links.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-page px-8 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
                >
                  {dictionary.common.getDirections}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

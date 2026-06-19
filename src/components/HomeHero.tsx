import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

const heroImageSrc =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high-end%20aesthetic%20clinic%20interior%2C%20soft%20natural%20window%20light%2C%20stone%20beige%20walls%2C%20subtle%20brass%20details%2C%20minimal%20luxury%2C%20clean%20treatment%20room%2C%20photorealistic%2C%2035mm%20wide%20angle%2C%20shallow%20depth%20of%20field%2C%20ultra%20detailed%2C%20professional%20interior%20photography&image_size=landscape_16_9";

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HomeHero({ locale, dictionary }: Props) {
  const copy = uiCopy[locale].homeHero;

  return (
    <section id="home-hero" className="bg-page">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-32">
        <div className="flex flex-col items-start gap-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {copy.badge}
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-balance font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
              {dictionary.home.hero.title}
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-8 text-muted md:text-xl">
              {copy.descriptionLead} {dictionary.home.hero.description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/book`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
            >
              {dictionary.common.bookConsultation}
            </Link>
            <a
              href="#treatments"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-7 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
            >
              {dictionary.common.exploreTreatments}
            </a>
          </div>
          <dl className="grid w-full gap-3 pt-2 md:grid-cols-3">
            {copy.chips.map((c) => (
              <div key={c.label} className={cx("cinematic-panel rounded-2xl px-5 py-4")}>
                <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  {c.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="cinematic-glow relative">
          <div className="cinematic-panel relative overflow-hidden rounded-[2.5rem]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={heroImageSrc}
                alt={copy.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                preload
                unoptimized
              />
            </div>
            <div className="flex items-center justify-between gap-6 px-7 py-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-ink">{copy.protocolTitle}</p>
                <p className="text-xs leading-5 text-muted">{copy.protocolSubtitle}</p>
              </div>
              <a
                href="#results"
                className="inline-flex h-10 items-center rounded-full border border-border bg-page/70 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur transition hover:bg-surface"
              >
                {dictionary.common.viewResults}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

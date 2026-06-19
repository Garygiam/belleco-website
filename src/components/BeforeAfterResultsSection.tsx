"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { brand } from "@/config/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

type ResultCase = {
  id: string;
  title: string;
  concern: string;
  treatment: string;
  sessions: string;
  timeline: string;
  alt: string;
  beforeSrc: string;
  afterSrc: string;
};

const resultCases: ResultCase[] = [
  {
    id: "acne-marks",
    title: "Acne Marks Recovery",
    concern: "Post-acne texture and uneven tone",
    treatment: "RF Microneedling",
    sessions: "3 sessions",
    timeline: "10 weeks",
    alt: "Placeholder before and after treatment comparison for acne marks recovery",
    beforeSrc: "/before-after/acne-marks/before.png",
    afterSrc: "/before-after/acne-marks/after.png",
  },
  {
    id: "pigmentation-reset",
    title: "Pigmentation Reset",
    concern: "Pigmentation and dull patches",
    treatment: "Laser + Brightening Protocol",
    sessions: "4 sessions",
    timeline: "12 weeks",
    alt: "Placeholder before and after treatment comparison for pigmentation reset",
    beforeSrc: "/before-after/pigmentation-reset/before.png",
    afterSrc: "/before-after/pigmentation-reset/after.png",
  },
  {
    id: "firmness-lift",
    title: "Firmness Lift",
    concern: "Softening jawline and loss of lift",
    treatment: "Doublo HIFU",
    sessions: "1 session",
    timeline: "8 weeks",
    alt: "Placeholder before and after treatment comparison for firmness lift",
    beforeSrc: "/before-after/firmness-lift/before.png",
    afterSrc: "/before-after/firmness-lift/after.png",
  },
  {
    id: "clarity-balance",
    title: "Clarity Balance",
    concern: "Congestion and redness",
    treatment: "Barrier Repair Facial",
    sessions: "2 sessions",
    timeline: "6 weeks",
    alt: "Placeholder before and after treatment comparison for clarity balance",
    beforeSrc: "/before-after/clarity-balance/before.png",
    afterSrc: "/before-after/clarity-balance/after.png",
  },
];

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function BeforeAfterResultsSection({ locale, dictionary }: Props) {
  const copy = uiCopy[locale].beforeAfter;
  const [selectedId, setSelectedId] = useState(resultCases[0]?.id ?? "");

  const selectedCase = useMemo(
    () => resultCases.find((item) => item.id === selectedId) ?? resultCases[0],
    [selectedId],
  );

  const supportingCases = useMemo(
    () => resultCases.filter((item) => item.id !== selectedCase?.id).slice(0, 3),
    [selectedCase],
  );

  if (!selectedCase) {
    return null;
  }

  const whatsappHref = `https://wa.me/${brand.contact.phoneE164.replace("+", "")}`;
  const selectedCaseCopy = copy.cases[selectedCase.id as keyof typeof copy.cases];

  return (
    <section id="before-after-results" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.eyebrow}
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-ink md:text-5xl">
              {copy.title}
            </h2>
            <p className="text-lg leading-8 text-muted">{copy.description}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="cinematic-glow">
              <div
                aria-label={`${selectedCaseCopy.title} before and after`}
                className="cinematic-panel overflow-hidden rounded-[2.25rem] p-4 md:p-5"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-border bg-page/70 px-5 py-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      {copy.before}
                    </span>
                    <div className="relative mt-5 aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-border/80 bg-page">
                      <Image
                        src={selectedCase.beforeSrc}
                        alt={`Before photo for ${selectedCaseCopy.title}`}
                        fill
                        sizes="(min-width: 1024px) 24vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-border bg-page/70 px-5 py-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      {copy.after}
                    </span>
                    <div className="relative mt-5 aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-border/80 bg-page">
                      <Image
                        src={selectedCase.afterSrc}
                        alt={`After photo for ${selectedCaseCopy.title}`}
                        fill
                        sizes="(min-width: 1024px) 24vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="cinematic-panel flex flex-col justify-between rounded-[2rem] p-7">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    {copy.featuredCase}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    {selectedCaseCopy.title}
                  </h3>
                </div>

                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      {copy.concern}
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCaseCopy.concern}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      {copy.treatment}
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCaseCopy.treatment}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      {copy.sessions}
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCase.sessions}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      {copy.timeline}
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCase.timeline}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/book`}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
                >
                  {dictionary.common.bookConsultation}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-7 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
                >
                  {dictionary.common.whatsapp}
                </a>
              </div>
            </aside>
          </div>

          <div className="before-after-mobile-rail -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0">
            {supportingCases.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`${copy.showCasePrefix} ${copy.cases[item.id as keyof typeof copy.cases].title}`}
                onClick={() => setSelectedId(item.id)}
                className="cinematic-panel flex w-[82vw] shrink-0 snap-start flex-col gap-4 rounded-[1.75rem] p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lift-strong focus:outline-none focus:ring-2 focus:ring-ring md:w-auto"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] border border-border/80 bg-page/70">
                    <Image
                      src={item.beforeSrc}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 12vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] border border-border/80 bg-page/70">
                    <Image
                      src={item.afterSrc}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 12vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-ink">
                    {copy.cases[item.id as keyof typeof copy.cases].concern}
                  </p>
                  <p className="text-xs leading-5 text-muted">
                    {copy.cases[item.id as keyof typeof copy.cases].treatment}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <p className="text-sm leading-6 text-muted">{copy.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

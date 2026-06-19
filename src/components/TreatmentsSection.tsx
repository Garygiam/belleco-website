"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Category = "acne" | "antiAging" | "radiance";

type Treatment = {
  title: string;
  category: Category;
  description: string;
  outcomes: string[];
};
import { uiCopy } from "@/lib/i18n/ui-copy";

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function TreatmentsSection({ locale, dictionary }: Props) {
  const copy = uiCopy[locale].treatments;
  const categories = [
    { key: "all", label: copy.categories.all },
    { key: "acne", label: copy.categories.acne },
    { key: "antiAging", label: copy.categories.antiAging },
    { key: "radiance", label: copy.categories.radiance },
  ] as const;
  const treatments = copy.items as readonly Treatment[];
  const [active, setActive] = useState<(typeof categories)[number]["key"]>("all");

  const filtered = useMemo(() => {
    if (active === "all") return treatments;
    return treatments.filter((t) => t.category === active);
  }, [active, treatments]);

  return (
    <section id="treatments" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              {copy.description}
            </p>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-border bg-surface/70 p-2 shadow-sm backdrop-blur">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                aria-pressed={active === category.key}
                onClick={() => setActive(category.key)}
                className={cx(
                  "h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring",
                  active === category.key
                    ? "bg-accent text-accent-ink shadow-sm"
                    : "bg-surface/70 text-muted backdrop-blur hover:bg-page",
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((treatment) => (
            <article
              key={treatment.title}
              className="group cinematic-panel h-full rounded-[2rem] p-7 transition hover:-translate-y-0.5 hover:shadow-lift-strong"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    {copy.categories[treatment.category]}
                  </p>
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                  {treatment.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {treatment.description}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {treatment.outcomes.map((outcome) => (
                  <span
                    key={outcome}
                    className="rounded-full border border-border bg-page/70 px-4 py-2 text-xs font-semibold text-ink backdrop-blur"
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 cinematic-panel flex flex-col items-start justify-between gap-4 rounded-[2rem] px-7 py-7 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-ink">{copy.unsureTitle}</p>
            <p className="mt-1 text-sm text-muted">
              {copy.unsureDescription}
            </p>
          </div>
          <Link
            href={`/${locale}/book`}
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
          >
            {dictionary.common.bookNow}
          </Link>
        </div>
      </div>
    </section>
  );
}

import { brand } from "@/config/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function TestimonialsSection({ locale }: Props) {
  const copy = uiCopy[locale].testimonials;

  return (
    <section id="results" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.eyebrow}
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-ink md:text-5xl">
              {copy.title}
            </h2>
            <p className="text-lg leading-8 text-muted">{copy.description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.items.map((t) => (
              <figure
                key={t.name}
                className="cinematic-panel flex flex-col justify-between overflow-hidden rounded-[2rem] p-7"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    {copy.reviewsLabel}
                  </span>
                  <div className="flex items-center gap-1 text-accent" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 17.3 6.2 20.6 7.4 14 2.5 9.3l6.7-.9L12 2.3l2.8 6.1 6.7.9L16.6 14l1.2 6.6L12 17.3Z"
                          fill="currentColor"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="break-words text-sm leading-7 text-muted">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
                  {t.name}
                </figcaption>
              </figure>
            ))}
            <a
              href={brand.links.googleReviews}
              className="cinematic-panel group flex flex-col justify-between overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-0.5 hover:shadow-lift-strong lg:row-span-2"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    {copy.reviewsLabel}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <p className="text-sm leading-7 text-muted">
                  {copy.moreReviewsDescription}
                </p>
              </div>
              <div className="mt-8 inline-flex items-center justify-between gap-4 rounded-full border border-border bg-accent/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition group-hover:bg-accent/16">
                {copy.moreReviews}
                <span aria-hidden>→</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

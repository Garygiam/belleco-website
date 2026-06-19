import Link from "next/link";
import { brand } from "@/config/brand";

type Faq = { q: string; a: string };

type Labels = {
  bookConsultation: string;
  whatsapp: string;
  getDirections: string;
  whoItsFor: string;
  howItWorks: string;
  whatToExpect: string;
  faqs: string;
  continueExploring: string;
};

type SupportingLink = {
  href: string;
  label: string;
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  suitability: string[];
  process: string[];
  expectations: string[];
  faqs: Faq[];
  bookingHref?: string;
  labels?: Labels;
  supportingLinks?: SupportingLink[];
  jsonLd: Array<unknown>;
};

export function ServicePage({
  eyebrow,
  title,
  description,
  bullets,
  suitability,
  process,
  expectations,
  faqs,
  bookingHref,
  labels,
  supportingLinks,
  jsonLd,
}: Props) {
  const resolvedBookingHref = bookingHref ?? "/book";
  const resolvedLabels: Labels = labels ?? {
    bookConsultation: "Book Consultation",
    whatsapp: "WhatsApp",
    getDirections: "Get Directions",
    whoItsFor: "Who it’s for",
    howItWorks: "How it works",
    whatToExpect: "What to expect",
    faqs: "FAQs",
    continueExploring: "Continue Exploring",
  };

  return (
    <main className="cinematic-bg cinematic-grain flex-1 bg-page">
      <section className="bg-page">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-ink md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={resolvedBookingHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
            >
              {resolvedLabels.bookConsultation}
            </Link>
            <a
              href={`https://wa.me/${brand.contact.phoneE164.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-8 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
            >
              {resolvedLabels.whatsapp}
            </a>
            <a
              href={brand.links.maps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-page px-8 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              {resolvedLabels.getDirections}
            </a>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {bullets.map((b) => (
              <div key={b} className="cinematic-panel rounded-2xl px-6 py-5">
                <p className="text-sm font-semibold text-ink">{b}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="cinematic-panel rounded-[2rem] p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                {resolvedLabels.whoItsFor}
              </h2>
              <div className="mt-6 space-y-4">
                {suitability.map((item) => (
                  <p key={item} className="text-sm leading-7 text-ink">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="cinematic-panel rounded-[2rem] p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                {resolvedLabels.howItWorks}
              </h2>
              <ol className="mt-6 space-y-4">
                {process.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-ink">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-ink">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-6 cinematic-panel rounded-[2rem] p-7">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {resolvedLabels.whatToExpect}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {expectations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-page/70 px-5 py-4"
                >
                  <p className="text-sm leading-7 text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 cinematic-panel rounded-[2rem] p-7">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {resolvedLabels.faqs}
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-sm font-semibold text-ink">{f.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {supportingLinks?.length ? (
            <div className="mt-6 cinematic-panel rounded-[2rem] p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                {resolvedLabels.continueExploring}
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {supportingLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-page px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {jsonLd.map((obj, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </main>
  );
}

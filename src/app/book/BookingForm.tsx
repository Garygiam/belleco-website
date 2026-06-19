"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildCallHref,
  buildWhatsAppHref,
  createEmptyBookingDraft,
  formatBookingMessage,
  type BookingDraft,
} from "@/lib/booking";
import { brand } from "@/config/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

const STORAGE_KEY = "belleco-booking-draft";

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function loadDraft(): BookingDraft {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyBookingDraft();
    const parsed = JSON.parse(raw) as Partial<BookingDraft>;
    return { ...createEmptyBookingDraft(), ...parsed };
  } catch {
    return createEmptyBookingDraft();
  }
}

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function BookingForm({ locale, dictionary }: Props) {
  const copy = uiCopy[locale].bookingForm;
  const [draft, setDraft] = useState<BookingDraft>(createEmptyBookingDraft());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setDraft(loadDraft());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const message = useMemo(() => formatBookingMessage(draft, copy.message), [copy.message, draft]);
  const whatsappHref = useMemo(() => buildWhatsAppHref(message), [message]);
  const callHref = useMemo(() => buildCallHref(), []);

  function setField<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <form
        onSubmit={onSubmit}
        className="rounded-[2.5rem] border border-border bg-surface p-8 shadow-lift md:p-10"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {copy.eyebrow}
          </p>
          <h1 className="font-serif text-4xl tracking-tight text-ink md:text-5xl">
            {dictionary.booking.title}
          </h1>
          <p className="mt-2 text-sm leading-7 text-muted">{copy.intro}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.fullName}
            </span>
            <input
              value={draft.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              required
              className="h-12 rounded-2xl border border-border bg-page px-4 text-sm text-ink outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.phone}
            </span>
            <input
              value={draft.phone}
              onChange={(e) => setField("phone", e.target.value)}
              required
              inputMode="tel"
              className="h-12 rounded-2xl border border-border bg-page px-4 text-sm text-ink outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.concern}
            </span>
            <input
              value={draft.concern}
              onChange={(e) => setField("concern", e.target.value)}
              placeholder={copy.concernPlaceholder}
              className="h-12 rounded-2xl border border-border bg-page px-4 text-sm text-ink outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.preferredDate}
            </span>
            <input
              value={draft.preferredDate}
              onChange={(e) => setField("preferredDate", e.target.value)}
              type="date"
              className="h-12 rounded-2xl border border-border bg-page px-4 text-sm text-ink outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.preferredTime}
            </span>
            <input
              value={draft.preferredTime}
              onChange={(e) => setField("preferredTime", e.target.value)}
              type="time"
              className="h-12 rounded-2xl border border-border bg-page px-4 text-sm text-ink outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>

        <div className="mt-8 rounded-[2rem] border border-border bg-page p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {copy.preferredContact}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["WhatsApp", "Call"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setField("preferredContact", method)}
                aria-pressed={draft.preferredContact === method}
                className={cx(
                  "h-10 rounded-full px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring",
                  draft.preferredContact === method
                    ? "bg-accent text-accent-ink shadow-sm"
                    : "bg-surface text-muted hover:bg-page",
                )}
              >
                {copy.contactMethods[method]}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-8 grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {copy.notesOptional}
          </span>
          <textarea
            value={draft.notes}
            onChange={(e) => setField("notes", e.target.value)}
            rows={4}
            className="rounded-[1.5rem] border border-border bg-page px-4 py-3 text-sm leading-7 text-ink outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="mt-7 flex items-start gap-3 rounded-[1.5rem] border border-border bg-page px-5 py-4">
          <input
            type="checkbox"
            checked={draft.consent}
            onChange={(e) => setField("consent", e.target.checked)}
            required
            className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
          />
          <span className="text-sm leading-6 text-muted">
            {copy.consentPrefix} {brand.name} {copy.consentSuffix}
          </span>
        </label>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
          >
            {copy.prepareMessage}
          </button>
          <a
            href={brand.links.maps}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-8 text-sm font-semibold text-ink shadow-sm transition hover:bg-page"
          >
            {copy.viewLocation}
          </a>
        </div>
      </form>

      <aside className="rounded-[2.5rem] border border-border bg-surface p-8 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          {copy.previewLabel}
        </p>
        <p className="mt-4 text-sm leading-7 text-muted">
          {submitted ? copy.previewReady : copy.previewPending}
        </p>

        <pre className="mt-6 whitespace-pre-wrap rounded-[2rem] border border-border bg-page p-6 text-sm leading-7 text-ink">
          {message}
        </pre>

        <div className="mt-6 grid gap-3">
          <a
            href={submitted ? whatsappHref : undefined}
            aria-disabled={!submitted}
            className={cx(
              "inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold shadow-lift transition",
              submitted
                ? "bg-accent text-accent-ink hover:bg-accent-hover"
                : "cursor-not-allowed bg-border text-muted",
            )}
          >
            {copy.openWhatsapp}
          </a>
          <a
            href={submitted ? callHref : undefined}
            aria-disabled={!submitted}
            className={cx(
              "inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-8 text-sm font-semibold text-ink shadow-sm transition hover:bg-page",
              !submitted && "pointer-events-none opacity-60",
            )}
          >
            {copy.callButton}
          </a>
        </div>

        <div className="mt-10 space-y-3 rounded-[2rem] border border-border bg-page p-6">
          <p className="text-sm font-semibold text-ink">{copy.openingHours}</p>
          <div className="space-y-1 text-sm text-muted">
            {brand.contact.hours.map((h) => (
              <p key={h.label}>
                <span className="font-semibold text-ink">
                  {copy.hours[h.label as keyof typeof copy.hours]}:
                </span>{" "}
                {h.value}
              </p>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

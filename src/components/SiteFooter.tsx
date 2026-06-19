import { brand } from "@/config/brand";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale }: Props) {
  const copy = uiCopy[locale].footer;
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
        <div className="space-y-3">
          <div className="inline-flex items-center">
            <span className="sr-only">{brand.name}</span>
            <span className="relative inline-block h-10 w-[220px]">
              <Image
                src="/brand/logo-light.png"
                alt=""
                fill
                sizes="220px"
                className="brand-logo-light object-contain object-left"
              />
              <Image
                src="/brand/logo-dark.png"
                alt=""
                fill
                sizes="220px"
                className="brand-logo-dark object-contain object-left"
              />
            </span>
          </div>
          <p className="text-sm leading-7 text-muted">{brand.subTagline}</p>
        </div>
        <div className="space-y-4 rounded-[1.75rem] border border-border bg-page p-5 md:rounded-none md:border-0 md:bg-transparent md:p-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {copy.contact}
          </p>
          <div className="space-y-1 text-sm text-ink">
            <p>{brand.contact.phoneDisplay}</p>
            <p>{brand.contact.email}</p>
          </div>
          <div className="space-y-1 text-sm text-muted">
            {brand.contact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={brand.links.waze}
              target="_blank"
              rel="noreferrer"
              aria-label={copy.openInWaze}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-ink transition hover:bg-page"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 3.5c4.7 0 8.5 3 8.5 6.8 0 2.7-1.9 5.1-4.8 6.2l.6 2.6-2.9-1.6c-.5.1-1 .1-1.4.1-4.7 0-8.5-3-8.5-6.8S7.3 3.5 12 3.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.2 10.5h.01M14.8 10.5h.01"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 13.7c.8.7 1.7 1 2.5 1s1.7-.3 2.5-1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span>Waze</span>
            </a>
            <a
              href={brand.links.maps}
              target="_blank"
              rel="noreferrer"
              aria-label={copy.openInMaps}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-ink transition hover:bg-page"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 21s7-5.4 7-11.2C19 6 15.9 3 12 3S5 6 5 9.8C5 15.6 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
              <span>Maps</span>
            </a>
          </div>
        </div>
        <div className="space-y-4 rounded-[1.75rem] border border-border bg-page p-5 md:rounded-none md:border-0 md:bg-transparent md:p-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {copy.social}
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-ink">
            <a
              href={brand.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border bg-page px-4 py-2 transition hover:bg-surface"
            >
              Instagram
            </a>
            <a
              href={brand.links.facebook}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border bg-page px-4 py-2 transition hover:bg-surface"
            >
              Facebook
            </a>
            <a
              href={brand.links.youtube}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border bg-page px-4 py-2 transition hover:bg-surface"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

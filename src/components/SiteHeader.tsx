"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { brand } from "@/config/brand";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  const treatmentsHref = `/${locale}#treatments`;
  const resultsHref = `/${locale}#before-after-results`;
  const bookHref = `/${locale}/book`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-nav/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href={`/${locale}`} className="group inline-flex items-center gap-3">
          <span className="sr-only">{brand.name}</span>
          <span className="relative inline-block h-9 w-[170px] md:h-10 md:w-[240px]">
            <Image
              src="/brand/logo-light.png"
              alt=""
              fill
              sizes="(max-width: 768px) 170px, 240px"
              className="brand-logo-light object-contain object-left"
              priority
            />
            <Image
              src="/brand/logo-dark.png"
              alt=""
              fill
              sizes="(max-width: 768px) 170px, 240px"
              className="brand-logo-dark object-contain object-left"
              priority
            />
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href={treatmentsHref} className="transition hover:text-ink">
            {dictionary.header.nav.treatments}
          </Link>
          <Link href={resultsHref} className="transition hover:text-ink">
            {dictionary.header.nav.results}
          </Link>
          <Link href={bookHref} className="transition hover:text-ink">
            {dictionary.header.nav.book}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={bookHref}
            className="book-button-pulse hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover md:inline-flex"
          >
            <span className="book-button-pulse__label">{dictionary.header.cta}</span>
          </Link>
          <LanguageSwitcher
            currentLocale={locale}
            currentPath={pathname}
            labels={dictionary.header.languageSwitcher}
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

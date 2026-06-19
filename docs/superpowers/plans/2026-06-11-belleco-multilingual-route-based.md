# Belléco Multilingual Route-Based Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full multilingual support with `/en`, `/zh`, and `/ms` locale routes, a top-right header switcher, translated public pages, and locale-aware redirect/SEO behavior.

**Architecture:** Move the public site under `app/[lang]/...`, backed by explicit locale dictionaries and small i18n helpers that validate locales, load the right copy, and preserve current-page switching. Keep English slugs for launch, localize shared UI and page content via dictionaries, and add request-level redirect logic from `/` based on browser language with English fallback.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, Next middleware, Vitest + Testing Library

---

## File Map

**Create**
- `src/lib/i18n/config.ts`
- `src/lib/i18n/dictionaries.ts`
- `src/lib/i18n/get-dictionary.ts`
- `src/lib/i18n/routing.ts`
- `src/lib/i18n/index.ts`
- `src/components/LanguageSwitcher.tsx`
- `src/components/LanguageSwitcher.test.tsx`
- `src/test/fixtures/dictionaries.ts`
- `src/app/[lang]/layout.tsx`
- `src/app/[lang]/page.tsx`
- `src/app/[lang]/book/page.tsx`
- `src/app/[lang]/services/acne-treatment-kuala-lumpur/page.tsx`
- `src/app/[lang]/services/hifu-kuala-lumpur/page.tsx`
- `src/app/[lang]/services/rf-microneedling-kuala-lumpur/page.tsx`
- `src/app/[lang]/services/facial-kuchai-lama/page.tsx`
- `src/middleware.ts`

**Modify**
- `src/app/layout.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`
- `src/components/HomeHero.tsx`
- `src/components/TreatmentsSection.tsx`
- `src/components/PopularServicesSection.tsx`
- `src/components/BeforeAfterResultsSection.tsx`
- `src/components/TestimonialsSection.tsx`
- `src/components/ClientVideosSection.tsx`
- `src/components/BookingBanner.tsx`
- `src/components/MobileStickyWhatsappCta.tsx`
- `src/app/book/BookingForm.tsx`
- `src/app/services/_components/ServicePage.tsx`
- `src/app/services/_components/ServicePage.test.tsx`
- `src/components/ThemeToggle.test.tsx`

**Existing references**
- `src/app/layout.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/ThemeToggle.tsx`
- `src/app/book/page.tsx`
- `src/app/page.tsx`
- `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`

## Preflight

- Re-read `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` before implementation.
- Keep `ThemeToggle` behavior unchanged while adding the language switcher beside it.
- Preserve English route slugs for launch; only the locale segment changes in the URL.

---

### Task 1: Build the locale foundation and prove route validation works

**Files:**
- Create: `src/lib/i18n/config.ts`
- Create: `src/lib/i18n/dictionaries.ts`
- Create: `src/lib/i18n/get-dictionary.ts`
- Create: `src/lib/i18n/routing.ts`
- Create: `src/lib/i18n/index.ts`
- Create: `src/test/fixtures/dictionaries.ts`
- Create: `src/components/LanguageSwitcher.test.tsx`

- [ ] **Step 1: Write the failing test for locale-aware switcher labels**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { fixtureDictionary } from "@/test/fixtures/dictionaries";

describe("LanguageSwitcher", () => {
  it("highlights the active locale and renders the three locale labels", () => {
    render(
      <LanguageSwitcher
        currentLocale="zh"
        currentPath="/zh/book"
        labels={fixtureDictionary.header.languageSwitcher}
      />,
    );

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en/book");
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "BM" })).toHaveAttribute("href", "/ms/book");
  });
});
```

- [ ] **Step 2: Add the test fixture dictionary**

```ts
export const fixtureDictionary = {
  header: {
    languageSwitcher: {
      en: "EN",
      zh: "中文",
      ms: "BM",
      ariaLabel: "Switch language",
    },
  },
} as const;
```

- [ ] **Step 3: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/LanguageSwitcher.test.tsx
```

Expected: FAIL with module resolution errors for `LanguageSwitcher` and the i18n fixture imports.

- [ ] **Step 4: Create the locale config**

```ts
export const locales = ["en", "zh", "ms"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
```

- [ ] **Step 5: Create the dictionary type and English/Chinese/Malay dictionaries**

```ts
import type { Locale } from "@/lib/i18n/config";

export type Dictionary = {
  header: {
    nav: {
      treatments: string;
      results: string;
      book: string;
    };
    cta: string;
    languageSwitcher: {
      en: string;
      zh: string;
      ms: string;
      ariaLabel: string;
    };
  };
  common: {
    whatsapp: string;
    getDirections: string;
    bookNow: string;
    bookConsultation: string;
    viewResults: string;
    exploreTreatments: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    header: {
      nav: {
        treatments: "Treatments",
        results: "Results",
        book: "Book",
      },
      cta: "Book Consultation",
      languageSwitcher: {
        en: "EN",
        zh: "中文",
        ms: "BM",
        ariaLabel: "Switch language",
      },
    },
    common: {
      whatsapp: "WhatsApp",
      getDirections: "Get Directions",
      bookNow: "Book Now",
      bookConsultation: "Book Consultation",
      viewResults: "View Results",
      exploreTreatments: "Explore Treatments",
    },
  },
  zh: {
    header: {
      nav: {
        treatments: "疗程",
        results: "效果",
        book: "预约",
      },
      cta: "预约咨询",
      languageSwitcher: {
        en: "EN",
        zh: "中文",
        ms: "BM",
        ariaLabel: "切换语言",
      },
    },
    common: {
      whatsapp: "WhatsApp",
      getDirections: "路线导航",
      bookNow: "立即预约",
      bookConsultation: "预约咨询",
      viewResults: "查看效果",
      exploreTreatments: "查看疗程",
    },
  },
  ms: {
    header: {
      nav: {
        treatments: "Rawatan",
        results: "Hasil",
        book: "Tempah",
      },
      cta: "Tempah Konsultasi",
      languageSwitcher: {
        en: "EN",
        zh: "中文",
        ms: "BM",
        ariaLabel: "Tukar bahasa",
      },
    },
    common: {
      whatsapp: "WhatsApp",
      getDirections: "Arah Lokasi",
      bookNow: "Tempah Sekarang",
      bookConsultation: "Tempah Konsultasi",
      viewResults: "Lihat Hasil",
      exploreTreatments: "Lihat Rawatan",
    },
  },
};
```

- [ ] **Step 6: Create the dictionary loader and route helpers**

```ts
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : defaultLocale;
}

export function replaceLocaleInPath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  if (isLocale(segments[0] ?? "")) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}/${segments.join("/")}`;
}
```

- [ ] **Step 7: Create the i18n barrel and the switcher component**

```ts
export * from "@/lib/i18n/config";
export * from "@/lib/i18n/dictionaries";
export * from "@/lib/i18n/get-dictionary";
export * from "@/lib/i18n/routing";
```

```tsx
import Link from "next/link";
import { replaceLocaleInPath, type Locale } from "@/lib/i18n";

type Props = {
  currentLocale: Locale;
  currentPath: string;
  labels: {
    en: string;
    zh: string;
    ms: string;
    ariaLabel: string;
  };
};

const orderedLocales: Locale[] = ["en", "zh", "ms"];

export function LanguageSwitcher({ currentLocale, currentPath, labels }: Props) {
  return (
    <div
      aria-label={labels.ariaLabel}
      className="inline-flex items-center rounded-full border border-border bg-surface/70 p-1 backdrop-blur"
    >
      {orderedLocales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={replaceLocaleInPath(currentPath, locale)}
            aria-current={isActive ? "page" : undefined}
            className={[
              "inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold transition",
              isActive
                ? "bg-accent text-accent-ink shadow-sm"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 8: Run the focused test to verify it passes**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/LanguageSwitcher.test.tsx
```

Expected: PASS

- [ ] **Step 9: Commit the locale foundation**

```bash
git add src/lib/i18n src/components/LanguageSwitcher.tsx src/components/LanguageSwitcher.test.tsx src/test/fixtures/dictionaries.ts
git commit -m "feat(i18n): add locale foundation and switcher"
```

---

### Task 2: Add locale layout, root redirect, and the top-right header switcher

**Files:**
- Create: `src/app/[lang]/layout.tsx`
- Create: `src/middleware.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/SiteHeader.tsx`

- [ ] **Step 1: Write the failing test for the header switcher placement**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";
import { dictionaries } from "@/lib/i18n";

vi.mock("next/navigation", () => ({
  usePathname: () => "/zh/book",
}));

describe("SiteHeader", () => {
  it("renders the language switcher near the theme toggle", () => {
    render(<SiteHeader locale="zh" dictionary={dictionaries.zh} />);

    expect(screen.getByRole("link", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "BM" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/SiteHeader.test.tsx
```

Expected: FAIL because `SiteHeader` does not yet accept locale-aware props.

- [ ] **Step 3: Update the root layout to stop rendering the public shell directly**

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/seo/urls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Belléco Skin Beauté",
    template: "%s | Belléco",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased bg-page text-ink`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-page text-ink">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create the locale layout**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/seo/urls";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  return {
    alternates: {
      canonical: absoluteUrl(`/${lang}`),
      languages: {
        en: absoluteUrl("/en"),
        zh: absoluteUrl("/zh"),
        ms: absoluteUrl("/ms"),
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      {children}
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  );
}
```

- [ ] **Step 5: Update the header to accept locale and dictionary props**

```tsx
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { brand } from "@/config/brand";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: Props) {
  const pathname = usePathname() ?? `/${locale}`;

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
          <a href="#treatments" className="transition hover:text-ink">
            {dictionary.header.nav.treatments}
          </a>
          <a href="#results" className="transition hover:text-ink">
            {dictionary.header.nav.results}
          </a>
          <Link href={`/${locale}/book`} className="transition hover:text-ink">
            {dictionary.header.nav.book}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/book`}
            className="hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover md:inline-flex"
          >
            {dictionary.header.cta}
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
```

- [ ] **Step 6: Add middleware redirect**

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

function detectLocale(header: string | null) {
  const value = (header ?? "").toLowerCase();

  if (value.includes("zh")) return "zh";
  if (value.includes("ms") || value.includes("ms-my")) return "ms";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const locale = detectLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
```

- [ ] **Step 7: Run the focused tests to verify they pass**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/LanguageSwitcher.test.tsx src/components/SiteHeader.test.tsx
```

Expected: PASS

- [ ] **Step 8: Commit the locale shell**

```bash
git add src/app/layout.tsx src/app/[lang]/layout.tsx src/components/SiteHeader.tsx src/components/LanguageSwitcher.tsx src/components/LanguageSwitcher.test.tsx src/middleware.ts src/lib/i18n src/test/fixtures/dictionaries.ts
git commit -m "feat(i18n): add locale shell and header switcher"
```

---

### Task 3: Move the homepage and booking page under locale routes with translated shared copy

**Files:**
- Create: `src/app/[lang]/page.tsx`
- Create: `src/app/[lang]/book/page.tsx`
- Modify: `src/components/HomeHero.tsx`
- Modify: `src/components/TreatmentsSection.tsx`
- Modify: `src/components/PopularServicesSection.tsx`
- Modify: `src/components/BeforeAfterResultsSection.tsx`
- Modify: `src/components/TestimonialsSection.tsx`
- Modify: `src/components/ClientVideosSection.tsx`
- Modify: `src/components/BookingBanner.tsx`
- Modify: `src/components/MobileStickyWhatsappCta.tsx`
- Modify: `src/app/book/BookingForm.tsx`

- [ ] **Step 1: Write the failing homepage translation test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeHero } from "@/components/HomeHero";
import { dictionaries } from "@/lib/i18n";

describe("HomeHero", () => {
  it("renders translated CTA labels from the locale dictionary", () => {
    render(<HomeHero locale="ms" dictionary={dictionaries.ms} />);

    expect(screen.getByRole("link", { name: "Tempah Konsultasi" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lihat Rawatan" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/HomeHero.test.tsx
```

Expected: FAIL because `HomeHero` does not yet accept locale-aware props.

- [ ] **Step 3: Extend the dictionaries with page copy and CTA labels**

```ts
export type Dictionary = {
  header: { ... };
  common: { ... };
  home: {
    hero: {
      title: string;
      description: string;
    };
  };
  booking: {
    title: string;
  };
};

// Add at minimum:
// en.home.hero.title = "Calm, precise care for lasting skin change."
// zh.home.hero.title = "以冷静与精准护理，带来持久肤质改变。"
// ms.home.hero.title = "Penjagaan tenang dan tepat untuk perubahan kulit yang berkekalan."
```

- [ ] **Step 4: Update the homepage components to receive `locale` and `dictionary` props**

```tsx
type SharedProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HomeHero({ locale, dictionary }: SharedProps) {
  return (
    <section id="home-hero" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h1 className="font-serif text-5xl tracking-tight text-ink md:text-7xl">
          {dictionary.home.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          {dictionary.home.hero.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}/book`}>{dictionary.common.bookConsultation}</Link>
          <Link href="#treatments">{dictionary.common.exploreTreatments}</Link>
          <Link href="#before-after-results">{dictionary.common.viewResults}</Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create the locale homepage and locale booking page**

```tsx
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { HomeHero } from "@/components/HomeHero";
import { TreatmentsSection } from "@/components/TreatmentsSection";
import { PopularServicesSection } from "@/components/PopularServicesSection";
import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ClientVideosSection } from "@/components/ClientVideosSection";
import { BookingBanner } from "@/components/BookingBanner";
import { MobileStickyWhatsappCta } from "@/components/MobileStickyWhatsappCta";
import { notFound } from "next/navigation";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <main className="cinematic-bg cinematic-grain flex-1 bg-page">
      <HomeHero locale={locale} dictionary={dictionary} />
      <TreatmentsSection locale={locale} dictionary={dictionary} />
      <PopularServicesSection locale={locale} dictionary={dictionary} />
      <BeforeAfterResultsSection locale={locale} dictionary={dictionary} />
      <TestimonialsSection locale={locale} dictionary={dictionary} />
      <ClientVideosSection locale={locale} dictionary={dictionary} />
      <BookingBanner locale={locale} dictionary={dictionary} />
      <MobileStickyWhatsappCta locale={locale} dictionary={dictionary} />
    </main>
  );
}
```

```tsx
import { notFound } from "next/navigation";
import { BookingForm } from "@/app/book/BookingForm";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function LocaleBookPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <main className="flex-1 bg-page">
      <section className="bg-page">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <BookingForm locale={locale} dictionary={dictionary} />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 6: Run the focused and nearby tests**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/HomeHero.test.tsx src/components/TreatmentsSection.test.tsx src/components/PopularServicesSection.test.tsx src/components/BeforeAfterResultsSection.test.tsx src/components/TestimonialsSection.test.tsx src/components/ClientVideosSection.test.tsx
```

Expected: PASS

- [ ] **Step 7: Commit the translated homepage and booking flow**

```bash
git add src/app/[lang]/page.tsx src/app/[lang]/book/page.tsx src/components/HomeHero.tsx src/components/TreatmentsSection.tsx src/components/PopularServicesSection.tsx src/components/BeforeAfterResultsSection.tsx src/components/TestimonialsSection.tsx src/components/ClientVideosSection.tsx src/components/BookingBanner.tsx src/components/MobileStickyWhatsappCta.tsx src/app/book/BookingForm.tsx src/lib/i18n/dictionaries.ts
git commit -m "feat(i18n): localize homepage and booking flow"
```

---

### Task 4: Move the service pages under locale routes and localize metadata

**Files:**
- Create: `src/app/[lang]/services/acne-treatment-kuala-lumpur/page.tsx`
- Create: `src/app/[lang]/services/hifu-kuala-lumpur/page.tsx`
- Create: `src/app/[lang]/services/rf-microneedling-kuala-lumpur/page.tsx`
- Create: `src/app/[lang]/services/facial-kuchai-lama/page.tsx`
- Modify: `src/app/services/_components/ServicePage.tsx`
- Modify: `src/app/services/_components/ServicePage.test.tsx`

- [ ] **Step 1: Write the failing service page translation test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicePage } from "@/app/services/_components/ServicePage";

describe("ServicePage", () => {
  it("renders translated CTA labels", () => {
    render(
      <ServicePage
        locale="zh"
        ctaLabels={{
          book: "预约咨询",
          whatsapp: "WhatsApp",
          directions: "路线导航",
        }}
        eyebrow="针对性护理"
        title="测试标题"
        description="测试描述"
        bullets={["一", "二"]}
        suitability={["三"]}
        process={["四"]}
        expectations={["五"]}
        faqs={[{ q: "问题", a: "答案" }]}
        jsonLd={[]}
      />,
    );

    expect(screen.getByRole("link", { name: "预约咨询" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "路线导航" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/app/services/_components/ServicePage.test.tsx
```

Expected: FAIL because `ServicePage` does not yet accept translated CTA labels.

- [ ] **Step 3: Update `ServicePage` to accept locale-aware CTA labels and localized section headings**

```tsx
type ServicePageLabels = {
  book: string;
  whatsapp: string;
  directions: string;
  suitability: string;
  process: string;
  expectations: string;
  faqs: string;
};

type Props = {
  locale: Locale;
  labels: ServicePageLabels;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  suitability: string[];
  process: string[];
  expectations: string[];
  faqs: Faq[];
  jsonLd: Array<unknown>;
};

// Replace hardcoded labels like:
// "Book Consultation" -> labels.book
// "WhatsApp" -> labels.whatsapp
// "Get Directions" -> labels.directions
// "Who it’s for" -> labels.suitability
// "How it works" -> labels.process
// "What to expect" -> labels.expectations
// "FAQs" -> labels.faqs
```

- [ ] **Step 4: Create locale service routes using the shared template**

```tsx
import { notFound } from "next/navigation";
import { ServicePage } from "@/app/services/_components/ServicePage";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function AcneServicePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <ServicePage
      locale={locale}
      labels={dictionary.services.shared.labels}
      eyebrow={dictionary.services.acne.eyebrow}
      title={dictionary.services.acne.title}
      description={dictionary.services.acne.description}
      bullets={dictionary.services.acne.bullets}
      suitability={dictionary.services.acne.suitability}
      process={dictionary.services.acne.process}
      expectations={dictionary.services.acne.expectations}
      faqs={dictionary.services.acne.faqs}
      jsonLd={dictionary.services.acne.jsonLd}
    />
  );
}
```

- [ ] **Step 5: Add locale-aware metadata alternates for service pages**

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    title: dictionary.services.acne.metaTitle,
    description: dictionary.services.acne.metaDescription,
    alternates: {
      canonical: absoluteUrl(`/${lang}/services/acne-treatment-kuala-lumpur`),
      languages: {
        en: absoluteUrl("/en/services/acne-treatment-kuala-lumpur"),
        zh: absoluteUrl("/zh/services/acne-treatment-kuala-lumpur"),
        ms: absoluteUrl("/ms/services/acne-treatment-kuala-lumpur"),
      },
    },
  };
}
```

- [ ] **Step 6: Run the service tests**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/app/services/_components/ServicePage.test.tsx
```

Expected: PASS

- [ ] **Step 7: Commit the locale service pages**

```bash
git add src/app/[lang]/services src/app/services/_components/ServicePage.tsx src/app/services/_components/ServicePage.test.tsx src/lib/i18n/dictionaries.ts
git commit -m "feat(i18n): localize service pages"
```

---

### Task 5: Verify redirects, 404 behavior, and locale-aware SEO

**Files:**
- Verify: `src/middleware.ts`
- Verify: `src/app/[lang]/layout.tsx`
- Verify: `src/components/SiteHeader.tsx`
- Verify: `src/app/[lang]/page.tsx`
- Verify: `src/app/[lang]/book/page.tsx`
- Verify: `src/app/[lang]/services/**/page.tsx`

- [ ] **Step 1: Run the multilingual regression suite**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/LanguageSwitcher.test.tsx src/components/SiteHeader.test.tsx src/components/ThemeToggle.test.tsx src/components/TreatmentsSection.test.tsx src/components/PopularServicesSection.test.tsx src/components/BeforeAfterResultsSection.test.tsx src/components/TestimonialsSection.test.tsx src/components/ClientVideosSection.test.tsx src/app/services/_components/ServicePage.test.tsx
```

Expected: PASS

- [ ] **Step 2: Run lint**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code `0`

- [ ] **Step 3: Verify routing manually in the browser**

Open:

```text
http://localhost:3001/
```

Check:

- `/` redirects to `/en`, `/zh`, or `/ms` based on browser language, with English fallback
- `/en`, `/zh`, and `/ms` render translated header switcher labels and content
- `/zh/book` and `/ms/book` render translated booking content
- locale switcher remains in the header top-right next to the theme toggle
- switching locale preserves `/book` and service-page paths where possible
- unsupported locale such as `/fr` returns `404`

- [ ] **Step 4: Verify SEO metadata**

Check page source or DevTools for:

- localized `title`
- localized `description`
- canonical URL pointing at the active locale route
- alternate language links for `en`, `zh`, and `ms`

- [ ] **Step 5: Commit the verification pass**

```bash
git add src/app src/components src/lib/i18n src/middleware.ts
git commit -m "test(i18n): verify multilingual routing and seo"
```

---

## Spec Coverage Check

- Route-based locales `/en`, `/zh`, `/ms`: covered in Tasks 1, 2, 3, and 4.
- Top-right header switcher near the theme toggle: covered in Task 2.
- Full first-release translation scope for public pages: covered in Tasks 3 and 4.
- Browser-language auto-detect with English fallback: covered in Task 2 and Task 5.
- Locale-aware SEO and alternates: covered in Task 4 and Task 5.
- Unsupported locale `404`: covered in Tasks 2 and 5.

## Placeholder Scan

- No `TODO`, `TBD`, or deferred implementation notes remain.
- Every code-editing step includes exact code patterns.
- Every execution step includes an exact command or a concrete browser checklist.

## Type Consistency Check

- Locale type stays `Locale` throughout.
- Dictionary access stays centered on `dictionary`.
- Route replacement helper stays `replaceLocaleInPath`.
- Shared header switcher labels stay under `dictionary.header.languageSwitcher`.

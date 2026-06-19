# Belléco — Local SEO Flywheel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve local SEO for `belleco.co` by adding robots/sitemap, per-page metadata, JSON-LD (LocalBusiness + Service + optional FAQPage), and 4 locally-targeted service landing pages.

**Architecture:** Use Next.js App Router file conventions (`robots.ts`, `sitemap.ts`) for crawlability, Next.js `metadata` exports for titles/descriptions/canonicals, and small reusable JSON-LD helpers sourced from `src/config/brand.ts` to keep NAP consistent.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind v4, Vitest

---

## File Map

**Create**
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/lib/seo/jsonLd.ts`
- `src/lib/seo/urls.ts`
- `src/app/services/acne-treatment-kuala-lumpur/page.tsx`
- `src/app/services/hifu-kuala-lumpur/page.tsx`
- `src/app/services/rf-microneedling-kuala-lumpur/page.tsx`
- `src/app/services/facial-kuchai-lama/page.tsx`
- `src/app/services/_components/ServicePage.tsx`
- `src/lib/seo/jsonLd.test.ts`

**Modify**
- `src/app/layout.tsx`
- `src/app/page.tsx` (add links to service pages)
- `src/components/SiteHeader.tsx` (optional: add Services link)
- `src/components/SiteFooter.tsx` (optional: add Services links)

---

### Task 1: Establish canonical site URL helper

**Files:**
- Create: `src/lib/seo/urls.ts`
- Test: `src/lib/seo/urls.test.ts`

- [ ] **Step 1: Create `src/lib/seo/urls.test.ts` (failing test)**

```ts
import { describe, expect, it } from "vitest";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/urls";

describe("seo urls", () => {
  it("builds absolute URLs from the configured site URL", () => {
    expect(getSiteUrl()).toBe("https://belleco.co");
    expect(absoluteUrl("/")).toBe("https://belleco.co/");
    expect(absoluteUrl("/book")).toBe("https://belleco.co/book");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 test -- --run src/lib/seo/urls.test.ts
```

Expected: FAIL (module not found)

- [ ] **Step 3: Create `src/lib/seo/urls.ts` (minimal implementation)**

```ts
const SITE_URL = "https://belleco.co";

export function getSiteUrl() {
  return SITE_URL;
}

export function absoluteUrl(path: string) {
  const url = new URL(path, SITE_URL);
  return url.toString();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npx -y pnpm@9.15.6 test -- --run src/lib/seo/urls.test.ts
```

Expected: PASS

---

### Task 2: Add robots.txt and sitemap.xml (Next.js file conventions)

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
```

- [ ] **Step 2: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/book",
    "/services/acne-treatment-kuala-lumpur",
    "/services/hifu-kuala-lumpur",
    "/services/rf-microneedling-kuala-lumpur",
    "/services/facial-kuchai-lama",
  ];

  return routes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));
}
```

- [ ] **Step 3: Manual check**

Start dev server and open:
- `http://localhost:3001/robots.txt`
- `http://localhost:3001/sitemap.xml`

Expected:
- robots allows `/` and includes sitemap url
- sitemap contains 6 URLs

---

### Task 3: Add site-wide metadata defaults + canonical base

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update `metadata` to include a title template and metadataBase**

Target shape:

```ts
import { absoluteUrl, getSiteUrl } from "@/lib/seo/urls";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Belléco Skin Beauté",
    template: "%s | Belléco",
  },
  description: "Skin Transformation Centre in Kuala Lumpur",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "Belléco Skin Beauté",
    description: "Skin Transformation Centre in Kuala Lumpur",
  },
};
```

- [ ] **Step 2: Verify build-time types**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code 0

---

### Task 4: Add JSON-LD generators (LocalBusiness + Service + FAQPage)

**Files:**
- Create: `src/lib/seo/jsonLd.ts`
- Test: `src/lib/seo/jsonLd.test.ts`

- [ ] **Step 1: Create failing tests `src/lib/seo/jsonLd.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { buildLocalBusinessJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonLd";

describe("jsonLd", () => {
  it("builds LocalBusiness JSON-LD with NAP fields", () => {
    const json = buildLocalBusinessJsonLd();
    expect(json["@type"]).toBe("LocalBusiness");
    expect(json.name).toBeTruthy();
    expect(json.telephone).toBeTruthy();
    expect(json.address).toBeTruthy();
    expect(json.url).toBeTruthy();
  });

  it("builds Service JSON-LD with provider", () => {
    const json = buildServiceJsonLd({
      name: "Acne Treatment",
      url: "https://belleco.co/services/acne-treatment-kuala-lumpur",
    });
    expect(json["@type"]).toBe("Service");
    expect(json.provider).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx -y pnpm@9.15.6 test -- --run src/lib/seo/jsonLd.test.ts
```

Expected: FAIL (module not found)

- [ ] **Step 3: Create `src/lib/seo/jsonLd.ts` (minimal implementation)**

```ts
import { brand } from "@/config/brand";
import { absoluteUrl } from "@/lib/seo/urls";

type ServiceInput = {
  name: string;
  url: string;
};

export function buildLocalBusinessJsonLd() {
  const [streetAddress, addressLocality] = brand.contact.addressLines;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    url: absoluteUrl("/"),
    telephone: brand.contact.phoneDisplay,
    email: brand.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressCountry: "MY",
    },
    sameAs: [brand.links.instagram, brand.links.facebook, brand.links.youtube],
  } as const;
}

export function buildServiceJsonLd(input: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    url: input.url,
    provider: {
      "@type": "LocalBusiness",
      name: brand.name,
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kuala Lumpur",
    },
  } as const;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx -y pnpm@9.15.6 test -- --run src/lib/seo/jsonLd.test.ts
```

Expected: PASS

---

### Task 5: Create Service Page template component

**Files:**
- Create: `src/app/services/_components/ServicePage.tsx`

- [ ] **Step 1: Create `ServicePage.tsx`**

This is a Server Component that renders consistent structure (title, intro, bullets, FAQs, CTAs) and injects JSON-LD via `<script type="application/ld+json">`.

```tsx
import Link from "next/link";
import { brand } from "@/config/brand";

type Faq = { q: string; a: string };

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  faqs: Faq[];
  jsonLd: Array<unknown>;
};

export function ServicePage({ eyebrow, title, description, bullets, faqs, jsonLd }: Props) {
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
              href="/book"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
            >
              Book Consultation
            </Link>
            <a
              href={`https://wa.me/${brand.contact.phoneE164.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-8 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
            >
              WhatsApp
            </a>
            <a
              href={brand.links.maps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-page px-8 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              Get Directions
            </a>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {bullets.map((b) => (
              <div key={b} className="cinematic-panel rounded-2xl px-6 py-5">
                <p className="text-sm font-semibold text-ink">{b}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 cinematic-panel rounded-[2rem] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              FAQs
            </p>
            <div className="mt-6 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <p className="text-sm font-semibold text-ink">{f.q}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
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
```

- [ ] **Step 2: Lint**

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code 0

---

### Task 6: Implement 4 service pages with metadata + JSON-LD

**Files:**
- Create: `src/app/services/acne-treatment-kuala-lumpur/page.tsx`
- Create: `src/app/services/hifu-kuala-lumpur/page.tsx`
- Create: `src/app/services/rf-microneedling-kuala-lumpur/page.tsx`
- Create: `src/app/services/facial-kuchai-lama/page.tsx`

- [ ] **Step 1: Create Acne page**

Include:
- `export const metadata` with title + description + canonical
- use `ServicePage`
- JSON-LD includes `buildLocalBusinessJsonLd()` + `buildServiceJsonLd()`

- [ ] **Step 2: Repeat for HIFU, RF microneedling, Facial pages**

Follow same pattern.

- [ ] **Step 3: Manual QA**

Open:
- `/services/acne-treatment-kuala-lumpur`
- `/services/hifu-kuala-lumpur`
- `/services/rf-microneedling-kuala-lumpur`
- `/services/facial-kuchai-lama`

Check:
- correct title in browser tab
- content reads well and has CTAs

---

### Task 7: Add internal links from homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add a “Popular Services” mini-row under Treatments**

Add 4 links to the service pages (use cinematic pills). Keep copy short.

- [ ] **Step 2: Manual QA**

Verify links navigate correctly.

---

### Task 8: Final verification

- [ ] **Step 1: Run lint**

```bash
npx -y pnpm@9.15.6 lint
```

- [ ] **Step 2: Run tests**

```bash
npx -y pnpm@9.15.6 test
```

- [ ] **Step 3: Manual crawl checks**

Open:
- `/robots.txt`
- `/sitemap.xml`

Expected:
- correct sitemap URL references `https://belleco.co/sitemap.xml`

---

## Execution Choice

Plan complete and saved to `docs/superpowers/plans/2026-06-10-belleco-local-seo-flywheel.md`.

Two execution options:
1) **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks.
2) **Inline Execution** — execute tasks in this session using superpowers:executing-plans.

Which approach do you want?

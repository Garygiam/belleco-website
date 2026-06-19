# Belleco Homepage (Cinematic Panels) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing homepage UI to a “Cinematic Panels” dark-luxe look with richer background atmosphere, glass panels, and refined micro-interactions (no new routes).

**Architecture:** Keep the current component structure. Add a small set of theme-aware CSS variables + a few global utility classes in `globals.css`, then apply them via className updates in existing components.

**Tech Stack:** Next.js App Router, React, Tailwind v4, CSS variables, Vitest

---

## File Map

**Modify**
- [globals.css](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/globals.css)
- [page.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/page.tsx)
- [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx)
- [HomeHero.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/HomeHero.tsx)
- [TreatmentsSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TreatmentsSection.tsx)
- [TestimonialsSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TestimonialsSection.tsx)
- [BookingBanner.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/BookingBanner.tsx)

---

### Task 1: Add cinematic tokens + utilities

**Files:**
- Modify: [globals.css](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/globals.css)

- [ ] **Step 1: Replace `globals.css` with the following**

```css
@import "tailwindcss";

:root {
  --page: #fafaf9;
  --surface: #ffffff;
  --ink: #262626;
  --muted: #525252;
  --border: rgba(0, 0, 0, 0.08);
  --accent: #c5a880;
  --accent-hover: #b7966a;
  --accent-ink: #1c1917;
  --nav: rgba(255, 255, 255, 0.72);
  --ring: rgba(197, 168, 128, 0.45);
  --lift: 0 30px 80px rgba(17, 24, 39, 0.12);
  --lift-strong: 0 48px 120px rgba(17, 24, 39, 0.18);
  --panel-bg: rgba(255, 255, 255, 0.7);
  --panel-border: rgba(0, 0, 0, 0.08);
  --panel-inner: rgba(255, 255, 255, 0.75);
  --panel-glow: rgba(197, 168, 128, 0.16);
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --page: #070709;
    --surface: #0f0f12;
    --ink: #f5f5f4;
    --muted: #c2c2c2;
    --border: rgba(255, 255, 255, 0.12);
    --accent: #c5a880;
    --accent-hover: #d3ba95;
    --accent-ink: #0a0a0a;
    --nav: rgba(7, 7, 9, 0.66);
    --ring: rgba(197, 168, 128, 0.55);
    --lift: 0 30px 80px rgba(0, 0, 0, 0.55);
    --lift-strong: 0 48px 120px rgba(0, 0, 0, 0.72);
    --panel-bg: rgba(245, 245, 244, 0.06);
    --panel-border: rgba(255, 255, 255, 0.12);
    --panel-inner: rgba(255, 255, 255, 0.08);
    --panel-glow: rgba(197, 168, 128, 0.18);
    color-scheme: dark;
  }
}

.brand-logo-light {
  display: inline-block;
}

.brand-logo-dark {
  display: none;
}

:root[data-theme="dark"] .brand-logo-light {
  display: none;
}

:root[data-theme="dark"] .brand-logo-dark {
  display: inline-block;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .brand-logo-light {
    display: none;
  }

  :root:not([data-theme]) .brand-logo-dark {
    display: inline-block;
  }
}

.cinematic-bg {
  background:
    radial-gradient(900px 520px at 18% 12%, rgba(197, 168, 128, 0.18), transparent 62%),
    radial-gradient(760px 420px at 78% 48%, rgba(245, 245, 244, 0.07), transparent 64%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 22%, transparent 78%, rgba(255, 255, 255, 0.04) 100%),
    var(--page);
}

.cinematic-grain {
  position: relative;
}

.cinematic-grain::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0px, rgba(255, 255, 255, 0.06) 1px, transparent 1px, transparent 7px);
  opacity: 0.05;
  mix-blend-mode: overlay;
}

.cinematic-panel {
  position: relative;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  box-shadow: var(--lift);
  backdrop-filter: blur(14px);
}

.cinematic-panel::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid var(--panel-inner);
  opacity: 0.55;
}

.cinematic-glow {
  position: relative;
}

.cinematic-glow::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: -34px;
  border-radius: inherit;
  background: radial-gradient(circle at 30% 20%, var(--panel-glow), transparent 60%);
  filter: blur(18px);
  opacity: 1;
}

@theme inline {
  --color-page: var(--page);
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-ink: var(--accent-ink);
  --color-nav: var(--nav);
  --color-ring: var(--ring);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-cormorant);
  --shadow-lift: var(--lift);
  --shadow-lift-strong: var(--lift-strong);
}

:root[data-theme="dark"] {
  --page: #070709;
  --surface: #0f0f12;
  --ink: #f5f5f4;
  --muted: #c2c2c2;
  --border: rgba(255, 255, 255, 0.12);
  --accent: #c5a880;
  --accent-hover: #d3ba95;
  --accent-ink: #0a0a0a;
  --nav: rgba(7, 7, 9, 0.66);
  --ring: rgba(197, 168, 128, 0.55);
  --lift: 0 30px 80px rgba(0, 0, 0, 0.55);
  --lift-strong: 0 48px 120px rgba(0, 0, 0, 0.72);
  --panel-bg: rgba(245, 245, 244, 0.06);
  --panel-border: rgba(255, 255, 255, 0.12);
  --panel-inner: rgba(255, 255, 255, 0.08);
  --panel-glow: rgba(197, 168, 128, 0.18);
  color-scheme: dark;
}

body {
  background: var(--page);
  color: var(--ink);
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code 0

---

### Task 2: Apply cinematic background shell

**Files:**
- Modify: [page.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/page.tsx)

- [ ] **Step 1: Replace `page.tsx` with the following**

```tsx
import { BookingBanner } from "@/components/BookingBanner";
import { HomeHero } from "@/components/HomeHero";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";

export default function Home() {
  return (
    <main className="cinematic-bg cinematic-grain flex-1 bg-page">
      <HomeHero />
      <TreatmentsSection />
      <TestimonialsSection />
      <BookingBanner />
    </main>
  );
}
```

- [ ] **Step 2: Refresh the homepage**

Open: `http://localhost:3001/`  
Expected: background has subtle glow + grain overlay

---

### Task 3: Header becomes “glass bar”

**Files:**
- Modify: [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx)

- [ ] **Step 1: Replace `SiteHeader.tsx` with the following**

```tsx
import Link from "next/link";
import Image from "next/image";
import { brand } from "@/config/brand";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-nav/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
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
          <span className="hidden text-sm text-muted md:inline">
            {brand.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#treatments" className="transition hover:text-ink">
            Treatments
          </a>
          <a href="#results" className="transition hover:text-ink">
            Results
          </a>
          <Link href="/book" className="transition hover:text-ink">
            Book
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover md:inline-flex"
          >
            Book Consultation
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify header readability**

Expected: header remains readable on dark and light themes; blur feels “glass”

---

### Task 4: Hero becomes cinematic panel + proof chips

**Files:**
- Modify: [HomeHero.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/HomeHero.tsx)

- [ ] **Step 1: Replace `HomeHero.tsx` with the following**

```tsx
import Link from "next/link";
import Image from "next/image";
import { brand } from "@/config/brand";

const heroImageSrc =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high-end%20aesthetic%20clinic%20interior%2C%20soft%20natural%20window%20light%2C%20stone%20beige%20walls%2C%20subtle%20brass%20details%2C%20minimal%20luxury%2C%20clean%20treatment%20room%2C%20photorealistic%2C%2035mm%20wide%20angle%2C%20shallow%20depth%20of%20field%252C%20ultra%20detailed%2C%20professional%20interior%20photography&image_size=landscape_16_9";

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function HomeHero() {
  const chips = [
    { label: "Diagnosis-first", value: "Precision care" },
    { label: "Kuala Lumpur", value: "Kuchai Lama" },
    { label: "WhatsApp-ready", value: "Fast booking" },
  ];

  return (
    <section className="bg-page">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-32">
        <div className="flex flex-col items-start gap-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Kuala Lumpur • Skin Diagnostics
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-balance font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
              Calm, precise care for
              <span className="text-accent"> lasting</span> skin change.
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-8 text-muted md:text-xl">
              {brand.subTagline} Begin with a skin analysis, then follow a tailored protocol for acne,
              anti-aging, and radiance.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/book"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
            >
              Book Consultation
            </Link>
            <a
              href="#treatments"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-7 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
            >
              Explore Treatments
            </a>
          </div>

          <dl className="grid w-full gap-3 pt-2 md:grid-cols-3">
            {chips.map((c) => (
              <div
                key={c.label}
                className={cx("cinematic-panel rounded-2xl px-5 py-4")}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  {c.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-ink">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="cinematic-glow relative">
          <div className="cinematic-panel relative overflow-hidden rounded-[2.5rem]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={heroImageSrc}
                alt="Belléco clinic interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                preload
                unoptimized
              />
            </div>

            <div className="flex items-center justify-between gap-6 px-7 py-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-ink">Signature Skin Protocol</p>
                <p className="text-xs leading-5 text-muted">Acne • Anti-aging • Radiance</p>
              </div>
              <a
                href="#results"
                className="inline-flex h-10 items-center rounded-full border border-border bg-page/70 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur transition hover:bg-surface"
              >
                View Results
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify hero composition**

Expected: right panel looks like a framed tile; chips look like glass tiles; no layout shift

---

### Task 5: Treatments adopt pane cards + glass pills

**Files:**
- Modify: [TreatmentsSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TreatmentsSection.tsx)

- [ ] **Step 1: Update card + pills styling**

Replace only the className strings shown below (leave data/logic unchanged):

```tsx
<div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-border bg-surface/70 p-2 shadow-sm backdrop-blur">
```

```tsx
className={cx(
  "h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring",
  active === category
    ? "bg-accent text-accent-ink shadow-sm"
    : "bg-surface/70 text-muted backdrop-blur hover:bg-page",
)}
```

```tsx
className="group cinematic-panel h-full rounded-[2rem] p-7 transition hover:-translate-y-0.5 hover:shadow-lift-strong"
```

```tsx
className="rounded-full border border-border bg-page/70 px-4 py-2 text-xs font-semibold text-ink backdrop-blur"
```

```tsx
className="mt-14 cinematic-panel flex flex-col items-start justify-between gap-4 rounded-[2rem] px-7 py-7 md:flex-row md:items-center"
```

- [ ] **Step 2: Verify mobile filter**

Expected: pills scroll horizontally; selected state is obvious; no wrap glitches

---

### Task 6: Reviews tiles + “More reviews” CTA reads premium

**Files:**
- Modify: [TestimonialsSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TestimonialsSection.tsx)

- [ ] **Step 1: Update testimonial tile container class**

Change testimonial tile `<figure>` className to:

```tsx
className="cinematic-panel flex h-full flex-col justify-between rounded-[2rem] p-7"
```

- [ ] **Step 2: Update “More reviews” tile to feel like a CTA**

Change the “More reviews” `<a>` className to:

```tsx
className="cinematic-panel group flex h-full flex-col justify-between rounded-[2rem] p-7 transition hover:-translate-y-0.5 hover:shadow-lift-strong"
```

And change its bottom pill container className to:

```tsx
className="mt-8 inline-flex items-center justify-between gap-4 rounded-full border border-border bg-accent/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition group-hover:bg-accent/16"
```

- [ ] **Step 3: Verify only CTA tile links out**

Expected: testimonials are not links; only “More reviews” opens Google Reviews

---

### Task 7: Booking banner becomes cinematic closing panel

**Files:**
- Modify: [BookingBanner.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/BookingBanner.tsx)

- [ ] **Step 1: Update banner container to use panel + glow**

Replace the banner outer container:

```tsx
<div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface px-8 py-12 shadow-lift md:px-12 md:py-14">
```

With:

```tsx
<div className="cinematic-glow relative">
  <div className="cinematic-panel relative overflow-hidden rounded-[2.5rem] px-8 py-12 md:px-12 md:py-14">
```

And close the extra wrapper before the section ends.

- [ ] **Step 2: Add a WhatsApp button next to Book Now**

Add this button before “Get Directions”:

```tsx
<a
  href={`https://wa.me/${brand.contact.phoneE164.replace("+", "")}`}
  target="_blank"
  rel="noreferrer"
  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-8 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
>
  WhatsApp
</a>
```

- [ ] **Step 3: Verify CTA hierarchy**

Expected: booking CTA block feels more premium; WhatsApp is quick action

---

### Task 8: Verification

- [ ] **Step 1: Run lint**

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code 0

- [ ] **Step 2: Run tests**

```bash
npx -y pnpm@9.15.6 test
```

Expected: PASS

- [ ] **Step 3: Manual QA**

Open:
- `http://localhost:3001/` and scroll through all sections
- `http://localhost:3001/book`

Checklist:
- Theme toggle works and persists
- Treatments filter still works
- “More reviews” tile opens Google Reviews
- Waze / Google Maps icons still work in footer

---

## Execution Choice

Plan complete and saved to `docs/superpowers/plans/2026-06-08-belleco-homepage-cinematic-panels.md`.

Two execution options:
1) **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks.
2) **Inline Execution** — execute tasks in this session using superpowers:executing-plans.

Which approach do you want?


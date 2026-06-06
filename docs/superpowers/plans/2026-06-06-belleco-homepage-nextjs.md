# Belleco Skin Beauté Homepage (Next.js) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the workspace into a Next.js + Tailwind app and deliver a fully responsive luxury clinic homepage with a dark/light theme toggle.

**Architecture:** Next.js App Router with a single homepage composed of small presentational components. Theme is implemented via a `data-theme` attribute on `html` + CSS variables consumed by Tailwind utilities.

**Tech Stack:** Next.js (App Router) + React + TypeScript + Tailwind CSS + Vitest + Testing Library

---

## File Map (create/modify)

**Replace project scaffold**
- Replace root project with a Next.js app (App Router + src dir)
- Keep current code under `legacy-vite/` as a reference snapshot

**Create (Next.js)**
- Create: `/workspace/src/app/layout.tsx`
- Create: `/workspace/src/app/page.tsx`
- Create: `/workspace/src/app/book/page.tsx`
- Create: `/workspace/src/app/globals.css`
- Create: `/workspace/src/components/Navbar.tsx`
- Create: `/workspace/src/components/ThemeToggle.tsx`
- Create: `/workspace/src/components/Hero.tsx`
- Create: `/workspace/src/components/Treatments.tsx`
- Create: `/workspace/src/components/TestimonialStrip.tsx`
- Create: `/workspace/src/components/BookingBanner.tsx`
- Create: `/workspace/src/data/treatments.ts`
- Create: `/workspace/src/data/testimonials.ts`
- Create: `/workspace/src/lib/cn.ts`
- Create: `/workspace/src/lib/theme.ts`
- Create: `/workspace/src/__tests__/theme-toggle.test.tsx`
- Create: `/workspace/src/__tests__/treatments-filter.test.tsx`
- Create: `/workspace/vitest.config.ts`

**Modify**
- Modify: `/workspace/.gitignore` (already updated: add `.next`, `.superpowers`)
- Modify: `/workspace/package.json` (scripts + devDependencies for tests)
- Modify: `/workspace/tailwind.config.ts` (or `.js` depending on scaffold) to map CSS variables

---

### Task 1: Snapshot existing Vite app (safe backup) + clean root

**Files:**
- Modify: `/workspace/` (move existing files into `legacy-vite/`)

- [ ] **Step 1: Create a backup directory**

Run:
```bash
mkdir -p /workspace/legacy-vite
```

- [ ] **Step 2: Move current Vite app into backup**

Run:
```bash
sh -lc 'ls -A | grep -v -E "^(\\.git|legacy-vite|docs)$" | xargs -I{} mv "{}" legacy-vite/'
```

Expected: root now contains `.git/`, `legacy-vite/`, `docs/`.

- [ ] **Step 3: Commit backup snapshot**

Run:
```bash
git add -A
git commit -m "chore: snapshot previous vite app in legacy-vite"
```

---

### Task 2: Scaffold Next.js + Tailwind (App Router, src dir)

**Files:**
- Create: Next.js scaffolded files in `/workspace/`

- [ ] **Step 1: Scaffold**

Run (non-interactive):
```bash
pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --yes
```

Expected: Next.js project created with `src/app`, Tailwind configured, ESLint configured.

- [ ] **Step 2: Install dependencies**

Run:
```bash
pnpm install
```

- [ ] **Step 3: Verify dev server boots**

Run:
```bash
pnpm dev -- --host 0.0.0.0 --port 3000
```

Expected: server starts, homepage reachable.

- [ ] **Step 4: Commit scaffold**

Run:
```bash
git add -A
git commit -m "chore: scaffold nextjs app router with tailwind"
```

---

### Task 3: Design tokens (CSS variables) + Tailwind color mapping

**Files:**
- Modify: `/workspace/src/app/globals.css`
- Modify: `/workspace/tailwind.config.ts` (or `/workspace/tailwind.config.js`)

- [ ] **Step 1: Replace globals.css with theme tokens**

Replace `/workspace/src/app/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: 42 36% 97%;
  --surface: 0 0% 100%;
  --text: 0 0% 12%;
  --muted: 0 0% 45%;
  --border: 0 0% 88%;
  --cta: 38 54% 48%;
  --ctaText: 0 0% 8%;
  --ctaRing: 38 54% 48%;
  color-scheme: light;
}

html[data-theme="dark"] {
  --bg: 0 0% 6%;
  --surface: 0 0% 10%;
  --text: 0 0% 94%;
  --muted: 0 0% 70%;
  --border: 0 0% 18%;
  --cta: 38 54% 48%;
  --ctaText: 0 0% 8%;
  --ctaRing: 38 54% 48%;
  color-scheme: dark;
}

html,
body {
  height: 100%;
}

body {
  background: hsl(var(--bg));
  color: hsl(var(--text));
}

::selection {
  background: hsl(var(--cta) / 0.28);
}
```

- [ ] **Step 2: Map Tailwind colors to CSS variables**

In Tailwind config, add:
```ts
// inside theme.extend
colors: {
  bg: "hsl(var(--bg) / <alpha-value>)",
  surface: "hsl(var(--surface) / <alpha-value>)",
  text: "hsl(var(--text) / <alpha-value>)",
  muted: "hsl(var(--muted) / <alpha-value>)",
  border: "hsl(var(--border) / <alpha-value>)",
  cta: "hsl(var(--cta) / <alpha-value>)",
  ctaText: "hsl(var(--ctaText) / <alpha-value>)",
  ctaRing: "hsl(var(--ctaRing) / <alpha-value>)",
}
```

- [ ] **Step 3: Commit tokens**

Run:
```bash
git add -A
git commit -m "style: add theme tokens and tailwind color mapping"
```

---

### Task 4: Theme toggle (client) with persistence

**Files:**
- Create: `/workspace/src/lib/theme.ts`
- Create: `/workspace/src/components/ThemeToggle.tsx`
- Modify: `/workspace/src/app/layout.tsx`

- [ ] **Step 1: Add theme helpers**

Create `/workspace/src/lib/theme.ts`:
```ts
export type Theme = "light" | "dark";

const STORAGE_KEY = "belleco.theme";

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function persistTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
}
```

- [ ] **Step 2: Add ThemeToggle component**

Create `/workspace/src/components/ThemeToggle.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { applyTheme, getPreferredTheme, persistTheme, type Theme } from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const t = getPreferredTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
        persistTheme(next);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium text-text backdrop-blur-xl transition hover:bg-surface"
      aria-label="Toggle theme"
    >
      <span className="font-semibold tracking-[0.18em]">{theme === "dark" ? "DARK" : "LIGHT"}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-cta" />
    </button>
  );
}
```

- [ ] **Step 3: Ensure layout uses the tokens**

Modify `/workspace/src/app/layout.tsx` to ensure the `body` uses the new palette and typography:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Belleco Skin Beauté",
  description: "Skin Transformation Centre — diagnosis-first care.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-dvh bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Commit theme toggle**

Run:
```bash
git add -A
git commit -m "feat: add light/dark theme toggle with persistence"
```

---

### Task 5: Utilities + data models

**Files:**
- Create: `/workspace/src/lib/cn.ts`
- Create: `/workspace/src/data/treatments.ts`
- Create: `/workspace/src/data/testimonials.ts`

- [ ] **Step 1: Add cn helper**

Create `/workspace/src/lib/cn.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Add treatments data**

Create `/workspace/src/data/treatments.ts`:
```ts
export type TreatmentCategory = "Acne" | "Anti-Aging" | "Radiance";

export type Treatment = {
  id: string;
  category: TreatmentCategory;
  title: string;
  description: string;
  bullets: string[];
};

export const categories: TreatmentCategory[] = ["Acne", "Anti-Aging", "Radiance"];

export const treatments: Treatment[] = [
  {
    id: "clarity-reset",
    category: "Acne",
    title: "Clarity Reset",
    description: "A comfort-first reset for congestion and inflamed cycles.",
    bullets: ["Calmer appearance", "Pore comfort", "Barrier-respectful rhythm"],
  },
  {
    id: "age-lift-ritual",
    category: "Anti-Aging",
    title: "Age-Lift Ritual",
    description: "Hydration layering and sculpting support for a rested look.",
    bullets: ["Plumper-looking skin", "Contour support", "Maintenance mapping"],
  },
  {
    id: "tone-bright",
    category: "Radiance",
    title: "Tone + Bright",
    description: "Even-looking glow without chasing harsh shortcuts.",
    bullets: ["Brighter surface glow", "More even tone", "Gentle refinement"],
  },
];
```

- [ ] **Step 3: Add testimonials data**

Create `/workspace/src/data/testimonials.ts`:
```ts
export type Testimonial = {
  id: string;
  line: string;
  author: string;
};

export const testimonials: Testimonial[] = [
  { id: "t1", line: "Quiet luxury, but the plan was the real difference.", author: "Client, KL" },
  { id: "t2", line: "My skin felt calmer—comfort-first actually worked for me.", author: "Client, Kuchai" },
  { id: "t3", line: "Consistent sessions made my tone look steadier.", author: "Client, Mid Valley" },
];
```

- [ ] **Step 4: Commit utilities + data**

Run:
```bash
git add -A
git commit -m "chore: add ui utilities and homepage data"
```

---

### Task 6: Navbar (sticky translucent) + CTA + ThemeToggle

**Files:**
- Create: `/workspace/src/components/Navbar.tsx`
- Modify: `/workspace/src/app/page.tsx` (to use anchors)

- [ ] **Step 1: Create Navbar**

Create `/workspace/src/components/Navbar.tsx`:
```tsx
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#treatments", label: "Treatments" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#book", label: "Book" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/55 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-serif text-lg tracking-tight text-text">Belléco Skin Beauté</span>
          <span className="hidden text-xs font-medium tracking-[0.22em] text-muted md:inline">
            SKIN TRANSFORMATION CENTRE
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-xs font-medium tracking-[0.18em] text-muted transition hover:text-text"
            >
              {i.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-2 text-xs font-semibold tracking-[0.14em] text-ctaText ring-1 ring-ctaRing/25 transition hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctaRing"
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit navbar**

Run:
```bash
git add -A
git commit -m "feat: add translucent sticky navbar with theme toggle"
```

---

### Task 7: Hero (asymmetric split) with premium spacing

**Files:**
- Create: `/workspace/src/components/Hero.tsx`

- [ ] **Step 1: Create Hero**

Create `/workspace/src/components/Hero.tsx`:
```tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_0.9fr] md:items-center">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium text-muted backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-cta" />
            DIAGNOSIS-FIRST CARE
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight text-text md:text-6xl">
            Calm, clear, radiant skin —
            <span className="block text-muted">built with precision.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            A clinical-clean approach with quiet-luxury restraint. We map a plan your skin can follow—without harsh shortcuts.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-3 text-sm font-semibold text-ctaText ring-1 ring-ctaRing/25 transition hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctaRing"
            >
              Book a consultation
            </Link>
            <a
              href="#treatments"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface/70 px-7 py-3 text-sm font-semibold text-text backdrop-blur-xl transition hover:bg-surface"
            >
              View treatments
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_0_0_1px_hsl(var(--border)/0.5),0_30px_90px_-60px_rgba(0,0,0,0.75)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--cta)/0.22),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.10),transparent_60%)]" />
          <div className="relative flex min-h-[360px] flex-col justify-end p-8 md:min-h-[460px]">
            <div className="text-xs font-medium tracking-[0.22em] text-muted">VISUAL PANEL</div>
            <div className="mt-3 font-serif text-2xl leading-tight text-text">Premium imagery / abstract texture</div>
            <div className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Replace this panel later with consented clinic photography or a refined abstract visual.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit hero**

Run:
```bash
git add -A
git commit -m "feat: add asymmetric hero section with luxury spacing"
```

---

### Task 8: Treatments filter + 3-column grid (Acne / Anti-Aging / Radiance)

**Files:**
- Create: `/workspace/src/components/Treatments.tsx`

- [ ] **Step 1: Create Treatments component**

Create `/workspace/src/components/Treatments.tsx`:
```tsx
"use client";

import { useMemo, useState } from "react";
import { categories, treatments, type TreatmentCategory } from "@/data/treatments";

export default function Treatments() {
  const [active, setActive] = useState<TreatmentCategory>("Acne");

  const filtered = useMemo(() => treatments.filter((t) => t.category === active), [active]);

  return (
    <section id="treatments" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-medium tracking-[0.22em] text-muted">TREATMENTS</div>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-text md:text-5xl">
            Focused solutions. Quiet luxury.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Choose a category to preview a high-level starting point. Your final plan is personalised after assessment.
          </p>
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => {
            const selected = c === active;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={[
                  "shrink-0 rounded-full px-5 py-2 text-xs font-semibold tracking-[0.14em] transition",
                  "border border-border bg-surface/70 backdrop-blur-xl",
                  selected ? "text-text ring-1 ring-cta/25" : "text-muted hover:text-text",
                ].join(" ")}
              >
                {c.toUpperCase()}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <article
              key={t.id}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_hsl(var(--border)/0.45),0_26px_70px_-45px_rgba(0,0,0,0.75)]"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-[hsl(var(--cta)/0.16)] blur-3xl" />
              </div>
              <div className="relative">
                <div className="text-xs font-semibold tracking-[0.22em] text-muted">{t.category.toUpperCase()}</div>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-text">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-muted">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cta" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/book"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-cta px-5 py-2 text-xs font-semibold tracking-[0.14em] text-ctaText ring-1 ring-ctaRing/25 transition hover:brightness-[1.05]"
                >
                  BOOK
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit treatments**

Run:
```bash
git add -A
git commit -m "feat: add treatments filter and grid"
```

---

### Task 9: Minimal testimonials block

**Files:**
- Create: `/workspace/src/components/TestimonialStrip.tsx`

- [ ] **Step 1: Create TestimonialStrip**

Create `/workspace/src/components/TestimonialStrip.tsx`:
```tsx
import { testimonials } from "@/data/testimonials";

export default function TestimonialStrip() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-medium tracking-[0.22em] text-muted">TESTIMONIALS</div>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-text md:text-5xl">
            Minimal words. Real impact.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Proof should feel calm and confident—never loud.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="rounded-3xl border border-border bg-surface p-8">
              <blockquote className="font-serif text-2xl leading-snug text-text">
                “{t.line}”
              </blockquote>
              <figcaption className="mt-6 text-xs font-semibold tracking-[0.18em] text-muted">
                {t.author.toUpperCase()}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit testimonials**

Run:
```bash
git add -A
git commit -m "feat: add minimalist testimonials section"
```

---

### Task 10: Booking banner (prominent bottom CTA)

**Files:**
- Create: `/workspace/src/components/BookingBanner.tsx`

- [ ] **Step 1: Create BookingBanner**

Create `/workspace/src/components/BookingBanner.tsx`:
```tsx
import Link from "next/link";

export default function BookingBanner() {
  return (
    <section id="book" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[hsl(var(--cta)/0.28)] bg-[linear-gradient(135deg,hsl(var(--cta)/0.14),hsl(var(--surface)))] p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="text-xs font-medium tracking-[0.22em] text-muted">BOOKING</div>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-text md:text-5xl">
                Ready for your personalised plan?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                Share your main concern and preferred slot. We’ll confirm availability and your best starting session.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/book"
                className="inline-flex w-full items-center justify-center rounded-full bg-cta px-7 py-3 text-sm font-semibold text-ctaText ring-1 ring-ctaRing/25 transition hover:brightness-[1.05] md:w-auto"
              >
                Book now
              </Link>
              <a
                href="https://wa.me/60173966510"
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-surface/70 px-7 py-3 text-sm font-semibold text-text backdrop-blur-xl transition hover:bg-surface md:w-auto"
              >
                WhatsApp
              </a>
              <div className="text-xs leading-relaxed text-muted md:text-right">
                Not medical advice. Enquiries only.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit booking banner**

Run:
```bash
git add -A
git commit -m "feat: add prominent booking banner"
```

---

### Task 11: Assemble homepage with semantic sections

**Files:**
- Modify: `/workspace/src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

Replace `/workspace/src/app/page.tsx` with:
```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Treatments from "@/components/Treatments";
import TestimonialStrip from "@/components/TestimonialStrip";
import BookingBanner from "@/components/BookingBanner";

export default function Page() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Treatments />
        <TestimonialStrip />
        <BookingBanner />
      </main>
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-6 text-xs text-muted">
          © {new Date().getFullYear()} Belléco Skin Beauté. For enquiries and booking only.
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Commit homepage assembly**

Run:
```bash
git add -A
git commit -m "feat: assemble homepage blocks"
```

---

### Task 12: Add a minimal /book route (so CTAs work)

**Files:**
- Create: `/workspace/src/app/book/page.tsx`

- [ ] **Step 1: Create /book page**

Create `/workspace/src/app/book/page.tsx`:
```tsx
import Link from "next/link";

export default function BookPage() {
  return (
    <main className="min-h-[calc(100dvh-0px)] bg-bg text-text">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <div className="text-xs font-medium tracking-[0.22em] text-muted">BOOKING</div>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight">Request an appointment</h1>
        <p className="mt-6 text-base leading-relaxed text-muted">
          This is a lightweight placeholder page for the homepage milestone. Next step can be a full booking form.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-3 text-sm font-semibold text-ctaText"
            href="https://wa.me/60173966510"
          >
            WhatsApp
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface/70 px-7 py-3 text-sm font-semibold text-text"
            href="mailto:bellecobeaute@gmail.com"
          >
            Email
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface/70 px-7 py-3 text-sm font-semibold text-text"
            href="tel:+60173966510"
          >
            Call
          </a>
        </div>
        <div className="mt-10">
          <Link href="/" className="text-sm font-semibold text-muted underline underline-offset-4">
            Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit /book route**

Run:
```bash
git add -A
git commit -m "feat: add minimal book route for ctas"
```

---

### Task 13: Add tests (Vitest + Testing Library) and verify filter + theme logic

**Files:**
- Modify: `/workspace/package.json`
- Create: `/workspace/vitest.config.ts`
- Create: `/workspace/src/__tests__/theme-toggle.test.tsx`
- Create: `/workspace/src/__tests__/treatments-filter.test.tsx`

- [ ] **Step 1: Add dev dependencies**

Run:
```bash
pnpm add -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Add vitest config**

Create `/workspace/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

- [ ] **Step 3: Add vitest setup**

Create `/workspace/vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add test scripts**

Modify `/workspace/package.json` scripts to include:
```json
{
  "test": "vitest run",
  "test:ui": "vitest --ui"
}
```

- [ ] **Step 5: Test ThemeToggle**

Create `/workspace/src/__tests__/theme-toggle.test.tsx`:
```tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";

describe("ThemeToggle", () => {
  it("toggles html data-theme and persists", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /toggle theme/i });

    fireEvent.click(btn);
    expect(document.documentElement.dataset.theme).toBe("light");

    fireEvent.click(btn);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
```

- [ ] **Step 6: Test Treatments filter**

Create `/workspace/src/__tests__/treatments-filter.test.tsx`:
```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Treatments from "@/components/Treatments";

describe("Treatments", () => {
  it("filters treatments by category", () => {
    render(<Treatments />);

    expect(screen.getByText("Clarity Reset")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /anti-aging/i }));
    expect(screen.getByText("Age-Lift Ritual")).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Run tests**

Run:
```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 8: Commit tests**

Run:
```bash
git add -A
git commit -m "test: add vitest coverage for theme toggle and treatments filter"
```

---

### Task 14: Final verification (pixel/spacing and responsiveness)

**Files:**
- None (verification only)

- [ ] **Step 1: Build**

Run:
```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 2: Smoke test**

Run:
```bash
pnpm start -- --port 3000
```

Expected: homepage loads; theme toggle works; treatment filter works; CTAs route to `/book`.

- [ ] **Step 3: Commit final polish (only if any adjustments were needed)**

Run:
```bash
git add -A
git commit -m "chore: polish homepage responsiveness"
```

---

## Self-Review Checklist (plan)
- Spec coverage: navbar + hero + treatments filter + testimonials + booking banner + theme toggle are implemented as tasks.
- No placeholders: each code change includes full code blocks and exact commands.
- Naming consistency: tokens use `bg/surface/text/muted/border/cta` throughout.

---

## Execution Choice

Plan complete and saved to `docs/superpowers/plans/2026-06-06-belleco-homepage-nextjs.md`.

Two execution options:
1) **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks.
2) **Inline Execution** — execute tasks in this session using superpowers:executing-plans.

Which approach do you want?


# Belléco Sticky Mobile WhatsApp CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a mobile-only sticky WhatsApp CTA that appears after the hero section leaves view and opens Belléco’s existing WhatsApp contact link.

**Architecture:** Build a small client component, `MobileStickyWhatsappCta`, that watches a hero marker with `IntersectionObserver` and renders a floating mobile-only WhatsApp bar when the hero is no longer intersecting. Keep the WhatsApp URL derived from `brand.contact.phoneE164`, add a stable `id` to the hero section for observation, and cover the visibility logic with a focused component test that mocks `IntersectionObserver`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, Vitest + Testing Library

---

## File Map

**Create**
- `src/components/MobileStickyWhatsappCta.tsx`
- `src/components/MobileStickyWhatsappCta.test.tsx`

**Modify**
- `src/components/HomeHero.tsx`
- `src/app/page.tsx`

## Preflight

- Before editing, reread the relevant App Router guide in `node_modules/next/dist/docs/` to avoid relying on outdated Next.js assumptions.

---

### Task 1: Add a failing test for hero-aware sticky CTA visibility

**Files:**
- Create: `src/components/MobileStickyWhatsappCta.test.tsx`

- [ ] **Step 1: Create `src/components/MobileStickyWhatsappCta.test.tsx`**

```tsx
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MobileStickyWhatsappCta } from "@/components/MobileStickyWhatsappCta";

type ObserverRecord = {
  callback: IntersectionObserverCallback;
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
};

const observers: ObserverRecord[] = [];

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "0px";
  thresholds = [0];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push({
      callback,
      observe: this.observe,
      disconnect: this.disconnect,
    });
  }
}

function emitIntersection(isIntersecting: boolean) {
  const observer = observers.at(-1);
  if (!observer) {
    throw new Error("No observer registered");
  }

  observer.callback(
    [
      {
        isIntersecting,
        target: document.getElementById("home-hero") as Element,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: isIntersecting ? 1 : 0,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: 0,
      },
    ],
    {} as IntersectionObserver,
  );
}

describe("MobileStickyWhatsappCta", () => {
  beforeEach(() => {
    observers.length = 0;
    document.body.innerHTML = '<section id="home-hero"></section>';
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("stays hidden while the hero is visible and appears after the hero leaves view", async () => {
    render(<MobileStickyWhatsappCta />);

    expect(screen.queryByRole("link", { name: /Chat on WhatsApp/i })).not.toBeInTheDocument();

    emitIntersection(true);
    expect(screen.queryByRole("link", { name: /Chat on WhatsApp/i })).not.toBeInTheDocument();

    emitIntersection(false);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Chat on WhatsApp/i })).toHaveAttribute(
        "href",
        "https://wa.me/60173966510",
      );
    });
  });

  it("does not render when the hero marker is missing", () => {
    document.body.innerHTML = "";

    render(<MobileStickyWhatsappCta />);

    expect(screen.queryByRole("link", { name: /Chat on WhatsApp/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/MobileStickyWhatsappCta.test.tsx
```

Expected: FAIL with module resolution error for `@/components/MobileStickyWhatsappCta`

- [ ] **Step 3: Commit the failing test**

```bash
git add src/components/MobileStickyWhatsappCta.test.tsx
git commit -m "test: add sticky mobile whatsapp cta coverage"
```

---

### Task 2: Build the sticky CTA component

**Files:**
- Create: `src/components/MobileStickyWhatsappCta.tsx`

- [ ] **Step 1: Create `src/components/MobileStickyWhatsappCta.tsx`**

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { brand } from "@/config/brand";

function WhatsappIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11.2A8 8 0 0 1 8.4 18.3L4 20l1.8-4.2A8 8 0 1 1 20 11.2Z" />
      <path d="M9.6 8.8c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.1.1-.2.3 0 .6.3.5.7 1 1.2 1.4.5.4 1 .8 1.6 1 .3.1.4 0 .6-.1l.7-.8c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5v.5c0 .3-.2.6-.5.8-.5.3-1.2.5-1.8.3-1.1-.3-2.1-.8-3-1.5a10 10 0 0 1-2.3-2.5c-.6-.9-1.1-1.9-1.3-2.9-.1-.5 0-1.1.3-1.5Z" />
    </svg>
  );
}

export function MobileStickyWhatsappCta() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [canObserveHero, setCanObserveHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home-hero");
    if (!hero) {
      return;
    }

    setCanObserveHero(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry?.isIntersecting ?? false);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  const whatsappHref = useMemo(
    () => `https://wa.me/${brand.contact.phoneE164.replace("+", "")}`,
    [],
  );

  if (!canObserveHero || isHeroVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto mx-auto flex h-14 w-full max-w-sm items-center justify-center gap-3 rounded-full border border-border bg-[color:color-mix(in_srgb,var(--surface)_82%,transparent)] px-6 text-sm font-semibold text-ink shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-[color:color-mix(in_srgb,var(--page)_88%,transparent)]"
      >
        <WhatsappIcon />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/MobileStickyWhatsappCta.test.tsx
```

Expected: PASS

- [ ] **Step 3: Commit the new component**

```bash
git add src/components/MobileStickyWhatsappCta.tsx src/components/MobileStickyWhatsappCta.test.tsx
git commit -m "feat: add sticky mobile whatsapp cta"
```

---

### Task 3: Add a stable hero marker and render the CTA on the homepage

**Files:**
- Modify: `src/components/HomeHero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add the hero marker to `src/components/HomeHero.tsx`**

Update the opening section tag:

```tsx
    <section id="home-hero" className="bg-page">
```

- [ ] **Step 2: Render the CTA in `src/app/page.tsx`**

Update imports and render order:

```tsx
import Link from "next/link";
import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";
import { BookingBanner } from "@/components/BookingBanner";
import { ClientVideosSection } from "@/components/ClientVideosSection";
import { HomeHero } from "@/components/HomeHero";
import { MobileStickyWhatsappCta } from "@/components/MobileStickyWhatsappCta";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";

const popularServices = [
  { label: "Acne Treatment", href: "/services/acne-treatment-kuala-lumpur" },
  { label: "HIFU", href: "/services/hifu-kuala-lumpur" },
  { label: "RF Microneedling", href: "/services/rf-microneedling-kuala-lumpur" },
  { label: "Facial", href: "/services/facial-kuchai-lama" },
];

export default function Home() {
  return (
    <main className="cinematic-bg cinematic-grain flex-1 bg-page">
      <HomeHero />
      <TreatmentsSection />
      <section aria-label="Popular services" className="bg-page">
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 md:pb-20">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Popular Services
            </p>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
              {popularServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-border bg-page/70 px-5 text-sm font-semibold text-ink backdrop-blur transition hover:bg-surface focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BeforeAfterResultsSection />
      <TestimonialsSection />
      <ClientVideosSection />
      <BookingBanner />
      <MobileStickyWhatsappCta />
    </main>
  );
}
```

- [ ] **Step 3: Run the focused CTA test and the nearby regression tests**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/MobileStickyWhatsappCta.test.tsx src/components/TestimonialsSection.test.tsx src/components/BeforeAfterResultsSection.test.tsx
```

Expected: PASS

- [ ] **Step 4: Run lint**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code `0`

- [ ] **Step 5: Commit the homepage integration**

```bash
git add src/components/HomeHero.tsx src/app/page.tsx src/components/MobileStickyWhatsappCta.tsx src/components/MobileStickyWhatsappCta.test.tsx
git commit -m "feat: show sticky mobile whatsapp cta after hero"
```

---

### Task 4: Verify the sticky CTA in the browser

**Files:**
- Verify: `src/components/MobileStickyWhatsappCta.tsx`
- Verify: `src/components/HomeHero.tsx`

- [ ] **Step 1: Open the homepage**

Open:

```text
http://localhost:3001/
```

- [ ] **Step 2: Verify mobile behavior**

Check in a mobile-width viewport that:

- the sticky CTA is hidden on initial hero view
- scrolling past the hero causes the CTA to appear
- the CTA is a floating rounded bar, not a full-width bottom nav
- the CTA label reads `Chat on WhatsApp`
- tapping it points to the WhatsApp URL derived from Belléco’s existing phone number
- the CTA sits above the safe area and does not cover critical controls awkwardly

- [ ] **Step 3: Verify desktop behavior**

Check in a desktop-width viewport that:

- the sticky CTA does not appear

- [ ] **Step 4: Commit the verification pass**

```bash
git add src/components/MobileStickyWhatsappCta.tsx src/components/HomeHero.tsx src/app/page.tsx src/components/MobileStickyWhatsappCta.test.tsx
git commit -m "test: verify sticky mobile whatsapp cta behavior"
```

---

## Spec Coverage Check

- WhatsApp-only action: covered in Task 2 component markup.
- Show after hero section: covered by the `IntersectionObserver` logic in Task 2 plus hero marker in Task 3.
- Floating bar with label and icon: covered in Task 2.
- Mobile only: covered by `md:hidden` in Task 2 and browser verification in Task 4.
- Reuse existing Belléco WhatsApp source: covered in Task 2 with `brand.contact.phoneE164`.
- Safe-area-aware bottom spacing: covered in Task 2.

## Placeholder Scan

- No `TODO`, `TBD`, or deferred notes remain.
- Every code step contains exact code.
- Every verification step contains an exact command or explicit manual checklist.

## Type Consistency Check

- The component name stays `MobileStickyWhatsappCta` throughout.
- The observed hero marker is consistently `home-hero`.
- The CTA label is consistently `Chat on WhatsApp`.

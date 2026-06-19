# Belléco Before/After Results Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a homepage `Before/After Results` section with a featured result, 3 supporting selectors, clinical details, clear CTAs, and a placeholder-first rollout that can later accept real approved images.

**Architecture:** Build a dedicated client component `BeforeAfterResultsSection` that owns the featured-case selection state and renders clearly labeled placeholder media in phase 1. Keep the data static and local to the component, reuse existing cinematic panel styling, and insert the section into the homepage between the treatments flow and testimonials. Cover the interaction with a focused component test and finish with lint plus a browser sanity check.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, Vitest + Testing Library

---

## File Map

**Create**
- `src/components/BeforeAfterResultsSection.tsx`
- `src/components/BeforeAfterResultsSection.test.tsx`

**Modify**
- `src/app/page.tsx`

## Preflight

- Before editing `src/app/page.tsx`, reread the relevant App Router guide in `node_modules/next/dist/docs/` to avoid relying on outdated Next.js assumptions.

---

### Task 1: Add a focused interaction test for the new section

**Files:**
- Create: `src/components/BeforeAfterResultsSection.test.tsx`

- [ ] **Step 1: Create the failing test file**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";

describe("BeforeAfterResultsSection", () => {
  it("renders the featured case, supporting selectors, disclaimer, and CTAs", () => {
    render(<BeforeAfterResultsSection />);

    expect(screen.getByText("Real Results")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /visible change, mapped clearly\./i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Results vary by skin condition and treatment plan."),
    ).toBeInTheDocument();

    const supportButtons = screen.getAllByRole("button", {
      name: /Show result case:/i,
    });
    expect(supportButtons).toHaveLength(3);

    expect(
      screen.getByRole("link", { name: /Book Consultation/i }),
    ).toHaveAttribute("href", "/book");

    expect(
      screen.getByRole("link", { name: /Ask on WhatsApp/i }),
    ).toHaveAttribute("href", "https://wa.me/60173966510");
  });

  it("swaps the featured case when a supporting selector is clicked", async () => {
    const user = userEvent.setup();
    render(<BeforeAfterResultsSection />);

    expect(screen.getByText("Acne Marks Recovery")).toBeInTheDocument();
    expect(screen.getByText("RF Microneedling")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Show result case: Pigmentation Reset/i }),
    );

    expect(screen.getByText("Pigmentation Reset")).toBeInTheDocument();
    expect(screen.getByText("Laser + Brightening Protocol")).toBeInTheDocument();

    const supportButtons = screen.getAllByRole("button", {
      name: /Show result case:/i,
    });
    expect(supportButtons).toHaveLength(3);
    expect(
      screen.queryByRole("button", { name: /Show result case: Pigmentation Reset/i }),
    ).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the new test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/BeforeAfterResultsSection.test.tsx
```

Expected: FAIL with module not found for `@/components/BeforeAfterResultsSection`

- [ ] **Step 3: Commit the failing test**

```bash
git add src/components/BeforeAfterResultsSection.test.tsx
git commit -m "test: add before-after section interactions"
```

---

### Task 2: Build `BeforeAfterResultsSection` with placeholder-first proof cards

**Files:**
- Create: `src/components/BeforeAfterResultsSection.tsx`

- [ ] **Step 1: Create `src/components/BeforeAfterResultsSection.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { brand } from "@/config/brand";

type ResultCase = {
  id: string;
  title: string;
  concern: string;
  treatment: string;
  sessions: string;
  timeline: string;
  alt: string;
};

const resultCases: ResultCase[] = [
  {
    id: "acne-marks",
    title: "Acne Marks Recovery",
    concern: "Post-acne texture and uneven tone",
    treatment: "RF Microneedling",
    sessions: "3 sessions",
    timeline: "10 weeks",
    alt: "Placeholder before and after treatment comparison for acne marks recovery",
  },
  {
    id: "pigmentation",
    title: "Pigmentation Reset",
    concern: "Pigmentation and dull patches",
    treatment: "Laser + Brightening Protocol",
    sessions: "4 sessions",
    timeline: "12 weeks",
    alt: "Placeholder before and after treatment comparison for pigmentation reset",
  },
  {
    id: "firmness",
    title: "Firmness Lift",
    concern: "Softening jawline and loss of lift",
    treatment: "Doublo HIFU",
    sessions: "1 session",
    timeline: "8 weeks",
    alt: "Placeholder before and after treatment comparison for firmness lift",
  },
  {
    id: "clarity",
    title: "Clarity Balance",
    concern: "Congestion and redness",
    treatment: "Barrier Repair Facial",
    sessions: "2 sessions",
    timeline: "6 weeks",
    alt: "Placeholder before and after treatment comparison for clarity balance",
  },
];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function BeforeAfterResultsSection() {
  const [selectedId, setSelectedId] = useState(resultCases[0]?.id ?? "");

  const selectedCase = useMemo(
    () => resultCases.find((item) => item.id === selectedId) ?? resultCases[0],
    [selectedId],
  );

  const supportingCases = useMemo(
    () => resultCases.filter((item) => item.id !== selectedCase?.id).slice(0, 3),
    [selectedCase],
  );

  if (!selectedCase) {
    return null;
  }

  const whatsappHref = `https://wa.me/${brand.contact.phoneE164.replace("+", "")}`;

  return (
    <section id="before-after-results" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Real Results
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-ink md:text-5xl">
              Visible change, mapped clearly.
            </h2>
            <p className="text-lg leading-8 text-muted">
              Explore placeholder case layouts designed for Belléco&apos;s future
              approved before-and-after results.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="cinematic-glow">
              <div
                className="cinematic-panel overflow-hidden rounded-[2.25rem] p-4 md:p-5"
                aria-label={selectedCase.alt}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-5 py-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Before
                    </span>
                    <div className="mt-5 rounded-[1.25rem] border border-dashed border-border/80 bg-page/70 px-5 py-12 text-center">
                      <p className="text-sm font-semibold text-ink">Placeholder</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        Clinical image slot for consistent pre-treatment photography.
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-[radial-gradient(circle_at_top,rgba(197,168,128,0.18),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-5 py-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      After
                    </span>
                    <div className="mt-5 rounded-[1.25rem] border border-dashed border-border/80 bg-page/70 px-5 py-12 text-center">
                      <p className="text-sm font-semibold text-ink">Placeholder</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        Clinical image slot for matched lighting, crop, and angle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="cinematic-panel flex h-full flex-col justify-between rounded-[2rem] p-7">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    Featured Case
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    {selectedCase.title}
                  </h3>
                </div>

                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Concern
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCase.concern}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Treatment
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCase.treatment}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Sessions
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCase.sessions}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Timeline
                    </dt>
                    <dd className="text-sm leading-6 text-ink">{selectedCase.timeline}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
                >
                  Book Consultation
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/70 px-7 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </aside>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {supportingCases.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show result case: ${item.title}`}
                onClick={() => setSelectedId(item.id)}
                className={cx(
                  "cinematic-panel flex flex-col gap-4 rounded-[1.75rem] p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lift-strong focus:outline-none focus:ring-2 focus:ring-ring",
                )}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1rem] border border-dashed border-border/80 bg-page/70 px-3 py-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Before
                  </div>
                  <div className="rounded-[1rem] border border-dashed border-border/80 bg-page/70 px-3 py-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    After
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-xs leading-5 text-muted">
                    {item.concern} · {item.treatment}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <p className="text-sm leading-6 text-muted">
            Results vary by skin condition and treatment plan.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/BeforeAfterResultsSection.test.tsx
```

Expected: PASS

- [ ] **Step 3: Commit the new component**

```bash
git add src/components/BeforeAfterResultsSection.tsx src/components/BeforeAfterResultsSection.test.tsx
git commit -m "feat: add before-after homepage section"
```

---

### Task 3: Insert the section into the homepage flow

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update `src/app/page.tsx` to import and render the section**

```tsx
import Link from "next/link";
import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";
import { BookingBanner } from "@/components/BookingBanner";
import { ClientVideosSection } from "@/components/ClientVideosSection";
import { HomeHero } from "@/components/HomeHero";
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
    </main>
  );
}
```

- [ ] **Step 2: Run lint after the page integration**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code 0

- [ ] **Step 3: Commit the homepage integration**

```bash
git add src/app/page.tsx
git commit -m "feat: place before-after results on homepage"
```

---

### Task 4: Verify browser behavior and final regression checks

**Files:**
- Verify: `src/components/BeforeAfterResultsSection.tsx`
- Verify: `src/app/page.tsx`

- [ ] **Step 1: Run the focused component test again**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/BeforeAfterResultsSection.test.tsx
```

Expected: PASS

- [ ] **Step 2: Run the existing nearby regression tests**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/TestimonialsSection.test.tsx src/components/ClientVideosSection.test.tsx
```

Expected: PASS

- [ ] **Step 3: Open the homepage and verify the new section manually**

Open:

```text
http://localhost:3001/
```

Verify:

- the `Before/After Results` section appears after the popular services row and before testimonials
- one featured case is visible by default
- 3 supporting case selectors render below the featured block
- clicking a supporting case updates the featured case details
- `Book Consultation` and `Ask on WhatsApp` are visible without scrolling into the next section
- the disclaimer is visible under the selectors
- mobile responsive mode stacks the section in this order: intro, featured proof, details, selectors, CTA, disclaimer

- [ ] **Step 4: Commit the verification pass**

```bash
git add src/components/BeforeAfterResultsSection.tsx src/components/BeforeAfterResultsSection.test.tsx src/app/page.tsx
git commit -m "test: verify before-after section regressions"
```

---

## Spec Coverage Check

- `Editorial Showcase` layout: covered in Task 2 component structure.
- `Clinical details only`: covered in Task 2 details panel.
- Placement between treatments flow and testimonials: covered in Task 3.
- Mobile stacking and simple selector behavior: covered in Task 2 structure plus Task 4 manual verification.
- CTA placement and disclaimer: covered in Task 2 and verified in Task 4.
- Placeholder-first rollout: covered in Task 2 by labeled placeholder media rather than fake client imagery.

## Placeholder Scan

- No `TBD`, `TODO`, or deferred implementation notes remain in the plan.
- Every code-changing step includes exact code.
- Every verification step includes an exact command or explicit manual checklist.

## Type Consistency Check

- The plan uses one component name consistently: `BeforeAfterResultsSection`.
- The plan uses one data type consistently: `ResultCase`.
- The selected-case state is consistently named `selectedId` / `selectedCase` across the implementation steps.

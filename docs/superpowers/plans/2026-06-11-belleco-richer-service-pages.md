# Belléco Richer Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing service landing pages so each page explains who the treatment is for, how the process works, what results and downtime to expect, and answers more buying-intent questions without losing the current premium/clinical tone.

**Architecture:** Extend the shared `ServicePage` template instead of rebuilding each service page independently. Add a few new structured content fields to the template, migrate one service page first with a focused regression test, then apply the same richer schema to the remaining service pages. Keep existing metadata and JSON-LD intact while improving on-page conversion content and FAQ depth.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, Vitest + Testing Library

---

## File Map

**Modify**
- `src/app/services/_components/ServicePage.tsx`
- `src/app/services/acne-treatment-kuala-lumpur/page.tsx`
- `src/app/services/hifu-kuala-lumpur/page.tsx`
- `src/app/services/rf-microneedling-kuala-lumpur/page.tsx`
- `src/app/services/facial-kuchai-lama/page.tsx`

**Create**
- `src/app/services/_components/ServicePage.test.tsx`

## Preflight

- Before editing, reread the relevant App Router guide in `node_modules/next/dist/docs/` to avoid relying on outdated Next.js assumptions for shared route components.

---

### Task 1: Add a failing regression test for the richer service template

**Files:**
- Create: `src/app/services/_components/ServicePage.test.tsx`

- [ ] **Step 1: Create `src/app/services/_components/ServicePage.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicePage } from "@/app/services/_components/ServicePage";

describe("ServicePage", () => {
  it("renders process, outcomes, suitability, and FAQ sections", () => {
    render(
      <ServicePage
        eyebrow="Targeted Skin Correction"
        title="Acne Treatment"
        description="Diagnosis-led acne care for calmer, clearer-looking skin."
        bullets={[
          "Barrier-first support",
          "Guided home care",
        ]}
        suitability={[
          "Recurring breakouts",
          "Clogged pores",
        ]}
        process={[
          "Consultation and skin analysis",
          "Treatment planning",
          "Clinic session and follow-up",
        ]}
        expectations={[
          "Low downtime for most sessions",
          "Visible progress builds over weeks",
        ]}
        faqs={[
          {
            q: "How many sessions do I need?",
            a: "It depends on skin condition and treatment goals.",
          },
        ]}
        jsonLd={[]}
      />,
    );

    expect(screen.getByText("Who it’s for")).toBeInTheDocument();
    expect(screen.getByText("How it works")).toBeInTheDocument();
    expect(screen.getByText("What to expect")).toBeInTheDocument();

    expect(screen.getByText("Recurring breakouts")).toBeInTheDocument();
    expect(screen.getByText("Consultation and skin analysis")).toBeInTheDocument();
    expect(screen.getByText("Low downtime for most sessions")).toBeInTheDocument();
    expect(screen.getByText("How many sessions do I need?")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/app/services/_components/ServicePage.test.tsx
```

Expected: FAIL because `ServicePage` does not yet accept `suitability`, `process`, or `expectations`.

- [ ] **Step 3: Commit the failing test**

```bash
git add src/app/services/_components/ServicePage.test.tsx
git commit -m "test: cover richer service page template"
```

---

### Task 2: Extend the shared `ServicePage` template

**Files:**
- Modify: `src/app/services/_components/ServicePage.tsx`
- Test: `src/app/services/_components/ServicePage.test.tsx`

- [ ] **Step 1: Update `src/app/services/_components/ServicePage.tsx`**

Replace the file contents with:

```tsx
import Link from "next/link";
import { brand } from "@/config/brand";

type Faq = { q: string; a: string };

type Props = {
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

export function ServicePage({
  eyebrow,
  title,
  description,
  bullets,
  suitability,
  process,
  expectations,
  faqs,
  jsonLd,
}: Props) {
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
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>

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

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="cinematic-panel rounded-[2rem] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                Who it’s for
              </p>
              <div className="mt-6 space-y-4">
                {suitability.map((item) => (
                  <p key={item} className="text-sm leading-7 text-ink">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="cinematic-panel rounded-[2rem] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                How it works
              </p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              What to expect
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {expectations.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-page/70 px-5 py-4">
                  <p className="text-sm leading-7 text-ink">{item}</p>
                </div>
              ))}
            </div>
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

- [ ] **Step 2: Run the focused test to verify it passes**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/app/services/_components/ServicePage.test.tsx
```

Expected: PASS

- [ ] **Step 3: Commit the shared template upgrade**

```bash
git add src/app/services/_components/ServicePage.tsx src/app/services/_components/ServicePage.test.tsx
git commit -m "feat: expand service page template sections"
```

---

### Task 3: Upgrade the acne page content first

**Files:**
- Modify: `src/app/services/acne-treatment-kuala-lumpur/page.tsx`
- Test: `src/app/services/_components/ServicePage.test.tsx`

- [ ] **Step 1: Update `src/app/services/acne-treatment-kuala-lumpur/page.tsx`**

Replace the `ServicePage` props block with:

```tsx
    <ServicePage
      eyebrow="Targeted Skin Correction"
      title={serviceName}
      description="A clear-skin plan built around your skin’s signals, not guesswork. We focus on calming active breakouts, reducing recurring congestion, and improving the look of post-acne marks with a routine that stays realistic outside the clinic too."
      bullets={[
        "Skin analysis to understand congestion, inflammation, and sensitivity",
        "Barrier-first planning that avoids harsh routines that can backfire",
        "Support for blackheads, whiteheads, recurring breakouts, and post-acne marks",
        "Personalised home-care guidance with simple, realistic next steps",
      ]}
      suitability={[
        "Clients dealing with recurring congestion, active breakouts, or acne-prone skin that feels reactive and hard to manage.",
        "Those who want a more structured plan for post-acne marks, uneven texture, and pores without jumping between random treatments.",
      ]}
      process={[
        "Begin with a consultation and skin analysis to understand what is driving the breakouts and where the skin barrier may be struggling.",
        "Build a treatment plan that matches acne severity, sensitivity, and how much downtime fits your schedule.",
        "Combine in-clinic care with realistic home guidance so progress continues between visits instead of depending on one session alone.",
      ]}
      expectations={[
        "Many acne-focused sessions involve little to no downtime, though some steps may cause short-term redness depending on intensity.",
        "Visible progress usually builds over a few visits, with more meaningful changes often seen across 6 to 12 weeks when paired with consistent home care.",
        "The goal is calmer, clearer-looking skin over time, not an overnight reset that overstresses the barrier.",
      ]}
      faqs={[
        {
          q: "Do you treat active acne and acne marks in the same plan?",
          a: "Yes. We usually calm active inflammation first, then add corrective steps to improve the look of marks and uneven texture without overwhelming the skin barrier.",
        },
        {
          q: "Is this suitable for sensitive or reactive skin?",
          a: "Often, yes. We lean toward barrier-supportive methods and adjust treatment intensity based on how your skin responds.",
        },
        {
          q: "How many sessions do I typically need?",
          a: "It depends on severity, skin sensitivity, and how long the acne has been present. Many clients see more structured progress over several sessions rather than one-off treatment.",
        },
        {
          q: "Will I peel or have downtime?",
          a: "Most sessions have little to no downtime. If a step may cause temporary redness or mild flaking, we will explain that clearly before treatment.",
        },
        {
          q: "Can I keep using my current skincare products?",
          a: "Sometimes. We review what you are using, keep what is helping, and simplify anything that may be contributing to irritation or breakouts.",
        },
      ]}
      jsonLd={[
        buildLocalBusinessJsonLd(),
        buildServiceJsonLd({ name: serviceName, url: serviceUrl }),
      ]}
    />
```

- [ ] **Step 2: Run the focused template test again**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/app/services/_components/ServicePage.test.tsx
```

Expected: PASS

- [ ] **Step 3: Commit the first richer service page**

```bash
git add src/app/services/acne-treatment-kuala-lumpur/page.tsx src/app/services/_components/ServicePage.tsx src/app/services/_components/ServicePage.test.tsx
git commit -m "feat: enrich acne treatment service page"
```

---

### Task 4: Upgrade the remaining service pages to the richer schema

**Files:**
- Modify: `src/app/services/hifu-kuala-lumpur/page.tsx`
- Modify: `src/app/services/rf-microneedling-kuala-lumpur/page.tsx`
- Modify: `src/app/services/facial-kuchai-lama/page.tsx`

- [ ] **Step 1: Update the `HIFU` page to include `suitability`, `process`, and `expectations`**

Use the existing premium/clinical tone and mirror the same field structure now required by `ServicePage`.

- [ ] **Step 2: Update the `RF Microneedling` page to include `suitability`, `process`, and `expectations`**

Use the same shared structure while tailoring the copy to texture, pores, acne marks, and collagen-support positioning.

- [ ] **Step 3: Update the `Facial` page to include `suitability`, `process`, and `expectations`**

Keep it more accessible and maintenance-oriented than the device-led pages while still feeling premium.

- [ ] **Step 4: Run the full nearby regression set**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/app/services/_components/ServicePage.test.tsx src/components/MobileStickyWhatsappCta.test.tsx src/components/TestimonialsSection.test.tsx src/components/BeforeAfterResultsSection.test.tsx
```

Expected: PASS

- [ ] **Step 5: Run lint**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code `0`

- [ ] **Step 6: Commit the remaining service page upgrades**

```bash
git add src/app/services/hifu-kuala-lumpur/page.tsx src/app/services/rf-microneedling-kuala-lumpur/page.tsx src/app/services/facial-kuchai-lama/page.tsx src/app/services/_components/ServicePage.tsx src/app/services/_components/ServicePage.test.tsx
git commit -m "feat: enrich remaining service landing pages"
```

---

### Task 5: Verify the richer service pages in the browser

**Files:**
- Verify: `src/app/services/acne-treatment-kuala-lumpur/page.tsx`
- Verify: `src/app/services/hifu-kuala-lumpur/page.tsx`
- Verify: `src/app/services/rf-microneedling-kuala-lumpur/page.tsx`
- Verify: `src/app/services/facial-kuchai-lama/page.tsx`

- [ ] **Step 1: Open each service page**

Open:

```text
http://localhost:3001/services/acne-treatment-kuala-lumpur
http://localhost:3001/services/hifu-kuala-lumpur
http://localhost:3001/services/rf-microneedling-kuala-lumpur
http://localhost:3001/services/facial-kuchai-lama
```

- [ ] **Step 2: Verify each page visually**

Check that each page now includes:

- a stronger above-the-fold description
- `Who it’s for`
- `How it works`
- `What to expect`
- existing CTA buttons
- existing FAQ block

Also verify the pages still feel premium, readable, and not overly dense on mobile width.

- [ ] **Step 3: Commit the verification pass**

```bash
git add src/app/services/_components/ServicePage.tsx src/app/services/acne-treatment-kuala-lumpur/page.tsx src/app/services/hifu-kuala-lumpur/page.tsx src/app/services/rf-microneedling-kuala-lumpur/page.tsx src/app/services/facial-kuchai-lama/page.tsx src/app/services/_components/ServicePage.test.tsx
git commit -m "test: verify richer service page layouts"
```

---

## Spec Coverage Check

- Add richer service-page depth: covered by Tasks 2–4.
- Add treatment process and suitability guidance: covered by the new `suitability` and `process` sections in Task 2 and page-level content in Tasks 3–4.
- Add outcome and downtime framing: covered by the `expectations` section.
- Preserve CTA structure and premium tone: maintained in Task 2 and browser-verified in Task 5.
- Strengthen FAQs without rebuilding metadata/JSON-LD: retained across Tasks 3–4.

## Placeholder Scan

- No `TODO`, `TBD`, or vague implementation notes remain.
- Every code-changing step includes exact code or an exact content requirement tied to a concrete file.
- Every validation step includes exact commands or a clear manual checklist.

## Type Consistency Check

- The new `ServicePage` props are consistently named `suitability`, `process`, and `expectations`.
- The shared component name remains `ServicePage`.
- The richer service pages all use the same shared schema.

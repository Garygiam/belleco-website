# Belléco Stories Header Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up the `Stories` / testimonials section header by replacing the awkward split intro layout with one compact intro block above the testimonial grid.

**Architecture:** Keep the change isolated to `TestimonialsSection` and its focused test. Replace the current 2-column intro wrapper with a single left-aligned intro block above the cards, while preserving the existing testimonial cards and Google Reviews CTA card. Add a small regression assertion for the new compact header container, then implement the minimal JSX/class changes to satisfy it.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, Vitest + Testing Library

---

## File Map

**Modify**
- `src/components/TestimonialsSection.tsx`
- `src/components/TestimonialsSection.test.tsx`

## Preflight

- Before editing, reread the relevant App Router guide in `node_modules/next/dist/docs/` to avoid relying on outdated Next.js assumptions, even though this is a small component-only change.

---

### Task 1: Add a regression test for the compact stories header

**Files:**
- Modify: `src/components/TestimonialsSection.test.tsx`

- [ ] **Step 1: Update `src/components/TestimonialsSection.test.tsx` with a failing assertion**

Replace the file contents with:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestimonialsSection } from "@/components/TestimonialsSection";

describe("TestimonialsSection", () => {
  it("renders a compact stories header above the testimonial grid", () => {
    const { container } = render(<TestimonialsSection />);

    expect(screen.getByText("Stories")).toBeInTheDocument();

    const heading = screen.getByRole("heading", {
      name: /Real transformations, guided with care\./i,
    });
    expect(heading).toBeInTheDocument();

    const intro = heading.closest("div");
    expect(intro).toHaveClass("max-w-3xl");
    expect(intro).toHaveClass("space-y-5");

    expect(container.querySelectorAll("figure").length).toBe(4);
    expect(container.querySelectorAll("a[href]").length).toBeGreaterThan(0);
  });

  it("renders 4 review tiles + a Google Reviews CTA without overflow", () => {
    const { container } = render(<TestimonialsSection />);

    expect(container.querySelectorAll("figure").length).toBe(4);
    expect(container.querySelectorAll("a[href]").length).toBeGreaterThan(0);

    const quote = screen.getByText(/My skin feels calmer/i);
    expect(quote).toHaveClass("break-words");

    const figure = quote.closest("figure");
    expect(figure).toHaveClass("overflow-hidden");
    expect(screen.getAllByText("Google Reviews").length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/TestimonialsSection.test.tsx
```

Expected: FAIL because the current header wrapper does not have `max-w-3xl` and still uses the split grid layout.

- [ ] **Step 3: Commit the failing test**

```bash
git add src/components/TestimonialsSection.test.tsx
git commit -m "test: cover stories header cleanup"
```

---

### Task 2: Replace the split intro layout with one compact header block

**Files:**
- Modify: `src/components/TestimonialsSection.tsx`

- [ ] **Step 1: Update the header wrapper in `src/components/TestimonialsSection.tsx`**

Replace the current intro block:

```tsx
        <div className="space-y-14">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Stories
            </p>
            <div className="space-y-5">
              <h2 className="font-serif text-4xl tracking-tight text-ink md:text-5xl">
                Real transformations, guided with care.
              </h2>
              <p className="text-lg leading-8 text-muted">
                Each plan begins with skin diagnostics, then focuses on consistent barrier support and targeted
                treatments to deliver visible change.
              </p>
            </div>
          </div>
```

With this compact intro:

```tsx
        <div className="space-y-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Stories
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-ink md:text-5xl">
              Real transformations, guided with care.
            </h2>
            <p className="text-lg leading-8 text-muted">
              Each plan begins with skin diagnostics, then focuses on consistent barrier
              support and targeted treatments to deliver visible change.
            </p>
          </div>
```

Leave the testimonial grid and CTA card unchanged.

- [ ] **Step 2: Run the focused test to verify it passes**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/TestimonialsSection.test.tsx
```

Expected: PASS

- [ ] **Step 3: Run lint**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code `0`

- [ ] **Step 4: Commit the implementation**

```bash
git add src/components/TestimonialsSection.tsx src/components/TestimonialsSection.test.tsx
git commit -m "feat: simplify stories section header"
```

---

### Task 3: Verify the homepage visually

**Files:**
- Verify: `src/components/TestimonialsSection.tsx`

- [ ] **Step 1: Open the homepage**

Open:

```text
http://localhost:3001/
```

- [ ] **Step 2: Verify the section manually**

Check that:

- the `Stories` eyebrow sits above the heading, not in a separate left column
- the heading and paragraph form one compact intro block above the cards
- the large empty left-side area is gone on desktop
- the testimonial cards still render in the existing grid
- the Google Reviews CTA card is still present
- the section looks tighter and cleaner on mobile width as well

- [ ] **Step 3: Run the nearby regression suite**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/TestimonialsSection.test.tsx src/components/BeforeAfterResultsSection.test.tsx
```

Expected: PASS

- [ ] **Step 4: Commit the verification pass**

```bash
git add src/components/TestimonialsSection.tsx src/components/TestimonialsSection.test.tsx
git commit -m "test: verify stories header layout cleanup"
```

---

## Spec Coverage Check

- Remove the split intro layout: covered in Task 2.
- Move the intro above the cards: covered in Task 2.
- Keep the cards and CTA intact: preserved explicitly in Task 2 and checked in Tasks 1 and 3.
- Improve desktop balance and mobile cleanliness: verified in Task 3 manual checks.

## Placeholder Scan

- No `TODO`, `TBD`, or deferred implementation notes remain.
- Every code step contains exact file content or replacement snippets.
- Every validation step includes exact commands or a concrete manual checklist.

## Type Consistency Check

- The component name remains `TestimonialsSection` throughout.
- The new intro wrapper classes are consistent between test expectations and implementation steps.
- No new helpers, props, or types are introduced for this cleanup.

# Popular Services Photo Cards CTA Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `Popular Services` cards feel more service-related via refined luxury portrait prompts and make the `Explore` affordance feel like a real CTA via an A3-style pill with arrow (while keeping the cards compact and fully clickable).

**Architecture:** Keep `PopularServicesSection` as a simple presentational component with a static `popularServices` array. Update only (1) the prompts/alt text and (2) the CTA rendering inside the existing bottom overlay panel. Avoid nested interactive elements by keeping the whole card as a single `Link`.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest + Testing Library.

---

## File Map

**Modify**

- [PopularServicesSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.tsx)
  - Update image prompts + alt text (Option 1)
  - Update CTA markup to A3 pill + arrow (still inside overlay panel)
- [PopularServicesSection.test.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.test.tsx)
  - Extend assertions to verify CTA pill rendering

---

### Task 1: Add failing tests for the A3 CTA pill

**Files:**
- Modify: [PopularServicesSection.test.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.test.tsx)

- [ ] **Step 1: Write the failing test**

Update the test to assert that each card includes a visible `Explore` element that is styled as a “pill” (class-based assertion on a dedicated CTA span).

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PopularServicesSection } from "@/components/PopularServicesSection";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string }) => <img alt={alt} {...props} />,
}));

describe("PopularServicesSection", () => {
  it("renders 4 service cards with locale-prefixed links and CTA pills", () => {
    render(
      <PopularServicesSection
        locale="en"
        dictionary={
          {
            header: {
              nav: { treatments: "", results: "", book: "" },
              cta: "",
              languageSwitcher: { en: "", zh: "", ms: "", ariaLabel: "" },
            },
            common: {
              whatsapp: "",
              getDirections: "",
              bookNow: "",
              bookConsultation: "",
              viewResults: "",
              exploreTreatments: "",
            },
            home: { hero: { title: "", description: "" } },
            booking: { title: "" },
            services: {
              labels: {
                bookConsultation: "",
                whatsapp: "",
                getDirections: "",
                whoItsFor: "",
                howItWorks: "",
                whatToExpect: "",
                faqs: "",
              },
            },
          } as any
        }
      />,
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);

    expect(
      screen.getByRole("link", { name: /Acne Treatment/i }),
    ).toHaveAttribute("href", "/en/services/acne-treatment-kuala-lumpur");

    const exploreCtas = screen.getAllByText("Explore");
    expect(exploreCtas).toHaveLength(4);

    exploreCtas.forEach((el) => {
      expect(el).toHaveClass("popular-services-cta");
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/components/PopularServicesSection.test.tsx
```

Expected: FAIL because `.popular-services-cta` does not exist yet.

- [ ] **Step 3: Commit**

```bash
git add src/components/PopularServicesSection.test.tsx
git commit -m "test(homepage): assert explore CTA pill for popular services"
```

---

### Task 2: Implement the A3 CTA pill (no nested interactivity)

**Files:**
- Modify: [PopularServicesSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.tsx)

- [ ] **Step 1: Implement minimal code to make the new CTA test pass**

Replace the right-side `Explore` span with a pill-styled span, keeping it inside the `Link`.

```tsx
<span className="popular-services-cta shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/95 shadow-sm backdrop-blur-md transition group-hover:bg-white/14">
  Explore <span aria-hidden="true">→</span>
</span>
```

Notes:
- Keep `aria-hidden` for the arrow so screen readers read “Explore” once.
- Do not render a nested `<button>`; keep the whole card as one `Link`.

- [ ] **Step 2: Run test to verify it passes**

Run:

```bash
npm test -- src/components/PopularServicesSection.test.tsx
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/PopularServicesSection.tsx
git commit -m "feat(homepage): restyle popular services explore as pill CTA"
```

---

### Task 3: Refine images and alt text (Option 1)

**Files:**
- Modify: [PopularServicesSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.tsx)
- Modify: [PopularServicesSection.test.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.test.tsx) (only if alt assertions exist)

- [ ] **Step 1: Update prompts to be more service-specific while staying luxury portrait-led**

Update each `imageSrc` prompt to emphasize:
- Acne: clear texture + calm complexion
- HIFU: lifted jawline contour
- RF: refined pores + smooth texture detail
- Facial: luminous hydration glow

Example prompt pattern (keep consistent tone):

```ts
"ultra realistic luxury beauty portrait, [treatment-specific cue], premium skincare campaign photography, soft cinematic lighting, elegant dark neutral background, high detail skin texture, close-up face portrait"
```

- [ ] **Step 2: Update alt text to match prompts**

Alt text should remain concise and treatment-specific, for example:
- `Luxury beauty portrait with clear skin texture for acne treatment`
- `Luxury portrait emphasizing lifted jawline contour for HIFU`
- `Luxury skin-detail portrait showing refined pores for RF microneedling`
- `Luxury portrait with luminous hydrated glow for facial treatment`

- [ ] **Step 3: Run tests**

Run:

```bash
npm test -- src/components/PopularServicesSection.test.tsx
```

Expected: PASS (update assertions if the test locks alt text).

- [ ] **Step 4: Commit**

```bash
git add src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "feat(homepage): make popular services portraits more treatment-specific"
```

---

### Task 4: Regression checks

**Files:**
- No code changes required unless failures occur

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 2: Run lint**

```bash
npm run lint -- src
```

Expected: no ESLint errors.

- [ ] **Step 3: Optional manual check**

Run dev server and verify the cards visually:
- CTA pill sits inside the overlay and feels clickable
- Each card’s image feels distinct (even if the image endpoint is still generating)

---

## Self-Review Checklist (Plan Author)

- Spec coverage: prompts/alt text refinement + CTA pill (A3) are explicitly covered by Tasks 2–3.
- Placeholder scan: every step includes concrete code, commands, and expected outcomes.
- Type consistency: uses existing `PopularServicesSection` component shape; CTA uses class `popular-services-cta` for stable tests.

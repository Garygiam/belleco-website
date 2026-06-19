# Belléco Popular Services Editorial Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage `Popular Services` pill strip with a premium photo-backed editorial card section that keeps the same four service links.

**Architecture:** Extract the homepage strip into a dedicated server component, `PopularServicesSection`, so the new card data, image URLs, and card markup stay isolated from `src/app/page.tsx`. Use `next/image` with the already-approved remote image host, keep the four service routes unchanged, and cover the new intro plus card rendering with a focused component test.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, `next/image`, Vitest + Testing Library

---

## File Map

**Create**
- `src/components/PopularServicesSection.tsx`
- `src/components/PopularServicesSection.test.tsx`

**Modify**
- `src/app/page.tsx`

**Existing references**
- `next.config.ts`
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`

## Preflight

- Before editing, reread `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` and confirm the implementation uses `next/image` with either explicit dimensions or `fill`.
- Confirm `next.config.ts` already allows `https://coresg-normal.trae.ai/api/ide/v1/text_to_image`, so no config change is needed for the generated service imagery.

---

### Task 1: Add a failing test for the editorial card section

**Files:**
- Create: `src/components/PopularServicesSection.test.tsx`

- [ ] **Step 1: Create `src/components/PopularServicesSection.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { PopularServicesSection } from "@/components/PopularServicesSection";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    fill,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    <img alt={alt} src={typeof src === "string" ? src : ""} data-fill={fill ? "true" : "false"} {...props} />
  ),
}));

describe("PopularServicesSection", () => {
  it("renders the intro copy, four service links, and photo-backed thumbnails", () => {
    render(<PopularServicesSection />);

    expect(screen.getByText("Popular Services")).toBeInTheDocument();
    expect(
      screen.getByText("Explore the treatments clients ask for most."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Acne Treatment Texture Explore/i }),
    ).toHaveAttribute("href", "/services/acne-treatment-kuala-lumpur");
    expect(screen.getByAltText("Close-up skincare visual for acne treatment")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /HIFU Lift Explore/i })).toHaveAttribute(
      "href",
      "/services/hifu-kuala-lumpur",
    );
    expect(screen.getByAltText("Premium facial contouring visual for HIFU treatment")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /RF Microneedling Refine Explore/i }),
    ).toHaveAttribute("href", "/services/rf-microneedling-kuala-lumpur");
    expect(
      screen.getByAltText("Clinical skin-texture visual for RF microneedling treatment"),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Facial Glow Explore/i })).toHaveAttribute(
      "href",
      "/services/facial-kuchai-lama",
    );
    expect(screen.getByAltText("Relaxing hydration facial visual for classic facial treatment")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/PopularServicesSection.test.tsx
```

Expected: FAIL with module resolution error for `@/components/PopularServicesSection`

- [ ] **Step 3: Commit the failing test**

```bash
git add src/components/PopularServicesSection.test.tsx
git commit -m "test: add popular services editorial cards coverage"
```

---

### Task 2: Build the reusable editorial card section

**Files:**
- Create: `src/components/PopularServicesSection.tsx`
- Test: `src/components/PopularServicesSection.test.tsx`

- [ ] **Step 1: Create `src/components/PopularServicesSection.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";

type PopularService = {
  label: string;
  href: string;
  descriptor: string;
  alt: string;
  imageSrc: string;
};

function buildImageSrc(prompt: string, imageSize: string) {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`;
}

const popularServices: PopularService[] = [
  {
    label: "Acne Treatment",
    href: "/services/acne-treatment-kuala-lumpur",
    descriptor: "Texture",
    alt: "Close-up skincare visual for acne treatment",
    imageSrc: buildImageSrc(
      "luxury skincare clinic facial close-up, clear glassy skin with subtle acne treatment context, premium editorial beauty photography, soft cinematic lighting, dark elegant background, ultra realistic",
      "portrait_4_3",
    ),
  },
  {
    label: "HIFU",
    href: "/services/hifu-kuala-lumpur",
    descriptor: "Lift",
    alt: "Premium facial contouring visual for HIFU treatment",
    imageSrc: buildImageSrc(
      "premium beauty clinic portrait highlighting jawline contour and lift, elegant skincare editorial photography, warm soft light, dark luxury spa mood, ultra realistic",
      "portrait_4_3",
    ),
  },
  {
    label: "RF Microneedling",
    href: "/services/rf-microneedling-kuala-lumpur",
    descriptor: "Refine",
    alt: "Clinical skin-texture visual for RF microneedling treatment",
    imageSrc: buildImageSrc(
      "clinical luxury skincare close-up showing refined skin texture, premium beauty editorial image, sophisticated treatment-room mood, soft directional lighting, realistic skin detail",
      "portrait_4_3",
    ),
  },
  {
    label: "Facial",
    href: "/services/facial-kuchai-lama",
    descriptor: "Glow",
    alt: "Relaxing hydration facial visual for classic facial treatment",
    imageSrc: buildImageSrc(
      "luxury hydration facial beauty visual, calm spa-like skincare editorial photography, glowing healthy skin, soft premium lighting, elegant dark neutral palette, ultra realistic",
      "portrait_4_3",
    ),
  },
];

export function PopularServicesSection() {
  return (
    <section aria-label="Popular services" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 md:pb-20">
        <div className="space-y-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Popular Services
            </p>
            <p className="text-lg leading-8 text-muted">
              Explore the treatments clients ask for most.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {popularServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative isolate block overflow-hidden rounded-[1.9rem] border border-border/80 bg-surface/70 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={service.imageSrc}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.08)_0%,rgba(7,10,16,0.18)_30%,rgba(7,10,16,0.78)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-5 md:p-6">
                    <div className="flex w-full items-end justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-[color:color-mix(in_srgb,var(--surface)_72%,transparent)] p-4 backdrop-blur-md">
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                          {service.descriptor}
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                          {service.label}
                        </h2>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-white">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/PopularServicesSection.test.tsx
```

Expected: PASS

- [ ] **Step 3: Commit the new section component**

```bash
git add src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "feat: add popular services editorial cards section"
```

---

### Task 3: Replace the inline pill strip on the homepage

**Files:**
- Modify: `src/app/page.tsx`
- Test: `src/components/PopularServicesSection.test.tsx`

- [ ] **Step 1: Update `src/app/page.tsx` to use the new component**

```tsx
import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";
import { BookingBanner } from "@/components/BookingBanner";
import { ClientVideosSection } from "@/components/ClientVideosSection";
import { HomeHero } from "@/components/HomeHero";
import { MobileStickyWhatsappCta } from "@/components/MobileStickyWhatsappCta";
import { PopularServicesSection } from "@/components/PopularServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";

export default function Home() {
  return (
    <main className="cinematic-bg cinematic-grain flex-1 bg-page">
      <HomeHero />
      <TreatmentsSection />
      <PopularServicesSection />
      <BeforeAfterResultsSection />
      <TestimonialsSection />
      <ClientVideosSection />
      <BookingBanner />
      <MobileStickyWhatsappCta />
    </main>
  );
}
```

- [ ] **Step 2: Run the focused test and nearby homepage regressions**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/PopularServicesSection.test.tsx src/components/TreatmentsSection.test.tsx src/components/BeforeAfterResultsSection.test.tsx src/components/TestimonialsSection.test.tsx
```

Expected: PASS

- [ ] **Step 3: Run lint**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code `0`

- [ ] **Step 4: Commit the homepage integration**

```bash
git add src/app/page.tsx src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "feat: replace popular services pills with editorial cards"
```

---

### Task 4: Verify the section visually in the browser

**Files:**
- Verify: `src/components/PopularServicesSection.tsx`
- Verify: `src/app/page.tsx`

- [ ] **Step 1: Open the homepage**

Open:

```text
http://localhost:3001/
```

- [ ] **Step 2: Verify desktop presentation**

Check at desktop width that:

- the old plain pill row is gone
- a compact intro appears above the service grid
- the four service cards display as a `2 x 2` grid
- each card shows a full-bleed image with a dark gradient overlay
- the labels `Texture`, `Lift`, `Refine`, and `Glow` read clearly over the imagery
- hover state shows subtle image zoom and feels premium instead of flashy

- [ ] **Step 3: Verify mobile presentation**

Check at mobile width that:

- the cards stack into a single column
- text remains readable over the image treatment
- tap targets are comfortable
- spacing feels consistent with the surrounding homepage sections

- [ ] **Step 4: Verify link destinations**

Click each card and confirm it opens the same service routes already used by the homepage:

- `/services/acne-treatment-kuala-lumpur`
- `/services/hifu-kuala-lumpur`
- `/services/rf-microneedling-kuala-lumpur`
- `/services/facial-kuchai-lama`

- [ ] **Step 5: Commit the verification pass**

```bash
git add src/app/page.tsx src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "test: verify popular services editorial cards layout"
```

---

## Spec Coverage Check

- Compact intro above the cards: covered in Task 2.
- Four photo-backed editorial cards: covered in Task 2 and verified in Task 4.
- Same four service URLs: covered in Task 1 assertions, Task 2 data, and Task 4 link checks.
- Premium cinematic styling with subtle interaction: covered in Task 2 and Task 4.
- Mobile stacked layout and desktop `2 x 2` layout: covered in Task 2 classes and Task 4 responsive checks.

## Placeholder Scan

- No `TODO`, `TBD`, or deferred implementation notes remain.
- Every code-editing step includes exact code.
- Every execution step includes an exact command or a concrete browser checklist.

## Type Consistency Check

- The component name stays `PopularServicesSection` throughout.
- The service data keys stay `label`, `href`, `descriptor`, `alt`, and `imageSrc` throughout.
- The intro copy stays `Explore the treatments clients ask for most.` throughout.

# Belléco Popular Services Wide Thumbnail Row Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the homepage `Popular Services` section into a smaller wide-thumbnail row with four cards in one desktop row and more treatment-related visuals.

**Architecture:** Keep the existing dedicated `PopularServicesSection` server component, but revise its grid, aspect ratio, overlay, and image prompts so it behaves like a compact thumbnail-navigation row instead of a tall editorial showcase. Update the focused component test to match the new treatment-specific alt text and compact wide-card layout, then keep homepage integration unchanged apart from regression verification.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, `next/image`, Vitest + Testing Library

---

## File Map

**Modify**
- `src/components/PopularServicesSection.tsx`
- `src/components/PopularServicesSection.test.tsx`
- `src/app/page.tsx`

**Existing references**
- `next.config.ts`
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`

## Preflight

- Before editing, reread `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` and confirm the implementation still uses `next/image` with `fill` correctly for remote images.
- Confirm `next.config.ts` still allows `https://coresg-normal.trae.ai/api/ide/v1/text_to_image`, so only prompts and layout need changes.

---

### Task 1: Update the section test for the smaller wide-thumbnail layout

**Files:**
- Modify: `src/components/PopularServicesSection.test.tsx`

- [ ] **Step 1: Update `src/components/PopularServicesSection.test.tsx`**

```tsx
/* eslint-disable @next/next/no-img-element */
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
    <img
      alt={alt}
      src={typeof src === "string" ? src : ""}
      data-fill={fill ? "true" : "false"}
      {...props}
    />
  ),
}));

describe("PopularServicesSection", () => {
  it("renders the compact intro copy, four service links, and treatment-specific thumbnails", () => {
    render(<PopularServicesSection />);

    expect(screen.getByText("Popular Services")).toBeInTheDocument();
    expect(
      screen.getByText("Explore the treatments clients ask for most."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Acne Treatment Texture Explore/i }),
    ).toHaveAttribute("href", "/services/acne-treatment-kuala-lumpur");
    expect(
      screen.getByAltText("Skin close-up visual for acne treatment and clearer texture"),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /HIFU Lift Explore/i })).toHaveAttribute(
      "href",
      "/services/hifu-kuala-lumpur",
    );
    expect(
      screen.getByAltText("Jawline contour close-up visual for HIFU lifting treatment"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /RF Microneedling Refine Explore/i }),
    ).toHaveAttribute("href", "/services/rf-microneedling-kuala-lumpur");
    expect(
      screen.getByAltText(
        "Refined pore and skin-texture close-up visual for RF microneedling treatment",
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Facial Glow Explore/i })).toHaveAttribute(
      "href",
      "/services/facial-kuchai-lama",
    );
    expect(
      screen.getByAltText("Hydrated glow skin close-up visual for facial treatment"),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/PopularServicesSection.test.tsx
```

Expected: FAIL with assertion differences for the updated alt text expectations

- [ ] **Step 3: Commit the failing test**

```bash
git add src/components/PopularServicesSection.test.tsx
git commit -m "test: update popular services thumbnail row coverage"
```

---

### Task 2: Refine the section component into a compact wide-thumbnail row

**Files:**
- Modify: `src/components/PopularServicesSection.tsx`
- Test: `src/components/PopularServicesSection.test.tsx`

- [ ] **Step 1: Update `src/components/PopularServicesSection.tsx`**

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
    alt: "Skin close-up visual for acne treatment and clearer texture",
    imageSrc: buildImageSrc(
      "ultra realistic skincare close-up showing clearer acne-prone skin texture, premium beauty editorial photography, soft cinematic lighting, elegant dark neutral background, high detail skin close-up",
      "landscape_4_3",
    ),
  },
  {
    label: "HIFU",
    href: "/services/hifu-kuala-lumpur",
    descriptor: "Lift",
    alt: "Jawline contour close-up visual for HIFU lifting treatment",
    imageSrc: buildImageSrc(
      "ultra realistic jawline and lower-face contour close-up, subtle lifting effect, luxury skincare editorial photography, soft premium light, elegant dark background, skin detail focus",
      "landscape_4_3",
    ),
  },
  {
    label: "RF Microneedling",
    href: "/services/rf-microneedling-kuala-lumpur",
    descriptor: "Refine",
    alt: "Refined pore and skin-texture close-up visual for RF microneedling treatment",
    imageSrc: buildImageSrc(
      "ultra realistic skin-texture close-up with refined pores and smooth surface, premium clinical skincare editorial image, soft directional light, dark elegant palette, high detail",
      "landscape_4_3",
    ),
  },
  {
    label: "Facial",
    href: "/services/facial-kuchai-lama",
    descriptor: "Glow",
    alt: "Hydrated glow skin close-up visual for facial treatment",
    imageSrc: buildImageSrc(
      "ultra realistic hydrated glowing skin close-up, luminous complexion, premium facial skincare editorial photography, soft light, elegant dark neutral palette, high detail beauty image",
      "landscape_4_3",
    ),
  },
];

export function PopularServicesSection() {
  return (
    <section aria-label="Popular services" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 pb-12 md:px-8 md:pb-16">
        <div className="space-y-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Popular Services
            </p>
            <p className="text-base leading-7 text-muted md:text-lg md:leading-8">
              Explore the treatments clients ask for most.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {popularServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                aria-label={`${service.label} ${service.descriptor} Explore`}
                className="group relative isolate block overflow-hidden rounded-[1.6rem] border border-border/80 bg-surface/70 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageSrc}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.04)_0%,rgba(7,10,16,0.14)_48%,rgba(7,10,16,0.56)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-3 md:p-4">
                    <div className="flex w-full items-end justify-between gap-3 rounded-[1.1rem] border border-white/10 bg-[color:color-mix(in_srgb,var(--surface)_66%,transparent)] p-3 backdrop-blur-md">
                      <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                          {service.descriptor}
                        </p>
                        <h2 className="text-base font-semibold tracking-tight text-white md:text-lg">
                          {service.label}
                        </h2>
                      </div>
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
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

- [ ] **Step 3: Commit the refined section component**

```bash
git add src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "feat: refine popular services into thumbnail row"
```

---

### Task 3: Verify homepage integration still matches the revised layout

**Files:**
- Modify: `src/app/page.tsx`
- Verify: `src/components/PopularServicesSection.tsx`
- Test: `src/components/PopularServicesSection.test.tsx`

- [ ] **Step 1: Confirm `src/app/page.tsx` still renders the section in the correct order**

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

- [ ] **Step 4: Commit the homepage integration pass**

```bash
git add src/app/page.tsx src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "feat: tighten popular services homepage layout"
```

---

### Task 4: Verify the smaller thumbnail row in the browser

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

- a compact intro appears above the service grid
- the four service cards display in a single row
- each card is visibly shorter and wider than the previous tall version
- each card shows a full-bleed skin-close-up image tied to its treatment
- the overlay is lighter and does not hide too much of the thumbnail
- the labels `Texture`, `Lift`, `Refine`, and `Glow` read clearly over the imagery
- hover state shows subtle image zoom and feels premium instead of flashy

- [ ] **Step 3: Verify mobile presentation**

Check at mobile width that:

- the cards stack into a single column
- text remains readable over the image treatment
- tap targets are comfortable
- spacing feels consistent with the surrounding homepage sections

- [ ] **Step 4: Verify tablet presentation**

Check at tablet width that:

- the cards collapse into a `2 x 2` grid
- the text still fits comfortably without crowding
- the section remains smaller than the earlier tall-card version

- [ ] **Step 5: Verify link destinations**

Click each card and confirm it opens the same service routes already used by the homepage:

- `/services/acne-treatment-kuala-lumpur`
- `/services/hifu-kuala-lumpur`
- `/services/rf-microneedling-kuala-lumpur`
- `/services/facial-kuchai-lama`

- [ ] **Step 6: Commit the verification pass**

```bash
git add src/app/page.tsx src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "test: verify popular services thumbnail row layout"
```

---

## Spec Coverage Check

- Compact intro above the cards: covered in Task 2.
- Four smaller photo-backed wide thumbnail cards: covered in Task 2 and verified in Task 4.
- Same four service URLs: covered in Task 1 assertions, Task 2 data, and Task 4 link checks.
- Desktop single-row layout: covered in Task 2 classes and Task 4 desktop checks.
- Tablet `2 x 2` layout and mobile stacked layout: covered in Task 2 classes and Task 4 responsive checks.
- Treatment-specific skin-close-up imagery: covered in Task 1 alt-text assertions and Task 2 prompt updates.

## Placeholder Scan

- No `TODO`, `TBD`, or deferred implementation notes remain.
- Every code-editing step includes exact code.
- Every execution step includes an exact command or a concrete browser checklist.

## Type Consistency Check

- The component name stays `PopularServicesSection` throughout.
- The service data keys stay `label`, `href`, `descriptor`, `alt`, and `imageSrc` throughout.
- The intro copy stays `Explore the treatments clients ask for most.` throughout.

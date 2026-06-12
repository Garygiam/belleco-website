# Belléco Popular Services Luxury Portraits Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the `Popular Services` thumbnail imagery so each card uses a more beauty-premium, portrait-led visual while staying clearly related to its service.

**Architecture:** Keep the current wide-thumbnail layout in `PopularServicesSection` unchanged and only revise the service image prompts plus alt text to match the approved luxury-portrait direction. Update the focused component test first so the new visual copy is locked in, then verify the revised imagery on the live homepage.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, `next/image`, Vitest + Testing Library

---

## File Map

**Modify**
- `src/components/PopularServicesSection.tsx`
- `src/components/PopularServicesSection.test.tsx`

**Existing references**
- `next.config.ts`
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`

## Preflight

- Before editing, reread `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` and confirm the implementation still uses `next/image` with `fill` correctly for remote images.
- Confirm `next.config.ts` still allows `https://coresg-normal.trae.ai/api/ide/v1/text_to_image`, so only prompt text and alt text need changes.

---

### Task 1: Update the section test for luxury-portrait imagery

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
  it("renders the compact intro copy, four service links, and luxury portrait thumbnails", () => {
    render(<PopularServicesSection />);

    expect(screen.getByText("Popular Services")).toBeInTheDocument();
    expect(
      screen.getByText("Explore the treatments clients ask for most."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Acne Treatment Texture Explore/i }),
    ).toHaveAttribute("href", "/services/acne-treatment-kuala-lumpur");
    expect(
      screen.getByAltText("Luxury beauty portrait with clearer skin for acne treatment"),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /HIFU Lift Explore/i })).toHaveAttribute(
      "href",
      "/services/hifu-kuala-lumpur",
    );
    expect(
      screen.getByAltText("Luxury contour portrait highlighting a lifted jawline for HIFU"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /RF Microneedling Refine Explore/i }),
    ).toHaveAttribute("href", "/services/rf-microneedling-kuala-lumpur");
    expect(
      screen.getByAltText(
        "Luxury skin-detail portrait showing refined texture for RF microneedling",
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Facial Glow Explore/i })).toHaveAttribute(
      "href",
      "/services/facial-kuchai-lama",
    );
    expect(
      screen.getByAltText("Luxury glowing skin portrait for facial treatment"),
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
git commit -m "test: update popular services portrait imagery coverage"
```

---

### Task 2: Update the card prompts to the luxury-portrait direction

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
    alt: "Luxury beauty portrait with clearer skin for acne treatment",
    imageSrc: buildImageSrc(
      "ultra realistic luxury beauty portrait, clearer smooth complexion, refined skin texture, premium skincare campaign photography, soft cinematic lighting, elegant dark neutral background, close-up face portrait",
      "landscape_4_3",
    ),
  },
  {
    label: "HIFU",
    href: "/services/hifu-kuala-lumpur",
    descriptor: "Lift",
    alt: "Luxury contour portrait highlighting a lifted jawline for HIFU",
    imageSrc: buildImageSrc(
      "ultra realistic luxury beauty portrait emphasizing lifted jawline and elegant facial contour, premium skincare campaign lighting, soft shadows, polished skin detail, dark refined background",
      "landscape_4_3",
    ),
  },
  {
    label: "RF Microneedling",
    href: "/services/rf-microneedling-kuala-lumpur",
    descriptor: "Refine",
    alt: "Luxury skin-detail portrait showing refined texture for RF microneedling",
    imageSrc: buildImageSrc(
      "ultra realistic luxury skin-detail beauty portrait, refined pores and smooth texture, premium skincare editorial photography, elegant lighting, polished complexion, dark neutral luxury backdrop",
      "landscape_4_3",
    ),
  },
  {
    label: "Facial",
    href: "/services/facial-kuchai-lama",
    descriptor: "Glow",
    alt: "Luxury glowing skin portrait for facial treatment",
    imageSrc: buildImageSrc(
      "ultra realistic luxury beauty portrait with luminous hydrated skin, soft radiant glow, premium facial skincare campaign photography, elegant soft light, refined dark neutral background",
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

- [ ] **Step 3: Commit the imagery update**

```bash
git add src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "feat: update popular services with luxury portraits"
```

---

### Task 3: Run regressions and verify the imagery direction in the browser

**Files:**
- Verify: `src/components/PopularServicesSection.tsx`
- Test: `src/components/PopularServicesSection.test.tsx`

- [ ] **Step 1: Run the focused test and nearby homepage regressions**

Run:

```bash
npx -y pnpm@9.15.6 exec vitest run src/components/PopularServicesSection.test.tsx src/components/TreatmentsSection.test.tsx src/components/BeforeAfterResultsSection.test.tsx src/components/TestimonialsSection.test.tsx
```

Expected: PASS

- [ ] **Step 2: Run lint**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code `0`

- [ ] **Step 3: Open the homepage**

Open:

```text
http://localhost:3001/
```

- [ ] **Step 4: Verify the imagery direction**

Check that:

- the layout remains the current smaller wide-thumbnail row
- the image feel is more beauty-premium and portrait-led than before
- `Acne Treatment` reads as clearer, smoother complexion
- `HIFU` reads as contour and lifted jawline
- `RF Microneedling` reads as refined texture and polished skin detail
- `Facial` reads as luminous hydrated glow
- the images do not feel clinical, device-heavy, or treatment-room heavy

- [ ] **Step 5: Commit the verification pass**

```bash
git add src/components/PopularServicesSection.tsx src/components/PopularServicesSection.test.tsx
git commit -m "test: verify popular services luxury portrait imagery"
```

---

## Spec Coverage Check

- Beauty-premium portrait-led direction: covered in Task 2 prompts and Task 3 browser checks.
- Service-related imagery: covered in Task 1 alt-text assertions and Task 2 prompt wording.
- Existing smaller wide-thumbnail layout preserved: covered in Task 2 code and Task 3 verification.
- Existing service links preserved: covered by the focused test and regression run.

## Placeholder Scan

- No `TODO`, `TBD`, or deferred implementation notes remain.
- Every code-editing step includes exact code.
- Every execution step includes an exact command or a concrete browser checklist.

## Type Consistency Check

- The component name stays `PopularServicesSection` throughout.
- The service data keys stay `label`, `href`, `descriptor`, `alt`, and `imageSrc` throughout.
- The intro copy stays `Explore the treatments clients ask for most.` throughout.

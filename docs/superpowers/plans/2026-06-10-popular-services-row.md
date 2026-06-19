# Popular Services Row Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact “Popular Services” row (cinematic pills) on the homepage, immediately after the Treatments section, linking to the 4 service pages.

**Architecture:** Implement as inline JSX in `src/app/page.tsx` to keep the current homepage layout and component structure unchanged. Use `next/link` for internal navigation and Tailwind utility classes consistent with existing “pill” styles.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, ESLint

---

### Task 1: Add Popular Services row to the homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update `src/app/page.tsx` to include the Popular Services pills**

Replace the file contents with:

```tsx
import Link from "next/link";
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
      <TestimonialsSection />
      <ClientVideosSection />
      <BookingBanner />
    </main>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code 0 with no ESLint errors.


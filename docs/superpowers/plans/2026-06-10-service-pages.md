# Service Pages (4) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 service pages under `src/app/services/*/page.tsx` using the existing `ServicePage` template, each with metadata (title/description/canonical) and JSON-LD (`LocalBusiness` + `Service`).

**Architecture:** Each route is a small Next.js App Router page that composes `ServicePage` with drafted copy and injects JSON-LD via `ServicePage`’s `jsonLd` prop. Canonicals and JSON-LD URLs use `absoluteUrl(...)` to stay consistent with global SEO configuration.

**Tech Stack:** Next.js App Router (Next 16.x), React, TypeScript, eslint

---

## File Map

**Create**
- `src/app/services/acne-treatment-kuala-lumpur/page.tsx`
- `src/app/services/hifu-kuala-lumpur/page.tsx`
- `src/app/services/rf-microneedling-kuala-lumpur/page.tsx`
- `src/app/services/facial-kuchai-lama/page.tsx`

**Reuse**
- `src/app/services/_components/ServicePage.tsx`
- `src/lib/seo/jsonLd.ts`
- `src/lib/seo/urls.ts`

---

### Task 1: Implement 4 service pages

**Files:**
- Create: `src/app/services/acne-treatment-kuala-lumpur/page.tsx`
- Create: `src/app/services/hifu-kuala-lumpur/page.tsx`
- Create: `src/app/services/rf-microneedling-kuala-lumpur/page.tsx`
- Create: `src/app/services/facial-kuchai-lama/page.tsx`

- [ ] **Step 1: Create each route page using `ServicePage`**

Each page should:
- export `metadata` with `title`, `description`, and `alternates.canonical`
- call `buildLocalBusinessJsonLd()` and `buildServiceJsonLd({ name, url })`
- pass drafted, premium (non-keyword-stuffed) copy with 5 FAQs

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code 0

---

## Execution Choice

Two execution options:
1) **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks.
2) **Inline Execution** — execute tasks in this session using superpowers:executing-plans.

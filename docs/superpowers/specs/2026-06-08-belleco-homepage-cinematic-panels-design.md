---
title: Belleco Homepage Redesign — Cinematic Panels (Dark Luxe)
date: 2026-06-08
scope: homepage-only
---

## 1. Goal

Refresh the Belléco Skin Beauté homepage to feel more premium and “cinematic dark luxe” while preserving the current information architecture and functionality (hero → treatments → stories/reviews → booking banner → footer).

Primary outcomes:
- Stronger atmosphere (depth, glow, glass panels) without clutter.
- Clear hierarchy and conversion path to `/book` and WhatsApp.
- Improved section separation and coherence across the homepage.

## 2. Non-Goals

- No new pages or routes.
- No CMS, review API integration, or dynamic fetching.
- No typography/brand overhaul beyond layout and styling polish.
- No changes to booking form behavior.

## 3. Constraints

- Next.js App Router project (Next 16.x) with Tailwind v4 syntax and CSS variables in [globals.css](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/globals.css).
- Must keep light/dark theme toggle and persistence.
- First visit behavior: match system theme by default; user selection overrides and persists.
- Avoid new dependencies unless necessary.
- Maintain accessibility (focus states, contrast, semantic structure).

## 4. Visual Direction: “Cinematic Panels”

### 4.1 Background Atmosphere

Add a cinematic backdrop that subtly changes perceived depth:
- Base: near-black charcoal gradient in dark mode (already present).
- Layered radial glows: brass + soft white (low opacity) placed behind hero and between sections.
- Grain: extremely subtle overlay to avoid a “flat” digital look.
- Light sweep: faint vertical highlight band, static (no heavy animation).

### 4.2 Section “Panel” System

Each major section sits on a frosted panel:
- Translucent surface (dark: ~6–10% white; light: subtle grey wash).
- Thin border and “inner highlight” to define edges.
- Soft lift shadow for separation.

All panels share a single tokenized style (implemented via Tailwind classes and existing CSS variables).

### 4.3 Motion & Interactions

Minimal, high-end motion only:
- On-load: subtle stagger of hero content (text and chips), respecting `prefers-reduced-motion`.
- Hover: cards lift 2–4px + slight shadow bloom; borders brighten slightly.
- Buttons: gentle sheen / brightness shift, no exaggerated scaling.

## 5. Component-by-Component Design

### 5.1 Header (SiteHeader)

Improve top navigation presence without becoming heavy:
- Slightly stronger glass background + blur.
- Optional: thin brass hairline accent (e.g., border highlight) when scrolled (if implemented, must avoid hydration warnings).
- Logo lockup remains theme-aware.

Target file: [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx)

### 5.2 Hero (HomeHero)

Make hero feel like a cinematic “hero panel”:
- Left column: editorial stack with clearer rhythm and spacing.
- Add a small “proof chips” row (Diagnosis-first / Kuala Lumpur / WhatsApp-ready) using the panel style.
- Right image: framed like a glass tile; add a brass glow rim behind the image container.

Target file: [HomeHero.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/HomeHero.tsx)

### 5.3 Treatments (TreatmentsSection)

Keep the grid and filter behavior, refine presentation:
- Filter pills become “glass pills” with clear selected state and subtle horizontal scrolling on mobile.
- Treatment cards adopt pane styling (soft gradient, inner border, stronger hover lift).
- Tags/outcomes remain, but tuned to reduce visual noise (slightly smaller, more consistent spacing).

Target file: [TreatmentsSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TreatmentsSection.tsx)

### 5.4 Stories / Reviews (TestimonialsSection)

Present as “review tiles”:
- Each testimonial tile includes a star row (decorative) + “Google” label (already implemented).
- Final tile is the only link to Google Reviews: “More reviews →”.
- The “More reviews” tile should visually read like a call-to-action panel, not just another testimonial.

Target file: [TestimonialsSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TestimonialsSection.tsx)

### 5.5 Booking Banner (BookingBanner)

Make booking section feel like a cinematic closing panel:
- Stronger background glow around the banner.
- Primary CTA: `/book`.
- Secondary quick action: WhatsApp.
- Maintain current copy and contact information, but tighten hierarchy.

Target file: [BookingBanner.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/BookingBanner.tsx)

### 5.6 Footer (SiteFooter)

Keep content and add subtle polish:
- Maintain address + Waze/Maps icons.
- Ensure icons align and remain visible in dark mode with adequate contrast.

Target file: [SiteFooter.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteFooter.tsx)

## 6. Theme Behavior

- Default (first visit): follow system preference (`prefers-color-scheme`) when no stored preference exists.
- After user toggles: persist to `localStorage` and apply via `document.documentElement.dataset.theme`.
- Avoid hydration mismatch warnings by keeping server HTML stable and using `suppressHydrationWarning` on `<html>` (already applied).

Target files:
- [ThemeToggle.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/ThemeToggle.tsx)
- [layout.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/layout.tsx)
- [globals.css](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/globals.css)

## 7. Acceptance Criteria

- Homepage feels visually cohesive with “cinematic panels” background + section separation.
- No functional regressions: navigation, treatments filter, `/book` route, WhatsApp link, maps/waze links.
- Dark + light themes both remain legible and polished; default is system match.
- No console errors introduced by redesign.
- Lint passes.


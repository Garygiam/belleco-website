# Belléco — Targeted UX Fixes Design

## Goal

Fix the highest-impact usability issues in the current Belléco site without redesigning the full experience.

The priority is to:

- make header navigation work correctly from non-home pages
- make service pages easier to return from
- improve mobile responsiveness in the most noticeable weak spots
- apply a proper dark transparent hover treatment to videos
- clean up footer usability, especially on mobile

## Non-Goals

- Full homepage redesign
- New information architecture for the entire site
- Rewriting all service-page content
- Replacing the existing visual identity
- Building a brand new mobile navigation system from scratch

## Current Context

- The shared localized header lives in [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx).
- Service pages use the shared template in [ServicePage.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/services/_components/ServicePage.tsx).
- Video cards and featured preview live in [ClientVideosSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/ClientVideosSection.tsx).
- Footer layout lives in [SiteFooter.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteFooter.tsx).
- Mobile sticky contact behavior lives in [MobileStickyWhatsappCta.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/MobileStickyWhatsappCta.tsx).

## Chosen Direction

Use a targeted bug-fix and UX-polish pass rather than a larger redesign.

This means:

- fix broken and inconsistent navigation paths first
- improve return paths on service pages early in the layout
- tune mobile spacing and section behavior where it feels awkward
- make hover states visually clearer without changing the site’s overall design system
- preserve the current premium Belléco look

## Problem Areas And Intended Fixes

### 1. Header Navigation On Non-Home Pages

Current issue:

- `Treatments` and `Results` use page-local hash links, so they do not work properly from booking pages or service pages.

Fix direction:

- make those links point back to the homepage with the correct localized hash
- standardize one results anchor across the site
- keep `Book` as a proper route-based navigation link

Outcome:

- users can always reach those sections even when they are not on the homepage

### 2. Service Pages Feel Like A Dead End

Current issue:

- users can arrive directly on service pages from homepage cards or search
- the return-to-home or explore-more links appear too late in the page

Fix direction:

- add an early return path near the top of the service page
- add a clear “Back to Home” or “Explore All Treatments” style link before users hit the FAQ wall
- keep the lower supporting links, but do not rely on them as the first return mechanism

Outcome:

- users can orient themselves immediately and keep browsing naturally

### 3. Mobile Responsiveness

Current issue:

- mobile header action/navigation feels too limited
- some sections rely heavily on horizontal rails
- bottom content can feel cramped near the sticky WhatsApp bar

Fix direction:

- improve the mobile header utility and CTA clarity without introducing a full nav redesign
- add safer mobile bottom spacing where the sticky CTA overlaps the viewport
- adjust the most problematic mobile section spacing and sizing so the site feels less cramped

Outcome:

- the mobile site feels more deliberate and less like desktop sections squeezed into a smaller width

### 4. Video Hover Overlay

Current issue:

- the current overlay is theme-colored, not true black transparency
- the effect does not match the intended darker premium hover treatment

Fix direction:

- switch to a dark translucent overlay treatment
- ensure the hover state improves readability and perceived interactivity
- avoid blocking video-related interactions unnecessarily

Outcome:

- the video UI feels more premium and more visually intentional

### 5. Footer UX

Current issue:

- the footer is functional but visually flat
- contact and social areas do not feel strongly prioritized
- mobile scanning is weaker than it should be

Fix direction:

- improve footer grouping and visual hierarchy
- make contact actions clearer
- keep the same content, but make layout and spacing easier to use on mobile

Outcome:

- the footer feels like a useful end-of-page destination instead of leftover information

## Visual And UX Principles

- keep the current Belléco premium aesthetic
- prefer clearer hierarchy over adding more UI
- avoid large redesign risk
- make fixes feel intentional, not patched
- improve navigation confidence first, then visual polish

## Accessibility

- navigation links must remain clear and keyboard accessible
- hover improvements should not remove focus visibility
- mobile spacing changes should avoid obscuring content behind sticky UI
- video overlay contrast should improve readability rather than reduce it

## Implementation Shape

Expected implementation will likely touch:

- [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx)
- [ServicePage.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/services/_components/ServicePage.tsx)
- [ClientVideosSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/ClientVideosSection.tsx)
- [SiteFooter.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteFooter.tsx)
- [MobileStickyWhatsappCta.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/MobileStickyWhatsappCta.tsx)
- `src/app/globals.css`

It may also require small supporting changes in:

- service route wrappers
- tests for affected shared components

## Testing Expectations

Implementation should verify:

- header links route correctly from non-home pages
- service pages expose a clear early return path
- video section still works while using a darker overlay treatment
- footer still renders correct content and actions
- mobile-related changes do not break existing layout behavior
- production build still passes

## Acceptance Checklist

- [ ] `Treatments` and `Results` work correctly from non-home pages
- [ ] Service pages provide an early and obvious way back to home or to treatments
- [ ] The mobile experience feels less cramped and less awkward
- [ ] Sticky mobile CTA does not make bottom-page usage feel broken
- [ ] Videos use a proper dark transparent hover treatment
- [ ] Footer hierarchy and mobile usability are improved
- [ ] The site still feels like Belléco, not redesigned into a different product
- [ ] Focused tests and build verification pass

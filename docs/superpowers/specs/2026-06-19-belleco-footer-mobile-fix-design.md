# Belléco — Footer Mobile Fix Design

## Goal

Fix the current mobile footer breakage so the footer renders cleanly across the full viewport width, preserves the correct information hierarchy, and no longer conflicts with the sticky WhatsApp CTA.

## Non-Goals

- Redesigning the entire footer for desktop
- Changing footer content or removing contact/social links
- Replacing the sticky WhatsApp CTA with a different mobile action
- Reworking the whole homepage layout

## Current Context

- The current footer lives in [SiteFooter.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteFooter.tsx).
- Mobile bottom action behavior is affected by [MobileStickyWhatsappCta.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/MobileStickyWhatsappCta.tsx).
- Shared spacing and page-level layout behavior are controlled in [globals.css](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/globals.css).
- The currently shipped footer has three visible mobile issues:
  - the footer appears visually cut off with a dark strip on the right
  - `Instagram` is grouped with map/contact actions instead of the social section
  - the sticky WhatsApp bar overlaps the footer content and partially blocks the social section

## Chosen Direction

Use a focused mobile-first patch rather than a broader footer redesign.

This means:

- fix the layout width/overflow issue first
- restore clean content grouping
- keep the same Belléco visual language
- preserve desktop behavior unless a small shared improvement is harmless

## Problems And Intended Fixes

### 1. Footer Width / Right-Side Black Strip

Current issue:

- the footer does not visually fill the mobile width cleanly
- a dark vertical strip appears on the right side, making the footer look incomplete

Fix direction:

- inspect footer wrappers, grid/container widths, and any overflow/clipping behavior
- ensure the footer background and content containers align correctly on mobile
- avoid inner-card sizing that visually exposes the page background as a broken edge

Outcome:

- the footer reads as one complete full-width section on mobile

### 2. Wrong Information Grouping

Current issue:

- `Instagram` appears in the contact/location action row beside `Waze` and `Maps`
- the `Social` section feels incomplete and disconnected

Fix direction:

- keep `Waze` and `Maps` in the contact/location actions only
- place `Instagram`, `Facebook`, and `YouTube` together under `Social`
- preserve the same links, just restore the correct grouping

Outcome:

- the footer hierarchy becomes understandable again

### 3. Sticky CTA Overlap

Current issue:

- the sticky WhatsApp bar overlaps the bottom of the footer
- footer actions and the `Social` section are partially blocked

Fix direction:

- adjust mobile bottom spacing and safe-area handling
- ensure the footer has enough visual breathing room before the sticky CTA begins
- avoid adding so much space that the page feels padded awkwardly

Outcome:

- users can read and tap the entire footer on mobile

## Desired Footer Structure

The footer should remain simple and familiar:

- brand/logo and short brand statement
- contact card with phone, email, address, `Waze`, `Maps`
- social card with `Instagram`, `Facebook`, `YouTube`

This keeps the existing content model while making the layout easier to scan.

## Visual Principles

- keep the current premium Belléco look
- prefer cleaner structure over more decoration
- fix obvious breakage first
- preserve strong contrast and legibility in dark mode

## Accessibility

- social and map actions must remain clearly tappable on mobile
- spacing fixes must not create hidden or unreachable content
- layout changes should not reduce readability or focus visibility

## Implementation Shape

Expected implementation will likely touch:

- [SiteFooter.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteFooter.tsx)
- [globals.css](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/globals.css)
- possibly [MobileStickyWhatsappCta.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/MobileStickyWhatsappCta.tsx) if spacing needs a small component-level correction
- focused footer/mobile tests if the current coverage is insufficient

## Testing Expectations

Implementation should verify:

- footer social links are grouped in the social section
- `Instagram` no longer appears in the contact/map action row
- mobile footer layout does not expose the right-side background strip
- sticky WhatsApp spacing no longer covers footer content
- production build still passes

## Acceptance Checklist

- [ ] The footer fills the mobile width cleanly without the right-side black strip
- [ ] `Waze` and `Maps` remain in the contact/location row
- [ ] `Instagram`, `Facebook`, and `YouTube` are grouped under `Social`
- [ ] The sticky WhatsApp CTA no longer covers footer content
- [ ] The footer remains readable and usable on mobile
- [ ] The site still feels visually consistent with Belléco

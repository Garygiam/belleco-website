# Belléco — Sticky Mobile WhatsApp CTA Design

## Goal

Add a mobile-only sticky WhatsApp CTA that appears after the hero section and gives users a fast contact path without making the homepage feel crowded or aggressive.

## Non-Goals

- Adding a sticky CTA on desktop
- Adding multiple sticky actions in this phase
- Replacing existing `Book Consultation` buttons
- Changing the homepage section order
- Redesigning the hero itself

## Current Context

- The homepage hero lives in [HomeHero.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/HomeHero.tsx).
- Existing WhatsApp contact details already live in [brand.ts](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/config/brand.ts).
- The homepage already includes normal CTA buttons inside the hero and a booking banner later on the page.
- The sticky CTA should support mobile conversions without competing with those existing CTAs too early.

## Chosen Direction

Use this exact combination:

- `WhatsApp only`
- `show after hero section`
- `floating bar with label and icon`

## UX Behavior

### Visibility rule

- hidden while the hero section is still visible
- appears after the user scrolls beyond the hero
- mobile only

This keeps the first screen clean and brand-led while still giving users a quick contact option once they begin exploring.

### Action

- tapping the sticky CTA opens the Belléco WhatsApp link
- use the existing WhatsApp phone source from `brand.contact.phoneE164`

### Placement

- fixed near the bottom of the mobile viewport
- centered horizontally or slightly inset within page padding
- positioned above the device safe area so it does not collide with iPhone home indicator space

## Visual Design

### Form

Use a floating rounded bar, not a full-width bottom nav and not a tiny icon bubble.

The bar should include:

- WhatsApp icon
- short label such as `Chat on WhatsApp` or `WhatsApp Us`

### Tone

It should feel:

- premium
- calm
- obvious
- easy to tap

It should not feel:

- like a generic floating support widget
- too loud or sales-heavy
- too large relative to the rest of the page

### Styling alignment

The CTA should visually match the existing Belléco system:

- rounded shape
- clean typography
- subtle shadow or glass treatment
- good dark/light compatibility

## Responsive Rules

### Mobile

- visible after hero section
- sticky and persistent during normal page browsing
- comfortable tap target size

### Desktop

- do not render

## Implementation Shape

### Suggested component

Create a dedicated component such as:

- `src/components/MobileStickyWhatsappCta.tsx`

### Suggested integration

- render it in the homepage shell so it can observe the hero boundary
- use a hero marker or `id` on the hero section to determine when the CTA should appear

### State model

The component only needs lightweight client-side state:

- whether the hero is currently visible
- whether the viewport is in the mobile range

No server data or form state is needed.

## Accessibility

- clear accessible label for the WhatsApp action
- sufficient color contrast
- touch-friendly size
- do not block core page content in a way that traps interaction

## Testing Expectations

Implementation should verify:

- the sticky CTA renders the WhatsApp action
- it links to the correct WhatsApp URL
- it stays hidden while the hero is considered visible
- it becomes visible after the hero is out of view
- it remains hidden on desktop class breakpoints or via responsive rendering logic

## Acceptance Checklist

- [ ] Mobile-only sticky CTA exists
- [ ] CTA is WhatsApp only
- [ ] CTA stays hidden while the hero is visible
- [ ] CTA appears after the hero section
- [ ] CTA uses Belléco’s existing WhatsApp contact source
- [ ] CTA uses a floating bar with label and icon
- [ ] CTA sits safely above the mobile safe area
- [ ] CTA feels visually consistent with the homepage styling

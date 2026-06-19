# Belléco — Popular Services Photo Cards CTA Refresh Design

## Goal

Refine the homepage `Popular Services` section so each card feels more clearly tied to its treatment and the `Explore` affordance feels like an intentional action instead of floating label text.

The section should keep the existing compact 4-card thumbnail layout while improving:

- treatment-photo relevance
- CTA clarity
- premium polish inside each card

## Non-Goals

- Changing the homepage section order
- Changing service slugs or destination routes
- Replacing the `Popular Services` section with a carousel
- Moving the CTA outside the image card
- Switching the visual direction to clinical treatment-room imagery

## Current Context

- The current implementation lives in [PopularServicesSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.tsx).
- The section already uses:
  - a compact intro
  - four desktop cards in one row
  - photo-backed thumbnails
  - a bottom overlay panel inside each card
- The remaining issue is that:
  - the photos still do not feel related enough to each service
  - the current `Explore` treatment feels too much like plain text inside the box

## Chosen Direction

Use `Option 1` for imagery and `A3` for the CTA treatment.

That means:

- keep the premium luxury portrait direction
- make each portrait more specifically related to the service concern
- keep the CTA inside the bottom overlay panel
- restyle `Explore` as a small pill button with an arrow

This keeps the section compact and premium while making the cards feel more purposeful.

## Content Structure

Each card continues to include:

- descriptor
- service title
- related luxury portrait image
- CTA affordance

The existing four services remain:

- `Acne Treatment`
- `HIFU`
- `RF Microneedling`
- `Facial`

## Visual Design

### Image Direction

The image direction stays `beauty-premium`, not clinical.

All four images should remain visually consistent:

- premium skincare campaign style
- soft cinematic lighting
- refined dark-neutral palette
- elegant close-up portrait framing
- realistic skin detail

But each image prompt should become more treatment-specific:

- `Acne Treatment`: clearer smooth complexion, refined texture, close-up skin clarity portrait
- `HIFU`: lifted jawline, elegant contour emphasis, sculpted lower-face portrait
- `RF Microneedling`: refined pores, smoother texture, detailed skin-finish portrait
- `Facial`: luminous hydration, soft glow, fresh radiant complexion portrait

The section should not introduce:

- device-heavy visuals
- treatment-bed visuals
- obvious clinic-room scenes
- overly abstract beauty imagery that weakens service relevance

### CTA Treatment

The CTA stays inside the bottom overlay panel, but changes from plain text to a compact pill.

The pill should:

- sit on the right side of the overlay panel
- use rounded-full styling
- read clearly as interactive
- include a small arrow cue
- remain visually secondary to the service title

The CTA should feel premium and subtle, not like a loud primary button.

Recommended label:

- `Explore`

Recommended shape:

- small frosted or softly tinted pill
- enough contrast to feel clickable
- visually integrated with the overlay container

### Overlay Panel

The overlay panel remains the main content container inside the image.

It should continue to:

- sit along the bottom edge of the card
- use translucent glass styling
- keep the descriptor and title aligned on the left
- keep the CTA pill aligned on the right
- preserve legibility over the photo background

## Interaction

- the whole card remains clickable
- the CTA pill is decorative within the clickable card, not a separate nested button
- hover should still slightly zoom the image
- hover and focus states should make the CTA pill feel more alive through subtle contrast or brightness change
- motion should remain restrained and premium

## Accessibility

- maintain strong text contrast for descriptor, title, and CTA pill
- keep meaningful treatment-specific alt text for each image
- preserve visible focus styles on the full card
- avoid nested interactive controls inside the clickable link
- ensure the CTA text remains readable on mobile widths

## Implementation Shape

### Data

Keep the existing card data structure, but refine:

- image prompts
- image alt text
- CTA rendering inside the overlay panel

No route or service data changes are needed.

### Rendering

Update the overlay footer in [PopularServicesSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/PopularServicesSection.tsx) so the right-side `Explore` text becomes a pill-style CTA with arrow.

The card height, 4-up desktop layout, and general section structure should remain unchanged.

## Testing Expectations

Implementation should verify:

- all four service cards still render
- all four cards still link to the correct locale-prefixed service routes
- the updated alt text still matches the refined image direction
- the CTA text still renders for each card
- the CTA now appears in the new pill treatment instead of plain text-only presentation

Behavioral testing should stay focused and light because this is a presentational refinement.

## Acceptance Checklist

- [ ] Each `Popular Services` card keeps the current compact thumbnail layout
- [ ] Each card image feels more directly related to its treatment while staying luxury portrait-led
- [ ] `Acne Treatment`, `HIFU`, `RF Microneedling`, and `Facial` each have distinct prompt direction
- [ ] The right-side `Explore` affordance is restyled as a small pill with arrow
- [ ] The CTA remains inside the overlay panel
- [ ] The full card remains the clickable target
- [ ] No nested interactive accessibility issue is introduced
- [ ] The updated cards still feel premium, cinematic, and aligned with the Belléco homepage

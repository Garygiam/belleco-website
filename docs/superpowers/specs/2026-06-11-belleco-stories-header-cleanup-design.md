# Belléco — Stories Header Cleanup Design

## Goal

Improve the `Stories` / testimonials section header so it feels balanced, premium, and intentional on desktop and mobile.

The current problem is the oversized empty left area in the split intro layout, which makes the section feel awkward and visually weak.

## Non-Goals

- Redesigning the testimonial cards themselves
- Changing testimonial copy
- Changing the Google Reviews CTA card behavior
- Reordering the overall homepage sections
- Adding new animations or interactive behavior

## Current Context

- The current implementation lives in [TestimonialsSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TestimonialsSection.tsx).
- The section intro currently uses a `2-column` grid:
  - left column: `Stories` eyebrow
  - right column: heading + paragraph
- This creates too much dead space on desktop and makes the section look imbalanced.
- The testimonial cards below already work reasonably well and do not need a structural redesign in this scope.

## Chosen Direction

Use `Option D`:

- remove the split intro layout
- place the entire intro in one compact block
- position that block directly above the testimonial grid

## Layout Design

### Header structure

Use one vertical intro block in this order:

1. `Stories` eyebrow
2. `Real transformations, guided with care.` headline
3. supporting paragraph

This block should sit directly above the cards, not beside them.

### Width and alignment

- keep the intro block left-aligned
- constrain it with a comfortable max width such as `max-w-3xl`
- keep spacing tighter than the current version

This should make the section feel cleaner and more premium while preserving the existing tone.

### Grid relationship

The testimonial grid should begin immediately below the intro block with a moderate vertical gap.

The intro should feel like part of the same section flow, not a detached layout experiment.

## Visual Rules

- remove the large empty left-side space
- preserve the cinematic / premium tone already used on the homepage
- keep the headline visually dominant
- keep the eyebrow small and understated
- avoid excessive whitespace between intro and cards

## Responsive Behavior

### Desktop

- no side-by-side header split
- one intro block above the card grid
- cards remain in the existing grid layout

### Mobile

- use the same stacked structure
- maintain readable spacing
- avoid over-large heading gaps that push the cards too far down

## Implementation Scope

This change should be limited to the section header container in `TestimonialsSection`.

Likely implementation shape:

- replace the current `grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end` wrapper
- use one compact intro wrapper above the existing card grid
- preserve the current testimonial card markup and CTA card markup

## Testing Expectations

Implementation should verify:

- the `Stories` eyebrow still renders
- the section heading still renders
- the testimonial figure cards still render
- the Google Reviews CTA still renders

No special interaction tests are needed because this is a layout cleanup, not a behavior change.

## Acceptance Checklist

- [ ] The `Stories` header no longer uses a 2-column split intro layout
- [ ] `Stories`, heading, and paragraph appear in one compact block above the cards
- [ ] The section no longer shows the large empty left area on desktop
- [ ] The testimonial grid remains intact
- [ ] The Google Reviews CTA card remains intact
- [ ] The section feels tighter and visually cleaner on desktop and mobile

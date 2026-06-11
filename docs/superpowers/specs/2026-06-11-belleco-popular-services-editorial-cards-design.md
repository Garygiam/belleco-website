# Belléco — Popular Services Wide Thumbnail Row Design

## Goal

Redesign the homepage `Popular Services` strip so it feels premium, visual, and intentionally curated instead of looking like a plain row of pills.

The new section should use smaller service thumbnails with photo-backed wide cards that fit the existing cinematic Belléco homepage style without dominating the page.

## Non-Goals

- Reordering the homepage sections
- Changing the service URLs or service page slugs
- Adding carousel behavior in this phase
- Adding video previews inside this section
- Replacing the larger `TreatmentsSection`

## Current Context

- The current implementation lives in [page.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/page.tsx).
- The section currently renders as a simple horizontally scrollable row of rounded text pills.
- That strip sits between `TreatmentsSection` and `BeforeAfterResultsSection`.
- The user wants this area to feel more attractive with:
  - thumbnails
  - photo visual treatment
  - a better layout than plain pills
- The homepage already uses a cinematic, premium design language with glass surfaces, dark overlays, and richer editorial spacing.

## Chosen Direction

Use `Wide thumbnail row`:

- replace the pill row with `4` service cards
- keep all `4` cards visible in one desktop row
- give each card a smaller photo-backed thumbnail treatment
- keep all cards equally visible instead of featuring one service disproportionately

This direction improves visual quality while making the section feel lighter, denser, and more useful as quick service navigation.

## Content Structure

### Intro

Add a compact section intro above the cards:

1. `Popular Services` eyebrow
2. short supporting line such as `Explore the treatments clients ask for most.`

The intro should remain concise so the cards stay as the main focus.

### Card content

Each card should include:

- treatment-specific image or generated visual
- service name
- short micro-label or descriptor
- subtle directional affordance such as `Explore` or an arrow cue

The existing four services remain:

- `Acne Treatment`
- `HIFU`
- `RF Microneedling`
- `Facial`

## Layout Design

### Desktop

Use a single row of `4` wide cards for the desktop layout.

This should feel compact and premium, more like a refined thumbnail navigation row than a secondary hero section.

The cards should be noticeably shorter than the current implementation and use a landscape-style aspect ratio.

### Tablet

Use a `2 x 2` grid on tablet widths so the cards keep comfortable text spacing without becoming too narrow.

### Mobile

Use a stacked list or single-column card layout with the same visual treatment.

Cards should remain easy to scan, with image presence preserved and text kept legible over the photo treatment.

## Visual Design

### Card treatment

Each card should feel like a premium thumbnail tile:

- rounded corners
- photo-first presentation
- lighter, slimmer gradient overlay for text legibility
- subtle border and surface depth
- hover or press polish such as slight zoom or brighter border

### Tone

The section should feel:

- premium
- cinematic
- beauty-editorial
- calm and polished

It should not feel:

- like plain navigation pills
- like a generic ecommerce card grid
- too colorful or noisy
- heavier than the homepage hero

### Image direction

Images should feel visually consistent across all four cards:

- skincare related
- treatment-specific skin close-up imagery
- soft premium lighting
- realistic, not abstract
- aligned with Belléco’s dark, elegant homepage palette

The visual direction for each card should feel more directly related to the treatment:

- `Acne Treatment`: clearer skin texture or blemish-control close-up
- `HIFU`: jawline, contour, or lift-focused skin close-up
- `RF Microneedling`: refined pores or texture-improvement close-up
- `Facial`: hydrated glow or luminous skin close-up

## Interaction

- the whole card should remain clickable
- each card should link to the same existing service route already used on the homepage
- hover and focus states should clearly signal interactivity
- motion should stay subtle and premium
- the smaller format should still keep the thumbnail visually readable

## Accessibility

- preserve clear text contrast over image backgrounds
- provide meaningful alt text or decorative-image handling as appropriate
- keep focus states visible
- ensure cards remain readable and operable on mobile

## Implementation Shape

### Data model

Expand the homepage `popularServices` data so each service can include the visual and supporting metadata needed for cards, such as:

- image prompt or image source
- short descriptor
- optional alt text
- prompt language that is more treatment-specific than generic beauty editorial imagery

### Rendering

Implementation can stay inside [page.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/page.tsx) if the section remains concise, or move into a dedicated homepage component if the markup becomes too large.

The preferred outcome is a focused, maintainable section with clear separation between section data and presentation.

## Testing Expectations

Implementation should verify:

- the `Popular Services` label still renders
- all four service links still render
- each card links to the correct existing service page
- the new supporting line renders
- the section no longer uses the old plain pill presentation
- the desktop layout renders four cards in one row

Behavioral testing can stay light because this is mostly a presentational redesign.

## Acceptance Checklist

- [ ] The homepage `Popular Services` section no longer appears as a plain pill row
- [ ] The section uses four smaller photo-backed wide thumbnail cards
- [ ] Each card remains linked to its existing service URL
- [ ] The section includes a compact intro above the cards
- [ ] Desktop shows all four services in one row
- [ ] Tablet collapses to `2 x 2`
- [ ] Mobile keeps the cards readable in a stacked layout
- [ ] The thumbnail imagery feels directly related to each treatment
- [ ] The layout feels premium and visually aligned with the Belléco homepage
- [ ] Mobile and desktop layouts both keep the cards readable and attractive
- [ ] Hover and focus states clearly communicate interactivity

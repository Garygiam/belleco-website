# Belléco — Before/After Results Section Design

## Goal

Add a premium, trust-building `Before/After Results` section to the homepage that:

- shows clear visual proof of treatment outcomes
- fits the current cinematic / clinical Belléco homepage style
- improves conversion confidence before users reach testimonials and booking CTAs
- works with placeholders first, then upgrades cleanly to real approved client photos later

## Non-Goals

- Building a full gallery page in this phase
- Adding client testimonials inside each result card
- Translating the section in this phase
- Implementing analytics in this phase
- Replacing existing testimonials or client video sections

## Current Context (from this repo)

- The homepage currently flows through `Hero -> Treatments -> Testimonials -> Videos -> Booking`.
- The homepage assembly lives in [page.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/page.tsx).
- The visual language already uses cinematic panel styling defined in [globals.css](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/globals.css).
- The strongest nearby trust-oriented sections are:
  - [TreatmentsSection](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TreatmentsSection.tsx)
  - [TestimonialsSection](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/TestimonialsSection.tsx)
  - [BookingBanner](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/BookingBanner.tsx)

## Chosen Direction

### Layout direction

Use the approved `Editorial Showcase` concept:

- one featured before/after comparison leads the section
- one compact clinical details panel sits beside it on desktop
- three smaller supporting result items sit below the featured case

### Proof style

Use `clinical details only`, not story-heavy proof blocks.

Each case shows:

- concern
- treatment
- sessions
- timeline

This keeps the section cleaner, more premium, and more clinically credible than adding quote-heavy or emotionally dense copy.

## Homepage Placement

Insert the section:

`Hero -> Treatments -> Before/After Results -> Testimonials -> Videos -> Booking Banner`

### Why this placement

- users first understand available treatments
- then see visual proof
- then receive review-based reassurance
- then continue into richer media and booking CTAs

This order creates a stronger conversion sequence than placing visual proof after testimonials.

## Content Structure

### Section header

The section should contain:

- a short eyebrow, such as `Real Results`
- a proof-led heading
- one short supporting sentence only

The intro should stay concise so visual proof appears quickly.

### Featured case

The featured case is the hero of the section and includes:

- large before/after comparison area
- optional case title
- clinical details panel

Recommended case fields:

- `title` (optional)
- `concern`
- `treatment`
- `sessions`
- `timeline`
- `beforeImage`
- `afterImage`
- `alt` / accessibility text

### Supporting cases

Below the featured case, show three smaller supporting items.

Each supporting item should contain:

- thumbnail preview
- short concern label
- short treatment label

The supporting items act as quick proof selectors, not full content cards.

### Disclaimer

Add a short disclaimer under the section:

`Results vary by skin condition and treatment plan.`

This supports clinical credibility and avoids overclaiming.

## Interaction Design

### Desktop

- featured image comparison on the left
- clinical details panel on the right
- supporting result row below
- primary CTA below the proof block

### Mobile

Stack in this order:

1. section intro
2. featured image comparison
3. clinical details
4. supporting result items
5. CTA
6. disclaimer

### Selection behavior

- a supporting case can be tapped / clicked to replace the featured case
- keep interaction simple and immediate
- avoid heavy animation, autoplay motion, or complex carousel behavior in phase 1

## CTA Strategy

Place the CTA directly after the proof block.

Recommended CTA order:

- primary: `Book Consultation`
- secondary: `Ask on WhatsApp`

The section should convert proof into action without forcing users to scroll into another section first.

## Visual Design Rules

### Tone

The section should feel:

- premium
- calm
- clinical
- trustworthy

It should not feel:

- overly promotional
- crowded
- generic-template
- overly emotional

### Styling alignment

Follow the existing cinematic system already used across the homepage:

- reuse `cinematic-panel` framing where appropriate
- maintain strong spacing and large media emphasis
- keep text density low
- preserve dark/light theme compatibility

### Image presentation

Before/after images should later follow these rules:

- consistent crop
- consistent lighting where possible
- consistent angle / framing
- enough image size to make differences visible on mobile

If placeholders are used first, they must be clearly presented as placeholders and must not imply real medical outcomes.

## Data / Component Design

### Proposed component

Create a dedicated homepage section component, for example:

- `src/components/BeforeAfterResultsSection.tsx`

### Proposed data shape

Keep phase-1 data local and static inside the component or a nearby config module.

Suggested shape:

```ts
type ResultCase = {
  id: string;
  title?: string;
  concern: string;
  treatment: string;
  sessions: string;
  timeline: string;
  beforeImage: string;
  afterImage: string;
  alt: string;
};
```

This model is intentionally minimal so placeholder content can later be swapped for real approved photos without redesigning the UI contract.

## Accessibility

- provide descriptive alt text for before/after imagery
- ensure all supporting case selectors are keyboard accessible
- do not rely on color alone to indicate the active case
- maintain readable contrast in both themes
- keep tap targets comfortable on mobile

## Placeholder-First Rollout

### Phase 1

- use clearly non-deceptive placeholder visuals
- validate section layout, spacing, responsiveness, and CTA flow
- validate that the section improves homepage trust sequencing

### Phase 2

Replace placeholders with real approved case content once available.

That later rollout should only require:

- swapping image assets
- replacing placeholder labels with real concerns / treatments
- reviewing alt text and disclaimer wording

The structure should not need to change.

## Testing Expectations

Implementation should include focused checks for:

- featured case renders correctly
- supporting cases render correctly
- selecting a supporting case swaps the featured case
- mobile-safe layout classes are present where needed
- disclaimer and CTA render consistently

Tests should stay targeted and avoid over-specifying visual classes that are not important to behavior.

## Acceptance Checklist

- [ ] Homepage includes a dedicated `Before/After Results` section
- [ ] Section sits between treatments and testimonials
- [ ] One featured case is shown by default
- [ ] Three supporting cases appear below the featured case
- [ ] Clinical details panel includes concern, treatment, sessions, and timeline
- [ ] Primary CTA appears immediately after the proof block
- [ ] Disclaimer appears below the section
- [ ] Mobile layout stacks cleanly and keeps proof visible
- [ ] Supporting case selection updates the featured case
- [ ] Placeholder-first content can be replaced by real approved images without redesign

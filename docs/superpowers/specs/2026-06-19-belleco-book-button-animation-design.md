# Belléco — Animated Book Button Design

## Goal

Refine the header `Book` CTA so it attracts more attention with a tasteful animated effect inspired by an update-style button, while still feeling premium and aligned with the Belléco brand.

## Non-Goals

- Redesigning the entire site header
- Changing the CTA text, destination route, or placement
- Applying the same animation to every button on the site
- Turning the button into a loud flashing alert
- Adding JavaScript-driven animation for this effect

## Current Context

- The current header CTA lives in [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx).
- The current CTA is a static rounded pill using the existing accent color.
- The user asked for a look inspired by the Trae update button with a blink animation.
- A visual sample was shown and the approved direction is the softer premium pulse version rather than the stronger blink-pop version.

## Chosen Direction

Use a restrained animated CTA that feels luminous and premium, not urgent or noisy.

The chosen direction should:

- keep the current pill shape and general size
- preserve the warm Belléco accent color
- add a subtle breathing glow
- add a light sweep or sheen across the button
- avoid harsh flashing or aggressive scale jumps

This captures the “notice me” quality of an update-style button without making the Belléco header feel cheap or distracting.

## Visual Design

### Base Button

The button should remain recognizably close to the current CTA:

- rounded full pill
- warm gold-accent background
- dark readable text
- elegant shadow
- premium feel against the dark header

### Motion Style

The approved animation is a soft pulse, not a hard blink.

Recommended behavior:

- a slow glow cycle every few seconds
- a subtle highlight sweep across the button surface
- extremely small scale lift at the brightest moment
- no constant jitter
- no abrupt flashing between dark and bright states

The motion should feel like a polished “live” button rather than a warning indicator.

### Hover and Focus

Hover and keyboard focus should still feel distinct from the idle animation.

Recommended behavior:

- hover slightly deepens brightness and shadow
- focus ring remains clearly visible and accessible
- hover should complement the idle animation instead of fighting it

## Interaction

- the CTA remains a normal `Link`
- no nested elements that change semantics
- animation should not block clickability
- the button should continue to navigate to `/${locale}/book`

## Accessibility

- preserve adequate contrast for text on the accent background
- keep the focus-visible state clear even while the idle animation is running
- ensure animation remains subtle enough not to feel disruptive
- support `prefers-reduced-motion` by disabling or dramatically reducing the pulse and sheen

## Implementation Shape

### Files

Expected implementation should stay narrow:

- [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx)
  - add a dedicated class or structure for the animated CTA
- likely `src/app/globals.css`
  - define the animation keyframes and reduced-motion behavior
- [SiteHeader.test.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.test.tsx)
  - extend test coverage to assert the CTA class is present

### Styling Strategy

Preferred implementation:

- CSS-based animation only
- one dedicated CTA class for the animated button
- one pseudo-element for the moving sheen
- one or two restrained keyframes for pulse and sweep

This keeps the behavior lightweight and easy to maintain.

## Testing Expectations

Implementation should verify:

- the header CTA still renders
- the CTA still links to the localized booking route
- the CTA includes the new animated class hook
- the change does not break the existing header test expectations

Manual verification should confirm:

- the button feels premium on desktop
- the motion is visible but not distracting
- reduced-motion users do not get the full animation effect

## Acceptance Checklist

- [ ] The header `Book` CTA keeps its current role, route, and placement
- [ ] The button adopts the approved soft premium pulse direction
- [ ] The motion feels closer to a polished update button than a static CTA
- [ ] The effect is subtle and brand-appropriate
- [ ] `prefers-reduced-motion` is respected
- [ ] The CTA remains accessible and easy to read
- [ ] Focused tests cover the CTA hook or class
- [ ] The final result feels more eye-catching without looking cheap

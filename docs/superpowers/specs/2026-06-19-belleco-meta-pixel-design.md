# Belléco — Meta Pixel Global Installation Design

## Goal

Install Meta Pixel `892839550540707` across the Belléco website so every page is tracked globally, the App Router fires `PageView` on initial load and route changes, and the site is ready for future conversion tracking.

## Non-Goals

- Adding a consent banner or cookie preferences flow
- Configuring custom conversions inside Meta Events Manager
- Sending lead, booking, or WhatsApp conversion events in this phase
- Replacing the existing Google Analytics setup
- Introducing per-page pixel variations

## Current Context

- Global analytics already load from [layout.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/layout.tsx).
- Google Analytics is installed globally via `@next/third-parties/google`.
- Route-change analytics already use a small client helper in [GoogleAnalyticsPageView.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/GoogleAnalyticsPageView.tsx).
- Meta Pixel is not currently present in the codebase or deployed output.

## Chosen Direction

Use a two-part App Router-compatible integration:

- add the Meta Pixel base snippet once in the root layout
- add a small client-side route tracker that fires `fbq("track", "PageView")` on client navigations

This keeps initial bootstrap and SPA navigation tracking separate, matches the current analytics structure, and leaves a clear extension point for future conversion events.

## Architecture

### Root Layout Install

The base Meta Pixel script should be added in [layout.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/layout.tsx) so every page inherits the same global install.

The root layout is responsible for:

- loading the Meta Pixel bootstrap code once
- initializing `fbq` with Pixel ID `892839550540707`
- firing the initial `PageView` on first page load
- rendering the client tracker component after the app content

This ensures all locale routes, booking pages, and service pages share one pixel installation point.

### Route Change Tracker

A new client component should handle App Router transitions by observing:

- `usePathname()`
- `useSearchParams()`

On client-side route changes, it should call:

- `fbq("track", "PageView")`

The first render should not fire a duplicate client-side `PageView`, because the base pixel snippet already covers the initial page load.

### Future Conversion Support

Implementation should include a small reusable helper or wrapper so later work can safely send:

- `Lead`
- `Contact`
- `Schedule`
- other Meta conversion events

This helper should:

- guard against `fbq` being unavailable
- centralize event naming
- avoid duplicating raw window access throughout the app

## Implementation Shape

### Files

Expected implementation touches:

- [layout.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/layout.tsx) for the global install
- a new client component for Meta route-change tracking under `src/components/`
- a small helper file if needed for future conversion events
- focused tests covering root-layout inclusion and route-change `PageView` behavior

### Script Strategy

The base pixel should use the standard Meta Pixel bootstrap snippet loaded from:

- `https://connect.facebook.net/en_US/fbevents.js`

The initialization should include:

- `fbq("init", "892839550540707")`
- `fbq("track", "PageView")`

The root layout should remain the only place where bootstrap code is injected.

### Route Tracking Strategy

The client tracker should:

- run only in the browser
- detect pathname and query-string changes
- skip the first render
- call `fbq("track", "PageView")` on later route changes

This keeps App Router navigation tracking explicit and avoids relying on full-page reload behavior.

## Error Handling

- If `window.fbq` is unavailable, route tracking should fail silently or no-op rather than breaking rendering.
- The helper should avoid throwing during SSR.
- The implementation should keep browser-only logic inside client components or guarded code paths.

## Testing Expectations

Focused tests should verify:

- the root layout includes the Meta Pixel integration globally
- the configured Pixel ID is `892839550540707`
- the route tracker calls `fbq("track", "PageView")` on client route changes
- the route tracker does not duplicate the initial page-load `PageView`

Build verification should include:

- a successful production build

## Deployment Expectations

After implementation:

- commit the Meta Pixel installation changes
- push them to `main`
- verify Vercel picks up the new commit
- confirm the production deployment output includes Meta Pixel `892839550540707`

## Acceptance Checklist

- [ ] Meta Pixel `892839550540707` is installed globally on all pages
- [ ] The install is compatible with Next.js App Router
- [ ] The base pixel fires `PageView` on initial page load
- [ ] App Router route changes fire `PageView`
- [ ] The root layout is the single global installation point
- [ ] The implementation supports future conversion tracking through a reusable helper path
- [ ] Focused tests cover the root install and route-change behavior
- [ ] Production build passes
- [ ] Changes are committed and pushed to `main`
- [ ] Production deployment includes Pixel ID `892839550540707`

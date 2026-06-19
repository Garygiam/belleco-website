# Belléco — Multilingual Route-Based Website Design

## Goal

Launch a real multilingual Belléco website with route-based locales, full translated public content, and a top-right header language switcher placed next to the theme toggle.

The first release should support:

- `English`
- `Chinese`
- `Malay`

## Non-Goals

- Adding more than `3` languages in this phase
- Domain-based locale routing
- Auto-translating content at runtime
- Translating private or admin-only interfaces
- Changing Belléco brand naming across languages

## Current Context

- The website is currently English-only.
- There is no language switcher in the UI.
- The header currently renders the logo, desktop nav, a booking CTA, and [ThemeToggle.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/ThemeToggle.tsx) inside [SiteHeader.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/SiteHeader.tsx).
- The app uses the Next.js App Router, and the current pages live directly under `src/app/`.
- The user previously approved:
  - route-based locale structure
  - `English + Chinese + Malay`
- The user now wants the language switcher in the top right of the header, near the theme toggle.

## Chosen Direction

Use `route-based locales` with a `header switcher`:

- locale routes: `/en`, `/zh`, `/ms`
- default fallback locale: `English`
- first-visit locale selection: auto-detect from browser language when possible
- switcher placement: top right of header, beside theme toggle

This direction is best for SEO, future growth, and a clean user experience.

## Routing Design

### Locale routes

Use these public locale paths:

- `/en`
- `/zh`
- `/ms`

All main public pages should live under the locale segment so each language has a stable URL structure.

### Default behavior

- if browser language matches a supported locale, redirect first-time visitors to that locale
- if browser language does not match, redirect to `/en`

### Unsupported locale handling

- unsupported locale segments should return `404`

## Header Switcher Design

### Placement

Render the language switcher in the top-right header action area next to the theme toggle.

The action cluster should feel compact and premium, not like a utility toolbar.

### Form

Use a segmented pill control, not a dropdown.

Recommended labels:

- `EN`
- `中文`
- `BM`

### Behavior

- the active locale is visually highlighted
- clicking a locale keeps the user on the equivalent page when possible
- if the equivalent localized route exists, switch directly to it
- if a route has no localized equivalent, fall back to that locale’s homepage

### Mobile

- keep the switcher visible in the header if space allows
- if spacing becomes too tight, move the same control into the compact mobile header/menu area without changing the language model

## Translation Scope

The first multilingual launch should translate all current public-facing pages and shared UI:

- homepage
- booking page
- service pages
- shared header
- shared footer
- booking banner
- testimonials / stories copy
- before-and-after section copy
- popular services section copy
- local SEO / service content where relevant

This should feel like a real multilingual launch, not a partial demo.

## Content Model

### Dictionaries

Move UI and page copy into locale dictionaries rather than leaving user-facing strings hardcoded inside components.

The dictionaries should cover:

- navigation labels
- section headings
- CTA labels
- paragraphs
- service-page body copy
- metadata strings where feasible

### Stable content

Some content may remain stable across languages when appropriate:

- brand name `Belléco`
- selected treatment names if keeping English terminology is more recognizable
- English route slugs for the first release, if route simplicity is preferred over translated slugs

## SEO Design

### Locale-aware indexing

Each locale should have its own indexable route and metadata.

### Alternate language support

Generate language alternates so search engines understand the relationship between:

- `/en/...`
- `/zh/...`
- `/ms/...`

### Metadata

Metadata should be localized where practical:

- page title
- description
- social share text

## Implementation Shape

### App structure

Move the public route structure under `app/[lang]/...` so locale becomes part of the App Router path.

### Locale utilities

Create a locale layer that handles:

- supported locales
- default locale
- locale validation
- dictionary loading
- fallback behavior

### Redirect layer

Add a request-level locale redirect so users landing on `/` get sent to the detected locale route.

### Shared components

Update shared components such as the header, footer, and CTA sections to read translated labels from the selected locale dictionary.

## Accessibility

- the language switcher should use clear accessible labels
- the active locale should be obvious visually and semantically
- switching language should remain keyboard accessible
- locale labels should stay short and readable in the header

## Testing Expectations

Implementation should verify:

- `/en`, `/zh`, and `/ms` routes render
- unsupported locale routes return `404`
- the language switcher appears in the header near the theme toggle
- the active locale is highlighted
- switching locale updates content correctly
- redirect logic sends new visitors to the detected locale when supported
- fallback logic routes unsupported browser languages to `/en`

## Acceptance Checklist

- [ ] The site supports `English`, `Chinese`, and `Malay`
- [ ] Public pages use route-based locale paths: `/en`, `/zh`, `/ms`
- [ ] The language switcher appears in the top right of the header near the theme toggle
- [ ] The switcher uses a compact segmented control style
- [ ] The active locale is clearly highlighted
- [ ] Browser-language auto-detect redirects to a supported locale when possible
- [ ] English is the fallback locale
- [ ] Public-facing pages are translated in the first release
- [ ] Locale-aware metadata and alternate language signals are in place
- [ ] Unsupported locale routes return `404`

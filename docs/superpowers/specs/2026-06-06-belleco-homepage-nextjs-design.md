## 1. Goal
Rebuild the current Belleco Skin Beauté frontend as a Next.js + Tailwind app and deliver a fully responsive, pixel-perfect homepage designed for a high-end aesthetic clinic with a “dark luxe” theme toggle.

The homepage must feel premium, spacious, and conversion-driven with:
- Translucent sticky navigation bar
- Asymmetric 2-column hero split
- Filtered 3-column treatments grid (Acne / Anti-Aging / Radiance)
- Minimalist testimonial block
- Prominent booking banner at the bottom

## 2. Core Constraints (from request)
- Layout: semantic HTML blocks, built section-by-section
- Spacing: generous vertical padding (`py-24 md:py-32`) and large negative space
- Typography: `font-serif` for major section titles, sans-serif for descriptions/body
- Colors (light theme): `bg-stone-50` base, `bg-white` cards/containers, `text-neutral-800` for primary copy, brass/gold CTA accent (e.g. `#C5A880` or `amber-700`)
- Dark luxe: provide a theme toggle (default can be dark or system), keeping readability and “clinical-clean” clarity

## 3. Information Architecture
Single homepage route:
- `/` homepage only for this milestone

Homepage sections (top → bottom):
1) `header` Sticky translucent nav
2) `main`
   - `section` Hero (asymmetric 2-column split)
   - `section` Treatments (filter + 3-column grid)
   - `section` Testimonials (minimal)
   - `section` Booking banner (prominent CTA)
3) `footer` Optional minimal footer line (brand + disclaimer)

## 4. Visual Design System

### 4.1 Theme Model
Use a `data-theme` attribute on `html`:
- `data-theme="light"` or `data-theme="dark"`
- Persist user selection to `localStorage`
- Provide a navbar toggle button (icon + label)

Tailwind consumes CSS variables for colors so both themes share the same utility classes.

### 4.2 Tokens (CSS variables)
Define tokens in `globals.css`:
- `--bg`, `--surface`, `--text`, `--muted`, `--border`
- `--cta`, `--ctaText`, `--ctaRing`

Recommended mapping:
- Light:
  - `--bg`: stone-50
  - `--surface`: white
  - `--text`: neutral-800
  - `--cta`: `#C5A880` (brass)
- Dark:
  - `--bg`: near-black charcoal (neutral-950-ish)
  - `--surface`: neutral-900-ish
  - `--text`: warm off-white (neutral-50-ish)
  - `--cta`: brass remains, tuned for contrast

### 4.3 Typography
- Section titles: `font-serif`, high letter spacing restraint, large line-height control
- Body: default sans-serif, `text-sm` / `text-base` / `text-lg` maximum (avoid too many sizes)
- Overline labels: tiny uppercase tracking for premium editorial rhythm

### 4.4 Motion
Minimal, high-end motion only:
- Navbar blur is static
- Hover: subtle lift + border/shine change on cards
- No excessive animations; respect `prefers-reduced-motion`

## 5. Component Plan (Homepage)

### 5.1 Navbar (sticky, translucent)
Structure:
- Left: brand wordmark
- Center (desktop): Home / Treatments / Stories / Book anchors (scroll links)
- Right: theme toggle + “Book Now” brass CTA
- Mobile: simplified nav (brand + toggle + CTA), optional drawer later (not required)

Design details:
- `backdrop-blur-xl` + translucent background
- Thin border line using `--border`

### 5.2 Hero (asymmetric 2-column split)
Layout:
- Desktop: 2 columns with asymmetric ratio (e.g. 7/5)
- Left column: editorial headline, short supporting copy, CTAs
- Right column: premium “visual panel”
  - Option A: abstract gradient panel + subtle grain
  - Option B: image slot (future real clinic imagery)

Content:
- Headline includes “Diagnosis-first” tone
- Primary CTA: “Book a consultation”
- Secondary CTA: “View treatments”

Responsive:
- Mobile: stack, visual panel below headline, preserve whitespace with `py-24`

### 5.3 Treatments (filter + 3-column grid)
Filter:
- 3 pills: Acne / Anti-Aging / Radiance
- Mobile: horizontally scrollable row
- State: simple client component state; no URL sync required

Grid:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

Card structure:
- Overline (category)
- Title (serif)
- Short benefit bullets
- Small “Book” inline CTA

### 5.4 Testimonials (minimalist)
- 1–3 testimonials in a restrained layout
- No heavy carousel required for milestone; can use 3-column on desktop, stacked on mobile
- Emphasize whitespace, avoid “busy” UI

### 5.5 Booking Banner (prominent)
- Full-width section near bottom with strong contrast
  - In light: white surface on stone bg
  - In dark: darker surface with brass CTA
- Copy: “Ready for your personalised plan?”
- CTA: “Book now”

## 6. Next.js Technical Architecture

### 6.1 Framework
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

### 6.2 Suggested File Structure
- `app/layout.tsx` global layout, metadata
- `app/page.tsx` homepage assembly
- `app/globals.css` tokens + tailwind base
- `components/`:
  - `Navbar.tsx`
  - `Hero.tsx`
  - `Treatments.tsx`
  - `TestimonialStrip.tsx`
  - `BookingBanner.tsx`
  - `ThemeToggle.tsx`
- `lib/`:
  - `cn.ts` (clsx + tailwind-merge)
  - `theme.ts` (theme read/write helpers)
- `data/`:
  - `treatments.ts`
  - `testimonials.ts`

### 6.3 Theme Toggle Implementation
- Client component for toggle + persistence
- On load: read `localStorage` first; fallback to system preference
- Apply `document.documentElement.dataset.theme = "dark" | "light"`

## 7. Accessibility
- Semantic landmarks: `header`, `main`, `section`, `footer`
- Visible focus states for keyboard nav
- Sufficient contrast for brass CTAs in both themes
- Buttons and links have descriptive labels

## 8. Acceptance Criteria
- Homepage matches requested block structure and is responsive across mobile/tablet/desktop
- Theme toggle works, persists between refreshes
- Treatments filter works (Acne / Anti-Aging / Radiance)
- Spacing meets “premium breathing room” requirement (`py-24 md:py-32` used for major sections)
- Typography: serif headings, clean body copy
- No layout shift / broken grid on small screens


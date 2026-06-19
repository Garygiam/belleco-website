# Belléco — Local SEO Flywheel (Approach A) Design

## Goal

Make `belleco.co` rank strongly for **local Kuala Lumpur / Kuchai Lama** searches (Google primary, but also Bing), especially for:

- Acne treatment / acne facial
- HIFU / lifting (Doublo HIFU)
- RF microneedling
- Facial near me / facial Kuchai Lama

This design focuses on **local SEO fundamentals + technical SEO + service landing pages** (the highest ROI path).

## Non-Goals

- Guarantee “first page for all search engines” for all keywords (not realistic).
- National Malaysia-wide ranking for broad keywords (possible later, slower + more content needed).
- Running paid ads (Google Ads / Meta) in this phase.

## Current Context (from this repo)

- Next.js App Router project (Next 16.x).
- Brand info currently lives in: [brand.ts](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/config/brand.ts)
  - NAP fields: name, phone, email, address, hours, social links.
- Global metadata currently only includes `title` + `description` in: [layout.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/layout.tsx)
- No `robots.txt` / `sitemap.xml` file conventions implemented yet in `src/app/`.

## Strategy Overview (Local SEO Flywheel)

### Pillar 1: Technical SEO (site must be crawlable + indexable)

- Provide search engines with:
  - `robots.txt`
  - `sitemap.xml`
  - canonical URLs
  - correct metadata (titles/descriptions per page)
  - structured data (`LocalBusiness`, `Service`, optional `FAQPage`)

### Pillar 2: Local relevance (service pages that match search intent)

Build dedicated pages (not only homepage sections) that target local, high-intent queries:

- `/services/acne-treatment-kuala-lumpur`
- `/services/hifu-kuala-lumpur`
- `/services/rf-microneedling-kuala-lumpur`
- `/services/facial-kuchai-lama`

Each page is designed to:
- match the query intent
- contain location signals (Kuala Lumpur, Kuchai Lama)
- link to booking + WhatsApp + Maps
- include FAQs for long-tail queries

### Pillar 3: Local authority signals (Google Business Profile)

Since you already have a verified Google Business Profile:
- ensure NAP matches the website exactly
- keep reviews coming + reply to reviews
- use Google Posts weekly (service highlights, before/after, promos, educational)
- add services/categories that align with the service pages

## Hosting + Domain Requirements (belleco.co)

### Recommendation

Host on **Vercel** for the best Next.js performance and Core Web Vitals.

### Required (regardless of host)

- HTTPS enabled
- Single canonical host:
  - choose either `https://belleco.co` or `https://www.belleco.co` as canonical
  - 301 redirect the other to canonical
- No duplicate content under multiple hostnames

## Technical SEO Design (Next.js)

### 1) Robots and sitemap

Implement Next.js file conventions:
- `src/app/robots.ts` (generates `robots.txt`)
- `src/app/sitemap.ts` (generates `sitemap.xml`)

**Robots policy (initial)**
- allow all indexing
- include sitemap URL
- block only irrelevant technical paths if needed (usually not required for Next)

**Sitemap contents**
- homepage `/`
- booking page `/book`
- each service page under `/services/...`

### 2) Metadata per page

Use Next.js metadata so every route has:
- unique `title`
- unique `description`
- canonical URL
- OpenGraph + Twitter card for sharing

**Title style guideline**

Use keyword + location + brand, without stuffing:

- `Acne Treatment in Kuala Lumpur (Kuchai Lama) | Belléco`
- `Doublo HIFU in Kuala Lumpur | Belléco`
- `RF Microneedling in Kuala Lumpur | Belléco`
- `Facial in Kuchai Lama, Kuala Lumpur | Belléco`

### 3) Structured data (JSON-LD)

Add JSON-LD in a single reusable helper (or per page) using:

- `LocalBusiness`:
  - name, address, telephone, openingHours, url
  - `sameAs` social links (Instagram/Facebook/YouTube)
  - `geo` optional (recommended if you provide coordinates)
- `Service` on each service page:
  - service name + area served
  - provider (Belléco)
- Optional `FAQPage` on service pages (recommended)

**NAP consistency rule**

The following must match Google Business Profile exactly:
- Business name
- Address lines
- Phone number
- Website URL
- Hours (where possible)

Source of truth for these values should be `src/config/brand.ts`.

### 4) Performance constraints

SEO today is strongly tied to UX (Core Web Vitals):
- keep hero media lightweight
- avoid layout shift
- ensure text is indexable (not only inside iframes)
- keep embedded video section below the fold (already is)

## Content + IA Design (Service Pages)

### Page template structure (each service page)

1. Above-the-fold: service name + location + short promise + CTA (Book / WhatsApp)
2. “Who it’s for” + “What it helps” bullets
3. “How it works” section
4. Outcomes / expected timeline
5. Pricing note (optional, even “starting from” helps)
6. FAQs (5–8 questions) with `FAQPage` schema
7. Directions + contact mini-panel

### Internal links

Homepage should link to each service page with descriptive anchor text (not “click here”).

### Copy constraints

- No keyword stuffing.
- Use location naturally: “Kuchai Lama”, “Kuala Lumpur”.
- Keep the tone aligned with the existing premium/clinical positioning.

## Off-Site Setup (Non-code but required)

### Google Search Console

- Verify `belleco.co`
- Submit sitemap
- Inspect indexing for key pages after launch

### Bing Webmaster Tools

- Verify `belleco.co`
- Submit sitemap

### Citations (local directories)

Ensure NAP matches across major directories (Malaysia relevant). Focus on quality, not volume.

## Success Criteria

### Technical (must-have)

- `robots.txt` accessible and correct
- `sitemap.xml` accessible and correct
- service pages are indexable and have unique titles/descriptions
- JSON-LD validates (LocalBusiness + Service, optional FAQPage)

### Outcome (realistic)

- brand searches show Belléco first consistently
- within weeks: pages indexed and appearing for long-tail local queries
- within months: improved rankings for the 4 service themes in the target area

## Acceptance Checklist (for implementation phase)

- [ ] `belleco.co` is canonical over HTTPS with no duplicates
- [ ] Search Console verified + sitemap submitted
- [ ] `robots.txt` + `sitemap.xml` implemented
- [ ] 4 service pages implemented + linked from homepage/header/footer
- [ ] JSON-LD implemented and validated
- [ ] GBP website URL points to canonical domain + NAP matches site

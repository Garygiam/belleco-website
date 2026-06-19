# Belleco Homepage — Client Videos Section (Cinematic Preview) Design

## Goal

Add a new homepage section to showcase curated client videos from Belleco’s YouTube channel using the “Cinematic preview background” approach:

- A featured **cinematic panel** with a **muted looping preview** in the background (atmospheric).
- A **Watch full video** interaction that swaps the panel into a normal embedded YouTube player (with controls + sound).
- A row of **3 thumbnails**; clicking a thumbnail swaps the featured video (both preview + full player target).

## In Scope

- Homepage-only UI addition (no new routes).
- Curated set of 3 videos (hardcoded list for now).
- Works in light/dark themes, matching the existing “Cinematic Panels” styling utilities.

## Out of Scope (Now)

- Auto-fetching latest videos from YouTube API.
- Analytics events / tracking.
- Multiple rows, pagination, playlists, or search.

## Curated Video List (Initial)

From `https://www.youtube.com/@bellecobeaute/videos`:

- Doublo HIFU — `JS56HI5dQDQ`
- Belleco RF Micro-needle Treatment — `LLY1owXIRxg`
- Belleco Skin Beauty — `Cyt6YNkeOgk`

## UX / Interaction

### Featured Panel States

**State A — Preview (default)**

- The featured panel shows a **muted, autoplay, looping** embedded YouTube preview.
- The preview is visually treated as “background” with an overlay (to keep text legible and premium).
- No controls shown (preview is not meant to be “watched”, only to set mood).

**State B — Full Player (on demand)**

- Clicking “Watch full video” swaps the panel to a normal YouTube embedded player with controls.
- Full player allows sound (user-initiated).

### Thumbnail Row (3 items)

- Displays 3 thumbnails in a horizontal row (scrollable on mobile).
- Clicking a thumbnail:
  - Sets `selectedVideoId` to that video.
  - Resets featured panel back to **Preview** state (so audio never starts unexpectedly).
  - Updates the embedded video source for both preview and full player mode.

### Links

- Provide an optional secondary link “View all on YouTube” that opens:
  - `https://www.youtube.com/@bellecobeaute/videos`
  - `target="_blank" rel="noreferrer"`

## Visual / Layout

### Placement

Insert section between:

- Results (TestimonialsSection) and
- Booking (BookingBanner)

### Styling

- Reuse existing global utilities:
  - `cinematic-panel`
  - `cinematic-glow`
  - existing theme tokens (`--panel-bg`, `--panel-border`, etc.)
- Section background stays consistent with the homepage cinematic shell.

### Responsive Layout (concept)

- Desktop: 2-column layout (copy on left, featured panel on right), thumbnails below featured panel.
- Mobile: stacked layout, featured panel first then thumbnails row.

## Technical Design

### Components

- New component: `src/components/ClientVideosSection.tsx`
  - Client component (`"use client"`) due to UI state.
  - Props not required initially (video list can be in-file), but keep structure ready for later extraction.

### Data Model

```ts
type ClientVideo = {
  id: string;
  title: string;
  durationLabel?: string;
};
```

### State

- `selectedVideoId: string` (default to first video in list)
- `mode: "preview" | "player"` (default `"preview"`)

### Embedding Strategy

Use iframe embeds (YouTube) for both modes:

- Preview iframe parameters:
  - `autoplay=1`
  - `mute=1`
  - `controls=0`
  - `playsinline=1`
  - `loop=1` with `playlist=<videoId>` to force looping single video
  - `rel=0`
  - `modestbranding=1`

- Full player iframe parameters:
  - `autoplay=1` (optional; user already clicked, so OK)
  - `mute=0`
  - `controls=1`
  - `playsinline=1`
  - `rel=0`
  - `modestbranding=1`

Prefer the privacy-enhanced domain:

- `https://www.youtube-nocookie.com/embed/<videoId>`

### Thumbnail Source

Use YouTube thumbnail URLs:

- `https://i.ytimg.com/vi/<videoId>/hqdefault.jpg`

Implementation should consider `next/image` remote allowlisting (update config if needed).

### Accessibility

- Provide clear headings and section landmarks.
- Buttons:
  - “Watch full video” is a `<button type="button">`.
  - Thumbnails are `<button>` elements with `aria-pressed` for selection, or `<button aria-label="Play <title>">`.
- Iframes:
  - `title="Client video preview: <title>"` and `title="Client video: <title>"`.

### Performance / Safety

- Preview iframe should be sized/aspect-locked (avoid layout shift).
- Preview must remain muted.
- When swapping video IDs, reset to preview mode to prevent surprise audio.

## Acceptance Criteria

- Homepage shows new “Client Videos” section with:
  - Featured cinematic panel (muted looping preview)
  - “Watch full video” swaps into normal embedded player
  - 3 thumbnails that swap the featured video
- Works on mobile and desktop without layout shift.
- Theme toggle does not break the video section.

## Test Plan

- Manual:
  - Load homepage and scroll to video section.
  - Click each thumbnail; featured preview changes and remains muted.
  - Click “Watch full video”; player loads with controls.
  - Toggle theme; section remains readable.
- Automated (minimal):
  - Component renders the correct number of thumbnails and correct default selected video ID.
  - Clicking thumbnail updates selected state and resets mode to preview.

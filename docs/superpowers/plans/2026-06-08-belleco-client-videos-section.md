# Belleco Homepage — Client Videos Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a “Client Videos” homepage section with a cinematic muted looping preview background, a “Watch full video” player mode, and 3 clickable thumbnails that swap the featured video.

**Architecture:** Implement a new client component `ClientVideosSection` that owns UI state (`selectedVideoId`, `mode`). Embed YouTube using `youtube-nocookie.com` iframes for both preview and full player modes. Add `next/image` allowlist for YouTube thumbnails (`i.ytimg.com`) and insert the section into the homepage between Results and Booking.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, Vitest + Testing Library

---

## File Map

**Create**
- `src/components/ClientVideosSection.tsx`
- `src/components/ClientVideosSection.test.tsx`

**Modify**
- `src/app/page.tsx`
- `next.config.ts`

---

### Task 1: Allowlist YouTube thumbnails for next/image

**Files:**
- Modify: [next.config.ts](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/next.config.ts)

- [ ] **Step 1: Update `images.remotePatterns` to include `i.ytimg.com`**

Add a new remote pattern entry (keep existing ones intact):

```ts
{
  protocol: "https",
  hostname: "i.ytimg.com",
  pathname: "/vi/**",
}
```

- [ ] **Step 2: Verify config loads**

Run:

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code 0

---

### Task 2: Add `ClientVideosSection` component (UI + state)

**Files:**
- Create: [ClientVideosSection.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/ClientVideosSection.tsx)

- [ ] **Step 1: Create `ClientVideosSection.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ClientVideo = {
  id: string;
  title: string;
  durationLabel?: string;
};

const videos: ClientVideo[] = [
  { id: "JS56HI5dQDQ", title: "Doublo HIFU", durationLabel: "0:59" },
  { id: "LLY1owXIRxg", title: "RF Micro-needle Treatment", durationLabel: "0:40" },
  { id: "Cyt6YNkeOgk", title: "Belleco Skin Beauty", durationLabel: "1:38" },
];

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function buildPreviewSrc(videoId: string) {
  const url = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  url.searchParams.set("autoplay", "1");
  url.searchParams.set("mute", "1");
  url.searchParams.set("controls", "0");
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("loop", "1");
  url.searchParams.set("playlist", videoId);
  url.searchParams.set("rel", "0");
  url.searchParams.set("modestbranding", "1");
  return url.toString();
}

function buildPlayerSrc(videoId: string) {
  const url = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  url.searchParams.set("autoplay", "1");
  url.searchParams.set("mute", "0");
  url.searchParams.set("controls", "1");
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("rel", "0");
  url.searchParams.set("modestbranding", "1");
  return url.toString();
}

function thumbnailSrc(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function ClientVideosSection() {
  const [selectedVideoId, setSelectedVideoId] = useState(videos[0]?.id ?? "");
  const [mode, setMode] = useState<"preview" | "player">("preview");

  const selected = useMemo(
    () => videos.find((v) => v.id === selectedVideoId) ?? videos[0],
    [selectedVideoId],
  );

  if (!selected) return null;

  return (
    <section id="client-videos" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Client Videos
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              See the texture, tone, and glow on real clients.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Tap a thumbnail to switch the featured preview, then watch the full
              video when you’re ready.
            </p>
            <a
              href="https://www.youtube.com/@bellecobeaute/videos"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-border underline-offset-4 transition hover:decoration-ink"
            >
              View all on YouTube
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="space-y-6">
            <div className="cinematic-glow relative">
              <div className="cinematic-panel relative overflow-hidden rounded-[2.5rem]">
                <div className="relative aspect-video w-full">
                  {mode === "preview" ? (
                    <>
                      <iframe
                        key={`preview-${selected.id}`}
                        src={buildPreviewSrc(selected.id)}
                        title={`Client video preview: ${selected.title}`}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,9,0.70),rgba(7,7,9,0.15)_45%,rgba(7,7,9,0.70))]" />
                    </>
                  ) : (
                    <iframe
                      key={`player-${selected.id}`}
                      src={buildPlayerSrc(selected.id)}
                      title={`Client video: ${selected.title}`}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  )}
                </div>

                <div className="relative flex flex-col gap-3 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">{selected.title}</p>
                    {selected.durationLabel ? (
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {selected.durationLabel}
                      </p>
                    ) : null}
                  </div>

                  {mode === "preview" ? (
                    <button
                      type="button"
                      onClick={() => setMode("player")}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink shadow-lift transition hover:bg-accent-hover"
                    >
                      Watch full video
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMode("preview")}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface/70 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-sm backdrop-blur transition hover:bg-page"
                    >
                      Back to preview
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex max-w-full gap-3 overflow-x-auto">
              {videos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  aria-pressed={video.id === selected.id}
                  onClick={() => {
                    setSelectedVideoId(video.id);
                    setMode("preview");
                  }}
                  className={cx(
                    "group cinematic-panel relative shrink-0 overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:shadow-lift-strong",
                    video.id === selected.id ? "ring-2 ring-ring" : false,
                  )}
                >
                  <div className="relative h-[92px] w-[164px]">
                    <Image
                      src={thumbnailSrc(video.id)}
                      alt={video.title}
                      fill
                      sizes="164px"
                      className="object-cover"
                      unoptimized
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,7,9,0.45))]" />
                    <div className="pointer-events-none absolute bottom-3 left-3 right-3">
                      <p className="line-clamp-1 text-left text-[11px] font-semibold text-ink">
                        {video.title}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Manual sanity check in browser**

Open:

- `http://localhost:3001/`

Verify:

- Featured panel loads preview muted.
- “Watch full video” switches to player mode.
- Clicking a thumbnail changes the featured video and returns to preview mode.

---

### Task 3: Insert section into homepage

**Files:**
- Modify: [page.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/app/page.tsx)

- [ ] **Step 1: Import and render `ClientVideosSection` between Results and Booking**

Target structure:

```tsx
<HomeHero />
<TreatmentsSection />
<TestimonialsSection />
<ClientVideosSection />
<BookingBanner />
```

- [ ] **Step 2: Verify anchor navigation**

Verify:

- `#results` still scrolls to the testimonials section.
- `#client-videos` scrolls to the new section.

---

### Task 4: Add unit tests for swapping behavior

**Files:**
- Create: [ClientVideosSection.test.tsx](file:///Users/garygiam/Desktop/Belleco%20/Build_Belleco_Skin_Beaute_Web_App/src/components/ClientVideosSection.test.tsx)

- [ ] **Step 1: Create `ClientVideosSection.test.tsx`**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClientVideosSection } from "@/components/ClientVideosSection";

describe("ClientVideosSection", () => {
  it("renders 3 thumbnails and defaults to preview mode", () => {
    render(<ClientVideosSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "See the texture, tone, and glow on real clients.",
    );

    const pressed = screen.getAllByRole("button", { pressed: true });
    expect(pressed).toHaveLength(1);

    const thumbnails = screen.getAllByRole("button").filter((b) => {
      const label = b.textContent ?? "";
      return label.includes("Doublo HIFU") || label.includes("RF Micro-needle") || label.includes("Belleco Skin Beauty");
    });

    expect(thumbnails).toHaveLength(3);

    expect(
      screen.getByTitle(/Client video preview:/i),
    ).toBeInTheDocument();
  });

  it("clicking a thumbnail swaps selected video and resets to preview mode", async () => {
    const user = userEvent.setup();
    render(<ClientVideosSection />);

    await user.click(screen.getByRole("button", { name: /Watch full video/i }));
    expect(screen.getByTitle(/Client video:/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Belleco Skin Beauty/i }));

    expect(screen.getByTitle(/Client video preview:/i)).toBeInTheDocument();
    expect(screen.getByText("Belleco Skin Beauty")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests**

Run:

```bash
npx -y pnpm@9.15.6 test
```

Expected: PASS

---

### Task 5: Final verification

- [ ] **Step 1: Run lint**

```bash
npx -y pnpm@9.15.6 lint
```

Expected: exit code 0

- [ ] **Step 2: Manual QA**

Open:

- `http://localhost:3001/`

Checklist:

- Preview is muted and loops.
- “Watch full video” enables the full player with controls.
- Clicking a thumbnail changes the featured video and returns to preview mode.
- Theme toggle keeps the section readable (text contrast + overlays).

---

## Execution Choice

Plan complete and saved to `docs/superpowers/plans/2026-06-08-belleco-client-videos-section.md`.

Two execution options:
1) **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks.
2) **Inline Execution** — execute tasks in this session using superpowers:executing-plans.

Which approach do you want?

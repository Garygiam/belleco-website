"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

type ClientVideo = {
  id: string;
  title: string;
};

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function ClientVideosSection(props: Props) {
  const copy = uiCopy[props.locale].clientVideos;
  const videos = copy.videos as readonly ClientVideo[];
  const [selectedVideoId, setSelectedVideoId] = useState(videos[0]?.id ?? "");
  const [mode, setMode] = useState<"preview" | "player">("preview");

  const selected = useMemo(
    () => videos.find((v) => v.id === selectedVideoId) ?? videos[0],
    [selectedVideoId, videos],
  );

  const previewSrc = useMemo(() => {
    if (!selected) return "";
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "0",
      playsinline: "1",
      loop: "1",
      playlist: selected.id,
      rel: "0",
      modestbranding: "1",
    });

    return `https://www.youtube-nocookie.com/embed/${selected.id}?${params.toString()}`;
  }, [selected]);

  const playerSrc = useMemo(() => {
    if (!selected) return "";
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "0",
      controls: "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
    });

    return `https://www.youtube-nocookie.com/embed/${selected.id}?${params.toString()}`;
  }, [selected]);

  if (!selected) {
    return null;
  }

  return (
    <section id="client-videos" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">{copy.description}</p>
            <a
              href="https://www.youtube.com/@bellecobeaute/videos"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex h-11 items-center rounded-full border border-border bg-surface/70 px-6 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:bg-page"
            >
              {copy.viewAll}
            </a>
          </div>

          <div className="space-y-6">
            <div className="cinematic-glow">
              <div className="cinematic-panel relative overflow-hidden rounded-[2.5rem]">
                <div className="relative aspect-video w-full">
                  {mode === "preview" ? (
                    <>
                      <iframe
                        key={`preview-${selected.id}`}
                        title={`${copy.previewTitlePrefix} ${selected.title}`}
                        src={previewSrc}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        className="absolute inset-0 h-full w-full"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-page/85 via-page/20 to-transparent"
                        aria-hidden
                      />
                      <div className="absolute bottom-0 left-0 right-0 space-y-3 px-7 pb-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                          {copy.featured}
                        </p>
                        <p className="text-lg font-semibold tracking-tight text-ink">
                          {selected.title}
                        </p>
                        <button
                          type="button"
                          onClick={() => setMode("player")}
                          className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink shadow-lift transition hover:bg-accent-hover"
                        >
                          {copy.watchFull}
                        </button>
                      </div>
                    </>
                  ) : (
                    <iframe
                      key={`player-${selected.id}`}
                      title={`${copy.playerTitlePrefix} ${selected.title}`}
                      src={playerSrc}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      className="absolute inset-0 h-full w-full"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {videos.map((video) => {
                const selectedThumb = video.id === selected.id;
                return (
                  <button
                    key={video.id}
                    type="button"
                    aria-label={`${copy.selectVideoPrefix} ${video.title}`}
                    aria-pressed={selectedThumb}
                    onClick={() => {
                      setSelectedVideoId(video.id);
                      setMode("preview");
                    }}
                    className={cx(
                      "cinematic-panel group relative shrink-0 overflow-hidden rounded-2xl border border-border bg-surface/70 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-ring",
                      selectedThumb ? "ring-2 ring-accent" : "hover:-translate-y-0.5",
                    )}
                  >
                    <div className="relative h-20 w-32">
                      <Image
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                        unoptimized
                      />
                      <div
                        className={cx(
                          "absolute inset-0 bg-gradient-to-t from-page/70 via-page/10 to-transparent transition",
                          selectedThumb ? "opacity-100" : "opacity-70 group-hover:opacity-95",
                        )}
                        aria-hidden
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-left text-xs font-semibold leading-5 text-ink">
                        {video.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

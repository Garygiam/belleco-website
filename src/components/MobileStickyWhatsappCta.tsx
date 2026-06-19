"use client";

import { useEffect, useState } from "react";
import { brand } from "@/config/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

function WhatsappIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11.2A8 8 0 0 1 8.4 18.3L4 20l1.8-4.2A8 8 0 1 1 20 11.2Z" />
      <path d="M9.6 8.8c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.1.1-.2.3 0 .6.3.5.7 1 1.2 1.4.5.4 1 .8 1.6 1 .3.1.4 0 .6-.1l.7-.8c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5v.5c0 .3-.2.6-.5.8-.5.3-1.2.5-1.8.3-1.1-.3-2.1-.8-3-1.5a10 10 0 0 1-2.3-2.5c-.6-.9-1.1-1.9-1.3-2.9-.1-.5 0-1.1.3-1.5Z" />
    </svg>
  );
}

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function MobileStickyWhatsappCta({ locale }: Props) {
  const copy = uiCopy[locale].stickyWhatsapp;
  const [canObserveHero, setCanObserveHero] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("home-hero");

    if (!hero) {
      return;
    }

    setCanObserveHero(true);

    const observer = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry?.isIntersecting ?? false);
    });

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!canObserveHero || isHeroVisible) {
    return null;
  }

  const whatsappHref = `https://wa.me/${brand.contact.phoneE164.replace("+", "")}`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.ariaLabel}
        className="pointer-events-auto mx-auto flex h-14 w-full max-w-sm items-center justify-center gap-3 rounded-full border border-border bg-surface/90 px-6 text-sm font-semibold text-ink shadow-lg backdrop-blur"
      >
        <WhatsappIcon />
        <span>{copy.text}</span>
      </a>
    </div>
  );
}

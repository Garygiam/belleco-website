import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MobileStickyWhatsappCta } from "@/components/MobileStickyWhatsappCta";
import { dictionaries } from "@/lib/i18n";

type ObserverRecord = {
  callback: IntersectionObserverCallback;
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
};

const observers: ObserverRecord[] = [];

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "0px";
  thresholds = [0];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push({
      callback,
      observe: this.observe,
      disconnect: this.disconnect,
    });
  }
}

function emitIntersection(isIntersecting: boolean) {
  const observer = observers.at(-1);
  if (!observer) {
    throw new Error("No observer registered");
  }

  observer.callback(
    [
      {
        isIntersecting,
        target: document.getElementById("home-hero") as Element,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: isIntersecting ? 1 : 0,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: 0,
      },
    ],
    {} as IntersectionObserver,
  );
}

describe("MobileStickyWhatsappCta", () => {
  beforeEach(() => {
    observers.length = 0;
    document.body.innerHTML = '<section id="home-hero"></section>';
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("stays hidden while the hero is visible and appears after the hero leaves view", async () => {
    render(<MobileStickyWhatsappCta locale="en" dictionary={dictionaries.en} />);

    expect(screen.queryByRole("link", { name: /Chat on WhatsApp/i })).not.toBeInTheDocument();

    emitIntersection(true);
    expect(screen.queryByRole("link", { name: /Chat on WhatsApp/i })).not.toBeInTheDocument();

    emitIntersection(false);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Chat on WhatsApp/i })).toHaveAttribute(
        "href",
        "https://wa.me/60173966510",
      );
    });
  });

  it("does not render when the hero marker is missing", () => {
    document.body.innerHTML = "";

    render(<MobileStickyWhatsappCta locale="en" dictionary={dictionaries.en} />);

    expect(screen.queryByRole("link", { name: /Chat on WhatsApp/i })).not.toBeInTheDocument();
  });

  it("renders translated Malay label after the hero leaves view", async () => {
    render(<MobileStickyWhatsappCta locale="ms" dictionary={dictionaries.ms} />);

    emitIntersection(false);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Chat di WhatsApp/i })).toBeInTheDocument();
    });
  });
});

import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

const headersMock = vi.fn();
const nextScriptMock = vi.fn();
const metaPixelPageViewMock = vi.fn();

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist-sans" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
  Cormorant_Garamond: () => ({ variable: "cormorant" }),
}));

vi.mock("next/headers", () => ({
  headers: headersMock,
}));

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => ({
    type: "google-analytics",
    props: { gaId },
  }),
}));

vi.mock("next/script", () => ({
  default: nextScriptMock.mockImplementation((props: Record<string, unknown>) => ({
    type: "next-script",
    props,
  })),
}));

vi.mock("@/components/GoogleAnalyticsPageView", () => ({
  GoogleAnalyticsPageView: () => ({
    type: "google-analytics-page-view",
    props: {},
  }),
}));

vi.mock("@/components/MetaPixelPageView", () => ({
  MetaPixelPageView: metaPixelPageViewMock.mockImplementation(() => ({
    type: "meta-pixel-page-view",
    props: {},
  })),
}));

describe("root layout metadata", () => {
  it("configures the Belléco favicon and apple icon", async () => {
    const { metadata } = await import("@/app/layout");

    expect(metadata.icons).toEqual({
      icon: "/brand/favicon.png",
      shortcut: "/brand/favicon.png",
      apple: "/brand/apple-icon.png",
    });

    expect(existsSync(path.join(process.cwd(), "public/brand/favicon.png"))).toBe(true);
    expect(existsSync(path.join(process.cwd(), "public/brand/apple-icon.png"))).toBe(true);
  });

  it("sets the html lang attribute from the locale request header", async () => {
    headersMock.mockResolvedValue(
      new Headers([["x-belleco-locale", "zh"]]),
    );

    const { default: RootLayout } = await import("@/app/layout");
    const element = await RootLayout({
      children: "child",
    });

    expect(element.props.lang).toBe("zh");
  });

  it("loads Google Analytics globally from the root layout", async () => {
    headersMock.mockResolvedValue(
      new Headers([["x-belleco-locale", "en"]]),
    );

    const { default: RootLayout } = await import("@/app/layout");
    const element = await RootLayout({
      children: "child",
    });

    const bodyChildren = Array.isArray(element.props.children.props.children)
      ? element.props.children.props.children
      : [element.props.children.props.children];

    expect(
      bodyChildren.some(
        (child: unknown) =>
          typeof child === "object" &&
          child !== null &&
          "props" in child &&
          (child as { props?: { gaId?: string } }).props?.gaId === "G-GNLBE6P3P5",
      ),
    ).toBe(true);
  });

  it("loads Meta Pixel globally from the root layout", async () => {
    headersMock.mockResolvedValue(
      new Headers([["x-belleco-locale", "en"]]),
    );

    const { default: RootLayout } = await import("@/app/layout");
    const element = await RootLayout({
      children: "child",
    });

    const bodyChildren = Array.isArray(element.props.children.props.children)
      ? element.props.children.props.children
      : [element.props.children.props.children];

    const metaPixelScript = bodyChildren.find(
      (child: unknown) =>
        typeof child === "object" &&
        child !== null &&
        "type" in child &&
        ((child as { type?: unknown }).type === nextScriptMock ||
          (child as { type?: string }).type === "next-script"),
    ) as { props: { id?: string; children?: string } } | undefined;

    expect(metaPixelScript?.props.id).toBe("meta-pixel-base");
    expect(metaPixelScript?.props.children).toContain("892839550540707");
    expect(metaPixelScript?.props.children).toContain('fbq("track", "PageView")');

    expect(
      bodyChildren.some(
        (child: unknown) =>
          typeof child === "object" &&
          child !== null &&
          "type" in child &&
          ((child as { type?: unknown }).type === metaPixelPageViewMock ||
            (child as { type?: string }).type === "meta-pixel-page-view"),
      ),
    ).toBe(true);

    const noScriptElement = bodyChildren.find(
      (child: unknown) =>
        typeof child === "object" &&
        child !== null &&
        "type" in child &&
        (child as { type?: string }).type === "noscript",
    ) as { props: { children?: { props?: { src?: string } } } } | undefined;

    expect(noScriptElement?.props.children.props?.src).toBe(
      "https://www.facebook.com/tr?id=892839550540707&ev=PageView&noscript=1",
    );
  });
});

import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

const headersMock = vi.fn();

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

vi.mock("@/components/GoogleAnalyticsPageView", () => ({
  GoogleAnalyticsPageView: () => ({
    type: "google-analytics-page-view",
    props: {},
  }),
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
});

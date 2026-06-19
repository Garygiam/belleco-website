/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";
import { dictionaries } from "@/lib/i18n";

vi.mock("next/navigation", () => ({
  usePathname: () => "/zh/book",
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    fill,
    priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => (
    (void priority,
    (
      <img
        alt={alt}
        src={typeof src === "string" ? src : ""}
        data-fill={fill ? "true" : "false"}
        {...props}
      />
    ))
  ),
}));

describe("SiteHeader", () => {
  it("renders the language switcher near the theme toggle", () => {
    render(<SiteHeader locale="zh" dictionary={dictionaries.zh} />);

    expect(
      screen.getByRole("navigation", {
        name: dictionaries.zh.header.languageSwitcher.ariaLabel,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "BM" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("renders the animated booking CTA with the localized route", () => {
    render(<SiteHeader locale="zh" dictionary={dictionaries.zh} />);

    const cta = screen.getByRole("link", {
      name: dictionaries.zh.header.cta,
    });

    expect(cta).toHaveAttribute("href", "/zh/book");
    expect(cta).toHaveClass("book-button-pulse");
  });

  it("uses homepage-qualified links for treatments and results", () => {
    render(<SiteHeader locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByRole("link", { name: dictionaries.en.header.nav.treatments })).toHaveAttribute(
      "href",
      "/en#treatments",
    );
    expect(screen.getByRole("link", { name: dictionaries.en.header.nav.results })).toHaveAttribute(
      "href",
      "/en#before-after-results",
    );
    expect(screen.getByRole("link", { name: dictionaries.en.header.nav.book })).toHaveAttribute(
      "href",
      "/en/book",
    );
  });
});

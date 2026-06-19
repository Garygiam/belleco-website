import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { fixtureDictionary } from "@/test/fixtures/dictionaries";

describe("LanguageSwitcher", () => {
  it("highlights the active locale and renders the three locale labels", () => {
    render(
      <LanguageSwitcher
        currentLocale="zh"
        currentPath="/zh/book"
        labels={fixtureDictionary.header.languageSwitcher}
      />,
    );

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en/book");
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "BM" })).toHaveAttribute("href", "/ms/book");
  });
});

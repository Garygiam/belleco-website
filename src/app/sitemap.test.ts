import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("lists only final locale-aware URLs instead of redirecting fallback routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).not.toContain("https://belleco.co/");
    expect(urls).not.toContain("https://belleco.co/book");
    expect(urls).not.toContain("https://belleco.co/services/acne-treatment-kuala-lumpur");

    expect(urls).toContain("https://belleco.co/en");
    expect(urls).toContain("https://belleco.co/zh/book");
    expect(urls).toContain("https://belleco.co/ms/services/hifu-kuala-lumpur");
  });

  it("includes localized alternate URLs for each canonical route", () => {
    const entry = sitemap().find((item) => item.url === "https://belleco.co/en/book");

    expect(entry?.alternates?.languages).toMatchObject({
      en: "https://belleco.co/en/book",
      zh: "https://belleco.co/zh/book",
      ms: "https://belleco.co/ms/book",
      "x-default": "https://belleco.co/en/book",
    });
  });
});

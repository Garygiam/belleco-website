import { describe, expect, it } from "vitest";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/urls";

describe("getSiteUrl", () => {
  it("returns the canonical site url", () => {
    expect(getSiteUrl()).toBe("https://belleco.co");
  });
});

describe("absoluteUrl", () => {
  it("converts a path into an absolute url", () => {
    expect(absoluteUrl("/book")).toBe("https://belleco.co/book");
    expect(absoluteUrl("book")).toBe("https://belleco.co/book");
  });

  it("returns absolute urls unchanged", () => {
    expect(absoluteUrl("https://example.com/a")).toBe("https://example.com/a");
  });
});

import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";

describe("Localized home page metadata", () => {
  it("builds localized canonical and hreflang metadata for the home route", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        lang: "ms",
      }),
    });

    expect(metadata.title).toBe("Belléco Skin Beauté | Pusat Transformasi Kulit di Kuala Lumpur");
    expect(metadata.description).toBe(
      "Diagnosis kulit dan rawatan estetik premium di Kuchai Lama, Kuala Lumpur untuk jerawat, anti-penuaan, dan kulit lebih berseri.",
    );
    expect(metadata.alternates?.canonical).toBe("https://belleco.co/ms");
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://belleco.co/en",
      zh: "https://belleco.co/zh",
      ms: "https://belleco.co/ms",
      "x-default": "https://belleco.co/en",
    });
  });
});

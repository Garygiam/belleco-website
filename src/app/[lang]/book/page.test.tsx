import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";

describe("Localized booking page metadata", () => {
  it("builds localized canonical and hreflang metadata for the booking route", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        lang: "zh",
      }),
    });

    expect(metadata.title).toBe("预约肌肤咨询 | Belléco Skin Beauté");
    expect(metadata.description).toBe(
      "预约 Belléco Skin Beauté 肌肤咨询，选择适合你的回复方式，并安排吉隆坡 Kuchai Lama 的面诊时间。",
    );
    expect(metadata.alternates?.canonical).toBe("https://belleco.co/zh/book");
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://belleco.co/en/book",
      zh: "https://belleco.co/zh/book",
      ms: "https://belleco.co/ms/book",
      "x-default": "https://belleco.co/en/book",
    });
  });
});

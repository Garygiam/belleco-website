import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page, { generateMetadata, generateStaticParams } from "./page";

describe("Localized service page", () => {
  it("renders translated service content with a locale-aware booking link", async () => {
    const element = await Page({
      params: Promise.resolve({
        lang: "zh",
        slug: "acne-treatment-kuala-lumpur",
      }),
    });

    render(element);

    expect(screen.getByRole("heading", { name: "痘痘护理" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "预约咨询" })).toHaveAttribute(
      "href",
      "/zh/book",
    );
  });

  it("builds locale-specific metadata alternates for the service route", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        lang: "ms",
        slug: "hifu-kuala-lumpur",
      }),
    });

    expect(metadata.title).toBe("Rawatan HIFU di Kuala Lumpur");
    expect(metadata.alternates?.canonical).toBe(
      "https://belleco.co/ms/services/hifu-kuala-lumpur",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://belleco.co/en/services/hifu-kuala-lumpur",
      zh: "https://belleco.co/zh/services/hifu-kuala-lumpur",
      ms: "https://belleco.co/ms/services/hifu-kuala-lumpur",
    });
  });

  it("prebuilds every locale and service slug combination", async () => {
    const params = await generateStaticParams();

    expect(params).toContainEqual({
      lang: "en",
      slug: "acne-treatment-kuala-lumpur",
    });
    expect(params).toContainEqual({
      lang: "zh",
      slug: "rf-microneedling-kuala-lumpur",
    });
    expect(params).toContainEqual({
      lang: "ms",
      slug: "facial-kuchai-lama",
    });
  });
});

/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { PopularServicesSection } from "@/components/PopularServicesSection";
import { dictionaries } from "@/lib/i18n";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    fill,
    unoptimized,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; unoptimized?: boolean }) => (
    <img
      alt={alt}
      src={typeof src === "string" ? src : ""}
      data-fill={fill ? "true" : "false"}
      data-unoptimized={unoptimized ? "true" : "false"}
      {...props}
    />
  ),
}));

describe("PopularServicesSection", () => {
  it("renders the compact intro copy, four service links, and bottom CTA layout", () => {
    render(<PopularServicesSection locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByText("Popular Services")).toBeInTheDocument();
    expect(
      screen.getByText("Explore the treatments clients ask for most."),
    ).toBeInTheDocument();

    const exploreCtas = screen.getAllByText("Explore");
    expect(exploreCtas).toHaveLength(4);
    for (const exploreCta of exploreCtas) {
      expect(exploreCta).toHaveClass("popular-services-cta");
    }

    const firstExploreCta = exploreCtas[0];
    const ctaRow = firstExploreCta.closest(".popular-services-cta-row");
    const contentPanel = firstExploreCta.closest(".popular-services-card-content");

    expect(ctaRow).toBeInTheDocument();
    expect(contentPanel).toHaveClass("items-start");
    expect(contentPanel).toHaveClass("gap-4");

    expect(
      screen.getByRole("link", { name: /Acne Treatment Texture Explore/i }),
    ).toHaveAttribute("href", "/en/services/acne-treatment-kuala-lumpur");
    expect(
      screen.getByAltText(
        "Luxury beauty portrait with clear skin texture for acne treatment",
      ),
    ).toHaveAttribute("src", "/Ance.jpg");

    expect(screen.getByRole("link", { name: /HIFU Lift Explore/i })).toHaveAttribute(
      "href",
      "/en/services/hifu-kuala-lumpur",
    );
    expect(
      screen.getByAltText("Luxury portrait emphasizing lifted jawline contour for HIFU"),
    ).toHaveAttribute("src", "/hifu.jpg");

    expect(
      screen.getByRole("link", { name: /RF Microneedling Refine Explore/i }),
    ).toHaveAttribute("href", "/en/services/rf-microneedling-kuala-lumpur");
    expect(
      screen.getByAltText(
        "Luxury skin-detail portrait showing refined pores for RF microneedling",
      ),
    ).toHaveAttribute("src", "/Microneedling.png");

    expect(screen.getByRole("link", { name: /Facial Glow Explore/i })).toHaveAttribute(
      "href",
      "/en/services/facial-kuchai-lama",
    );
    expect(
      screen.getByAltText("Luxury portrait with luminous hydrated glow for facial treatment"),
    ).toHaveAttribute("src", "/facial.png");
  });

  it("renders translated Chinese section copy and service labels", () => {
    render(<PopularServicesSection locale="zh" dictionary={dictionaries.zh} />);

    expect(screen.getByText("热门疗程")).toBeInTheDocument();
    expect(screen.getByText("看看顾客最常预约的疗程。")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /痘痘护理 肤质改善 查看/i })).toHaveAttribute(
      "href",
      "/zh/services/acne-treatment-kuala-lumpur",
    );
    expect(screen.getAllByText("查看")).toHaveLength(4);
  });

  it("uses a swipe-friendly rail on mobile while keeping desktop grid classes", () => {
    const { container } = render(
      <PopularServicesSection locale="en" dictionary={dictionaries.en} />,
    );

    const rail = container.querySelector(".popular-services-mobile-rail");
    const firstCard = screen.getByRole("link", {
      name: /Acne Treatment Texture Explore/i,
    });

    expect(rail).toHaveClass("flex");
    expect(rail).toHaveClass("snap-x");
    expect(rail).toHaveClass("overflow-x-auto");
    expect(rail).toHaveClass("sm:grid");

    expect(firstCard).toHaveClass("snap-start");
    expect(firstCard).toHaveClass("shrink-0");
    expect(firstCard).toHaveClass("sm:w-auto");
  });
});

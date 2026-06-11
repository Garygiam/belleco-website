/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { PopularServicesSection } from "@/components/PopularServicesSection";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    fill,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    <img
      alt={alt}
      src={typeof src === "string" ? src : ""}
      data-fill={fill ? "true" : "false"}
      {...props}
    />
  ),
}));

describe("PopularServicesSection", () => {
  it("renders the compact intro copy, four service links, and treatment-specific thumbnails", () => {
    render(<PopularServicesSection />);

    expect(screen.getByText("Popular Services")).toBeInTheDocument();
    expect(
      screen.getByText("Explore the treatments clients ask for most."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Acne Treatment Texture Explore/i }),
    ).toHaveAttribute("href", "/services/acne-treatment-kuala-lumpur");
    expect(
      screen.getByAltText("Skin close-up visual for acne treatment and clearer texture"),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /HIFU Lift Explore/i })).toHaveAttribute(
      "href",
      "/services/hifu-kuala-lumpur",
    );
    expect(
      screen.getByAltText("Jawline contour close-up visual for HIFU lifting treatment"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /RF Microneedling Refine Explore/i }),
    ).toHaveAttribute("href", "/services/rf-microneedling-kuala-lumpur");
    expect(
      screen.getByAltText(
        "Refined pore and skin-texture close-up visual for RF microneedling treatment",
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Facial Glow Explore/i })).toHaveAttribute(
      "href",
      "/services/facial-kuchai-lama",
    );
    expect(
      screen.getByAltText("Hydrated glow skin close-up visual for facial treatment"),
    ).toBeInTheDocument();
  });
});

/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";
import { dictionaries } from "@/lib/i18n";

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

describe("BeforeAfterResultsSection", () => {
  it("renders the featured case, supporting selectors, disclaimer, and CTAs", () => {
    render(<BeforeAfterResultsSection locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByText("Real Results")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /visible change, mapped clearly\./i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Results vary by skin condition and treatment plan."),
    ).toBeInTheDocument();

    const supportButtons = screen.getAllByRole("button", {
      name: /Show result case:/i,
    });
    expect(supportButtons).toHaveLength(3);

    expect(
      screen.getByRole("link", { name: /Book Consultation/i }),
    ).toHaveAttribute("href", "/en/book");

    expect(
      screen.getByRole("link", { name: /WhatsApp/i }),
    ).toHaveAttribute("href", "https://wa.me/60173966510");
  });

  it("renders real before and after images for the featured case", () => {
    render(<BeforeAfterResultsSection locale="en" dictionary={dictionaries.en} />);

    expect(
      screen.getByAltText("Before photo for Acne Marks Recovery"),
    ).toHaveAttribute("src", "/before-after/acne-marks/before.png");
    expect(
      screen.getByAltText("After photo for Acne Marks Recovery"),
    ).toHaveAttribute("src", "/before-after/acne-marks/after.png");
  });

  it("swaps the featured case when a supporting selector is clicked", async () => {
    const user = userEvent.setup();
    render(<BeforeAfterResultsSection locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByText("Acne Marks Recovery")).toBeInTheDocument();
    expect(screen.getByText("RF Microneedling")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Show result case: Pigmentation Reset/i }),
    );

    expect(screen.getByText("Pigmentation Reset")).toBeInTheDocument();
    expect(screen.getByText("Laser + Brightening Protocol")).toBeInTheDocument();

    const supportButtons = screen.getAllByRole("button", {
      name: /Show result case:/i,
    });
    expect(supportButtons).toHaveLength(3);
    expect(
      screen.queryByRole("button", { name: /Show result case: Pigmentation Reset/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByAltText("Before photo for Pigmentation Reset"),
    ).toHaveAttribute("src", "/before-after/pigmentation-reset/before.png");
    expect(
      screen.getByAltText("After photo for Pigmentation Reset"),
    ).toHaveAttribute("src", "/before-after/pigmentation-reset/after.png");
  });

  it("uses a swipe-friendly supporting cases rail on mobile", () => {
    const { container } = render(
      <BeforeAfterResultsSection locale="en" dictionary={dictionaries.en} />,
    );

    const rail = container.querySelector(".before-after-mobile-rail");
    const supportButtons = screen.getAllByRole("button", {
      name: /Show result case:/i,
    });

    expect(rail).toHaveClass("flex");
    expect(rail).toHaveClass("snap-x");
    expect(rail).toHaveClass("overflow-x-auto");
    expect(rail).toHaveClass("md:grid");

    for (const button of supportButtons) {
      expect(button).toHaveClass("snap-start");
      expect(button).toHaveClass("shrink-0");
      expect(button).toHaveClass("md:w-auto");
    }
  });
});

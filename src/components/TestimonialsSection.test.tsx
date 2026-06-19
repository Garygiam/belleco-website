import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { dictionaries } from "@/lib/i18n";

describe("TestimonialsSection", () => {
  it("renders a compact stories header above the testimonial grid", () => {
    const { container } = render(<TestimonialsSection locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByText("Stories")).toBeInTheDocument();

    const heading = screen.getByRole("heading", {
      name: /Real transformations, guided with care\./i,
    });
    expect(heading).toBeInTheDocument();

    const intro = heading.closest("div");
    expect(intro).toHaveClass("max-w-3xl");
    expect(intro).toHaveClass("space-y-5");

    expect(container.querySelectorAll("figure").length).toBe(4);
    expect(container.querySelectorAll("a[href]").length).toBeGreaterThan(0);
  });

  it("renders 4 review tiles + a Google Reviews CTA without overflow", () => {
    const { container } = render(<TestimonialsSection locale="en" dictionary={dictionaries.en} />);

    expect(container.querySelectorAll("figure").length).toBe(4);
    expect(container.querySelectorAll("a[href]").length).toBeGreaterThan(0);

    const quote = screen.getByText(/My skin feels calmer/i);
    expect(quote).toHaveClass("break-words");

    const figure = quote.closest("figure");
    expect(figure).toHaveClass("overflow-hidden");
    expect(screen.getAllByText("Google Reviews").length).toBeGreaterThan(0);
  });

  it("renders translated Chinese testimonials copy", () => {
    render(<TestimonialsSection locale="zh" dictionary={dictionaries.zh} />);

    expect(screen.getByText("真实故事")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "真实变化，在细致护理中发生。" })).toBeInTheDocument();
    expect(screen.getAllByText("Google 评价").length).toBeGreaterThan(0);
    expect(screen.getByText("查看更多评价")).toBeInTheDocument();
  });
});

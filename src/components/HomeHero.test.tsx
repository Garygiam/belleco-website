import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeHero } from "@/components/HomeHero";
import { dictionaries } from "@/lib/i18n";

describe("HomeHero", () => {
  it("renders translated CTA labels from the locale dictionary", () => {
    render(<HomeHero locale="ms" dictionary={dictionaries.ms} />);

    expect(screen.getByRole("link", { name: "Tempah Konsultasi" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lihat Rawatan" })).toBeInTheDocument();
  });

  it("renders hero badge and supporting content in Malay", () => {
    render(<HomeHero locale="ms" dictionary={dictionaries.ms} />);

    expect(screen.getByText("Kuala Lumpur • Diagnostik Kulit")).toBeInTheDocument();
    expect(screen.getByText("Diagnosis terlebih dahulu")).toBeInTheDocument();
    expect(screen.getByText("Penjagaan tepat")).toBeInTheDocument();
    expect(screen.getByText("Protokol Kulit Signature")).toBeInTheDocument();
    expect(screen.getByText("Jerawat • Anti-penuaan • Seri")).toBeInTheDocument();
  });
});

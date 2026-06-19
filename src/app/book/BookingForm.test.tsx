import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BookingForm } from "@/app/book/BookingForm";
import { dictionaries } from "@/lib/i18n";

describe("BookingForm", () => {
  it("renders translated Malay booking labels", () => {
    render(<BookingForm locale="ms" dictionary={dictionaries.ms} />);

    expect(screen.getByText("Permintaan Temujanji")).toBeInTheDocument();
    expect(screen.getByText("Nama penuh")).toBeInTheDocument();
    expect(screen.getByText("Hubungan pilihan")).toBeInTheDocument();
    expect(screen.getByText("Pratonton mesej")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sediakan Mesej" })).toBeInTheDocument();
    expect(screen.getAllByText("WhatsApp")[1]?.closest("a")).toHaveAttribute("aria-disabled", "true");
  });
});

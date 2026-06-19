import { fireEvent, render, screen } from "@testing-library/react";
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

  it("only offers WhatsApp and call contact flows", () => {
    render(<BookingForm locale="en" dictionary={dictionaries.en} />);

    expect(screen.queryByText("Email (optional)")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Email" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Email" })).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Test Customer" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "+60123456789" },
    });
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "I consent to be contacted by Belléco Skin Beauté regarding this booking request.",
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Prepare Message" }));

    expect(screen.getByRole("button", { name: "Call" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open WhatsApp" })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/"),
    );
    expect(screen.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:+60173966510");
  });
});

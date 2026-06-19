import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ClientVideosSection } from "@/components/ClientVideosSection";
import { dictionaries } from "@/lib/i18n";

describe("ClientVideosSection", () => {
  it("renders thumbnails, switches videos, and toggles player mode", async () => {
    const user = userEvent.setup();
    render(<ClientVideosSection locale="en" dictionary={dictionaries.en} />);

    const thumbButtons = screen.getAllByRole("button", { name: /Select video:/i });
    expect(thumbButtons).toHaveLength(3);

    expect(
      screen.getByRole("button", { name: /Select video: Doublo HIFU/i }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(screen.getByTitle(/Client video preview:/i)).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/JS56HI5dQDQ?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=JS56HI5dQDQ&rel=0&modestbranding=1",
    );

    await user.click(screen.getByRole("button", { name: /Watch full video/i }));
    expect(screen.getByTitle(/Client video:/i)).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/JS56HI5dQDQ?autoplay=1&mute=0&controls=1&playsinline=1&rel=0&modestbranding=1",
    );

    await user.click(
      screen.getByRole("button", {
        name: /Select video: Belleco RF Micro-needle Treatment/i,
      }),
    );

    expect(screen.getByTitle(/Client video preview:/i)).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/LLY1owXIRxg?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=LLY1owXIRxg&rel=0&modestbranding=1",
    );
    expect(screen.queryByTitle(/Client video:/i)).not.toBeInTheDocument();
  });

  it("renders translated Malay section copy", () => {
    render(<ClientVideosSection locale="ms" dictionary={dictionaries.ms} />);

    expect(screen.getByText("Video Rawatan Kami")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Lihat rawatan dalam tindakan." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lihat semua di YouTube" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tonton video penuh" })).toBeInTheDocument();
  });
});

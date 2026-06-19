import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TreatmentsSection } from "@/components/TreatmentsSection";
import { dictionaries } from "@/lib/i18n";

describe("TreatmentsSection", () => {
  it("filters treatments by category", async () => {
    const user = userEvent.setup();
    render(<TreatmentsSection locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByText("Acne Reset Program")).toBeInTheDocument();
    expect(screen.getByText("Lift + Firm Facial")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Acne" }));
    expect(screen.getByText("Acne Reset Program")).toBeInTheDocument();
    expect(screen.getByText("Clear + Calm Deep Cleanse")).toBeInTheDocument();
    expect(screen.queryByText("Lift + Firm Facial")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Radiance" }));
    expect(screen.getByText("Radiance Bright Therapy")).toBeInTheDocument();
    expect(screen.getByText("Glass-Skin Hydration")).toBeInTheDocument();
    expect(screen.queryByText("Acne Reset Program")).not.toBeInTheDocument();
  });

  it("renders translated Chinese section copy and filters", async () => {
    const user = userEvent.setup();
    render(<TreatmentsSection locale="zh" dictionary={dictionaries.zh} />);

    expect(screen.getByText("针对性方案")).toBeInTheDocument();
    expect(screen.getByText("按你的肌肤问题定制疗程。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "全部" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "痘痘" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "焕亮" }));
    expect(screen.getByText("焕亮透肤疗程")).toBeInTheDocument();
  });
});

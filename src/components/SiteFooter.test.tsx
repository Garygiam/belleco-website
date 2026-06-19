import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { dictionaries } from "@/lib/i18n";

describe("SiteFooter", () => {
  it("renders translated Chinese footer labels", () => {
    render(<SiteFooter locale="zh" dictionary={dictionaries.zh} />);

    expect(screen.getByText("联系我们")).toBeInTheDocument();
    expect(screen.getByText("社交平台")).toBeInTheDocument();
    expect(screen.getByLabelText("在 Waze 打开")).toBeInTheDocument();
    expect(screen.getByLabelText("在 Google 地图打开")).toBeInTheDocument();
  });
});

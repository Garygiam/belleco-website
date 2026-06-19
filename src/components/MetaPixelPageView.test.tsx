import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockUsePathname = vi.fn();
const mockUseSearchParams = vi.fn();
const mockTrackMetaEvent = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useSearchParams: () => mockUseSearchParams(),
}));

vi.mock("@/lib/meta-pixel", () => ({
  META_PIXEL_ID: "892839550540707",
  trackMetaEvent: (...args: unknown[]) => mockTrackMetaEvent(...args),
}));

describe("MetaPixelPageView", () => {
  beforeEach(() => {
    mockTrackMetaEvent.mockReset();
    mockUsePathname.mockReturnValue("/en");
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
  });

  it("tracks PageView on route changes but not on first render", async () => {
    const { MetaPixelPageView } = await import("@/components/MetaPixelPageView");
    const { rerender } = render(<MetaPixelPageView />);

    expect(mockTrackMetaEvent).not.toHaveBeenCalled();

    mockUsePathname.mockReturnValue("/en/book");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("source=meta"));

    rerender(<MetaPixelPageView />);

    expect(mockTrackMetaEvent).toHaveBeenCalledWith("PageView");
  });
});

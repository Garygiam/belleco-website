import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockUsePathname = vi.fn();
const mockUseSearchParams = vi.fn();
const mockSendGAEvent = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useSearchParams: () => mockUseSearchParams(),
}));

vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: (...args: unknown[]) => mockSendGAEvent(...args),
}));

describe("GoogleAnalyticsPageView", () => {
  beforeEach(() => {
    mockSendGAEvent.mockReset();
    mockUsePathname.mockReturnValue("/en/book");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("source=instagram"));
    window.history.replaceState({}, "", "/en/book?source=instagram");
    document.title = "Belléco";
  });

  it("sends a page_view event when the route changes", async () => {
    const { GoogleAnalyticsPageView } = await import("@/components/GoogleAnalyticsPageView");
    const { rerender } = render(<GoogleAnalyticsPageView />);

    expect(mockSendGAEvent).not.toHaveBeenCalled();

    mockUsePathname.mockReturnValue("/en/services/hifu-kuala-lumpur");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("lang=en"));
    window.history.replaceState({}, "", "/en/services/hifu-kuala-lumpur?lang=en");
    document.title = "HIFU | Belléco";

    rerender(<GoogleAnalyticsPageView />);

    expect(mockSendGAEvent).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/en/services/hifu-kuala-lumpur?lang=en",
      page_location: "http://localhost:3000/en/services/hifu-kuala-lumpur?lang=en",
      page_title: "HIFU | Belléco",
    });
  });
});

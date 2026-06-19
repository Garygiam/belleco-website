/* eslint-disable @next/next/no-img-element */
import { render, screen, within } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { dictionaries } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    fill,
    priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => (
    (void priority,
    (
      <img
        alt={alt}
        src={typeof src === "string" ? src : ""}
        data-fill={fill ? "true" : "false"}
        {...props}
      />
    ))
  ),
}));

describe("SiteFooter", () => {
  it("keeps map actions in contact and social links in the social section", () => {
    render(<SiteFooter locale="en" dictionary={dictionaries.en} />);

    const contactBlock = screen.getByText(uiCopy.en.footer.contact).parentElement;
    const socialBlock = screen.getByText(uiCopy.en.footer.social).parentElement;

    expect(contactBlock).not.toBeNull();
    expect(socialBlock).not.toBeNull();

    expect(within(contactBlock!).getByLabelText(uiCopy.en.footer.openInWaze)).toBeInTheDocument();
    expect(within(contactBlock!).getByLabelText(uiCopy.en.footer.openInMaps)).toBeInTheDocument();
    expect(within(contactBlock!).queryByRole("link", { name: /instagram/i })).not.toBeInTheDocument();

    expect(within(socialBlock!).getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    expect(within(socialBlock!).getByRole("link", { name: /facebook/i })).toBeInTheDocument();
    expect(within(socialBlock!).getByRole("link", { name: /youtube/i })).toBeInTheDocument();
  });
});

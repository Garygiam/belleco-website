"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    sendGAEvent("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

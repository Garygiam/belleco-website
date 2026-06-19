"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackMetaEvent } from "@/lib/meta-pixel";

export function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    trackMetaEvent("PageView");
  }, [pathname, searchParams]);

  return null;
}

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/link", () => {
  return {
    default: ({
      href,
      children,
      ...props
    }: {
      href: string | { pathname?: string };
      children: React.ReactNode;
      [key: string]: unknown;
    }) => {
      const resolved =
        typeof href === "string" ? href : href.pathname ? href.pathname : "/";
      return (
        <a href={resolved} {...props}>
          {children}
        </a>
      );
    },
  };
});

const existingLocalStorage = window.localStorage as unknown as {
  getItem?: (key: string) => string | null;
  setItem?: (key: string, value: string) => void;
  removeItem?: (key: string) => void;
  clear?: () => void;
};

if (
  !existingLocalStorage ||
  typeof existingLocalStorage.getItem !== "function" ||
  typeof existingLocalStorage.setItem !== "function" ||
  typeof existingLocalStorage.removeItem !== "function" ||
  typeof existingLocalStorage.clear !== "function"
) {
  const store = new Map<string, string>();

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, String(value));
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
    },
  });
}

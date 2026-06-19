export const META_PIXEL_ID = "892839550540707";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaEvent(eventName: string, ...args: unknown[]) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", eventName, ...args);
}

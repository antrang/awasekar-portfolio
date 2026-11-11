/**
 * Safe helper to track custom events with Umami Analytics.
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, string | number | boolean>
) => {
  if (
    typeof window !== "undefined" &&
    window.umami &&
    typeof window.umami.track === "function"
  ) {
    window.umami.track(eventName, eventData);
  }
};

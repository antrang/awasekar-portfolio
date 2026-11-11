export interface UmamiTracker {
  track: {
    (eventName: string, eventData?: Record<string, string | number | boolean>): void;
    (customPayloadFunction: (props: Record<string, unknown>) => Record<string, unknown>): void;
  };
  identify: (sessionData: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export {};

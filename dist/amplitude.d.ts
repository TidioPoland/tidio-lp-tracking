import { Types } from '@amplitude/analytics-browser';
export declare const amplitudeInit: (apiKey?: string) => Types.BrowserClient | null;
export declare const track: (eventName: string, eventProperties?: Record<string, any>) => void;
export declare const trackPageView: () => void;
export declare const setUserId: (userId: string) => void;
export declare const setUserProperties: (properties: Record<string, any>) => void;
export declare const trackCTAClick: (ctaPosition: string, ctaText: string) => void;

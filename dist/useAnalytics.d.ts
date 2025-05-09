/**
 * Custom hook for tracking analytics events
 */
export declare const useAnalytics: () => {
    trackEvent: (eventName: string, properties?: Record<string, any>) => void;
    identifyUser: (userId: string) => void;
    setUserProps: (properties: Record<string, any>) => void;
    logPageView: () => void;
    logCTAClick: (position: string, ctaText: string) => void;
};

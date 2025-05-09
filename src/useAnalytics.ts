import {track, setUserId, setUserProperties, trackPageView, trackCTAClick} from "./amplitude";

/**
 * Custom hook for tracking analytics events
 */
export const useAnalytics = () => {
    /**
     * Track any custom event
     */
    const trackEvent = (eventName: string, properties?: Record<string, any>) => {
        track(eventName, properties);
    };

    /**
     * Set the current user ID for analytics
     */
    const identifyUser = (userId: string) => {
        setUserId(userId);
    };

    /**
     * Set properties for the current user
     */
    const setUserProps = (properties: Record<string, any>) => {
        setUserProperties(properties);
    };

    /**
     * Track a page view event
     */
    const logPageView = () => {
        trackPageView();
    };

    /**
     * Track a CTA click event
     */
    const logCTAClick = (position: string, ctaText: string) => {
        trackCTAClick(position, ctaText);
    };


    return {
        trackEvent,
        identifyUser,
        setUserProps,
        logPageView,
        logCTAClick,
    };
};

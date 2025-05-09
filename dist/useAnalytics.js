"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnalytics = void 0;
const amplitude_1 = require("./amplitude");
/**
 * Custom hook for tracking analytics events
 */
const useAnalytics = () => {
    /**
     * Track any custom event
     */
    const trackEvent = (eventName, properties) => {
        (0, amplitude_1.track)(eventName, properties);
    };
    /**
     * Set the current user ID for analytics
     */
    const identifyUser = (userId) => {
        (0, amplitude_1.setUserId)(userId);
    };
    /**
     * Set properties for the current user
     */
    const setUserProps = (properties) => {
        (0, amplitude_1.setUserProperties)(properties);
    };
    /**
     * Track a page view event
     */
    const logPageView = () => {
        (0, amplitude_1.trackPageView)();
    };
    /**
     * Track a CTA click event
     */
    const logCTAClick = (position, ctaText) => {
        (0, amplitude_1.trackCTAClick)(position, ctaText);
    };
    return {
        trackEvent,
        identifyUser,
        setUserProps,
        logPageView,
        logCTAClick,
    };
};
exports.useAnalytics = useAnalytics;

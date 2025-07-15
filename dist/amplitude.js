"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackCTAClick = exports.setUserProperties = exports.setUserId = exports.trackPageView = exports.track = exports.amplitudeInit = void 0;
const analytics_browser_1 = require("@amplitude/analytics-browser");
const utils_1 = require("./utils");
const cookiebot_1 = require("./cookiebot");
// Store the Amplitude instance globally
let amplitudeInstance = null;
let initialized = false;
// Initialize Amplitude with your API key
const amplitudeInit = (apiKey) => {
    // Only initialize once
    if (!initialized && typeof window !== 'undefined') {
        if (!apiKey) {
            console.warn("Amplitude API Key not provided to amplitudeInit.");
            return null;
        }
        amplitudeInstance = (0, analytics_browser_1.createInstance)();
        amplitudeInstance.init(apiKey, // Use the provided apiKey
        undefined, {
            logLevel: process.env.NODE_ENV === 'production'
                ? analytics_browser_1.Types.LogLevel.Warn
                : analytics_browser_1.Types.LogLevel.Debug,
            defaultTracking: false,
            autocapture: false
        });
        initialized = true;
    }
    return amplitudeInstance;
};
exports.amplitudeInit = amplitudeInit;
// Helper to track events
const track = (eventName, eventProperties) => {
    if (typeof window !== 'undefined') {
        // Check for analytics consent before tracking
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping event tracking:", eventName);
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        if (instance) {
            const defaultProperties = {
                category: (0, utils_1.getCategoryFromDomain)(),
                page_path: window.location.pathname,
                page_url: window.location.href,
                referrer: document.referrer || undefined, // Ensure referrer is string or undefined
                breakpoint: (0, utils_1.getBreakpoint)()
            };
            const finalEventProperties = Object.assign(Object.assign({}, defaultProperties), eventProperties);
            instance.track(eventName, finalEventProperties);
        }
        else {
            console.warn("Amplitude instance not available for tracking event:", eventName);
        }
    }
};
exports.track = track;
// Track page view event
const trackPageView = () => {
    if (typeof window !== 'undefined') {
        // Check for analytics consent before tracking
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping page view tracking.");
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        if (instance) {
            // Get current page information
            const pagePath = window.location.pathname;
            const pageUrl = window.location.href;
            const referrer = document.referrer;
            const eventProperties = {
                category: (0, utils_1.getCategoryFromDomain)(),
                page_path: pagePath,
                page_url: pageUrl,
                referrer: referrer,
                breakpoint: (0, utils_1.getBreakpoint)()
            };
            instance.track("Homepage: Page Opened", eventProperties);
        }
    }
};
exports.trackPageView = trackPageView;
// Helper to set user ID
const setUserId = (userId) => {
    if (typeof window !== 'undefined') {
        // Check for analytics consent before setting user ID
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping user ID setting.");
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        instance === null || instance === void 0 ? void 0 : instance.setUserId(userId);
    }
};
exports.setUserId = setUserId;
// Helper to set user properties
const setUserProperties = (properties) => {
    if (typeof window !== 'undefined') {
        // Check for analytics consent before setting user properties
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping user properties setting.");
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        // Create identify object and set properties
        const identify = new analytics_browser_1.Identify();
        // Add each property individually
        Object.entries(properties).forEach(([key, value]) => {
            identify.set(key, value);
        });
        instance === null || instance === void 0 ? void 0 : instance.identify(identify);
    }
};
exports.setUserProperties = setUserProperties;
// Track CTA click event
const trackCTAClick = (ctaPosition, ctaText) => {
    if (typeof window !== 'undefined') {
        // Check for analytics consent before tracking
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping CTA click tracking.");
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        if (instance) {
            const pagePath = window.location.pathname;
            const pageUrl = window.location.href;
            const referrer = document.referrer;
            const eventProperties = {
                category: (0, utils_1.getCategoryFromDomain)(),
                page_path: pagePath,
                page_url: pageUrl,
                referrer: referrer,
                cta_position: ctaPosition,
                cta_text: ctaText
            };
            instance.track("Homepage: CTA Clicked", eventProperties);
        }
    }
};
exports.trackCTAClick = trackCTAClick;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackCTAClick = exports.setUserProperties = exports.setUserId = exports.trackPageView = exports.track = exports.amplitudeInit = void 0;
const analytics_browser_1 = require("@amplitude/analytics-browser");
const utils_1 = require("./utils");
const cookiebot_1 = require("./cookiebot");
// Store the Amplitude instance globally
let amplitudeInstance = null;
let initialized = false;
let initialLogLevel;
// Initialize Amplitude with your API key
const amplitudeInit = (apiKey, logLevel) => {
    if (typeof window === 'undefined') {
        return null;
    }
    // Only initialize once
    if (!initialized) {
        if (!apiKey) {
            console.warn("Amplitude API Key not provided to amplitudeInit.");
            return null;
        }
        const resolvedLogLevel = logLevel !== null && logLevel !== void 0 ? logLevel : (process.env.NODE_ENV === 'production'
            ? analytics_browser_1.Types.LogLevel.Warn
            : analytics_browser_1.Types.LogLevel.Debug);
        amplitudeInstance = (0, analytics_browser_1.createInstance)();
        amplitudeInstance.init(apiKey, // Use the provided apiKey
        undefined, {
            logLevel: resolvedLogLevel,
            defaultTracking: false,
            autocapture: false
        });
        initialLogLevel = resolvedLogLevel;
        initialized = true;
    }
    else if (logLevel !== undefined && logLevel !== initialLogLevel) {
        // Warn if logLevel is changed after initialization
        console.warn(`Amplitude logLevel cannot be changed after initialization. ` +
            `Initial logLevel: ${initialLogLevel}, Attempted logLevel: ${logLevel}. ` +
            `The logLevel prop should remain stable throughout the application lifecycle.`);
    }
    return amplitudeInstance;
};
exports.amplitudeInit = amplitudeInit;
// Helper to track events
const track = (eventName, eventProperties) => {
    if (typeof window !== 'undefined') {
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping event tracking:", eventName);
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        if (instance) {
            instance.track(eventName, Object.assign(Object.assign({}, (0, utils_1.getDefaultEventProperties)()), eventProperties));
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
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping page view tracking.");
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        if (instance) {
            instance.track("Homepage: Page Opened", (0, utils_1.getDefaultEventProperties)());
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
        if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
            console.debug("Analytics consent not granted. Skipping CTA click tracking.");
            return;
        }
        const instance = (0, exports.amplitudeInit)();
        if (instance) {
            instance.track("Homepage: CTA Clicked", Object.assign(Object.assign({}, (0, utils_1.getDefaultEventProperties)()), { cta_position: ctaPosition, cta_text: ctaText }));
        }
    }
};
exports.trackCTAClick = trackCTAClick;

"use strict";
/**
 * Cookiebot consent utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConsentChanged = exports.getConsentId = exports.hasPreferencesConsent = exports.hasMarketingConsent = exports.hasAnalyticsConsent = exports.isCookiebotLoaded = void 0;
/**
 * Check if Cookiebot is loaded and available
 */
const isCookiebotLoaded = () => {
    return typeof window !== 'undefined' &&
        typeof window.Cookiebot !== 'undefined' &&
        window.Cookiebot.hasResponse;
};
exports.isCookiebotLoaded = isCookiebotLoaded;
/**
 * Check if the user has consented to statistics/analytics cookies
 * This is the category typically used for analytics tracking
 */
const hasAnalyticsConsent = () => {
    var _a;
    if (typeof window === 'undefined') {
        return false;
    }
    // If Cookiebot is not loaded yet, we should not track
    if (!(0, exports.isCookiebotLoaded)()) {
        return false;
    }
    // Check if user has consented to statistics cookies (required for analytics)
    return ((_a = window.Cookiebot) === null || _a === void 0 ? void 0 : _a.consent.statistics) === true;
};
exports.hasAnalyticsConsent = hasAnalyticsConsent;
/**
 * Check if the user has consented to marketing cookies
 */
const hasMarketingConsent = () => {
    var _a;
    if (typeof window === 'undefined') {
        return false;
    }
    if (!(0, exports.isCookiebotLoaded)()) {
        return false;
    }
    return ((_a = window.Cookiebot) === null || _a === void 0 ? void 0 : _a.consent.marketing) === true;
};
exports.hasMarketingConsent = hasMarketingConsent;
/**
 * Check if the user has consented to preference cookies
 */
const hasPreferencesConsent = () => {
    var _a;
    if (typeof window === 'undefined') {
        return false;
    }
    if (!(0, exports.isCookiebotLoaded)()) {
        return false;
    }
    return ((_a = window.Cookiebot) === null || _a === void 0 ? void 0 : _a.consent.preferences) === true;
};
exports.hasPreferencesConsent = hasPreferencesConsent;
/**
 * Get the consent ID from Cookiebot
 */
const getConsentId = () => {
    var _a;
    if (typeof window === 'undefined' || !(0, exports.isCookiebotLoaded)()) {
        return null;
    }
    return ((_a = window.Cookiebot) === null || _a === void 0 ? void 0 : _a.consentID) || null;
};
exports.getConsentId = getConsentId;
/**
 * Add event listener for consent changes
 * This can be used to react when user updates their consent preferences
 */
const onConsentChanged = (callback) => {
    if (typeof window === 'undefined') {
        return () => { };
    }
    const handleConsentChanged = () => {
        callback();
    };
    window.addEventListener('CookiebotOnConsentReady', handleConsentChanged);
    window.addEventListener('CookiebotOnAccept', handleConsentChanged);
    window.addEventListener('CookiebotOnDecline', handleConsentChanged);
    // Return cleanup function
    return () => {
        window.removeEventListener('CookiebotOnConsentReady', handleConsentChanged);
        window.removeEventListener('CookiebotOnAccept', handleConsentChanged);
        window.removeEventListener('CookiebotOnDecline', handleConsentChanged);
    };
};
exports.onConsentChanged = onConsentChanged;

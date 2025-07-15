/**
 * Cookiebot consent utilities
 */
declare global {
    interface Window {
        Cookiebot?: {
            consent: {
                statistics: boolean;
                marketing: boolean;
                preferences: boolean;
                necessary: boolean;
            };
            consentID: string;
            hasResponse: boolean;
            doNotTrack: boolean;
        };
    }
}
/**
 * Check if Cookiebot is loaded and available
 */
export declare const isCookiebotLoaded: () => boolean;
/**
 * Check if the user has consented to statistics/analytics cookies
 * This is the category typically used for analytics tracking
 */
export declare const hasAnalyticsConsent: () => boolean;
/**
 * Check if the user has consented to marketing cookies
 */
export declare const hasMarketingConsent: () => boolean;
/**
 * Check if the user has consented to preference cookies
 */
export declare const hasPreferencesConsent: () => boolean;
/**
 * Get the consent ID from Cookiebot
 */
export declare const getConsentId: () => string | null;
/**
 * Add event listener for consent changes
 * This can be used to react when user updates their consent preferences
 */
export declare const onConsentChanged: (callback: () => void) => (() => void);

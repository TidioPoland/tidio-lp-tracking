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
export const isCookiebotLoaded = (): boolean => {
    return typeof window !== 'undefined' && 
           typeof window.Cookiebot !== 'undefined' && 
           window.Cookiebot.hasResponse;
};

/**
 * Check if the user has consented to statistics/analytics cookies
 * This is the category typically used for analytics tracking
 */
export const hasAnalyticsConsent = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    // If Cookiebot is not loaded yet, we should not track
    if (!isCookiebotLoaded()) {
        return false;
    }

    // Check if user has consented to statistics cookies (required for analytics)
    return window.Cookiebot?.consent.statistics === true;
};

/**
 * Check if the user has consented to marketing cookies
 */
export const hasMarketingConsent = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    if (!isCookiebotLoaded()) {
        return false;
    }

    return window.Cookiebot?.consent.marketing === true;
};

/**
 * Check if the user has consented to preference cookies
 */
export const hasPreferencesConsent = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    if (!isCookiebotLoaded()) {
        return false;
    }

    return window.Cookiebot?.consent.preferences === true;
};

/**
 * Get the consent ID from Cookiebot
 */
export const getConsentId = (): string | null => {
    if (typeof window === 'undefined' || !isCookiebotLoaded()) {
        return null;
    }

    return window.Cookiebot?.consentID || null;
};

/**
 * Add event listener for consent changes
 * This can be used to react when user updates their consent preferences
 */
export const onConsentChanged = (callback: () => void): (() => void) => {
    if (typeof window === 'undefined') {
        return () => {};
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
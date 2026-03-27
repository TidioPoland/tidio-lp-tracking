import { createInstance, Types, Identify } from '@amplitude/analytics-browser';
import { getDefaultEventProperties } from "./utils";
import { hasAnalyticsConsent } from "./cookiebot";

// Store the Amplitude instance globally
let amplitudeInstance: ReturnType<typeof createInstance> | null = null;
let initialized = false;
let initialLogLevel: Types.LogLevel | undefined;

// Initialize Amplitude with your API key
export const amplitudeInit = (apiKey?: string, logLevel?: Types.LogLevel) => {
    if (typeof window === 'undefined') {
        return null;
    }

    // Only initialize once
    if (!initialized) {
        if (!apiKey) {
            console.warn("Amplitude API Key not provided to amplitudeInit.");
            return null;
        }
        
        const resolvedLogLevel = logLevel ?? (
            process.env.NODE_ENV === 'production'
                ? Types.LogLevel.Warn
                : Types.LogLevel.Debug
        );
        
        amplitudeInstance = createInstance();

        amplitudeInstance.init(
            apiKey, // Use the provided apiKey
            undefined,
            {
                logLevel: resolvedLogLevel,
                defaultTracking: false,
                autocapture: false
            }
        );

        initialLogLevel = resolvedLogLevel;
        initialized = true;
    } else if (logLevel !== undefined && logLevel !== initialLogLevel) {
        // Warn if logLevel is changed after initialization
        console.warn(
            `Amplitude logLevel cannot be changed after initialization. ` +
            `Initial logLevel: ${initialLogLevel}, Attempted logLevel: ${logLevel}. ` +
            `The logLevel prop should remain stable throughout the application lifecycle.`
        );
    }

    return amplitudeInstance;
};

// Helper to track events
export const track = (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        if (!hasAnalyticsConsent()) {
            console.debug("Analytics consent not granted. Skipping event tracking:", eventName);
            return;
        }

        const instance = amplitudeInit();
        if (instance) {
            instance.track(eventName, {
                ...getDefaultEventProperties(),
                ...eventProperties,
            });
        } else {
            console.warn("Amplitude instance not available for tracking event:", eventName);
        }
    }
};

// Track page view event
export const trackPageView = () => {
    if (typeof window !== 'undefined') {
        if (!hasAnalyticsConsent()) {
            console.debug("Analytics consent not granted. Skipping page view tracking.");
            return;
        }

        const instance = amplitudeInit();
        if (instance) {
            instance.track("Homepage: Page Opened", getDefaultEventProperties());
        }
    }
};

// Helper to set user ID
export const setUserId = (userId: string) => {
    if (typeof window !== 'undefined') {
        // Check for analytics consent before setting user ID
        if (!hasAnalyticsConsent()) {
            console.debug("Analytics consent not granted. Skipping user ID setting.");
            return;
        }

        const instance = amplitudeInit();
        instance?.setUserId(userId);
    }
};

// Helper to set user properties
export const setUserProperties = (properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        // Check for analytics consent before setting user properties
        if (!hasAnalyticsConsent()) {
            console.debug("Analytics consent not granted. Skipping user properties setting.");
            return;
        }

        const instance = amplitudeInit();

        // Create identify object and set properties
        const identify = new Identify();

        // Add each property individually
        Object.entries(properties).forEach(([key, value]) => {
            identify.set(key, value);
        });

        instance?.identify(identify);
    }
};

// Track CTA click event
export const trackCTAClick = (ctaPosition: string, ctaText: string) => {
    if (typeof window !== 'undefined') {
        if (!hasAnalyticsConsent()) {
            console.debug("Analytics consent not granted. Skipping CTA click tracking.");
            return;
        }

        const instance = amplitudeInit();
        if (instance) {
            instance.track("Homepage: CTA Clicked", {
                ...getDefaultEventProperties(),
                cta_position: ctaPosition,
                cta_text: ctaText,
            });
        }
    }
};

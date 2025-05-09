import { createInstance, Types, Identify } from '@amplitude/analytics-browser';
import {getBreakpoint, getCategoryFromDomain} from "./utils";

// Store the Amplitude instance globally
let amplitudeInstance: ReturnType<typeof createInstance> | null = null;
let initialized = false;

// Initialize Amplitude with your API key
export const amplitudeInit = (apiKey?: string) => {
    // Only initialize once
    if (!initialized && typeof window !== 'undefined') {
        if (!apiKey) {
            console.warn("Amplitude API Key not provided to amplitudeInit.");
            return null;
        }
        amplitudeInstance = createInstance();

        amplitudeInstance.init(
            apiKey, // Use the provided apiKey
            undefined,
            {
                logLevel: process.env.NODE_ENV === 'production'
                    ? Types.LogLevel.Warn
                    : Types.LogLevel.Debug,
                defaultTracking: false,
                autocapture: false
            }
        );

        initialized = true;
    }

    return amplitudeInstance;
};

// Helper to track events
export const track = (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        const instance = amplitudeInit();
        instance?.track(eventName, eventProperties);
    }
};

// Track page view event
export const trackPageView = () => {
    if (typeof window !== 'undefined') {
        const instance = amplitudeInit();

        if (instance) {
            // Get current page information
            const pagePath = window.location.pathname;
            const pageUrl = window.location.href;
            const referrer = document.referrer;

            const eventProperties = {
                category: getCategoryFromDomain(),
                page_path: pagePath,
                page_url: pageUrl,
                referrer: referrer,
                breakpoint: getBreakpoint()
            };

            instance.track("Homepage: Page Opened", eventProperties);
        }
    }
};

// Helper to set user ID
export const setUserId = (userId: string) => {
    if (typeof window !== 'undefined') {
        const instance = amplitudeInit();
        instance?.setUserId(userId);
    }
};

// Helper to set user properties
export const setUserProperties = (properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
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
        const instance = amplitudeInit();
        if (instance) {
            const pagePath = window.location.pathname;
            const pageUrl = window.location.href;
            const referrer = document.referrer;

            const eventProperties = {
                category: getCategoryFromDomain(),
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

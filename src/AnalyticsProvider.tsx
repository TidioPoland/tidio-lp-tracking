"use client";
import { ReactNode, useEffect, useRef } from "react";
import { amplitudeInit, trackPageView } from "./amplitude";
import { usePathname } from "next/navigation";
import { onConsentChanged, hasAnalyticsConsent } from "./cookiebot";

interface AnalyticsProviderProps {
    apiKey: string;
    children: ReactNode;
}

export const AnalyticsProvider = ({ apiKey, children }: AnalyticsProviderProps) => {
    const pathname = usePathname();
    const lastPathname = useRef<string | null>(null);

    // Initialize and track first page view
    useEffect(() => {
        // Initialize Amplitude
        amplitudeInit(apiKey);

        // Track initial page view only if consent is granted
        trackPageView();
    }, [apiKey]);

    // Listen for consent changes and track initial page view when consent is granted
    useEffect(() => {
        const cleanup = onConsentChanged(() => {
            // When consent changes, if analytics consent is now granted, track the current page
            if (hasAnalyticsConsent()) {
                trackPageView();
            }
        });

        return cleanup;
    }, []);

    // Track when pathname changes for SPA navigation
    useEffect(() => {
        // Skip the first render if pathname hasn't changed from initial (or if it's the very first render where lastPathname.current is null)
        // The initial page view is handled by the first useEffect.
        if (lastPathname.current !== null && pathname !== lastPathname.current) {
            trackPageView();
        }

        // Update last pathname after processing
        lastPathname.current = pathname || null;
    }, [pathname]);

    return <>{children}</>;
};

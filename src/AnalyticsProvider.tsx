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
    const hasTrackedInitialPageView = useRef<boolean>(false);

    // Initialize Amplitude
    useEffect(() => {
        amplitudeInit(apiKey);
    }, [apiKey]);

    // Track initial page view only when consent is available and granted
    useEffect(() => {
        // Only track if we haven't tracked the initial page view yet and consent is granted
        if (!hasTrackedInitialPageView.current && hasAnalyticsConsent()) {
            trackPageView();
            hasTrackedInitialPageView.current = true;
        }
    }, []);

    // Listen for consent changes and track initial page view when consent is granted
    useEffect(() => {
        const cleanup = onConsentChanged(() => {
            // When consent changes, if analytics consent is now granted and we haven't tracked initial page view
            if (hasAnalyticsConsent() && !hasTrackedInitialPageView.current) {
                trackPageView();
                hasTrackedInitialPageView.current = true;
            }
        });

        return cleanup;
    }, []);

    // Track when pathname changes for SPA navigation
    useEffect(() => {
        // Skip the first render if pathname hasn't changed from initial (or if it's the very first render where lastPathname.current is null)
        // The initial page view is handled by the effects above.
        if (lastPathname.current !== null && pathname !== lastPathname.current) {
            trackPageView();
        }

        // Update last pathname after processing
        lastPathname.current = pathname || null;
    }, [pathname]);

    return <>{children}</>;
};

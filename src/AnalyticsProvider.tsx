"use client";
import { ReactNode, useEffect, useRef } from "react";
import { amplitudeInit, trackPageView } from "./amplitude";
import { usePathname } from "next/navigation";

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

        // Track initial page view
        trackPageView();
    }, [apiKey]);

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

"use client";
import { ReactNode, useEffect } from "react";
import { amplitudeInit, trackPageView } from "./amplitude";

interface AnalyticsProviderProps {
    apiKey: string;
    children: ReactNode;
}

export const AnalyticsProvider = ({ apiKey, children }: AnalyticsProviderProps) => {
    // Initialize and track first page view
    useEffect(() => {
        // Initialize Amplitude
        amplitudeInit(apiKey);

        // Track initial page view
        trackPageView();
    }, [apiKey]);

    return <>{children}</>;
};

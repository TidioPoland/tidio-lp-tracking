import { hasAnalyticsConsent } from "./cookiebot";

declare global {
    interface Window {
        dataLayer: Array<Record<string, unknown>>;
    }
}

export interface GoogleAnalyticsEventData {
    gaEvent: string;
    gaCategory?: string;
    gaAction?: string;
    gaLabel?: string;
}

export type GoogleAnalyticsCustomProperties = {
    [key: string]:
        | { [key: string]: string | number | boolean | undefined }
        | string
        | number
        | boolean
        | undefined;
};

export const sendEventToGoogleAnalytics = (
    data: GoogleAnalyticsEventData,
    customProperties?: GoogleAnalyticsCustomProperties,
): void => {
    if (typeof window === "undefined") {
        return;
    }

    if (!hasAnalyticsConsent()) {
        console.debug(
            "Analytics consent not granted. Skipping GA event:",
            data.gaEvent,
        );
        return;
    }

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: data.gaEvent,
        eventCategory: data.gaCategory,
        eventAction: data.gaAction,
        eventLabel: data.gaLabel,
        ...customProperties,
    });
};

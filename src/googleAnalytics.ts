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

    const payload: Record<string, unknown> = {
        event: data.gaEvent,
        ...(data.gaCategory !== undefined && { eventCategory: data.gaCategory }),
        ...(data.gaAction !== undefined && { eventAction: data.gaAction }),
        ...(data.gaLabel !== undefined && { eventLabel: data.gaLabel }),
        ...customProperties,
    };

    window.dataLayer.push(payload);
};

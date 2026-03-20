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
    [key: string]: {
        [key: string]: string | number | boolean | undefined;
    } | string | number | boolean | undefined;
};
export declare const sendEventToGoogleAnalytics: (data: GoogleAnalyticsEventData, customProperties?: GoogleAnalyticsCustomProperties) => void;

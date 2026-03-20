import { GoogleAnalyticsEventData, GoogleAnalyticsCustomProperties } from "./googleAnalytics";
export declare const useGoogleAnalytics: () => {
    sendGAEvent: (data: GoogleAnalyticsEventData, customProperties?: GoogleAnalyticsCustomProperties) => void;
};

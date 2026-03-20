import { useCallback } from "react";
import {
    sendEventToGoogleAnalytics,
    GoogleAnalyticsEventData,
    GoogleAnalyticsCustomProperties,
} from "./googleAnalytics";

export const useGoogleAnalytics = () => {
    const sendGAEvent = useCallback(
        (
            data: GoogleAnalyticsEventData,
            customProperties?: GoogleAnalyticsCustomProperties,
        ) => {
            sendEventToGoogleAnalytics(data, customProperties);
        },
        [],
    );

    return { sendGAEvent };
};

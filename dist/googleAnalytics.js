"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEventToGoogleAnalytics = void 0;
const cookiebot_1 = require("./cookiebot");
const sendEventToGoogleAnalytics = (data, customProperties) => {
    if (typeof window === "undefined") {
        return;
    }
    if (!(0, cookiebot_1.hasAnalyticsConsent)()) {
        console.debug("Analytics consent not granted. Skipping GA event:", data.gaEvent);
        return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: data.gaEvent, eventCategory: data.gaCategory, eventAction: data.gaAction, eventLabel: data.gaLabel }, customProperties));
};
exports.sendEventToGoogleAnalytics = sendEventToGoogleAnalytics;

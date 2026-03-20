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
    const payload = Object.assign(Object.assign(Object.assign(Object.assign({ event: data.gaEvent }, (data.gaCategory !== undefined && { eventCategory: data.gaCategory })), (data.gaAction !== undefined && { eventAction: data.gaAction })), (data.gaLabel !== undefined && { eventLabel: data.gaLabel })), customProperties);
    window.dataLayer.push(payload);
};
exports.sendEventToGoogleAnalytics = sendEventToGoogleAnalytics;

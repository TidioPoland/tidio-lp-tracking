"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGoogleAnalytics = void 0;
const react_1 = require("react");
const googleAnalytics_1 = require("./googleAnalytics");
const useGoogleAnalytics = () => {
    const sendGAEvent = (0, react_1.useCallback)((data, customProperties) => {
        (0, googleAnalytics_1.sendEventToGoogleAnalytics)(data, customProperties);
    }, []);
    return { sendGAEvent };
};
exports.useGoogleAnalytics = useGoogleAnalytics;

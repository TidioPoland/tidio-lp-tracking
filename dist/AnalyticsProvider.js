"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const amplitude_1 = require("./amplitude");
const AnalyticsProvider = ({ apiKey, children }) => {
    // Initialize and track first page view
    (0, react_1.useEffect)(() => {
        // Initialize Amplitude
        (0, amplitude_1.amplitudeInit)(apiKey);
        // Track initial page view
        (0, amplitude_1.trackPageView)();
    }, [apiKey]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.AnalyticsProvider = AnalyticsProvider;

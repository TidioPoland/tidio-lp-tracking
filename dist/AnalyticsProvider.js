"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const amplitude_1 = require("./amplitude");
const navigation_1 = require("next/navigation");
const AnalyticsProvider = ({ apiKey, children }) => {
    const pathname = (0, navigation_1.usePathname)();
    const lastPathname = (0, react_1.useRef)(null);
    // Initialize and track first page view
    (0, react_1.useEffect)(() => {
        // Initialize Amplitude
        (0, amplitude_1.amplitudeInit)(apiKey);
        // Track initial page view
        (0, amplitude_1.trackPageView)();
    }, [apiKey]);
    // Track when pathname changes for SPA navigation
    (0, react_1.useEffect)(() => {
        // Skip the first render if pathname hasn't changed from initial (or if it's the very first render where lastPathname.current is null)
        // The initial page view is handled by the first useEffect.
        if (lastPathname.current !== null && pathname !== lastPathname.current) {
            (0, amplitude_1.trackPageView)();
        }
        // Update last pathname after processing
        lastPathname.current = pathname || null;
    }, [pathname]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.AnalyticsProvider = AnalyticsProvider;

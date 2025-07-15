"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const amplitude_1 = require("./amplitude");
const navigation_1 = require("next/navigation");
const cookiebot_1 = require("./cookiebot");
const AnalyticsProvider = ({ apiKey, children }) => {
    const pathname = (0, navigation_1.usePathname)();
    const lastPathname = (0, react_1.useRef)(null);
    const hasTrackedInitialPageView = (0, react_1.useRef)(false);
    // Initialize Amplitude
    (0, react_1.useEffect)(() => {
        (0, amplitude_1.amplitudeInit)(apiKey);
    }, [apiKey]);
    // Track initial page view only when consent is available and granted
    (0, react_1.useEffect)(() => {
        // Only track if we haven't tracked the initial page view yet and consent is granted
        if (!hasTrackedInitialPageView.current && (0, cookiebot_1.hasAnalyticsConsent)()) {
            (0, amplitude_1.trackPageView)();
            hasTrackedInitialPageView.current = true;
        }
    }, []);
    // Listen for consent changes and track initial page view when consent is granted
    (0, react_1.useEffect)(() => {
        const cleanup = (0, cookiebot_1.onConsentChanged)(() => {
            // When consent changes, if analytics consent is now granted and we haven't tracked initial page view
            if ((0, cookiebot_1.hasAnalyticsConsent)() && !hasTrackedInitialPageView.current) {
                (0, amplitude_1.trackPageView)();
                hasTrackedInitialPageView.current = true;
            }
        });
        return cleanup;
    }, []);
    // Track when pathname changes for SPA navigation
    (0, react_1.useEffect)(() => {
        // Skip the first render if pathname hasn't changed from initial (or if it's the very first render where lastPathname.current is null)
        // The initial page view is handled by the effects above.
        if (lastPathname.current !== null && pathname !== lastPathname.current) {
            (0, amplitude_1.trackPageView)();
        }
        // Update last pathname after processing
        lastPathname.current = pathname || null;
    }, [pathname]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.AnalyticsProvider = AnalyticsProvider;

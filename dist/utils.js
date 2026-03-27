"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultEventProperties = exports.getUtmParams = exports.getLanguage = exports.getReferrerWithoutProtocol = exports.getReferringDomain = exports.getSearchParam = exports.getBreakpoint = exports.getCategoryFromDomain = exports.Utm = void 0;
var Utm;
(function (Utm) {
    Utm["CAMPAIGN"] = "utm_campaign";
    Utm["CONTENT"] = "utm_content";
    Utm["MEDIUM"] = "utm_medium";
    Utm["SOURCE"] = "utm_source";
    Utm["TERM"] = "utm_term";
})(Utm || (exports.Utm = Utm = {}));
const getCategoryFromDomain = () => {
    const domain = window.location.hostname;
    return domain.replace(/\./g, "_");
};
exports.getCategoryFromDomain = getCategoryFromDomain;
const getBreakpoint = () => {
    const width = window.innerWidth;
    if (width <= 480) {
        return "zero";
    }
    else if (width <= 767) {
        return "tablet";
    }
    else if (width <= 991) {
        return "tabletLandscape";
    }
    else {
        return "desktop";
    }
};
exports.getBreakpoint = getBreakpoint;
const getSearchParam = (query) => {
    var _a;
    if (typeof window === 'undefined')
        return '';
    const params = new URLSearchParams(window.location.search);
    return (_a = params.get(query)) !== null && _a !== void 0 ? _a : '';
};
exports.getSearchParam = getSearchParam;
const getReferringDomain = () => {
    var _a;
    const match = document.referrer.match(/:\/\/(.[^/]+)/);
    return (_a = match === null || match === void 0 ? void 0 : match[1]) !== null && _a !== void 0 ? _a : '';
};
exports.getReferringDomain = getReferringDomain;
const getReferrerWithoutProtocol = () => {
    return document.referrer !== '' ? document.referrer.split(/[?#]/)[0] : '';
};
exports.getReferrerWithoutProtocol = getReferrerWithoutProtocol;
const getLanguage = () => {
    var _a;
    return (_a = navigator.language) !== null && _a !== void 0 ? _a : '';
};
exports.getLanguage = getLanguage;
const getUtmParams = () => ({
    utm_campaign: (0, exports.getSearchParam)(Utm.CAMPAIGN),
    utm_content: (0, exports.getSearchParam)(Utm.CONTENT),
    utm_medium: (0, exports.getSearchParam)(Utm.MEDIUM),
    utm_source: (0, exports.getSearchParam)(Utm.SOURCE),
    utm_term: (0, exports.getSearchParam)(Utm.TERM),
});
exports.getUtmParams = getUtmParams;
const getDefaultEventProperties = () => (Object.assign({ category: (0, exports.getCategoryFromDomain)(), page_path: window.location.pathname, page_url: window.location.href, breakpoint: (0, exports.getBreakpoint)(), referrer: document.referrer || undefined, referrer_domain: (0, exports.getReferringDomain)() || undefined, referrer_clean: (0, exports.getReferrerWithoutProtocol)() || undefined, language: (0, exports.getLanguage)() }, (0, exports.getUtmParams)()));
exports.getDefaultEventProperties = getDefaultEventProperties;

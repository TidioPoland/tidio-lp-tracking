export declare enum Utm {
    CAMPAIGN = "utm_campaign",
    CONTENT = "utm_content",
    MEDIUM = "utm_medium",
    SOURCE = "utm_source",
    TERM = "utm_term"
}
export declare const getCategoryFromDomain: () => string;
export declare const getBreakpoint: () => string;
export declare const getSearchParam: (query: string) => string;
export declare const getReferringDomain: () => string;
export declare const getReferrerWithoutProtocol: () => string;
export declare const getLanguage: () => string;
export declare const getUtmParams: () => Record<string, string>;
export declare const getDefaultEventProperties: () => Record<string, string | undefined>;

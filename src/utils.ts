export enum Utm {
    CAMPAIGN = 'utm_campaign',
    CONTENT = 'utm_content',
    MEDIUM = 'utm_medium',
    SOURCE = 'utm_source',
    TERM = 'utm_term',
}

export const getCategoryFromDomain = (): string => {
    const domain = window.location.hostname;
    return domain.replace(/\./g, "_");
};

export const getBreakpoint = (): string => {
    const width = window.innerWidth;

    if (width <= 480) {
        return "zero";
    } else if (width <= 767) {
        return "tablet";
    } else if (width <= 991) {
        return "tabletLandscape";
    } else {
        return "desktop";
    }
};

export const getSearchParam = (query: string): string => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get(query) ?? '';
};

export const getReferringDomain = (): string => {
    const match = document.referrer.match(/:\/\/(.[^/]+)/);
    return match?.[1] ?? '';
};

export const getReferrerWithoutProtocol = (): string => {
    return document.referrer !== '' ? document.referrer.split(/[?#]/)[0] : '';
};

export const getLanguage = (): string => {
    return navigator.language ?? '';
};

export const getUtmParams = (): Record<string, string> => ({
    utm_campaign: getSearchParam(Utm.CAMPAIGN),
    utm_content: getSearchParam(Utm.CONTENT),
    utm_medium: getSearchParam(Utm.MEDIUM),
    utm_source: getSearchParam(Utm.SOURCE),
    utm_term: getSearchParam(Utm.TERM),
});

export const getDefaultEventProperties = (): Record<string, string | undefined> => ({
    category: getCategoryFromDomain(),
    page_path: window.location.pathname,
    page_url: window.location.href,
    breakpoint: getBreakpoint(),
    referrer: document.referrer || undefined,
    referrer_domain: getReferringDomain() || undefined,
    referrer_clean: getReferrerWithoutProtocol() || undefined,
    language: getLanguage(),
    ...getUtmParams(),
});
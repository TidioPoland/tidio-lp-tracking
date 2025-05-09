export const getCategoryFromDomain = () => {
    const domain = window.location.hostname;
    return domain.replace(/\./g, "_");
};

export const getBreakpoint = () => {
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
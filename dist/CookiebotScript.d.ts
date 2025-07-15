interface CookiebotScriptProps {
    /**
     * Optional custom data-cbid. If not provided, uses the default from the original script
     */
    dataCbid?: string;
    /**
     * Optional custom georegions configuration
     */
    dataGeoregions?: string;
    /**
     * Optional locale/culture for Cookiebot. If not provided, will be auto-detected
     */
    locale?: string;
}
export declare const CookiebotScript: ({ dataCbid, dataGeoregions, locale }: CookiebotScriptProps) => import("react/jsx-runtime").JSX.Element;
export {};

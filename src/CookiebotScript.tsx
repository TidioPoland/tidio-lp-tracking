"use client";
import Script from "next/script";

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

export const CookiebotScript = ({
    dataCbid = "8776d47d-b119-406e-b740-75e92a9bb6c7",
    dataGeoregions = "{'region':'US','cbid':'413d7e56-4be1-412e-9e11-166a1381b987'}",
    locale
}: CookiebotScriptProps) => {
    return (
        <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-culture={locale}
            data-georegions={dataGeoregions}
            data-cbid={dataCbid}
            strategy="afterInteractive"
        />
    );
}; 
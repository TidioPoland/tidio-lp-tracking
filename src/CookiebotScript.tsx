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
    dataGeoregions = "{'region':'US','cbid':'968102f8-faa9-4a36-b62d-fd80106ae2ec'}",
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
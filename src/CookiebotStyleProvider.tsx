"use client";
import { useEffect } from "react";

export const CookiebotStyleProvider = () => {
    useEffect(() => {
        // Create style element
        const styleElement = document.createElement('style');
        styleElement.id = 'cookiebot-hide-branding';

        // Hide "Powered by Cybot" branding
        styleElement.textContent = `
            #CybotCookiebotDialogPoweredbyCybot {
                display: none !important;
            }
        `;

        // Add to head
        document.head.appendChild(styleElement);

        // Cleanup function
        return () => {
            const existingStyle = document.getElementById('cookiebot-hide-branding');
            if (existingStyle) {
                existingStyle.remove();
            }
        };
    }, []);

    return null; // This component doesn't render anything visible
}; 
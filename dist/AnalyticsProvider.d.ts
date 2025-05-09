import { ReactNode } from "react";
interface AnalyticsProviderProps {
    apiKey: string;
    children: ReactNode;
}
export declare const AnalyticsProvider: ({ apiKey, children }: AnalyticsProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

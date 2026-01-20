import { ReactNode } from "react";
import { Types } from "@amplitude/analytics-browser";
interface AnalyticsProviderProps {
    apiKey: string;
    children: ReactNode;
    logLevel?: Types.LogLevel;
}
export declare const AnalyticsProvider: ({ apiKey, children, logLevel }: AnalyticsProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

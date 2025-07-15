import { ReactNode } from 'react';
export interface AnalyticsContextType {
    logCTAClick: (source: string, label: string) => void;
    track: (eventName: string, eventProperties?: Record<string, any>) => void;
    setUserId: (userId: string) => void;
    setUserProperties: (properties: Record<string, any>) => void;
}
export interface AnalyticsProviderProps {
    apiKey: string;
    children: ReactNode;
}
export interface ConsentChecker {
    (): boolean;
}
export interface ConsentAwareProviderProps {
    apiKey: string;
    children: ReactNode;
    consentChecker: ConsentChecker;
}
export interface ConditionalAnalyticsHookProps {
    consentChecker: ConsentChecker;
}
export interface ConditionalAnalyticsReturn extends AnalyticsContextType {
    canTrack: boolean;
}

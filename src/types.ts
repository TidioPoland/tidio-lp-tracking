import { ReactNode } from 'react'
import { Types } from '@amplitude/analytics-browser'

export interface AnalyticsContextType {
  logCTAClick: (source: string, label: string) => void
  track: (eventName: string, eventProperties?: Record<string, any>) => void
  setUserId: (userId: string) => void
  setUserProperties: (properties: Record<string, any>) => void
}

export interface AnalyticsProviderProps {
  apiKey: string
  children: ReactNode
  logLevel?: Types.LogLevel
}

export interface ConsentChecker {
  (): boolean
}

export interface ConsentAwareProviderProps {
  apiKey: string
  children: ReactNode
  consentChecker: ConsentChecker
}

export interface ConditionalAnalyticsHookProps {
  consentChecker: ConsentChecker
}

export interface ConditionalAnalyticsReturn extends AnalyticsContextType {
  canTrack: boolean
}
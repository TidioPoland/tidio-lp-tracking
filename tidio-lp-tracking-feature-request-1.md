# Feature Request: Add configurable `logLevel` option to `AnalyticsProvider`

## 🎯 Problem

Currently, the `AnalyticsProvider` hardcodes the Amplitude log level based on `NODE_ENV`:

```typescript
logLevel: process.env.NODE_ENV === 'production'
    ? Types.LogLevel.Warn
    : Types.LogLevel.Debug
```

This means that in development mode, Amplitude automatically logs all events to the console with `LogLevel.Debug`. While this can be helpful for debugging, it becomes noisy when:
- Working on features unrelated to analytics
- Running the app in development for extended periods
- Testing other functionality where analytics logs create clutter

**There's currently no way to override this behavior without modifying the package code.**

## Use Case

As developers, we want to:
- Control the log verbosity during development
- Temporarily disable debug logs when they're not needed
- Keep analytics silent while working on non-tracking features
- Maintain flexibility to enable verbose logging only when debugging tracking issues

## Proposed Solution

Add an optional `logLevel` prop to `AnalyticsProvider` that allows developers to override the default behavior:

```typescript
interface AnalyticsProviderProps {
    apiKey: string;
    children: ReactNode;
    logLevel?: Types.LogLevel; // Optional override
}
```

**Implementation in `amplitude.ts`:**

```typescript
const amplitudeInit = (apiKey?: string, logLevel?: Types.LogLevel) => {
    if (!initialized && typeof window !== 'undefined') {
        if (!apiKey) {
            console.warn("Amplitude API Key not provided to amplitudeInit.");
            return null;
        }
        
        amplitudeInstance = createInstance();
        amplitudeInstance.init(
            apiKey,
            undefined,
            {
                logLevel: logLevel ?? (
                    process.env.NODE_ENV === 'production'
                        ? Types.LogLevel.Warn
                        : Types.LogLevel.Debug
                ),
                defaultTracking: false,
                autocapture: false
            }
        );
        
        initialized = true;
    }
    return amplitudeInstance;
};
```

## Example Usage

**Default behavior (unchanged):**
```tsx
<AnalyticsProvider apiKey={AMPLITUDE_API_KEY}>
  <Component />
</AnalyticsProvider>
// Uses LogLevel.Debug in dev, LogLevel.Warn in production
```

**Disable debug logs in development:**
```tsx
import { Types } from '@amplitude/analytics-browser';

<AnalyticsProvider 
  apiKey={AMPLITUDE_API_KEY}
  logLevel={Types.LogLevel.None}
>
  <Component />
</AnalyticsProvider>
```

**Force verbose logging in production (for debugging):**
```tsx
<AnalyticsProvider 
  apiKey={AMPLITUDE_API_KEY}
  logLevel={Types.LogLevel.Verbose}
>
  <Component />
</AnalyticsProvider>
```

## Benefits

✅ **Backward compatible** - existing code continues to work unchanged  
✅ **Flexible** - developers can choose appropriate log level per environment  
✅ **Clean** - reduces console noise during development when not debugging analytics  
✅ **Simple** - minimal API change, follows TypeScript/React conventions  

## Available Log Levels

From `@amplitude/analytics-browser`:
- `Types.LogLevel.None` - No logs
- `Types.LogLevel.Error` - Only errors
- `Types.LogLevel.Warn` - Warnings and errors
- `Types.LogLevel.Verbose` - All logs including debug info
- `Types.LogLevel.Debug` - Debug information

## References

- Package: `@TidioPoland/tidio-lp-tracking@v0.2.0`
- Amplitude SDK: `@amplitude/analytics-browser@^2.13.3`
- Repository: https://github.com/TidioPoland/tidio-lp-tracking

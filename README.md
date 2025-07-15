# @TidioPoland/tidio-lp-tracking

Reusable analytics module for Tidio projects builded on Next.js using Amplitude with GDPR-compliant Cookiebot integration.

## Features

- Easy integration with React projects.
- Provides an `AnalyticsProvider` to initialize Amplitude.
- Offers a `useAnalytics` hook for common tracking events.
- Exports individual tracking functions for more granular control.
- **GDPR Compliance**: Built-in Cookiebot integration ensures analytics only runs when users consent to cookies.
- **Automatic Consent Handling**: Analytics automatically respects user consent choices and updates when consent changes.

## Installation

```bash
npm install @TidioPoland/tidio-lp-tracking
# or
yarn add @TidioPoland/tidio-lp-tracking
```

## Setup & Usage

### Basic Setup (with Cookiebot GDPR Compliance)

1.  **Add Cookiebot Script to your app**: 

    Add the `CookiebotScript` component to your Next.js app layout or _app.tsx. This should be placed as high as possible in your component tree:

    ```tsx
    // Example: app/layout.tsx (App Router) or _app.tsx (Pages Router)
    import { CookiebotScript } from '@TidioPoland/tidio-lp-tracking';

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <head>
            <CookiebotScript 
              // Optional: pass locale if you want to set it explicitly
              locale="en-US"
              // Optional: custom Cookiebot configuration (defaults provided)
              dataCbid="861c1b39-c9d3-4683-8e87-f8bfdf277ab2"
              dataGeoregions="{'region':'US','cbid':'413d7e56-4be1-412e-9e11-166a1381b987'}"
            />
          </head>
          <body>{children}</body>
        </html>
      );
    }
    ```

2.  **Wrap your application with `AnalyticsProvider`**:

    The `AnalyticsProvider` now automatically respects Cookiebot consent and will only track when the user has agreed to analytics cookies:

    ```tsx
    // Example: App.tsx or _app.tsx
    import { AnalyticsProvider } from '@TidioPoland/tidio-lp-tracking';

    function MyApp({ Component, pageProps }) {
      const AMPLITUDE_API_KEY = 'your_amplitude_api_key_here'; // Ideally from an environment variable

      return (
        <AnalyticsProvider apiKey={AMPLITUDE_API_KEY}>
          <Component {...pageProps} />
        </AnalyticsProvider>
      );
    }

    export default MyApp;
    ```

    **Important**: Analytics will automatically:
    - ✅ **Not track** if user hasn't consented or declined analytics cookies
    - ✅ **Start tracking** when user accepts analytics cookies  
    - ✅ **Stop tracking** if user changes their mind and declines analytics cookies

2.  **Using the `useAnalytics` hook in your components**:

    ```tsx
    import { useAnalytics } from '@TidioPoland/tidio-lp-tracking';

    function MyComponent() {
      const { trackEvent, identifyUser, setUserProps, logPageView, logCTAClick } = useAnalytics();

      const handleButtonClick = () => {
        trackEvent('Button Clicked', { buttonName: 'Learn More' });
      };

      // Example for identifying a user
      // identifyUser('user-123');
      // setUserProps({ plan: 'premium', country: 'Poland' });

      // Example for logging a CTA click (if not using TrackingLink)
      // logCTAClick('Header Banner', 'Sign Up Now');

      return <button onClick={handleButtonClick}>Learn More</button>;
    }
    ```

## Available Functions

### Analytics Functions (GDPR-Compliant)

All analytics functions automatically respect Cookiebot consent. If the user hasn't consented to analytics cookies, these functions will silently skip tracking:

**Via `useAnalytics` hook:**
-   `trackEvent(eventName, eventProperties)`: Track custom events
-   `identifyUser(userId)`: Set the user ID for tracking
-   `setUserProps(properties)`: Set user properties  
-   `logPageView()`: Track a page view
-   `logCTAClick(position, ctaText)`: Track a CTA click event

**Direct imports:**
- `track(eventName, eventProperties)`
- `trackPageView()`
- `trackCTAClick(ctaPosition, ctaText)`
- `setUserId(userId)`
- `setUserProperties(properties)`

### Consent Management Functions

For advanced use cases, you can check consent status manually:

```tsx
import { 
  hasAnalyticsConsent, 
  hasMarketingConsent, 
  hasPreferencesConsent,
  isCookiebotLoaded,
  getConsentId,
  onConsentChanged
} from '@TidioPoland/tidio-lp-tracking';

// Check if user has consented to analytics
if (hasAnalyticsConsent()) {
  // Safe to track analytics
}

// Listen for consent changes
useEffect(() => {
  const cleanup = onConsentChanged(() => {
    console.log('User updated their consent preferences');
    if (hasAnalyticsConsent()) {
      // User just accepted analytics
    }
  });
  return cleanup;
}, []);
```

**Available consent functions:**
- `hasAnalyticsConsent()`: Returns `true` if user consented to statistics/analytics cookies
- `hasMarketingConsent()`: Returns `true` if user consented to marketing cookies  
- `hasPreferencesConsent()`: Returns `true` if user consented to preference cookies
- `isCookiebotLoaded()`: Returns `true` if Cookiebot has loaded and user has responded
- `getConsentId()`: Returns the Cookiebot consent ID (for audit trails)
- `onConsentChanged(callback)`: Listen for consent changes (returns cleanup function)

## Cookiebot Configuration

### Default Configuration

The `CookiebotScript` comes with sensible defaults:

```tsx
<CookiebotScript />
```

This uses:
- **data-cbid**: `"861c1b39-c9d3-4683-8e87-f8bfdf277ab2"`
- **data-georegions**: `"{'region':'US','cbid':'413d7e56-4be1-412e-9e11-166a1381b987'}"`
- **data-culture**: Auto-detected (or pass `locale` prop)

### Custom Configuration  

```tsx
<CookiebotScript 
  dataCbid="your-custom-cookiebot-id"
  dataGeoregions="{'region':'EU','cbid':'your-eu-cookiebot-id'}"
  locale="en-GB"
/>
```

### Cookie Categories

This package maps Cookiebot categories to analytics:
- **Statistics/Analytics**: Required for all Amplitude tracking
- **Marketing**: Could be used for marketing-specific events (available via `hasMarketingConsent()`)
- **Preferences**: Available for preference-related tracking (available via `hasPreferencesConsent()`)
- **Necessary**: Always allowed (not checked for analytics)

## Hide Cookiebot Branding

The `CookiebotStyleProvider` automatically hides the "Powered by Cybot" branding from the consent banner:

```tsx
import { CookiebotScript, CookiebotStyleProvider } from '@TidioPoland/tidio-lp-tracking';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <CookiebotScript />
        <CookiebotStyleProvider />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

This component automatically applies:
```css
#CybotCookiebotDialogPoweredbyCybot {
    display: none !important;
}
```

## Note on Page View Tracking

The `AnalyticsProvider` automatically tracks an initial page view when it loads **and the user has consented**.
- If you are building a Single Page Application (SPA), the provider automatically tracks route changes
- Page views are only tracked when `hasAnalyticsConsent()` returns `true`
- When a user initially accepts consent, the current page view is automatically tracked

## Creating a Custom `TrackingLink` for Next.js (Optional)

If you are using Next.js in your project, you might want to create a wrapper around the `next/link` component to automatically track CTA clicks. Here's an example of how you can do this:

Create a file, for example, `components/TrackingLink.tsx` in your Next.js project:

```tsx
"use client";

import { useAnalytics } from '@TidioPoland/tidio-lp-tracking'; // Or your package path
import Link from 'next/link';
import React from 'react';

interface TrackingLinkProps {
    href: string;
    className?: string;
    eventName: string; // This will be used as the 'position' for logCTAClick
    children: React.ReactNode;
    target?: string;
    rel?: string;
}

export default function TrackingLink({
    href,
    className,
    eventName,
    children,
    target,
    rel
}: TrackingLinkProps) {
    const { logCTAClick } = useAnalytics();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Attempt to get meaningful text for the CTA
        const ctaText = 
            typeof children === 'string' 
                ? children 
                : e.currentTarget.textContent?.trim() || 'Unknown CTA Text';

        logCTAClick(eventName, ctaText);
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={handleClick}
            target={target}
            rel={rel}
        >
            {children}
        </Link>
    );
} 
```

**Usage in your Next.js components:**

```tsx
import TrackingLink from '../components/TrackingLink'; // Adjust path as needed

function MyPage() {
  return (
    <div>
      <TrackingLink 
        href="/pricing"
        eventName="Button Inside Beam Primary" 
        className="some-style"
      >
        View Pricing
      </TrackingLink>
      <TrackingLink 
        href="/features"
        eventName="Button Inside Cta Testimonial Secondary"
        className="another-style"
      >
        Learn More
      </TrackingLink>
    </div>
  );
}
```

This approach allows you to keep your analytics logic encapsulated while providing a convenient, trackable link component for Next.js projects.

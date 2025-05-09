# @TidioPoland/tidio-lp-tracking

Reusable analytics module for Tidio projects builded on Next.js using Amplitude.

## Features

- Easy integration with React projects.
- Provides an `AnalyticsProvider` to initialize Amplitude.
- Offers a `useAnalytics` hook for common tracking events.
- Exports individual tracking functions for more granular control.

## Installation

```bash
npm install @TidioPoland/tidio-lp-tracking
# or
yarn add @TidioPoland/tidio-lp-tracking
```

## Setup & Usage

1.  **Wrap your application (or relevant part) with `AnalyticsProvider`**:

    You need to provide your Amplitude API key to the `AnalyticsProvider`.

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

The core tracking logic resides in `src/amplitude.ts`. The following functions are available through the `useAnalytics` hook or can be imported directly:

-   `trackEvent(eventName, eventProperties)`: Track custom events (via `useAnalytics`).
-   `identifyUser(userId)`: Set the user ID for tracking (via `useAnalytics` as `identifyUser`).
-   `setUserProps(properties)`: Set user properties (via `useAnalytics` as `setUserProps`).
-   `logPageView()`: Track a page view (via `useAnalytics` or automatically on provider load).
-   `logCTAClick(position, ctaText)`: Track a CTA click event (via `useAnalytics`).

Additionally, you can import more specific functions directly if needed:
- `track(eventName, eventProperties)`
- `trackPageView()`
- `trackCTAClick(ctaPosition, ctaText)`
- `setUserId(userId)`
- `setUserProperties(properties)`

## Note on Page View Tracking

The `AnalyticsProvider` automatically tracks an initial page view when it loads.
If you are building a Single Page Application (SPA) and need to track page views on route changes, you will need to call `logPageView()` (from `useAnalytics`) or `trackPageView()` (direct import) manually after each route change. The provider no longer uses Next.js specific hooks for automatic SPA route change tracking.

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

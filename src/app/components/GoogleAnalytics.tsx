'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('[GoogleAnalytics] NEXT_PUBLIC_GA_MEASUREMENT_ID is not set');
    } else {
      console.log('[GoogleAnalytics] Initialized with ID:', GA_MEASUREMENT_ID);
    }
  }, []);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

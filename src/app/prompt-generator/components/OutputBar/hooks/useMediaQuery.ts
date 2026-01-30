/**
 * Custom hook for responsive media query detection
 * SSR-safe implementation that handles hydration correctly
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect if a media query matches
 * Returns false during SSR and updates on client after hydration
 *
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Default to false for SSR - prevents hydration mismatch
  const [matches, setMatches] = useState(false);

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    // Guard for SSR
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
      return () => mediaQueryList.removeEventListener('change', handleChange);
    }

    // Legacy browsers (Safari < 14)
    mediaQueryList.addListener(handleChange);
    return () => mediaQueryList.removeListener(handleChange);
  }, [query, handleChange]);

  return matches;
}

/**
 * Convenience hook for mobile detection
 *
 * @param breakpoint - Width breakpoint in pixels (default: 768)
 * @returns boolean indicating if viewport is below breakpoint
 */
export function useIsMobile(breakpoint = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

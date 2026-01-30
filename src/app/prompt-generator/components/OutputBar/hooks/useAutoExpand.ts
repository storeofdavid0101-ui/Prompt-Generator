/**
 * Custom hook for scroll-based auto-expansion
 * Detects when user scrolls to bottom and triggers expansion
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { SCROLL_TRIGGER_OFFSET, SCROLL_THROTTLE_MS } from '../constants';

interface UseAutoExpandOptions {
  /** Whether auto-expand is enabled */
  enabled: boolean;
  /** Callback when bottom scroll is detected */
  onBottomReached: () => void;
}

/**
 * Throttle function to limit callback execution frequency
 *
 * @param callback - Function to throttle
 * @param delay - Minimum time between executions in ms
 * @returns Throttled function
 */
function throttle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      callback(...args);
    } else if (!timeoutId) {
      // Schedule trailing call
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        callback(...args);
      }, delay - timeSinceLastCall);
    }
  }) as T;
}

/**
 * Hook that monitors scroll position and triggers callback when user
 * reaches bottom of page. Includes throttling for performance.
 *
 * @param options - Configuration options
 */
export function useAutoExpand({
  enabled,
  onBottomReached,
}: UseAutoExpandOptions): void {
  const callbackRef = useRef(onBottomReached);

  // Keep callback ref updated to avoid stale closures
  useEffect(() => {
    callbackRef.current = onBottomReached;
  }, [onBottomReached]);

  const checkScroll = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const scrolledToBottom =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - SCROLL_TRIGGER_OFFSET;

    if (scrolledToBottom) {
      callbackRef.current();
    }
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    const throttledCheck = throttle(checkScroll, SCROLL_THROTTLE_MS);

    window.addEventListener('scroll', throttledCheck, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledCheck);
    };
  }, [enabled, checkScroll]);
}

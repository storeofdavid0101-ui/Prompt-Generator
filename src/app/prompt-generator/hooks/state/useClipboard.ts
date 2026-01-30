/**
 * Clipboard State Hook
 *
 * Manages clipboard operations with feedback state.
 * Provides a copied indicator that auto-clears after a delay.
 *
 * @module hooks/state/useClipboard
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ClipboardState } from './types';
import { CLIPBOARD_FEEDBACK_DURATION } from './constants';

/**
 * Hook for managing clipboard operations
 *
 * @returns Clipboard state and copy function
 *
 * @example
 * ```tsx
 * const clipboard = useClipboard();
 *
 * // Copy text
 * await clipboard.copy('Hello world');
 *
 * // Check if recently copied (for UI feedback)
 * if (clipboard.copied) {
 *   // Show success indicator
 * }
 * ```
 */
export function useClipboard(): ClipboardState {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Clean up timeout on unmount
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /**
   * Copy text to clipboard with feedback
   * Sets copied state to true, then auto-clears after delay
   */
  const copy = useCallback(async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Auto-clear copied state after delay
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, CLIPBOARD_FEEDBACK_DURATION);
    } catch (error) {
      // Log error but don't throw - clipboard access may be blocked
      console.error('Failed to copy to clipboard:', error);
    }
  }, []);

  return {
    copied,
    copy,
  };
}

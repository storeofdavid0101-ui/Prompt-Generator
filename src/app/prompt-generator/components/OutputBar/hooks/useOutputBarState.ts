/**
 * State management hook for OutputBar component
 * Consolidates view state logic into a single, predictable state machine
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import type { OutputBarViewState } from '../types';
import { useIsMobile } from './useMediaQuery';
import { MOBILE_BREAKPOINT } from '../constants';

interface UseOutputBarStateReturn {
  /** Current view state */
  viewState: OutputBarViewState;
  /** Whether the bar is in minimized state */
  isMinimized: boolean;
  /** Toggle between minimized and collapsed states */
  toggleMinimize: () => void;
  /** Handle click on preview area */
  handlePreviewClick: () => void;
  /** Handle click on expand/collapse icon */
  handleToggleExpand: () => void;
}

/**
 * State machine transitions for OutputBar
 * Defines valid state transitions based on user actions
 */
const STATE_TRANSITIONS: Record<
  OutputBarViewState,
  {
    onMinimizeToggle: OutputBarViewState;
    onPreviewClick: OutputBarViewState;
    onExpandToggle: OutputBarViewState;
  }
> = {
  minimized: {
    onMinimizeToggle: 'collapsed',
    onPreviewClick: 'collapsed', // Not visible in minimized, but handle gracefully
    onExpandToggle: 'collapsed',
  },
  collapsed: {
    onMinimizeToggle: 'minimized',
    onPreviewClick: 'expanded',
    onExpandToggle: 'expanded',
  },
  expanded: {
    onMinimizeToggle: 'minimized',
    onPreviewClick: 'expanded', // No-op when already expanded
    onExpandToggle: 'fully-expanded',
  },
  'fully-expanded': {
    onMinimizeToggle: 'minimized',
    onPreviewClick: 'fully-expanded', // No-op when fully expanded
    onExpandToggle: 'collapsed', // Collapse back to single line
  },
};

/**
 * Custom hook for managing OutputBar view state
 * Handles state transitions, mobile detection, and auto-expand behavior
 *
 * @returns State and action handlers for OutputBar
 */
export function useOutputBarState(): UseOutputBarStateReturn {
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  // Initialize state based on device type
  // Mobile starts minimized, desktop starts collapsed
  const [viewState, setViewState] = useState<OutputBarViewState>(() => {
    // SSR default - will be corrected on hydration
    return 'collapsed';
  });

  // Sync initial state with device type after hydration
  // Using a ref to track if we've done the initial sync
  const [hasInitialized, setHasInitialized] = useState(false);

  // Set initial state based on mobile detection (runs once after hydration)
  useMemo(() => {
    if (!hasInitialized && typeof window !== 'undefined') {
      setViewState(isMobile ? 'minimized' : 'collapsed');
      setHasInitialized(true);
    }
  }, [isMobile, hasInitialized]);

  // Auto-expand disabled - was causing layout jumping when scrolling to bottom
  // The height change of the OutputBar would affect scroll position,
  // creating a feedback loop of repeated expansions
  // Users can manually expand the bar by clicking on it

  // Action handlers using state machine transitions
  const toggleMinimize = useCallback(() => {
    setViewState((current) => STATE_TRANSITIONS[current].onMinimizeToggle);
  }, []);

  const handlePreviewClick = useCallback(() => {
    setViewState((current) => STATE_TRANSITIONS[current].onPreviewClick);
  }, []);

  const handleToggleExpand = useCallback(() => {
    setViewState((current) => STATE_TRANSITIONS[current].onExpandToggle);
  }, []);

  const isMinimized = viewState === 'minimized';

  return {
    viewState,
    isMinimized,
    toggleMinimize,
    handlePreviewClick,
    handleToggleExpand,
  };
}

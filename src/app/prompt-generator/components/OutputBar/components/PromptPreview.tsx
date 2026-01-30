/**
 * PromptPreview component for OutputBar
 * Displays the generated prompt with expand/collapse functionality
 */

'use client';

import { memo, useMemo, useCallback, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import type { PromptPreviewProps, OutputBarViewState } from '../types';
import {
  EXPANDED_PREVIEW_MAX_HEIGHT,
  TEXT_TRANSITION,
  ARIA_LABELS,
} from '../constants';

/**
 * Determines if preview should show scrollable content
 */
function isScrollable(viewState: OutputBarViewState): boolean {
  return viewState === 'expanded';
}

/**
 * Determines if preview content should be expanded
 */
function isContentExpanded(viewState: OutputBarViewState): boolean {
  return viewState === 'expanded' || viewState === 'fully-expanded';
}

/**
 * Prompt preview section with expandable text display
 * Handles three states: collapsed (single line), expanded (scrollable), fully-expanded
 */
export const PromptPreview = memo(function PromptPreview({
  prompt,
  viewState,
  onPreviewClick,
  onToggleExpand,
  themeColors,
}: PromptPreviewProps) {
  const expanded = isContentExpanded(viewState);
  const scrollable = isScrollable(viewState);

  // Memoize container styles
  const containerStyles = useMemo(
    () => ({
      backgroundColor: themeColors.promptBg,
      border: `1px solid ${themeColors.borderColor}`,
      maxHeight: scrollable ? EXPANDED_PREVIEW_MAX_HEIGHT : 'none',
      overflowY: scrollable ? ('auto' as const) : ('hidden' as const),
    }),
    [themeColors.promptBg, themeColors.borderColor, scrollable]
  );

  // Memoize text styles
  const textStyles = useMemo(
    () => ({
      color: themeColors.textPrimary,
      userSelect: 'none' as const,
      WebkitUserSelect: 'none' as const,
    }),
    [themeColors.textPrimary]
  );

  // Handle icon click with event propagation stop
  const handleIconClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onToggleExpand();
    },
    [onToggleExpand]
  );

  // Prevent text selection/copy
  const handleCopyPrevention = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
  }, []);

  // Handle container click for expansion
  const handleContainerClick = useCallback(() => {
    if (!expanded) {
      onPreviewClick();
    }
  }, [expanded, onPreviewClick]);

  return (
    <div
      className="rounded-xl p-3 mb-3 cursor-pointer transition-all"
      style={containerStyles}
      onClick={handleContainerClick}
      role="region"
      aria-label={ARIA_LABELS.promptPreview}
      aria-expanded={expanded}
    >
      <div className="flex items-start gap-2">
        {/* Expand/Collapse Icon */}
        <button
          type="button"
          className="flex-shrink-0 mt-0.5 p-0.5 -m-0.5 rounded hover:bg-black/5 transition-colors"
          onClick={handleIconClick}
          aria-label={expanded ? ARIA_LABELS.collapsePrompt : ARIA_LABELS.expandPrompt}
        >
          {expanded ? (
            <EyeOff
              className="w-4 h-4"
              style={{ color: themeColors.accent }}
              aria-hidden="true"
            />
          ) : (
            <Eye
              className="w-4 h-4"
              style={{ color: themeColors.accent }}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Prompt Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={expanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TEXT_TRANSITION}
            className={`text-xs font-mono leading-relaxed select-none ${
              expanded ? '' : 'line-clamp-1'
            }`}
            style={textStyles}
            onCopy={handleCopyPrevention}
          >
            {prompt}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Expand Hint */}
      {!expanded && (
        <p
          className="text-[10px] mt-1 ml-6"
          style={{ color: themeColors.textTertiary }}
        >
          Click to expand
        </p>
      )}
    </div>
  );
});

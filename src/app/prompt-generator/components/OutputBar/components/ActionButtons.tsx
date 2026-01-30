/**
 * ActionButtons component for OutputBar
 * Renders reset and copy buttons with consistent styling
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Copy, Check } from 'lucide-react';
import type { ActionButtonsProps } from '../types';
import { BUTTON_ANIMATION, ARIA_LABELS } from '../constants';

/**
 * Action buttons for the output bar
 * Supports both compact (minimized) and full variants
 */
export const ActionButtons = memo(function ActionButtons({
  copied,
  onReset,
  onCopy,
  themeColors,
  compact = false,
}: ActionButtonsProps) {
  const resetButtonStyles = compact
    ? {
        borderColor: themeColors.borderColor,
        color: themeColors.textSecondary,
      }
    : {
        backgroundColor: 'transparent',
        borderColor: themeColors.borderColor,
        color: themeColors.textSecondary,
      };

  const copyButtonStyles = {
    backgroundColor: copied ? themeColors.success : themeColors.accent,
    color: '#fff',
  };

  if (compact) {
    return (
      <div className="flex gap-2">
        <motion.button
          whileTap={BUTTON_ANIMATION.whileTap}
          onClick={onReset}
          className="p-2 rounded-lg border"
          style={resetButtonStyles}
          aria-label={ARIA_LABELS.resetButton}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
        </motion.button>

        <motion.button
          whileTap={BUTTON_ANIMATION.whileTap}
          onClick={onCopy}
          className="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          style={copyButtonStyles}
          aria-label={copied ? ARIA_LABELS.copiedButton : ARIA_LABELS.copyButton}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" aria-hidden="true" />
              <span>Copy Prompt</span>
            </>
          )}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <motion.button
        {...BUTTON_ANIMATION}
        onClick={onReset}
        className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border"
        style={resetButtonStyles}
        aria-label={ARIA_LABELS.resetButton}
      >
        <RotateCcw className="w-4 h-4" aria-hidden="true" />
        <span>Reset</span>
      </motion.button>

      <motion.button
        {...BUTTON_ANIMATION}
        onClick={onCopy}
        className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
        style={copyButtonStyles}
        aria-label={copied ? ARIA_LABELS.copiedButton : ARIA_LABELS.copyButton}
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" aria-hidden="true" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" aria-hidden="true" />
            <span>Copy Prompt</span>
          </>
        )}
      </motion.button>
    </div>
  );
});

/**
 * Negative Prompt Input Component
 *
 * Displays either a text input for models that support negative prompts,
 * or an informational message for models that use natural language processing.
 *
 * @module AdvancedTools/NegativePromptInput
 */

'use client';

import { memo, useCallback, useMemo, type ChangeEvent } from 'react';
import { modelConfigs } from '../../config';
import { NEGATIVE_PROMPT_CONFIG, CSS_CLASSES, OPACITY } from './constants';
import type { NegativePromptInputProps } from './types';

/**
 * Input section for negative prompts with model-aware rendering
 *
 * Automatically adapts its display based on whether the selected AI model
 * supports negative prompts or uses natural language processing.
 *
 * @example
 * ```tsx
 * <NegativePromptInput
 *   value={negativePrompt}
 *   selectedModel="midjourney"
 *   isLocked={false}
 *   onChange={handleChange}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const NegativePromptInput = memo(function NegativePromptInput({
  value,
  selectedModel,
  isLocked,
  onChange,
  themeColors,
}: NegativePromptInputProps) {
  const modelConfig = modelConfigs[selectedModel];
  const supportsNegativePrompt = modelConfig.supportsNegativePrompt;

  /**
   * Memoized change handler to prevent unnecessary re-renders
   */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  /**
   * Memoized styles for the textarea
   */
  const textareaStyles = useMemo(
    () => ({
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: themeColors.textPrimary,
      opacity: isLocked ? OPACITY.disabled : OPACITY.enabled,
    }),
    [themeColors, isLocked]
  );

  /**
   * Memoized styles for the unsupported message container
   */
  const unsupportedContainerStyles = useMemo(
    () => ({
      backgroundColor: themeColors.inputBackground,
      borderColor: `${themeColors.warning}40`,
    }),
    [themeColors]
  );

  if (!supportsNegativePrompt) {
    return (
      <div
        className="p-3 rounded-lg border"
        style={unsupportedContainerStyles}
        role="status"
        aria-live="polite"
      >
        <p
          className="text-xs font-medium"
          style={{ color: themeColors.textSecondary }}
        >
          Negative prompts not supported
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: themeColors.textTertiary }}
        >
          {modelConfig.name} uses natural language processing.
          Describe what you want instead of what to avoid.
        </p>
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor="negative-prompt-input"
        className={CSS_CLASSES.label}
        style={{ color: themeColors.textTertiary }}
      >
        Negative Prompt (Things to Avoid)
      </label>
      <textarea
        id="negative-prompt-input"
        value={value}
        onChange={handleChange}
        placeholder={NEGATIVE_PROMPT_CONFIG.placeholder}
        rows={NEGATIVE_PROMPT_CONFIG.rows}
        disabled={isLocked}
        aria-describedby="negative-prompt-hint"
        className={CSS_CLASSES.input}
        style={textareaStyles}
      />
      <p
        id="negative-prompt-hint"
        className="text-xs mt-1"
        style={{ color: themeColors.textTertiary }}
      >
        Uses {modelConfig.negativeParam} for {modelConfig.name}
      </p>
    </div>
  );
});

NegativePromptInput.displayName = 'NegativePromptInput';

/**
 * Styled Input Component
 *
 * Consistent styled text input with theme support.
 * Handles disabled states and accessibility.
 *
 * @module CameraSettings/components/StyledInput
 */

'use client';

import { memo, useCallback, useMemo, type ChangeEvent } from 'react';
import { CSS_CLASSES, OPACITY } from '../constants';
import type { ThemeColors } from '../../../config/types';

interface StyledInputProps {
  /** Current input value */
  value: string;
  /** Placeholder text */
  placeholder: string;
  /** Whether the input is disabled */
  isLocked: boolean;
  /** Theme color configuration */
  themeColors: ThemeColors;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * Themed text input with consistent styling
 *
 * @example
 * ```tsx
 * <StyledInput
 *   value={customCamera}
 *   placeholder="Enter custom camera"
 *   isLocked={false}
 *   themeColors={themeColors}
 *   onChange={handleCustomCameraChange}
 *   ariaLabel="Custom camera input"
 * />
 * ```
 */
export const StyledInput = memo(function StyledInput({
  value,
  placeholder,
  isLocked,
  themeColors,
  onChange,
  ariaLabel,
}: StyledInputProps) {
  /**
   * Handle input change event
   */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  /**
   * Memoized inline styles
   */
  const inputStyles = useMemo(
    () => ({
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: themeColors.textPrimary,
      opacity: isLocked ? OPACITY.disabled : OPACITY.enabled,
    }),
    [themeColors, isLocked]
  );

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={isLocked}
      aria-label={ariaLabel}
      className={CSS_CLASSES.input}
      style={inputStyles}
    />
  );
});

StyledInput.displayName = 'StyledInput';

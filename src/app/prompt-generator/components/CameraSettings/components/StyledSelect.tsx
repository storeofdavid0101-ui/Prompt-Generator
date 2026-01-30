/**
 * Styled Select Component
 *
 * Consistent styled dropdown select with theme support.
 * Handles disabled states and accessibility.
 *
 * @module CameraSettings/components/StyledSelect
 */

'use client';

import { memo, useCallback, useMemo, type ChangeEvent } from 'react';
import { CSS_CLASSES, OPACITY } from '../constants';
import type { StyledSelectProps } from '../types';

/**
 * Themed select dropdown with consistent styling
 *
 * @example
 * ```tsx
 * <StyledSelect
 *   value={selectedLens}
 *   options={lensOptions}
 *   onChange={handleLensChange}
 *   isLocked={false}
 *   themeColors={themeColors}
 *   ariaLabel="Select lens"
 * />
 * ```
 */
export const StyledSelect = memo(function StyledSelect({
  value,
  options,
  onChange,
  isLocked,
  themeColors,
  ariaLabel,
  className = '',
}: StyledSelectProps) {
  /**
   * Handle select change event
   */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  /**
   * Memoized inline styles
   */
  const selectStyles = useMemo(
    () => ({
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: themeColors.textPrimary,
      opacity: isLocked ? OPACITY.disabled : OPACITY.enabled,
    }),
    [themeColors, isLocked]
  );

  const cssClass = className
    ? `${CSS_CLASSES.input} ${className}`
    : CSS_CLASSES.input;

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={isLocked}
      aria-label={ariaLabel}
      className={cssClass}
      style={selectStyles}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          style={{ color: option.disabled ? '#999' : undefined }}
        >
          {option.label}
          {option.suffix || ''}
        </option>
      ))}
    </select>
  );
});

StyledSelect.displayName = 'StyledSelect';

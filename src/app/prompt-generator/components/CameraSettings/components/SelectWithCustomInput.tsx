/**
 * Select With Custom Input Component
 *
 * Combines a dropdown select with a text input for custom values.
 * Used for Camera, Lens, and Shot Type selections.
 *
 * @module CameraSettings/components/SelectWithCustomInput
 */

'use client';

import { memo, useMemo } from 'react';
import { StyledSelect } from './StyledSelect';
import { StyledInput } from './StyledInput';
import { CSS_CLASSES } from '../constants';
import type { SelectWithCustomInputProps } from '../types';

/**
 * Combined select dropdown with custom text input
 *
 * @example
 * ```tsx
 * <SelectWithCustomInput
 *   label="Camera"
 *   selectedValue={selectedCamera}
 *   customValue={customCamera}
 *   options={cameraOptions}
 *   customPlaceholder="Or enter custom camera"
 *   onSelectChange={handleCameraChange}
 *   onCustomChange={handleCustomCameraChange}
 *   isLocked={false}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const SelectWithCustomInput = memo(function SelectWithCustomInput({
  label,
  selectedValue,
  customValue,
  options,
  customPlaceholder,
  onSelectChange,
  onCustomChange,
  isLocked,
  themeColors,
  selectAriaLabel,
  inputAriaLabel,
}: SelectWithCustomInputProps) {
  /**
   * Memoized label styles
   */
  const labelStyles = useMemo(
    () => ({ color: themeColors.textTertiary }),
    [themeColors]
  );

  return (
    <div>
      <label
        className={CSS_CLASSES.label}
        style={labelStyles}
      >
        {label}
      </label>
      <div className="mb-2">
        <StyledSelect
          value={selectedValue}
          options={options}
          onChange={onSelectChange}
          isLocked={isLocked}
          themeColors={themeColors}
          ariaLabel={selectAriaLabel}
        />
      </div>
      <StyledInput
        value={customValue}
        placeholder={customPlaceholder}
        onChange={onCustomChange}
        isLocked={isLocked}
        themeColors={themeColors}
        ariaLabel={inputAriaLabel}
      />
    </div>
  );
});

SelectWithCustomInput.displayName = 'SelectWithCustomInput';

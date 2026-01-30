/**
 * Shot Type Selector Component
 *
 * Dropdown selector for cinematographic shot types
 * with custom shot input support.
 *
 * @module CameraSettings/ShotTypeSelector
 */

'use client';

import { memo, useMemo } from 'react';
import { shotOptions } from '../../config';
import { SelectWithCustomInput } from './components';
import { ARIA_LABELS, PLACEHOLDERS } from './constants';
import type { ShotTypeSelectorProps, SelectOption } from './types';

/**
 * Shot type selector with custom input
 *
 * @example
 * ```tsx
 * <ShotTypeSelector
 *   selectedShot={selectedShot}
 *   customShot={customShot}
 *   onShotChange={handleShotChange}
 *   onCustomShotChange={handleCustomShotChange}
 *   isLocked={false}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const ShotTypeSelector = memo(function ShotTypeSelector({
  selectedShot,
  customShot,
  onShotChange,
  onCustomShotChange,
  isLocked,
  themeColors,
}: ShotTypeSelectorProps) {
  /**
   * Transform shot options to SelectOption format
   */
  const options: SelectOption[] = useMemo(
    () => shotOptions.map((shot) => ({
      label: shot.label,
      value: shot.label,
    })),
    []
  );

  return (
    <SelectWithCustomInput
      label="Shot Type"
      selectedValue={selectedShot}
      customValue={customShot}
      options={options}
      customPlaceholder={PLACEHOLDERS.customShot}
      onSelectChange={onShotChange}
      onCustomChange={onCustomShotChange}
      isLocked={isLocked}
      themeColors={themeColors}
      selectAriaLabel={ARIA_LABELS.shotSelect}
      inputAriaLabel={ARIA_LABELS.shotCustom}
    />
  );
});

ShotTypeSelector.displayName = 'ShotTypeSelector';

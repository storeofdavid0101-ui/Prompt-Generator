/**
 * Shot Type Selector Component
 *
 * Stylish dropdown selector for cinematographic shot types
 * with categories and custom shot input support.
 *
 * @module CameraSettings/ShotTypeSelector
 */

'use client';

import { memo } from 'react';
import { helpDescriptions } from '../../config';
import { ShotTypeDropdown } from './components';
import { HelpLabel } from '../ui';
import type { ShotTypeSelectorProps } from './types';

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
  return (
    <div>
      <HelpLabel
        label="Shot Type"
        help={helpDescriptions.shotType}
        themeColors={themeColors}
        className="mb-2"
      />
      <ShotTypeDropdown
        selectedShot={selectedShot}
        customShot={customShot}
        onShotChange={onShotChange}
        onCustomShotChange={onCustomShotChange}
        isLocked={isLocked}
        themeColors={themeColors}
      />
    </div>
  );
});

ShotTypeSelector.displayName = 'ShotTypeSelector';

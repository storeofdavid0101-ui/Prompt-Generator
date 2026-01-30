/**
 * Lens Selector Component
 *
 * Handles three distinct lens selection modes:
 * 1. Fixed lens - Camera has non-interchangeable lens
 * 2. Zoom range - Camera has built-in zoom with limited options
 * 3. Standard - Stylish dropdown with categories and custom input
 *
 * @module CameraSettings/LensSelector
 */

'use client';

import { memo, useMemo } from 'react';
import { Lock, Camera } from 'lucide-react';
import { helpDescriptions } from '../../config';
import { StyledSelect, InfoBanner, LensDropdown } from './components';
import { HelpLabel } from '../ui';
import { ARIA_LABELS } from './constants';
import type { LensSelectorProps, SelectOption } from './types';

/**
 * Lens selector with three rendering modes
 *
 * @example
 * ```tsx
 * <LensSelector
 *   selectedLens={selectedLens}
 *   customLens={customLens}
 *   fixedLens={conflicts.fixedLens}
 *   zoomRange={conflicts.zoomRange}
 *   onLensChange={handleLensChange}
 *   onCustomLensChange={handleCustomLensChange}
 *   isLocked={false}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const LensSelector = memo(function LensSelector({
  selectedLens,
  customLens,
  fixedLens,
  zoomRange,
  onLensChange,
  onCustomLensChange,
  isLocked,
  themeColors,
}: LensSelectorProps) {
  /**
   * Zoom range options
   */
  const zoomOptions: SelectOption[] = useMemo(
    () => zoomRange?.options.map((opt) => ({ label: opt, value: opt })) || [],
    [zoomRange]
  );

  // Fixed lens mode - display locked indicator
  if (fixedLens) {
    return (
      <div>
        <HelpLabel
          label="Lens"
          help={helpDescriptions.lens}
          themeColors={themeColors}
          className="mb-2"
        />
        <InfoBanner
          icon={Lock}
          text={fixedLens}
          suffix="(fixed)"
          variant="locked"
          themeColors={themeColors}
        />
      </div>
    );
  }

  // Zoom range mode - limited options from camera's built-in zoom
  if (zoomRange) {
    return (
      <div>
        <HelpLabel
          label="Lens"
          help={helpDescriptions.lens}
          themeColors={themeColors}
          className="mb-2"
        />
        <InfoBanner
          icon={Camera}
          text={`Built-in zoom: ${zoomRange.range}`}
          variant="info"
          themeColors={themeColors}
        />
        <StyledSelect
          value={selectedLens}
          options={zoomOptions}
          onChange={onLensChange}
          isLocked={isLocked}
          themeColors={themeColors}
          ariaLabel={ARIA_LABELS.lensSelect}
        />
      </div>
    );
  }

  // Standard mode - stylish dropdown with categories and custom input
  return (
    <div>
      <HelpLabel
        label="Lens"
        help={helpDescriptions.lens}
        themeColors={themeColors}
        className="mb-2"
      />
      <LensDropdown
        selectedLens={selectedLens}
        customLens={customLens}
        onLensChange={onLensChange}
        onCustomLensChange={onCustomLensChange}
        isLocked={isLocked}
        themeColors={themeColors}
      />
    </div>
  );
});

LensSelector.displayName = 'LensSelector';

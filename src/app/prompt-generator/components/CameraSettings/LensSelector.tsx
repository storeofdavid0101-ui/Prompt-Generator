/**
 * Lens Selector Component
 *
 * Handles three distinct lens selection modes:
 * 1. Fixed lens - Camera has non-interchangeable lens
 * 2. Zoom range - Camera has built-in zoom with limited options
 * 3. Standard - Full lens selection with custom input
 *
 * @module CameraSettings/LensSelector
 */

'use client';

import { memo, useMemo } from 'react';
import { Lock, Camera } from 'lucide-react';
import { lensOptions } from '../../config';
import { StyledSelect, StyledInput, InfoBanner } from './components';
import { CSS_CLASSES, ARIA_LABELS, PLACEHOLDERS } from './constants';
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
   * Memoized label styles
   */
  const labelStyles = useMemo(
    () => ({ color: themeColors.textTertiary }),
    [themeColors]
  );

  /**
   * Standard lens options
   */
  const standardOptions: SelectOption[] = useMemo(
    () => lensOptions.map((lens) => ({ label: lens, value: lens })),
    []
  );

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
        <label className={CSS_CLASSES.label} style={labelStyles}>
          Lens
        </label>
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
        <label className={CSS_CLASSES.label} style={labelStyles}>
          Lens
        </label>
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

  // Standard mode - full lens selection with custom input
  return (
    <div>
      <label className={CSS_CLASSES.label} style={labelStyles}>
        Lens
      </label>
      <div className="mb-2">
        <StyledSelect
          value={selectedLens}
          options={standardOptions}
          onChange={onLensChange}
          isLocked={isLocked}
          themeColors={themeColors}
          ariaLabel={ARIA_LABELS.lensSelect}
        />
      </div>
      <StyledInput
        value={customLens}
        placeholder={PLACEHOLDERS.customLens}
        onChange={onCustomLensChange}
        isLocked={isLocked}
        themeColors={themeColors}
        ariaLabel={ARIA_LABELS.lensCustom}
      />
    </div>
  );
});

LensSelector.displayName = 'LensSelector';

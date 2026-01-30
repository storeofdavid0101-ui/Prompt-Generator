/**
 * Aspect Ratio Selector Component
 *
 * Handles aspect ratio selection with two modes:
 * 1. Restricted - Limited to camera's authentic aspect ratios
 * 2. Standard - All aspect ratios available
 *
 * @module CameraSettings/AspectRatioSelector
 */

'use client';

import { memo, useMemo } from 'react';
import { Camera } from 'lucide-react';
import { aspectRatioOptions } from '../../config';
import { StyledSelect, InfoBanner } from './components';
import { CSS_CLASSES, ARIA_LABELS } from './constants';
import type { AspectRatioSelectorProps, SelectOption } from './types';

/**
 * Aspect ratio selector with camera-aware restrictions
 *
 * @example
 * ```tsx
 * <AspectRatioSelector
 *   aspectRatio={aspectRatio}
 *   selectedCamera={selectedCamera}
 *   allowedAspectRatios={conflicts.allowedAspectRatios}
 *   onAspectRatioChange={handleAspectRatioChange}
 *   isLocked={false}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const AspectRatioSelector = memo(function AspectRatioSelector({
  aspectRatio,
  selectedCamera,
  allowedAspectRatios,
  onAspectRatioChange,
  isLocked,
  themeColors,
}: AspectRatioSelectorProps) {
  /**
   * Memoized label styles
   */
  const labelStyles = useMemo(
    () => ({ color: themeColors.textTertiary }),
    [themeColors]
  );

  /**
   * Standard aspect ratio options (all available)
   */
  const allOptions: SelectOption[] = useMemo(
    () => aspectRatioOptions.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
    []
  );

  /**
   * Restricted aspect ratio options (camera-specific)
   */
  const restrictedOptions: SelectOption[] = useMemo(() => {
    if (!allowedAspectRatios) return [];

    const defaultOption: SelectOption = { label: 'Default', value: 'none' };
    const cameraOptions = allowedAspectRatios.map((ratio) => {
      const option = aspectRatioOptions.find((r) => r.ratio === ratio);
      return {
        label: option ? option.label : ratio,
        value: ratio,
      };
    });

    return [defaultOption, ...cameraOptions];
  }, [allowedAspectRatios]);

  // Restricted mode - limited to camera's authentic ratios
  if (allowedAspectRatios) {
    return (
      <div>
        <label className={CSS_CLASSES.label} style={labelStyles}>
          Aspect Ratio
        </label>
        <InfoBanner
          icon={Camera}
          text={`Limited to authentic ${selectedCamera} ratios`}
          variant="info"
          themeColors={themeColors}
        />
        <StyledSelect
          value={aspectRatio}
          options={restrictedOptions}
          onChange={onAspectRatioChange}
          isLocked={isLocked}
          themeColors={themeColors}
          ariaLabel={ARIA_LABELS.aspectRatioSelect}
        />
      </div>
    );
  }

  // Standard mode - all aspect ratios available
  return (
    <div>
      <label className={CSS_CLASSES.label} style={labelStyles}>
        Aspect Ratio
      </label>
      <StyledSelect
        value={aspectRatio}
        options={allOptions}
        onChange={onAspectRatioChange}
        isLocked={isLocked}
        themeColors={themeColors}
        ariaLabel={ARIA_LABELS.aspectRatioSelect}
      />
    </div>
  );
});

AspectRatioSelector.displayName = 'AspectRatioSelector';

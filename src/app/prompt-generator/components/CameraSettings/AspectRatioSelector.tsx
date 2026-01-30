/**
 * Aspect Ratio Selector Component
 *
 * Handles aspect ratio selection with two modes:
 * 1. Restricted - Limited to camera's authentic aspect ratios
 * 2. Standard - Stylish dropdown with visual ratio indicators
 *
 * @module CameraSettings/AspectRatioSelector
 */

'use client';

import { memo } from 'react';
import { Camera } from 'lucide-react';
import { helpDescriptions } from '../../config';
import { InfoBanner, AspectRatioDropdown } from './components';
import { HelpLabel } from '../ui';
import type { AspectRatioSelectorProps } from './types';

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
  // Restricted mode - limited to camera's authentic ratios
  if (allowedAspectRatios) {
    return (
      <div>
        <HelpLabel
          label="Aspect Ratio"
          help={helpDescriptions.aspectRatio}
          themeColors={themeColors}
          className="mb-2"
        />
        <InfoBanner
          icon={Camera}
          text={`Limited to authentic ${selectedCamera} ratios`}
          variant="info"
          themeColors={themeColors}
        />
        <AspectRatioDropdown
          selectedRatio={aspectRatio}
          allowedRatios={allowedAspectRatios}
          onRatioChange={onAspectRatioChange}
          isLocked={isLocked}
          themeColors={themeColors}
        />
      </div>
    );
  }

  // Standard mode - stylish dropdown with visual indicators
  return (
    <div>
      <HelpLabel
        label="Aspect Ratio"
        help={helpDescriptions.aspectRatio}
        themeColors={themeColors}
        className="mb-2"
      />
      <AspectRatioDropdown
        selectedRatio={aspectRatio}
        onRatioChange={onAspectRatioChange}
        isLocked={isLocked}
        themeColors={themeColors}
      />
    </div>
  );
});

AspectRatioSelector.displayName = 'AspectRatioSelector';

/**
 * Camera Type Selector Component
 *
 * Dropdown selector for camera type with conflict-aware blocking
 * and custom camera input support.
 *
 * @module CameraSettings/CameraTypeSelector
 */

'use client';

import { memo, useMemo } from 'react';
import { cameraOptions, helpDescriptions } from '../../config';
import { SelectWithCustomInput } from './components';
import { ARIA_LABELS, PLACEHOLDERS } from './constants';
import type { CameraTypeSelectorProps, SelectOption } from './types';

/**
 * Camera type selector with conflict detection
 *
 * Displays available cameras with blocked options marked.
 * Includes custom input for unlisted cameras.
 *
 * @example
 * ```tsx
 * <CameraTypeSelector
 *   selectedCamera={selectedCamera}
 *   customCamera={customCamera}
 *   blockedCameras={conflicts.blockedCameras}
 *   onCameraChange={handleCameraChange}
 *   onCustomCameraChange={handleCustomCameraChange}
 *   isLocked={false}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const CameraTypeSelector = memo(function CameraTypeSelector({
  selectedCamera,
  customCamera,
  blockedCameras,
  onCameraChange,
  onCustomCameraChange,
  isLocked,
  themeColors,
}: CameraTypeSelectorProps) {
  /**
   * Transform camera options to SelectOption format with conflict status
   */
  const options: SelectOption[] = useMemo(() => {
    const baseOptions: SelectOption[] = [
      { label: 'No specific camera', value: '' },
    ];

    const cameraSelectOptions = cameraOptions.map((camera) => {
      const isBlocked = blockedCameras.has(camera.label);
      return {
        label: camera.label,
        value: camera.label,
        disabled: isBlocked,
        suffix: isBlocked ? ' ⚠️' : undefined,
      };
    });

    return [...baseOptions, ...cameraSelectOptions];
  }, [blockedCameras]);

  return (
    <SelectWithCustomInput
      label="Camera"
      selectedValue={selectedCamera}
      customValue={customCamera}
      options={options}
      customPlaceholder={PLACEHOLDERS.customCamera}
      onSelectChange={onCameraChange}
      onCustomChange={onCustomCameraChange}
      isLocked={isLocked}
      themeColors={themeColors}
      selectAriaLabel={ARIA_LABELS.cameraSelect}
      inputAriaLabel={ARIA_LABELS.cameraCustom}
      help={helpDescriptions.cameraType}
    />
  );
});

CameraTypeSelector.displayName = 'CameraTypeSelector';

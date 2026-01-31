/**
 * Camera Type Selector Component
 *
 * Stylish dropdown selector for camera type with categories,
 * conflict-aware blocking, and custom camera input support.
 *
 * @module CameraSettings/CameraTypeSelector
 */

'use client';

import { memo } from 'react';
import { helpDescriptions } from '../../config';
import { CameraDropdown } from './components/CameraDropdown';
import { HelpLabel } from '../ui';
import type { CameraTypeSelectorProps } from './types';

/**
 * Camera type selector with conflict detection
 *
 * Displays available cameras grouped by category with blocked options marked.
 * Includes custom input for unlisted cameras.
 */
export const CameraTypeSelector = memo(function CameraTypeSelector({
  selectedCamera,
  customCamera,
  blockedCameras,
  cameraBlockReasons,
  onCameraChange,
  onCustomCameraChange,
  isLocked,
  themeColors,
}: CameraTypeSelectorProps) {
  return (
    <div>
      <HelpLabel
        label="Camera"
        help={helpDescriptions.cameraType}
        themeColors={themeColors}
        className="mb-2"
      />
      <CameraDropdown
        selectedCamera={selectedCamera}
        customCamera={customCamera}
        blockedCameras={blockedCameras}
        cameraBlockReasons={cameraBlockReasons}
        onCameraChange={onCameraChange}
        onCustomCameraChange={onCustomCameraChange}
        isLocked={isLocked}
        themeColors={themeColors}
      />
    </div>
  );
});

CameraTypeSelector.displayName = 'CameraTypeSelector';

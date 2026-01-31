/**
 * Camera State Hook
 *
 * Manages all camera-related state with automatic conflict resolution.
 * When camera changes, incompatible atmospheres, presets, DOF, and
 * aspect ratios are automatically cleared.
 *
 * @module hooks/state/useCameraState
 */

'use client';

import { useState, useCallback } from 'react';
import {
  cameraCategories,
  categoryConflicts,
  cameraAspectRatios,
} from '../../config';
import type { CameraState, UseCameraStateParams } from './types';
import { CAMERA_DEFAULTS } from './constants';

/**
 * Hook for managing camera state with conflict auto-clearing
 *
 * @param params - Configuration including lock state and conflict callbacks
 * @returns Camera state and handlers
 *
 * @example
 * ```tsx
 * const camera = useCameraState({
 *   isLocked: lockedSections.camera,
 *   selectedAtmosphere,
 *   selectedVisualPreset,
 *   onClearAtmosphere: () => setSelectedAtmosphere(null),
 *   onClearVisualPreset: () => setSelectedVisualPreset(null),
 * });
 *
 * // Change camera (auto-clears conflicts)
 * camera.setCamera('ARRI ALEXA 35');
 * ```
 */
export function useCameraState({
  isLocked,
  selectedAtmosphere,
  selectedVisualPreset,
  onClearAtmosphere,
  onClearVisualPreset,
}: UseCameraStateParams): CameraState {
  const [selectedCamera, setSelectedCameraInternal] = useState(CAMERA_DEFAULTS.camera);
  const [customCamera, setCustomCameraInternal] = useState(CAMERA_DEFAULTS.customCamera);
  const [selectedLens, setSelectedLensInternal] = useState(CAMERA_DEFAULTS.lens);
  const [customLens, setCustomLensInternal] = useState(CAMERA_DEFAULTS.customLens);
  const [selectedShot, setSelectedShotInternal] = useState(CAMERA_DEFAULTS.shot);
  const [customShot, setCustomShotInternal] = useState(CAMERA_DEFAULTS.customShot);
  const [depthOfField, setDepthOfFieldInternal] = useState(CAMERA_DEFAULTS.depthOfField);
  const [aspectRatio, setAspectRatioInternal] = useState(CAMERA_DEFAULTS.aspectRatio);

  /**
   * Set camera with automatic conflict resolution
   * Clears incompatible atmospheres, presets, DOF, and aspect ratios
   */
  const setCamera = useCallback(
    (newCamera: string) => {
      if (isLocked) return;

      setSelectedCameraInternal(newCamera);
      setCustomCameraInternal('');

      // Get conflict rules for the new camera's category
      const category = cameraCategories[newCamera] || 'none';
      const rules = categoryConflicts[category];

      // Clear atmosphere if it conflicts
      if (selectedAtmosphere && rules.blockedAtmospheres.includes(selectedAtmosphere)) {
        onClearAtmosphere();
      }

      // Clear visual preset if it conflicts
      if (selectedVisualPreset && rules.blockedPresets.includes(selectedVisualPreset)) {
        onClearVisualPreset();
      }

      // Reset DOF if it conflicts
      if (rules.blockedDOF.includes(depthOfField)) {
        setDepthOfFieldInternal(CAMERA_DEFAULTS.depthOfField);
      }

      // Reset aspect ratio if not allowed by this camera
      const allowedRatios = cameraAspectRatios[newCamera];
      if (allowedRatios && aspectRatio !== 'none' && !allowedRatios.includes(aspectRatio)) {
        setAspectRatioInternal(CAMERA_DEFAULTS.aspectRatio);
      }
    },
    [
      isLocked,
      selectedAtmosphere,
      selectedVisualPreset,
      depthOfField,
      aspectRatio,
      onClearAtmosphere,
      onClearVisualPreset,
    ]
  );

  const setCustomCamera = useCallback((value: string) => {
    setCustomCameraInternal(value);
  }, []);

  const setSelectedLens = useCallback((value: string) => {
    setSelectedLensInternal(value);
  }, []);

  const setCustomLens = useCallback((value: string) => {
    setCustomLensInternal(value);
  }, []);

  const setSelectedShot = useCallback((value: string) => {
    setSelectedShotInternal(value);
  }, []);

  const setCustomShot = useCallback((value: string) => {
    setCustomShotInternal(value);
  }, []);

  const setDepthOfField = useCallback((value: string) => {
    setDepthOfFieldInternal(value);
  }, []);

  const setAspectRatio = useCallback((value: string) => {
    setAspectRatioInternal(value);
  }, []);

  const reset = useCallback(() => {
    setSelectedCameraInternal(CAMERA_DEFAULTS.camera);
    setCustomCameraInternal(CAMERA_DEFAULTS.customCamera);
    setSelectedLensInternal(CAMERA_DEFAULTS.lens);
    setCustomLensInternal(CAMERA_DEFAULTS.customLens);
    setSelectedShotInternal(CAMERA_DEFAULTS.shot);
    setCustomShotInternal(CAMERA_DEFAULTS.customShot);
    setDepthOfFieldInternal(CAMERA_DEFAULTS.depthOfField);
    setAspectRatioInternal(CAMERA_DEFAULTS.aspectRatio);
  }, []);

  return {
    selectedCamera,
    customCamera,
    selectedLens,
    customLens,
    selectedShot,
    customShot,
    depthOfField,
    aspectRatio,
    setCamera,
    setCustomCamera,
    setSelectedLens,
    setCustomLens,
    setSelectedShot,
    setCustomShot,
    setDepthOfField,
    setAspectRatio,
    reset,
  };
}

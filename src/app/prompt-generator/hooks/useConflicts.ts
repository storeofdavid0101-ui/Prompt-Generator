/**
 * Conflict detection hook
 * Manages incompatibility detection between camera types, atmospheres, and presets
 */

import { useMemo } from 'react';
import type { Atmosphere, CameraCategory, ConflictResult } from '../config/types';
import {
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  atmosphereBlocksCategories,
  presetBlocksCategories,
  atmosphereConfigs,
  visualPresets,
  dofOptions,
  cameraAspectRatios,
  directorStyles,
} from '../config';

interface UseConflictsParams {
  selectedCamera: string;
  selectedAtmosphere: Atmosphere | null;
  selectedVisualPreset: string | null;
  depthOfField: string;
  selectedDirector: string;
}

export function useConflicts({
  selectedCamera,
  selectedAtmosphere,
  selectedVisualPreset,
  depthOfField,
  selectedDirector,
}: UseConflictsParams): ConflictResult {
  const currentCameraCategory = useMemo((): CameraCategory => {
    if (!selectedCamera) return 'none';
    return cameraCategories[selectedCamera] || 'none';
  }, [selectedCamera]);

  return useMemo(() => {
    const cameraRules = categoryConflicts[currentCameraCategory];

    // Get blocked options based on camera selection
    const blockedAtmospheres = new Set<Atmosphere>(cameraRules.blockedAtmospheres);
    const blockedPresets = new Set<string>(cameraRules.blockedPresets);
    const blockedDOF = new Set<string>(cameraRules.blockedDOF);
    const blockedCameras = new Set<string>();

    // Add director-based blocking
    const directorConfig = directorStyles.find((d) => d.name === selectedDirector);
    if (directorConfig) {
      directorConfig.blockedAtmospheres.forEach((atm) => blockedAtmospheres.add(atm));
      directorConfig.blockedPresets.forEach((preset) => blockedPresets.add(preset));
    }

    // Check reverse conflicts: atmosphere blocks cameras
    if (selectedAtmosphere && atmosphereBlocksCategories[selectedAtmosphere]) {
      const blockedCategories = atmosphereBlocksCategories[selectedAtmosphere]!;
      Object.entries(cameraCategories).forEach(([camera, category]) => {
        if (blockedCategories.includes(category)) {
          blockedCameras.add(camera);
        }
      });
    }

    // Check reverse conflicts: preset blocks cameras
    if (selectedVisualPreset && presetBlocksCategories[selectedVisualPreset]) {
      const blockedCategories = presetBlocksCategories[selectedVisualPreset];
      Object.entries(cameraCategories).forEach(([camera, category]) => {
        if (blockedCategories.includes(category)) {
          blockedCameras.add(camera);
        }
      });
    }

    // Detect active conflicts (things user has selected that conflict)
    const activeConflicts: string[] = [];

    if (selectedAtmosphere && blockedAtmospheres.has(selectedAtmosphere)) {
      activeConflicts.push(
        `"${atmosphereConfigs[selectedAtmosphere].name}" atmosphere conflicts with ${selectedCamera}`
      );
    }

    if (selectedVisualPreset && blockedPresets.has(selectedVisualPreset)) {
      activeConflicts.push(
        `"${visualPresets[selectedVisualPreset].name}" preset conflicts with ${selectedCamera}`
      );
    }

    if (blockedDOF.has(depthOfField) && depthOfField !== 'normal') {
      const dofLabel = dofOptions.find((d) => d.value === depthOfField)?.label || depthOfField;
      activeConflicts.push(`"${dofLabel}" DOF conflicts with ${selectedCamera}`);
    }

    // Determine if camera has a zoom range or fixed lens
    const zoomRange = selectedCamera ? cameraZoomRange[selectedCamera] || null : null;

    const fixedLens =
      selectedCamera && !zoomRange
        ? cameraFixedLens[selectedCamera] || cameraRules.fixedLens || null
        : null;

    // Get allowed aspect ratios for camera (null means all allowed)
    const allowedAspectRatios = selectedCamera
      ? cameraAspectRatios[selectedCamera] || null
      : null;

    return {
      blockedAtmospheres,
      blockedPresets,
      blockedDOF,
      blockedCameras,
      activeConflicts,
      warningMessage: cameraRules.warningMessage,
      fixedLens,
      zoomRange,
      allowedAspectRatios,
    };
  }, [
    currentCameraCategory,
    selectedCamera,
    selectedAtmosphere,
    selectedVisualPreset,
    depthOfField,
    selectedDirector,
  ]);
}

/**
 * Conflict detection hook
 * Manages incompatibility detection between camera types, atmospheres, and presets
 */

import { useMemo } from 'react';
import type { Atmosphere, CameraCategory, ConflictResult, EffectStackingWarning } from '../config/types';
import {
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  atmosphereBlocksCategories,
  presetBlocksCategories,
  presetMutualExclusions,
  atmosphereLightingRedundancy,
  redundancyWarnings,
  atmosphereConfigs,
  visualPresets,
  dofOptions,
  cameraAspectRatios,
  directorStyles,
  lightingOptions,
} from '../config';

interface UseConflictsParams {
  selectedCamera: string;
  selectedAtmosphere: Atmosphere | null;
  selectedVisualPreset: string | null;
  selectedLighting: string | null;
  depthOfField: string;
  selectedDirector: string;
}

export function useConflicts({
  selectedCamera,
  selectedAtmosphere,
  selectedVisualPreset,
  selectedLighting,
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
      directorConfig.blockedCameras.forEach((cam) => blockedCameras.add(cam));
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

    // Add preset mutual exclusions (e.g., vivid blocks desaturated)
    if (selectedVisualPreset && presetMutualExclusions[selectedVisualPreset]) {
      presetMutualExclusions[selectedVisualPreset].forEach((preset) => {
        blockedPresets.add(preset);
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

    // Detect effect stacking warnings (multiple blur/mood terms compounding)
    const effectStackingWarnings: EffectStackingWarning[] = [];

    // Dreamy atmosphere already includes blur effects
    if (selectedAtmosphere === 'dreamy') {
      const dreamyBlurTerms = ['soft focus', 'ethereal glow', 'bokeh', 'gaussian blur'];

      // Warn if shallow DOF (bokeh) is also selected - compounds blur
      if (depthOfField === 'shallow') {
        effectStackingWarnings.push({
          category: 'blur',
          message: 'Dreamy + Shallow DOF may cause artifact sparkles. Consider using "Normal" DOF instead.',
          includedTerms: dreamyBlurTerms,
        });
      } else if (depthOfField === 'tilt-shift') {
        effectStackingWarnings.push({
          category: 'blur',
          message: 'Dreamy + Tilt-Shift creates heavy blur stacking. May cause unrealistic effects.',
          includedTerms: dreamyBlurTerms,
        });
      } else {
        // General info about what dreamy includes
        effectStackingWarnings.push({
          category: 'blur',
          message: 'Dreamy already includes blur effects. Avoid adding more blur terms in your subject.',
          includedTerms: dreamyBlurTerms,
        });
      }
    }

    // Romantic atmosphere has soft glow - warn about stacking
    if (selectedAtmosphere === 'romantic' && depthOfField === 'shallow') {
      effectStackingWarnings.push({
        category: 'blur',
        message: 'Romantic + Shallow DOF stacks soft effects. Use "Normal" DOF for cleaner results.',
        includedTerms: ['soft warm light', 'gentle glow'],
      });
    }

    // Check atmosphere-lighting redundancy
    if (selectedAtmosphere && selectedLighting && atmosphereLightingRedundancy[selectedAtmosphere]) {
      const redundantLighting = atmosphereLightingRedundancy[selectedAtmosphere];
      if (redundantLighting.includes(selectedLighting)) {
        const warningKey = `${selectedAtmosphere}+${selectedLighting}` as keyof typeof redundancyWarnings;
        const warningMessage = redundancyWarnings[warningKey] ||
          `${atmosphereConfigs[selectedAtmosphere].name} atmosphere + ${lightingOptions[selectedLighting]?.name || selectedLighting} lighting may be redundant`;
        effectStackingWarnings.push({
          category: 'mood',
          message: warningMessage,
          includedTerms: [],
        });
      }
    }

    return {
      blockedAtmospheres,
      blockedPresets,
      blockedDOF,
      blockedCameras,
      activeConflicts,
      effectStackingWarnings,
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
    selectedLighting,
    depthOfField,
    selectedDirector,
  ]);
}

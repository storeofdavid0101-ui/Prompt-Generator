/**
 * Conflict detection hook
 * Manages incompatibility detection between camera types, atmospheres, presets,
 * locations, shot types, lenses, and style stacking
 */

import { useMemo } from 'react';
import type {
  Atmosphere,
  CameraCategory,
  ConflictResult,
  EffectStackingWarning,
  LightingKey,
  VisualPresetKey,
} from '../config/types';
import type { BlockReason, BlockReasonMap } from '../config/types/conflict';
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
  lensOptions,
  // Location conflicts
  isAtmosphereBlockedByLocation,
  isLightingBlockedByLocation,
  getLocationMeta,
  // Camera grammar conflicts
  shotLensConflicts,
  shotDOFConflicts,
  // Style stacking
  analyzeStyleStacking,
} from '../config';

interface UseConflictsParams {
  selectedCamera: string;
  selectedAtmosphere: Atmosphere | null;
  selectedVisualPreset: string | null;
  selectedLighting: string | null;
  depthOfField: string;
  selectedDirector: string;
  selectedLens?: string;
  customLens?: string;
  selectedShot?: string;
  selectedLocation?: string;
}

/** Valid visual preset keys for type narrowing */
const VISUAL_PRESET_KEYS: Set<string> = new Set([
  'raw', 'highcontrast', 'desaturated', 'vivid', 'filmlook', 'bleachbypass',
]);

/** Valid lighting keys for type narrowing */
const LIGHTING_KEYS: Set<string> = new Set([
  'rembrandt', 'chiaroscuro', 'highkey', 'lowkey', 'goldenhour',
  'bluehour', 'moonlit', 'practical', 'neon', 'godrays', 'softbox',
]);

/** Type guard for VisualPresetKey */
function isVisualPresetKey(value: string | null): value is VisualPresetKey {
  return value !== null && VISUAL_PRESET_KEYS.has(value);
}

/** Type guard for LightingKey */
function isLightingKey(value: string | null): value is LightingKey {
  return value !== null && LIGHTING_KEYS.has(value);
}

export function useConflicts({
  selectedCamera,
  selectedAtmosphere,
  selectedVisualPreset,
  selectedLighting,
  depthOfField,
  selectedDirector,
  selectedLens,
  customLens,
  selectedShot,
  selectedLocation,
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
    const blockedShots = new Set<string>();
    const blockedLensCategories = new Set<string>();
    const blockedLighting = new Set<string>();

    // Track block reasons for tooltips
    const atmosphereBlockReasons: BlockReasonMap = new Map<string, BlockReason>();
    const presetBlockReasons: BlockReasonMap = new Map<string, BlockReason>();
    const cameraBlockReasons: BlockReasonMap = new Map<string, BlockReason>();
    const dofBlockReasons: BlockReasonMap = new Map<string, BlockReason>();
    const shotBlockReasons: BlockReasonMap = new Map<string, BlockReason>();
    const lensBlockReasons: BlockReasonMap = new Map<string, BlockReason>();
    const lightingBlockReasons: BlockReasonMap = new Map<string, BlockReason>();

    // Helper to add block reason (only if not already blocked)
    const addAtmosphereBlock = (atm: Atmosphere, source: string, reason: string) => {
      blockedAtmospheres.add(atm);
      if (!atmosphereBlockReasons.has(atm)) {
        atmosphereBlockReasons.set(atm, { source, reason });
      }
    };

    const addPresetBlock = (preset: string, source: string, reason: string) => {
      blockedPresets.add(preset);
      if (!presetBlockReasons.has(preset)) {
        presetBlockReasons.set(preset, { source, reason });
      }
    };

    const addCameraBlock = (camera: string, source: string, reason: string) => {
      blockedCameras.add(camera);
      if (!cameraBlockReasons.has(camera)) {
        cameraBlockReasons.set(camera, { source, reason });
      }
    };

    const addDOFBlock = (dof: string, source: string, reason: string) => {
      blockedDOF.add(dof);
      if (!dofBlockReasons.has(dof)) {
        dofBlockReasons.set(dof, { source, reason });
      }
    };

    const addShotBlock = (shot: string, source: string, reason: string) => {
      blockedShots.add(shot);
      if (!shotBlockReasons.has(shot)) {
        shotBlockReasons.set(shot, { source, reason });
      }
    };

    const addLensCategoryBlock = (category: string, source: string, reason: string) => {
      blockedLensCategories.add(category);
      if (!lensBlockReasons.has(category)) {
        lensBlockReasons.set(category, { source, reason });
      }
    };

    const addLightingBlock = (lighting: string, source: string, reason: string) => {
      blockedLighting.add(lighting);
      if (!lightingBlockReasons.has(lighting)) {
        lightingBlockReasons.set(lighting, { source, reason });
      }
    };

    // Add camera-based blocking with reasons
    cameraRules.blockedAtmospheres.forEach((atm) => {
      addAtmosphereBlock(atm, selectedCamera || 'Camera', `Not compatible with ${selectedCamera || 'this camera type'}`);
    });
    cameraRules.blockedPresets.forEach((preset) => {
      addPresetBlock(preset, selectedCamera || 'Camera', `Not compatible with ${selectedCamera || 'this camera type'}`);
    });
    cameraRules.blockedDOF.forEach((dof) => {
      addDOFBlock(dof, selectedCamera || 'Camera', `${selectedCamera || 'This camera'} doesn't support this DOF`);
    });

    // Add director-based blocking with reasons
    const directorConfig = directorStyles.find((d) => d.name === selectedDirector);
    if (directorConfig) {
      directorConfig.blockedAtmospheres.forEach((atm) => {
        addAtmosphereBlock(atm, directorConfig.name, `Conflicts with ${directorConfig.name}'s style`);
      });
      directorConfig.blockedPresets.forEach((preset) => {
        addPresetBlock(preset, directorConfig.name, `Conflicts with ${directorConfig.name}'s style`);
      });
      directorConfig.blockedCameras.forEach((cam) => {
        addCameraBlock(cam, directorConfig.name, `${directorConfig.name} wouldn't use this camera`);
      });
    }

    // Check reverse conflicts: atmosphere blocks cameras
    if (selectedAtmosphere && atmosphereBlocksCategories[selectedAtmosphere]) {
      const blockedCategories = atmosphereBlocksCategories[selectedAtmosphere]!;
      const atmName = atmosphereConfigs[selectedAtmosphere].name;
      Object.entries(cameraCategories).forEach(([camera, category]) => {
        if (blockedCategories.includes(category)) {
          addCameraBlock(camera, atmName, `Not compatible with ${atmName} atmosphere`);
        }
      });
    }

    // Check reverse conflicts: preset blocks cameras
    if (isVisualPresetKey(selectedVisualPreset) && presetBlocksCategories[selectedVisualPreset]) {
      const blockedCategories = presetBlocksCategories[selectedVisualPreset];
      const presetName = visualPresets[selectedVisualPreset].name;
      Object.entries(cameraCategories).forEach(([camera, category]) => {
        if (blockedCategories?.includes(category)) {
          addCameraBlock(camera, presetName, `Not compatible with ${presetName} color grade`);
        }
      });
    }

    // Add preset mutual exclusions (e.g., vivid blocks desaturated)
    if (isVisualPresetKey(selectedVisualPreset) && presetMutualExclusions[selectedVisualPreset]) {
      const currentPresetName = visualPresets[selectedVisualPreset].name;
      presetMutualExclusions[selectedVisualPreset]?.forEach((preset) => {
        addPresetBlock(preset, currentPresetName, `Can't combine with ${currentPresetName}`);
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

    // Determine if camera has a zoom range or fixed lens
    const zoomRange = selectedCamera ? cameraZoomRange[selectedCamera] || null : null;

    const fixedLens =
      selectedCamera && !zoomRange
        ? cameraFixedLens[selectedCamera] || cameraRules.fixedLens || null
        : null;

    // Warn if user selected lens but camera has fixed lens
    if (fixedLens && (selectedLens || customLens?.trim())) {
      activeConflicts.push(
        `Lens selection ignored: ${selectedCamera} has a fixed ${fixedLens} lens`
      );
    }

    // Warn if DOF is blocked (more informative than just saying "conflicts")
    if (blockedDOF.has(depthOfField) && depthOfField !== 'normal') {
      const dofLabel = dofOptions.find((d) => d.value === depthOfField)?.label || depthOfField;
      // Only add if not already added above
      if (!activeConflicts.some(c => c.includes('DOF conflicts'))) {
        activeConflicts.push(
          `${dofLabel} DOF not applied: ${selectedCamera} doesn't support this DOF setting`
        );
      }
    }

    // Get allowed aspect ratios for camera (null means all allowed)
    const allowedAspectRatios = selectedCamera
      ? cameraAspectRatios[selectedCamera] || null
      : null;

    // Detect effect stacking warnings (multiple blur/mood terms compounding)
    const effectStackingWarnings: EffectStackingWarning[] = [];

    // Dreamy atmosphere already includes blur effects - only warn on actual stacking
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
      }
      // No informational warning when no actual stacking - DOF options are now blocked
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
    if (selectedAtmosphere && isLightingKey(selectedLighting) && atmosphereLightingRedundancy[selectedAtmosphere]) {
      const redundantLighting = atmosphereLightingRedundancy[selectedAtmosphere];
      if (redundantLighting?.includes(selectedLighting)) {
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

    // === NEW: Location-based conflict detection ===
    if (selectedLocation) {
      const locationLabel = selectedLocation;

      // Check if atmosphere conflicts with location era
      if (selectedAtmosphere && isAtmosphereBlockedByLocation(selectedAtmosphere, locationLabel)) {
        const atmName = atmosphereConfigs[selectedAtmosphere].name;
        const locMeta = getLocationMeta(locationLabel);
        activeConflicts.push(
          `"${atmName}" atmosphere may not fit "${locationLabel}" (era mismatch: ${locMeta.era})`
        );
      }

      // Check if lighting conflicts with location (indoor/outdoor)
      if (isLightingKey(selectedLighting) && isLightingBlockedByLocation(selectedLighting, locationLabel)) {
        const lightingName = lightingOptions[selectedLighting]?.name || selectedLighting;
        const locMeta = getLocationMeta(locationLabel);
        addLightingBlock(selectedLighting, locationLabel, `${lightingName} is typically ${locMeta.metaCategory === 'indoor' ? 'outdoor' : 'indoor'} lighting`);
        activeConflicts.push(
          `"${lightingName}" lighting may not work in "${locationLabel}" (${locMeta.metaCategory} location)`
        );
      }
    }

    // === NEW: Shot type + lens conflicts (camera grammar) ===
    if (selectedShot) {
      const blockedLensCats = shotLensConflicts[selectedShot] || [];
      blockedLensCats.forEach((category) => {
        addLensCategoryBlock(category, selectedShot, `${selectedShot} works poorly with ${category} lenses`);
      });

      // Check if current lens is blocked
      if (selectedLens) {
        const currentLensCategory = lensOptions.find((l) => l.value === selectedLens)?.category;
        if (currentLensCategory && blockedLensCats.includes(currentLensCategory)) {
          activeConflicts.push(
            `${selectedLens} lens (${currentLensCategory}) may not work well with ${selectedShot}`
          );
        }
      }

      // Shot + DOF conflicts
      const blockedDOFForShot = shotDOFConflicts[selectedShot] || [];
      blockedDOFForShot.forEach((dof) => {
        addDOFBlock(dof, selectedShot, `${dof} DOF conflicts with ${selectedShot} framing`);
      });

      // Check if current DOF is blocked by shot
      if (depthOfField && blockedDOFForShot.includes(depthOfField as any)) {
        activeConflicts.push(
          `${depthOfField} DOF may not work well with ${selectedShot} (camera grammar conflict)`
        );
      }
    }

    // === NEW: Style stacking detection ===
    const styleAnalysis = analyzeStyleStacking(
      selectedDirector,
      selectedAtmosphere,
      isVisualPresetKey(selectedVisualPreset) ? selectedVisualPreset : null,
      isLightingKey(selectedLighting) ? selectedLighting : null
    );
    const styleStackingWarning = styleAnalysis.warningMessage;

    if (styleStackingWarning) {
      effectStackingWarnings.push({
        category: 'quality',
        message: styleStackingWarning,
        includedTerms: styleAnalysis.overloadedCategories,
      });
    }

    return {
      blockedAtmospheres,
      blockedPresets,
      blockedDOF,
      blockedCameras,
      blockedShots,
      blockedLensCategories,
      blockedLighting,
      activeConflicts,
      effectStackingWarnings,
      warningMessage: cameraRules.warningMessage,
      fixedLens,
      zoomRange,
      allowedAspectRatios,
      atmosphereBlockReasons,
      presetBlockReasons,
      cameraBlockReasons,
      dofBlockReasons,
      shotBlockReasons,
      lensBlockReasons,
      lightingBlockReasons,
      styleStackingWarning,
    };
  }, [
    currentCameraCategory,
    selectedCamera,
    selectedAtmosphere,
    selectedVisualPreset,
    selectedLighting,
    depthOfField,
    selectedDirector,
    selectedLens,
    customLens,
    selectedShot,
    selectedLocation,
  ]);
}

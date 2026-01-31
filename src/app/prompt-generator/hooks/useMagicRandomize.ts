/**
 * Magic Randomize Hook
 * Provides randomization utilities for all prompt generator fields
 */

'use client';

import { useCallback, useRef, useState } from 'react';
import {
  getRandomItem,
  getRandomSubjectWithMeta,
  getMatchingCharacter,
  getSubjectThemes,
  getSubjectText,
  cameraOptions,
  lensOptions,
  shotOptions,
  dofOptions,
  aspectRatioOptions,
  atmosphereConfigs,
  visualPresets,
  lightingOptions,
  colorPalettes,
  directorStyles,
  locationPresets,
  modelConfigs,
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  atmosphereBlocksDOF,
  atmosphereLightingRedundancy,
  atmosphereShotConflicts,
  // Location conflicts
  isAtmosphereBlockedByLocation,
  isLightingBlockedByLocation,
  // Camera grammar conflicts
  shotLensConflicts,
  shotDOFConflicts,
  // Style stacking
  analyzeStyleStacking,
  atmosphereImpliedStyles,
  // Director-lens conflicts
  getDirectorBlockedLenses,
  // Subject-location compatibility
  filterCompatibleLocations,
} from '../config';
import type { AIModel, Atmosphere, ConflictResult, LockedSections, DirectorStyle, LightingKey, VisualPresetKey } from '../config/types';
import type { StyleCategory } from '../config/conflicts/styleStacking';

/** Gaze direction options (matching GazeDirection.tsx) */
const gazeOptions = ['direct', 'left', 'right', 'up', 'down', 'away', 'shoulder'];

/** Pose options (matching PoseAction.tsx) */
const poseOptions = ['standing', 'stride', 'sprint', 'seated', 'kneeling', 'combat'];

/** Position options (matching CharacterPosition.tsx) */
const positionOptions = ['left', 'center', 'right'];

/** Track which fields were recently randomized for glow effect */
export interface MagicState {
  subject: boolean;
  character: boolean;
  gaze: boolean;
  pose: boolean;
  position: boolean;
  location: boolean;
  director: boolean;
  atmosphere: boolean;
  visual: boolean;
  color: boolean;
  camera: boolean;
  lens: boolean;
  shot: boolean;
  dof: boolean;
  aspectRatio: boolean;
  lighting: boolean;
}

const initialMagicState: MagicState = {
  subject: false,
  character: false,
  gaze: false,
  pose: false,
  position: false,
  location: false,
  director: false,
  atmosphere: false,
  visual: false,
  color: false,
  camera: false,
  lens: false,
  shot: false,
  dof: false,
  aspectRatio: false,
  lighting: false,
};

interface UseMagicRandomizeProps {
  // Current state values (for smart matching and conflict checking)
  lockedSections: LockedSections;
  currentSubject: string;
  conflicts: ConflictResult;
  /** Selected AI model - used to determine if safe mode is needed */
  selectedModel: AIModel;

  // Setters for all fields
  setSubject: (value: string) => void;
  setCurrentCharacter: (value: string) => void;
  addCharacter: () => void;
  setGazeDirection: (value: string) => void;
  setPoseAction: (value: string) => void;
  setCharacterPosition: (value: string) => void;
  setLocation: (value: string) => void;
  handleDirectorChange: (value: string) => void;
  setSelectedAtmosphere: (value: Atmosphere | null) => void;
  setSelectedVisualPreset: (value: string | null) => void;
  setSelectedColorPalette: (value: string | null) => void;
  handleCameraChange: (value: string) => void;
  setSelectedLens: (value: string) => void;
  setSelectedShot: (value: string) => void;
  setDepthOfField: (value: string) => void;
  setAspectRatio: (value: string) => void;
  setSelectedLighting: (value: string | null) => void;
}

export function useMagicRandomize({
  lockedSections,
  currentSubject,
  conflicts,
  selectedModel,
  setSubject,
  setCurrentCharacter,
  addCharacter,
  setGazeDirection,
  setPoseAction,
  setCharacterPosition,
  setLocation,
  handleDirectorChange,
  setSelectedAtmosphere,
  setSelectedVisualPreset,
  setSelectedColorPalette,
  handleCameraChange,
  setSelectedLens,
  setSelectedShot,
  setDepthOfField,
  setAspectRatio,
  setSelectedLighting,
}: UseMagicRandomizeProps) {
  // Track which fields are glowing
  const [magicState, setMagicState] = useState<MagicState>(initialMagicState);
  // Track the last randomized subject for character matching
  const lastSubjectRef = useRef<string>('');
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // Check if the selected model has strict content policies
  const useSafeMode = modelConfigs[selectedModel]?.strictContentPolicy === true;

  // Helper to trigger glow state for a field
  const triggerGlow = useCallback((field: keyof MagicState) => {
    // Clear any existing timeout for this field
    if (timeoutRefs.current[field]) {
      clearTimeout(timeoutRefs.current[field]);
    }

    // Set glow state
    setMagicState((prev) => ({ ...prev, [field]: true }));

    // Clear after animation duration
    timeoutRefs.current[field] = setTimeout(() => {
      setMagicState((prev) => ({ ...prev, [field]: false }));
    }, 600);
  }, []);

  // Randomize subject - stores the subject for smart character matching
  // Uses safe alternatives for models with strict content policies
  const randomizeSubject = useCallback(() => {
    if (lockedSections.subject) return;
    const subjectMeta = getRandomSubjectWithMeta();
    // Use safe subject text if the model has strict content policies
    const subjectText = getSubjectText(subjectMeta, useSafeMode);
    lastSubjectRef.current = subjectMeta.subject; // Keep original for theme matching
    setSubject(subjectText);
    triggerGlow('subject');
  }, [lockedSections.subject, setSubject, triggerGlow, useSafeMode]);

  // Randomize character with smart matching based on current subject
  // Uses safe alternatives for models with strict content policies
  const randomizeCharacter = useCallback(() => {
    if (lockedSections.character) return;
    // Get themes from either the last randomized subject or current subject
    const subjectToMatch = lastSubjectRef.current || currentSubject;
    const themes = getSubjectThemes(subjectToMatch);
    // Pass useSafeMode to get safe character descriptions
    const character = getMatchingCharacter(themes, useSafeMode);
    setCurrentCharacter(character);
    triggerGlow('character');
  }, [lockedSections.character, currentSubject, setCurrentCharacter, triggerGlow, useSafeMode]);

  // Randomize gaze direction
  const randomizeGaze = useCallback(() => {
    if (lockedSections.gaze) return;
    setGazeDirection(getRandomItem(gazeOptions));
    triggerGlow('gaze');
  }, [lockedSections.gaze, setGazeDirection, triggerGlow]);

  // Randomize pose
  const randomizePose = useCallback(() => {
    if (lockedSections.pose) return;
    setPoseAction(getRandomItem(poseOptions));
    triggerGlow('pose');
  }, [lockedSections.pose, setPoseAction, triggerGlow]);

  // Randomize position
  const randomizePosition = useCallback(() => {
    if (lockedSections.position) return;
    setCharacterPosition(getRandomItem(positionOptions));
    triggerGlow('position');
  }, [lockedSections.position, setCharacterPosition, triggerGlow]);

  // Randomize location
  const randomizeLocation = useCallback(() => {
    if (lockedSections.location) return;
    const preset = getRandomItem(locationPresets);
    setLocation(preset.label);
    triggerGlow('location');
  }, [lockedSections.location, setLocation, triggerGlow]);

  // Randomize director
  const randomizeDirector = useCallback(() => {
    if (lockedSections.director) return;
    const director = getRandomItem(directorStyles);
    handleDirectorChange(director.name);
    triggerGlow('director');
  }, [lockedSections.director, handleDirectorChange, triggerGlow]);

  // Randomize atmosphere - filters out blocked atmospheres
  const randomizeAtmosphere = useCallback(() => {
    if (lockedSections.atmosphere) return;
    const atmosphereKeys = Object.keys(atmosphereConfigs) as Atmosphere[];
    // Filter out blocked atmospheres
    const availableAtmospheres = atmosphereKeys.filter(
      (atm) => !conflicts.blockedAtmospheres.has(atm)
    );
    if (availableAtmospheres.length === 0) {
      // All blocked, just pick any
      setSelectedAtmosphere(getRandomItem(atmosphereKeys));
    } else {
      setSelectedAtmosphere(getRandomItem(availableAtmospheres));
    }
    triggerGlow('atmosphere');
  }, [lockedSections.atmosphere, conflicts.blockedAtmospheres, setSelectedAtmosphere, triggerGlow]);

  // Randomize visual preset - filters out blocked presets
  const randomizeVisual = useCallback(() => {
    if (lockedSections.visual) return;
    const presetKeys = Object.keys(visualPresets);
    // Filter out blocked presets
    const availablePresets = presetKeys.filter(
      (preset) => !conflicts.blockedPresets.has(preset)
    );
    if (availablePresets.length === 0) {
      setSelectedVisualPreset(getRandomItem(presetKeys));
    } else {
      setSelectedVisualPreset(getRandomItem(availablePresets));
    }
    triggerGlow('visual');
  }, [lockedSections.visual, conflicts.blockedPresets, setSelectedVisualPreset, triggerGlow]);

  // Randomize color palette
  const randomizeColor = useCallback(() => {
    if (lockedSections.color) return;
    const paletteKeys = Object.keys(colorPalettes);
    setSelectedColorPalette(getRandomItem(paletteKeys));
    triggerGlow('color');
  }, [lockedSections.color, setSelectedColorPalette, triggerGlow]);

  // Randomize camera - filters out blocked cameras
  const randomizeCamera = useCallback(() => {
    if (lockedSections.camera) return;
    // Filter out blocked cameras
    const availableCameras = cameraOptions.filter(
      (cam) => !conflicts.blockedCameras.has(cam.label)
    );
    if (availableCameras.length === 0) {
      const camera = getRandomItem(cameraOptions);
      handleCameraChange(camera.label);
    } else {
      const camera = getRandomItem(availableCameras);
      handleCameraChange(camera.label);
    }
    triggerGlow('camera');
  }, [lockedSections.camera, conflicts.blockedCameras, handleCameraChange, triggerGlow]);

  // Randomize lens
  const randomizeLens = useCallback(() => {
    if (lockedSections.camera) return;
    const lens = getRandomItem(lensOptions);
    setSelectedLens(lens.value);
    triggerGlow('lens');
  }, [lockedSections.camera, setSelectedLens, triggerGlow]);

  // Randomize shot
  const randomizeShot = useCallback(() => {
    if (lockedSections.camera) return;
    const shot = getRandomItem(shotOptions);
    setSelectedShot(shot.label);
    triggerGlow('shot');
  }, [lockedSections.camera, setSelectedShot, triggerGlow]);

  // Randomize DOF - filters out blocked DOF values
  const randomizeDOF = useCallback(() => {
    if (lockedSections.advanced) return;
    // Filter out blocked DOF values
    const availableDOF = dofOptions.filter(
      (dof) => !conflicts.blockedDOF.has(dof.value)
    );
    if (availableDOF.length === 0) {
      const dof = getRandomItem(dofOptions);
      setDepthOfField(dof.value);
    } else {
      const dof = getRandomItem(availableDOF);
      setDepthOfField(dof.value);
    }
    triggerGlow('dof');
  }, [lockedSections.advanced, conflicts.blockedDOF, setDepthOfField, triggerGlow]);

  // Randomize aspect ratio
  const randomizeAspectRatio = useCallback(() => {
    if (lockedSections.camera) return;
    // Skip 'none' option for more interesting results
    const validRatios = aspectRatioOptions.filter((r) => r.value !== 'none');
    const ratio = getRandomItem(validRatios);
    setAspectRatio(ratio.value);
    triggerGlow('aspectRatio');
  }, [lockedSections.camera, setAspectRatio, triggerGlow]);

  // Randomize lighting
  const randomizeLighting = useCallback(() => {
    if (lockedSections.lighting) return;
    const lightingKeys = Object.keys(lightingOptions);
    setSelectedLighting(getRandomItem(lightingKeys));
    triggerGlow('lighting');
  }, [lockedSections.lighting, setSelectedLighting, triggerGlow]);

  // Randomize all content fields (subject, character, gaze, pose, position, location)
  const randomizeContent = useCallback(() => {
    randomizeSubject();
    randomizeGaze();
    randomizePose();
    randomizePosition();
    randomizeLocation();
  }, [randomizeSubject, randomizeGaze, randomizePose, randomizePosition, randomizeLocation]);

  // Randomize all visual fields (atmosphere, visual preset, color, lighting)
  const randomizeVisuals = useCallback(() => {
    randomizeAtmosphere();
    randomizeVisual();
    randomizeColor();
    randomizeLighting();
  }, [randomizeAtmosphere, randomizeVisual, randomizeColor, randomizeLighting]);

  // Randomize all camera fields
  const randomizeCameraAll = useCallback(() => {
    randomizeCamera();
    randomizeLens();
    randomizeShot();
    randomizeAspectRatio();
  }, [randomizeCamera, randomizeLens, randomizeShot, randomizeAspectRatio]);

  // Randomize absolutely everything - CONFLICT-FREE version
  // This function picks all values upfront to ensure NO conflicts or stacking warnings
  const randomizeAll = useCallback(() => {
    // === STEP 1: Pick subject FIRST (determines location compatibility) ===
    // Track if subject is human-like (can have gaze/pose)
    let isHumanSubject = false;
    let selectedSubjectText = '';

    if (!lockedSections.subject) {
      const subjectMeta = getRandomSubjectWithMeta();
      selectedSubjectText = getSubjectText(subjectMeta, useSafeMode);
      lastSubjectRef.current = subjectMeta.subject;
      setSubject(selectedSubjectText);
      triggerGlow('subject');

      // Only 'character' and 'portrait' categories are human-like
      isHumanSubject = subjectMeta.category === 'character' || subjectMeta.category === 'portrait';
    }

    // === STEP 2: Pick location compatible with subject (avoids physics conflicts) ===
    let selectedLocationLabel = '';
    if (!lockedSections.location) {
      // Filter locations to those compatible with the subject
      // e.g., F1 car can't be in Crystal Cave
      const compatibleLocations = selectedSubjectText
        ? filterCompatibleLocations(
            locationPresets,
            selectedSubjectText,
            undefined // themes are analyzed from text
          )
        : locationPresets;

      const chosenLocation = compatibleLocations.length > 0
        ? getRandomItem(compatibleLocations)
        : getRandomItem(locationPresets);

      selectedLocationLabel = chosenLocation.label;
      setLocation(selectedLocationLabel);
      triggerGlow('location');
    }

    // === STEP 3: Pick a random director (controls most style conflicts) ===
    let selectedDirectorConfig: DirectorStyle | null = null;
    if (!lockedSections.director) {
      selectedDirectorConfig = getRandomItem(directorStyles);
      handleDirectorChange(selectedDirectorConfig.name);
      triggerGlow('director');
    }

    // === STEP 4: Pick a camera that's not blocked by the director ===
    let selectedCameraLabel = '';
    if (!lockedSections.camera) {
      const blockedByDirector = new Set(selectedDirectorConfig?.blockedCameras || []);
      const availableCameras = cameraOptions.filter(cam => !blockedByDirector.has(cam.label));
      const chosenCamera = availableCameras.length > 0
        ? getRandomItem(availableCameras)
        : getRandomItem(cameraOptions);
      selectedCameraLabel = chosenCamera.label;
      handleCameraChange(selectedCameraLabel);
      triggerGlow('camera');

      const validRatios = aspectRatioOptions.filter(r => r.value !== 'none');
      setAspectRatio(getRandomItem(validRatios).value);
      triggerGlow('aspectRatio');
    }

    // === STEP 5: Collect all blocked atmospheres (from director, camera, AND location) ===
    const blockedAtmospheres = new Set<Atmosphere>();
    // From director
    if (selectedDirectorConfig) {
      selectedDirectorConfig.blockedAtmospheres.forEach(atm => blockedAtmospheres.add(atm));
    }
    // From camera category
    if (selectedCameraLabel) {
      const camCategory = cameraCategories[selectedCameraLabel] || 'none';
      const camRules = categoryConflicts[camCategory];
      if (camRules?.blockedAtmospheres) {
        camRules.blockedAtmospheres.forEach(atm => blockedAtmospheres.add(atm));
      }
    }
    // From location (era conflicts)
    if (selectedLocationLabel) {
      const atmosphereKeys = Object.keys(atmosphereConfigs) as Atmosphere[];
      atmosphereKeys.forEach(atm => {
        if (isAtmosphereBlockedByLocation(atm, selectedLocationLabel)) {
          blockedAtmospheres.add(atm);
        }
      });
    }

    // === STEP 6: Pick an atmosphere that's not blocked AND avoids style stacking ===
    let selectedAtmosphereKey: Atmosphere | null = null;
    if (!lockedSections.atmosphere) {
      const atmosphereKeys = Object.keys(atmosphereConfigs) as Atmosphere[];
      let availableAtmospheres = atmosphereKeys.filter(atm => !blockedAtmospheres.has(atm));

      // Avoid style stacking with director
      if (selectedDirectorConfig) {
        const directorStyleCats = new Set<StyleCategory>();
        // Simple check for common style categories the director implies
        const directorKeywords = selectedDirectorConfig.keywords.toLowerCase();
        if (directorKeywords.includes('contrast')) directorStyleCats.add('contrast');
        if (directorKeywords.includes('desaturated') || directorKeywords.includes('muted')) directorStyleCats.add('color');

        // Filter out atmospheres that would stack too many of the same categories
        if (directorStyleCats.size > 0) {
          const nonStackingAtmospheres = availableAtmospheres.filter(atm => {
            const atmCats = atmosphereImpliedStyles[atm] || [];
            const overlap = atmCats.filter(c => directorStyleCats.has(c)).length;
            return overlap < 2; // Allow some overlap but not too much
          });
          if (nonStackingAtmospheres.length > 0) {
            availableAtmospheres = nonStackingAtmospheres;
          }
        }
      }

      selectedAtmosphereKey = availableAtmospheres.length > 0
        ? getRandomItem(availableAtmospheres)
        : getRandomItem(atmosphereKeys);
      setSelectedAtmosphere(selectedAtmosphereKey);
      triggerGlow('atmosphere');
    }

    // === STEP 7: Pick lighting that doesn't conflict with atmosphere OR location ===
    let selectedLightingKey: LightingKey | null = null;
    if (!lockedSections.lighting) {
      const lightingKeys = Object.keys(lightingOptions) as LightingKey[];
      // Get lighting options that are redundant with the selected atmosphere
      const redundantLighting = selectedAtmosphereKey
        ? (atmosphereLightingRedundancy[selectedAtmosphereKey] || [])
        : [];
      const redundantSet = new Set(redundantLighting);

      // Filter out redundant AND location-incompatible lighting
      let availableLighting = lightingKeys.filter(l => !redundantSet.has(l));

      // Filter by location compatibility (indoor/outdoor)
      if (selectedLocationLabel) {
        availableLighting = availableLighting.filter(l =>
          !isLightingBlockedByLocation(l, selectedLocationLabel)
        );
      }

      selectedLightingKey = availableLighting.length > 0
        ? getRandomItem(availableLighting)
        : getRandomItem(lightingKeys);
      setSelectedLighting(selectedLightingKey);
      triggerGlow('lighting');
    }

    // === STEP 8: Pick a shot that doesn't conflict with atmosphere or subject ===
    let selectedShotLabel = '';
    if (!lockedSections.camera) {
      // Get shots blocked by atmosphere (e.g., epic blocks ECU)
      const blockedShots = selectedAtmosphereKey
        ? (atmosphereShotConflicts[selectedAtmosphereKey] || [])
        : [];
      const blockedShotSet = new Set(blockedShots);

      // POV shot is incompatible with third-person subject descriptions
      // All magic subjects describe things in third person ("A cliff diver...", "A samurai...")
      // POV means WE are the subject, creating a logical impossibility
      if (selectedSubjectText) {
        blockedShotSet.add('POV');
      }

      const availableShots = shotOptions.filter(s => !blockedShotSet.has(s.label));
      const chosenShot = availableShots.length > 0
        ? getRandomItem(availableShots)
        : getRandomItem(shotOptions);
      selectedShotLabel = chosenShot.label;
      setSelectedShot(selectedShotLabel);
      triggerGlow('shot');
    }

    // === STEP 9: Pick a lens compatible with shot type AND director style ===
    if (!lockedSections.camera && selectedCameraLabel) {
      // Check if camera supports interchangeable lenses
      const hasZoomRange = cameraZoomRange[selectedCameraLabel];
      const hasFixedLens = !hasZoomRange && (
        cameraFixedLens[selectedCameraLabel] ||
        categoryConflicts[cameraCategories[selectedCameraLabel] || 'none']?.fixedLens
      );

      if (!hasFixedLens && !hasZoomRange) {
        // Get lens categories blocked by the shot type
        const blockedLensByShot = selectedShotLabel
          ? (shotLensConflicts[selectedShotLabel] || [])
          : [];

        // Get lens categories blocked by director style
        // e.g., Kurosawa uses "telephoto compression" - don't pick Fisheye
        const blockedLensByDirector = selectedDirectorConfig
          ? getDirectorBlockedLenses(selectedDirectorConfig.name)
          : [];

        // Combine all blocked lens categories
        const blockedLensCatSet = new Set([...blockedLensByShot, ...blockedLensByDirector]);

        // Filter lenses to only compatible ones
        const availableLenses = lensOptions.filter(l => !blockedLensCatSet.has(l.category));
        const chosenLens = availableLenses.length > 0
          ? getRandomItem(availableLenses)
          : getRandomItem(lensOptions);
        setSelectedLens(chosenLens.value);
        triggerGlow('lens');
      } else {
        // Clear lens for fixed-lens cameras to avoid conflict
        setSelectedLens('');
      }
    }

    // === STEP 10: Collect all blocked presets (avoid style stacking) ===
    const blockedPresets = new Set<string>();
    // From director
    if (selectedDirectorConfig) {
      selectedDirectorConfig.blockedPresets.forEach(preset => blockedPresets.add(preset));
    }
    // From camera category
    if (selectedCameraLabel) {
      const camCategory = cameraCategories[selectedCameraLabel] || 'none';
      const camRules = categoryConflicts[camCategory];
      if (camRules?.blockedPresets) {
        camRules.blockedPresets.forEach(preset => blockedPresets.add(preset));
      }
    }

    // === STEP 11: Pick a preset that's not blocked AND avoids style stacking ===
    let selectedPresetKey: VisualPresetKey | null = null;
    if (!lockedSections.visual) {
      const presetKeys = Object.keys(visualPresets) as VisualPresetKey[];
      let availablePresets = presetKeys.filter(preset => !blockedPresets.has(preset));

      // Check style stacking and avoid presets that would cause overload
      if (selectedDirectorConfig && selectedAtmosphereKey) {
        const analysis = analyzeStyleStacking(
          selectedDirectorConfig.name,
          selectedAtmosphereKey,
          null, // We're picking the preset now
          selectedLightingKey
        );

        // If we're already at risk of stacking, prefer neutral presets
        if (analysis.totalAssertions >= 5) {
          const neutralPresets = availablePresets.filter(p =>
            p === 'raw' || p === 'filmlook' // These are less assertive
          );
          if (neutralPresets.length > 0) {
            availablePresets = neutralPresets;
          }
        }
      }

      selectedPresetKey = availablePresets.length > 0
        ? getRandomItem(availablePresets)
        : getRandomItem(presetKeys);
      setSelectedVisualPreset(selectedPresetKey);
      triggerGlow('visual');
    }

    // === STEP 12: Collect blocked DOF values (from camera, atmosphere, AND shot) ===
    const blockedDOF = new Set<string>();
    // From camera category
    if (selectedCameraLabel) {
      const camCategory = cameraCategories[selectedCameraLabel] || 'none';
      const camRules = categoryConflicts[camCategory];
      if (camRules?.blockedDOF) {
        camRules.blockedDOF.forEach(dof => blockedDOF.add(dof));
      }
    }
    // From atmosphere (dreamy blocks shallow+tilt-shift, romantic blocks shallow)
    if (selectedAtmosphereKey) {
      const atmBlockedDOF = atmosphereBlocksDOF[selectedAtmosphereKey];
      if (atmBlockedDOF) {
        atmBlockedDOF.forEach(dof => blockedDOF.add(dof));
      }
    }
    // From shot type (e.g., OTS blocks tilt-shift)
    if (selectedShotLabel) {
      const shotBlockedDOF = shotDOFConflicts[selectedShotLabel] || [];
      shotBlockedDOF.forEach(dof => blockedDOF.add(dof));
    }

    // === STEP 13: Pick a DOF that's not blocked ===
    if (!lockedSections.advanced) {
      const availableDOF = dofOptions.filter(dof => !blockedDOF.has(dof.value));
      const chosenDOF = availableDOF.length > 0
        ? getRandomItem(availableDOF)
        : getRandomItem(dofOptions);
      setDepthOfField(chosenDOF.value);
      triggerGlow('dof');
    }

    // === STEP 14: Pick color (no conflicts) ===
    if (!lockedSections.color) {
      const paletteKeys = Object.keys(colorPalettes);
      setSelectedColorPalette(getRandomItem(paletteKeys));
      triggerGlow('color');
    }

    // === STEP 15: Set character, gaze, pose, position based on subject type ===
    // Subject was already picked in STEP 1 - now set the human-specific options

    // Keep character empty for cleaner prompts - user can add manually if needed
    if (!lockedSections.character) {
      setCurrentCharacter('');
    }

    // Only apply gaze/pose to human subjects
    // Applying "looking at camera" or "walking" to a car causes model rejection
    if (!lockedSections.gaze) {
      if (isHumanSubject) {
        setGazeDirection(getRandomItem(gazeOptions));
        triggerGlow('gaze');
      } else {
        // Clear gaze for non-human subjects to avoid conflicts
        setGazeDirection('');
      }
    }

    if (!lockedSections.pose) {
      if (isHumanSubject) {
        setPoseAction(getRandomItem(poseOptions));
        triggerGlow('pose');
      } else {
        // Clear pose for non-human subjects to avoid conflicts
        setPoseAction('');
      }
    }

    if (!lockedSections.position) {
      // Position can apply to any subject (left, center, right framing)
      setCharacterPosition(getRandomItem(positionOptions));
      triggerGlow('position');
    }
  }, [
    lockedSections,
    useSafeMode,
    handleDirectorChange,
    handleCameraChange,
    setSelectedLens,
    setSelectedShot,
    setAspectRatio,
    setSelectedAtmosphere,
    setSelectedVisualPreset,
    setDepthOfField,
    setSelectedLighting,
    setSelectedColorPalette,
    setSubject,
    setCurrentCharacter,
    setGazeDirection,
    setPoseAction,
    setCharacterPosition,
    setLocation,
    triggerGlow,
  ]);

  return {
    // Magic glow state
    magicState,

    // Individual randomizers
    randomizeSubject,
    randomizeCharacter,
    randomizeGaze,
    randomizePose,
    randomizePosition,
    randomizeLocation,
    randomizeDirector,
    randomizeAtmosphere,
    randomizeVisual,
    randomizeColor,
    randomizeCamera,
    randomizeLens,
    randomizeShot,
    randomizeDOF,
    randomizeAspectRatio,
    randomizeLighting,

    // Group randomizers
    randomizeContent,
    randomizeVisuals,
    randomizeCameraAll,
    randomizeAll,
  };
}

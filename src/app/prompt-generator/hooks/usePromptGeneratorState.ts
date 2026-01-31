/**
 * Prompt Generator State Composition Hook
 *
 * Composes all domain-specific state hooks into a unified state object.
 * This is the main entry point for components that need full state access.
 *
 * Architecture:
 * - Each domain (model, creative, content, visual, camera, etc.) has its own hook
 * - This hook composes them and handles cross-domain interactions
 * - Provides backward-compatible API while internally being modular
 *
 * @module hooks/usePromptGeneratorState
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTheme } from './useTheme';
import { useConflicts } from './useConflicts';
import { generatePrompt } from '../utils';
import { analytics } from '../services';
import {
  useModelState,
  useCreativeControlsState,
  useContentState,
  useVisualState,
  useCameraState,
  useDirectorState,
  useAdvancedState,
  useSectionState,
  useClipboard,
  useCharacterCreatorState,
  useColorGradingState,
  useOutputFormatState,
  useFilmStockState,
  useGrainEngineState,
  useLensPhysicsState,
  useAdvancedLightingState,
  useCompositionEngineState,
  THEME_DEFAULTS,
} from './state';
import type { PromptGeneratorStateReturn } from './state/types';

/**
 * Main state composition hook for the Prompt Generator
 *
 * Combines all domain-specific hooks and provides:
 * - Unified state access for backward compatibility
 * - Cross-domain conflict resolution (camera/director clearing visual state)
 * - Memoized prompt generation
 * - Section-aware reset functionality
 *
 * @returns Complete prompt generator state and handlers
 *
 * @example
 * ```tsx
 * function PromptGenerator() {
 *   const state = usePromptGeneratorState();
 *
 *   return (
 *     <div>
 *       <ModelSelector
 *         selectedModel={state.selectedModel}
 *         onChange={state.setSelectedModel}
 *       />
 *       <OutputBar
 *         prompt={state.prompt}
 *         onCopy={state.copyToClipboard}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export function usePromptGeneratorState(): PromptGeneratorStateReturn {
  // ============================================================
  // Theme State
  // ============================================================
  const [darkMode, setDarkModeInternal] = useState(THEME_DEFAULTS.darkMode);
  const themeColors = useTheme(darkMode);

  const setDarkMode = useCallback((value: boolean) => {
    setDarkModeInternal(value);
    analytics.trackThemeToggle(value);
  }, []);

  // ============================================================
  // Domain State Hooks
  // ============================================================
  const model = useModelState();
  const creative = useCreativeControlsState();
  const content = useContentState();
  const visual = useVisualState();
  const advanced = useAdvancedState();
  const sections = useSectionState();
  const clipboard = useClipboard();
  const characterCreator = useCharacterCreatorState();
  const colorGrading = useColorGradingState();
  const outputFormat = useOutputFormatState();
  const filmStock = useFilmStockState();
  const grainEngine = useGrainEngineState();
  const lensPhysics = useLensPhysicsState();
  const advancedLighting = useAdvancedLightingState();
  const compositionEngine = useCompositionEngineState();

  // ============================================================
  // Camera State (depends on visual state for conflict clearing)
  // ============================================================
  const camera = useCameraState({
    isLocked: sections.lockedSections.camera,
    selectedAtmosphere: visual.selectedAtmosphere,
    selectedVisualPreset: visual.selectedVisualPreset,
    onClearAtmosphere: visual.resetAtmosphere,
    onClearVisualPreset: visual.resetVisualPreset,
  });

  // ============================================================
  // Director State (depends on visual state for conflict clearing)
  // ============================================================
  const director = useDirectorState({
    isLocked: sections.lockedSections.director,
    selectedAtmosphere: visual.selectedAtmosphere,
    selectedVisualPreset: visual.selectedVisualPreset,
    onClearAtmosphere: visual.resetAtmosphere,
    onClearVisualPreset: visual.resetVisualPreset,
  });

  // ============================================================
  // Conflict Detection
  // ============================================================
  const conflicts = useConflicts({
    selectedCamera: camera.selectedCamera,
    selectedAtmosphere: visual.selectedAtmosphere,
    selectedVisualPreset: visual.selectedVisualPreset,
    selectedLighting: visual.selectedLighting,
    depthOfField: camera.depthOfField,
    selectedDirector: director.selectedDirector,
    selectedLens: camera.selectedLens,
    customLens: camera.customLens,
    selectedShot: camera.selectedShot,
    selectedLocation: content.location,
  });

  // ============================================================
  // Section Toggle (with string key support for backward compat)
  // ============================================================
  const toggleSection = useCallback(
    (key: string) => {
      sections.toggleSection(key as keyof typeof sections.expandedSections);
    },
    [sections]
  );

  // ============================================================
  // Character Management (lock-aware wrappers)
  // ============================================================
  const addCharacter = useCallback(() => {
    if (!sections.lockedSections.character) {
      content.addCharacter();
    }
  }, [sections.lockedSections.character, content]);

  const removeCharacter = useCallback(
    (id: string) => {
      if (!sections.lockedSections.character) {
        content.removeCharacter(id);
      }
    },
    [sections.lockedSections.character, content]
  );

  // ============================================================
  // Prompt Generation (memoized)
  // ============================================================
  const prompt = useMemo(
    () =>
      generatePrompt({
        subject: content.subject,
        characterItems: content.characterItems,
        currentCharacter: content.currentCharacter,
        gazeDirection: content.gazeDirection,
        poseAction: content.poseAction,
        characterPosition: content.characterPosition,
        location: content.location,
        selectedVisualPreset: visual.selectedVisualPreset,
        selectedColorPalette: visual.selectedColorPalette,
        customColors: visual.customColors,
        selectedAtmosphere: visual.selectedAtmosphere,
        selectedLighting: visual.selectedLighting,
        selectedDirector: director.selectedDirector,
        selectedCamera: camera.selectedCamera,
        customCamera: camera.customCamera,
        selectedLens: camera.selectedLens,
        customLens: camera.customLens,
        selectedShot: camera.selectedShot,
        customShot: camera.customShot,
        depthOfField: camera.depthOfField,
        aspectRatio: camera.aspectRatio,
        selectedModel: model.selectedModel,
        negativePrompt: advanced.negativePrompt,
        creativeControlsEnabled: creative.enabled,
        creativity: creative.creativity,
        variation: creative.variation,
        uniqueness: creative.uniqueness,
        colorGrading: colorGrading.enabled ? {
          enabled: colorGrading.enabled,
          selectedPreset: colorGrading.selectedPreset,
          colorWheels: colorGrading.colorWheels,
          temperatureTint: colorGrading.temperatureTint,
          splitToning: colorGrading.splitToning,
          globalAdjustments: colorGrading.globalAdjustments,
        } : undefined,
        characterType: characterCreator.characterType,
        customSpecies: characterCreator.customSpecies,
        faceFeatures: characterCreator.faceFeatures,
        clothing: characterCreator.clothing,
        outputMode: outputFormat.mode,
        filmStock: filmStock.enabled ? {
          enabled: filmStock.enabled,
          selectedStock: filmStock.selectedStock,
          pushPull: filmStock.pushPull,
          processingType: filmStock.processingType,
        } : undefined,
        grainEngine: grainEngine.enabled ? {
          enabled: grainEngine.enabled,
          grainType: grainEngine.grainType,
          grainSize: grainEngine.grainSize,
          intensity: grainEngine.intensity,
          dustScratches: grainEngine.dustScratches,
          gateWeave: grainEngine.gateWeave,
        } : undefined,
        lensPhysics: lensPhysics.enabled ? {
          enabled: lensPhysics.enabled,
          focalLength: lensPhysics.focalLength,
          aperture: lensPhysics.aperture,
          distortion: lensPhysics.distortion,
          dofControl: lensPhysics.dofControl,
          bokehShape: lensPhysics.bokehShape,
        } : undefined,
        advancedLighting: advancedLighting.enabled ? {
          enabled: advancedLighting.enabled,
          keyLightPosition: advancedLighting.keyLightPosition,
          keyFillRatio: advancedLighting.keyFillRatio,
          colorTemperature: advancedLighting.colorTemperature,
          shadowStop: advancedLighting.shadowStop,
          rimLight: advancedLighting.rimLight,
          lightQuality: advancedLighting.lightQuality,
        } : undefined,
        compositionEngine: compositionEngine.enabled ? {
          enabled: compositionEngine.enabled,
          preset: compositionEngine.preset,
          subjectPlacement: compositionEngine.subjectPlacement,
          frameOccupancy: compositionEngine.frameOccupancy,
          negativeSpace: compositionEngine.negativeSpace,
          vanishingPoint: compositionEngine.vanishingPoint,
          ruleOfThirds: compositionEngine.ruleOfThirds,
          frameBalance: compositionEngine.frameBalance,
        } : undefined,
      }),
    [
      content.subject,
      content.characterItems,
      content.currentCharacter,
      content.gazeDirection,
      content.poseAction,
      content.characterPosition,
      content.location,
      visual.selectedVisualPreset,
      visual.selectedColorPalette,
      visual.customColors,
      visual.selectedAtmosphere,
      visual.selectedLighting,
      director.selectedDirector,
      camera.selectedCamera,
      camera.customCamera,
      camera.selectedLens,
      camera.customLens,
      camera.selectedShot,
      camera.customShot,
      camera.depthOfField,
      camera.aspectRatio,
      model.selectedModel,
      advanced.negativePrompt,
      creative.enabled,
      creative.creativity,
      creative.variation,
      creative.uniqueness,
      colorGrading.enabled,
      colorGrading.selectedPreset,
      colorGrading.colorWheels,
      colorGrading.temperatureTint,
      colorGrading.splitToning,
      colorGrading.globalAdjustments,
      characterCreator.characterType,
      characterCreator.customSpecies,
      characterCreator.faceFeatures,
      characterCreator.clothing,
      outputFormat.mode,
      filmStock.enabled,
      filmStock.selectedStock,
      filmStock.pushPull,
      filmStock.processingType,
      grainEngine.enabled,
      grainEngine.grainType,
      grainEngine.grainSize,
      grainEngine.intensity,
      grainEngine.dustScratches,
      grainEngine.gateWeave,
      lensPhysics.enabled,
      lensPhysics.focalLength,
      lensPhysics.aperture,
      lensPhysics.distortion,
      lensPhysics.dofControl,
      lensPhysics.bokehShape,
      advancedLighting.enabled,
      advancedLighting.keyLightPosition,
      advancedLighting.keyFillRatio,
      advancedLighting.colorTemperature,
      advancedLighting.shadowStop,
      advancedLighting.rimLight,
      advancedLighting.lightQuality,
      compositionEngine.enabled,
      compositionEngine.preset,
      compositionEngine.subjectPlacement,
      compositionEngine.frameOccupancy,
      compositionEngine.negativeSpace,
      compositionEngine.vanishingPoint,
      compositionEngine.ruleOfThirds,
      compositionEngine.frameBalance,
    ]
  );

  // ============================================================
  // Clipboard Action (with analytics tracking)
  // ============================================================
  const copyToClipboard = useCallback(async () => {
    await clipboard.copy(prompt);

    // Track copy event with prompt metadata
    analytics.trackPromptCopy({
      model: model.selectedModel,
      promptLength: prompt.length,
      hasDirector: !!director.selectedDirector,
      director: director.selectedDirector || undefined,
      hasAtmosphere: !!visual.selectedAtmosphere,
      aspectRatio: camera.aspectRatio || undefined,
      creativeControlsEnabled: creative.enabled,
    });
  }, [
    clipboard,
    prompt,
    model.selectedModel,
    director.selectedDirector,
    visual.selectedAtmosphere,
    camera.aspectRatio,
    creative.enabled,
  ]);

  // ============================================================
  // Reset All (respects locked sections)
  // ============================================================
  const resetAll = useCallback(() => {
    const locks = sections.lockedSections;

    // Reset individual content fields based on their locks
    if (!locks.subject) {
      content.resetSubject();
    }
    if (!locks.character) {
      content.resetCharacter();
    }
    if (!locks.gaze) {
      content.resetGaze();
    }
    if (!locks.pose) {
      content.resetPose();
    }
    if (!locks.position) {
      content.resetPosition();
    }
    if (!locks.location) {
      content.resetLocation();
    }
    if (!locks.atmosphere) {
      visual.resetAtmosphere();
    }
    if (!locks.visual) {
      visual.resetVisualPreset();
    }
    if (!locks.lighting) {
      visual.resetLighting();
    }
    if (!locks.color) {
      visual.resetColors();
    }
    if (!locks.camera) {
      camera.reset();
    }
    if (!locks.advanced) {
      advanced.reset();
      creative.reset();
    }
    if (!locks.director) {
      director.reset();
    }
    if (!locks.characterCreator) {
      characterCreator.reset();
    }
    if (!locks.colorGrading) {
      colorGrading.reset();
    }
    if (!locks.filmStock) {
      filmStock.reset();
    }
    if (!locks.grainEngine) {
      grainEngine.reset();
    }
    if (!locks.lensPhysics) {
      lensPhysics.reset();
    }
    if (!locks.advancedLighting) {
      advancedLighting.reset();
    }
    if (!locks.compositionEngine) {
      compositionEngine.reset();
    }

    // Track reset action
    analytics.trackReset();
  }, [sections.lockedSections, content, visual, camera, advanced, creative, director, characterCreator, colorGrading, filmStock, grainEngine, lensPhysics, advancedLighting, compositionEngine]);

  // ============================================================
  // Return Unified State Object
  // ============================================================
  return {
    // Theme
    darkMode,
    setDarkMode,
    copied: clipboard.copied,
    themeColors,

    // Model
    selectedModel: model.selectedModel,
    setSelectedModel: model.setSelectedModel,

    // Creative Controls
    creativity: creative.creativity,
    setCreativity: creative.setCreativity,
    variation: creative.variation,
    setVariation: creative.setVariation,
    uniqueness: creative.uniqueness,
    setUniqueness: creative.setUniqueness,
    creativeControlsEnabled: creative.enabled,
    setCreativeControlsEnabled: creative.setEnabled,

    // Content
    subject: content.subject,
    setSubject: content.setSubject,
    characterItems: content.characterItems,
    currentCharacter: content.currentCharacter,
    setCurrentCharacter: content.setCurrentCharacter,
    gazeDirection: content.gazeDirection,
    setGazeDirection: content.setGazeDirection,
    poseAction: content.poseAction,
    setPoseAction: content.setPoseAction,
    characterPosition: content.characterPosition,
    setCharacterPosition: content.setCharacterPosition,
    location: content.location,
    setLocation: content.setLocation,
    addCharacter,
    removeCharacter,

    // Character Creator
    characterType: characterCreator.characterType,
    setCharacterType: characterCreator.setCharacterType,
    customSpecies: characterCreator.customSpecies,
    setCustomSpecies: characterCreator.setCustomSpecies,
    faceFeatures: characterCreator.faceFeatures,
    setFaceFeature: characterCreator.setFaceFeature,
    clothing: characterCreator.clothing,
    setClothing: characterCreator.setClothing,
    resetCharacterCreator: characterCreator.reset,

    // Visual
    selectedAtmosphere: visual.selectedAtmosphere,
    setSelectedAtmosphere: visual.setSelectedAtmosphere,
    selectedVisualPreset: visual.selectedVisualPreset,
    setSelectedVisualPreset: visual.setSelectedVisualPreset,
    selectedLighting: visual.selectedLighting,
    setSelectedLighting: visual.setSelectedLighting,
    selectedColorPalette: visual.selectedColorPalette,
    setSelectedColorPalette: visual.setSelectedColorPalette,
    customColors: visual.customColors,
    setCustomColors: visual.setCustomColors,

    // Camera
    selectedCamera: camera.selectedCamera,
    customCamera: camera.customCamera,
    setCustomCamera: camera.setCustomCamera,
    selectedLens: camera.selectedLens,
    setSelectedLens: camera.setSelectedLens,
    customLens: camera.customLens,
    setCustomLens: camera.setCustomLens,
    selectedShot: camera.selectedShot,
    setSelectedShot: camera.setSelectedShot,
    customShot: camera.customShot,
    setCustomShot: camera.setCustomShot,
    depthOfField: camera.depthOfField,
    setDepthOfField: camera.setDepthOfField,
    aspectRatio: camera.aspectRatio,
    setAspectRatio: camera.setAspectRatio,
    handleCameraChange: camera.setCamera,

    // Director
    selectedDirector: director.selectedDirector,
    handleDirectorChange: director.setDirector,

    // Advanced
    negativePrompt: advanced.negativePrompt,
    setNegativePrompt: advanced.setNegativePrompt,
    showAdvanced: advanced.showAdvanced,
    setShowAdvanced: advanced.setShowAdvanced,

    // UI
    lockedSections: sections.lockedSections,
    toggleLock: sections.toggleLock,
    expandedSections: sections.expandedSections,
    toggleSection,
    conflicts,

    // Color Grading
    colorGrading,

    // Output Format
    outputMode: outputFormat.mode,
    setOutputMode: outputFormat.setMode,

    // Film Stock
    filmStock,

    // Grain Engine
    grainEngine,

    // Lens Physics
    lensPhysics,

    // Advanced Lighting
    advancedLighting,

    // Composition Engine
    compositionEngine,

    // Actions
    prompt,
    copyToClipboard,
    resetAll,
  };
}

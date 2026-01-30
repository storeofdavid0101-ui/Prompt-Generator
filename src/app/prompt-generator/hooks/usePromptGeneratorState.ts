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
  const [darkMode, setDarkMode] = useState(THEME_DEFAULTS.darkMode);
  const themeColors = useTheme(darkMode);

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
    depthOfField: camera.depthOfField,
    selectedDirector: director.selectedDirector,
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
    if (!sections.lockedSections.subject) {
      content.addCharacter();
    }
  }, [sections.lockedSections.subject, content]);

  const removeCharacter = useCallback(
    (id: string) => {
      if (!sections.lockedSections.subject) {
        content.removeCharacter(id);
      }
    },
    [sections.lockedSections.subject, content]
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
      }),
    [
      content.subject,
      content.characterItems,
      content.currentCharacter,
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
    ]
  );

  // ============================================================
  // Clipboard Action
  // ============================================================
  const copyToClipboard = useCallback(async () => {
    await clipboard.copy(prompt);
  }, [clipboard, prompt]);

  // ============================================================
  // Reset All (respects locked sections)
  // ============================================================
  const resetAll = useCallback(() => {
    const locks = sections.lockedSections;

    if (!locks.subject) {
      content.reset();
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
  }, [sections.lockedSections, content, visual, camera, advanced, creative, director]);

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
    location: content.location,
    setLocation: content.setLocation,
    addCharacter,
    removeCharacter,

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

    // Actions
    prompt,
    copyToClipboard,
    resetAll,
  };
}

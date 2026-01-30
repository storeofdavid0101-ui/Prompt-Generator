/**
 * @fileoverview Parameter resolution utilities.
 * Handles lookups and transformations of user selections to prompt components.
 */

import type { PromptBuilderParams, ResolvedComponents } from './types';
import { filterValidColors, formatColorPalette } from './colorUtils';
import {
  atmosphereConfigs,
  visualPresets,
  lightingOptions,
  colorPalettes,
  cameraOptions,
  shotOptions,
  dofOptions,
  aspectRatioOptions,
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  directorStyles,
} from '../../config';

/**
 * Resolves all user selections into prompt-ready components.
 * Handles config lookups, custom overrides, and conflict detection.
 *
 * @param params - Raw user input parameters
 * @returns Resolved components ready for prompt composition
 */
export function resolveComponents(params: PromptBuilderParams): ResolvedComponents {
  const characters = resolveCharacters(params);
  const location = resolveLocation(params.location);
  const cameraResult = resolveCamera(params);

  return {
    subject: params.subject.trim(),
    characters,
    location,
    visualPreset: resolveVisualPreset(params.selectedVisualPreset),
    colorPalette: resolveColorPalette(params.selectedColorPalette, params.customColors),
    atmosphere: resolveAtmosphere(params.selectedAtmosphere),
    lighting: resolveLighting(params.selectedLighting),
    director: resolveDirector(params.selectedDirector),
    camera: cameraResult.camera,
    lens: cameraResult.lens,
    shot: resolveShot(params.selectedShot, params.customShot),
    dof: resolveDof(params.depthOfField, params.selectedCamera),
  };
}

/**
 * Combines character items and current character input.
 */
function resolveCharacters(params: PromptBuilderParams): string[] {
  const characters = params.characterItems.map((c) => c.content);
  const currentTrimmed = params.currentCharacter.trim();

  if (currentTrimmed) {
    characters.push(currentTrimmed);
  }

  return characters;
}

/**
 * Formats location with "in" prefix if provided.
 */
function resolveLocation(location: string): string {
  const trimmed = location.trim();
  return trimmed ? `in ${trimmed}` : '';
}

/**
 * Looks up visual preset keywords from configuration.
 */
function resolveVisualPreset(selectedPreset: string | null): string | null {
  if (!selectedPreset || !visualPresets[selectedPreset]) {
    return null;
  }
  return visualPresets[selectedPreset].keywords;
}

/**
 * Resolves color palette from preset or custom colors.
 */
function resolveColorPalette(
  selectedPalette: string | null,
  customColors: string[]
): string | null {
  if (!selectedPalette) {
    return null;
  }

  if (selectedPalette === 'custom') {
    const validColors = filterValidColors(customColors);
    return validColors.length > 0 ? formatColorPalette(validColors) : null;
  }

  const paletteConfig = colorPalettes[selectedPalette];
  return paletteConfig ? paletteConfig.colors.join(', ') : null;
}

/**
 * Looks up atmosphere keywords from configuration.
 */
function resolveAtmosphere(selectedAtmosphere: string | null): string | null {
  if (!selectedAtmosphere) {
    return null;
  }

  const config = atmosphereConfigs[selectedAtmosphere as keyof typeof atmosphereConfigs];
  return config ? config.keywords : null;
}

/**
 * Looks up lighting keywords from configuration.
 */
function resolveLighting(selectedLighting: string | null): string | null {
  if (!selectedLighting || !lightingOptions[selectedLighting]) {
    return null;
  }
  return lightingOptions[selectedLighting].keywords;
}

/**
 * Looks up director style keywords from configuration.
 */
function resolveDirector(selectedDirector: string): string | null {
  if (!selectedDirector) {
    return null;
  }

  const config = directorStyles.find((d) => d.name === selectedDirector);
  return config ? config.keywords : null;
}

/**
 * Resolves camera and lens settings, accounting for fixed-lens cameras.
 */
function resolveCamera(params: PromptBuilderParams): { camera: string | null; lens: string | null } {
  const { selectedCamera, customCamera, selectedLens, customLens } = params;

  // Resolve camera keywords
  const cameraConfig = cameraOptions.find((c) => c.label === selectedCamera);
  const camera = customCamera.trim() || (cameraConfig ? cameraConfig.keywords : '') || null;

  // Check if camera has fixed or zoom lens configuration
  const cameraCategory = selectedCamera ? cameraCategories[selectedCamera] || 'none' : 'none';
  const hasZoomRange = selectedCamera ? cameraZoomRange[selectedCamera] : null;
  const hasFixedLens = selectedCamera && !hasZoomRange
    ? cameraFixedLens[selectedCamera] || categoryConflicts[cameraCategory]?.fixedLens
    : null;

  // Only include lens for cameras that support interchangeable/zoom lenses
  const lens = hasFixedLens ? null : (customLens.trim() || selectedLens || null);

  return { camera, lens };
}

/**
 * Looks up shot type keywords from configuration.
 */
function resolveShot(selectedShot: string, customShot: string): string | null {
  if (customShot.trim()) {
    return customShot.trim();
  }

  if (!selectedShot) {
    return null;
  }

  const config = shotOptions.find((s) => s.label === selectedShot);
  return config ? config.keywords : selectedShot;
}

/**
 * Resolves depth of field setting, respecting camera category restrictions.
 */
function resolveDof(depthOfField: string, selectedCamera: string): string | null {
  if (!depthOfField) {
    return null;
  }

  const dofConfig = dofOptions.find((d) => d.value === depthOfField);
  if (!dofConfig || !dofConfig.keywords) {
    return null;
  }

  // Check if DOF is blocked for this camera category
  const cameraCategory = selectedCamera ? cameraCategories[selectedCamera] || 'none' : 'none';
  const categoryRules = categoryConflicts[cameraCategory];

  if (categoryRules?.blockedDOF?.includes(depthOfField)) {
    return null;
  }

  return dofConfig.keywords;
}

/**
 * Resolves aspect ratio to display format.
 *
 * @param aspectRatio - The aspect ratio value identifier
 * @returns The display ratio string (e.g., "16:9") or null
 */
export function resolveAspectRatio(aspectRatio: string): string | null {
  if (aspectRatio === 'none') {
    return null;
  }

  const config = aspectRatioOptions.find((r) => r.value === aspectRatio);
  return config ? config.ratio : null;
}

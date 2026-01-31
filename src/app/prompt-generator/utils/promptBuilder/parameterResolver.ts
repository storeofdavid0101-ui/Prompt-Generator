/**
 * @fileoverview Parameter resolution utilities.
 * Handles lookups and transformations of user selections to prompt components.
 */

import type { PromptBuilderParams, ResolvedComponents, AIModel } from './types';
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
  modelConfigs,
  locationPresets,
} from '../../config';

/**
 * Checks if a model has strict content policies.
 * Models with strict policies use safe keyword alternatives.
 */
function hasStrictContentPolicy(model: AIModel): boolean {
  return modelConfigs[model]?.strictContentPolicy === true;
}

/** Input length limits to prevent prompt bloating */
const INPUT_LIMITS = {
  subject: 2000,
  location: 500,
  character: 500,
  customCamera: 200,
  customLens: 100,
  customShot: 200,
} as const;

/** Maximum number of characters allowed */
const MAX_CHARACTERS = 15;

/**
 * Truncates a string to a maximum length.
 */
function truncate(str: string, maxLength: number): string {
  const trimmed = str.trim();
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

/**
 * Resolves all user selections into prompt-ready components.
 * Handles config lookups, custom overrides, and conflict detection.
 * Uses safe keyword alternatives for models with strict content policies.
 *
 * @param params - Raw user input parameters
 * @param model - Target AI model (used for model-specific handling)
 * @returns Resolved components ready for prompt composition
 */
export function resolveComponents(params: PromptBuilderParams, model: AIModel): ResolvedComponents {
  const characters = resolveCharacters(params);
  const cameraResult = resolveCamera(params);

  // Check if this model has strict content policies (ChatGPT, DALL-E, Firefly)
  const useSafeMode = hasStrictContentPolicy(model);

  return {
    subject: truncate(params.subject, INPUT_LIMITS.subject),
    characters,
    gaze: resolveGaze(params.gazeDirection),
    pose: resolvePose(params.poseAction, useSafeMode),
    position: resolvePosition(params.characterPosition, model),
    location: resolveLocation(params.location, useSafeMode),
    visualPreset: resolveVisualPreset(params.selectedVisualPreset),
    colorPalette: resolveColorPalette(params.selectedColorPalette, params.customColors),
    atmosphere: resolveAtmosphere(params.selectedAtmosphere, useSafeMode),
    lighting: resolveLighting(params.selectedLighting),
    director: resolveDirector(params.selectedDirector, useSafeMode),
    camera: cameraResult.camera,
    lens: cameraResult.lens,
    shot: resolveShot(params.selectedShot, params.customShot),
    dof: resolveDof(params.depthOfField, params.selectedCamera),
  };
}

/**
 * Combines character items and current character input.
 * Limits the number of characters and truncates each to prevent prompt bloating.
 */
function resolveCharacters(params: PromptBuilderParams): string[] {
  // Truncate each character description
  const characters = params.characterItems
    .slice(0, MAX_CHARACTERS)
    .map((c) => truncate(c.content, INPUT_LIMITS.character));

  const currentTrimmed = truncate(params.currentCharacter, INPUT_LIMITS.character);

  // Only add current character if under the limit
  if (currentTrimmed && characters.length < MAX_CHARACTERS) {
    characters.push(currentTrimmed);
  }

  return characters;
}

/** Prepositions that indicate location already has proper prefix */
const LOCATION_PREPOSITIONS = [
  'in ', 'on ', 'at ', 'by ', 'near ', 'beside ', 'behind ', 'above ', 'below ',
  'under ', 'over ', 'inside ', 'outside ', 'within ', 'around ', 'through ',
  'across ', 'along ', 'between ', 'among ', 'beneath ', 'upon ', 'against ',
];

/**
 * Formats location with "in" prefix if provided.
 * Detects if location already starts with a preposition to avoid double-prefix.
 * Uses safe keywords for models with strict content policies.
 * Truncates to prevent prompt bloating.
 *
 * @param location - The location string or preset label
 * @param useSafeMode - Whether to use safe keywords for strict content policy models
 */
function resolveLocation(location: string, useSafeMode: boolean = false): string {
  const trimmed = truncate(location, INPUT_LIMITS.location);
  if (!trimmed) {
    return '';
  }

  // Check if location matches a preset and use appropriate keywords
  const preset = locationPresets.find(p => p.label === trimmed || p.keywords.includes(trimmed));
  if (preset) {
    const keywords = useSafeMode && preset.safeKeywords ? preset.safeKeywords : preset.keywords;
    return `in ${keywords}`;
  }

  // Check if location already starts with a preposition
  const lowerTrimmed = trimmed.toLowerCase();
  const hasPreposition = LOCATION_PREPOSITIONS.some(prep => lowerTrimmed.startsWith(prep));

  return hasPreposition ? trimmed : `in ${trimmed}`;
}

/** Gaze direction keywords - detailed version for tag-based prompts */
const gazeKeywords: Record<string, string> = {
  direct: 'looking directly at the camera, intense eye contact',
  left: 'looking left, profile view',
  right: 'looking right, profile view',
  up: 'looking upwards, gazing at the sky',
  down: 'looking down, pensive expression',
  away: 'facing away from camera, back view',
  shoulder: 'looking over shoulder at camera',
};

/**
 * Resolves gaze direction to keywords.
 */
function resolveGaze(gazeDirection: string): string | null {
  if (!gazeDirection) {
    return null;
  }
  return gazeKeywords[gazeDirection] || null;
}

/** Pose/action keywords - concise version */
const poseKeywords: Record<string, string> = {
  standing: 'standing composed',
  stride: 'mid-stride, walking',
  sprint: 'running at full speed, frozen motion',
  seated: 'sitting down',
  kneeling: 'kneeling',
  combat: 'combat stance, dynamic pose',
};

/** Safe pose/action keywords for models with strict content policies */
const safePoseKeywords: Record<string, string> = {
  standing: 'standing composed',
  stride: 'mid-stride, walking',
  sprint: 'running at full speed, frozen motion',
  seated: 'sitting down',
  kneeling: 'kneeling',
  combat: 'action stance, dynamic pose', // Removed "combat" for safe mode
};

/**
 * Resolves pose/action to keywords.
 * Uses safe alternatives for models with strict content policies.
 *
 * @param poseAction - The pose action key
 * @param useSafeMode - Whether to use safe keywords
 */
function resolvePose(poseAction: string, useSafeMode: boolean = false): string | null {
  if (!poseAction) {
    return null;
  }
  const keywords = useSafeMode ? safePoseKeywords : poseKeywords;
  return keywords[poseAction] || null;
}

/** Character position keywords - reinforced composition terms for stronger effect */
const positionKeywords: Record<string, string> = {
  left: 'asymmetrical composition, subject positioned on the far left of frame, large negative space on right side, off-center framing, rule of thirds left intersection point',
  center: 'symmetrical centered composition, subject perfectly centered in frame, balanced framing, central focal point',
  right: 'asymmetrical composition, subject positioned on the far right of frame, large negative space on left side, off-center framing, rule of thirds right intersection point',
};

/** Stable Diffusion specific position syntax using BREAK keyword for regional prompting */
const sdPositionKeywords: Record<string, string> = {
  left: 'BREAK subject on left side of image BREAK empty space on right',
  center: 'BREAK subject centered in middle of image BREAK',
  right: 'BREAK empty space on left BREAK subject on right side of image',
};

/** Models that support BREAK keyword for regional separation */
const BREAK_SUPPORTED_MODELS: AIModel[] = ['stable-diffusion'];

/**
 * Resolves character position to keywords.
 * Uses model-specific syntax when available (e.g., BREAK for Stable Diffusion).
 */
function resolvePosition(characterPosition: string, model?: AIModel): string | null {
  if (!characterPosition) {
    return null;
  }

  // Use SD-specific BREAK syntax for supported models
  if (model && BREAK_SUPPORTED_MODELS.includes(model)) {
    return sdPositionKeywords[characterPosition] || positionKeywords[characterPosition] || null;
  }

  return positionKeywords[characterPosition] || null;
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
 * Uses safe keywords for models with strict content policies.
 *
 * @param selectedAtmosphere - The atmosphere key
 * @param useSafeMode - Whether to use safe keywords
 */
function resolveAtmosphere(selectedAtmosphere: string | null, useSafeMode: boolean = false): string | null {
  if (!selectedAtmosphere) {
    return null;
  }

  const config = atmosphereConfigs[selectedAtmosphere as keyof typeof atmosphereConfigs];
  if (!config) {
    return null;
  }

  // Use safe keywords if available and in safe mode
  if (useSafeMode && config.safeKeywords) {
    return config.safeKeywords;
  }

  return config.keywords;
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
 * Uses safe keywords for models with strict content policies.
 * Falls back to anonymous keywords if safe keywords not available.
 *
 * @param selectedDirector - The selected director name
 * @param useSafeMode - Whether to use safe keywords for strict content policy models
 */
function resolveDirector(selectedDirector: string, useSafeMode: boolean = false): string | null {
  if (!selectedDirector) {
    return null;
  }

  const config = directorStyles.find((d) => d.name === selectedDirector);
  if (!config) {
    return null;
  }

  // For safe mode, prefer safeKeywords, fall back to anonymousKeywords
  if (useSafeMode) {
    return config.safeKeywords || config.anonymousKeywords;
  }

  return config.keywords;
}

/**
 * Resolves camera and lens settings, accounting for fixed-lens cameras.
 * Truncates custom inputs to prevent prompt bloating.
 */
function resolveCamera(params: PromptBuilderParams): { camera: string | null; lens: string | null } {
  const { selectedCamera, customCamera, selectedLens, customLens } = params;

  // Resolve camera keywords (truncate custom input)
  const customCameraTrimmed = truncate(customCamera, INPUT_LIMITS.customCamera);
  const cameraConfig = cameraOptions.find((c) => c.label === selectedCamera);
  const camera = customCameraTrimmed || (cameraConfig ? cameraConfig.keywords : '') || null;

  // Check if camera has fixed or zoom lens configuration
  const cameraCategory = selectedCamera ? cameraCategories[selectedCamera] || 'none' : 'none';
  const hasZoomRange = selectedCamera ? cameraZoomRange[selectedCamera] : null;
  const hasFixedLens = selectedCamera && !hasZoomRange
    ? cameraFixedLens[selectedCamera] || categoryConflicts[cameraCategory]?.fixedLens
    : null;

  // Only include lens for cameras that support interchangeable/zoom lenses (truncate custom input)
  const customLensTrimmed = truncate(customLens, INPUT_LIMITS.customLens);
  const lens = hasFixedLens ? null : (customLensTrimmed || selectedLens || null);

  return { camera, lens };
}

/**
 * Looks up shot type keywords from configuration.
 * Truncates custom shot to prevent prompt bloating.
 */
function resolveShot(selectedShot: string, customShot: string): string | null {
  const customShotTrimmed = truncate(customShot, INPUT_LIMITS.customShot);
  if (customShotTrimmed) {
    return customShotTrimmed;
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

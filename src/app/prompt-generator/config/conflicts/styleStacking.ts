/**
 * Style Stacking Detection Configuration
 *
 * Prevents style overload that causes AI model confusion:
 * - Too many overlapping style terms
 * - Redundant style assertions
 * - Contradictory style combinations
 *
 * Based on ChatGPT analysis:
 * "Seven style assertions, many overlapping. Models tend to reject rather than choose."
 *
 * @module conflicts/styleStacking
 */

import type { Atmosphere, LightingKey, VisualPresetKey } from '../types';

/**
 * Style category for grouping similar assertions.
 */
export type StyleCategory =
  | 'realism'      // photorealistic, realistic, live-action
  | 'film'         // film grain, 35mm, cinema
  | 'color'        // saturated, desaturated, vivid
  | 'contrast'     // high contrast, low contrast
  | 'era'          // 70s, retro, vintage, modern
  | 'medium'       // photography, illustration, painting
  | 'mood';        // dramatic, cinematic, moody

/**
 * Maps director keywords to style categories they imply.
 * Used to detect stacking when director already implies these styles.
 */
export const directorImpliedStyles: Record<string, StyleCategory[]> = {
  'Wes Anderson': ['color', 'film'],
  'Christopher Nolan': ['realism', 'film', 'contrast'],
  'Denis Villeneuve': ['realism', 'mood', 'contrast'],
  'Roger Deakins': ['realism', 'mood'],
  'Ridley Scott': ['realism', 'mood', 'contrast'],
  'David Fincher': ['color', 'mood', 'contrast'],
  'Stanley Kubrick': ['film', 'contrast'],
  'Wong Kar-wai': ['color', 'mood', 'film'],
  'Terrence Malick': ['realism', 'mood'],
  'David Lynch': ['mood', 'contrast'],
  'Quentin Tarantino': ['film', 'color'],
};

/**
 * Maps atmosphere to style categories they imply.
 */
export const atmosphereImpliedStyles: Record<Atmosphere, StyleCategory[]> = {
  cinematic: ['film', 'mood'],
  cyberpunk: ['color', 'contrast', 'mood'],
  studio: ['realism', 'contrast'],
  moody: ['mood', 'contrast'],
  dreamy: ['mood', 'color'],
  natural: ['realism'],
  vintage: ['era', 'film', 'color'],
  epic: ['film', 'mood'],
  horror: ['mood', 'contrast'],
  romantic: ['mood', 'color'],
};

/**
 * Maps visual preset to style categories.
 */
export const presetImpliedStyles: Record<VisualPresetKey, StyleCategory[]> = {
  raw: ['realism'],
  highcontrast: ['contrast'],
  desaturated: ['color'],
  vivid: ['color'],
  filmlook: ['film', 'era'],
  bleachbypass: ['color', 'contrast', 'film'],
};

/**
 * Maps lighting to style categories.
 */
export const lightingImpliedStyles: Partial<Record<LightingKey, StyleCategory[]>> = {
  chiaroscuro: ['contrast', 'mood'],
  highkey: ['contrast'],
  lowkey: ['contrast', 'mood'],
  neon: ['color', 'mood'],
  goldenhour: ['color'],
  moonlit: ['mood', 'color'],
};

/**
 * Maximum recommended count for each style category.
 * Going over this creates redundancy/conflict.
 */
export const STYLE_CATEGORY_LIMITS: Record<StyleCategory, number> = {
  realism: 2,    // Max 2 realism assertions (e.g., photorealistic + live-action)
  film: 2,       // Max 2 film terms (e.g., 35mm + cinema)
  color: 1,      // Only 1 color treatment (vivid OR desaturated, not both)
  contrast: 1,   // Only 1 contrast setting
  era: 1,        // Only 1 era (70s OR modern, not multiple)
  medium: 1,     // Only 1 medium (photography OR illustration)
  mood: 2,       // Max 2 mood terms
};

/**
 * Style combinations that are explicitly contradictory.
 * These should never be combined.
 */
export const contradictoryStyles: Array<[StyleCategory, StyleCategory]> = [
  // Vivid and desaturated are opposites - handled by preset mutual exclusions
];

/**
 * Analyze current style selections and count category usage.
 */
export interface StyleStackingAnalysis {
  /** Count of assertions per category */
  readonly categoryCounts: Record<StyleCategory, number>;
  /** Categories that exceed limits */
  readonly overloadedCategories: StyleCategory[];
  /** Total style assertion count */
  readonly totalAssertions: number;
  /** Whether style stacking is likely to cause issues */
  readonly hasStyleOverload: boolean;
  /** Warning message if overloaded */
  readonly warningMessage: string | null;
}

/**
 * Analyze style stacking for given selections.
 */
export function analyzeStyleStacking(
  director: string | null,
  atmosphere: Atmosphere | null,
  preset: VisualPresetKey | null,
  lighting: LightingKey | null
): StyleStackingAnalysis {
  const categoryCounts: Record<StyleCategory, number> = {
    realism: 0,
    film: 0,
    color: 0,
    contrast: 0,
    era: 0,
    medium: 0,
    mood: 0,
  };

  // Count director implied styles
  if (director && directorImpliedStyles[director]) {
    directorImpliedStyles[director].forEach((cat) => {
      categoryCounts[cat]++;
    });
  }

  // Count atmosphere implied styles
  if (atmosphere) {
    atmosphereImpliedStyles[atmosphere].forEach((cat) => {
      categoryCounts[cat]++;
    });
  }

  // Count preset implied styles
  if (preset && presetImpliedStyles[preset]) {
    presetImpliedStyles[preset].forEach((cat) => {
      categoryCounts[cat]++;
    });
  }

  // Count lighting implied styles
  if (lighting && lightingImpliedStyles[lighting]) {
    lightingImpliedStyles[lighting]!.forEach((cat) => {
      categoryCounts[cat]++;
    });
  }

  // Find overloaded categories
  const overloadedCategories: StyleCategory[] = [];
  for (const [category, count] of Object.entries(categoryCounts) as Array<[StyleCategory, number]>) {
    if (count > STYLE_CATEGORY_LIMITS[category]) {
      overloadedCategories.push(category);
    }
  }

  // Calculate total assertions
  const totalAssertions = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  // Determine if there's style overload
  const hasStyleOverload = overloadedCategories.length > 0 || totalAssertions > 7;

  // Generate warning message
  let warningMessage: string | null = null;
  if (hasStyleOverload) {
    if (overloadedCategories.length > 0) {
      const categoryNames = overloadedCategories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
      warningMessage = `Style stacking detected: ${categoryNames} assertions may conflict`;
    } else if (totalAssertions > 7) {
      warningMessage = `${totalAssertions} style assertions may overwhelm the model. Consider simplifying.`;
    }
  }

  return {
    categoryCounts,
    overloadedCategories,
    totalAssertions,
    hasStyleOverload,
    warningMessage,
  };
}

/**
 * Get styles that would reduce stacking when removed.
 * Used by randomizer to pick non-conflicting combinations.
 */
export function getReducingOptions(
  analysis: StyleStackingAnalysis,
  currentDirector: string | null,
  currentAtmosphere: Atmosphere | null,
  currentPreset: VisualPresetKey | null,
  currentLighting: LightingKey | null
): {
  avoidDirectors: string[];
  avoidAtmospheres: Atmosphere[];
  avoidPresets: VisualPresetKey[];
  avoidLighting: LightingKey[];
} {
  const avoidDirectors: string[] = [];
  const avoidAtmospheres: Atmosphere[] = [];
  const avoidPresets: VisualPresetKey[] = [];
  const avoidLighting: LightingKey[] = [];

  // For each overloaded category, find what contributes to it
  for (const category of analysis.overloadedCategories) {
    // Check directors
    for (const [director, categories] of Object.entries(directorImpliedStyles)) {
      if (categories.includes(category) && director !== currentDirector) {
        avoidDirectors.push(director);
      }
    }

    // Check atmospheres
    for (const [atmosphere, categories] of Object.entries(atmosphereImpliedStyles) as Array<[Atmosphere, StyleCategory[]]>) {
      if (categories.includes(category) && atmosphere !== currentAtmosphere) {
        avoidAtmospheres.push(atmosphere);
      }
    }

    // Check presets
    for (const [preset, categories] of Object.entries(presetImpliedStyles) as Array<[VisualPresetKey, StyleCategory[]]>) {
      if (categories.includes(category) && preset !== currentPreset) {
        avoidPresets.push(preset);
      }
    }

    // Check lighting
    for (const [lighting, categories] of Object.entries(lightingImpliedStyles) as Array<[LightingKey, StyleCategory[]]>) {
      if (categories?.includes(category) && lighting !== currentLighting) {
        avoidLighting.push(lighting);
      }
    }
  }

  return {
    avoidDirectors: Array.from(new Set(avoidDirectors)),
    avoidAtmospheres: Array.from(new Set(avoidAtmospheres)),
    avoidPresets: Array.from(new Set(avoidPresets)),
    avoidLighting: Array.from(new Set(avoidLighting)),
  };
}

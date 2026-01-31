/**
 * Color Grading Prompt Builder
 *
 * Converts color grading state into descriptive prompt keywords.
 *
 * @module utils/promptBuilder/colorGradingBuilder
 */

import type {
  ColorGradingState,
  ColorWheelsState,
  TemperatureTintState,
  SplitToningState,
  GlobalAdjustmentsState,
} from '../../config/types/colorGrading';
import { colorGradingPresets } from '../../config/colorGrading';

/**
 * Threshold for considering a value "significant" for prompt generation.
 * Values below this threshold won't generate keywords.
 */
const SIGNIFICANCE_THRESHOLD = 15;

/**
 * Convert color wheel position to descriptive keywords.
 */
function describeColorWheelTint(x: number, y: number): string | null {
  const magnitude = Math.sqrt(x * x + y * y);
  if (magnitude < 0.1) return null;

  // Determine primary direction/color
  const angle = Math.atan2(y, x) * (180 / Math.PI);

  // Map angle to color description
  // 0° = warm/red, 90° = green, 180° = cyan, -90° = magenta
  let colorName: string;
  if (angle >= -22.5 && angle < 22.5) colorName = 'warm orange';
  else if (angle >= 22.5 && angle < 67.5) colorName = 'yellow-green';
  else if (angle >= 67.5 && angle < 112.5) colorName = 'green';
  else if (angle >= 112.5 && angle < 157.5) colorName = 'cyan-green';
  else if (angle >= 157.5 || angle < -157.5) colorName = 'cool cyan';
  else if (angle >= -157.5 && angle < -112.5) colorName = 'cool blue';
  else if (angle >= -112.5 && angle < -67.5) colorName = 'purple';
  else colorName = 'magenta';

  const intensity = magnitude > 0.3 ? 'strong' : magnitude > 0.15 ? 'subtle' : 'hint of';
  return `${intensity} ${colorName}`;
}

/**
 * Convert color wheels state to prompt keywords.
 */
function resolveColorWheels(wheels: ColorWheelsState): string[] {
  const keywords: string[] = [];

  // Lift (shadows)
  const liftTint = describeColorWheelTint(wheels.lift.position.x, wheels.lift.position.y);
  if (liftTint) {
    keywords.push(`${liftTint} in shadows`);
  }
  if (Math.abs(wheels.lift.luminance) > SIGNIFICANCE_THRESHOLD) {
    keywords.push(wheels.lift.luminance > 0 ? 'lifted blacks' : 'crushed blacks');
  }

  // Gamma (midtones)
  const gammaTint = describeColorWheelTint(wheels.gamma.position.x, wheels.gamma.position.y);
  if (gammaTint) {
    keywords.push(`${gammaTint} midtones`);
  }

  // Gain (highlights)
  const gainTint = describeColorWheelTint(wheels.gain.position.x, wheels.gain.position.y);
  if (gainTint) {
    keywords.push(`${gainTint} highlights`);
  }
  if (Math.abs(wheels.gain.luminance) > SIGNIFICANCE_THRESHOLD) {
    keywords.push(wheels.gain.luminance > 0 ? 'bright highlights' : 'rolled off highlights');
  }

  return keywords;
}

/**
 * Convert temperature/tint to prompt keywords.
 */
function resolveTemperatureTint(state: TemperatureTintState): string[] {
  const keywords: string[] = [];

  if (Math.abs(state.temperature) > SIGNIFICANCE_THRESHOLD) {
    if (state.temperature > 50) {
      keywords.push('very warm color temperature');
    } else if (state.temperature > SIGNIFICANCE_THRESHOLD) {
      keywords.push('warm color temperature');
    } else if (state.temperature < -50) {
      keywords.push('very cool color temperature');
    } else {
      keywords.push('cool color temperature');
    }
  }

  if (Math.abs(state.tint) > SIGNIFICANCE_THRESHOLD) {
    keywords.push(state.tint > 0 ? 'magenta tint' : 'green tint');
  }

  return keywords;
}

/**
 * Convert split toning to prompt keywords.
 */
function resolveSplitToning(state: SplitToningState): string[] {
  const keywords: string[] = [];

  // Only add if saturation is significant
  if (state.shadowSaturation > SIGNIFICANCE_THRESHOLD) {
    const shadowColor = hueToColorName(state.shadowHue);
    keywords.push(`${shadowColor} tinted shadows`);
  }

  if (state.highlightSaturation > SIGNIFICANCE_THRESHOLD) {
    const highlightColor = hueToColorName(state.highlightHue);
    keywords.push(`${highlightColor} tinted highlights`);
  }

  return keywords;
}

/**
 * Convert hue value to color name.
 */
function hueToColorName(hue: number): string {
  if (hue < 15 || hue >= 345) return 'red';
  if (hue < 45) return 'orange';
  if (hue < 75) return 'yellow';
  if (hue < 105) return 'yellow-green';
  if (hue < 135) return 'green';
  if (hue < 165) return 'cyan-green';
  if (hue < 195) return 'cyan';
  if (hue < 225) return 'blue';
  if (hue < 255) return 'blue-purple';
  if (hue < 285) return 'purple';
  if (hue < 315) return 'magenta';
  return 'pink';
}

/**
 * Convert global adjustments to prompt keywords.
 */
function resolveGlobalAdjustments(state: GlobalAdjustmentsState): string[] {
  const keywords: string[] = [];

  if (Math.abs(state.contrast) > SIGNIFICANCE_THRESHOLD) {
    if (state.contrast > 50) {
      keywords.push('very high contrast');
    } else if (state.contrast > SIGNIFICANCE_THRESHOLD) {
      keywords.push('high contrast');
    } else if (state.contrast < -50) {
      keywords.push('very low contrast');
    } else {
      keywords.push('low contrast');
    }
  }

  if (Math.abs(state.saturation) > SIGNIFICANCE_THRESHOLD) {
    if (state.saturation > 50) {
      keywords.push('highly saturated colors');
    } else if (state.saturation > SIGNIFICANCE_THRESHOLD) {
      keywords.push('saturated colors');
    } else if (state.saturation < -50) {
      keywords.push('nearly monochrome');
    } else {
      keywords.push('desaturated colors');
    }
  }

  if (state.vibrance > SIGNIFICANCE_THRESHOLD * 2) {
    keywords.push('vibrant colors');
  }

  return keywords;
}

/**
 * Build color grading keywords from state.
 * If a preset is selected, uses the preset's keywords directly.
 * Otherwise, builds keywords from individual settings.
 *
 * @param state - The color grading state
 * @param useSafeMode - Whether to use safe keywords for strict content models
 * @returns Keywords string for the prompt, or null if no grading applied
 */
export function resolveColorGrading(
  state: ColorGradingState,
  useSafeMode: boolean = false
): string | null {
  if (!state.enabled) {
    return null;
  }

  // If a preset is selected, use its keywords
  if (state.selectedPreset) {
    const preset = colorGradingPresets[state.selectedPreset];
    if (preset) {
      return useSafeMode && preset.safeKeywords ? preset.safeKeywords : preset.keywords;
    }
  }

  // Build keywords from individual settings
  const allKeywords: string[] = [];

  // Color wheels
  allKeywords.push(...resolveColorWheels(state.colorWheels));

  // Temperature/Tint
  allKeywords.push(...resolveTemperatureTint(state.temperatureTint));

  // Split toning
  allKeywords.push(...resolveSplitToning(state.splitToning));

  // Global adjustments
  allKeywords.push(...resolveGlobalAdjustments(state.globalAdjustments));

  if (allKeywords.length === 0) {
    return null;
  }

  // Add a general color grading prefix for clarity
  return `professional color grade with ${allKeywords.join(', ')}`;
}

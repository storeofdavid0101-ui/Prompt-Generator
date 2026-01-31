/**
 * Advanced Lighting Configuration
 *
 * Presets and defaults for professional lighting control.
 *
 * @module config/advancedLighting
 */

import type {
  AdvancedLightingState,
  KeyLightPositionPreset,
  KeyFillRatioPreset,
  LightQualityPreset,
  KeyLightPosition,
  KeyFillRatio,
  LightQuality,
} from './types/advancedLighting';

/**
 * Default advanced lighting state.
 */
export const DEFAULT_ADVANCED_LIGHTING_STATE: AdvancedLightingState = {
  enabled: false,
  keyLightPosition: 'front-left',
  keyFillRatio: '4:1',
  colorTemperature: 5600, // Daylight
  shadowStop: 0,
  rimLight: {
    enabled: false,
    position: 'both',
  },
  lightQuality: 'soft',
};

/**
 * Key light position presets.
 */
export const keyLightPositionPresets: Record<KeyLightPosition, KeyLightPositionPreset> = {
  'front': {
    id: 'front',
    name: 'Front',
    description: 'Flat, even lighting from the front',
    keywords: 'front lighting, flat lighting, even illumination',
  },
  'front-left': {
    id: 'front-left',
    name: 'Front-Left',
    description: 'Classic 3/4 lighting, Rembrandt style',
    keywords: 'Rembrandt lighting, 45-degree key light, three-quarter lighting',
  },
  'front-right': {
    id: 'front-right',
    name: 'Front-Right',
    description: 'Classic 3/4 lighting from the right',
    keywords: 'three-quarter lighting, 45-degree key light from right',
  },
  'side-left': {
    id: 'side-left',
    name: 'Side-Left',
    description: 'Dramatic split lighting from the left',
    keywords: 'split lighting, side lighting, dramatic half-face illumination',
  },
  'side-right': {
    id: 'side-right',
    name: 'Side-Right',
    description: 'Dramatic split lighting from the right',
    keywords: 'split lighting, side lighting from right, half-face shadow',
  },
  'back': {
    id: 'back',
    name: 'Back',
    description: 'Silhouette and rim lighting',
    keywords: 'backlighting, silhouette lighting, rim light as key',
  },
  'top': {
    id: 'top',
    name: 'Top',
    description: 'Overhead/butterfly lighting',
    keywords: 'butterfly lighting, overhead lighting, top-down illumination',
  },
  'under': {
    id: 'under',
    name: 'Under',
    description: 'Dramatic uplighting',
    keywords: 'uplighting, horror lighting, under-chin illumination',
  },
};

/**
 * Key to fill ratio presets.
 */
export const keyFillRatioPresets: Record<KeyFillRatio, KeyFillRatioPreset> = {
  '1:1': {
    id: '1:1',
    name: '1:1 (Flat)',
    description: 'No shadows, flat even lighting',
    keywords: '1:1 lighting ratio, flat lighting, no shadows, even illumination',
  },
  '2:1': {
    id: '2:1',
    name: '2:1 (Soft)',
    description: 'Subtle shadows, natural look',
    keywords: '2:1 lighting ratio, subtle shadows, soft contrast, natural lighting',
  },
  '4:1': {
    id: '4:1',
    name: '4:1 (Classic)',
    description: 'Classic portrait ratio with definition',
    keywords: '4:1 lighting ratio, classic portrait lighting, moderate shadows',
  },
  '8:1': {
    id: '8:1',
    name: '8:1 (Dramatic)',
    description: 'Dramatic with deep shadows',
    keywords: '8:1 lighting ratio, dramatic lighting, deep shadows, high contrast',
  },
  '16:1': {
    id: '16:1',
    name: '16:1 (Extreme)',
    description: 'Extreme contrast, noir style',
    keywords: '16:1 lighting ratio, extreme contrast, noir lighting, chiaroscuro',
  },
};

/**
 * Light quality presets.
 */
export const lightQualityPresets: Record<LightQuality, LightQualityPreset> = {
  'hard': {
    id: 'hard',
    name: 'Hard',
    description: 'Sharp shadows, direct light source',
    keywords: 'hard light, sharp shadows, direct light source, specular highlights',
  },
  'soft': {
    id: 'soft',
    name: 'Soft',
    description: 'Gradual shadow transitions',
    keywords: 'soft light, gradual shadows, diffused light, gentle transitions',
  },
  'diffused': {
    id: 'diffused',
    name: 'Diffused',
    description: 'Very soft, wrap-around lighting',
    keywords: 'diffused light, wrap-around lighting, very soft shadows, cloudy day lighting',
  },
};

/**
 * Color temperature descriptions for prompt building.
 */
export function getColorTemperatureKeywords(kelvin: number): string {
  if (kelvin <= 3000) {
    return `warm candlelight ${kelvin}K, orange tungsten glow`;
  } else if (kelvin <= 3500) {
    return `warm tungsten ${kelvin}K, golden incandescent lighting`;
  } else if (kelvin <= 4500) {
    return `warm white ${kelvin}K, slightly warm neutral lighting`;
  } else if (kelvin <= 5500) {
    return `daylight balanced ${kelvin}K, neutral white lighting`;
  } else if (kelvin <= 6500) {
    return `cool daylight ${kelvin}K, slightly blue-white lighting`;
  } else {
    return `cool blue ${kelvin}K, overcast sky lighting`;
  }
}

/**
 * Shadow stop descriptions for prompt building.
 */
export function getShadowStopKeywords(stop: number): string {
  if (stop <= -2) {
    return 'crushed shadows, deep blacks, lost shadow detail';
  } else if (stop <= -1) {
    return 'dark shadows, reduced shadow detail, moody';
  } else if (stop === 0) {
    return 'natural shadow density, balanced exposure';
  } else {
    return 'lifted shadows, open shadows, visible shadow detail';
  }
}

/**
 * Rim light keywords based on position.
 */
export function getRimLightKeywords(position: 'left' | 'right' | 'both'): string {
  const base = 'rim light, edge lighting, separation light';
  switch (position) {
    case 'left':
      return `${base}, rim from left side`;
    case 'right':
      return `${base}, rim from right side`;
    case 'both':
      return `${base}, dual rim lights, both-side edge lighting`;
  }
}

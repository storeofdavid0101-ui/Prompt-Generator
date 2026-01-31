/**
 * Color Grading Configuration
 *
 * Professional color grading presets inspired by DaVinci Resolve and Premiere Pro.
 * Includes film emulations, cinematic looks, and stylized grades.
 *
 * @module config/colorGrading
 */

import type {
  ColorGradingPreset,
  ColorWheelsState,
  TemperatureTintState,
  SplitToningState,
  GlobalAdjustmentsState,
  ColorWheelState,
} from './types/colorGrading';

// Re-export category names from types
export { colorGradingCategoryNames } from './types/colorGrading';

// ============================================================================
// Default Values
// ============================================================================

/** Default color wheel state (neutral) */
export const DEFAULT_COLOR_WHEEL: ColorWheelState = {
  position: { x: 0, y: 0 },
  luminance: 0,
};

/** Default color wheels state */
export const DEFAULT_COLOR_WHEELS: ColorWheelsState = {
  lift: { ...DEFAULT_COLOR_WHEEL },
  gamma: { ...DEFAULT_COLOR_WHEEL },
  gain: { ...DEFAULT_COLOR_WHEEL },
};

/** Default temperature/tint state */
export const DEFAULT_TEMPERATURE_TINT: TemperatureTintState = {
  temperature: 0,
  tint: 0,
};

/** Default split toning state */
export const DEFAULT_SPLIT_TONING: SplitToningState = {
  shadowHue: 220, // Blue
  shadowSaturation: 0,
  highlightHue: 40, // Orange
  highlightSaturation: 0,
  balance: 0,
};

/** Default global adjustments */
export const DEFAULT_GLOBAL_ADJUSTMENTS: GlobalAdjustmentsState = {
  contrast: 0,
  saturation: 0,
  vibrance: 0,
};

// ============================================================================
// Professional Presets
// ============================================================================

/**
 * Professional color grading presets.
 * Organized by category for easy navigation.
 */
export const colorGradingPresets: Record<string, ColorGradingPreset> = {
  // =========================================================================
  // Film Emulation
  // =========================================================================
  'kodak-2383': {
    name: 'Kodak 2383',
    category: 'film',
    keywords: 'Kodak Vision3 2383 film print emulation, rich shadows, warm midtones, creamy highlights, classic cinema color science',
    gradient: 'linear-gradient(135deg, #2C1810 0%, #D4A574 50%, #F5E6D3 100%)',
    description: 'Classic Kodak cinema print stock - rich, warm, timeless',
    values: {
      temperatureTint: { temperature: 8, tint: 2 },
      splitToning: { shadowHue: 30, shadowSaturation: 15, highlightHue: 45, highlightSaturation: 10, balance: -10 },
      globalAdjustments: { contrast: 15, saturation: -5, vibrance: 10 },
    },
  },
  'kodak-5219': {
    name: 'Kodak 5219',
    category: 'film',
    keywords: 'Kodak Vision3 500T tungsten film stock, blue shadow bias, neutral midtones, soft highlight rolloff',
    gradient: 'linear-gradient(135deg, #1a2a3a 0%, #8B7355 50%, #E8DCC8 100%)',
    description: 'Tungsten-balanced negative film - versatile cinema look',
    values: {
      colorWheels: {
        lift: { position: { x: -0.1, y: 0 }, luminance: -5 },
        gamma: { position: { x: 0, y: 0 }, luminance: 0 },
        gain: { position: { x: 0.05, y: 0.03 }, luminance: 5 },
      },
      globalAdjustments: { contrast: 10, saturation: -8, vibrance: 15 },
    },
  },
  'fuji-3513': {
    name: 'Fuji 3513',
    category: 'film',
    keywords: 'Fujifilm 3513 print stock, green-teal shadows, neutral skin tones, soft gradation, Japanese cinema aesthetic',
    gradient: 'linear-gradient(135deg, #1C3D3B 0%, #7D8471 50%, #E5E0D5 100%)',
    description: 'Fuji cinema print - elegant greens and soft contrast',
    values: {
      colorWheels: {
        lift: { position: { x: -0.15, y: 0.1 }, luminance: -3 },
        gamma: { position: { x: 0, y: 0.05 }, luminance: 0 },
        gain: { position: { x: 0, y: -0.05 }, luminance: 0 },
      },
      globalAdjustments: { contrast: 8, saturation: -10, vibrance: 12 },
    },
  },
  'portra-400': {
    name: 'Portra 400',
    category: 'film',
    keywords: 'Kodak Portra 400 film emulation, warm skin tones, pastel colors, soft contrast, portrait-optimized color science',
    gradient: 'linear-gradient(135deg, #4A4035 0%, #C9A86C 50%, #FAF0E6 100%)',
    description: 'Portrait film stock - flattering skin tones and pastels',
    values: {
      temperatureTint: { temperature: 12, tint: 5 },
      splitToning: { shadowHue: 35, shadowSaturation: 8, highlightHue: 50, highlightSaturation: 12, balance: 15 },
      globalAdjustments: { contrast: -5, saturation: -15, vibrance: 20 },
    },
  },
  'cinestill-800t': {
    name: 'CineStill 800T',
    category: 'film',
    keywords: 'CineStill 800T tungsten film, halation glow around highlights, teal shadows, orange highlights, night photography aesthetic',
    gradient: 'linear-gradient(135deg, #0D2B3E 0%, #FF6B35 50%, #FFE4B5 100%)',
    description: 'Tungsten cinema film - iconic halation and color shift',
    values: {
      colorWheels: {
        lift: { position: { x: -0.2, y: 0 }, luminance: -8 },
        gamma: { position: { x: 0, y: 0 }, luminance: 0 },
        gain: { position: { x: 0.25, y: 0.05 }, luminance: 10 },
      },
      splitToning: { shadowHue: 195, shadowSaturation: 25, highlightHue: 30, highlightSaturation: 35, balance: 20 },
      globalAdjustments: { contrast: 20, saturation: 10, vibrance: 5 },
    },
  },

  // =========================================================================
  // Cinematic Looks
  // =========================================================================
  'teal-orange': {
    name: 'Teal & Orange',
    category: 'cinematic',
    keywords: 'teal and orange color grade, complementary color scheme, blockbuster cinema look, pushed shadows to teal, warm skin highlights',
    gradient: 'linear-gradient(135deg, #006D77 0%, #FF8C42 100%)',
    description: 'Hollywood blockbuster look - dramatic color contrast',
    values: {
      colorWheels: {
        lift: { position: { x: -0.3, y: 0.1 }, luminance: -10 },
        gamma: { position: { x: -0.1, y: 0 }, luminance: 0 },
        gain: { position: { x: 0.3, y: 0.1 }, luminance: 5 },
      },
      globalAdjustments: { contrast: 25, saturation: 15, vibrance: -5 },
    },
  },
  'orange-teal-subtle': {
    name: 'Subtle Teal & Orange',
    category: 'cinematic',
    keywords: 'subtle teal and orange grade, refined complementary colors, cinematic color balance, naturalistic blockbuster look',
    gradient: 'linear-gradient(135deg, #3D7A80 0%, #E8A87C 100%)',
    description: 'Refined blockbuster look - less aggressive separation',
    values: {
      colorWheels: {
        lift: { position: { x: -0.15, y: 0.05 }, luminance: -5 },
        gamma: { position: { x: 0, y: 0 }, luminance: 0 },
        gain: { position: { x: 0.15, y: 0.05 }, luminance: 3 },
      },
      globalAdjustments: { contrast: 15, saturation: 5, vibrance: 5 },
    },
  },
  'bleach-bypass': {
    name: 'Bleach Bypass',
    category: 'cinematic',
    keywords: 'bleach bypass film process, desaturated with high contrast, silver retention, gritty metallic tones, washed out highlights, film noir modern',
    gradient: 'linear-gradient(135deg, #2C3E50 0%, #95A5A6 50%, #ECF0F1 100%)',
    description: 'Skip bleach process - gritty, desaturated, high contrast',
    values: {
      globalAdjustments: { contrast: 35, saturation: -40, vibrance: -10 },
      colorWheels: {
        lift: { position: { x: 0, y: 0 }, luminance: 10 },
        gamma: { position: { x: 0, y: 0 }, luminance: 0 },
        gain: { position: { x: 0, y: 0 }, luminance: -5 },
      },
    },
  },
  'day-for-night': {
    name: 'Day for Night',
    category: 'cinematic',
    keywords: 'day for night color grade, deep blue shadows, moonlight simulation, crushed blacks, cold color temperature',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a3a5c 50%, #4a6a8c 100%)',
    description: 'Simulate night from day footage - cold blue grade',
    values: {
      temperatureTint: { temperature: -40, tint: -10 },
      colorWheels: {
        lift: { position: { x: -0.2, y: -0.1 }, luminance: -25 },
        gamma: { position: { x: -0.15, y: 0 }, luminance: -10 },
        gain: { position: { x: -0.1, y: 0 }, luminance: -15 },
      },
      globalAdjustments: { contrast: 20, saturation: -30, vibrance: -20 },
    },
  },
  'cross-process': {
    name: 'Cross Process',
    category: 'cinematic',
    keywords: 'cross processed film look, shifted colors, green shadows, magenta highlights, experimental color science, 90s fashion photography',
    gradient: 'linear-gradient(135deg, #1a4a3a 0%, #8a6a9a 50%, #e8c0d0 100%)',
    description: 'Process slide film as negative - color shifts',
    values: {
      colorWheels: {
        lift: { position: { x: -0.1, y: 0.2 }, luminance: -5 },
        gamma: { position: { x: 0.1, y: 0.1 }, luminance: 5 },
        gain: { position: { x: 0.15, y: -0.15 }, luminance: 10 },
      },
      globalAdjustments: { contrast: 15, saturation: 20, vibrance: 10 },
    },
  },

  // =========================================================================
  // Stylized Looks
  // =========================================================================
  'sci-fi-cold': {
    name: 'Sci-Fi Cold',
    category: 'stylized',
    keywords: 'science fiction color grade, cold blue tones, clinical lighting, futuristic color palette, sterile atmosphere',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #87ceeb 100%)',
    description: 'Clean, cold sci-fi aesthetic',
    values: {
      temperatureTint: { temperature: -30, tint: -5 },
      colorWheels: {
        lift: { position: { x: -0.2, y: 0 }, luminance: -8 },
        gamma: { position: { x: -0.1, y: 0 }, luminance: 0 },
        gain: { position: { x: -0.05, y: 0.1 }, luminance: 5 },
      },
      globalAdjustments: { contrast: 20, saturation: -20, vibrance: 10 },
    },
  },
  'neon-noir': {
    name: 'Neon Noir',
    category: 'stylized',
    keywords: 'neon noir aesthetic, magenta and cyan highlights, deep black shadows, cyberpunk color grade, urban night photography',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #ff00ff 50%, #00ffff 100%)',
    description: 'Cyberpunk neon aesthetics - magenta and cyan',
    values: {
      colorWheels: {
        lift: { position: { x: 0, y: 0 }, luminance: -15 },
        gamma: { position: { x: 0.1, y: -0.15 }, luminance: 0 },
        gain: { position: { x: -0.15, y: 0.1 }, luminance: 10 },
      },
      splitToning: { shadowHue: 300, shadowSaturation: 30, highlightHue: 180, highlightSaturation: 35, balance: 0 },
      globalAdjustments: { contrast: 30, saturation: 25, vibrance: 15 },
    },
  },
  'matrix-green': {
    name: 'Matrix',
    category: 'stylized',
    keywords: 'matrix movie color grade, green tinted image, digital rain aesthetic, cyberpunk green, monochromatic green palette',
    gradient: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #00ff00 100%)',
    description: 'The Matrix green tint - digital world aesthetic',
    values: {
      colorWheels: {
        lift: { position: { x: 0, y: 0.15 }, luminance: -10 },
        gamma: { position: { x: 0, y: 0.2 }, luminance: 0 },
        gain: { position: { x: 0, y: 0.25 }, luminance: 5 },
      },
      globalAdjustments: { contrast: 25, saturation: -30, vibrance: -10 },
    },
  },
  'golden-hour': {
    name: 'Golden Hour',
    category: 'stylized',
    keywords: 'golden hour color grade, warm sunset tones, orange and gold highlights, soft warm shadows, magic hour lighting',
    gradient: 'linear-gradient(135deg, #8B4513 0%, #DAA520 50%, #FFD700 100%)',
    description: 'Enhance golden hour warmth - sunset aesthetics',
    values: {
      temperatureTint: { temperature: 35, tint: 10 },
      colorWheels: {
        lift: { position: { x: 0.1, y: 0.05 }, luminance: 5 },
        gamma: { position: { x: 0.15, y: 0.05 }, luminance: 3 },
        gain: { position: { x: 0.2, y: 0.1 }, luminance: 8 },
      },
      globalAdjustments: { contrast: 10, saturation: 15, vibrance: 20 },
    },
  },
  'moonlight': {
    name: 'Moonlight',
    category: 'stylized',
    keywords: 'moonlight color grade, cool blue night tones, silver highlights, mysterious atmosphere, nocturnal color palette',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #4a4a6a 50%, #c0c0d0 100%)',
    description: 'Cool moonlit night - blue silver tones',
    values: {
      temperatureTint: { temperature: -25, tint: 5 },
      colorWheels: {
        lift: { position: { x: -0.15, y: -0.05 }, luminance: -10 },
        gamma: { position: { x: -0.1, y: 0 }, luminance: -3 },
        gain: { position: { x: -0.05, y: 0.1 }, luminance: 5 },
      },
      globalAdjustments: { contrast: 15, saturation: -25, vibrance: 10 },
    },
  },

  // =========================================================================
  // Technical Grades
  // =========================================================================
  'high-contrast': {
    name: 'High Contrast',
    category: 'technical',
    keywords: 'high contrast color grade, crushed blacks, blown highlights, dramatic tonal range, punchy image',
    gradient: 'linear-gradient(135deg, #000000 0%, #808080 50%, #ffffff 100%)',
    description: 'Dramatic contrast - crushed blacks, bright highlights',
    values: {
      colorWheels: {
        lift: { position: { x: 0, y: 0 }, luminance: -20 },
        gamma: { position: { x: 0, y: 0 }, luminance: 0 },
        gain: { position: { x: 0, y: 0 }, luminance: 15 },
      },
      globalAdjustments: { contrast: 40, saturation: 0, vibrance: 5 },
    },
  },
  'low-contrast': {
    name: 'Low Contrast',
    category: 'technical',
    keywords: 'low contrast color grade, lifted blacks, soft highlights, flat tonal range, gentle gradation',
    gradient: 'linear-gradient(135deg, #3a3a3a 0%, #808080 50%, #c8c8c8 100%)',
    description: 'Soft contrast - lifted blacks, gentle highlights',
    values: {
      colorWheels: {
        lift: { position: { x: 0, y: 0 }, luminance: 15 },
        gamma: { position: { x: 0, y: 0 }, luminance: 0 },
        gain: { position: { x: 0, y: 0 }, luminance: -10 },
      },
      globalAdjustments: { contrast: -25, saturation: -5, vibrance: 10 },
    },
  },
  'desaturated': {
    name: 'Desaturated',
    category: 'technical',
    keywords: 'desaturated color grade, muted colors, understated palette, subtle color presence, near monochrome',
    gradient: 'linear-gradient(135deg, #2c2c2c 0%, #6a6a6a 50%, #a8a8a8 100%)',
    description: 'Reduced saturation - muted, subtle colors',
    values: {
      globalAdjustments: { contrast: 10, saturation: -50, vibrance: -20 },
    },
  },
  'vibrant': {
    name: 'Vibrant',
    category: 'technical',
    keywords: 'vibrant color grade, saturated colors, punchy palette, bold color presence, high color intensity',
    gradient: 'linear-gradient(135deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
    description: 'Enhanced saturation - bold, vivid colors',
    values: {
      globalAdjustments: { contrast: 10, saturation: 35, vibrance: 25 },
    },
  },

  // =========================================================================
  // Vintage Looks
  // =========================================================================
  'sepia-classic': {
    name: 'Sepia Classic',
    category: 'vintage',
    keywords: 'sepia tone, antique photograph, brown monochrome, vintage warmth, old photograph aesthetic',
    gradient: 'linear-gradient(135deg, #3c2415 0%, #8b7355 50%, #d4a574 100%)',
    description: 'Classic sepia toning - timeless vintage look',
    values: {
      temperatureTint: { temperature: 25, tint: 0 },
      colorWheels: {
        lift: { position: { x: 0.1, y: 0.05 }, luminance: 5 },
        gamma: { position: { x: 0.15, y: 0.08 }, luminance: 0 },
        gain: { position: { x: 0.1, y: 0.05 }, luminance: -5 },
      },
      globalAdjustments: { contrast: 5, saturation: -60, vibrance: -30 },
    },
  },
  'faded-film': {
    name: 'Faded Film',
    category: 'vintage',
    keywords: 'faded film look, lifted blacks, washed colors, nostalgic color fade, old film print aesthetic',
    gradient: 'linear-gradient(135deg, #4a4a4a 0%, #8a8a7a 50%, #d4d4c4 100%)',
    description: 'Aged film print - faded colors, lifted blacks',
    values: {
      colorWheels: {
        lift: { position: { x: 0.05, y: 0.05 }, luminance: 20 },
        gamma: { position: { x: 0.03, y: 0.02 }, luminance: 5 },
        gain: { position: { x: 0, y: -0.05 }, luminance: -10 },
      },
      globalAdjustments: { contrast: -15, saturation: -35, vibrance: -15 },
    },
  },
  'technicolor': {
    name: 'Technicolor',
    category: 'vintage',
    keywords: 'technicolor film look, saturated primary colors, vintage Hollywood, three-strip process, classic movie color',
    gradient: 'linear-gradient(135deg, #8B0000 0%, #228B22 50%, #00008B 100%)',
    description: 'Classic Technicolor - saturated primaries',
    values: {
      globalAdjustments: { contrast: 20, saturation: 40, vibrance: 30 },
      colorWheels: {
        lift: { position: { x: 0, y: 0 }, luminance: -10 },
        gamma: { position: { x: 0, y: 0 }, luminance: 5 },
        gain: { position: { x: 0.05, y: 0 }, luminance: 10 },
      },
    },
  },
  '70s-film': {
    name: '70s Film',
    category: 'vintage',
    keywords: '1970s film aesthetic, warm amber tones, soft focus feel, nostalgic grain, retro color palette',
    gradient: 'linear-gradient(135deg, #4a3728 0%, #b8860b 50%, #daa520 100%)',
    description: '1970s cinema aesthetic - warm, soft, nostalgic',
    values: {
      temperatureTint: { temperature: 20, tint: 5 },
      colorWheels: {
        lift: { position: { x: 0.1, y: 0.05 }, luminance: 8 },
        gamma: { position: { x: 0.08, y: 0.03 }, luminance: 0 },
        gain: { position: { x: 0.05, y: 0 }, luminance: -5 },
      },
      splitToning: { shadowHue: 30, shadowSaturation: 20, highlightHue: 45, highlightSaturation: 15, balance: 10 },
      globalAdjustments: { contrast: -5, saturation: -10, vibrance: 5 },
    },
  },
  '80s-neon': {
    name: '80s Neon',
    category: 'vintage',
    keywords: '1980s neon aesthetic, pink and blue gradients, synthwave colors, retro futurism, vaporwave palette',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #ff1493 50%, #00bfff 100%)',
    description: '1980s neon aesthetic - pink, purple, cyan',
    values: {
      colorWheels: {
        lift: { position: { x: 0.1, y: -0.2 }, luminance: -5 },
        gamma: { position: { x: 0.15, y: -0.1 }, luminance: 0 },
        gain: { position: { x: -0.2, y: 0.1 }, luminance: 10 },
      },
      splitToning: { shadowHue: 280, shadowSaturation: 35, highlightHue: 190, highlightSaturation: 30, balance: -10 },
      globalAdjustments: { contrast: 25, saturation: 30, vibrance: 20 },
    },
  },
};

/**
 * Get presets grouped by category.
 */
export function getPresetsByCategory(): Record<string, Array<{ key: string; preset: ColorGradingPreset }>> {
  const grouped: Record<string, Array<{ key: string; preset: ColorGradingPreset }>> = {};

  for (const [key, preset] of Object.entries(colorGradingPresets)) {
    if (!grouped[preset.category]) {
      grouped[preset.category] = [];
    }
    grouped[preset.category].push({ key, preset });
  }

  return grouped;
}

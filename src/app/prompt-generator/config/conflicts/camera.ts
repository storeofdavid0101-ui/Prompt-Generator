/**
 * Camera Conflict Configuration
 *
 * Maps cameras to categories and defines conflict rules for each category.
 * Includes fixed lens assignments and zoom range specifications.
 *
 * @module conflicts/camera
 */

import type {
  Atmosphere,
  CameraCategory,
  ConflictRules,
  DOFValue,
  VisualPresetKey,
  ZoomRange,
} from '../types';

/**
 * Default conflict rules for categories with no restrictions.
 * Used as a base to reduce repetition in category definitions.
 */
const DEFAULT_RULES: ConflictRules = {
  blockedAtmospheres: [],
  blockedPresets: [],
  blockedDOF: [],
};

/**
 * Maps camera names to their category for conflict detection.
 * Categories determine which atmospheres, presets, and DOF options are compatible.
 */
export const cameraCategories: Record<string, CameraCategory> = {
  // Vintage Lo-Fi (inherently low quality, no DOF control)
  'VHS Camcorder': 'vintage-lofi',
  Betacam: 'vintage-lofi',
  Hi8: 'vintage-lofi',
  MiniDV: 'vintage-lofi',
  Handycam: 'vintage-lofi',
  '8mm Film': 'vintage-lofi',
  'Super 8': 'vintage-lofi',
  'Disposable Camera': 'vintage-lofi',
  'Pinhole Camera': 'vintage-lofi',

  // Antique (1800s-early 1900s)
  Daguerreotype: 'antique',
  'Wet Plate': 'antique',
  Tintype: 'antique',

  // Classic Film
  '16mm Film': 'classic-film',
  'Super 16': 'classic-film',
  '35mm Film': 'classic-film',
  'Bolex H16': 'classic-film',
  'Arriflex 16SR': 'classic-film',
  'Arriflex 35': 'classic-film',
  'Mitchell BNC': 'classic-film',

  // Epic Film (large format cinema)
  '65mm Film': 'epic-film',
  '70mm IMAX': 'epic-film',
  'Panavision Panaflex': 'epic-film',

  // Medium Format Classic
  'Hasselblad 500C': 'medium-format-classic',
  'Mamiya RZ67': 'medium-format-classic',
  Rolleiflex: 'medium-format-classic',

  // 35mm Classic
  'Leica M6': '35mm-classic',
  'Contax T2': '35mm-classic',
  'Polaroid SX-70': '35mm-classic',

  // Modern Cinema
  'ARRI Alexa': 'modern-cinema',
  'ARRI Alexa Mini': 'modern-cinema',
  'ARRI Alexa 65': 'modern-cinema',
  'RED Komodo': 'modern-cinema',
  'RED V-Raptor': 'modern-cinema',
  'Sony Venice': 'modern-cinema',
  'Sony FX9': 'modern-cinema',
  'Blackmagic URSA': 'modern-cinema',
  'Canon C500': 'modern-cinema',
  'Canon C70': 'modern-cinema',
  'Panavision DXL2': 'modern-cinema',

  // Modern Digital
  'Hasselblad X2D': 'modern-digital',
  'Leica M11': 'modern-digital',
  'Phase One XF': 'modern-digital',
  'Canon 5D Mark IV': 'modern-digital',
  'Canon R5': 'modern-digital',
  'Nikon D850': 'modern-digital',
  'Nikon Z9': 'modern-digital',
  'Sony A7S III': 'modern-digital',
  'Sony A1': 'modern-digital',

  // Consumer/Mobile
  GoPro: 'consumer-mobile',
  'DJI Drone': 'consumer-mobile',
  'iPhone Pro': 'consumer-mobile',
};

/**
 * Blocked atmospheres and presets for vintage/lo-fi cameras.
 */
const VINTAGE_LOFI_BLOCKED_ATMOSPHERES: Atmosphere[] = ['studio', 'cyberpunk'];
const VINTAGE_LOFI_BLOCKED_PRESETS: VisualPresetKey[] = ['vivid', 'highcontrast'];
const VINTAGE_LOFI_BLOCKED_DOF: DOFValue[] = ['shallow', 'tilt-shift'];

/**
 * Blocked atmospheres and presets for antique cameras.
 */
const ANTIQUE_BLOCKED_ATMOSPHERES: Atmosphere[] = ['studio', 'cyberpunk', 'dreamy'];
const ANTIQUE_BLOCKED_PRESETS: VisualPresetKey[] = ['vivid', 'highcontrast'];
const ANTIQUE_BLOCKED_DOF: DOFValue[] = ['shallow', 'tilt-shift'];

/**
 * Conflict rules per camera category.
 * Defines which atmospheres, presets, and DOF settings are incompatible.
 */
export const categoryConflicts: Record<CameraCategory, ConflictRules> = {
  'vintage-lofi': {
    blockedAtmospheres: VINTAGE_LOFI_BLOCKED_ATMOSPHERES,
    blockedPresets: VINTAGE_LOFI_BLOCKED_PRESETS,
    blockedDOF: VINTAGE_LOFI_BLOCKED_DOF,
    fixedLens: 'fixed zoom lens',
    warningMessage: 'Lo-fi cameras have limited quality and fixed lenses',
  },
  antique: {
    blockedAtmospheres: ANTIQUE_BLOCKED_ATMOSPHERES,
    blockedPresets: ANTIQUE_BLOCKED_PRESETS,
    blockedDOF: ANTIQUE_BLOCKED_DOF,
    fixedLens: 'period-appropriate lens',
    warningMessage: 'Antique cameras have fixed optics and monochrome output',
  },
  'classic-film': { ...DEFAULT_RULES },
  'epic-film': { ...DEFAULT_RULES },
  'medium-format-classic': { ...DEFAULT_RULES },
  '35mm-classic': { ...DEFAULT_RULES },
  'modern-cinema': { ...DEFAULT_RULES },
  'modern-digital': { ...DEFAULT_RULES },
  'consumer-mobile': {
    ...DEFAULT_RULES,
    blockedDOF: ['tilt-shift'],
    fixedLens: 'built-in wide lens',
    warningMessage: 'Consumer cameras have fixed wide-angle lenses',
  },
  none: { ...DEFAULT_RULES },
};

/**
 * Per-camera fixed lens descriptions.
 * Provides accurate lens information for cameras with non-interchangeable lenses.
 */
export const cameraFixedLens: Record<string, string> = {
  GoPro: 'ultra-wide 16mm equivalent',
  'iPhone Pro': 'built-in multi-lens system',
  'DJI Drone': 'wide-angle aerial lens',
  'Disposable Camera': 'fixed 30mm plastic lens',
  'Pinhole Camera': 'pinhole aperture (no lens)',
  'Polaroid SX-70': 'fixed 116mm lens',
  'Contax T2': 'Zeiss Sonnar 38mm f/2.8',
  Daguerreotype: 'Petzval-style brass lens',
  'Wet Plate': 'large format brass lens',
  Tintype: 'period brass lens',
  Rolleiflex: 'Zeiss Planar 80mm f/2.8',
};

/**
 * Cameras with built-in zoom lenses.
 * Provides zoom range and selectable focal length options.
 */
export const cameraZoomRange: Record<string, ZoomRange> = {
  'VHS Camcorder': {
    range: '8-80mm (48-480mm equiv)',
    options: ['8mm (Wide)', '24mm', '40mm', '60mm', '80mm (Tele)'],
  },
  Handycam: {
    range: '3.6-36mm (40-400mm equiv)',
    options: ['3.6mm (Wide)', '10mm', '20mm', '36mm (Tele)'],
  },
  Hi8: {
    range: '5.4-54mm (42-420mm equiv)',
    options: ['5.4mm (Wide)', '15mm', '30mm', '54mm (Tele)'],
  },
  Betacam: {
    range: '8.5-119mm broadcast zoom',
    options: ['8.5mm (Wide)', '25mm', '50mm', '85mm', '119mm (Tele)'],
  },
  MiniDV: {
    range: '5.9-59mm f/1.6 (41-410mm equiv)',
    options: ['5.9mm (Wide)', '15mm', '30mm', '45mm', '59mm (Tele)'],
  },
};

/**
 * Camera category to location category conflicts.
 * Prevents anachronistic combinations (e.g., antique cameras in fantasy settings).
 */
export const cameraLocationConflicts: Record<CameraCategory, string[]> = {
  antique: ['fantasy'],
  'vintage-lofi': [],
  'classic-film': [],
  'epic-film': [],
  'medium-format-classic': [],
  '35mm-classic': [],
  'modern-cinema': [],
  'modern-digital': [],
  'consumer-mobile': [],
  none: [],
};

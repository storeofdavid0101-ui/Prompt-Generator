/**
 * Conflict detection configuration
 * Defines incompatibilities between camera types, atmospheres, and presets
 */

import type { Atmosphere, CameraCategory, ConflictRules, ZoomRange } from './types';

// Camera category mapping for conflict detection
export const cameraCategories: Record<string, CameraCategory> = {
  // Vintage Lo-Fi (inherently low quality, no DOF control)
  'VHS Camcorder': 'vintage-lofi',
  'Betacam': 'vintage-lofi',
  'Hi8': 'vintage-lofi',
  'MiniDV': 'vintage-lofi',
  'Handycam': 'vintage-lofi',
  '8mm Film': 'vintage-lofi',
  'Super 8': 'vintage-lofi',
  'Disposable Camera': 'vintage-lofi',
  'Pinhole Camera': 'vintage-lofi',

  // Antique (1800s-early 1900s)
  'Daguerreotype': 'antique',
  'Wet Plate': 'antique',
  'Tintype': 'antique',

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
  'Rolleiflex': 'medium-format-classic',

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
  'GoPro': 'consumer-mobile',
  'DJI Drone': 'consumer-mobile',
  'iPhone Pro': 'consumer-mobile',
};

// Conflict rules per camera category
export const categoryConflicts: Record<CameraCategory, ConflictRules> = {
  'vintage-lofi': {
    blockedAtmospheres: ['studio', 'cyberpunk'],
    blockedPresets: ['vivid', 'highcontrast'],
    blockedDOF: ['shallow', 'tilt-shift'],
    fixedLens: 'fixed zoom lens',
    warningMessage: 'Lo-fi cameras have limited quality and fixed lenses',
  },
  'antique': {
    blockedAtmospheres: ['studio', 'cyberpunk', 'dreamy'],
    blockedPresets: ['vivid', 'highcontrast'],
    blockedDOF: ['shallow', 'tilt-shift'],
    fixedLens: 'period-appropriate lens',
    warningMessage: 'Antique cameras have fixed optics and monochrome output',
  },
  'classic-film': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: [],
  },
  'epic-film': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: [],
  },
  'medium-format-classic': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: [],
  },
  '35mm-classic': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: [],
  },
  'modern-cinema': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: [],
  },
  'modern-digital': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: [],
  },
  'consumer-mobile': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: ['tilt-shift'],
    fixedLens: 'built-in wide lens',
    warningMessage: 'Consumer cameras have fixed wide-angle lenses',
  },
  'none': {
    blockedAtmospheres: [],
    blockedPresets: [],
    blockedDOF: [],
  },
};

// Per-camera fixed lens overrides
export const cameraFixedLens: Record<string, string> = {
  'GoPro': 'ultra-wide 16mm equivalent',
  'iPhone Pro': 'built-in multi-lens system',
  'DJI Drone': 'wide-angle aerial lens',
  'Disposable Camera': 'fixed 30mm plastic lens',
  'Pinhole Camera': 'pinhole aperture (no lens)',
  'Polaroid SX-70': 'fixed 116mm lens',
  'Contax T2': 'Zeiss Sonnar 38mm f/2.8',
  'Daguerreotype': 'Petzval-style brass lens',
  'Wet Plate': 'large format brass lens',
  'Tintype': 'period brass lens',
  'Rolleiflex': 'Zeiss Planar 80mm f/2.8',
};

// Cameras with built-in zoom lenses
export const cameraZoomRange: Record<string, ZoomRange> = {
  'VHS Camcorder': {
    range: '8-80mm (48-480mm equiv)',
    options: ['8mm (Wide)', '24mm', '40mm', '60mm', '80mm (Tele)'],
  },
  'Handycam': {
    range: '3.6-36mm (40-400mm equiv)',
    options: ['3.6mm (Wide)', '10mm', '20mm', '36mm (Tele)'],
  },
  'Hi8': {
    range: '5.4-54mm (42-420mm equiv)',
    options: ['5.4mm (Wide)', '15mm', '30mm', '54mm (Tele)'],
  },
  'Betacam': {
    range: '8.5-119mm broadcast zoom',
    options: ['8.5mm (Wide)', '25mm', '50mm', '85mm', '119mm (Tele)'],
  },
  'MiniDV': {
    range: '5.9-59mm f/1.6 (41-410mm equiv)',
    options: ['5.9mm (Wide)', '15mm', '30mm', '45mm', '59mm (Tele)'],
  },
};

// Reverse conflicts: atmosphere blocks certain camera categories
export const atmosphereBlocksCategories: Partial<Record<Atmosphere, CameraCategory[]>> = {
  studio: ['vintage-lofi', 'antique'],
  cyberpunk: ['antique'],
};

// Reverse conflicts: preset blocks certain camera categories
export const presetBlocksCategories: Record<string, CameraCategory[]> = {
  vivid: ['vintage-lofi', 'antique'],
  highcontrast: ['vintage-lofi', 'antique'],
};

// Visual preset mutual exclusions (direct opposites that conflict)
export const presetMutualExclusions: Record<string, string[]> = {
  vivid: ['desaturated'],
  desaturated: ['vivid'],
  raw: ['filmlook', 'bleachbypass'],
  filmlook: ['raw'],
  bleachbypass: ['raw'],
};

// Atmosphere + Lighting redundancy warnings (selecting both is redundant)
export const atmosphereLightingRedundancy: Record<string, string[]> = {
  // Atmosphere key -> lighting keys that are redundant with it
  cyberpunk: ['neon'], // Cyberpunk already implies neon aesthetic
  moody: ['lowkey', 'chiaroscuro'], // Moody already implies dark lighting
  studio: ['softbox', 'highkey'], // Studio already implies studio lighting
};

// Lighting mutual exclusions (only one lighting style at a time recommended)
export const lightingCategories: Record<string, string> = {
  rembrandt: 'classic',
  chiaroscuro: 'classic',
  highkey: 'classic',
  lowkey: 'classic',
  goldenhour: 'natural',
  bluehour: 'natural',
  moonlit: 'natural',
  practical: 'natural',
  neon: 'stylized',
  godrays: 'stylized',
  softbox: 'stylized',
  bioluminescent: 'stylized',
};

// Warning message for redundant selections
export const redundancyWarnings: Record<string, string> = {
  'cyberpunk+neon': 'Cyberpunk atmosphere already includes neon aesthetic',
  'moody+lowkey': 'Moody atmosphere already implies dark, low-key lighting',
  'moody+chiaroscuro': 'Moody atmosphere already implies dramatic shadows',
  'studio+softbox': 'Studio atmosphere already includes softbox lighting',
  'studio+highkey': 'Studio atmosphere already implies bright, even lighting',
  'vivid+desaturated': 'Vivid and Desaturated are opposite styles',
};

// 1B: Atmosphere blocks DOF (Dreamy already has soft focus/bokeh)
export const atmosphereBlocksDOF: Partial<Record<string, string[]>> = {
  dreamy: ['shallow'], // Dreamy already includes bokeh/soft focus effect
};

// 1D: Atmosphere + Lighting mutual exclusions (pick one, not both)
export const atmosphereLightingExclusions: Record<string, string[]> = {
  studio: ['softbox', 'highkey'], // Studio atmosphere and studio lighting are redundant
};

// Director + Lighting redundancy warnings (6C, 6E, 8A, 8B, 8C)
export const directorLightingRedundancy: Record<string, string[]> = {
  'Wong Kar-wai': ['neon', 'goldenhour'], // His style already includes neon nights and warm tones
  'Terrence Malick': ['goldenhour'], // His style IS golden hour
};

// Director + Preset redundancy warnings (6F)
export const directorPresetRedundancy: Record<string, string[]> = {
  'David Fincher': ['desaturated'], // His style already includes desaturated look
};

// Director + Atmosphere redundancy warnings (8I)
export const directorAtmosphereRedundancy: Record<string, string[]> = {
  'David Lynch': ['moody'], // Lynch style already includes moody/dark atmosphere
};

// 8E: Atmosphere + Shot type conflicts (scale mismatches)
export const atmosphereShotConflicts: Record<string, string[]> = {
  epic: ['Insert Shot', 'Extreme Close-Up (ECU)'], // Epic scale conflicts with small detail shots
};

// 8H: Camera category + Location category conflicts
export const cameraLocationConflicts: Record<CameraCategory, string[]> = {
  antique: ['fantasy'], // 1800s cameras don't fit fantasy realms
  'vintage-lofi': [],
  'classic-film': [],
  'epic-film': [],
  'medium-format-classic': [],
  '35mm-classic': [],
  'modern-cinema': [],
  'modern-digital': [],
  'consumer-mobile': [],
  'none': [],
};

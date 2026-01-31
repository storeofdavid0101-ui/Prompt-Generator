/**
 * Film Stock Configuration
 *
 * Defines film stock presets for emulation in prompt generation.
 * Based on classic and modern film stocks used in cinema and photography.
 *
 * @module config/filmStock
 */

import type { FilmStockPreset, FilmStockCategory, PushPullValue, ProcessingType } from './types/filmStock';

/**
 * Default film stock state values.
 */
export const FILM_STOCK_DEFAULTS = {
  enabled: false,
  selectedStock: null as string | null,
  pushPull: 0 as PushPullValue,
  processingType: 'standard' as ProcessingType,
};

/**
 * Film stock presets organized by manufacturer and type.
 */
export const filmStockPresets: Record<string, FilmStockPreset> = {
  // Kodak Motion Picture Stocks
  'kodak-vision3-500t': {
    id: 'kodak-vision3-500t',
    name: 'Kodak Vision3 500T',
    manufacturer: 'Kodak',
    category: 'motion-picture',
    iso: 500,
    colorBalance: 'tungsten',
    keywords: 'Kodak Vision3 500T film stock, tungsten balanced, rich shadows, creamy highlights, organic film grain, cinema color science',
    safeKeywords: 'professional film stock, tungsten balanced, rich shadows, creamy highlights, organic film grain, cinema color science',
    gradient: 'linear-gradient(135deg, #2C1810 0%, #8B4513 50%, #DEB887 100%)',
    characteristics: 'Rich shadows, creamy highlights, excellent low-light performance',
  },
  'kodak-vision3-250d': {
    id: 'kodak-vision3-250d',
    name: 'Kodak Vision3 250D',
    manufacturer: 'Kodak',
    category: 'motion-picture',
    iso: 250,
    colorBalance: 'daylight',
    keywords: 'Kodak Vision3 250D film stock, daylight balanced, natural skin tones, fine grain, accurate colors, cinema quality',
    safeKeywords: 'professional film stock, daylight balanced, natural skin tones, fine grain, accurate colors',
    gradient: 'linear-gradient(135deg, #87CEEB 0%, #F5DEB3 50%, #FFE4B5 100%)',
    characteristics: 'Natural skin tones, fine grain, accurate color reproduction',
  },
  'kodak-5247': {
    id: 'kodak-5247',
    name: 'Eastman 5247',
    manufacturer: 'Kodak',
    category: 'motion-picture',
    iso: 100,
    colorBalance: 'tungsten',
    keywords: 'Eastman 5247 film stock, 1970s cinema look, warm midtones, lifted blacks, vintage color science, classic Hollywood',
    safeKeywords: 'vintage film stock, 1970s cinema aesthetic, warm midtones, lifted blacks, classic color science',
    gradient: 'linear-gradient(135deg, #654321 0%, #D2691E 50%, #F4A460 100%)',
    characteristics: '1970s cinema aesthetic, warm midtones, slightly lifted blacks',
  },
  'kodak-5219': {
    id: 'kodak-5219',
    name: 'Kodak Vision3 500T 5219',
    manufacturer: 'Kodak',
    category: 'motion-picture',
    iso: 500,
    colorBalance: 'tungsten',
    keywords: 'Kodak 5219 film stock, modern cinema, extended dynamic range, clean shadows, neutral color, Hollywood standard',
    safeKeywords: 'modern cinema film stock, extended dynamic range, clean shadows, neutral color science',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #4a4a6a 50%, #8a8ab0 100%)',
    characteristics: 'Modern cinema standard, extended dynamic range, clean shadows',
  },

  // Fujifilm Motion Picture
  'fuji-eterna-500': {
    id: 'fuji-eterna-500',
    name: 'Fuji Eterna 500',
    manufacturer: 'Fujifilm',
    category: 'motion-picture',
    iso: 500,
    colorBalance: 'tungsten',
    keywords: 'Fuji Eterna 500 film stock, Japanese cinema aesthetic, cool shadows, muted highlights, subtle grain, understated color',
    safeKeywords: 'Japanese cinema film stock, cool shadows, muted highlights, subtle grain, understated color',
    gradient: 'linear-gradient(135deg, #2F4F4F 0%, #708090 50%, #B0C4DE 100%)',
    characteristics: 'Cool shadows, muted highlights, subtle grain structure',
  },
  'fuji-eterna-vivid': {
    id: 'fuji-eterna-vivid',
    name: 'Fuji Eterna Vivid',
    manufacturer: 'Fujifilm',
    category: 'motion-picture',
    iso: 500,
    colorBalance: 'daylight',
    keywords: 'Fuji Eterna Vivid film stock, saturated colors, punchy contrast, vibrant greens, Asian cinema style',
    safeKeywords: 'vivid film stock, saturated colors, punchy contrast, vibrant greens, artistic color science',
    gradient: 'linear-gradient(135deg, #228B22 0%, #32CD32 50%, #90EE90 100%)',
    characteristics: 'Saturated colors, punchy contrast, distinctive greens',
  },

  // Cinestill (Respooled Motion Picture)
  'cinestill-800t': {
    id: 'cinestill-800t',
    name: 'CineStill 800T',
    manufacturer: 'CineStill',
    category: 'specialty',
    iso: 800,
    colorBalance: 'tungsten',
    keywords: 'CineStill 800T film stock, halation glow, red halos around highlights, neon-friendly, night photography, urban aesthetic',
    safeKeywords: 'specialty film stock, halation glow, halos around highlights, night photography aesthetic, urban look',
    gradient: 'linear-gradient(135deg, #0D1117 0%, #FF6B6B 50%, #FFE66D 100%)',
    characteristics: 'Signature halation/red halos around highlights, neon-friendly',
  },
  'cinestill-50d': {
    id: 'cinestill-50d',
    name: 'CineStill 50D',
    manufacturer: 'CineStill',
    category: 'specialty',
    iso: 50,
    colorBalance: 'daylight',
    keywords: 'CineStill 50D film stock, extremely fine grain, high sharpness, cinematic daylight, professional portrait film',
    safeKeywords: 'fine grain film stock, high sharpness, cinematic daylight, professional portrait aesthetic',
    gradient: 'linear-gradient(135deg, #87CEEB 0%, #ADD8E6 50%, #E0FFFF 100%)',
    characteristics: 'Extremely fine grain, high sharpness, cinematic daylight look',
  },

  // Kodak Still Photography
  'kodak-portra-400': {
    id: 'kodak-portra-400',
    name: 'Kodak Portra 400',
    manufacturer: 'Kodak',
    category: 'negative',
    iso: 400,
    colorBalance: 'daylight',
    keywords: 'Kodak Portra 400 film, beautiful skin tones, low contrast, pastel color palette, portrait photography, wedding aesthetic',
    safeKeywords: 'portrait film, beautiful skin tones, low contrast, pastel color palette, wedding aesthetic',
    gradient: 'linear-gradient(135deg, #FFEFD5 0%, #FFE4C4 50%, #FFDAB9 100%)',
    characteristics: 'Beautiful skin tones, low contrast, pastel colors',
  },
  'kodak-portra-800': {
    id: 'kodak-portra-800',
    name: 'Kodak Portra 800',
    manufacturer: 'Kodak',
    category: 'negative',
    iso: 800,
    colorBalance: 'daylight',
    keywords: 'Kodak Portra 800 film, warm color cast, visible grain, low light portraits, golden hour aesthetic',
    safeKeywords: 'high speed portrait film, warm color cast, visible grain, low light aesthetic, golden hour look',
    gradient: 'linear-gradient(135deg, #DEB887 0%, #F5DEB3 50%, #FFEFD5 100%)',
    characteristics: 'Warm color cast, more visible grain, excellent low light',
  },
  'kodak-ektar-100': {
    id: 'kodak-ektar-100',
    name: 'Kodak Ektar 100',
    manufacturer: 'Kodak',
    category: 'negative',
    iso: 100,
    colorBalance: 'daylight',
    keywords: 'Kodak Ektar 100 film, ultra-saturated colors, finest grain, vivid reds, landscape photography, commercial aesthetic',
    safeKeywords: 'ultra-saturated film, finest grain, vivid colors, landscape photography aesthetic',
    gradient: 'linear-gradient(135deg, #FF4500 0%, #FF6347 50%, #FF7F50 100%)',
    characteristics: 'Ultra-saturated colors, finest grain of any color negative',
  },
  'kodak-gold-200': {
    id: 'kodak-gold-200',
    name: 'Kodak Gold 200',
    manufacturer: 'Kodak',
    category: 'negative',
    iso: 200,
    colorBalance: 'daylight',
    keywords: 'Kodak Gold 200 film, warm consumer film look, nostalgic aesthetic, family photo colors, 1990s photography',
    safeKeywords: 'warm consumer film look, nostalgic aesthetic, family photo colors, 1990s photography',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
    characteristics: 'Warm, nostalgic consumer film aesthetic',
  },

  // Fujifilm Still Photography
  'fuji-pro-400h': {
    id: 'fuji-pro-400h',
    name: 'Fuji Pro 400H',
    manufacturer: 'Fujifilm',
    category: 'negative',
    iso: 400,
    colorBalance: 'daylight',
    keywords: 'Fuji Pro 400H film, cool pastel tones, soft contrast, overexposure friendly, fashion photography, editorial aesthetic',
    safeKeywords: 'cool pastel film tones, soft contrast, overexposure friendly, fashion photography aesthetic',
    gradient: 'linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 50%, #DDA0DD 100%)',
    characteristics: 'Cool pastel tones, soft contrast, overexposure friendly',
  },
  'fuji-superia-400': {
    id: 'fuji-superia-400',
    name: 'Fuji Superia 400',
    manufacturer: 'Fujifilm',
    category: 'negative',
    iso: 400,
    colorBalance: 'daylight',
    keywords: 'Fuji Superia 400 film, green-shifted shadows, punchy contrast, everyday photography, nostalgic Japanese film',
    safeKeywords: 'consumer film look, green-shifted shadows, punchy contrast, nostalgic Japanese photography',
    gradient: 'linear-gradient(135deg, #3CB371 0%, #90EE90 50%, #98FB98 100%)',
    characteristics: 'Green-shifted shadows, punchy contrast, everyday aesthetic',
  },
  'fuji-velvia-50': {
    id: 'fuji-velvia-50',
    name: 'Fuji Velvia 50',
    manufacturer: 'Fujifilm',
    category: 'reversal',
    iso: 50,
    colorBalance: 'daylight',
    keywords: 'Fuji Velvia 50 slide film, hyper-saturated colors, deep blacks, vivid landscape photography, nature aesthetic',
    safeKeywords: 'slide film, hyper-saturated colors, deep blacks, vivid landscape photography aesthetic',
    gradient: 'linear-gradient(135deg, #006400 0%, #228B22 50%, #32CD32 100%)',
    characteristics: 'Hyper-saturated colors, deep blacks, landscape legend',
  },
  'fuji-provia-100f': {
    id: 'fuji-provia-100f',
    name: 'Fuji Provia 100F',
    manufacturer: 'Fujifilm',
    category: 'reversal',
    iso: 100,
    colorBalance: 'daylight',
    keywords: 'Fuji Provia 100F slide film, neutral accurate colors, fine grain, professional slide film, commercial photography',
    safeKeywords: 'professional slide film, neutral accurate colors, fine grain, commercial photography aesthetic',
    gradient: 'linear-gradient(135deg, #4682B4 0%, #5F9EA0 50%, #87CEEB 100%)',
    characteristics: 'Neutral, accurate colors with fine grain',
  },

  // Black & White
  'kodak-trix-400': {
    id: 'kodak-trix-400',
    name: 'Kodak Tri-X 400',
    manufacturer: 'Kodak',
    category: 'negative',
    iso: 400,
    colorBalance: 'daylight',
    keywords: 'Kodak Tri-X 400 black and white film, classic grain structure, high contrast, photojournalism aesthetic, street photography',
    safeKeywords: 'classic black and white film, distinctive grain, high contrast, photojournalism aesthetic',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #8a8a8a 100%)',
    characteristics: 'Classic grain structure, high contrast, timeless B&W',
  },
  'ilford-hp5': {
    id: 'ilford-hp5',
    name: 'Ilford HP5 Plus',
    manufacturer: 'Ilford',
    category: 'negative',
    iso: 400,
    colorBalance: 'daylight',
    keywords: 'Ilford HP5 Plus black and white film, smooth grain, wide tonal range, push-friendly, documentary photography',
    safeKeywords: 'classic black and white film, smooth grain, wide tonal range, documentary aesthetic',
    gradient: 'linear-gradient(135deg, #2F2F2F 0%, #5F5F5F 50%, #9F9F9F 100%)',
    characteristics: 'Smooth grain, wide tonal range, versatile B&W',
  },
};

/**
 * Get film stocks by category.
 */
export function getFilmStocksByCategory(category: FilmStockCategory): FilmStockPreset[] {
  return Object.values(filmStockPresets).filter((stock) => stock.category === category);
}

/**
 * Get film stocks by manufacturer.
 */
export function getFilmStocksByManufacturer(manufacturer: string): FilmStockPreset[] {
  return Object.values(filmStockPresets).filter((stock) => stock.manufacturer === manufacturer);
}

/**
 * Film stock category display names.
 */
export const filmStockCategoryNames: Record<FilmStockCategory, string> = {
  'motion-picture': 'Motion Picture',
  negative: 'Color Negative',
  reversal: 'Slide/Reversal',
  specialty: 'Specialty',
};

/**
 * Processing type display names and descriptions.
 */
export const processingTypeOptions: Array<{ value: ProcessingType; label: string; description: string }> = [
  { value: 'standard', label: 'Standard', description: 'Normal development' },
  { value: 'cross-process', label: 'Cross Process', description: 'C-41 in E-6 chemicals for color shifts' },
  { value: 'bleach-bypass', label: 'Bleach Bypass', description: 'Skip bleach for desaturated, high contrast' },
];

/**
 * Push/pull options with descriptions.
 */
export const pushPullOptions: Array<{ value: PushPullValue; label: string; description: string }> = [
  { value: -2, label: '-2', description: 'Pull 2 stops (softer, lower contrast)' },
  { value: -1, label: '-1', description: 'Pull 1 stop (slightly softer)' },
  { value: 0, label: '0', description: 'Normal development' },
  { value: 1, label: '+1', description: 'Push 1 stop (more grain, contrast)' },
  { value: 2, label: '+2', description: 'Push 2 stops (heavy grain, high contrast)' },
];

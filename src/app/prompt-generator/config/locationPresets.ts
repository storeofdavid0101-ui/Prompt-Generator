/**
 * Location preset configurations
 * Predefined location options with AI-optimized keywords
 */

export interface LocationPreset {
  label: string;
  keywords: string;
  category: 'urban' | 'nature' | 'interior' | 'fantasy' | 'industrial';
}

export const locationPresets: LocationPreset[] = [
  // Urban
  { label: 'City Street', keywords: 'busy city street, urban environment, buildings, pedestrians', category: 'urban' },
  { label: 'Neon-lit Alley', keywords: 'neon-lit alleyway at night, urban glow, wet pavement, atmospheric', category: 'urban' },
  { label: 'Rooftop', keywords: 'city rooftop, skyline view, urban landscape, overlooking the city', category: 'urban' },
  { label: 'Subway Station', keywords: 'underground subway station, fluorescent lights, train platform, urban transit', category: 'urban' },
  { label: 'Parking Lot', keywords: 'parking lot, asphalt, parked cars, urban setting, outdoor parking', category: 'urban' },

  // Nature
  { label: 'Forest', keywords: 'dense forest, towering trees, dappled sunlight, natural woodland', category: 'nature' },
  { label: 'Desert', keywords: 'vast desert landscape, sand dunes, arid environment, endless horizon', category: 'nature' },
  { label: 'Beach', keywords: 'sandy beach, ocean waves, coastal setting, shoreline', category: 'nature' },
  { label: 'Mountain Peak', keywords: 'mountain summit, dramatic peaks, alpine landscape, breathtaking view', category: 'nature' },
  { label: 'Cornfield', keywords: 'golden cornfield, rural farmland, endless rows of corn, agricultural landscape', category: 'nature' },
  { label: 'Waterfall', keywords: 'majestic waterfall, cascading water, mist, lush surroundings', category: 'nature' },
  { label: 'Snowy Tundra', keywords: 'frozen tundra, snow-covered landscape, icy wilderness, arctic environment', category: 'nature' },

  // Interior
  { label: 'Abandoned Warehouse', keywords: 'abandoned warehouse interior, industrial decay, dusty, shafts of light', category: 'interior' },
  { label: 'Luxury Penthouse', keywords: 'luxurious penthouse interior, modern design, floor-to-ceiling windows, elegant', category: 'interior' },
  { label: 'Old Library', keywords: 'ancient library, towering bookshelves, dusty tomes, warm ambient light', category: 'interior' },
  { label: 'Neon Bar', keywords: 'neon-lit bar interior, moody atmosphere, colorful lights, nightlife', category: 'interior' },
  { label: 'Cathedral', keywords: 'grand cathedral interior, gothic architecture, stained glass windows, sacred space', category: 'interior' },
  { label: 'Office', keywords: 'modern office interior, corporate environment, desks, computers, professional workspace', category: 'interior' },

  // Fantasy
  { label: 'Enchanted Forest', keywords: 'magical enchanted forest, glowing flora, mystical atmosphere, fantasy woodland', category: 'fantasy' },
  { label: 'Floating Islands', keywords: 'floating islands in the sky, fantasy landscape, clouds, ethereal', category: 'fantasy' },
  { label: 'Ancient Ruins', keywords: 'ancient ruins, crumbling stone structures, overgrown with vines, mysterious past', category: 'fantasy' },
  { label: 'Crystal Cave', keywords: 'crystal cave interior, glowing gemstones, underground wonder, magical light', category: 'fantasy' },

  // Industrial
  { label: 'Factory Floor', keywords: 'industrial factory floor, machinery, metal structures, manufacturing', category: 'industrial' },
  { label: 'Cyberpunk City', keywords: 'cyberpunk megacity, towering skyscrapers, holographic ads, dystopian future', category: 'industrial' },
  { label: 'Space Station', keywords: 'space station interior, futuristic technology, zero gravity, orbital view', category: 'industrial' },
  { label: 'Underground Bunker', keywords: 'underground bunker, concrete walls, survival shelter, post-apocalyptic', category: 'industrial' },
];

// Group presets by category for organized display
export const locationPresetsByCategory = locationPresets.reduce((acc, preset) => {
  if (!acc[preset.category]) {
    acc[preset.category] = [];
  }
  acc[preset.category].push(preset);
  return acc;
}, {} as Record<string, LocationPreset[]>);

// Category display names
export const locationCategoryNames: Record<string, string> = {
  urban: 'Urban',
  nature: 'Nature',
  interior: 'Interior',
  fantasy: 'Fantasy',
  industrial: 'Industrial / Sci-Fi',
};

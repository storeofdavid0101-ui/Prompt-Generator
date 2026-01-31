/**
 * Magic Subjects Database
 * 50 diverse, rich descriptions for the Magic Randomize feature
 * Ranges from cinematic characters to atmospheric scenes
 */

/** Theme tags for matching subjects and characters */
export type SubjectTheme =
  | 'scifi'
  | 'fantasy'
  | 'western'
  | 'asian'
  | 'cyberpunk'
  | 'historical'
  | 'modern'
  | 'nature'
  | 'urban'
  | 'military'
  | 'gothic'
  | 'steampunk'
  | 'noir'
  | 'vintage'
  | 'action'
  | 'elegant';

export interface MagicSubject {
  subject: string;
  category: 'character' | 'scene' | 'portrait' | 'action' | 'atmospheric';
  /** Theme tags for smart character matching */
  themes?: SubjectTheme[];
  /** Safe alternative for models with strict content policies (ChatGPT, DALL-E) */
  safeSubject?: string;
}

export interface MagicCharacter {
  description: string;
  /** Theme tags this character fits well with */
  themes: SubjectTheme[];
  /** Safe alternative for models with strict content policies (ChatGPT, DALL-E) */
  safeDescription?: string;
}

export const magicSubjects: MagicSubject[] = [
  // Character-focused (15)
  {
    subject: 'A futuristic soldier standing in a sandstorm on a desolate planet',
    category: 'character',
    themes: ['scifi', 'military', 'action'],
  },
  {
    subject: 'A high-fashion model wearing a dress made of liquid gold in a brutalist concrete hall',
    category: 'character',
    themes: ['modern', 'elegant'],
  },
  {
    subject: 'A jazz musician playing the saxophone under a single streetlamp in 1950s New York',
    category: 'character',
    themes: ['vintage', 'urban', 'noir'],
  },
  {
    subject: 'A cybernetic monk meditating inside a high-tech forest',
    category: 'character',
    themes: ['scifi', 'asian', 'cyberpunk'],
  },
  {
    subject: 'A cyberpunk mercenary in a neon alley, rain dripping from their worn leather jacket',
    category: 'character',
    themes: ['cyberpunk', 'urban', 'action'],
    safeSubject: 'A cyberpunk courier in a neon alley, rain dripping from their worn leather jacket',
  },
  {
    subject: 'An elderly fisherman at dawn, mending nets on a weathered wooden dock',
    category: 'character',
    themes: ['nature', 'vintage'],
  },
  {
    subject: 'A Victorian-era detective examining evidence under gaslight in a foggy London street',
    category: 'character',
    themes: ['historical', 'noir', 'gothic'],
  },
  {
    subject: 'A samurai warrior standing alone in a field of tall grass, wind in their hair',
    category: 'character',
    themes: ['asian', 'historical', 'action'],
  },
  {
    subject: 'A street artist spray-painting a massive mural on a graffiti-covered wall at midnight',
    category: 'character',
    themes: ['urban', 'modern'],
  },
  {
    subject: 'A ballet dancer mid-leap in an abandoned theater, dust particles catching the spotlight',
    category: 'character',
    themes: ['elegant', 'vintage'],
  },
  {
    subject: 'A weary astronaut removing their helmet inside a cramped spacecraft',
    category: 'character',
    themes: ['scifi', 'modern'],
  },
  {
    subject: 'A mysterious fortune teller in a dimly lit caravan surrounded by crystal balls and candles',
    category: 'character',
    themes: ['gothic', 'fantasy'],
  },
  {
    subject: 'A punk rock guitarist smashing their instrument on stage, sparks flying everywhere',
    category: 'character',
    themes: ['modern', 'urban', 'action'],
    safeSubject: 'A punk rock guitarist performing intensely on stage, dramatic stage lighting and energy',
  },
  {
    subject: 'A scientist in a hazmat suit examining a glowing specimen in a sterile laboratory',
    category: 'character',
    themes: ['scifi', 'modern'],
  },
  {
    subject: 'A lone cowboy silhouetted against a burning sunset in the Arizona desert',
    category: 'character',
    themes: ['western', 'nature'],
  },

  // Scene-focused (12)
  {
    subject: 'An abandoned amusement park at twilight, rusted ferris wheel against a purple sky',
    category: 'scene',
    themes: ['gothic', 'urban'],
  },
  {
    subject: 'A massive ancient library with towering bookshelves and floating lanterns',
    category: 'scene',
    themes: ['fantasy', 'historical'],
  },
  {
    subject: 'A rain-soaked Tokyo street at 3am, vending machines glowing in the mist',
    category: 'scene',
    themes: ['asian', 'cyberpunk', 'urban', 'noir'],
  },
  {
    subject: 'A frozen lake reflecting the northern lights in the Arctic wilderness',
    category: 'scene',
    themes: ['nature'],
  },
  {
    subject: 'An overgrown post-apocalyptic highway with nature reclaiming the concrete',
    category: 'scene',
    themes: ['scifi', 'nature'],
    safeSubject: 'An overgrown abandoned highway with nature reclaiming the concrete, vines and wildflowers',
  },
  {
    subject: 'A cozy bookshop interior on a rainy afternoon, warm light through foggy windows',
    category: 'scene',
    themes: ['vintage', 'urban'],
  },
  {
    subject: 'A grand cathedral interior with dramatic light streaming through stained glass',
    category: 'scene',
    themes: ['historical', 'gothic'],
  },
  {
    subject: 'A bustling night market in Southeast Asia with hanging lanterns and steam rising from food stalls',
    category: 'scene',
    themes: ['asian', 'urban'],
  },
  {
    subject: 'An underwater coral reef teeming with bioluminescent creatures',
    category: 'scene',
    themes: ['nature', 'fantasy'],
  },
  {
    subject: 'A vintage 1960s diner at night, neon signs reflecting on wet pavement',
    category: 'scene',
    themes: ['vintage', 'urban', 'noir'],
  },
  {
    subject: 'A misty bamboo forest at sunrise with a single stone path',
    category: 'scene',
    themes: ['asian', 'nature'],
  },
  {
    subject: 'A massive steampunk clocktower interior with gears and brass mechanisms',
    category: 'scene',
    themes: ['steampunk', 'historical'],
  },

  // Portrait-focused (10)
  {
    subject: 'A weathered ship captain with a salt-and-pepper beard and knowing eyes',
    category: 'portrait',
    themes: ['historical', 'nature'],
  },
  {
    subject: 'A young woman with flowers woven into her wild curly hair',
    category: 'portrait',
    themes: ['nature', 'fantasy', 'elegant'],
  },
  {
    subject: 'An ancient warrior king wearing a battle-scarred crown',
    category: 'portrait',
    themes: ['fantasy', 'historical', 'military'],
    safeSubject: 'An ancient king wearing an ornate weathered crown, regal and wise expression',
  },
  {
    subject: 'A child prodigy chess player with an intense, focused gaze',
    category: 'portrait',
    themes: ['modern'],
  },
  {
    subject: 'A glamorous 1920s flapper with art deco jewelry and a cigarette holder',
    category: 'portrait',
    themes: ['vintage', 'elegant', 'noir'],
    safeSubject: 'A glamorous 1920s flapper with art deco jewelry and a feathered headband',
  },
  {
    subject: 'A tattooed yakuza boss in traditional Japanese clothing',
    category: 'portrait',
    themes: ['asian', 'noir', 'modern'],
    safeSubject: 'A distinguished Japanese businessman in traditional formal clothing, intricate tattoo visible on arm',
  },
  {
    subject: 'A freckled redhead with striking green eyes in natural sunlight',
    category: 'portrait',
    themes: ['nature', 'modern'],
  },
  {
    subject: 'An elderly Native American chief with ceremonial face paint',
    category: 'portrait',
    themes: ['historical', 'nature'],
  },
  {
    subject: 'A futuristic android with human-like features and subtle mechanical details',
    category: 'portrait',
    themes: ['scifi', 'cyberpunk'],
  },
  {
    subject: 'A tired nurse at the end of a long shift, compassion in their eyes',
    category: 'portrait',
    themes: ['modern'],
  },

  // Action-focused (8)
  {
    subject: 'A motorcycle racer leaning into a sharp turn, sparks flying from the asphalt',
    category: 'action',
    themes: ['modern', 'action'],
    safeSubject: 'A motorcycle racer leaning into a sharp turn, motion blur and dynamic angle',
  },
  {
    subject: 'A cliff diver suspended in mid-air above turquoise waters',
    category: 'action',
    themes: ['nature', 'action'],
  },
  {
    subject: 'A boxer throwing a knockout punch, sweat and determination frozen in time',
    category: 'action',
    themes: ['modern', 'action'],
    safeSubject: 'A boxer in a powerful stance, sweat glistening, intense determination in their eyes',
  },
  {
    subject: 'A parkour athlete leaping between rooftops against a city skyline',
    category: 'action',
    themes: ['urban', 'modern', 'action'],
  },
  {
    subject: 'A matador in the moment of truth, red cape flowing dramatically',
    category: 'action',
    themes: ['historical', 'action', 'elegant'],
    safeSubject: 'A flamenco dancer in dramatic pose, red fabric flowing elegantly in motion',
  },
  {
    subject: 'A snowboarder carving through fresh powder with mountain peaks behind',
    category: 'action',
    themes: ['nature', 'action', 'modern'],
  },
  {
    subject: 'A Formula 1 car exploding through a rain spray at 200mph',
    category: 'action',
    themes: ['modern', 'action'],
    safeSubject: 'A Formula 1 car racing through rain spray at high speed, dramatic water mist',
  },
  {
    subject: 'A knight in full armor charging on horseback, lance lowered',
    category: 'action',
    themes: ['fantasy', 'historical', 'action', 'military'],
    safeSubject: 'A knight in shining armor riding majestically on horseback, banner flowing in the wind',
  },

  // Atmospheric (5)
  {
    subject: 'A solitary lighthouse on a stormy cliff, waves crashing below',
    category: 'atmospheric',
    themes: ['nature', 'gothic'],
  },
  {
    subject: 'A forgotten train station platform shrouded in morning fog',
    category: 'atmospheric',
    themes: ['vintage', 'urban', 'noir'],
  },
  {
    subject: 'A moonlit cemetery with ancient tombstones and a single mourner',
    category: 'atmospheric',
    themes: ['gothic', 'historical'],
    safeSubject: 'A moonlit historic garden with ancient stone monuments and a solitary figure',
  },
  {
    subject: 'A volcanic landscape with rivers of lava and a dark ash-filled sky',
    category: 'atmospheric',
    themes: ['nature', 'fantasy'],
  },
  {
    subject: 'A serene Japanese garden in autumn, maple leaves floating on still water',
    category: 'atmospheric',
    themes: ['asian', 'nature'],
  },
];

/**
 * Character descriptions for the character input field
 * More focused on describing a person/being with theme matching
 */
export const magicCharacters: MagicCharacter[] = [
  { description: 'A battle-hardened space marine with cybernetic implants and glowing scars', themes: ['scifi', 'military', 'action'], safeDescription: 'A veteran space explorer with cybernetic implants and weathered features' },
  { description: 'An elegant elven archer with silver hair and piercing violet eyes', themes: ['fantasy', 'nature', 'elegant'] },
  { description: 'A grizzled Wild West outlaw with a distinctive scar across their cheek', themes: ['western', 'action'], safeDescription: 'A weathered Wild West drifter with a distinctive scar and knowing eyes' },
  { description: 'A powerful witch with flowing black robes and an ancient staff', themes: ['fantasy', 'gothic'] },
  { description: 'A charismatic 1970s disco dancer in a glittering jumpsuit', themes: ['vintage', 'urban', 'elegant'] },
  { description: 'A stoic ronin with a weathered katana and a mysterious past', themes: ['asian', 'historical', 'action'], safeDescription: 'A stoic wandering samurai with traditional clothing and a mysterious past' },
  { description: 'A fierce Viking shieldmaiden with intricate braids and war paint', themes: ['historical', 'military', 'action'], safeDescription: 'A strong Viking woman with intricate braids and traditional face markings' },
  { description: 'A brilliant mad scientist with wild Einstein-like hair and goggles', themes: ['scifi', 'steampunk', 'vintage'], safeDescription: 'A brilliant eccentric scientist with wild Einstein-like hair and goggles' },
  { description: 'A graceful geisha in traditional white makeup and kimono', themes: ['asian', 'historical', 'elegant'] },
  { description: 'A rugged mountain climber with frost-covered beard and gear', themes: ['nature', 'action', 'modern'] },
  { description: 'A sleek corporate assassin in a tailored black suit', themes: ['modern', 'noir', 'action'], safeDescription: 'A sleek corporate professional in a tailored black suit, mysterious aura' },
  { description: 'A whimsical fairy with iridescent wings and flower crown', themes: ['fantasy', 'nature', 'elegant'] },
  { description: 'An intimidating gladiator with bronze armor and battle scars', themes: ['historical', 'action', 'military'], safeDescription: 'A powerful Roman athlete in bronze armor, impressive physique' },
  { description: 'A mysterious plague doctor with a beaked mask and dark cloak', themes: ['gothic', 'historical'], safeDescription: 'A mysterious Renaissance physician with a beaked mask and dark cloak' },
  { description: 'A radiant sun goddess with golden skin and flowing flames for hair', themes: ['fantasy', 'elegant'] },
  { description: 'A cunning cat burglar in a skin-tight leather suit', themes: ['noir', 'urban', 'modern', 'action'], safeDescription: 'A mysterious figure in sleek dark attire, agile and graceful' },
  { description: 'A wise old wizard with a long grey beard and starry robes', themes: ['fantasy'] },
  { description: 'A fierce Amazonian warrior princess with golden armor', themes: ['fantasy', 'action', 'military', 'elegant'], safeDescription: 'A regal Amazonian princess with golden armor and confident stance' },
  { description: 'A brooding vampire lord in Victorian finery', themes: ['gothic', 'historical', 'elegant'] },
  { description: 'A cheerful steampunk inventor with brass prosthetic arm', themes: ['steampunk', 'vintage'] },
  { description: 'A cyberpunk hacker with neon hair and holographic tattoos', themes: ['cyberpunk', 'urban', 'scifi'] },
  { description: 'A noir detective in a trenchcoat with a cigarette and fedora', themes: ['noir', 'vintage', 'urban'], safeDescription: 'A noir detective in a trenchcoat with a fedora, thoughtful expression' },
  { description: 'A mystical shaman with tribal markings and spirit animals', themes: ['fantasy', 'nature', 'historical'] },
  { description: 'A futuristic android with chrome skin and glowing circuits', themes: ['scifi', 'cyberpunk'] },
];

/**
 * Get a random item from an array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a random subject for the main subject field
 * @param useSafeMode - If true, uses safe alternatives for strict content policy models
 * Returns both the subject string and the full MagicSubject object
 */
export function getRandomSubject(useSafeMode: boolean = false): string {
  const item = getRandomItem(magicSubjects);
  if (useSafeMode && item.safeSubject) {
    return item.safeSubject;
  }
  return item.subject;
}

/**
 * Get a random subject with its metadata for smart matching
 */
export function getRandomSubjectWithMeta(): MagicSubject {
  return getRandomItem(magicSubjects);
}

/**
 * Get the appropriate subject text based on safe mode
 * @param subject - The MagicSubject object
 * @param useSafeMode - If true, uses safe alternative if available
 */
export function getSubjectText(subject: MagicSubject, useSafeMode: boolean = false): string {
  if (useSafeMode && subject.safeSubject) {
    return subject.safeSubject;
  }
  return subject.subject;
}

/**
 * Get a random character description (simple)
 * @param useSafeMode - If true, uses safe alternatives for strict content policy models
 */
export function getRandomCharacter(useSafeMode: boolean = false): string {
  const item = getRandomItem(magicCharacters);
  if (useSafeMode && item.safeDescription) {
    return item.safeDescription;
  }
  return item.description;
}

/**
 * Get the appropriate character text based on safe mode
 * @param character - The MagicCharacter object
 * @param useSafeMode - If true, uses safe alternative if available
 */
export function getCharacterText(character: MagicCharacter, useSafeMode: boolean = false): string {
  if (useSafeMode && character.safeDescription) {
    return character.safeDescription;
  }
  return character.description;
}

/** Generic themes that need stronger matching to avoid mismatches */
const GENERIC_THEMES: SubjectTheme[] = ['modern', 'nature', 'urban', 'action', 'elegant'];

/**
 * Get a character that matches the themes of a subject
 * Falls back to random if no match found
 * Requires stronger matching for generic themes to avoid mismatches
 * @param subjectThemes - Themes to match against
 * @param useSafeMode - If true, uses safe alternatives for strict content policy models
 */
export function getMatchingCharacter(subjectThemes?: SubjectTheme[], useSafeMode: boolean = false): string {
  if (!subjectThemes || subjectThemes.length === 0) {
    return getRandomCharacter(useSafeMode);
  }

  // Separate specific and generic themes
  const specificThemes = subjectThemes.filter((t) => !GENERIC_THEMES.includes(t));
  const hasSpecificThemes = specificThemes.length > 0;

  // Find characters that share themes with the subject
  const matchingCharacters = magicCharacters.filter((char) => {
    const matchingThemes = char.themes.filter((theme) => subjectThemes.includes(theme));
    const matchingSpecific = char.themes.filter((theme) => specificThemes.includes(theme));

    // If subject has specific themes, character must match at least one specific theme
    if (hasSpecificThemes) {
      return matchingSpecific.length > 0;
    }

    // If only generic themes, require at least 2 matching themes
    return matchingThemes.length >= 2;
  });

  if (matchingCharacters.length === 0) {
    // No good match - return empty string rather than random mismatch
    return '';
  }

  // Prefer characters with more matching themes, prioritizing specific themes
  const scored = matchingCharacters.map((char) => {
    const specificMatches = char.themes.filter((theme) => specificThemes.includes(theme)).length;
    const totalMatches = char.themes.filter((theme) => subjectThemes.includes(theme)).length;
    // Specific theme matches are worth more
    return {
      char,
      score: specificMatches * 2 + totalMatches,
    };
  });

  // Get all characters with the max score
  const maxScore = Math.max(...scored.map((s) => s.score));
  const bestMatches = scored.filter((s) => s.score === maxScore).map((s) => s.char);

  const selected = getRandomItem(bestMatches);
  if (useSafeMode && selected.safeDescription) {
    return selected.safeDescription;
  }
  return selected.description;
}

/**
 * Extract themes from a subject string by searching the magicSubjects array
 */
export function getSubjectThemes(subjectString: string): SubjectTheme[] {
  // First, try to find an exact match in magicSubjects
  const exactMatch = magicSubjects.find((s) => s.subject === subjectString);
  if (exactMatch?.themes) {
    return exactMatch.themes;
  }

  // If no exact match, analyze the subject string for keywords
  const themes: SubjectTheme[] = [];
  const lower = subjectString.toLowerCase();

  // Keyword mapping for theme detection
  const keywordThemes: Record<string, SubjectTheme[]> = {
    'cyberpunk': ['cyberpunk', 'urban'],
    'neon': ['cyberpunk', 'urban'],
    'cyber': ['cyberpunk', 'scifi'],
    'futuristic': ['scifi'],
    'space': ['scifi'],
    'sci-fi': ['scifi'],
    'soldier': ['military', 'action'],
    'warrior': ['action', 'military'],
    'samurai': ['asian', 'historical', 'action'],
    'ninja': ['asian', 'action'],
    'geisha': ['asian', 'historical', 'elegant'],
    'japanese': ['asian'],
    'tokyo': ['asian', 'urban'],
    'asian': ['asian'],
    'chinese': ['asian'],
    'cowboy': ['western'],
    'western': ['western'],
    'desert': ['western', 'nature'],
    'victorian': ['historical', 'gothic'],
    'medieval': ['historical', 'fantasy'],
    'ancient': ['historical'],
    'vintage': ['vintage'],
    'retro': ['vintage'],
    '1950s': ['vintage', 'noir'],
    '1960s': ['vintage'],
    '1970s': ['vintage'],
    'steampunk': ['steampunk', 'vintage'],
    'clockwork': ['steampunk'],
    'brass': ['steampunk'],
    'gothic': ['gothic'],
    'vampire': ['gothic', 'fantasy'],
    'cemetery': ['gothic'],
    'dark': ['gothic', 'noir'],
    'fantasy': ['fantasy'],
    'magic': ['fantasy'],
    'elf': ['fantasy'],
    'dragon': ['fantasy'],
    'wizard': ['fantasy'],
    'witch': ['fantasy', 'gothic'],
    'forest': ['nature'],
    'mountain': ['nature'],
    'ocean': ['nature'],
    'nature': ['nature'],
    'urban': ['urban'],
    'city': ['urban'],
    'street': ['urban'],
    'noir': ['noir'],
    'detective': ['noir'],
    'mystery': ['noir', 'gothic'],
    'elegant': ['elegant'],
    'glamorous': ['elegant'],
    'fashion': ['elegant', 'modern'],
    'modern': ['modern'],
    'contemporary': ['modern'],
  };

  // Check for each keyword
  Object.entries(keywordThemes).forEach(([keyword, keywordThemeList]) => {
    if (lower.includes(keyword)) {
      keywordThemeList.forEach((theme) => {
        if (!themes.includes(theme)) {
          themes.push(theme);
        }
      });
    }
  });

  return themes;
}

/**
 * Atmosphere preset configurations
 * Defines visual atmosphere settings with AI-optimized keywords
 */

import type { Atmosphere, AtmosphereConfig } from './types';

export const atmosphereConfigs: Record<Atmosphere, AtmosphereConfig> = {
  cinematic: {
    name: 'Cinematic',
    keywords: 'cinematic lighting, dramatic shadows, movie scene',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    description: 'Hollywood-style dramatic lighting',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    keywords: 'cyberpunk aesthetic, rain-soaked streets, holographic displays, futuristic dystopia, tech noir',
    gradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
    description: 'Neon-lit futuristic vibes',
  },
  studio: {
    name: 'Studio',
    keywords: 'studio lighting, professional photography, softbox lighting, clean background, commercial quality',
    gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #bdbdbd 100%)',
    description: 'Clean professional studio setup',
  },
  moody: {
    name: 'Moody',
    keywords: 'moody atmosphere, mysterious, atmospheric fog, brooding tension',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 50%, #0d1117 100%)',
    description: 'Dark and atmospheric mood',
  },
  dreamy: {
    name: 'Dreamy',
    keywords: 'dreamy atmosphere, soft focus, ethereal glow, pastel colors, bokeh, fantasy',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
    description: 'Soft ethereal fantasy look',
  },
  natural: {
    name: 'Natural',
    keywords: 'natural lighting, outdoor photography, ambient light, realistic, documentary style',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 50%, #d4fc79 100%)',
    description: 'Authentic natural lighting',
  },
  vintage: {
    name: 'Vintage',
    keywords: 'vintage aesthetic, retro look, faded colors, film grain, 70s photography, analog feel, nostalgic tone',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #c9a86c 50%, #8b7355 100%)',
    description: 'Retro film aesthetic',
  },
  epic: {
    name: 'Epic',
    keywords: 'epic scale, grand composition, dramatic sky, vast landscape, heroic, monumental, awe-inspiring',
    gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4a69bd 100%)',
    description: 'Grand cinematic scale',
  },
  horror: {
    name: 'Horror',
    keywords: 'horror atmosphere, unsettling, creepy lighting, ominous, dread, sinister mood, foreboding darkness',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1f1f 50%, #4a2c2c 100%)',
    description: 'Dark and unsettling',
  },
  romantic: {
    name: 'Romantic',
    keywords: 'romantic atmosphere, intimate, gentle glow, love, tender mood, dreamy affection',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f093fb 100%)',
    description: 'Warm intimate feeling',
  },
};

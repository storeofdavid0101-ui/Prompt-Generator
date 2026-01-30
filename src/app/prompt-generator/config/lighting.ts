/**
 * Lighting configuration options
 * Categorized lighting styles for cinematic and photographic effects
 */

import type { LightingConfig } from './types';

export const lightingOptions: Record<string, LightingConfig> = {
  // Classic Cinematic
  rembrandt: {
    name: 'Rembrandt',
    keywords: 'Rembrandt lighting, dramatic portrait lighting, single light source, classic portrait',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #8B7355 0%, #2C1810 100%)',
  },
  chiaroscuro: {
    name: 'Chiaroscuro',
    keywords: 'chiaroscuro lighting, extreme contrast, Caravaggio style, Renaissance painting light, bold light and shadow',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
  },
  highkey: {
    name: 'High Key',
    keywords: 'high key lighting, bright and soft, minimal shadows, even illumination, airy, optimistic mood',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #475569 100%)',
  },
  lowkey: {
    name: 'Low Key',
    keywords: 'low key lighting, mostly dark, selective highlights, single key light, underexposed fill, dark exposure',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d2d2d 100%)',
  },

  // Natural / Atmospheric
  goldenhour: {
    name: 'Golden Hour',
    keywords: 'golden hour lighting, warm sunlight, soft orange glow, sunset light, magic hour, long shadows',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e74c3c 50%, #9b59b6 100%)',
  },
  bluehour: {
    name: 'Blue Hour',
    keywords: 'blue hour lighting, cool blue ambient light, twilight, melancholic mood, post-sunset, pre-dawn',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #1a252f 100%)',
  },
  moonlit: {
    name: 'Moonlit Night',
    keywords: 'moonlight, night exterior, deep blue light, high contrast shadows, lunar illumination, nocturnal',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #0c1445 0%, #1a237e 50%, #0d1b2a 100%)',
  },
  practical: {
    name: 'Practical Light',
    keywords: 'practical lighting, motivated light sources, in-scene light sources, diegetic lighting, realistic interior lighting',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #8b6914 50%, #3d2914 100%)',
  },

  // Stylized / Modern
  neon: {
    name: 'Cyberpunk Neon',
    keywords: 'neon lighting, glowing tubes, reflective surfaces, wet streets, electric color spill',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
  },
  godrays: {
    name: 'God Rays',
    keywords: 'volumetric lighting, god rays, light beams through dust, atmospheric haze, epic light shafts, divine light',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ee9ca7 100%)',
  },
  softbox: {
    name: 'Studio Softbox',
    keywords: 'studio lighting, softbox diffused light, fashion photography lighting, clean and even, professional portrait',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #546e7a 0%, #78909c 50%, #37474f 100%)',
  },
  bioluminescent: {
    name: 'Bioluminescent',
    keywords: 'bioluminescent glow, self-illuminating, fantasy lighting, glowing organisms, ethereal inner light',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #7b2cbf 100%)',
  },
};

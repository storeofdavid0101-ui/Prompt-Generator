/**
 * Director style configurations
 * Famous directors with distinctive visual styles and conflict rules
 */

import type { DirectorStyle } from './types';

export const directorStyles: DirectorStyle[] = [
  {
    name: 'Wes Anderson',
    keywords: 'Wes Anderson style, symmetrical composition, pastel color palette, whimsical, centered framing, vintage aesthetic',
    blockedAtmospheres: ['cyberpunk', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
  },
  {
    name: 'Quentin Tarantino',
    keywords: 'Quentin Tarantino style, realistic film still, photorealistic, live action movie, 35mm film, bold colors, low angle shots, trunk shot, 70s grindhouse aesthetic, cinematic lighting, not illustration, not anime',
    blockedAtmospheres: ['dreamy', 'studio'],
    blockedPresets: ['desaturated'],
  },
  {
    name: 'Stanley Kubrick',
    keywords: 'Stanley Kubrick style, one-point perspective, symmetrical framing, cold colors, wide angle, unsettling atmosphere',
    blockedAtmospheres: ['dreamy'],
    blockedPresets: ['vivid'],
  },
  {
    name: 'David Lynch',
    keywords: 'David Lynch style, surrealist, dreamlike, dark atmosphere, uncanny, mysterious lighting, noir',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['vivid', 'raw'],
  },
  {
    name: 'Christopher Nolan',
    keywords: 'Christopher Nolan style, IMAX quality, dark and gritty, complex composition, realistic, grand scale',
    blockedAtmospheres: ['dreamy', 'vintage'],
    blockedPresets: ['desaturated'],
  },
  {
    name: 'Denis Villeneuve',
    keywords: 'Denis Villeneuve style, atmospheric, vast landscapes, slow and deliberate, muted colors, epic scale, minimal',
    blockedAtmospheres: ['cyberpunk', 'vintage'],
    blockedPresets: ['vivid'],
  },
  {
    name: 'Ridley Scott',
    keywords: 'Ridley Scott style, detailed production design, atmospheric lighting, smoke and haze, epic, textured',
    blockedAtmospheres: ['dreamy'],
    blockedPresets: [],
  },
  {
    name: 'Wong Kar-wai',
    keywords: 'Wong Kar-wai style, neon lights, motion blur, saturated colors, romantic melancholy, urban night',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['raw', 'desaturated'],
  },
  {
    name: 'Terrence Malick',
    keywords: 'Terrence Malick style, golden hour, natural light, poetic, nature imagery, magic hour, ethereal',
    blockedAtmospheres: ['cyberpunk', 'studio', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
  },
  {
    name: 'Akira Kurosawa',
    keywords: 'Akira Kurosawa style, dynamic composition, weather elements, rain and wind, samurai epic, dramatic',
    blockedAtmospheres: ['studio', 'cyberpunk'],
    blockedPresets: [],
  },
  {
    name: 'Tim Burton',
    keywords: 'Tim Burton style, gothic, dark whimsy, German expressionist, twisted, striped patterns, pale characters',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['vivid', 'raw'],
  },
  {
    name: 'Guillermo del Toro',
    keywords: 'Guillermo del Toro style, dark fantasy, ornate details, creature design, amber and teal, gothic romance',
    blockedAtmospheres: ['studio', 'natural'],
    blockedPresets: ['raw', 'desaturated'],
  },
  {
    name: 'David Fincher',
    keywords: 'David Fincher style, dark and moody, green-yellow tint, meticulous, shadows, desaturated, noir',
    blockedAtmospheres: ['dreamy', 'natural'],
    blockedPresets: ['vivid', 'raw'],
  },
  {
    name: 'Zack Snyder',
    keywords: 'Zack Snyder style, slow motion, desaturated colors, high contrast, epic action, comic book aesthetic',
    blockedAtmospheres: ['vintage', 'dreamy'],
    blockedPresets: ['raw'],
  },
  {
    name: 'Sofia Coppola',
    keywords: 'Sofia Coppola style, soft pastels, dreamy, melancholic, feminine, natural light, intimate',
    blockedAtmospheres: ['cyberpunk', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
  },
  {
    name: 'Edgar Wright',
    keywords: 'Edgar Wright style, dynamic editing, visual comedy, vibrant colors, whip pans, British humor',
    blockedAtmospheres: ['moody', 'vintage'],
    blockedPresets: ['desaturated', 'bleachbypass'],
  },
  {
    name: 'Hayao Miyazaki',
    keywords: 'Hayao Miyazaki style, Studio Ghibli, hand-drawn animation, nature, flying scenes, whimsical, Japanese',
    blockedAtmospheres: ['cyberpunk', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
  },
  {
    name: 'Coen Brothers',
    keywords: 'Coen Brothers style, quirky characters, dark humor, midwest americana, offbeat, ironic',
    blockedAtmospheres: ['dreamy', 'cyberpunk'],
    blockedPresets: [],
  },
  {
    name: 'Park Chan-wook',
    keywords: 'Park Chan-wook style, revenge aesthetic, stylized violence, bold colors, symmetry, Korean cinema',
    blockedAtmospheres: ['dreamy', 'natural'],
    blockedPresets: ['raw', 'desaturated'],
  },
  {
    name: 'Andrei Tarkovsky',
    keywords: 'Andrei Tarkovsky style, long contemplative shots, water imagery, spiritual, dreamlike, slow cinema',
    blockedAtmospheres: ['cyberpunk', 'studio'],
    blockedPresets: ['vivid', 'highcontrast'],
  },
  {
    name: 'Roger Deakins',
    keywords: 'Roger Deakins cinematography, masterful lighting, natural beauty, precise composition, atmospheric',
    blockedAtmospheres: [],
    blockedPresets: [],
  },
  {
    name: 'Emmanuel Lubezki',
    keywords: 'Emmanuel Lubezki cinematography, natural light, long takes, fluid camera movement, magic hour, immersive',
    blockedAtmospheres: ['studio', 'cyberpunk'],
    blockedPresets: ['highcontrast'],
  },
];

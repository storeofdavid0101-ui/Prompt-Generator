/**
 * Director style configurations
 * Famous directors with distinctive visual styles and conflict rules
 */

import type { DirectorStyle } from './types';

// Common camera groups for blocking
const consumerVideo = ['VHS Camcorder', 'Hi8', 'Handycam', 'Betacam'];
const smartphones = ['iPhone Pro', 'GoPro', 'DJI Drone'];
const antiquePhoto = ['Daguerreotype', 'Tintype', 'Wet Plate', 'Pinhole Camera'];
const disposable = ['Disposable Camera', 'Polaroid SX-70'];

export const directorStyles: DirectorStyle[] = [
  {
    name: 'Wes Anderson',
    description: 'Symmetrical, pastel colors, whimsical vintage feel',
    keywords: 'Wes Anderson style, symmetrical composition, pastel color palette, whimsical, centered framing, vintage aesthetic',
    blockedAtmospheres: ['cyberpunk', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Quentin Tarantino',
    description: 'Bold colors, low angles, 70s grindhouse grit',
    keywords: 'Quentin Tarantino style, realistic film still, photorealistic, live action movie, 35mm film, bold colors, low angle shots, trunk shot, 70s grindhouse aesthetic, cinematic lighting, not illustration, not anime',
    blockedAtmospheres: ['dreamy', 'studio'],
    blockedPresets: ['desaturated'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Stanley Kubrick',
    description: 'One-point perspective, cold, unsettling symmetry',
    keywords: 'Stanley Kubrick style, one-point perspective, symmetrical framing, cold colors, wide angle, unsettling atmosphere',
    blockedAtmospheres: ['dreamy'],
    blockedPresets: ['vivid'],
    blockedCameras: [...consumerVideo, ...smartphones, 'MiniDV'],
  },
  {
    name: 'David Lynch',
    description: 'Surreal, dark, uncanny dreamlike atmosphere',
    keywords: 'David Lynch style, surrealist, dreamlike, dark atmosphere, uncanny, mysterious lighting, noir',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['vivid', 'raw'],
    // Lynch used MiniDV for Inland Empire - don't block it!
    blockedCameras: ['VHS Camcorder', 'Hi8', 'Handycam', 'Betacam', ...smartphones],
  },
  {
    name: 'Christopher Nolan',
    description: 'IMAX scale, dark and gritty, epic realism',
    keywords: 'Christopher Nolan style, IMAX quality, dark and gritty, complex composition, realistic, grand scale',
    blockedAtmospheres: ['dreamy', 'vintage'],
    blockedPresets: ['desaturated'],
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV', 'Super 8', '8mm Film'],
  },
  {
    name: 'Denis Villeneuve',
    description: 'Vast landscapes, muted colors, atmospheric minimal',
    keywords: 'Denis Villeneuve style, atmospheric, vast landscapes, slow and deliberate, muted colors, epic scale, minimal',
    blockedAtmospheres: ['cyberpunk', 'vintage'],
    blockedPresets: ['vivid'],
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Ridley Scott',
    description: 'Epic production, smoke and haze, textured atmosphere',
    keywords: 'Ridley Scott style, detailed production design, atmospheric lighting, smoke and haze, epic, textured',
    blockedAtmospheres: ['dreamy'],
    blockedPresets: [],
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV'],
  },
  {
    name: 'Wong Kar-wai',
    description: 'Neon lights, motion blur, romantic urban nights',
    keywords: 'Wong Kar-wai style, neon lights, motion blur, saturated colors, romantic melancholy, urban night',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['raw', 'desaturated'],
    blockedCameras: [...consumerVideo, ...antiquePhoto, ...smartphones, 'MiniDV'],
  },
  {
    name: 'Terrence Malick',
    description: 'Golden hour, natural light, poetic nature imagery',
    keywords: 'Terrence Malick style, golden hour, natural light, poetic, nature imagery, magic hour, ethereal',
    blockedAtmospheres: ['cyberpunk', 'studio', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Akira Kurosawa',
    description: 'Dynamic weather, dramatic composition, epic samurai',
    keywords: 'Akira Kurosawa style, dynamic composition, weather elements, rain and wind, samurai epic, dramatic',
    blockedAtmospheres: ['studio', 'cyberpunk'],
    blockedPresets: [],
    // Block modern digital and consumer - Kurosawa was film era
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV', 'RED V-Raptor', 'RED Komodo', 'Sony A7S III', 'Sony A1', 'Canon R5', 'Nikon Z9'],
  },
  {
    name: 'Tim Burton',
    description: 'Gothic, dark whimsy, expressionist twisted aesthetic',
    keywords: 'Tim Burton style, gothic, dark whimsy, German expressionist, twisted, striped patterns, pale characters',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['vivid', 'raw'],
    blockedCameras: [...consumerVideo, ...smartphones, 'MiniDV'],
  },
  {
    name: 'David Fincher',
    description: 'Dark, meticulous, green-yellow tint, noir shadows',
    keywords: 'David Fincher style, dark and moody, green-yellow tint, meticulous, shadows, desaturated, noir',
    blockedAtmospheres: ['dreamy', 'natural'],
    blockedPresets: ['vivid', 'raw'],
    // Fincher is known for precise digital (RED cameras)
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, ...antiquePhoto, 'MiniDV', 'Super 8', '8mm Film'],
  },
  {
    name: 'Coen Brothers',
    description: 'Quirky dark humor, midwest americana, offbeat',
    keywords: 'Coen Brothers style, quirky characters, dark humor, midwest americana, offbeat, ironic',
    blockedAtmospheres: ['dreamy', 'cyberpunk'],
    blockedPresets: [],
    blockedCameras: [...consumerVideo, ...smartphones, 'MiniDV'],
  },
  {
    name: 'Park Chan-wook',
    description: 'Bold colors, stylized symmetry, revenge aesthetic',
    keywords: 'Park Chan-wook style, revenge aesthetic, stylized violence, bold colors, symmetry, Korean cinema',
    blockedAtmospheres: ['dreamy', 'natural'],
    blockedPresets: ['raw', 'desaturated'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Andrei Tarkovsky',
    description: 'Contemplative, water imagery, spiritual slow cinema',
    keywords: 'Andrei Tarkovsky style, long contemplative shots, water imagery, spiritual, dreamlike, slow cinema',
    blockedAtmospheres: ['cyberpunk', 'studio'],
    blockedPresets: ['vivid', 'highcontrast'],
    // Tarkovsky was Soviet-era film - block modern and consumer
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV', 'RED V-Raptor', 'RED Komodo', 'ARRI Alexa 65', 'Sony A7S III', 'Sony A1', 'Canon R5', 'Nikon Z9'],
  },
];

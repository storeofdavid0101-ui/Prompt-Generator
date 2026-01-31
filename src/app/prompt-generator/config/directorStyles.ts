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
    anonymousKeywords: 'symmetrical composition, pastel color palette, whimsical atmosphere, perfectly centered framing, vintage aesthetic, dollhouse-like staging, quirky mise-en-scène',
    safeKeywords: 'symmetrical composition, soft pastel color palette, whimsical storybook atmosphere, perfectly centered framing, vintage aesthetic, meticulous staging, quirky charming mise-en-scène',
    blockedAtmospheres: ['cyberpunk', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Quentin Tarantino',
    description: 'Bold colors, low angles, 70s grindhouse grit',
    keywords: 'Quentin Tarantino style, realistic film still, photorealistic, live action movie, 35mm film, bold colors, low angle shots, trunk shot, 70s grindhouse aesthetic, cinematic lighting, not illustration, not anime',
    anonymousKeywords: 'realistic film still, photorealistic, live action movie, 35mm film grain, bold saturated colors, dramatic low angle shots, trunk shot perspective, 70s grindhouse aesthetic, cinematic lighting, high contrast, not illustration, not anime',
    safeKeywords: 'realistic film still, photorealistic, live action movie, 35mm film grain, bold saturated colors, dramatic low angle shots, unique camera perspectives, 70s retro cinema aesthetic, cinematic lighting, high contrast, not illustration, not anime',
    blockedAtmospheres: ['dreamy', 'studio'],
    blockedPresets: ['desaturated'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Stanley Kubrick',
    description: 'One-point perspective, cold, unsettling symmetry',
    keywords: 'Stanley Kubrick style, one-point perspective, symmetrical framing, cold colors, wide angle, unsettling atmosphere',
    anonymousKeywords: 'one-point perspective, mathematically symmetrical framing, cold color temperature, wide angle distortion, unsettling atmosphere, obsessive geometric precision, clinical composition',
    safeKeywords: 'one-point perspective, mathematically symmetrical framing, cold color temperature, wide angle lens distortion, intense atmosphere, obsessive geometric precision, clinical composition',
    blockedAtmospheres: ['dreamy'],
    blockedPresets: ['vivid'],
    blockedCameras: [...consumerVideo, ...smartphones, 'MiniDV'],
  },
  {
    name: 'David Lynch',
    description: 'Surreal, dark, uncanny dreamlike atmosphere',
    keywords: 'David Lynch style, surrealist, dreamlike, dark atmosphere, uncanny, mysterious lighting, noir',
    anonymousKeywords: 'surrealist imagery, dreamlike quality, dark unsettling atmosphere, uncanny valley feeling, mysterious chiaroscuro lighting, film noir shadows, psychological horror undertones',
    safeKeywords: 'surrealist imagery, dreamlike quality, mysterious atmosphere, enigmatic mood, dramatic chiaroscuro lighting, film noir shadows, psychological depth, otherworldly feeling',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['vivid', 'raw'],
    // Lynch used MiniDV for Inland Empire - don't block it!
    blockedCameras: ['VHS Camcorder', 'Hi8', 'Handycam', 'Betacam', ...smartphones],
  },
  {
    name: 'Christopher Nolan',
    description: 'IMAX scale, dark and gritty, epic realism',
    keywords: 'Christopher Nolan style, IMAX quality, dark and gritty, complex composition, realistic, grand scale',
    anonymousKeywords: 'IMAX large format quality, dark and gritty realism, complex layered composition, photorealistic detail, grand epic scale, practical effects aesthetic, architectural framing',
    safeKeywords: 'IMAX large format quality, dramatic realism, complex layered composition, photorealistic detail, grand epic scale, practical effects aesthetic, architectural framing',
    blockedAtmospheres: ['dreamy', 'vintage'],
    blockedPresets: ['desaturated'],
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV', 'Super 8', '8mm Film'],
  },
  {
    name: 'Denis Villeneuve',
    description: 'Vast landscapes, muted colors, atmospheric minimal',
    keywords: 'Denis Villeneuve style, atmospheric, vast landscapes, slow and deliberate, muted colors, epic scale, minimal',
    anonymousKeywords: 'atmospheric environmental storytelling, vast desolate landscapes, slow deliberate pacing, muted earth tones, epic cinematic scale, minimalist composition, contemplative silence',
    safeKeywords: 'atmospheric environmental storytelling, vast expansive landscapes, deliberate pacing, muted earth tones, epic cinematic scale, minimalist composition, contemplative mood',
    blockedAtmospheres: ['cyberpunk', 'vintage'],
    blockedPresets: ['vivid'],
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Ridley Scott',
    description: 'Epic production, smoke and haze, textured atmosphere',
    keywords: 'Ridley Scott style, detailed production design, atmospheric lighting, smoke and haze, epic, textured',
    anonymousKeywords: 'detailed epic production design, atmospheric volumetric lighting, smoke and haze atmosphere, textured gritty surfaces, grand historical scale, practical weathering effects',
    safeKeywords: 'detailed epic production design, atmospheric volumetric lighting, smoke and haze atmosphere, textured surfaces, grand cinematic scale, practical weathering effects',
    blockedAtmospheres: ['dreamy'],
    blockedPresets: [],
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV'],
  },
  {
    name: 'Wong Kar-wai',
    description: 'Neon lights, motion blur, romantic urban nights',
    keywords: 'Wong Kar-wai style, neon lights, motion blur, saturated colors, romantic melancholy, urban night',
    anonymousKeywords: 'neon-soaked urban nights, expressive motion blur, hyper-saturated colors, romantic melancholy mood, rain-slicked streets, step-printed slow motion, yearning atmosphere',
    // CRITICAL: Completely rewritten to avoid fingerprinted phrase combinations
    safeKeywords: 'vibrant neon lighting, artistic motion blur, richly saturated colors, poetic romantic mood, wet urban streets at night, dreamy slow motion effect, wistful emotional atmosphere',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['raw', 'desaturated'],
    blockedCameras: [...consumerVideo, ...antiquePhoto, ...smartphones, 'MiniDV'],
  },
  {
    name: 'Terrence Malick',
    description: 'Golden hour, natural light, poetic nature imagery',
    keywords: 'Terrence Malick style, golden hour, natural light, poetic, nature imagery, magic hour, ethereal',
    anonymousKeywords: 'golden hour natural light, magic hour cinematography, poetic visual storytelling, sweeping nature imagery, ethereal atmosphere, handheld intimacy, transcendent beauty',
    safeKeywords: 'golden hour natural light, magic hour cinematography, poetic visual storytelling, sweeping nature imagery, ethereal atmosphere, intimate handheld camera, transcendent beauty',
    blockedAtmospheres: ['cyberpunk', 'studio', 'moody'],
    blockedPresets: ['highcontrast', 'bleachbypass'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Akira Kurosawa',
    description: 'Dynamic weather, dramatic composition, epic samurai',
    keywords: 'Akira Kurosawa style, dynamic composition, weather elements, rain and wind, samurai epic, dramatic',
    anonymousKeywords: 'dynamic dramatic composition, expressive weather elements, driving rain and wind, epic samurai cinema, bold movement, telephoto lens compression, wipe transitions implied',
    safeKeywords: 'dynamic dramatic composition, expressive weather elements, driving rain and wind, epic historical drama, bold movement, telephoto lens compression, sweeping visual transitions',
    blockedAtmospheres: ['studio', 'cyberpunk'],
    blockedPresets: [],
    // Block modern digital and consumer - Kurosawa was film era
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV', 'RED V-Raptor', 'RED Komodo', 'Sony A7S III', 'Sony A1', 'Canon R5', 'Nikon Z9'],
  },
  {
    name: 'Tim Burton',
    description: 'Gothic, dark whimsy, expressionist twisted aesthetic',
    keywords: 'Tim Burton style, gothic, dark whimsy, German expressionist, twisted, striped patterns, pale characters',
    anonymousKeywords: 'gothic dark fantasy, whimsical macabre aesthetic, German expressionist angles, twisted spiral motifs, striped patterns, pale gaunt characters, Halloween atmosphere',
    safeKeywords: 'gothic fantasy aesthetic, whimsical dark fairy tale, German expressionist angles, spiral motifs, striped patterns, pale stylized characters, fantastical atmosphere',
    blockedAtmospheres: ['natural', 'studio'],
    blockedPresets: ['vivid', 'raw'],
    blockedCameras: [...consumerVideo, ...smartphones, 'MiniDV'],
  },
  {
    name: 'David Fincher',
    description: 'Dark, meticulous, precise framing, noir shadows',
    keywords: 'David Fincher style, dark and moody, meticulous framing, shadows, desaturated, noir, precise composition',
    anonymousKeywords: 'dark moody atmosphere, meticulous precise framing, deep noir shadows, desaturated color grade, clinical precision, obsessive detail, oppressive tension',
    safeKeywords: 'dark moody atmosphere, meticulous precise framing, deep shadows, desaturated color grade, clinical precision, obsessive detail, dramatic tension',
    blockedAtmospheres: ['dreamy', 'natural'],
    blockedPresets: ['vivid', 'raw'],
    // Fincher is known for precise digital (RED cameras)
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, ...antiquePhoto, 'MiniDV', 'Super 8', '8mm Film'],
  },
  {
    name: 'Coen Brothers',
    description: 'Quirky dark humor, midwest americana, offbeat',
    keywords: 'Coen Brothers style, quirky characters, dark humor, midwest americana, offbeat, ironic',
    anonymousKeywords: 'quirky eccentric characters, dark ironic humor, midwest americana setting, offbeat situations, deadpan atmosphere, absurdist undertones, regional authenticity',
    safeKeywords: 'quirky eccentric characters, ironic humor, midwest americana setting, offbeat situations, deadpan atmosphere, absurdist undertones, regional authenticity',
    blockedAtmospheres: ['dreamy', 'cyberpunk'],
    blockedPresets: [],
    blockedCameras: [...consumerVideo, ...smartphones, 'MiniDV'],
  },
  {
    name: 'Park Chan-wook',
    description: 'Bold colors, stylized symmetry, revenge aesthetic',
    keywords: 'Park Chan-wook style, revenge aesthetic, stylized violence, bold colors, symmetry, Korean cinema',
    anonymousKeywords: 'revenge thriller aesthetic, stylized elegant violence, bold saturated colors, baroque symmetry, Korean new wave cinema, operatic drama, visual excess',
    // CRITICAL: Remove violence and revenge references
    safeKeywords: 'dramatic thriller aesthetic, stylized elegant cinematography, bold saturated colors, baroque symmetry, Korean new wave cinema, operatic drama, visual richness',
    blockedAtmospheres: ['dreamy', 'natural'],
    blockedPresets: ['raw', 'desaturated'],
    blockedCameras: [...consumerVideo, ...smartphones, ...antiquePhoto, 'MiniDV'],
  },
  {
    name: 'Andrei Tarkovsky',
    description: 'Contemplative, water imagery, spiritual atmosphere',
    keywords: 'Andrei Tarkovsky style, contemplative composition, water imagery, spiritual, dreamlike, poetic imagery',
    anonymousKeywords: 'contemplative long takes, water and reflection imagery, spiritual transcendent atmosphere, dreamlike slow pacing, poetic visual metaphors, Soviet art cinema aesthetic',
    safeKeywords: 'contemplative long takes, water and reflection imagery, transcendent atmosphere, dreamlike slow pacing, poetic visual metaphors, artistic cinema aesthetic',
    blockedAtmospheres: ['cyberpunk', 'studio'],
    blockedPresets: ['vivid', 'highcontrast'],
    // Tarkovsky was Soviet-era film - block modern and consumer
    blockedCameras: [...consumerVideo, ...smartphones, ...disposable, 'MiniDV', 'RED V-Raptor', 'RED Komodo', 'ARRI Alexa 65', 'Sony A7S III', 'Sony A1', 'Canon R5', 'Nikon Z9'],
  },
];

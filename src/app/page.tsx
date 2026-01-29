"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, MapPin, User, Sparkles, Plus, X, Sun, Moon,
  Copy, Check, ChevronDown, Settings, Image as ImageIcon,
  Lock, Unlock, RotateCcw, Zap, Layers, Eye, Save, Bookmark, AlertTriangle, Palette
} from 'lucide-react';

// Types
type AIModel = 'midjourney' | 'flux' | 'stable-diffusion' | 'dalle3' | 'chatgpt';
type Atmosphere = 'cinematic' | 'cyberpunk' | 'studio' | 'moody' | 'dreamy' | 'natural' | 'vintage';
type CameraCategory = 'vintage-lofi' | 'antique' | 'classic-film' | 'epic-film' | 'medium-format-classic' | '35mm-classic' | 'modern-cinema' | 'modern-digital' | 'consumer-mobile' | 'none';

interface ModelConfig {
  name: string;
  icon: string;
  maxCreativity: number;
  creativityParam: string;
  variationParam: string;
  negativeParam: string;
  aspectParam: string;
}

interface AtmosphereConfig {
  name: string;
  keywords: string;
  gradient: string;
  description: string;
}

interface PresetConfig {
  name: string;
  keywords: string;
  gradient: string;
}

// Camera category definitions - for conflict detection
const cameraCategories: Record<string, CameraCategory> = {
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
  // Classic Film (traditional cinema)
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
  'IMAX Camera': 'epic-film',
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

// Conflict rules
interface ConflictRules {
  blockedAtmospheres: Atmosphere[];
  blockedPresets: string[];
  blockedDOF: string[];
  fixedLens?: string; // If set, this camera has a fixed lens - show this instead of dropdown
  warningMessage?: string;
}

const categoryConflicts: Record<CameraCategory, ConflictRules> = {
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

// Per-camera fixed lens overrides (truly fixed, no zoom)
const cameraFixedLens: Record<string, string> = {
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

// Cameras with built-in zoom lenses (user can choose focal length within range)
const cameraZoomRange: Record<string, { range: string; options: string[] }> = {
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

// Reverse conflicts: when atmosphere/preset is selected, which cameras are blocked
const atmosphereBlocksCategories: Partial<Record<Atmosphere, CameraCategory[]>> = {
  'studio': ['vintage-lofi', 'antique'],
  'cyberpunk': ['antique'],
};

const presetBlocksCategories: Record<string, CameraCategory[]> = {
  'vivid': ['vintage-lofi', 'antique'],
  'highcontrast': ['vintage-lofi', 'antique'],
};

// Atmosphere Configurations
const atmosphereConfigs: Record<Atmosphere, AtmosphereConfig> = {
  'cinematic': {
    name: 'Cinematic',
    keywords: 'cinematic lighting, dramatic shadows, high contrast, film grain, anamorphic lens flare, movie scene',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    description: 'Hollywood-style dramatic lighting',
  },
  'cyberpunk': {
    name: 'Cyberpunk',
    keywords: 'neon lights, cyberpunk aesthetic, rain-soaked streets, holographic displays, pink and blue neon, futuristic',
    gradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
    description: 'Neon-lit futuristic vibes',
  },
  'studio': {
    name: 'Studio',
    keywords: 'studio lighting, professional photography, softbox lighting, clean background, commercial quality',
    gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #bdbdbd 100%)',
    description: 'Clean professional studio setup',
  },
  'moody': {
    name: 'Moody',
    keywords: 'moody atmosphere, low key lighting, deep shadows, mysterious, atmospheric fog, chiaroscuro',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 50%, #0d1117 100%)',
    description: 'Dark and atmospheric mood',
  },
  'dreamy': {
    name: 'Dreamy',
    keywords: 'dreamy atmosphere, soft focus, ethereal glow, pastel colors, bokeh, gaussian blur, fantasy',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
    description: 'Soft ethereal fantasy look',
  },
  'natural': {
    name: 'Natural',
    keywords: 'natural lighting, outdoor photography, ambient light, realistic, documentary style',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 50%, #d4fc79 100%)',
    description: 'Authentic natural lighting',
  },
  'vintage': {
    name: 'Vintage',
    keywords: 'vintage film look, retro aesthetic, film grain, faded colors, 70s photography, analog feel',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #c9a86c 50%, #8b7355 100%)',
    description: 'Retro film aesthetic',
  },
};

// Visual Presets (Photography/Cinema focused)
const visualPresets: Record<string, PresetConfig> = {
  'raw': {
    name: 'RAW/Natural',
    keywords: 'natural photograph, unedited, authentic, true to life colors',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
  },
  'highcontrast': {
    name: 'High Contrast',
    keywords: 'high contrast photography, deep blacks, bright highlights, punchy colors',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  },
  'desaturated': {
    name: 'Desaturated',
    keywords: 'desaturated colors, muted tones, subtle palette, understated',
    gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
  },
  'vivid': {
    name: 'Vivid',
    keywords: 'vivid colors, saturated, vibrant, color-graded, punchy',
    gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  },
  'filmlook': {
    name: 'Film Look',
    keywords: 'film color grade, lifted blacks, crushed highlights, cinematic color',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #8b7355 100%)',
  },
  'bleachbypass': {
    name: 'Bleach Bypass',
    keywords: 'bleach bypass look, desaturated, high contrast, silver retention, gritty',
    gradient: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
  },
};

// Lighting Options
const lightingOptions: Record<string, { name: string; keywords: string; category: string; gradient: string }> = {
  // Classic Cinematic
  'rembrandt': {
    name: 'Rembrandt',
    keywords: 'Rembrandt lighting, dramatic portrait lighting, triangle light on cheek, single light source, classic portrait',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #8B7355 0%, #2C1810 100%)',
  },
  'chiaroscuro': {
    name: 'Chiaroscuro',
    keywords: 'chiaroscuro lighting, extreme contrast, deep shadows, dramatic light and dark, Caravaggio style, film noir lighting',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
  },
  'highkey': {
    name: 'High Key',
    keywords: 'high key lighting, bright and soft, minimal shadows, clean white background, airy, optimistic mood',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #475569 100%)',
  },
  'lowkey': {
    name: 'Low Key',
    keywords: 'low key lighting, mostly dark, selective highlights, moody shadows, noir atmosphere, dramatic tension',
    category: 'classic',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d2d2d 100%)',
  },
  // Natural / Atmospheric
  'goldenhour': {
    name: 'Golden Hour',
    keywords: 'golden hour lighting, warm sunlight, soft orange glow, sunset light, magic hour, long shadows',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e74c3c 50%, #9b59b6 100%)',
  },
  'bluehour': {
    name: 'Blue Hour',
    keywords: 'blue hour lighting, cool blue ambient light, twilight, melancholic mood, post-sunset, pre-dawn',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #1a252f 100%)',
  },
  'moonlit': {
    name: 'Moonlit Night',
    keywords: 'moonlight, night exterior, deep blue light, high contrast shadows, lunar illumination, nocturnal',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #0c1445 0%, #1a237e 50%, #0d1b2a 100%)',
  },
  'practical': {
    name: 'Practical Light',
    keywords: 'practical lighting, motivated light sources, table lamp glow, candlelight, TV screen light, realistic interior lighting',
    category: 'natural',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #8b6914 50%, #3d2914 100%)',
  },
  // Stylized / Modern
  'neon': {
    name: 'Cyberpunk Neon',
    keywords: 'neon lighting, cyberpunk colors, pink and blue neon, reflective surfaces, wet streets, futuristic glow',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
  },
  'godrays': {
    name: 'God Rays',
    keywords: 'volumetric lighting, god rays, light beams through dust, atmospheric haze, epic light shafts, divine light',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ee9ca7 100%)',
  },
  'softbox': {
    name: 'Studio Softbox',
    keywords: 'studio lighting, softbox diffused light, fashion photography lighting, clean and even, professional portrait',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #546e7a 0%, #78909c 50%, #37474f 100%)',
  },
  'bioluminescent': {
    name: 'Bioluminescent',
    keywords: 'bioluminescent glow, self-illuminating, avatar style, fantasy lighting, glowing organisms, ethereal inner light',
    category: 'stylized',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #7b2cbf 100%)',
  },
};

// Color Palette Options with actual hex values
const colorPalettes: Record<string, { name: string; colors: string[] }> = {
  'teal-orange': {
    name: 'Teal & Orange',
    colors: ['#1A535C', '#4ECDC4', '#FF6B6B', '#FFE66D', '#2E4057', '#F4A261'],
  },
  'noir': {
    name: 'Noir / B&W',
    colors: ['#0D0D0D', '#2C2C2C', '#4A4A4A', '#FFFFFF', '#1A1A2E', '#B8B8B8'],
  },
  'neon-cyberpunk': {
    name: 'Neon Cyberpunk',
    colors: ['#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#06D6A0', '#7B2CBF'],
  },
  'warm-sunset': {
    name: 'Warm Sunset',
    colors: ['#F39C12', '#E74C3C', '#D35400', '#C0392B', '#F5B041', '#EB984E'],
  },
  'cool-ocean': {
    name: 'Cool Ocean',
    colors: ['#1ABC9C', '#3498DB', '#2980B9', '#16A085', '#5DADE2', '#48C9B0'],
  },
  'pastel-dream': {
    name: 'Pastel Dream',
    colors: ['#FFB5E8', '#B28DFF', '#AFF8DB', '#BFFCC6', '#FFC9DE', '#C4FAF8'],
  },
  'earthy-natural': {
    name: 'Earthy Natural',
    colors: ['#8B7355', '#556B2F', '#A0522D', '#6B8E23', '#DEB887', '#D2691E'],
  },
  'vintage-sepia': {
    name: 'Vintage Sepia',
    colors: ['#D4A574', '#C9A86C', '#8B7355', '#704214', '#A67B5B', '#E3C4A8'],
  },
  'forest-moss': {
    name: 'Forest Moss',
    colors: ['#2D5A27', '#4A7C23', '#8FBC8F', '#556B2F', '#6B8E23', '#228B22'],
  },
};

// Lens Options
const lensOptions = [
  'Macro', 'Fish Eye', '14mm', '24mm', '35mm', '50mm', '85mm', '135mm', '200mm', '400mm', '600mm'
];

// Shot Type Options with AI-friendly keywords
const shotOptions = [
  { label: 'Extreme Wide Shot (XWS)', keywords: 'extreme wide shot, establishing shot, vast landscape, tiny subject' },
  { label: 'Wide Shot (WS)', keywords: 'wide shot, full environment visible, subject in context' },
  { label: 'Full Shot', keywords: 'full shot, entire body visible, head to toe framing' },
  { label: 'Medium Wide Shot', keywords: 'medium wide shot, cowboy shot, knees up framing' },
  { label: 'Medium Shot (MS)', keywords: 'medium shot, waist up framing, conversational distance' },
  { label: 'Medium Close-Up (MCU)', keywords: 'medium close-up, chest up framing, emotional connection' },
  { label: 'Close-Up (CU)', keywords: 'close-up shot, face filling frame, intimate portrait' },
  { label: 'Extreme Close-Up (ECU)', keywords: 'extreme close-up, macro detail, eyes or single feature' },
  { label: 'Low Angle', keywords: 'low angle shot, camera looking up, heroic perspective, powerful' },
  { label: 'High Angle', keywords: 'high angle shot, camera looking down, vulnerable perspective' },
  { label: 'Dutch Angle', keywords: 'dutch angle, tilted camera, canted frame, disorienting' },
  { label: "Bird's Eye View", keywords: "bird's eye view, top-down shot, overhead perspective, aerial view" },
  { label: 'POV', keywords: 'POV shot, point of view, first person perspective, subjective camera' },
  { label: 'Over the Shoulder (OTS)', keywords: 'over the shoulder shot, OTS, back of head visible, looking at subject, two-shot composition' },
  { label: 'Two Shot', keywords: 'two shot, two people in frame, side by side composition' },
  { label: 'Insert Shot', keywords: 'insert shot, detail shot, object close-up, cutaway' },
];

// Camera Type Options with appropriate keywords (ordered by popularity)
const cameraOptions = [
  // Popular Consumer & Everyday
  { label: 'iPhone Pro', keywords: 'shot on iPhone, smartphone photography, computational photography' },
  { label: 'GoPro', keywords: 'GoPro footage, wide angle, action camera, immersive POV' },
  { label: 'DJI Drone', keywords: 'drone footage, aerial photography, birds eye view' },
  // Modern DSLRs & Mirrorless (popular brands)
  { label: 'Sony A7S III', keywords: 'shot on Sony A7S III, low light specialist, video hybrid' },
  { label: 'Sony A1', keywords: 'shot on Sony A1, 50 megapixel, flagship mirrorless' },
  { label: 'Canon R5', keywords: 'shot on Canon R5, mirrorless, high resolution, modern' },
  { label: 'Canon 5D Mark IV', keywords: 'shot on Canon 5D, full frame DSLR, professional photography' },
  { label: 'Nikon Z9', keywords: 'shot on Nikon Z9, flagship mirrorless, professional' },
  { label: 'Nikon D850', keywords: 'shot on Nikon D850, high resolution DSLR, sharp detail' },
  // Modern Cinema (industry standard)
  { label: 'ARRI Alexa', keywords: 'shot on ARRI Alexa, digital cinema, rich colors, cinematic' },
  { label: 'ARRI Alexa Mini', keywords: 'shot on ARRI Alexa Mini, modern cinema, pristine quality' },
  { label: 'ARRI Alexa 65', keywords: 'shot on ARRI Alexa 65, large format digital, incredible detail' },
  { label: 'RED V-Raptor', keywords: 'shot on RED V-Raptor, 8K cinema, ultra high resolution' },
  { label: 'RED Komodo', keywords: 'shot on RED Komodo, 6K digital cinema, sharp, modern' },
  { label: 'Sony Venice', keywords: 'shot on Sony Venice, full frame cinema, beautiful color science' },
  { label: 'Sony FX9', keywords: 'shot on Sony FX9, documentary cinema, natural colors' },
  { label: 'Blackmagic URSA', keywords: 'shot on Blackmagic URSA, digital film, rich dynamic range' },
  { label: 'Canon C500', keywords: 'shot on Canon C500, cinema EOS, clean digital' },
  { label: 'Canon C70', keywords: 'shot on Canon C70, compact cinema camera, versatile' },
  // Classic Film Formats (iconic)
  { label: '35mm Film', keywords: 'shot on 35mm film, classic cinema look, rich colors, natural grain' },
  { label: '70mm IMAX', keywords: 'shot on 70mm IMAX, massive resolution, stunning clarity, epic cinematography' },
  { label: 'IMAX Camera', keywords: 'shot on IMAX camera, massive resolution, immersive, theatrical' },
  { label: '65mm Film', keywords: 'shot on 65mm film, epic scale, incredible detail, IMAX quality' },
  // Premium Photography (luxury brands)
  { label: 'Hasselblad X2D', keywords: 'shot on Hasselblad X2D, 100 megapixel, incredible detail' },
  { label: 'Hasselblad 500C', keywords: 'shot on Hasselblad 500C, medium format film, square format, classic' },
  { label: 'Leica M11', keywords: 'shot on Leica M11, full frame digital, Leica color science' },
  { label: 'Leica M6', keywords: 'shot on Leica M6, 35mm rangefinder, street photography aesthetic' },
  { label: 'Phase One XF', keywords: 'shot on Phase One, medium format digital, studio quality' },
  // Classic Cinema Cameras
  { label: 'Panavision Panaflex', keywords: 'shot on Panavision, anamorphic, cinematic, blockbuster quality' },
  { label: 'Panavision DXL2', keywords: 'shot on Panavision DXL2, large format digital, Hollywood quality' },
  { label: 'Arriflex 35', keywords: 'shot on Arriflex 35mm, classic Hollywood cinematography' },
  { label: 'Arriflex 16SR', keywords: 'shot on Arriflex 16SR, documentary style, naturalistic' },
  { label: 'Mitchell BNC', keywords: 'shot on Mitchell BNC, golden age Hollywood, classic cinema' },
  { label: 'Bolex H16', keywords: 'shot on Bolex H16, 16mm film, experimental cinema, art film aesthetic' },
  // Vintage Film Formats
  { label: '16mm Film', keywords: 'shot on 16mm film, organic film grain, indie cinema look, documentary filmmaking aesthetic, newsreel quality, visible grain structure, natural color rendition, art house cinema, reversal film texture, handheld camera feel' },
  { label: 'Super 16', keywords: 'shot on Super 16mm, wider aspect ratio than standard 16mm, cinematic film grain, 1990s-2000s indie film aesthetic, documentary style, organic texture, blown out to 35mm look, naturalistic lighting, Dogme 95 style' },
  { label: 'Super 8', keywords: 'shot on Super 8, visible film grain, nostalgic 1970s aesthetic, Kodachrome or Ektachrome colors, mechanical shutter flicker, dust particles, light leaks, soft focus vignette, home movie warmth, film texture, slightly overexposed highlights' },
  { label: '8mm Film', keywords: 'shot on 8mm film, heavy film grain, vintage home movie, warm Kodachrome tones, light leaks, projector flicker, dust and scratches, narrow gauge film, 1950s-60s aesthetic, faded colors, sprocket artifacts, amateur film look' },
  // Vintage Video
  { label: 'VHS Camcorder', keywords: 'VHS aesthetic, analog video, scan lines, tracking artifacts, color bleeding, horizontal noise bars, oversaturated reds, interlaced 480i, chromatic aberration, tape degradation, magnetic tape distortion, 1980s home video, CRT television look' },
  { label: 'MiniDV', keywords: 'MiniDV footage, early digital video, 2000s indie film look, low resolution 480i, soft blurry image, not sharp, standard definition video still, DV compression artifacts, interlaced video, tape dropout glitches, Y2K era aesthetic, muted washed out colors, color smearing on edges, blocky pixelated compression, crushed blacks, blown highlights, green color cast, unnatural skin tones, low quality video capture, fuzzy details, video frame grab' },
  { label: 'Hi8', keywords: 'Hi8 video, consumer analog video, 1990s camcorder aesthetic, warmer colors than VHS, slightly sharper than VHS, pastel color shift, soft highlights, family vacation footage, S-video quality, late analog era, RGB color fringing on edges, chroma bleed, soft blurry low resolution, interlaced video artifacts' },
  { label: 'Handycam', keywords: 'Sony Handycam, consumer camcorder, home video aesthetic, low resolution video, soft blurry image, not sharp, auto-exposure fluctuations, handheld camera shake, amateur video quality, auto white balance color shifts, auto focus hunting, washed out colors, video noise in shadows, interlaced artifacts, blown out highlights, consumer video look, 1990s home movie, low quality video still, fuzzy details, Video8 format, RGB misregistration, color channel separation on edges' },
  { label: 'Betacam', keywords: 'Betacam SP video frame grab, standard definition 480i, extremely soft and blurry image, very low resolution fuzzy details, blue cyan color cast tint, blown out white washed sky, hazy lifted milky blacks, flat low contrast image, faded washed out desaturated colors, RGB misregistration, red green blue channel separation on edges, chroma misalignment color fringing, old degraded TV news broadcast footage, 1980s-90s VHS-era video capture, analog tape generation loss, interlace scan lines, looks like old television recording, definitely not sharp, not cinematic, not HD, not 4K, ugly low quality video still' },
  // Niche & Vintage Photography
  { label: 'Polaroid SX-70', keywords: 'Polaroid instant photo, vintage instant film, soft dreamy colors, white border frame, Polaroid color shift, slightly washed out, creamy highlights, soft vignette, 1970s instant photography, square format, imperfect development, warm color cast' },
  { label: 'Contax T2', keywords: 'shot on Contax T2, 35mm compact, Zeiss lens, 1990s aesthetic' },
  { label: 'Rolleiflex', keywords: 'shot on Rolleiflex TLR, vintage medium format, classic portrait look' },
  { label: 'Mamiya RZ67', keywords: 'shot on Mamiya RZ67, medium format, portrait photography, creamy bokeh' },
  { label: 'Disposable Camera', keywords: 'disposable camera aesthetic, harsh direct flash, washed out colors, soft focus, light leaks, film grain, vignette, 90s snapshot, amateur photography, red-eye flash, low contrast, candid moment' },
  // Antique & Experimental
  { label: 'Pinhole Camera', keywords: 'pinhole camera photograph, infinite depth of field, very soft ethereal image, heavy vignetting, long exposure motion blur, primitive photography aesthetic, light diffraction, dreamlike quality, experimental photography, no lens distortion, extreme wide angle' },
  { label: 'Daguerreotype', keywords: 'daguerreotype photograph, 1840s-1850s photography, mirror-like silver plate surface, highly reflective, extreme detail in midtones, sepia and silver tones, formal posed portrait, long exposure stillness, antique brass frame, hand-tinted accents, reversed laterally, earliest photography aesthetic' },
  { label: 'Tintype', keywords: 'tintype photograph, Civil War era 1860s-1870s aesthetic, dark iron plate, direct positive image, slightly underexposed, matte surface texture, silver nitrate emulsion, hand-held carte de visite, scratched and aged patina, sepia brown tones, ferrotype look' },
  { label: 'Wet Plate', keywords: 'wet plate collodion photograph, Victorian era 1850s-1880s, hand-poured emulsion imperfections, milky whites, blue-sensitive only, swirly bokeh from period lenses, glass plate negative, chemical drip marks on edges, ultra-sharp central focus, creamy smooth tonal gradations, archival antique look' },
];

// Depth of Field Options
const dofOptions = [
  { value: 'shallow', label: 'Shallow (Bokeh)', keywords: 'shallow depth of field, beautiful bokeh, blurred background, f/1.4' },
  { value: 'normal', label: 'Normal', keywords: '' },
  { value: 'deep', label: 'Deep (All in Focus)', keywords: 'deep depth of field, everything in focus, f/11, sharp throughout' },
  { value: 'tilt-shift', label: 'Tilt-Shift', keywords: 'tilt-shift photography, miniature effect, selective focus' },
];

// Aspect Ratio Options
const aspectRatioOptions = [
  { value: 'none', label: 'Default', ratio: '' },
  { value: '1:1', label: '1:1 Square', ratio: '1:1' },
  { value: '4:3', label: '4:3 Standard', ratio: '4:3' },
  { value: '3:2', label: '3:2 Classic', ratio: '3:2' },
  { value: '16:9', label: '16:9 Widescreen', ratio: '16:9' },
  { value: '21:9', label: '21:9 Cinematic', ratio: '21:9' },
  { value: '9:16', label: '9:16 Vertical', ratio: '9:16' },
  { value: '2:3', label: '2:3 Portrait', ratio: '2:3' },
  { value: '4:5', label: '4:5 Instagram', ratio: '4:5' },
];

// Camera-specific allowed aspect ratios
const cameraAspectRatios: Record<string, string[]> = {
  // Vintage Video - mostly 4:3, some later models 16:9
  'VHS Camcorder': ['4:3'],
  'Betacam': ['4:3', '16:9'],
  'Hi8': ['4:3'],
  'MiniDV': ['4:3', '16:9'],
  'Handycam': ['4:3', '16:9'],
  // Film formats
  '8mm Film': ['4:3', '1.33:1'],
  'Super 8': ['4:3'],
  '16mm Film': ['4:3', '1.66:1'],
  'Super 16': ['16:9', '1.66:1'],
  '35mm Film': ['4:3', '16:9', '21:9', '2.39:1'],
  '65mm Film': ['21:9', '2.2:1'],
  '70mm IMAX': ['1.43:1', '16:9'],
  'IMAX Camera': ['1.43:1', '16:9'],
  // Polaroid - square
  'Polaroid SX-70': ['1:1'],
  // Medium format - typically square or 4:5
  'Hasselblad 500C': ['1:1'],
  'Rolleiflex': ['1:1'],
  'Mamiya RZ67': ['4:5', '1:1'],
  // Antique - portrait orientation typically
  'Daguerreotype': ['4:5', '3:4', '1:1'],
  'Tintype': ['4:5', '3:4', '1:1'],
  'Wet Plate': ['4:5', '3:4', '1:1'],
};

// Director Styles - Famous directors with distinctive visual styles
const directorStyles: Array<{
  name: string;
  keywords: string;
  blockedAtmospheres: Atmosphere[];
  blockedPresets: string[];
}> = [
  { name: 'Wes Anderson', keywords: 'Wes Anderson style, symmetrical composition, pastel color palette, whimsical, centered framing, vintage aesthetic', blockedAtmospheres: ['cyberpunk', 'moody'], blockedPresets: ['highcontrast', 'bleachbypass'] },
  { name: 'Quentin Tarantino', keywords: 'Quentin Tarantino style, realistic film still, photorealistic, live action movie, 35mm film, bold colors, low angle shots, trunk shot, 70s grindhouse aesthetic, cinematic lighting, not illustration, not anime', blockedAtmospheres: ['dreamy', 'studio'], blockedPresets: ['desaturated'] },
  { name: 'Stanley Kubrick', keywords: 'Stanley Kubrick style, one-point perspective, symmetrical framing, cold colors, wide angle, unsettling atmosphere', blockedAtmospheres: ['dreamy'], blockedPresets: ['vivid'] },
  { name: 'David Lynch', keywords: 'David Lynch style, surrealist, dreamlike, dark atmosphere, uncanny, mysterious lighting, noir', blockedAtmospheres: ['natural', 'studio'], blockedPresets: ['vivid', 'raw'] },
  { name: 'Christopher Nolan', keywords: 'Christopher Nolan style, IMAX quality, dark and gritty, complex composition, realistic, grand scale', blockedAtmospheres: ['dreamy', 'vintage'], blockedPresets: ['desaturated'] },
  { name: 'Denis Villeneuve', keywords: 'Denis Villeneuve style, atmospheric, vast landscapes, slow and deliberate, muted colors, epic scale, minimal', blockedAtmospheres: ['cyberpunk', 'vintage'], blockedPresets: ['vivid'] },
  { name: 'Ridley Scott', keywords: 'Ridley Scott style, detailed production design, atmospheric lighting, smoke and haze, epic, textured', blockedAtmospheres: ['dreamy'], blockedPresets: [] },
  { name: 'Wong Kar-wai', keywords: 'Wong Kar-wai style, neon lights, motion blur, saturated colors, romantic melancholy, urban night', blockedAtmospheres: ['natural', 'studio'], blockedPresets: ['raw', 'desaturated'] },
  { name: 'Terrence Malick', keywords: 'Terrence Malick style, golden hour, natural light, poetic, nature imagery, magic hour, ethereal', blockedAtmospheres: ['cyberpunk', 'studio', 'moody'], blockedPresets: ['highcontrast', 'bleachbypass'] },
  { name: 'Akira Kurosawa', keywords: 'Akira Kurosawa style, dynamic composition, weather elements, rain and wind, samurai epic, dramatic', blockedAtmospheres: ['studio', 'cyberpunk'], blockedPresets: [] },
  { name: 'Tim Burton', keywords: 'Tim Burton style, gothic, dark whimsy, German expressionist, twisted, striped patterns, pale characters', blockedAtmospheres: ['natural', 'studio'], blockedPresets: ['vivid', 'raw'] },
  { name: 'Guillermo del Toro', keywords: 'Guillermo del Toro style, dark fantasy, ornate details, creature design, amber and teal, gothic romance', blockedAtmospheres: ['studio', 'natural'], blockedPresets: ['raw', 'desaturated'] },
  { name: 'David Fincher', keywords: 'David Fincher style, dark and moody, green-yellow tint, meticulous, shadows, desaturated, noir', blockedAtmospheres: ['dreamy', 'natural'], blockedPresets: ['vivid', 'raw'] },
  { name: 'Zack Snyder', keywords: 'Zack Snyder style, slow motion, desaturated colors, high contrast, epic action, comic book aesthetic', blockedAtmospheres: ['vintage', 'dreamy'], blockedPresets: ['raw'] },
  { name: 'Sofia Coppola', keywords: 'Sofia Coppola style, soft pastels, dreamy, melancholic, feminine, natural light, intimate', blockedAtmospheres: ['cyberpunk', 'moody'], blockedPresets: ['highcontrast', 'bleachbypass'] },
  { name: 'Edgar Wright', keywords: 'Edgar Wright style, dynamic editing, visual comedy, vibrant colors, whip pans, British humor', blockedAtmospheres: ['moody', 'vintage'], blockedPresets: ['desaturated', 'bleachbypass'] },
  { name: 'Hayao Miyazaki', keywords: 'Hayao Miyazaki style, Studio Ghibli, hand-drawn animation, nature, flying scenes, whimsical, Japanese', blockedAtmospheres: ['cyberpunk', 'moody'], blockedPresets: ['highcontrast', 'bleachbypass'] },
  { name: 'Coen Brothers', keywords: 'Coen Brothers style, quirky characters, dark humor, midwest americana, offbeat, ironic', blockedAtmospheres: ['dreamy', 'cyberpunk'], blockedPresets: [] },
  { name: 'Park Chan-wook', keywords: 'Park Chan-wook style, revenge aesthetic, stylized violence, bold colors, symmetry, Korean cinema', blockedAtmospheres: ['dreamy', 'natural'], blockedPresets: ['raw', 'desaturated'] },
  { name: 'Andrei Tarkovsky', keywords: 'Andrei Tarkovsky style, long contemplative shots, water imagery, spiritual, dreamlike, slow cinema', blockedAtmospheres: ['cyberpunk', 'studio'], blockedPresets: ['vivid', 'highcontrast'] },
  { name: 'Roger Deakins', keywords: 'Roger Deakins cinematography, masterful lighting, natural beauty, precise composition, atmospheric', blockedAtmospheres: [], blockedPresets: [] },
  { name: 'Emmanuel Lubezki', keywords: 'Emmanuel Lubezki cinematography, natural light, long takes, fluid camera movement, magic hour, immersive', blockedAtmospheres: ['studio', 'cyberpunk'], blockedPresets: ['highcontrast'] },
];

export default function AdvancedPromptGenerator() {
  // Theme
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  // Model Selection
  const [selectedModel, setSelectedModel] = useState<AIModel>('midjourney');

  // Universal Sliders (1-100)
  const [creativity, setCreativity] = useState(50);
  const [variation, setVariation] = useState(50);
  const [uniqueness, setUniqueness] = useState(50);

  // Core Content
  const [subject, setSubject] = useState('');
  const [characterItems, setCharacterItems] = useState<Array<{id: string; content: string}>>([]);
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [location, setLocation] = useState('');

  // Visual Presets
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<Atmosphere | null>(null);
  const [selectedVisualPreset, setSelectedVisualPreset] = useState<string | null>(null);
  const [selectedLighting, setSelectedLighting] = useState<string | null>(null);
  const [selectedColorPalette, setSelectedColorPalette] = useState<string | null>(null);
  const [customColors, setCustomColors] = useState<string[]>(['', '', '', '', '', '']);

  // Camera Settings
  const [selectedCamera, setSelectedCamera] = useState('');
  const [customCamera, setCustomCamera] = useState('');
  const [selectedLens, setSelectedLens] = useState('50mm');
  const [customLens, setCustomLens] = useState('');
  const [selectedShot, setSelectedShot] = useState('Medium Shot (MS)');
  const [customShot, setCustomShot] = useState('');
  const [depthOfField, setDepthOfField] = useState('normal');
  const [aspectRatio, setAspectRatio] = useState('none');

  // Advanced
  const [negativePrompt, setNegativePrompt] = useState('');
  const [settingsLocked, setSettingsLocked] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [creativeControlsEnabled, setCreativeControlsEnabled] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState('');

  // Hover Preview removed for performance

  // UI State
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    model: true,
    sliders: true,
    atmosphere: true,
    visual: false,
    color: false,
    camera: false,
    lighting: false,
  });

  // User Presets (placeholder)
  const [savedPresets] = useState<Array<{id: string; name: string}>>([]);

  // Conflict Detection
  const currentCameraCategory = useMemo((): CameraCategory => {
    if (!selectedCamera) return 'none';
    return cameraCategories[selectedCamera] || 'none';
  }, [selectedCamera]);

  const conflicts = useMemo(() => {
    const cameraRules = categoryConflicts[currentCameraCategory];

    // Get blocked options based on camera selection
    const blockedAtmospheres = new Set<Atmosphere>(cameraRules.blockedAtmospheres);
    const blockedPresets = new Set<string>(cameraRules.blockedPresets);
    const blockedDOF = new Set<string>(cameraRules.blockedDOF);
    const blockedCameras = new Set<string>();

    // Add director-based blocking
    const directorConfig = directorStyles.find(d => d.name === selectedDirector);
    if (directorConfig) {
      directorConfig.blockedAtmospheres.forEach(atm => blockedAtmospheres.add(atm));
      directorConfig.blockedPresets.forEach(preset => blockedPresets.add(preset));
    }

    // Check reverse conflicts: atmosphere blocks cameras
    if (selectedAtmosphere && atmosphereBlocksCategories[selectedAtmosphere]) {
      const blockedCategories = atmosphereBlocksCategories[selectedAtmosphere]!;
      Object.entries(cameraCategories).forEach(([camera, category]) => {
        if (blockedCategories.includes(category)) {
          blockedCameras.add(camera);
        }
      });
    }

    // Check reverse conflicts: preset blocks cameras
    if (selectedVisualPreset && presetBlocksCategories[selectedVisualPreset]) {
      const blockedCategories = presetBlocksCategories[selectedVisualPreset];
      Object.entries(cameraCategories).forEach(([camera, category]) => {
        if (blockedCategories.includes(category)) {
          blockedCameras.add(camera);
        }
      });
    }

    // Detect active conflicts (things user has selected that conflict)
    const activeConflicts: string[] = [];

    if (selectedAtmosphere && blockedAtmospheres.has(selectedAtmosphere)) {
      activeConflicts.push(`"${atmosphereConfigs[selectedAtmosphere].name}" atmosphere conflicts with ${selectedCamera}`);
    }

    if (selectedVisualPreset && blockedPresets.has(selectedVisualPreset)) {
      activeConflicts.push(`"${visualPresets[selectedVisualPreset].name}" preset conflicts with ${selectedCamera}`);
    }

    if (blockedDOF.has(depthOfField) && depthOfField !== 'normal') {
      const dofLabel = dofOptions.find(d => d.value === depthOfField)?.label || depthOfField;
      activeConflicts.push(`"${dofLabel}" DOF conflicts with ${selectedCamera}`);
    }

    // Determine if camera has a zoom range or fixed lens
    // Zoom range takes precedence over category-level fixedLens
    const zoomRange = selectedCamera
      ? (cameraZoomRange[selectedCamera] || null)
      : null;

    const fixedLens = selectedCamera && !zoomRange
      ? (cameraFixedLens[selectedCamera] || cameraRules.fixedLens || null)
      : null;

    // Get allowed aspect ratios for camera (null means all allowed)
    const allowedAspectRatios = selectedCamera
      ? (cameraAspectRatios[selectedCamera] || null)
      : null;

    return {
      blockedAtmospheres,
      blockedPresets,
      blockedDOF,
      blockedCameras,
      activeConflicts,
      warningMessage: cameraRules.warningMessage,
      fixedLens,
      zoomRange,
      allowedAspectRatios,
    };
  }, [currentCameraCategory, selectedCamera, selectedAtmosphere, selectedVisualPreset, depthOfField, selectedDirector]);

  // Auto-clear conflicting selections when camera changes
  const handleCameraChange = useCallback((newCamera: string) => {
    if (settingsLocked) return;

    setSelectedCamera(newCamera);
    setCustomCamera('');

    const category = cameraCategories[newCamera] || 'none';
    const rules = categoryConflicts[category];

    // Auto-clear conflicting selections
    if (selectedAtmosphere && rules.blockedAtmospheres.includes(selectedAtmosphere)) {
      setSelectedAtmosphere(null);
    }
    if (selectedVisualPreset && rules.blockedPresets.includes(selectedVisualPreset)) {
      setSelectedVisualPreset(null);
    }
    if (rules.blockedDOF.includes(depthOfField)) {
      setDepthOfField('normal');
    }
    // Reset aspect ratio if camera has restrictions and current ratio isn't allowed
    const allowedRatios = cameraAspectRatios[newCamera];
    if (allowedRatios && aspectRatio !== 'none' && !allowedRatios.includes(aspectRatio)) {
      setAspectRatio('none');
    }
  }, [settingsLocked, selectedAtmosphere, selectedVisualPreset, depthOfField, aspectRatio]);

  // Auto-clear conflicting selections when director changes
  const handleDirectorChange = useCallback((newDirector: string) => {
    if (settingsLocked) return;

    setSelectedDirector(newDirector);

    const directorConfig = directorStyles.find(d => d.name === newDirector);
    if (directorConfig) {
      // Auto-clear conflicting atmosphere
      if (selectedAtmosphere && directorConfig.blockedAtmospheres.includes(selectedAtmosphere)) {
        setSelectedAtmosphere(null);
      }
      // Auto-clear conflicting preset
      if (selectedVisualPreset && directorConfig.blockedPresets.includes(selectedVisualPreset)) {
        setSelectedVisualPreset(null);
      }
    }
  }, [settingsLocked, selectedAtmosphere, selectedVisualPreset]);

  // Model Configurations
  const modelConfigs: Record<AIModel, ModelConfig> = {
    'midjourney': {
      name: 'Midjourney',
      icon: '🎨',
      maxCreativity: 1000,
      creativityParam: '--stylize',
      variationParam: '--chaos',
      negativeParam: '--no',
      aspectParam: '--ar',
    },
    'flux': {
      name: 'Flux',
      icon: '⚡',
      maxCreativity: 20,
      creativityParam: 'guidance_scale:',
      variationParam: 'variation:',
      negativeParam: 'negative:',
      aspectParam: 'aspect:',
    },
    'stable-diffusion': {
      name: 'Stable Diffusion',
      icon: '🔮',
      maxCreativity: 30,
      creativityParam: 'CFG Scale:',
      variationParam: 'Variation:',
      negativeParam: 'Negative prompt:',
      aspectParam: 'Size:',
    },
    'dalle3': {
      name: 'DALL-E 3',
      icon: '🌟',
      maxCreativity: 100,
      creativityParam: 'style:',
      variationParam: 'quality:',
      negativeParam: 'avoid:',
      aspectParam: 'size:',
    },
    'chatgpt': {
      name: 'ChatGPT',
      icon: '💬',
      maxCreativity: 100,
      creativityParam: '',
      variationParam: '',
      negativeParam: 'without',
      aspectParam: '',
    },
  };

  // Theme Colors
  const themeColors = useMemo(() => {
    if (darkMode) {
      return {
        background: '#0a0a0b',
        cardBackground: 'rgba(20, 20, 22, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        textPrimary: '#f8fafc',
        textSecondary: '#a1a1aa',
        textTertiary: '#71717a',
        inputBackground: 'rgba(39, 39, 42, 0.8)',
        inputBorder: 'rgba(63, 63, 70, 0.8)',
        accent: '#6366f1',
        accentHover: '#818cf8',
        promptBg: 'rgba(99, 102, 241, 0.08)',
        success: '#10b981',
        warning: '#f59e0b',
      };
    } else {
      return {
        background: '#FFFEF5',
        cardBackground: 'rgba(255, 253, 245, 0.95)',
        borderColor: 'rgba(139, 115, 85, 0.2)',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textTertiary: '#6a6a6a',
        inputBackground: 'rgba(255, 250, 240, 0.9)',
        inputBorder: 'rgba(139, 115, 85, 0.3)',
        accent: '#6366f1',
        accentHover: '#818cf8',
        promptBg: 'rgba(99, 102, 241, 0.08)',
        success: '#10b981',
        warning: '#f59e0b',
      };
    }
  }, [darkMode]);

  // Translate Universal Sliders to Model Parameters
  const translateSliders = useCallback(() => {
    const config = modelConfigs[selectedModel];

    switch (selectedModel) {
      case 'midjourney':
        return {
          creativity: `${config.creativityParam} ${Math.round(creativity * 10)}`,
          variation: `--chaos ${Math.round(variation)}`,
          quality: creativity > 70 ? '--q 2' : '',
        };
      case 'flux':
        return {
          creativity: `${config.creativityParam} ${(creativity / 5).toFixed(1)}`,
          variation: `${config.variationParam} ${variation}`,
          quality: '',
        };
      case 'stable-diffusion':
        return {
          creativity: `${config.creativityParam} ${(creativity / 100 * 30).toFixed(1)}`,
          variation: `${config.variationParam} ${variation}%`,
          quality: uniqueness > 50 ? 'Steps: 50' : 'Steps: 30',
        };
      case 'dalle3':
        return {
          creativity: creativity > 70 ? 'style: vivid' : 'style: natural',
          variation: uniqueness > 50 ? 'quality: hd' : 'quality: standard',
          quality: '',
        };
      case 'chatgpt':
        return {
          creativity: '',
          variation: '',
          quality: '',
        };
      default:
        return { creativity: '', variation: '', quality: '' };
    }
  }, [selectedModel, creativity, variation, uniqueness]);

  // Character Management
  const addCharacter = () => {
    if (currentCharacter.trim() && !settingsLocked) {
      setCharacterItems(prev => [...prev, {
        id: crypto.randomUUID().slice(0, 9),
        content: currentCharacter.trim()
      }]);
      setCurrentCharacter('');
    }
  };

  const removeCharacter = (id: string) => {
    if (!settingsLocked) {
      setCharacterItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // Generate Final Prompt
  const generatePrompt = useCallback(() => {
    const parts: string[] = [];
    const config = modelConfigs[selectedModel];
    const params = translateSliders();

    // [Subject] - Always first
    if (subject.trim()) {
      parts.push(subject.trim());
    }

    // Characters (include both saved items and current input)
    const allCharacters = [
      ...characterItems.map(c => c.content),
      ...(currentCharacter.trim() ? [currentCharacter.trim()] : [])
    ];
    if (allCharacters.length > 0) {
      parts.push(allCharacters.join(', '));
    }

    // Location
    if (location.trim()) {
      parts.push(`in ${location.trim()}`);
    }

    // [Visual Presets]
    if (selectedVisualPreset && visualPresets[selectedVisualPreset]) {
      parts.push(visualPresets[selectedVisualPreset].keywords);
    }

    // [Color Palette]
    const validCustomColors = customColors.filter(c => /^#?[0-9A-Fa-f]{6}$/.test(c.trim()));
    if (selectedColorPalette === 'custom' && validCustomColors.length > 0) {
      // Custom hex colors from array
      const formattedColors = validCustomColors.map(c => c.startsWith('#') ? c : `#${c}`).join(', ');
      parts.push(`color palette: ${formattedColors}`);
    } else if (selectedColorPalette && selectedColorPalette !== 'custom' && colorPalettes[selectedColorPalette]) {
      const palette = colorPalettes[selectedColorPalette].colors;
      parts.push(`color palette: ${palette.join(', ')}`);
    }

    // [Atmosphere]
    if (selectedAtmosphere && atmosphereConfigs[selectedAtmosphere]) {
      parts.push(atmosphereConfigs[selectedAtmosphere].keywords);
    }

    // [Lighting]
    if (selectedLighting && lightingOptions[selectedLighting]) {
      parts.push(lightingOptions[selectedLighting].keywords);
    }

    // [Director Style]
    const directorConfig = directorStyles.find(d => d.name === selectedDirector);
    if (directorConfig) {
      parts.push(directorConfig.keywords);
    }

    // [Camera]
    const cameraConfig = cameraOptions.find(c => c.label === selectedCamera);
    const finalCamera = customCamera.trim() || (cameraConfig ? cameraConfig.keywords : '');

    // Check if camera has zoom range, fixed lens, or interchangeable lens
    const cameraCategory = selectedCamera ? (cameraCategories[selectedCamera] || 'none') : 'none';
    const hasZoomRange = selectedCamera ? cameraZoomRange[selectedCamera] : null;
    const hasFixedLens = selectedCamera && !hasZoomRange
      ? (cameraFixedLens[selectedCamera] || categoryConflicts[cameraCategory].fixedLens)
      : null;

    // Include lens for zoom range cameras and interchangeable lens cameras, skip for fixed lens
    const finalLens = hasFixedLens ? null : (customLens.trim() || selectedLens);
    const shotConfig = shotOptions.find(s => s.label === selectedShot);
    const finalShot = customShot.trim() || (shotConfig ? shotConfig.keywords : selectedShot);
    const dofConfig = dofOptions.find(d => d.value === depthOfField);

    if (finalCamera) {
      parts.push(finalCamera);
    }
    if (finalLens) {
      parts.push(`${finalLens} lens`);
    }
    if (finalShot) {
      parts.push(finalShot);
    }
    // Skip DOF for cameras that don't support it
    const categoryRules = categoryConflicts[cameraCategory];
    if (dofConfig && dofConfig.keywords && !categoryRules.blockedDOF.includes(depthOfField)) {
      parts.push(dofConfig.keywords);
    }

    // Build main prompt
    let prompt = parts.filter(Boolean).join(', ');

    // Add model-specific parameters (only if creative controls enabled)
    const selectedRatio = aspectRatioOptions.find(r => r.value === aspectRatio);

    if (selectedModel === 'midjourney') {
      const mjParams = [];
      if (aspectRatio !== 'none' && selectedRatio) {
        mjParams.push(`--ar ${selectedRatio.ratio}`);
      }
      if (creativeControlsEnabled) {
        if (params.creativity) mjParams.push(params.creativity);
        if (params.variation) mjParams.push(params.variation);
        if (params.quality) mjParams.push(params.quality);
      }
      if (negativePrompt.trim()) {
        mjParams.push(`${config.negativeParam} ${negativePrompt.trim()}`);
      }
      if (mjParams.length > 0) {
        prompt += ' ' + mjParams.join(' ');
      }
    } else if (selectedModel === 'stable-diffusion') {
      if (aspectRatio !== 'none' && selectedRatio) {
        prompt += `, ${selectedRatio.ratio} aspect ratio`;
      }
      if (negativePrompt.trim()) {
        prompt += `\n\n${config.negativeParam} ${negativePrompt.trim()}`;
      }
      if (creativeControlsEnabled) {
        prompt += `\n\n${params.creativity}, ${params.quality}`;
      }
    } else if (selectedModel === 'flux') {
      if (creativeControlsEnabled) {
        prompt += `\n\n[${params.creativity}, ${params.variation}]`;
      }
      if (aspectRatio !== 'none' && selectedRatio) {
        prompt += `\n[aspect_ratio: ${selectedRatio.ratio}]`;
      }
      if (negativePrompt.trim()) {
        prompt += `\n${config.negativeParam} ${negativePrompt.trim()}`;
      }
    } else if (selectedModel === 'dalle3') {
      // DALL-E 3 uses natural language, parameters are embedded
      if (aspectRatio !== 'none' && selectedRatio) {
        prompt += `, ${selectedRatio.ratio} aspect ratio`;
      }
      if (negativePrompt.trim()) {
        prompt += `, avoiding ${negativePrompt.trim()}`;
      }
    } else if (selectedModel === 'chatgpt') {
      // ChatGPT uses conversational natural language
      if (aspectRatio !== 'none' && selectedRatio) {
        prompt += `, in ${selectedRatio.ratio} aspect ratio`;
      }
      if (negativePrompt.trim()) {
        prompt += `, without ${negativePrompt.trim()}`;
      }
    }

    return prompt || 'Start by adding a subject...';
  }, [subject, characterItems, currentCharacter, location, selectedVisualPreset, selectedLighting, selectedColorPalette,
      customColors, selectedAtmosphere, selectedDirector, selectedCamera, customCamera, selectedLens, customLens,
      selectedShot, customShot, depthOfField, aspectRatio, selectedModel, negativePrompt, creativeControlsEnabled, translateSliders]);

  // Copy to Clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset All
  const resetAll = () => {
    if (settingsLocked) return;
    setSubject('');
    setCharacterItems([]);
    setCurrentCharacter('');
    setLocation('');
    setSelectedAtmosphere(null);
    setSelectedVisualPreset(null);
    setSelectedLighting(null);
    setSelectedColorPalette(null);
    setCustomColors(['', '', '', '', '', '']);
    setSelectedCamera('');
    setCustomCamera('');
    setSelectedLens('50mm');
    setCustomLens('');
    setSelectedShot('Medium Shot (MS)');
    setCustomShot('');
    setDepthOfField('normal');
    setAspectRatio('none');
    setNegativePrompt('');
    setSelectedDirector('');
    setCreativity(50);
    setVariation(50);
    setUniqueness(50);
  };

  // Section Toggle
  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Section Header Component
  const SectionHeader = ({ title, icon: Icon, sectionKey, badge }: {
    title: string;
    icon: React.ElementType;
    sectionKey: string;
    badge?: string;
  }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between py-3 group"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: themeColors.accent }} />
        <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>{title}</span>
        {badge && (
          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{
            backgroundColor: themeColors.promptBg,
            color: themeColors.accent
          }}>
            {badge}
          </span>
        )}
      </div>
      <motion.div
        animate={{ rotate: expandedSections[sectionKey] ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
      </motion.div>
    </button>
  );


  // Universal Slider Component
  const UniversalSlider = ({
    label,
    value,
    onChange,
    icon: Icon
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    icon: React.ElementType;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
          <span className="text-xs font-medium" style={{ color: themeColors.textSecondary }}>{label}</span>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{
          backgroundColor: themeColors.promptBg,
          color: themeColors.textPrimary
        }}>
          {value}
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={settingsLocked}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${themeColors.accent} 0%, ${themeColors.accent} ${value}%, ${themeColors.inputBackground} ${value}%, ${themeColors.inputBackground} 100%)`,
        }}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen pb-52 transition-colors duration-300"
      style={{ backgroundColor: themeColors.background }}
    >
      <div className="max-w-[480px] mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="w-6 h-6" style={{ color: themeColors.accent }} />
            <h1 className="text-xl font-semibold tracking-tight" style={{ color: themeColors.textPrimary }}>
              AI Prompt Studio
            </h1>
          </div>
          <p className="text-sm" style={{ color: themeColors.textTertiary }}>
            Multi-model prompt generator with visual presets
          </p>

          {/* Theme & Lock Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border"
              style={{
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.borderColor,
                color: themeColors.textSecondary
              }}
            >
              {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              {darkMode ? 'Light' : 'Dark'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettingsLocked(!settingsLocked)}
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border"
              style={{
                backgroundColor: settingsLocked ? themeColors.warning + '20' : themeColors.inputBackground,
                borderColor: settingsLocked ? themeColors.warning : themeColors.borderColor,
                color: settingsLocked ? themeColors.warning : themeColors.textSecondary
              }}
            >
              {settingsLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              {settingsLocked ? 'Locked' : 'Lock'}
            </motion.button>
          </div>
        </div>

        {/* Conflict Warning Banner */}
        <AnimatePresence>
          {conflicts.activeConflicts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl p-3 border"
              style={{
                backgroundColor: themeColors.warning + '15',
                borderColor: themeColors.warning + '40',
              }}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: themeColors.warning }} />
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: themeColors.warning }}>
                    Parameter Conflicts Detected
                  </p>
                  <ul className="text-xs space-y-0.5" style={{ color: themeColors.textSecondary }}>
                    {conflicts.activeConflicts.map((conflict, i) => (
                      <li key={i}>• {conflict}</li>
                    ))}
                  </ul>
                  {conflicts.warningMessage && (
                    <p className="text-xs mt-1 italic" style={{ color: themeColors.textTertiary }}>
                      {conflicts.warningMessage}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.borderColor,
            boxShadow: darkMode ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="p-5 space-y-1">
            {/* Model Selector */}
            <div>
              <SectionHeader title="AI Model" icon={Layers} sectionKey="model" />
              <AnimatePresence>
                {expandedSections.model && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="grid grid-cols-2 gap-2 pb-4 px-1">
                      {(Object.entries(modelConfigs) as [AIModel, ModelConfig][]).map(([key, config]) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => !settingsLocked && setSelectedModel(key)}
                          disabled={settingsLocked}
                          className="p-3 rounded-xl text-left transition-all border"
                          style={{
                            backgroundColor: selectedModel === key ? themeColors.promptBg : 'transparent',
                            borderColor: selectedModel === key ? themeColors.accent : themeColors.borderColor,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{config.icon}</span>
                            <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                              {config.name}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Subject & Characters */}
            <div className="py-3 space-y-3">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: themeColors.textTertiary }}>
                  Subject (Main Focus)
                </label>
                <textarea
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="A futuristic warrior standing on a cliff..."
                  rows={2}
                  className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: themeColors.inputBackground,
                    border: `1px solid ${themeColors.inputBorder}`,
                    color: themeColors.textPrimary,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: themeColors.textTertiary }}>
                  <User className="w-3 h-3" /> Character Description
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentCharacter}
                    onChange={(e) => setCurrentCharacter(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCharacter()}
                    placeholder="Add character description..."
                    disabled={settingsLocked}
                    className="flex-1 rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: themeColors.inputBackground,
                      border: `1px solid ${themeColors.inputBorder}`,
                      color: themeColors.textPrimary,
                      opacity: settingsLocked ? 0.6 : 1
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addCharacter}
                    disabled={settingsLocked}
                    className="px-3 rounded-lg"
                    style={{
                      backgroundColor: themeColors.accent,
                      color: '#fff',
                      opacity: settingsLocked ? 0.6 : 1
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                {characterItems.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {characterItems.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
                        style={{
                          backgroundColor: themeColors.promptBg,
                          color: themeColors.textPrimary,
                          border: `1px solid ${themeColors.borderColor}`
                        }}
                      >
                        <User className="w-3 h-3" style={{ color: themeColors.accent }} />
                        <span className="max-w-[150px] truncate">{item.content}</span>
                        <button
                          onClick={() => removeCharacter(item.id)}
                          disabled={settingsLocked}
                          className="ml-1 hover:opacity-70"
                        >
                          <X className="w-3 h-3" style={{ color: themeColors.textTertiary }} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: themeColors.textTertiary }}>
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., neon-lit Tokyo street at night"
                  disabled={settingsLocked}
                  className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: themeColors.inputBackground,
                    border: `1px solid ${themeColors.inputBorder}`,
                    color: themeColors.textPrimary,
                    opacity: settingsLocked ? 0.6 : 1
                  }}
                />
              </div>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Director Style */}
            <div className="py-3">
              <label className="block text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: themeColors.textTertiary }}>
                <Sparkles className="w-3 h-3" /> Director Style
              </label>
              <select
                value={selectedDirector}
                onChange={(e) => handleDirectorChange(e.target.value)}
                disabled={settingsLocked}
                className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: themeColors.inputBackground,
                  border: `1px solid ${themeColors.inputBorder}`,
                  color: themeColors.textPrimary,
                  opacity: settingsLocked ? 0.6 : 1
                }}
              >
                <option value="">No director style</option>
                {directorStyles.map(director => (
                  <option key={director.name} value={director.name}>{director.name}</option>
                ))}
              </select>
              {selectedDirector && (
                <p className="text-xs mt-1.5" style={{ color: themeColors.textTertiary }}>
                  Some styles locked to match {selectedDirector}&apos;s aesthetic
                </p>
              )}
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Atmosphere Menu */}
            <div>
              <SectionHeader
                title="Atmosphere"
                icon={Sun}
                sectionKey="atmosphere"
                badge={selectedAtmosphere ? atmosphereConfigs[selectedAtmosphere].name : undefined}
              />
              <AnimatePresence>
                {expandedSections.atmosphere && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 pb-4">
                      {(Object.entries(atmosphereConfigs) as [Atmosphere, AtmosphereConfig][]).map(([key, config]) => {
                        const isBlocked = conflicts.blockedAtmospheres.has(key);
                        return (
                          <button
                            key={key}
                            onClick={() => !settingsLocked && !isBlocked && setSelectedAtmosphere(selectedAtmosphere === key ? null : key)}
                            disabled={settingsLocked || isBlocked}
                            className="relative p-3 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              borderColor: selectedAtmosphere === key ? themeColors.accent : themeColors.borderColor,
                              opacity: (settingsLocked || isBlocked) ? 0.4 : 1
                            }}
                          >
                            {/* Background Gradient Preview */}
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{ background: config.gradient }}
                            />
                            <div className="relative z-10">
                              <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                                {config.name}
                              </span>
                              {selectedAtmosphere === key && (
                                <Check className="absolute top-2 right-2 w-4 h-4" style={{ color: themeColors.accent }} />
                              )}
                              {isBlocked && (
                                <AlertTriangle className="absolute top-2 right-2 w-4 h-4" style={{ color: themeColors.warning }} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Visual Presets */}
            <div>
              <SectionHeader
                title="Visual Style"
                icon={ImageIcon}
                sectionKey="visual"
                badge={selectedVisualPreset ? visualPresets[selectedVisualPreset].name : undefined}
              />
              <AnimatePresence>
                {expandedSections.visual && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 pb-4">
                      {Object.entries(visualPresets).map(([key, config]) => {
                        const isBlocked = conflicts.blockedPresets.has(key);
                        return (
                          <button
                            key={key}
                            onClick={() => !settingsLocked && !isBlocked && setSelectedVisualPreset(selectedVisualPreset === key ? null : key)}
                            disabled={settingsLocked || isBlocked}
                            className="relative p-3 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              borderColor: selectedVisualPreset === key ? themeColors.accent : themeColors.borderColor,
                              opacity: (settingsLocked || isBlocked) ? 0.4 : 1
                            }}
                          >
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{ background: config.gradient }}
                            />
                            <div className="relative z-10">
                              <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                                {config.name}
                              </span>
                              {selectedVisualPreset === key && (
                                <Check className="absolute top-2 right-2 w-4 h-4" style={{ color: themeColors.accent }} />
                              )}
                              {isBlocked && (
                                <AlertTriangle className="absolute top-2 right-2 w-4 h-4" style={{ color: themeColors.warning }} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Color Palette */}
            <div>
              <SectionHeader
                title="Color Palette"
                icon={Palette}
                sectionKey="color"
                badge={selectedColorPalette === 'custom' ? 'Custom' : (selectedColorPalette ? colorPalettes[selectedColorPalette].name : undefined)}
              />
              <AnimatePresence>
                {expandedSections.color && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 space-y-3">
                      {/* Preset Palettes + Custom Option */}
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(colorPalettes).map(([key, config]) => (
                          <button
                            key={key}
                            onClick={() => {
                              if (!settingsLocked) {
                                setSelectedColorPalette(selectedColorPalette === key ? null : key);
                              }
                            }}
                            disabled={settingsLocked}
                            className="p-2.5 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              borderColor: selectedColorPalette === key ? themeColors.accent : themeColors.borderColor,
                              backgroundColor: selectedColorPalette === key ? themeColors.promptBg : 'transparent',
                              opacity: settingsLocked ? 0.4 : 1
                            }}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium" style={{ color: themeColors.textPrimary }}>
                                {config.name}
                              </span>
                              {selectedColorPalette === key && (
                                <Check className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
                              )}
                            </div>
                            {/* Color swatches */}
                            <div className="flex gap-0.5">
                              {config.colors.slice(0, 6).map((color, i) => (
                                <div
                                  key={i}
                                  className="flex-1 h-4 first:rounded-l last:rounded-r"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </button>
                        ))}

                        {/* Custom Palette Option */}
                        <button
                          onClick={() => {
                            if (!settingsLocked) {
                              setSelectedColorPalette(selectedColorPalette === 'custom' ? null : 'custom');
                            }
                          }}
                          disabled={settingsLocked}
                          className="p-2.5 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            borderColor: selectedColorPalette === 'custom' ? themeColors.accent : themeColors.borderColor,
                            backgroundColor: selectedColorPalette === 'custom' ? themeColors.promptBg : 'transparent',
                            opacity: settingsLocked ? 0.4 : 1
                          }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium" style={{ color: themeColors.textPrimary }}>
                              Custom
                            </span>
                            {selectedColorPalette === 'custom' && (
                              <Check className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
                            )}
                          </div>
                          {/* Custom color swatches preview */}
                          <div className="flex gap-0.5">
                            {customColors.map((color, i) => (
                              <div
                                key={i}
                                className="flex-1 h-4 first:rounded-l last:rounded-r border border-dashed"
                                style={{
                                  backgroundColor: /^#?[0-9A-Fa-f]{6}$/.test(color.trim())
                                    ? (color.startsWith('#') ? color : `#${color}`)
                                    : 'transparent',
                                  borderColor: themeColors.borderColor
                                }}
                              />
                            ))}
                          </div>
                        </button>
                      </div>

                      {/* Custom Color Inputs - shown when Custom is selected */}
                      <AnimatePresence>
                        {selectedColorPalette === 'custom' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 space-y-2">
                              <label className="block text-xs" style={{ color: themeColors.textTertiary }}>
                                Enter 6 hex color codes
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {customColors.map((color, index) => (
                                  <div key={index} className="flex items-center gap-1.5">
                                    {/* Color preview square */}
                                    <div
                                      className="w-8 h-8 rounded-lg border flex-shrink-0"
                                      style={{
                                        backgroundColor: /^#?[0-9A-Fa-f]{6}$/.test(color.trim())
                                          ? (color.startsWith('#') ? color : `#${color}`)
                                          : themeColors.inputBackground,
                                        borderColor: themeColors.borderColor
                                      }}
                                    />
                                    {/* Hex input */}
                                    <input
                                      type="text"
                                      value={color}
                                      onChange={(e) => {
                                        if (!settingsLocked) {
                                          const newColors = [...customColors];
                                          newColors[index] = e.target.value;
                                          setCustomColors(newColors);
                                        }
                                      }}
                                      placeholder={`#${(index + 1).toString().padStart(2, '0')}...`}
                                      disabled={settingsLocked}
                                      maxLength={7}
                                      className="flex-1 min-w-0 rounded-lg px-2 py-1.5 text-xs transition-all focus:outline-none focus:ring-1"
                                      style={{
                                        backgroundColor: themeColors.inputBackground,
                                        border: `1px solid ${themeColors.inputBorder}`,
                                        color: themeColors.textPrimary,
                                        opacity: settingsLocked ? 0.6 : 1
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                                e.g. #FF5733 or FF5733
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Camera & Lens */}
            <div>
              <SectionHeader title="Camera & Lens" icon={Camera} sectionKey="camera" />
              <AnimatePresence>
                {expandedSections.camera && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 space-y-4">
                      {/* Camera Type Selection */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Camera</label>
                        <select
                          value={selectedCamera}
                          onChange={(e) => handleCameraChange(e.target.value)}
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          <option value="">No specific camera</option>
                          {cameraOptions.map(camera => {
                            const isBlocked = conflicts.blockedCameras.has(camera.label);
                            return (
                              <option
                                key={camera.label}
                                value={camera.label}
                                disabled={isBlocked}
                                style={{ color: isBlocked ? '#999' : undefined }}
                              >
                                {camera.label}{isBlocked ? ' ⚠️' : ''}
                              </option>
                            );
                          })}
                        </select>
                        <input
                          type="text"
                          value={customCamera}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setCustomCamera(e.target.value);
                            }
                          }}
                          placeholder="Or enter custom camera (e.g., Canon 5D)"
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        />
                      </div>

                      {/* Lens Selection */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Lens</label>
                        {conflicts.fixedLens ? (
                          // Fixed lens camera - show info instead of dropdown
                          <div
                            className="w-full rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                            style={{
                              backgroundColor: themeColors.promptBg,
                              border: `1px solid ${themeColors.borderColor}`,
                              color: themeColors.textSecondary,
                            }}
                          >
                            <Lock className="w-3 h-3" style={{ color: themeColors.warning }} />
                            <span>{conflicts.fixedLens}</span>
                            <span className="text-xs opacity-60">(fixed)</span>
                          </div>
                        ) : conflicts.zoomRange ? (
                          // Zoom lens camera - show range info and zoom options
                          <>
                            <div
                              className="w-full rounded-lg px-3 py-1.5 text-xs mb-2 flex items-center gap-2"
                              style={{
                                backgroundColor: themeColors.promptBg,
                                border: `1px solid ${themeColors.borderColor}`,
                                color: themeColors.textTertiary,
                              }}
                            >
                              <Camera className="w-3 h-3" style={{ color: themeColors.accent }} />
                              <span>Built-in zoom: {conflicts.zoomRange.range}</span>
                            </div>
                            <select
                              value={selectedLens}
                              onChange={(e) => {
                                if (!settingsLocked) {
                                  setSelectedLens(e.target.value);
                                  setCustomLens('');
                                }
                              }}
                              disabled={settingsLocked}
                              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                              style={{
                                backgroundColor: themeColors.inputBackground,
                                border: `1px solid ${themeColors.inputBorder}`,
                                color: themeColors.textPrimary,
                                opacity: settingsLocked ? 0.6 : 1
                              }}
                            >
                              {conflicts.zoomRange.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </>
                        ) : (
                          // Interchangeable lens camera - show dropdown
                          <>
                            <select
                              value={selectedLens}
                              onChange={(e) => {
                                if (!settingsLocked) {
                                  setSelectedLens(e.target.value);
                                  setCustomLens('');
                                }
                              }}
                              disabled={settingsLocked}
                              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                              style={{
                                backgroundColor: themeColors.inputBackground,
                                border: `1px solid ${themeColors.inputBorder}`,
                                color: themeColors.textPrimary,
                                opacity: settingsLocked ? 0.6 : 1
                              }}
                            >
                              {lensOptions.map(lens => (
                                <option key={lens} value={lens}>{lens}</option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={customLens}
                              onChange={(e) => {
                                if (!settingsLocked) {
                                  setCustomLens(e.target.value);
                                }
                              }}
                              placeholder="Or enter custom lens (e.g., 21mm Zeiss)"
                              disabled={settingsLocked}
                              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                              style={{
                                backgroundColor: themeColors.inputBackground,
                                border: `1px solid ${themeColors.inputBorder}`,
                                color: themeColors.textPrimary,
                                opacity: settingsLocked ? 0.6 : 1
                              }}
                            />
                          </>
                        )}
                      </div>

                      {/* Shot Type Selection */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Shot Type</label>
                        <select
                          value={selectedShot}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setSelectedShot(e.target.value);
                              setCustomShot('');
                            }
                          }}
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          {shotOptions.map(shot => (
                            <option key={shot.label} value={shot.label}>{shot.label}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={customShot}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setCustomShot(e.target.value);
                            }
                          }}
                          placeholder="Or enter custom shot type"
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        />
                      </div>

                      {/* Aspect Ratio Selection */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Aspect Ratio</label>
                        {conflicts.allowedAspectRatios ? (
                          // Camera has specific allowed ratios
                          <>
                            <div
                              className="w-full rounded-lg px-3 py-1.5 text-xs mb-2 flex items-center gap-2"
                              style={{
                                backgroundColor: themeColors.promptBg,
                                border: `1px solid ${themeColors.borderColor}`,
                                color: themeColors.textTertiary,
                              }}
                            >
                              <Camera className="w-3 h-3" style={{ color: themeColors.accent }} />
                              <span>Limited to authentic {selectedCamera} ratios</span>
                            </div>
                            <select
                              value={aspectRatio}
                              onChange={(e) => {
                                if (!settingsLocked) {
                                  setAspectRatio(e.target.value);
                                }
                              }}
                              disabled={settingsLocked}
                              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                              style={{
                                backgroundColor: themeColors.inputBackground,
                                border: `1px solid ${themeColors.inputBorder}`,
                                color: themeColors.textPrimary,
                                opacity: settingsLocked ? 0.6 : 1
                              }}
                            >
                              <option value="none">Default</option>
                              {conflicts.allowedAspectRatios.map(ratio => {
                                const opt = aspectRatioOptions.find(r => r.ratio === ratio);
                                return (
                                  <option key={ratio} value={ratio}>
                                    {opt ? opt.label : ratio}
                                  </option>
                                );
                              })}
                            </select>
                          </>
                        ) : (
                          // No camera selected or camera allows all ratios
                          <select
                            value={aspectRatio}
                            onChange={(e) => {
                              if (!settingsLocked) {
                                setAspectRatio(e.target.value);
                              }
                            }}
                            disabled={settingsLocked}
                            className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                            style={{
                              backgroundColor: themeColors.inputBackground,
                              border: `1px solid ${themeColors.inputBorder}`,
                              color: themeColors.textPrimary,
                              opacity: settingsLocked ? 0.6 : 1
                            }}
                          >
                            {aspectRatioOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Lighting */}
            <div>
              <SectionHeader title="Lighting" icon={Sun} sectionKey="lighting" />
              <AnimatePresence>
                {expandedSections.lighting && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 space-y-4">
                      {/* Classic Cinematic */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Classic Cinematic</label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(lightingOptions)
                            .filter(([, opt]) => opt.category === 'classic')
                            .map(([key, opt]) => (
                              <motion.button
                                key={key}
                                onClick={() => {
                                  if (!settingsLocked) {
                                    setSelectedLighting(selectedLighting === key ? null : key);
                                  }
                                }}
                                disabled={settingsLocked}
                                className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
                                style={{
                                  background: selectedLighting === key ? opt.gradient : themeColors.inputBackground,
                                  border: `1px solid ${selectedLighting === key ? 'transparent' : themeColors.inputBorder}`,
                                  color: selectedLighting === key ? '#fff' : themeColors.textSecondary,
                                  opacity: settingsLocked ? 0.6 : 1,
                                }}
                                whileHover={{ scale: settingsLocked ? 1 : 1.02 }}
                                whileTap={{ scale: settingsLocked ? 1 : 0.98 }}
                              >
                                {opt.name}
                              </motion.button>
                            ))}
                        </div>
                      </div>

                      {/* Natural / Atmospheric */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Natural / Atmospheric</label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(lightingOptions)
                            .filter(([, opt]) => opt.category === 'natural')
                            .map(([key, opt]) => (
                              <motion.button
                                key={key}
                                onClick={() => {
                                  if (!settingsLocked) {
                                    setSelectedLighting(selectedLighting === key ? null : key);
                                  }
                                }}
                                disabled={settingsLocked}
                                className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
                                style={{
                                  background: selectedLighting === key ? opt.gradient : themeColors.inputBackground,
                                  border: `1px solid ${selectedLighting === key ? 'transparent' : themeColors.inputBorder}`,
                                  color: selectedLighting === key ? '#fff' : themeColors.textSecondary,
                                  opacity: settingsLocked ? 0.6 : 1,
                                }}
                                whileHover={{ scale: settingsLocked ? 1 : 1.02 }}
                                whileTap={{ scale: settingsLocked ? 1 : 0.98 }}
                              >
                                {opt.name}
                              </motion.button>
                            ))}
                        </div>
                      </div>

                      {/* Stylized / Modern */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Stylized / Modern</label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(lightingOptions)
                            .filter(([, opt]) => opt.category === 'stylized')
                            .map(([key, opt]) => (
                              <motion.button
                                key={key}
                                onClick={() => {
                                  if (!settingsLocked) {
                                    setSelectedLighting(selectedLighting === key ? null : key);
                                  }
                                }}
                                disabled={settingsLocked}
                                className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
                                style={{
                                  background: selectedLighting === key ? opt.gradient : themeColors.inputBackground,
                                  border: `1px solid ${selectedLighting === key ? 'transparent' : themeColors.inputBorder}`,
                                  color: selectedLighting === key ? '#fff' : themeColors.textSecondary,
                                  opacity: settingsLocked ? 0.6 : 1,
                                }}
                                whileHover={{ scale: settingsLocked ? 1 : 1.02 }}
                                whileTap={{ scale: settingsLocked ? 1 : 0.98 }}
                              >
                                {opt.name}
                              </motion.button>
                            ))}
                        </div>
                      </div>

                      {/* Selected lighting preview */}
                      {selectedLighting && (
                        <div
                          className="p-3 rounded-lg text-xs"
                          style={{
                            background: lightingOptions[selectedLighting].gradient,
                            color: '#fff',
                          }}
                        >
                          <div className="font-medium mb-1">{lightingOptions[selectedLighting].name}</div>
                          <div className="opacity-80 text-[10px]">{lightingOptions[selectedLighting].keywords}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Advanced Tools Drawer */}
        <motion.div
          className="rounded-2xl border backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.borderColor,
          }}
        >
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" style={{ color: themeColors.accent }} />
              <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                Advanced Tools
              </span>
            </div>
            <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-4">
                  {/* Negative Prompt */}
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: themeColors.textTertiary }}>
                      Negative Prompt (Things to Avoid)
                    </label>
                    <textarea
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="blurry, low quality, distorted, watermark..."
                      rows={2}
                      disabled={settingsLocked}
                      className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: themeColors.inputBackground,
                        border: `1px solid ${themeColors.inputBorder}`,
                        color: themeColors.textPrimary,
                        opacity: settingsLocked ? 0.6 : 1
                      }}
                    />
                    <p className="text-xs mt-1" style={{ color: themeColors.textTertiary }}>
                      Uses {modelConfigs[selectedModel].negativeParam} for {modelConfigs[selectedModel].name}
                    </p>
                  </div>

                  {/* Creative Controls Section */}
                  <div
                    className="p-3 rounded-xl border space-y-4"
                    style={{
                      backgroundColor: themeColors.inputBackground,
                      borderColor: themeColors.borderColor,
                      opacity: creativeControlsEnabled ? 1 : 0.6
                    }}
                  >
                    {/* Toggle Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                          Creative Controls
                        </p>
                        <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                          Add stylize, chaos, CFG params to prompt
                        </p>
                      </div>
                      <button
                        onClick={() => !settingsLocked && setCreativeControlsEnabled(!creativeControlsEnabled)}
                        disabled={settingsLocked}
                        className="relative w-11 h-6 rounded-full transition-colors"
                        style={{
                          backgroundColor: creativeControlsEnabled ? themeColors.accent : themeColors.borderColor,
                          opacity: settingsLocked ? 0.6 : 1
                        }}
                      >
                        <div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                          style={{
                            transform: creativeControlsEnabled ? 'translateX(24px)' : 'translateX(4px)'
                          }}
                        />
                      </button>
                    </div>

                    {/* Sliders */}
                    {creativeControlsEnabled && (
                      <div className="space-y-3 pt-2 border-t" style={{ borderColor: themeColors.borderColor }}>
                        <UniversalSlider
                          label="Creativity"
                          value={creativity}
                          onChange={setCreativity}
                          icon={Sparkles}
                        />
                        <UniversalSlider
                          label="Variation"
                          value={variation}
                          onChange={setVariation}
                          icon={Layers}
                        />
                        <UniversalSlider
                          label="Uniqueness"
                          value={uniqueness}
                          onChange={setUniqueness}
                          icon={Zap}
                        />
                        <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                          Auto-translated to {modelConfigs[selectedModel].name} parameters
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Depth of Field */}
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: themeColors.textTertiary }}>
                      Depth of Field
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {dofOptions.map(dof => {
                        const isBlocked = conflicts.blockedDOF.has(dof.value);
                        return (
                          <button
                            key={dof.value}
                            onClick={() => !settingsLocked && !isBlocked && setDepthOfField(dof.value)}
                            disabled={settingsLocked || isBlocked}
                            className="p-2.5 rounded-lg text-xs text-left transition-all border flex items-center justify-between"
                            style={{
                              backgroundColor: depthOfField === dof.value ? themeColors.promptBg : 'transparent',
                              borderColor: depthOfField === dof.value ? themeColors.accent : themeColors.borderColor,
                              color: themeColors.textPrimary,
                              opacity: (settingsLocked || isBlocked) ? 0.4 : 1
                            }}
                          >
                            <span>{dof.label}</span>
                            {isBlocked && (
                              <AlertTriangle className="w-3 h-3" style={{ color: themeColors.warning }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* User Presets Placeholder */}
                  <div
                    className="p-4 rounded-xl border-2 border-dashed"
                    style={{ borderColor: themeColors.borderColor }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bookmark className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
                      <span className="text-sm font-medium" style={{ color: themeColors.textSecondary }}>
                        User Presets
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{
                        backgroundColor: themeColors.warning + '20',
                        color: themeColors.warning
                      }}>
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                      Save your favorite combinations for quick access
                    </p>
                    {savedPresets.length === 0 && (
                      <button
                        disabled
                        className="mt-3 w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 opacity-50"
                        style={{
                          backgroundColor: themeColors.inputBackground,
                          color: themeColors.textTertiary
                        }}
                      >
                        <Save className="w-3 h-3" />
                        Save Current Settings
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sticky Output Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-xl z-50"
        style={{
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.borderColor,
        }}
      >
        <div className="max-w-[480px] mx-auto p-4">
          {/* Live Preview */}
          <div
            className="rounded-xl p-3 mb-3 overflow-hidden"
            style={{
              backgroundColor: themeColors.promptBg,
              border: `1px solid ${themeColors.borderColor}`,
            }}
          >
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: themeColors.accent }} />
              <p
                className="text-xs font-mono leading-relaxed line-clamp-2"
                style={{ color: themeColors.textPrimary }}
              >
                {generatePrompt()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetAll}
              disabled={settingsLocked}
              className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border"
              style={{
                backgroundColor: 'transparent',
                borderColor: themeColors.borderColor,
                color: themeColors.textSecondary,
                opacity: settingsLocked ? 0.6 : 1
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyToClipboard}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              style={{
                backgroundColor: copied ? themeColors.success : themeColors.accent,
                color: '#fff'
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

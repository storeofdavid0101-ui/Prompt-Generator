/**
 * Camera, lens, shot type, and aspect ratio configurations
 * Comprehensive options for cinematography settings
 */

import type { CameraOption, ShotOption, DOFOption, AspectRatioOption } from './types';

/** Camera category type */
export type CameraCategory = 'consumer' | 'mirrorless' | 'cinema' | 'film' | 'premium' | 'classic' | 'vintage-film' | 'vintage-video' | 'vintage-photo' | 'antique';

/** Extended camera option with category */
export interface CameraOptionWithCategory extends CameraOption {
  category: CameraCategory;
}

// Camera options ordered by popularity with AI-friendly keywords
export const cameraOptions: CameraOptionWithCategory[] = [
  // Popular Consumer & Everyday
  { label: 'iPhone Pro', keywords: 'shot on iPhone, smartphone photography, computational photography', category: 'consumer' },
  { label: 'GoPro', keywords: 'GoPro footage, wide angle, action camera, immersive', category: 'consumer' },
  { label: 'DJI Drone', keywords: 'drone footage, quadcopter camera, sweeping flyover', category: 'consumer' },

  // Modern DSLRs & Mirrorless
  { label: 'Sony A7S III', keywords: 'shot on Sony A7S III, low light specialist, video hybrid', category: 'mirrorless' },
  { label: 'Sony A1', keywords: 'shot on Sony A1, 50 megapixel, flagship mirrorless', category: 'mirrorless' },
  { label: 'Canon R5', keywords: 'shot on Canon R5, mirrorless, high resolution, modern', category: 'mirrorless' },
  { label: 'Canon 5D Mark IV', keywords: 'shot on Canon 5D, full frame DSLR, professional photography', category: 'mirrorless' },
  { label: 'Nikon Z9', keywords: 'shot on Nikon Z9, flagship mirrorless, professional', category: 'mirrorless' },
  { label: 'Nikon D850', keywords: 'shot on Nikon D850, high resolution DSLR, sharp detail', category: 'mirrorless' },

  // Modern Cinema
  { label: 'ARRI Alexa', keywords: 'shot on ARRI Alexa, digital cinema, rich colors, cinematic', category: 'cinema' },
  { label: 'ARRI Alexa Mini', keywords: 'shot on ARRI Alexa Mini, modern cinema, pristine quality', category: 'cinema' },
  { label: 'ARRI Alexa 65', keywords: 'shot on ARRI Alexa 65, large format digital, incredible detail', category: 'cinema' },
  { label: 'RED V-Raptor', keywords: 'shot on RED V-Raptor, 8K cinema, ultra high resolution', category: 'cinema' },
  { label: 'RED Komodo', keywords: 'shot on RED Komodo, 6K digital cinema, sharp, modern', category: 'cinema' },
  { label: 'Sony Venice', keywords: 'shot on Sony Venice, full frame cinema, beautiful color science', category: 'cinema' },
  { label: 'Sony FX9', keywords: 'shot on Sony FX9, documentary cinema, natural colors', category: 'cinema' },
  { label: 'Blackmagic URSA', keywords: 'shot on Blackmagic URSA, digital film, rich dynamic range', category: 'cinema' },
  { label: 'Canon C500', keywords: 'shot on Canon C500, cinema EOS, clean digital', category: 'cinema' },
  { label: 'Canon C70', keywords: 'shot on Canon C70, compact cinema camera, versatile', category: 'cinema' },

  // Classic Film Formats
  { label: '35mm Film', keywords: 'shot on 35mm film, classic cinema look, rich colors, natural grain', category: 'film' },
  { label: '70mm IMAX', keywords: 'shot on 70mm IMAX, massive resolution, stunning clarity, epic cinematography, immersive theatrical', category: 'film' },
  { label: '65mm Film', keywords: 'shot on 65mm film, epic scale, incredible detail, large format cinematography', category: 'film' },

  // Premium Photography
  { label: 'Hasselblad X2D', keywords: 'shot on Hasselblad X2D, 100 megapixel, incredible detail', category: 'premium' },
  { label: 'Hasselblad 500C', keywords: 'shot on Hasselblad 500C, medium format film, square format, classic', category: 'premium' },
  { label: 'Leica M11', keywords: 'shot on Leica M11, full frame digital, Leica color science', category: 'premium' },
  { label: 'Leica M6', keywords: 'shot on Leica M6, 35mm rangefinder, street photography aesthetic', category: 'premium' },
  { label: 'Phase One XF', keywords: 'shot on Phase One, medium format digital, studio quality', category: 'premium' },

  // Classic Cinema Cameras
  { label: 'Panavision Panaflex', keywords: 'shot on Panavision, anamorphic, cinematic, blockbuster quality', category: 'classic' },
  { label: 'Panavision DXL2', keywords: 'shot on Panavision DXL2, large format digital, Hollywood quality', category: 'classic' },
  { label: 'Arriflex 35', keywords: 'shot on Arriflex 35mm, classic Hollywood cinematography', category: 'classic' },
  { label: 'Arriflex 16SR', keywords: 'shot on Arriflex 16SR, documentary style, naturalistic', category: 'classic' },
  { label: 'Mitchell BNC', keywords: 'shot on Mitchell BNC, golden age Hollywood, classic cinema', category: 'classic' },
  { label: 'Bolex H16', keywords: 'shot on Bolex H16, 16mm film, experimental cinema, art film aesthetic', category: 'classic' },

  // Vintage Film Formats
  { label: '16mm Film', keywords: 'shot on 16mm film, organic film grain, indie cinema look, documentary filmmaking aesthetic, newsreel quality, visible grain structure, natural color rendition, art house cinema, reversal film texture, handheld camera feel', category: 'vintage-film' },
  { label: 'Super 16', keywords: 'shot on Super 16mm, wider aspect ratio than standard 16mm, cinematic film grain, 1990s-2000s indie film aesthetic, documentary style, organic texture, blown out to 35mm look, naturalistic lighting, Dogme 95 style', category: 'vintage-film' },
  { label: 'Super 8', keywords: 'shot on Super 8, visible film grain, nostalgic 1970s aesthetic, Kodachrome or Ektachrome colors, mechanical shutter flicker, dust particles, light leaks, soft focus vignette, home movie warmth, film texture, slightly overexposed highlights', category: 'vintage-film' },
  { label: '8mm Film', keywords: 'shot on 8mm film, heavy film grain, vintage home movie, warm Kodachrome tones, light leaks, projector flicker, dust and scratches, narrow gauge film, 1950s-60s aesthetic, faded colors, sprocket artifacts, amateur film look', category: 'vintage-film' },

  // Vintage Video
  { label: 'VHS Camcorder', keywords: 'recorded on VHS camcorder, VHS aesthetic, analog video, scan lines, tracking artifacts, color bleeding, horizontal noise bars, oversaturated reds, interlaced 480i, chromatic aberration, tape degradation, magnetic tape distortion, 1980s home video, CRT television look', category: 'vintage-video' },
  { label: 'MiniDV', keywords: 'recorded on MiniDV camcorder, early digital video, 2000s indie film look, low resolution 480i, soft blurry image, standard definition video still, DV compression artifacts, interlaced video, tape dropout glitches, Y2K era aesthetic, muted washed out colors, color smearing on edges, blocky pixelated compression, crushed blacks, blown highlights, green color cast, low quality video capture, fuzzy details', category: 'vintage-video' },
  { label: 'Hi8', keywords: 'recorded on Hi8 camcorder, consumer analog video, 1990s camcorder aesthetic, warmer colors than VHS, pastel color shift, soft highlights, family vacation footage, S-video quality, late analog era, RGB color fringing on edges, chroma bleed, soft blurry low resolution, interlaced video artifacts', category: 'vintage-video' },
  { label: 'Handycam', keywords: 'recorded on Sony Handycam, consumer camcorder, home video aesthetic, low resolution video, soft blurry image, auto-exposure fluctuations, handheld camera shake, amateur video quality, auto white balance color shifts, washed out colors, video noise in shadows, interlaced artifacts, blown out highlights, consumer video look, 1990s home movie, fuzzy details, Video8 format', category: 'vintage-video' },
  { label: 'Betacam', keywords: 'recorded on Betacam SP, broadcast video, standard definition 480i, soft blurry image, low resolution, blue cyan color cast tint, blown out highlights, hazy lifted blacks, flat low contrast image, faded washed out colors, RGB misregistration, chroma misalignment, old TV news broadcast footage, 1980s-90s video capture, analog tape generation loss, interlace scan lines', category: 'vintage-video' },

  // Niche & Vintage Photography
  { label: 'Polaroid SX-70', keywords: 'Polaroid instant photo, vintage instant film, soft dreamy colors, white border frame, Polaroid color shift, slightly washed out, creamy highlights, soft vignette, 1970s instant photography, square format, imperfect development, warm color cast', category: 'vintage-photo' },
  { label: 'Contax T2', keywords: 'shot on Contax T2, 35mm compact, Zeiss lens, 1990s aesthetic', category: 'vintage-photo' },
  { label: 'Rolleiflex', keywords: 'shot on Rolleiflex TLR, vintage medium format, classic portrait look', category: 'vintage-photo' },
  { label: 'Mamiya RZ67', keywords: 'shot on Mamiya RZ67, medium format, portrait photography, creamy bokeh', category: 'vintage-photo' },
  { label: 'Disposable Camera', keywords: 'shot on disposable camera, harsh direct flash, washed out colors, soft focus, light leaks, film grain, vignette, 90s snapshot, amateur photography, red-eye flash, low contrast, candid moment', category: 'vintage-photo' },

  // Antique & Experimental
  { label: 'Pinhole Camera', keywords: 'pinhole camera photograph, infinite depth of field, very soft ethereal image, heavy vignetting, long exposure motion blur, primitive photography aesthetic, light diffraction, dreamlike quality, experimental photography', category: 'antique' },
  { label: 'Daguerreotype', keywords: 'daguerreotype photograph, 1840s-1850s photography, mirror-like silver plate surface, highly reflective, extreme detail in midtones, sepia and silver tones, formal posed portrait, long exposure stillness, antique brass frame, hand-tinted accents, reversed laterally, earliest photography aesthetic', category: 'antique' },
  { label: 'Tintype', keywords: 'tintype photograph, Civil War era 1860s-1870s aesthetic, dark iron plate, direct positive image, slightly underexposed, matte surface texture, silver nitrate emulsion, hand-held carte de visite, scratched and aged patina, sepia brown tones, ferrotype look', category: 'antique' },
  { label: 'Wet Plate', keywords: 'wet plate collodion photograph, Victorian era 1850s-1880s, hand-poured emulsion imperfections, milky whites, blue-sensitive only, swirly bokeh from period lenses, glass plate negative, chemical drip marks on edges, ultra-sharp central focus, creamy smooth tonal gradations, archival antique look', category: 'antique' },
];

// Camera category display names
export const cameraCategoryNames: Record<CameraCategory, string> = {
  'consumer': 'Consumer & Everyday',
  'mirrorless': 'DSLR & Mirrorless',
  'cinema': 'Modern Cinema',
  'film': 'Film Formats',
  'premium': 'Premium Photography',
  'classic': 'Classic Cinema',
  'vintage-film': 'Vintage Film',
  'vintage-video': 'Vintage Video',
  'vintage-photo': 'Vintage Photography',
  'antique': 'Antique & Experimental',
};

// Group cameras by category
export const camerasByCategory = cameraOptions.reduce((acc, camera) => {
  if (!acc[camera.category]) {
    acc[camera.category] = [];
  }
  acc[camera.category].push(camera);
  return acc;
}, {} as Record<CameraCategory, CameraOptionWithCategory[]>);

// Lens focal length options
export const lensOptions = [
  'Macro', 'Fisheye', '14mm', '18mm', '24mm', '28mm', '35mm', '50mm', '85mm', '135mm', '200mm', '400mm', '600mm'
];

// Shot type options with AI-friendly keywords
export const shotOptions: ShotOption[] = [
  { label: 'Extreme Wide Shot (XWS)', keywords: 'extreme wide shot, establishing shot, vast landscape, tiny subject' },
  { label: 'Wide Shot (WS)', keywords: 'wide shot, full environment visible, subject in context' },
  { label: 'Full Shot', keywords: 'full shot, entire body visible, head to toe framing' },
  { label: 'Medium Wide Shot', keywords: 'medium wide shot, cowboy shot, knees up framing' },
  { label: 'Medium Shot (MS)', keywords: 'medium shot, waist up framing, conversational distance' },
  { label: 'Medium Close-Up (MCU)', keywords: 'medium close-up, chest up framing, emotional connection' },
  { label: 'Close-Up (CU)', keywords: 'close-up shot, face filling frame, intimate portrait' },
  { label: 'Extreme Close-Up (ECU)', keywords: 'extreme close-up, macro detail, eyes or single feature' },
  { label: 'Low Angle', keywords: 'low angle shot, camera looking up, powerful perspective' },
  { label: 'High Angle', keywords: 'high angle shot, camera looking down, vulnerable perspective' },
  { label: 'Dutch Angle', keywords: 'dutch angle, tilted camera, canted frame, disorienting' },
  { label: "Bird's Eye View", keywords: "bird's eye view, top-down shot, overhead perspective, aerial view" },
  { label: 'POV', keywords: 'POV shot, point of view, first person perspective, subjective camera' },
  { label: 'Over the Shoulder (OTS)', keywords: 'over the shoulder shot, OTS, back of head visible, looking at subject' },
];

// Depth of field options
export const dofOptions: DOFOption[] = [
  { value: 'shallow', label: 'Shallow (Bokeh)', keywords: 'shallow depth of field, beautiful bokeh, blurred background, f/1.4' },
  { value: 'normal', label: 'Normal', keywords: '' },
  { value: 'deep', label: 'Deep (All in Focus)', keywords: 'deep depth of field, everything in focus, f/11, sharp throughout' },
  { value: 'tilt-shift', label: 'Tilt-Shift', keywords: 'tilt-shift photography, miniature effect, selective focus' },
];

// Aspect ratio options
export const aspectRatioOptions: AspectRatioOption[] = [
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
export const cameraAspectRatios: Record<string, string[]> = {
  // Vintage Video - mostly 4:3
  'VHS Camcorder': ['4:3'],
  'Betacam': ['4:3', '16:9'],
  'Hi8': ['4:3'],
  'MiniDV': ['4:3', '16:9'],
  'Handycam': ['4:3', '16:9'],
  // Film formats
  '8mm Film': ['4:3', '1.33:1'],
  'Super 8': ['4:3'],
  '16mm Film': ['4:3', '1.66:1'],
  'Super 16': ['1.66:1', '1.85:1'],
  '35mm Film': ['4:3', '16:9', '21:9', '2.39:1'],
  '65mm Film': ['2.2:1', '2.76:1'],
  '70mm IMAX': ['1.43:1', '1.9:1'],
  // Polaroid - square
  'Polaroid SX-70': ['1:1'],
  // Medium format
  'Hasselblad 500C': ['1:1'],
  'Rolleiflex': ['1:1'],
  'Mamiya RZ67': ['4:5', '1:1'],
  // Antique
  'Daguerreotype': ['4:5', '3:4', '1:1'],
  'Tintype': ['4:5', '3:4', '1:1'],
  'Wet Plate': ['4:5', '3:4', '1:1'],
};

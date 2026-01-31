/**
 * Help descriptions for parameter sections
 * Provides user guidance when clicking on section labels
 */

import type { HelpDescription } from './types';

// Re-export the type for convenience
export type { HelpDescription };

export const helpDescriptions: Record<string, HelpDescription> = {
  // Content Section
  subject: {
    title: 'Subject (Main Focus)',
    description: 'The primary focus of your image. Describe the main subject, action, or scene you want to generate.',
    tip: 'Be specific about poses, expressions, and key details for better results.',
  },
  character: {
    title: 'Character Description',
    description: 'Add detailed descriptions for characters in your scene. Each character entry will be formatted properly in the final prompt.',
    tip: 'Press Enter after typing to add multiple characters to your scene.',
  },
  location: {
    title: 'Location',
    description: 'The setting or environment where your scene takes place. Choose from presets or enter a custom location.',
    tip: 'Combine location with atmosphere for more immersive scenes.',
  },
  gaze: {
    title: 'Gaze Direction',
    description: 'Control where your character is looking. This adds natural expression and directs viewer attention.',
    tip: 'Direct eye contact creates connection, looking away adds mystery.',
  },
  pose: {
    title: 'Character Pose/Action',
    description: 'Define the body pose or action state of your character. Adds dynamic energy and cinematic presence.',
    tip: 'Static poses work well for portraits, dynamic poses add movement and energy.',
  },
  position: {
    title: 'Position in Frame',
    description: 'Control where your character appears in the frame. Uses the rule of thirds for balanced composition.',
    tip: 'Off-center positioning (left/right) creates more dynamic, cinematic compositions.',
  },

  // Model & Style
  model: {
    title: 'AI Model',
    description: 'Select which AI image generator you\'re creating prompts for. Each model has different strengths and prompt syntax.',
    tip: 'Midjourney excels at artistic imagery, DALL-E at photorealism, Stable Diffusion at flexibility.',
  },
  director: {
    title: 'Director Style',
    description: 'Apply the visual signature of famous film directors. This affects lighting, composition, color grading, and overall mood.',
    tip: 'Selecting a director may lock certain options to maintain stylistic consistency.',
  },
  atmosphere: {
    title: 'Atmosphere',
    description: 'The overall mood and environmental feel of your scene. Affects lighting, color tones, and emotional impact.',
    tip: 'Atmosphere works best when combined with matching lighting and color palette.',
  },

  // Visual Settings
  colorPalette: {
    title: 'Color Palette',
    description: 'Define the dominant colors in your image. Choose from curated presets or create your own custom palette.',
    tip: 'Use complementary colors for visual impact or analogous colors for harmony.',
  },
  colorGrade: {
    title: 'Color Grade',
    description: 'The technical color treatment and contrast style applied to your image, similar to color grading in film post-production.',
    tip: 'Color grade affects the overall "look" independent of the color palette.',
  },
  colorGrading: {
    title: 'Color Grading',
    description: 'Professional color grading controls inspired by DaVinci Resolve and Premiere Pro. Includes color wheels (Lift/Gamma/Gain) for tonal control, temperature/tint adjustments, and cinematic LUT-style presets.',
    tip: 'Use the "Looks" tab for quick presets, "Wheels" for precise tonal adjustments, and "Adjust" for global controls like contrast and saturation.',
  },
  lighting: {
    title: 'Lighting',
    description: 'The lighting setup for your scene. Choose from classic cinematic techniques, natural lighting, or stylized modern approaches.',
    tip: 'Lighting dramatically impacts mood - dramatic for tension, soft for romance.',
  },

  // Camera Settings
  camera: {
    title: 'Camera & Lens',
    description: 'Technical camera settings that affect how your scene is captured. Different cameras and lenses create distinct visual characteristics.',
    tip: 'Vintage cameras add grain and character, modern cameras offer clarity.',
  },
  cameraType: {
    title: 'Camera Type',
    description: 'The type of camera used to "shoot" your image. Each camera has unique characteristics affecting image quality and style.',
    tip: 'Film cameras add organic texture, digital cameras offer precision.',
  },
  lens: {
    title: 'Lens',
    description: 'The focal length affects perspective and depth. Wide angles capture more scene, telephoto compresses distance.',
    tip: '35mm for environmental portraits, 85mm for flattering close-ups, 200mm for compressed backgrounds.',
  },
  shotType: {
    title: 'Shot Type',
    description: 'The framing and composition of your shot. Determines how much of the subject and environment is visible.',
    tip: 'Close-ups for emotion, wide shots for context, medium shots for balance.',
  },
  aspectRatio: {
    title: 'Aspect Ratio',
    description: 'The proportions of your image. Different ratios suit different purposes and compositions.',
    tip: '16:9 for cinematic, 1:1 for social media, 9:16 for mobile.',
  },

  // Advanced Tools
  negativePrompt: {
    title: 'Negative Prompt',
    description: 'Specify elements you want to exclude from your image. Not all AI models support this feature.',
    tip: 'Common exclusions: blurry, low quality, watermark, extra limbs.',
  },
  creativeControls: {
    title: 'Creative Controls',
    description: 'Fine-tune creativity parameters like stylization, chaos, and uniqueness. Values are auto-translated to each model\'s native parameters.',
    tip: 'Higher creativity = more artistic interpretation, lower = more literal.',
  },
  depthOfField: {
    title: 'Depth of Field',
    description: 'Controls the focus depth in your image. Shallow DOF blurs backgrounds, deep DOF keeps everything sharp.',
    tip: 'Shallow DOF isolates subjects, deep DOF is great for landscapes.',
  },

  // Film Stock
  filmStock: {
    title: 'Film Stock',
    description: 'Emulate the look of classic film stocks from Kodak, Fuji, and CineStill. Includes motion picture, color negative, and slide films with push/pull processing options.',
    tip: 'Kodak Vision3 500T is the Hollywood standard, CineStill 800T adds signature halation around highlights.',
  },

  // Grain Engine
  grainEngine: {
    title: 'Grain Engine',
    description: 'Add authentic film grain and texture effects. Choose between organic silver halide grain or digital sensor noise, with controls for size, intensity, dust/scratches, and film gate weave.',
    tip: 'Combine with Film Stock for authentic period-accurate film simulation, or use alone for texture on digital images.',
  },

  // Lens Physics
  lensPhysics: {
    title: 'Lens Physics',
    description: 'Control optical properties of your virtual lens. Adjust focal length (14-200mm), aperture (f/1.4-f/22), lens distortion, depth of field control, and bokeh shape for precise cinematographic effects.',
    tip: 'Wide apertures (f/1.4-f/2.8) create shallow depth with beautiful bokeh. Anamorphic oval bokeh adds a cinematic widescreen aesthetic.',
  },

  // Advanced Lighting
  advancedLighting: {
    title: 'Advanced Lighting',
    description: 'Professional lighting setup with key/fill/rim positioning, ratios, color temperature, and shadow control. Create classic Hollywood setups like Rembrandt, butterfly, or split lighting.',
    tip: 'Use 4:1 ratio for classic portraits, 8:1 or higher for dramatic noir. Add rim light to separate subject from background.',
  },

  // Composition Engine
  compositionEngine: {
    title: 'Composition Engine',
    description: 'Precise composition control with interactive subject placement, frame occupancy, rule of thirds, vanishing points, and frame balance. Use presets for quick cinematic compositions or fine-tune manually.',
    tip: 'Click directly on the grid to position your subject. Use presets like Golden Ratio or Rule of Thirds for classic compositions.',
  },
};

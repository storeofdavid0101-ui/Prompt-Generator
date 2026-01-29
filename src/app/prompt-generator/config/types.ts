/**
 * Core type definitions for the AI Prompt Generator
 * Defines all interfaces and type aliases used throughout the application
 */

// AI model identifiers supported by the prompt generator
export type AIModel =
  | 'midjourney'
  | 'flux'
  | 'stable-diffusion'
  | 'dalle3'
  | 'chatgpt'
  | 'imagen'
  | 'ideogram'
  | 'leonardo'
  | 'firefly';

// Available atmosphere presets for visual styling
export type Atmosphere =
  | 'cinematic'
  | 'cyberpunk'
  | 'studio'
  | 'moody'
  | 'dreamy'
  | 'natural'
  | 'vintage'
  | 'epic'
  | 'horror'
  | 'romantic';

// Camera categories for conflict detection and lens restrictions
export type CameraCategory =
  | 'vintage-lofi'
  | 'antique'
  | 'classic-film'
  | 'epic-film'
  | 'medium-format-classic'
  | '35mm-classic'
  | 'modern-cinema'
  | 'modern-digital'
  | 'consumer-mobile'
  | 'none';

// Configuration for each AI model's specific parameters
export interface ModelConfig {
  name: string;
  icon: string;
  maxCreativity: number;
  creativityParam: string;
  variationParam: string;
  negativeParam: string;
  aspectParam: string;
  supportsNegativePrompt: boolean;
  promptStyle: 'tags' | 'natural' | 'structured';
}

// Atmosphere preset configuration
export interface AtmosphereConfig {
  name: string;
  keywords: string;
  gradient: string;
  description: string;
}

// Visual style preset configuration
export interface PresetConfig {
  name: string;
  keywords: string;
  gradient: string;
}

// Lighting option configuration
export interface LightingConfig {
  name: string;
  keywords: string;
  category: 'classic' | 'natural' | 'stylized';
  gradient: string;
}

// Color palette configuration
export interface ColorPaletteConfig {
  name: string;
  colors: string[];
}

// Camera option with AI-friendly keywords
export interface CameraOption {
  label: string;
  keywords: string;
}

// Shot type option with AI-friendly keywords
export interface ShotOption {
  label: string;
  keywords: string;
}

// Depth of field option
export interface DOFOption {
  value: string;
  label: string;
  keywords: string;
}

// Aspect ratio option
export interface AspectRatioOption {
  value: string;
  label: string;
  ratio: string;
}

// Director style configuration with conflict rules
export interface DirectorStyle {
  name: string;
  keywords: string;
  blockedAtmospheres: Atmosphere[];
  blockedPresets: string[];
}

// Conflict rules for camera categories
export interface ConflictRules {
  blockedAtmospheres: Atmosphere[];
  blockedPresets: string[];
  blockedDOF: string[];
  fixedLens?: string;
  warningMessage?: string;
}

// Zoom range configuration for cameras with built-in zoom
export interface ZoomRange {
  range: string;
  options: string[];
}

// Character item in the prompt
export interface CharacterItem {
  id: string;
  content: string;
}

// Theme color configuration
export interface ThemeColors {
  background: string;
  cardBackground: string;
  borderColor: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  inputBackground: string;
  inputBorder: string;
  accent: string;
  accentHover: string;
  promptBg: string;
  success: string;
  warning: string;
}

// Conflict detection result
export interface ConflictResult {
  blockedAtmospheres: Set<Atmosphere>;
  blockedPresets: Set<string>;
  blockedDOF: Set<string>;
  blockedCameras: Set<string>;
  activeConflicts: string[];
  warningMessage?: string;
  fixedLens: string | null;
  zoomRange: ZoomRange | null;
  allowedAspectRatios: string[] | null;
}

// Expanded sections state
export interface ExpandedSections {
  model: boolean;
  sliders: boolean;
  atmosphere: boolean;
  visual: boolean;
  color: boolean;
  camera: boolean;
  lighting: boolean;
}

// Main generator state
export interface PromptGeneratorState {
  darkMode: boolean;
  copied: boolean;
  selectedModel: AIModel;
  creativity: number;
  variation: number;
  uniqueness: number;
  subject: string;
  characterItems: CharacterItem[];
  currentCharacter: string;
  location: string;
  selectedAtmosphere: Atmosphere | null;
  selectedVisualPreset: string | null;
  selectedLighting: string | null;
  selectedColorPalette: string | null;
  customColors: string[];
  selectedCamera: string;
  customCamera: string;
  selectedLens: string;
  customLens: string;
  selectedShot: string;
  customShot: string;
  depthOfField: string;
  aspectRatio: string;
  negativePrompt: string;
  settingsLocked: boolean;
  showAdvanced: boolean;
  creativeControlsEnabled: boolean;
  selectedDirector: string;
  expandedSections: ExpandedSections;
}

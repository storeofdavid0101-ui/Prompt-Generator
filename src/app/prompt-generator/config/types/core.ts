/**
 * Core Type Definitions
 *
 * Foundational type definitions for the CinePrompt AI Prompt Generator.
 * Contains AI model identifiers and base utility types.
 *
 * @module config/types/core
 * @version 1.0.0
 */

/**
 * Supported AI model identifiers.
 *
 * Each model has unique parameter handling and prompt formatting requirements.
 * The prompt composer uses these to generate model-optimized outputs.
 *
 * @see {@link ModelConfig} for per-model configuration
 */
export type AIModel =
  | 'chatgpt'
  | 'midjourney'
  | 'nanobanano'
  | 'flux'
  | 'stable-diffusion'
  | 'dalle3'
  | 'imagen'
  | 'ideogram'
  | 'leonardo'
  | 'firefly';

/**
 * Prompt output style formats.
 *
 * Different AI models expect different prompt structures:
 * - `tags`: Comma-separated keywords (Midjourney, Stable Diffusion)
 * - `natural`: Flowing prose descriptions (ChatGPT, DALL-E 3)
 * - `structured`: Formatted with explicit parameters (Flux, Leonardo)
 */
export type PromptStyle = 'tags' | 'natural' | 'structured';

/**
 * Configuration interface for each AI model.
 *
 * Defines model-specific parameters, capabilities, and prompt formatting rules.
 * Used by the prompt composer to generate optimized outputs.
 */
export interface ModelConfig {
  /** Display name for the model */
  readonly name: string;

  /** Icon identifier for UI rendering */
  readonly icon: string;

  /** Maximum creativity/chaos value (typically 0-100) */
  readonly maxCreativity: number;

  /** Model-specific creativity parameter name (e.g., '--chaos', 'cfg_scale') */
  readonly creativityParam: string;

  /** Model-specific variation/seed parameter name */
  readonly variationParam: string;

  /** Model-specific negative prompt parameter name */
  readonly negativeParam: string;

  /** Model-specific aspect ratio parameter name */
  readonly aspectParam: string;

  /** Whether the model supports negative prompts */
  readonly supportsNegativePrompt: boolean;

  /** Prompt formatting style for this model */
  readonly promptStyle: PromptStyle;

  /**
   * Whether the model has strict content policies (like ChatGPT/DALL-E).
   * When true, uses safe alternatives for director styles, atmospheres,
   * magic subjects, and filters problematic combinations.
   */
  readonly strictContentPolicy?: boolean;
}

/**
 * Theme color configuration interface.
 *
 * Defines the complete color palette for light/dark mode theming.
 * All colors should be valid CSS color values.
 */
export interface ThemeColors {
  /** Main background color */
  readonly background: string;

  /** Card/panel background color */
  readonly cardBackground: string;

  /** Border color for containers */
  readonly borderColor: string;

  /** Primary text color */
  readonly textPrimary: string;

  /** Secondary/muted text color */
  readonly textSecondary: string;

  /** Tertiary/disabled text color */
  readonly textTertiary: string;

  /** Input field background color */
  readonly inputBackground: string;

  /** Input field border color */
  readonly inputBorder: string;

  /** Primary accent color */
  readonly accent: string;

  /** Accent color on hover state */
  readonly accentHover: string;

  /** Prompt output area background */
  readonly promptBg: string;

  /** Success state color */
  readonly success: string;

  /** Warning state color */
  readonly warning: string;
}

/**
 * Character item for multi-character prompts.
 *
 * Represents a single character/subject entry in the character list.
 */
export interface CharacterItem {
  /** Unique identifier for React key prop */
  readonly id: string;

  /** Character description content */
  readonly content: string;
}

/**
 * Help tooltip content structure.
 *
 * Provides contextual help information for UI labels and settings.
 */
export interface HelpDescription {
  /** Tooltip header/title */
  readonly title: string;

  /** Main descriptive content */
  readonly description: string;

  /** Optional pro tip or additional guidance */
  readonly tip?: string;
}

/**
 * Film Stock Type Definitions
 *
 * Types for film stock emulation settings.
 *
 * @module config/types/filmStock
 */

/**
 * Film stock category types.
 */
export type FilmStockCategory = 'negative' | 'reversal' | 'motion-picture' | 'specialty';

/**
 * Processing type options.
 */
export type ProcessingType = 'standard' | 'cross-process' | 'bleach-bypass';

/**
 * Push/pull processing values.
 */
export type PushPullValue = -2 | -1 | 0 | 1 | 2;

/**
 * Film stock color balance types.
 */
export type ColorBalance = 'daylight' | 'tungsten';

/**
 * Film stock preset configuration.
 */
export interface FilmStockPreset {
  /** Unique identifier */
  readonly id: string;

  /** Display name */
  readonly name: string;

  /** Manufacturer (Kodak, Fuji, Cinestill, etc.) */
  readonly manufacturer: string;

  /** Category of film stock */
  readonly category: FilmStockCategory;

  /** ISO rating */
  readonly iso: number;

  /** Color balance */
  readonly colorBalance: ColorBalance;

  /** Keywords for prompt generation */
  readonly keywords: string;

  /** Safe keywords for strict content policy models */
  readonly safeKeywords?: string;

  /** Gradient colors for visual display */
  readonly gradient: string;

  /** Characteristic description */
  readonly characteristics: string;
}

/**
 * Film stock state interface.
 */
export interface FilmStockState {
  /** Whether film stock emulation is enabled */
  readonly enabled: boolean;

  /** Selected film stock preset ID */
  readonly selectedStock: string | null;

  /** Push/pull processing value */
  readonly pushPull: PushPullValue;

  /** Processing type */
  readonly processingType: ProcessingType;
}

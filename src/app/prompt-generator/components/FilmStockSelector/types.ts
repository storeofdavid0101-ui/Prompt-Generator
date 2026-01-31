/**
 * FilmStockSelector Component Types
 *
 * @module components/FilmStockSelector/types
 */

import type { ThemeColors } from '../../config/types';
import type { FilmStockStateReturn } from '../../hooks/state/types/filmStock.types';

/**
 * Props for the FilmStockSelector component.
 */
export interface FilmStockSelectorProps {
  /** Film stock state from hook */
  readonly state: FilmStockStateReturn;

  /** Whether the section is expanded */
  readonly isExpanded: boolean;

  /** Whether the section is locked */
  readonly isLocked: boolean;

  /** Callback to toggle lock */
  readonly onToggleLock: () => void;

  /** Callback to toggle section expansion */
  readonly onToggleSection: (key: string) => void;

  /** Theme colors for styling */
  readonly themeColors: ThemeColors;

  /** Optional randomize callback */
  readonly onRandomize?: () => void;
}

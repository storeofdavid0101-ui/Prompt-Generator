/**
 * Film Stock Prompt Builder
 *
 * Resolves film stock state to prompt keywords.
 *
 * @module utils/promptBuilder/filmStockBuilder
 */

import type { FilmStockState, PushPullValue, ProcessingType } from '../../config/types/filmStock';
import { filmStockPresets } from '../../config/filmStock';

/**
 * Resolves film stock state to prompt keywords.
 *
 * @param state - Film stock state
 * @param useSafeMode - Whether to use safe keywords
 * @returns Film stock keywords or null if disabled
 */
export function resolveFilmStock(
  state: FilmStockState,
  useSafeMode: boolean = false
): string | null {
  if (!state.enabled || !state.selectedStock) {
    return null;
  }

  const preset = filmStockPresets[state.selectedStock];
  if (!preset) {
    return null;
  }

  const parts: string[] = [];

  // Base stock keywords
  const stockKeywords = useSafeMode && preset.safeKeywords
    ? preset.safeKeywords
    : preset.keywords;
  parts.push(stockKeywords);

  // Push/pull processing
  if (state.pushPull !== 0) {
    const pushPullText = getPushPullText(state.pushPull);
    parts.push(pushPullText);
  }

  // Processing type (only if not standard)
  if (state.processingType !== 'standard') {
    const processingText = getProcessingText(state.processingType);
    parts.push(processingText);
  }

  return parts.join(', ');
}

/**
 * Gets descriptive text for push/pull value.
 */
function getPushPullText(value: PushPullValue): string {
  switch (value) {
    case -2:
      return 'pulled 2 stops for softer contrast and finer grain';
    case -1:
      return 'pulled 1 stop for slightly reduced contrast';
    case 1:
      return 'pushed 1 stop for increased grain and contrast';
    case 2:
      return 'pushed 2 stops for heavy grain and high contrast';
    default:
      return '';
  }
}

/**
 * Gets descriptive text for processing type.
 */
function getProcessingText(type: ProcessingType): string {
  switch (type) {
    case 'cross-process':
      return 'cross-processed for unusual color shifts and increased saturation';
    case 'bleach-bypass':
      return 'bleach bypass processing for desaturated look with retained silver and high contrast';
    default:
      return '';
  }
}

/**
 * Builds machine-readable film stock output.
 *
 * @param state - Film stock state
 * @returns Machine-readable film stock string
 */
export function buildFilmStockMachineOutput(state: FilmStockState): string | null {
  if (!state.enabled || !state.selectedStock) {
    return null;
  }

  const preset = filmStockPresets[state.selectedStock];
  if (!preset) {
    return null;
  }

  const parts: string[] = [
    `stock: ${preset.name}`,
    `iso: ${preset.iso}`,
    `balance: ${preset.colorBalance}`,
  ];

  if (state.pushPull !== 0) {
    parts.push(`push: ${state.pushPull > 0 ? '+' : ''}${state.pushPull}`);
  }

  if (state.processingType !== 'standard') {
    parts.push(`processing: ${state.processingType}`);
  }

  return parts.join('; ');
}

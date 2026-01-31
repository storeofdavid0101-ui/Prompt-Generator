/**
 * Film Stock State Hook
 *
 * Manages film stock emulation state.
 *
 * @module hooks/state/useFilmStockState
 */

import { useState, useCallback } from 'react';
import type { PushPullValue, ProcessingType } from '../../config/types/filmStock';
import type { FilmStockStateReturn } from './types/filmStock.types';
import { FILM_STOCK_DEFAULTS } from '../../config/filmStock';

/**
 * Hook for managing film stock state.
 *
 * @returns Film stock state and handlers
 */
export function useFilmStockState(): FilmStockStateReturn {
  const [enabled, setEnabledInternal] = useState(FILM_STOCK_DEFAULTS.enabled);
  const [selectedStock, setSelectedStockInternal] = useState<string | null>(FILM_STOCK_DEFAULTS.selectedStock);
  const [pushPull, setPushPullInternal] = useState<PushPullValue>(FILM_STOCK_DEFAULTS.pushPull);
  const [processingType, setProcessingTypeInternal] = useState<ProcessingType>(FILM_STOCK_DEFAULTS.processingType);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledInternal(value);
  }, []);

  const setSelectedStock = useCallback((stock: string | null) => {
    setSelectedStockInternal(stock);
    // Auto-enable when selecting a stock
    if (stock) {
      setEnabledInternal(true);
    }
  }, []);

  const setPushPull = useCallback((value: PushPullValue) => {
    setPushPullInternal(value);
  }, []);

  const setProcessingType = useCallback((type: ProcessingType) => {
    setProcessingTypeInternal(type);
  }, []);

  const reset = useCallback(() => {
    setEnabledInternal(FILM_STOCK_DEFAULTS.enabled);
    setSelectedStockInternal(FILM_STOCK_DEFAULTS.selectedStock);
    setPushPullInternal(FILM_STOCK_DEFAULTS.pushPull);
    setProcessingTypeInternal(FILM_STOCK_DEFAULTS.processingType);
  }, []);

  return {
    enabled,
    setEnabled,
    selectedStock,
    setSelectedStock,
    pushPull,
    setPushPull,
    processingType,
    setProcessingType,
    reset,
  };
}

/**
 * FilmStockSelector Component
 *
 * Allows users to select film stock emulation presets
 * and configure push/pull processing.
 *
 * @module components/FilmStockSelector
 */

'use client';

import { memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, ChevronDown } from 'lucide-react';
import type { FilmStockSelectorProps } from './types';
import {
  filmStockPresets,
  filmStockCategoryNames,
  pushPullOptions,
  processingTypeOptions,
} from '../../config/filmStock';
import type { FilmStockCategory, PushPullValue, ProcessingType } from '../../config/types/filmStock';
import { SectionHeader } from '../ui';
import { helpDescriptions } from '../../config/helpDescriptions';

const SECTION_KEY = 'filmStock';

const contentVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
};

/**
 * FilmStockSelector component for film emulation settings.
 */
export const FilmStockSelector = memo(function FilmStockSelector({
  state,
  isExpanded,
  isLocked,
  onToggleLock,
  onToggleSection,
  themeColors,
  onRandomize,
}: FilmStockSelectorProps) {
  const styles = useMemo(
    () => ({
      container: {
        padding: '12px 0',
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        marginBottom: '16px',
      },
      stockButton: {
        padding: '10px',
        borderRadius: '8px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        textAlign: 'left' as const,
        transition: 'all 0.15s ease',
      },
      stockButtonSelected: {
        borderColor: themeColors.accent,
        backgroundColor: `${themeColors.accent}15`,
      },
      stockName: {
        fontSize: '12px',
        fontWeight: 600,
        color: themeColors.textPrimary,
        marginBottom: '2px',
      },
      stockInfo: {
        fontSize: '10px',
        color: themeColors.textSecondary,
      },
      stockGradient: {
        width: '100%',
        height: '4px',
        borderRadius: '2px',
        marginTop: '6px',
      },
      controlsSection: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap' as const,
      },
      controlGroup: {
        flex: '1 1 auto',
        minWidth: '140px',
      },
      label: {
        fontSize: '11px',
        fontWeight: 500,
        color: themeColors.textSecondary,
        marginBottom: '6px',
        display: 'block',
      },
      select: {
        width: '100%',
        padding: '8px 10px',
        borderRadius: '6px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        color: themeColors.textPrimary,
        fontSize: '12px',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.6 : 1,
      },
      categoryLabel: {
        fontSize: '10px',
        fontWeight: 600,
        color: themeColors.textSecondary,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
        marginTop: '12px',
        marginBottom: '8px',
        paddingBottom: '4px',
        borderBottom: `1px solid ${themeColors.borderColor}`,
      },
    }),
    [themeColors, isLocked]
  );

  const handleToggleSection = useCallback(() => {
    onToggleSection(SECTION_KEY);
  }, [onToggleSection]);

  const handleStockSelect = useCallback(
    (stockId: string) => {
      if (isLocked) return;
      state.setSelectedStock(state.selectedStock === stockId ? null : stockId);
    },
    [isLocked, state]
  );

  const handlePushPullChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (isLocked) return;
      state.setPushPull(parseInt(e.target.value, 10) as PushPullValue);
    },
    [isLocked, state]
  );

  const handleProcessingChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (isLocked) return;
      state.setProcessingType(e.target.value as ProcessingType);
    },
    [isLocked, state]
  );

  // Group stocks by category
  const stocksByCategory = useMemo(() => {
    const grouped: Record<FilmStockCategory, typeof filmStockPresets[string][]> = {
      'motion-picture': [],
      negative: [],
      reversal: [],
      specialty: [],
    };

    Object.values(filmStockPresets).forEach((stock) => {
      grouped[stock.category].push(stock);
    });

    return grouped;
  }, []);

  // Get selected stock name for badge
  const selectedStockName = state.selectedStock
    ? filmStockPresets[state.selectedStock]?.name
    : undefined;

  return (
    <div style={styles.container}>
      <SectionHeader
        title="Film Stock"
        icon={Film}
        sectionKey={SECTION_KEY}
        badge={selectedStockName}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.filmStock}
        onToggle={handleToggleSection}
        onToggleLock={onToggleLock}
        onRandomize={onRandomize}
        themeColors={themeColors}
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '12px' }}>
              {/* Film stock presets by category */}
              {(Object.entries(stocksByCategory) as [FilmStockCategory, typeof filmStockPresets[string][]][]).map(
                ([category, stocks]) => {
                  if (stocks.length === 0) return null;

                  return (
                    <div key={category}>
                      <div style={styles.categoryLabel}>
                        {filmStockCategoryNames[category]}
                      </div>
                      <div style={styles.grid}>
                        {stocks.map((stock) => {
                          const isSelected = state.selectedStock === stock.id;
                          return (
                            <motion.button
                              key={stock.id}
                              type="button"
                              onClick={() => handleStockSelect(stock.id)}
                              disabled={isLocked}
                              style={{
                                ...styles.stockButton,
                                ...(isSelected ? styles.stockButtonSelected : {}),
                                opacity: isLocked ? 0.6 : 1,
                              }}
                              whileHover={!isLocked ? { scale: 1.02 } : {}}
                              whileTap={!isLocked ? { scale: 0.98 } : {}}
                            >
                              <div style={styles.stockName}>{stock.name}</div>
                              <div style={styles.stockInfo}>
                                {stock.manufacturer} · ISO {stock.iso}
                              </div>
                              <div
                                style={{
                                  ...styles.stockGradient,
                                  background: stock.gradient,
                                }}
                              />
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              )}

              {/* Processing controls */}
              {state.selectedStock && (
                <div style={styles.controlsSection}>
                  <div style={styles.controlGroup}>
                    <label style={styles.label}>Push/Pull</label>
                    <select
                      value={state.pushPull}
                      onChange={handlePushPullChange}
                      disabled={isLocked}
                      style={styles.select}
                    >
                      {pushPullOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label} - {opt.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.controlGroup}>
                    <label style={styles.label}>Processing</label>
                    <select
                      value={state.processingType}
                      onChange={handleProcessingChange}
                      disabled={isLocked}
                      style={styles.select}
                    >
                      {processingTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FilmStockSelector.displayName = 'FilmStockSelector';

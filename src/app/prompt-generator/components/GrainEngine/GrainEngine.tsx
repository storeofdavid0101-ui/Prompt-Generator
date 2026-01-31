/**
 * GrainEngine Component
 *
 * Controls for film grain and texture emulation.
 *
 * @module components/GrainEngine
 */

'use client';

import { memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { GrainEngineProps } from './types';
import type { GrainType, GrainSize } from '../../config/types/grainEngine';
import { grainTypePresets, grainSizePresets } from '../../config/grainEngine';
import { SectionHeader } from '../ui';
import { helpDescriptions } from '../../config/helpDescriptions';

const SECTION_KEY = 'grainEngine';

const contentVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
};

/**
 * GrainEngine component for film grain emulation settings.
 */
export const GrainEngine = memo(function GrainEngine({
  state,
  isExpanded,
  isLocked,
  onToggleLock,
  onToggleSection,
  themeColors,
  onRandomize,
}: GrainEngineProps) {
  const styles = useMemo(
    () => ({
      container: {
        padding: '12px 0',
      },
      typeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        marginBottom: '16px',
      },
      typeButton: {
        padding: '10px 8px',
        borderRadius: '8px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        textAlign: 'center' as const,
        transition: 'all 0.15s ease',
      },
      typeButtonSelected: {
        borderColor: themeColors.accent,
        backgroundColor: `${themeColors.accent}15`,
      },
      typeName: {
        fontSize: '12px',
        fontWeight: 600,
        color: themeColors.textPrimary,
        marginBottom: '2px',
      },
      typeDesc: {
        fontSize: '9px',
        color: themeColors.textSecondary,
        lineHeight: 1.3,
      },
      sizeGroup: {
        marginBottom: '16px',
      },
      label: {
        fontSize: '11px',
        fontWeight: 500,
        color: themeColors.textSecondary,
        marginBottom: '8px',
        display: 'block',
      },
      sizeButtons: {
        display: 'flex',
        gap: '8px',
      },
      sizeButton: {
        flex: 1,
        padding: '8px',
        borderRadius: '6px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        fontSize: '11px',
        fontWeight: 500,
        color: themeColors.textPrimary,
        transition: 'all 0.15s ease',
      },
      sizeButtonSelected: {
        borderColor: themeColors.accent,
        backgroundColor: `${themeColors.accent}15`,
      },
      sliderGroup: {
        marginBottom: '16px',
      },
      sliderHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
      },
      sliderValue: {
        fontSize: '11px',
        fontWeight: 600,
        color: themeColors.accent,
      },
      slider: {
        width: '100%',
        height: '6px',
        borderRadius: '3px',
        backgroundColor: themeColors.borderColor,
        appearance: 'none' as const,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        WebkitAppearance: 'none' as const,
      },
      toggleRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderTop: `1px solid ${themeColors.borderColor}`,
      },
      toggleLabel: {
        fontSize: '12px',
        color: themeColors.textPrimary,
      },
      toggleDesc: {
        fontSize: '10px',
        color: themeColors.textSecondary,
        marginTop: '2px',
      },
      toggle: {
        position: 'relative' as const,
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s ease',
      },
      toggleKnob: {
        position: 'absolute' as const,
        top: '2px',
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      },
      dustIntensityRow: {
        marginTop: '12px',
        paddingLeft: '16px',
      },
    }),
    [themeColors, isLocked]
  );

  const handleToggleSection = useCallback(() => {
    onToggleSection(SECTION_KEY);
  }, [onToggleSection]);

  const handleTypeSelect = useCallback(
    (type: GrainType) => {
      if (isLocked) return;
      state.setGrainType(type);
    },
    [isLocked, state]
  );

  const handleSizeSelect = useCallback(
    (size: GrainSize) => {
      if (isLocked) return;
      state.setGrainSize(size);
    },
    [isLocked, state]
  );

  const handleIntensityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      state.setIntensity(parseInt(e.target.value, 10));
    },
    [isLocked, state]
  );

  const handleDustToggle = useCallback(() => {
    if (isLocked) return;
    state.setDustScratchesEnabled(!state.dustScratches.enabled);
  }, [isLocked, state]);

  const handleDustIntensityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      state.setDustScratchesIntensity(parseInt(e.target.value, 10));
    },
    [isLocked, state]
  );

  const handleGateWeaveToggle = useCallback(() => {
    if (isLocked) return;
    state.setGateWeave(!state.gateWeave);
  }, [isLocked, state]);

  // Badge showing current grain type
  const badge = state.enabled && state.grainType !== 'none'
    ? grainTypePresets[state.grainType].name
    : undefined;

  return (
    <div style={styles.container}>
      <SectionHeader
        title="Grain Engine"
        icon={Sparkles}
        sectionKey={SECTION_KEY}
        badge={badge}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.grainEngine}
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
              {/* Grain Type Selection */}
              <div style={styles.label}>Grain Type</div>
              <div style={styles.typeGrid}>
                {Object.values(grainTypePresets).map((preset) => {
                  const isSelected = state.grainType === preset.id;
                  return (
                    <motion.button
                      key={preset.id}
                      type="button"
                      onClick={() => handleTypeSelect(preset.id)}
                      disabled={isLocked}
                      style={{
                        ...styles.typeButton,
                        ...(isSelected ? styles.typeButtonSelected : {}),
                        opacity: isLocked ? 0.6 : 1,
                      }}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                    >
                      <div style={styles.typeName}>{preset.name}</div>
                      <div style={styles.typeDesc}>{preset.description}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Only show controls if grain type is not 'none' */}
              {state.grainType !== 'none' && (
                <>
                  {/* Grain Size */}
                  <div style={styles.sizeGroup}>
                    <div style={styles.label}>Grain Size</div>
                    <div style={styles.sizeButtons}>
                      {Object.values(grainSizePresets).map((preset) => {
                        const isSelected = state.grainSize === preset.id;
                        return (
                          <motion.button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSizeSelect(preset.id)}
                            disabled={isLocked}
                            style={{
                              ...styles.sizeButton,
                              ...(isSelected ? styles.sizeButtonSelected : {}),
                              opacity: isLocked ? 0.6 : 1,
                            }}
                            whileHover={!isLocked ? { scale: 1.02 } : {}}
                            whileTap={!isLocked ? { scale: 0.98 } : {}}
                          >
                            {preset.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Intensity Slider */}
                  <div style={styles.sliderGroup}>
                    <div style={styles.sliderHeader}>
                      <span style={styles.label}>Intensity</span>
                      <span style={styles.sliderValue}>{state.intensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={state.intensity}
                      onChange={handleIntensityChange}
                      disabled={isLocked}
                      style={{
                        ...styles.slider,
                        opacity: isLocked ? 0.6 : 1,
                      }}
                    />
                  </div>

                  {/* Dust & Scratches Toggle */}
                  <div style={styles.toggleRow}>
                    <div>
                      <div style={styles.toggleLabel}>Dust & Scratches</div>
                      <div style={styles.toggleDesc}>Add vintage wear artifacts</div>
                    </div>
                    <div
                      onClick={handleDustToggle}
                      style={{
                        ...styles.toggle,
                        backgroundColor: state.dustScratches.enabled
                          ? themeColors.accent
                          : themeColors.borderColor,
                        opacity: isLocked ? 0.6 : 1,
                      }}
                    >
                      <div
                        style={{
                          ...styles.toggleKnob,
                          left: state.dustScratches.enabled ? '20px' : '2px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Dust Intensity (only when enabled) */}
                  {state.dustScratches.enabled && (
                    <div style={styles.dustIntensityRow}>
                      <div style={styles.sliderHeader}>
                        <span style={styles.label}>Dust Intensity</span>
                        <span style={styles.sliderValue}>{state.dustScratches.intensity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={state.dustScratches.intensity}
                        onChange={handleDustIntensityChange}
                        disabled={isLocked}
                        style={{
                          ...styles.slider,
                          opacity: isLocked ? 0.6 : 1,
                        }}
                      />
                    </div>
                  )}

                  {/* Gate Weave Toggle */}
                  <div style={styles.toggleRow}>
                    <div>
                      <div style={styles.toggleLabel}>Gate Weave</div>
                      <div style={styles.toggleDesc}>Film projector frame instability</div>
                    </div>
                    <div
                      onClick={handleGateWeaveToggle}
                      style={{
                        ...styles.toggle,
                        backgroundColor: state.gateWeave
                          ? themeColors.accent
                          : themeColors.borderColor,
                        opacity: isLocked ? 0.6 : 1,
                      }}
                    >
                      <div
                        style={{
                          ...styles.toggleKnob,
                          left: state.gateWeave ? '20px' : '2px',
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

GrainEngine.displayName = 'GrainEngine';

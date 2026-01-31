/**
 * AdvancedLighting Component
 *
 * Professional lighting controls panel with key/fill/rim positioning,
 * ratios, color temperature, and shadow control.
 *
 * @module components/AdvancedLighting
 */

'use client';

import { memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { SectionHeader } from '../ui';
import { helpDescriptions } from '../../config/helpDescriptions';
import type { AdvancedLightingProps } from './types';
import type { KeyLightPosition, KeyFillRatio, LightQuality, RimLightPosition } from '../../config/types/advancedLighting';
import {
  keyLightPositionPresets,
  keyFillRatioPresets,
  lightQualityPresets,
} from '../../config/advancedLighting';

const SECTION_KEY = 'advancedLighting';

const contentVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
};

/**
 * Main AdvancedLighting component
 */
export const AdvancedLighting = memo(function AdvancedLighting({
  state,
  isExpanded,
  isLocked,
  onToggleLock,
  onToggleSection,
  themeColors,
  onRandomize,
}: AdvancedLightingProps) {
  const keyPositions: KeyLightPosition[] = [
    'front-left', 'front', 'front-right',
    'side-left', 'top', 'side-right',
    'back', 'under',
  ];

  const ratios: KeyFillRatio[] = ['1:1', '2:1', '4:1', '8:1', '16:1'];
  const qualities: LightQuality[] = ['hard', 'soft', 'diffused'];
  const rimPositions: RimLightPosition[] = ['left', 'right', 'both'];

  const styles = useMemo(
    () => ({
      container: {
        padding: '12px 0',
      },
      label: {
        fontSize: '11px',
        fontWeight: 500,
        color: themeColors.textSecondary,
        marginBottom: '8px',
        display: 'block',
      },
      positionGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        marginBottom: '16px',
      },
      positionButton: {
        padding: '8px 6px',
        borderRadius: '6px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        fontSize: '10px',
        fontWeight: 500,
        color: themeColors.textPrimary,
        transition: 'all 0.15s ease',
        textAlign: 'center' as const,
      },
      positionButtonSelected: {
        borderColor: themeColors.accent,
        backgroundColor: `${themeColors.accent}15`,
      },
      buttonRow: {
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
      },
      optionButton: {
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
      optionButtonSelected: {
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
        fontFamily: 'monospace',
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
      sliderLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '9px',
        color: themeColors.textTertiary,
        marginTop: '4px',
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
      rimPositionRow: {
        marginTop: '12px',
        paddingLeft: '16px',
      },
      previewBar: {
        padding: '8px 12px',
        borderRadius: '6px',
        backgroundColor: themeColors.inputBackground,
        fontSize: '11px',
        color: themeColors.textSecondary,
        marginTop: '8px',
      },
    }),
    [themeColors, isLocked]
  );

  const handleToggleSection = useCallback(() => {
    onToggleSection(SECTION_KEY);
  }, [onToggleSection]);

  const handleKeyLightPosition = useCallback(
    (pos: KeyLightPosition) => {
      if (isLocked) return;
      state.setKeyLightPosition(pos);
    },
    [isLocked, state]
  );

  const handleKeyFillRatio = useCallback(
    (ratio: KeyFillRatio) => {
      if (isLocked) return;
      state.setKeyFillRatio(ratio);
    },
    [isLocked, state]
  );

  const handleLightQuality = useCallback(
    (quality: LightQuality) => {
      if (isLocked) return;
      state.setLightQuality(quality);
    },
    [isLocked, state]
  );

  const handleColorTemperature = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      state.setColorTemperature(parseInt(e.target.value, 10));
    },
    [isLocked, state]
  );

  const handleShadowStop = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      state.setShadowStop(parseFloat(e.target.value));
    },
    [isLocked, state]
  );

  const handleRimLightToggle = useCallback(() => {
    if (isLocked) return;
    state.setRimLightEnabled(!state.rimLight.enabled);
  }, [isLocked, state]);

  const handleRimLightPosition = useCallback(
    (pos: RimLightPosition) => {
      if (isLocked) return;
      state.setRimLightPosition(pos);
    },
    [isLocked, state]
  );

  // Badge showing current setup
  const badge = state.enabled
    ? `${keyLightPositionPresets[state.keyLightPosition].name} ${state.keyFillRatio}`
    : undefined;

  return (
    <div style={styles.container}>
      <SectionHeader
        title="Advanced Lighting"
        icon={Lightbulb}
        sectionKey={SECTION_KEY}
        badge={badge}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.advancedLighting}
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
              {/* Key Light Position Grid */}
              <div style={styles.label}>Key Light Position</div>
              <div style={styles.positionGrid}>
                {keyPositions.map((pos) => {
                  const isSelected = state.keyLightPosition === pos;
                  const preset = keyLightPositionPresets[pos];
                  return (
                    <motion.button
                      key={pos}
                      type="button"
                      title={preset.description}
                      onClick={() => handleKeyLightPosition(pos)}
                      disabled={isLocked}
                      style={{
                        ...styles.positionButton,
                        ...(isSelected ? styles.positionButtonSelected : {}),
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

              {/* Key:Fill Ratio */}
              <div style={styles.label}>Key:Fill Ratio</div>
              <div style={styles.buttonRow}>
                {ratios.map((ratio) => {
                  const isSelected = state.keyFillRatio === ratio;
                  const preset = keyFillRatioPresets[ratio];
                  return (
                    <motion.button
                      key={ratio}
                      type="button"
                      title={preset.description}
                      onClick={() => handleKeyFillRatio(ratio)}
                      disabled={isLocked}
                      style={{
                        ...styles.optionButton,
                        ...(isSelected ? styles.optionButtonSelected : {}),
                        opacity: isLocked ? 0.6 : 1,
                      }}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                    >
                      {ratio}
                    </motion.button>
                  );
                })}
              </div>

              {/* Light Quality */}
              <div style={styles.label}>Light Quality</div>
              <div style={styles.buttonRow}>
                {qualities.map((quality) => {
                  const isSelected = state.lightQuality === quality;
                  const preset = lightQualityPresets[quality];
                  return (
                    <motion.button
                      key={quality}
                      type="button"
                      title={preset.description}
                      onClick={() => handleLightQuality(quality)}
                      disabled={isLocked}
                      style={{
                        ...styles.optionButton,
                        ...(isSelected ? styles.optionButtonSelected : {}),
                        opacity: isLocked ? 0.6 : 1,
                        textTransform: 'capitalize',
                      }}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                    >
                      {quality}
                    </motion.button>
                  );
                })}
              </div>

              {/* Color Temperature Slider */}
              <div style={styles.sliderGroup}>
                <div style={styles.sliderHeader}>
                  <span style={styles.label}>Color Temperature</span>
                  <span style={styles.sliderValue}>{state.colorTemperature}K</span>
                </div>
                <input
                  type="range"
                  min="2700"
                  max="7500"
                  step="100"
                  value={state.colorTemperature}
                  onChange={handleColorTemperature}
                  disabled={isLocked}
                  style={{
                    ...styles.slider,
                    background: 'linear-gradient(to right, #ff9500, #fff5e0, #e0f0ff, #87ceeb)',
                    opacity: isLocked ? 0.6 : 1,
                  }}
                />
                <div style={styles.sliderLabels}>
                  <span>Warm</span>
                  <span>Daylight</span>
                  <span>Cool</span>
                </div>
              </div>

              {/* Shadow Density Slider */}
              <div style={styles.sliderGroup}>
                <div style={styles.sliderHeader}>
                  <span style={styles.label}>Shadow Density</span>
                  <span style={styles.sliderValue}>
                    {state.shadowStop > 0 ? '+' : ''}{state.shadowStop} stop
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="1"
                  step="0.5"
                  value={state.shadowStop}
                  onChange={handleShadowStop}
                  disabled={isLocked}
                  style={{
                    ...styles.slider,
                    background: 'linear-gradient(to right, #1a1a1a, #666)',
                    opacity: isLocked ? 0.6 : 1,
                  }}
                />
                <div style={styles.sliderLabels}>
                  <span>Crushed</span>
                  <span>Natural</span>
                  <span>Lifted</span>
                </div>
              </div>

              {/* Rim Light Toggle */}
              <div style={styles.toggleRow}>
                <div>
                  <div style={styles.toggleLabel}>Rim Light</div>
                </div>
                <div
                  onClick={handleRimLightToggle}
                  style={{
                    ...styles.toggle,
                    backgroundColor: state.rimLight.enabled
                      ? themeColors.accent
                      : themeColors.borderColor,
                    opacity: isLocked ? 0.6 : 1,
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleKnob,
                      left: state.rimLight.enabled ? '20px' : '2px',
                    }}
                  />
                </div>
              </div>

              {/* Rim Light Position (only when enabled) */}
              {state.rimLight.enabled && (
                <div style={styles.rimPositionRow}>
                  <div style={styles.label}>Rim Position</div>
                  <div style={styles.buttonRow}>
                    {rimPositions.map((pos) => {
                      const isSelected = state.rimLight.position === pos;
                      return (
                        <motion.button
                          key={pos}
                          type="button"
                          onClick={() => handleRimLightPosition(pos)}
                          disabled={isLocked}
                          style={{
                            ...styles.optionButton,
                            ...(isSelected ? styles.optionButtonSelected : {}),
                            opacity: isLocked ? 0.6 : 1,
                            textTransform: 'capitalize',
                          }}
                          whileHover={!isLocked ? { scale: 1.02 } : {}}
                          whileTap={!isLocked ? { scale: 0.98 } : {}}
                        >
                          {pos}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Preview */}
      {!isExpanded && state.enabled && (
        <div style={styles.previewBar}>
          {keyLightPositionPresets[state.keyLightPosition].name} • {state.keyFillRatio} • {state.lightQuality} • {state.colorTemperature}K
          {state.rimLight.enabled && ` • rim ${state.rimLight.position}`}
        </div>
      )}
    </div>
  );
});

AdvancedLighting.displayName = 'AdvancedLighting';

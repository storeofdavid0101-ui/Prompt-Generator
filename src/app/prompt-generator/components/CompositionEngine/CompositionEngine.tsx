/**
 * CompositionEngine Component
 *
 * Interactive composition controls with subject placement grid,
 * frame occupancy, and rule of thirds visualization.
 *
 * @module components/CompositionEngine
 */

'use client';

import { memo, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3 } from 'lucide-react';
import { SectionHeader } from '../ui';
import { helpDescriptions } from '../../config/helpDescriptions';
import type { CompositionEngineProps } from './types';
import type {
  CompositionPreset,
  VanishingPointType,
  RuleOfThirdsPosition,
  FrameBalance,
} from '../../config/types/compositionEngine';
import { compositionPresets } from '../../config/compositionEngine';

const SECTION_KEY = 'compositionEngine';

const contentVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
};

const presetOptions: NonNullable<CompositionPreset>[] = [
  'centered',
  'rule-of-thirds-left',
  'rule-of-thirds-right',
  'golden-ratio',
  'diagonal',
  'symmetrical',
  'asymmetrical',
];

const vanishingOptions: { value: VanishingPointType; label: string }[] = [
  { value: null, label: 'None' },
  { value: 'central', label: 'Central' },
  { value: 'off-center-left', label: 'Left' },
  { value: 'off-center-right', label: 'Right' },
  { value: 'multiple', label: 'Multiple' },
];

const thirdsOptions: { value: RuleOfThirdsPosition; label: string }[] = [
  { value: null, label: 'None' },
  { value: 'top-left', label: 'TL' },
  { value: 'top-right', label: 'TR' },
  { value: 'bottom-left', label: 'BL' },
  { value: 'bottom-right', label: 'BR' },
];

const balanceOptions: { value: FrameBalance; label: string }[] = [
  { value: 'centered', label: 'Center' },
  { value: 'left-heavy', label: 'Left' },
  { value: 'right-heavy', label: 'Right' },
  { value: 'top-heavy', label: 'Top' },
  { value: 'bottom-heavy', label: 'Bottom' },
];

/**
 * CompositionEngine component for precise composition control.
 */
export const CompositionEngine = memo(function CompositionEngine({
  state,
  isExpanded,
  isLocked,
  onToggleLock,
  onToggleSection,
  themeColors,
  onRandomize,
}: CompositionEngineProps) {
  const gridRef = useRef<HTMLDivElement>(null);

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
      presetGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        marginBottom: '16px',
      },
      presetButton: {
        padding: '8px 4px',
        borderRadius: '6px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        fontSize: '9px',
        fontWeight: 500,
        color: themeColors.textPrimary,
        transition: 'all 0.15s ease',
        textAlign: 'center' as const,
      },
      presetButtonSelected: {
        borderColor: themeColors.accent,
        backgroundColor: `${themeColors.accent}15`,
      },
      placementGrid: {
        position: 'relative' as const,
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: themeColors.inputBackground,
        borderRadius: '8px',
        border: `1px solid ${themeColors.borderColor}`,
        marginBottom: '16px',
        cursor: isLocked ? 'not-allowed' : 'crosshair',
        overflow: 'hidden',
      },
      gridLine: {
        position: 'absolute' as const,
        backgroundColor: `${themeColors.accent}30`,
      },
      subjectMarker: {
        position: 'absolute' as const,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: themeColors.accent,
        border: '2px solid white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none' as const,
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
      buttonRow: {
        display: 'flex',
        gap: '6px',
        marginBottom: '16px',
        flexWrap: 'wrap' as const,
      },
      optionButton: {
        flex: '1 1 auto',
        minWidth: '48px',
        padding: '6px 8px',
        borderRadius: '6px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        fontSize: '10px',
        fontWeight: 500,
        color: themeColors.textPrimary,
        transition: 'all 0.15s ease',
      },
      optionButtonSelected: {
        borderColor: themeColors.accent,
        backgroundColor: `${themeColors.accent}15`,
      },
      coordDisplay: {
        display: 'flex',
        gap: '12px',
        marginBottom: '12px',
      },
      coordBox: {
        flex: 1,
        padding: '8px',
        borderRadius: '6px',
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.borderColor}`,
        textAlign: 'center' as const,
      },
      coordLabel: {
        fontSize: '9px',
        color: themeColors.textTertiary,
        textTransform: 'uppercase' as const,
        marginBottom: '2px',
      },
      coordValue: {
        fontSize: '14px',
        fontWeight: 600,
        color: themeColors.textPrimary,
        fontFamily: 'monospace',
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

  const handlePresetSelect = useCallback(
    (preset: NonNullable<CompositionPreset>) => {
      if (isLocked) return;
      state.applyPreset(preset);
    },
    [isLocked, state]
  );

  const handleGridClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isLocked || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      state.setSubjectPlacement({
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
      });
    },
    [isLocked, state]
  );

  const handleOccupancyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      state.setFrameOccupancy(parseInt(e.target.value, 10));
    },
    [isLocked, state]
  );

  const handleVanishingPointSelect = useCallback(
    (point: VanishingPointType) => {
      if (isLocked) return;
      state.setVanishingPoint(point);
    },
    [isLocked, state]
  );

  const handleThirdsSelect = useCallback(
    (position: RuleOfThirdsPosition) => {
      if (isLocked) return;
      state.setRuleOfThirds(position);
    },
    [isLocked, state]
  );

  const handleBalanceSelect = useCallback(
    (balance: FrameBalance) => {
      if (isLocked) return;
      state.setFrameBalance(balance);
    },
    [isLocked, state]
  );

  // Badge showing current preset or placement
  const badge = state.enabled
    ? state.preset
      ? compositionPresets[state.preset].name
      : `(${(state.subjectPlacement.x * 100).toFixed(0)}, ${(state.subjectPlacement.y * 100).toFixed(0)})`
    : undefined;

  return (
    <div style={styles.container}>
      <SectionHeader
        title="Composition Engine"
        icon={Grid3X3}
        sectionKey={SECTION_KEY}
        badge={badge}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.compositionEngine}
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
              {/* Preset Selection */}
              <div style={styles.label}>Quick Presets</div>
              <div style={styles.presetGrid}>
                {presetOptions.map((presetId) => {
                  const preset = compositionPresets[presetId];
                  const isSelected = state.preset === presetId;
                  return (
                    <motion.button
                      key={presetId}
                      type="button"
                      title={preset.description}
                      onClick={() => handlePresetSelect(presetId)}
                      disabled={isLocked}
                      style={{
                        ...styles.presetButton,
                        ...(isSelected ? styles.presetButtonSelected : {}),
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

              {/* Interactive Placement Grid */}
              <div style={styles.label}>Subject Placement (click to position)</div>
              <div
                ref={gridRef}
                onClick={handleGridClick}
                style={{
                  ...styles.placementGrid,
                  opacity: isLocked ? 0.6 : 1,
                }}
              >
                {/* Rule of thirds grid lines */}
                <div style={{ ...styles.gridLine, left: '33.33%', top: 0, width: '1px', height: '100%' }} />
                <div style={{ ...styles.gridLine, left: '66.66%', top: 0, width: '1px', height: '100%' }} />
                <div style={{ ...styles.gridLine, top: '33.33%', left: 0, height: '1px', width: '100%' }} />
                <div style={{ ...styles.gridLine, top: '66.66%', left: 0, height: '1px', width: '100%' }} />

                {/* Subject marker */}
                <div
                  style={{
                    ...styles.subjectMarker,
                    left: `${state.subjectPlacement.x * 100}%`,
                    top: `${state.subjectPlacement.y * 100}%`,
                  }}
                />
              </div>

              {/* Coordinate Display */}
              <div style={styles.coordDisplay}>
                <div style={styles.coordBox}>
                  <div style={styles.coordLabel}>X Position</div>
                  <div style={styles.coordValue}>{(state.subjectPlacement.x * 100).toFixed(0)}%</div>
                </div>
                <div style={styles.coordBox}>
                  <div style={styles.coordLabel}>Y Position</div>
                  <div style={styles.coordValue}>{(state.subjectPlacement.y * 100).toFixed(0)}%</div>
                </div>
              </div>

              {/* Frame Occupancy */}
              <div style={styles.sliderGroup}>
                <div style={styles.sliderHeader}>
                  <span style={styles.label}>Frame Occupancy</span>
                  <span style={styles.sliderValue}>{state.frameOccupancy}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={state.frameOccupancy}
                  onChange={handleOccupancyChange}
                  disabled={isLocked}
                  style={{
                    ...styles.slider,
                    opacity: isLocked ? 0.6 : 1,
                  }}
                />
              </div>

              {/* Rule of Thirds Position */}
              <div style={styles.label}>Rule of Thirds Intersection</div>
              <div style={styles.buttonRow}>
                {thirdsOptions.map((option) => {
                  const isSelected = state.ruleOfThirds === option.value;
                  return (
                    <motion.button
                      key={option.label}
                      type="button"
                      onClick={() => handleThirdsSelect(option.value)}
                      disabled={isLocked}
                      style={{
                        ...styles.optionButton,
                        ...(isSelected ? styles.optionButtonSelected : {}),
                        opacity: isLocked ? 0.6 : 1,
                      }}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                    >
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Vanishing Point */}
              <div style={styles.label}>Vanishing Point</div>
              <div style={styles.buttonRow}>
                {vanishingOptions.map((option) => {
                  const isSelected = state.vanishingPoint === option.value;
                  return (
                    <motion.button
                      key={option.label}
                      type="button"
                      onClick={() => handleVanishingPointSelect(option.value)}
                      disabled={isLocked}
                      style={{
                        ...styles.optionButton,
                        ...(isSelected ? styles.optionButtonSelected : {}),
                        opacity: isLocked ? 0.6 : 1,
                      }}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                    >
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Frame Balance */}
              <div style={styles.label}>Frame Balance</div>
              <div style={styles.buttonRow}>
                {balanceOptions.map((option) => {
                  const isSelected = state.frameBalance === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => handleBalanceSelect(option.value)}
                      disabled={isLocked}
                      style={{
                        ...styles.optionButton,
                        ...(isSelected ? styles.optionButtonSelected : {}),
                        opacity: isLocked ? 0.6 : 1,
                      }}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                    >
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Preview */}
      {!isExpanded && state.enabled && (
        <div style={styles.previewBar}>
          {state.preset ? compositionPresets[state.preset].name : 'Custom'} •{' '}
          ({(state.subjectPlacement.x * 100).toFixed(0)}%, {(state.subjectPlacement.y * 100).toFixed(0)}%) •{' '}
          {state.frameOccupancy}% occupancy
          {state.vanishingPoint && ` • ${state.vanishingPoint} VP`}
        </div>
      )}
    </div>
  );
});

CompositionEngine.displayName = 'CompositionEngine';

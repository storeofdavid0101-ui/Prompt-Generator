/**
 * LensPhysics Component
 *
 * Controls for advanced lens physics and optical effects.
 *
 * @module components/LensPhysics
 */

'use client';

import { memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aperture as ApertureIcon } from 'lucide-react';
import type { LensPhysicsProps } from './types';
import type { Aperture, DistortionType, DOFControl, BokehShape } from '../../config/types/lensPhysics';
import {
  aperturePresets,
  focalLengthPresets,
  distortionPresets,
  dofControlPresets,
  bokehShapePresets,
} from '../../config/lensPhysics';
import { SectionHeader } from '../ui';
import { helpDescriptions } from '../../config/helpDescriptions';

const SECTION_KEY = 'lensPhysics';

const contentVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
};

/**
 * LensPhysics component for advanced lens control.
 */
export const LensPhysics = memo(function LensPhysics({
  state,
  isExpanded,
  isLocked,
  onToggleLock,
  onToggleSection,
  themeColors,
  onRandomize,
}: LensPhysicsProps) {
  const styles = useMemo(
    () => ({
      container: {
        padding: '12px 0',
      },
      controlGroup: {
        marginBottom: '16px',
      },
      label: {
        fontSize: '11px',
        fontWeight: 500,
        color: themeColors.textSecondary,
        marginBottom: '8px',
        display: 'block',
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
      buttonGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
      },
      button: {
        padding: '8px 6px',
        borderRadius: '6px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        textAlign: 'center' as const,
        transition: 'all 0.15s ease',
      },
      buttonSelected: {
        borderColor: themeColors.accent,
        backgroundColor: `${themeColors.accent}15`,
      },
      buttonName: {
        fontSize: '11px',
        fontWeight: 600,
        color: themeColors.textPrimary,
      },
      buttonDesc: {
        fontSize: '9px',
        color: themeColors.textSecondary,
        marginTop: '2px',
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
      presetButtons: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap' as const,
        marginTop: '8px',
      },
      presetButton: {
        padding: '4px 8px',
        borderRadius: '4px',
        border: `1px solid ${themeColors.borderColor}`,
        backgroundColor: themeColors.inputBackground,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        fontSize: '10px',
        color: themeColors.textSecondary,
        transition: 'all 0.15s ease',
      },
    }),
    [themeColors, isLocked]
  );

  const handleToggleSection = useCallback(() => {
    onToggleSection(SECTION_KEY);
  }, [onToggleSection]);

  const handleFocalLengthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      state.setFocalLength(parseInt(e.target.value, 10));
    },
    [isLocked, state]
  );

  const handleFocalPresetClick = useCallback(
    (value: number) => {
      if (isLocked) return;
      state.setFocalLength(value);
    },
    [isLocked, state]
  );

  const handleApertureChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (isLocked) return;
      state.setAperture(e.target.value as Aperture);
    },
    [isLocked, state]
  );

  const handleDistortionSelect = useCallback(
    (distortion: DistortionType) => {
      if (isLocked) return;
      state.setDistortion(distortion);
    },
    [isLocked, state]
  );

  const handleDOFSelect = useCallback(
    (dof: DOFControl) => {
      if (isLocked) return;
      state.setDOFControl(dof);
    },
    [isLocked, state]
  );

  const handleBokehSelect = useCallback(
    (shape: BokehShape) => {
      if (isLocked) return;
      state.setBokehShape(shape);
    },
    [isLocked, state]
  );

  // Badge showing focal length
  const badge = state.enabled ? `${state.focalLength}mm` : undefined;

  return (
    <div style={styles.container}>
      <SectionHeader
        title="Lens Physics"
        icon={ApertureIcon}
        sectionKey={SECTION_KEY}
        badge={badge}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.lensPhysics}
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
              {/* Focal Length Slider */}
              <div style={styles.controlGroup}>
                <div style={styles.sliderHeader}>
                  <span style={styles.label}>Focal Length</span>
                  <span style={styles.sliderValue}>{state.focalLength}mm</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="200"
                  value={state.focalLength}
                  onChange={handleFocalLengthChange}
                  disabled={isLocked}
                  style={{
                    ...styles.slider,
                    opacity: isLocked ? 0.6 : 1,
                  }}
                />
                {/* Preset buttons */}
                <div style={styles.presetButtons}>
                  {focalLengthPresets.map((preset) => (
                    <motion.button
                      key={preset.value}
                      type="button"
                      onClick={() => handleFocalPresetClick(preset.value)}
                      disabled={isLocked}
                      style={{
                        ...styles.presetButton,
                        ...(state.focalLength === preset.value
                          ? { borderColor: themeColors.accent, color: themeColors.accent }
                          : {}),
                        opacity: isLocked ? 0.6 : 1,
                      }}
                      whileHover={!isLocked ? { scale: 1.05 } : {}}
                      whileTap={!isLocked ? { scale: 0.95 } : {}}
                    >
                      {preset.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Aperture Select */}
              <div style={styles.controlGroup}>
                <label style={styles.label}>Aperture</label>
                <select
                  value={state.aperture}
                  onChange={handleApertureChange}
                  disabled={isLocked}
                  style={styles.select}
                >
                  {aperturePresets.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                      {preset.label} - {preset.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* DOF Control */}
              <div style={styles.controlGroup}>
                <label style={styles.label}>Depth of Field</label>
                <div style={{ ...styles.buttonGrid, gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  {Object.values(dofControlPresets).map((preset) => {
                    const isSelected = state.dofControl === preset.id;
                    return (
                      <motion.button
                        key={preset.id}
                        type="button"
                        onClick={() => handleDOFSelect(preset.id)}
                        disabled={isLocked}
                        style={{
                          ...styles.button,
                          ...(isSelected ? styles.buttonSelected : {}),
                          opacity: isLocked ? 0.6 : 1,
                        }}
                        whileHover={!isLocked ? { scale: 1.02 } : {}}
                        whileTap={!isLocked ? { scale: 0.98 } : {}}
                      >
                        <div style={styles.buttonName}>{preset.name}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Bokeh Shape */}
              <div style={styles.controlGroup}>
                <label style={styles.label}>Bokeh Shape</label>
                <div style={styles.buttonGrid}>
                  {Object.values(bokehShapePresets).map((preset) => {
                    const isSelected = state.bokehShape === preset.id;
                    return (
                      <motion.button
                        key={preset.id}
                        type="button"
                        onClick={() => handleBokehSelect(preset.id)}
                        disabled={isLocked}
                        style={{
                          ...styles.button,
                          ...(isSelected ? styles.buttonSelected : {}),
                          opacity: isLocked ? 0.6 : 1,
                        }}
                        whileHover={!isLocked ? { scale: 1.02 } : {}}
                        whileTap={!isLocked ? { scale: 0.98 } : {}}
                      >
                        <div style={styles.buttonName}>{preset.name}</div>
                        <div style={styles.buttonDesc}>{preset.description}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Distortion */}
              <div style={styles.controlGroup}>
                <label style={styles.label}>Distortion</label>
                <div style={styles.buttonGrid}>
                  {Object.values(distortionPresets).map((preset) => {
                    const isSelected = state.distortion === preset.id;
                    return (
                      <motion.button
                        key={preset.id}
                        type="button"
                        onClick={() => handleDistortionSelect(preset.id)}
                        disabled={isLocked}
                        style={{
                          ...styles.button,
                          ...(isSelected ? styles.buttonSelected : {}),
                          opacity: isLocked ? 0.6 : 1,
                        }}
                        whileHover={!isLocked ? { scale: 1.02 } : {}}
                        whileTap={!isLocked ? { scale: 0.98 } : {}}
                      >
                        <div style={styles.buttonName}>{preset.name}</div>
                        <div style={styles.buttonDesc}>{preset.description}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LensPhysics.displayName = 'LensPhysics';

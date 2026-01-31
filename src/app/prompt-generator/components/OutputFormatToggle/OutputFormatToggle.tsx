/**
 * OutputFormatToggle Component
 *
 * A three-way toggle for selecting prompt output format:
 * - Prose: Natural language descriptions
 * - Machine: Structured key-value format
 * - Hybrid: Both prose and structured data
 *
 * @module components/OutputFormatToggle
 */

'use client';

import { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { OutputFormatToggleProps } from './types';
import type { OutputMode } from '../../config/types/outputFormat';
import { outputModeConfigs, outputModeOptions } from '../../config/outputFormat';

/**
 * Three-way toggle for output format selection.
 */
export const OutputFormatToggle = memo(function OutputFormatToggle({
  mode,
  onModeChange,
  themeColors,
  disabled = false,
}: OutputFormatToggleProps) {
  const styles = useMemo(
    () => ({
      container: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px',
        borderRadius: '6px',
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.borderColor}`,
      },
      button: {
        padding: '4px 10px',
        borderRadius: '4px',
        border: 'none',
        fontSize: '11px',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        position: 'relative' as const,
        zIndex: 1,
      },
      activeButton: {
        backgroundColor: themeColors.accent,
        color: '#ffffff',
      },
      inactiveButton: {
        backgroundColor: 'transparent',
        color: themeColors.textSecondary,
      },
      label: {
        fontSize: '10px',
        color: themeColors.textSecondary,
        marginRight: '8px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
      },
    }),
    [themeColors, disabled]
  );

  const handleModeClick = useCallback(
    (newMode: OutputMode) => {
      if (!disabled && newMode !== mode) {
        onModeChange(newMode);
      }
    },
    [disabled, mode, onModeChange]
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={styles.label}>Format</span>
      <div style={styles.container}>
        {outputModeOptions.map((optionMode) => {
          const config = outputModeConfigs[optionMode];
          const isActive = mode === optionMode;

          return (
            <motion.button
              key={optionMode}
              type="button"
              onClick={() => handleModeClick(optionMode)}
              disabled={disabled}
              style={{
                ...styles.button,
                ...(isActive ? styles.activeButton : styles.inactiveButton),
                opacity: disabled ? 0.5 : 1,
              }}
              whileHover={!disabled && !isActive ? { backgroundColor: themeColors.borderColor } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
              title={config.description}
            >
              {config.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

OutputFormatToggle.displayName = 'OutputFormatToggle';

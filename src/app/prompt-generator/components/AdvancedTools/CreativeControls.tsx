/**
 * Creative Controls Component
 *
 * Provides a toggleable section with sliders for creativity, variation,
 * and uniqueness parameters. Values are auto-translated to model-specific
 * parameters (stylize, chaos, CFG, etc.).
 *
 * @module AdvancedTools/CreativeControls
 */

'use client';

import { memo, useMemo } from 'react';
import { UniversalSlider } from '../ui';
import { modelConfigs } from '../../config';
import { Toggle } from './Toggle';
import { CREATIVE_SLIDERS, CSS_CLASSES, OPACITY, ARIA_LABELS } from './constants';
import type { CreativeControlsProps } from './types';

/**
 * Creative controls section with toggle and parameter sliders
 *
 * When enabled, displays three sliders (creativity, variation, uniqueness)
 * that map to model-specific parameters during prompt generation.
 *
 * @example
 * ```tsx
 * <CreativeControls
 *   enabled={creativeControlsEnabled}
 *   creativity={50}
 *   variation={30}
 *   uniqueness={40}
 *   selectedModel="midjourney"
 *   isLocked={false}
 *   onToggle={handleToggle}
 *   onCreativityChange={setCreativity}
 *   onVariationChange={setVariation}
 *   onUniquenessChange={setUniqueness}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const CreativeControls = memo(function CreativeControls({
  enabled,
  creativity,
  variation,
  uniqueness,
  selectedModel,
  isLocked,
  onToggle,
  onCreativityChange,
  onVariationChange,
  onUniquenessChange,
  themeColors,
}: CreativeControlsProps) {
  const modelConfig = modelConfigs[selectedModel];

  /**
   * Map of value keys to their current values
   */
  const values = useMemo(
    () => ({
      creativity,
      variation,
      uniqueness,
    }),
    [creativity, variation, uniqueness]
  );

  /**
   * Map of change handler keys to their functions
   */
  const changeHandlers = useMemo(
    () => ({
      onCreativityChange,
      onVariationChange,
      onUniquenessChange,
    }),
    [onCreativityChange, onVariationChange, onUniquenessChange]
  );

  /**
   * Memoized container styles
   */
  const containerStyles = useMemo(
    () => ({
      backgroundColor: themeColors.inputBackground,
      borderColor: themeColors.borderColor,
      opacity: enabled ? OPACITY.enabled : OPACITY.disabled,
    }),
    [themeColors, enabled]
  );

  /**
   * Handle toggle with lock check
   */
  const handleToggle = () => {
    if (!isLocked) {
      onToggle();
    }
  };

  return (
    <section
      className={`${CSS_CLASSES.section} space-y-4`}
      style={containerStyles}
      aria-labelledby="creative-controls-title"
    >
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            id="creative-controls-title"
            className="text-sm font-medium"
            style={{ color: themeColors.textPrimary }}
          >
            Creative Controls
          </h3>
          <p
            className="text-xs"
            style={{ color: themeColors.textTertiary }}
          >
            Add stylize, chaos, CFG params to prompt
          </p>
        </div>
        <Toggle
          checked={enabled}
          disabled={isLocked}
          ariaLabel={ARIA_LABELS.toggleCreativeControls}
          themeColors={themeColors}
          onChange={handleToggle}
        />
      </div>

      {/* Sliders - only visible when enabled */}
      {enabled && (
        <div
          className="space-y-3 pt-2 border-t"
          style={{ borderColor: themeColors.borderColor }}
          role="group"
          aria-label="Creative parameter sliders"
        >
          {CREATIVE_SLIDERS.map((slider) => (
            <UniversalSlider
              key={slider.id}
              label={slider.label}
              value={values[slider.valueKey]}
              onChange={changeHandlers[slider.onChangeKey]}
              icon={slider.icon}
              disabled={isLocked}
              themeColors={themeColors}
            />
          ))}
          <p
            className="text-xs"
            style={{ color: themeColors.textTertiary }}
            role="status"
          >
            Auto-translated to {modelConfig.name} parameters
          </p>
        </div>
      )}
    </section>
  );
});

CreativeControls.displayName = 'CreativeControls';

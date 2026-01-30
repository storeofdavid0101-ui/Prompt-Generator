/**
 * Advanced Tools Container Component
 *
 * Main orchestrator component for the Advanced Tools section.
 * Composes sub-components for negative prompts, creative controls,
 * depth of field, and user presets.
 *
 * @module AdvancedTools/AdvancedTools
 */

'use client';

import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdvancedToolsHeader } from './AdvancedToolsHeader';
import { NegativePromptInput } from './NegativePromptInput';
import { CreativeControls } from './CreativeControls';
import { DepthOfFieldSelector } from './DepthOfFieldSelector';
import { UserPresetsPlaceholder } from './UserPresetsPlaceholder';
import { CSS_CLASSES, COLLAPSE_ANIMATION } from './constants';
import type { AdvancedToolsProps } from './types';

/**
 * Advanced Tools accordion section
 *
 * Provides expandable access to advanced prompt generation options:
 * - Negative prompts (model-dependent)
 * - Creative controls (stylize, chaos, CFG)
 * - Depth of field settings
 * - User presets (coming soon)
 *
 * @example
 * ```tsx
 * <AdvancedTools
 *   negativePrompt=""
 *   creativeControlsEnabled={false}
 *   creativity={50}
 *   variation={30}
 *   uniqueness={40}
 *   depthOfField="natural"
 *   selectedModel="midjourney"
 *   showAdvanced={true}
 *   isLocked={false}
 *   conflicts={conflictResults}
 *   onToggleLock={handleLock}
 *   onNegativePromptChange={setNegativePrompt}
 *   onCreativeControlsToggle={toggleCreativeControls}
 *   onCreativityChange={setCreativity}
 *   onVariationChange={setVariation}
 *   onUniquenessChange={setUniqueness}
 *   onDepthOfFieldChange={setDOF}
 *   onToggleAdvanced={toggleAdvanced}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const AdvancedTools = memo(function AdvancedTools({
  negativePrompt,
  creativeControlsEnabled,
  creativity,
  variation,
  uniqueness,
  depthOfField,
  selectedModel,
  showAdvanced,
  isLocked,
  conflicts,
  themeColors,
  onToggleLock,
  onNegativePromptChange,
  onCreativeControlsToggle,
  onCreativityChange,
  onVariationChange,
  onUniquenessChange,
  onDepthOfFieldChange,
  onToggleAdvanced,
}: AdvancedToolsProps) {
  /**
   * Memoized container styles
   */
  const containerStyles = useMemo(
    () => ({
      backgroundColor: themeColors.cardBackground,
      borderColor: themeColors.borderColor,
    }),
    [themeColors]
  );

  return (
    <motion.section
      className={`${CSS_CLASSES.card} relative z-0`}
      style={containerStyles}
      aria-labelledby="advanced-tools-header"
    >
      {/* Accordion Header */}
      <AdvancedToolsHeader
        isExpanded={showAdvanced}
        isLocked={isLocked}
        themeColors={themeColors}
        onToggle={onToggleAdvanced}
        onToggleLock={onToggleLock}
      />

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {showAdvanced && (
          <motion.div
            initial={COLLAPSE_ANIMATION.initial}
            animate={COLLAPSE_ANIMATION.animate}
            exit={COLLAPSE_ANIMATION.exit}
            transition={COLLAPSE_ANIMATION.transition}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Negative Prompt Section */}
              <NegativePromptInput
                value={negativePrompt}
                selectedModel={selectedModel}
                isLocked={isLocked}
                onChange={onNegativePromptChange}
                themeColors={themeColors}
              />

              {/* Creative Controls Section */}
              <CreativeControls
                enabled={creativeControlsEnabled}
                creativity={creativity}
                variation={variation}
                uniqueness={uniqueness}
                selectedModel={selectedModel}
                isLocked={isLocked}
                onToggle={onCreativeControlsToggle}
                onCreativityChange={onCreativityChange}
                onVariationChange={onVariationChange}
                onUniquenessChange={onUniquenessChange}
                themeColors={themeColors}
              />

              {/* Depth of Field Section */}
              <DepthOfFieldSelector
                value={depthOfField}
                conflicts={conflicts}
                isLocked={isLocked}
                onChange={onDepthOfFieldChange}
                themeColors={themeColors}
              />

              {/* User Presets Placeholder */}
              <UserPresetsPlaceholder themeColors={themeColors} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
});

AdvancedTools.displayName = 'AdvancedTools';

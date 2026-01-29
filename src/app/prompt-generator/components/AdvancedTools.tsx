/**
 * Advanced tools drawer component
 * Contains negative prompt, creative controls, and depth of field settings
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ChevronDown, Sparkles, Layers, Zap, AlertTriangle, Bookmark, Save, Lock, Unlock } from 'lucide-react';
import { UniversalSlider } from './ui';
import { modelConfigs, dofOptions } from '../config';
import type { AIModel, ThemeColors, ConflictResult } from '../config/types';

interface AdvancedToolsProps {
  negativePrompt: string;
  creativeControlsEnabled: boolean;
  creativity: number;
  variation: number;
  uniqueness: number;
  depthOfField: string;
  selectedModel: AIModel;
  showAdvanced: boolean;
  isLocked: boolean;
  onToggleLock: () => void;
  conflicts: ConflictResult;
  onNegativePromptChange: (value: string) => void;
  onCreativeControlsToggle: () => void;
  onCreativityChange: (value: number) => void;
  onVariationChange: (value: number) => void;
  onUniquenessChange: (value: number) => void;
  onDepthOfFieldChange: (value: string) => void;
  onToggleAdvanced: () => void;
  themeColors: ThemeColors;
}

export function AdvancedTools({
  negativePrompt,
  creativeControlsEnabled,
  creativity,
  variation,
  uniqueness,
  depthOfField,
  selectedModel,
  showAdvanced,
  isLocked,
  onToggleLock,
  conflicts,
  onNegativePromptChange,
  onCreativeControlsToggle,
  onCreativityChange,
  onVariationChange,
  onUniquenessChange,
  onDepthOfFieldChange,
  onToggleAdvanced,
  themeColors,
}: AdvancedToolsProps) {
  return (
    <motion.div
      className="rounded-2xl border backdrop-blur-xl overflow-hidden"
      style={{
        backgroundColor: themeColors.cardBackground,
        borderColor: themeColors.borderColor,
      }}
    >
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onToggleAdvanced}
          className="flex-1 flex items-center gap-2"
        >
          <Settings className="w-4 h-4" style={{ color: themeColors.accent }} />
          <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
            Advanced Tools
          </span>
          <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
          </motion.div>
        </button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
          className="p-1 rounded-md transition-colors"
          style={{
            color: isLocked ? themeColors.accent : themeColors.textTertiary,
            backgroundColor: isLocked ? `${themeColors.accent}15` : 'transparent',
          }}
          title={isLocked ? 'Unlock this section' : 'Lock this section'}
        >
          {isLocked ? (
            <Lock className="w-3.5 h-3.5" />
          ) : (
            <Unlock className="w-3.5 h-3.5" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Negative Prompt - only show for models that support it */}
              {modelConfigs[selectedModel].supportsNegativePrompt ? (
                <div>
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{ color: themeColors.textTertiary }}
                  >
                    Negative Prompt (Things to Avoid)
                  </label>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => onNegativePromptChange(e.target.value)}
                    placeholder="blurry, low quality, distorted, watermark..."
                    rows={2}
                    disabled={isLocked}
                    className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: themeColors.inputBackground,
                      border: `1px solid ${themeColors.inputBorder}`,
                      color: themeColors.textPrimary,
                      opacity: isLocked ? 0.6 : 1,
                    }}
                  />
                  <p className="text-xs mt-1" style={{ color: themeColors.textTertiary }}>
                    Uses {modelConfigs[selectedModel].negativeParam} for{' '}
                    {modelConfigs[selectedModel].name}
                  </p>
                </div>
              ) : (
                <div
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: themeColors.inputBackground,
                    borderColor: themeColors.warning + '40',
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: themeColors.textSecondary }}>
                    Negative prompts not supported
                  </p>
                  <p className="text-xs mt-1" style={{ color: themeColors.textTertiary }}>
                    {modelConfigs[selectedModel].name} uses natural language processing.
                    Describe what you want instead of what to avoid.
                  </p>
                </div>
              )}

              {/* Creative Controls Section */}
              <div
                className="p-3 rounded-xl border space-y-4"
                style={{
                  backgroundColor: themeColors.inputBackground,
                  borderColor: themeColors.borderColor,
                  opacity: creativeControlsEnabled ? 1 : 0.6,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                      Creative Controls
                    </p>
                    <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                      Add stylize, chaos, CFG params to prompt
                    </p>
                  </div>
                  <button
                    onClick={() => !isLocked && onCreativeControlsToggle()}
                    disabled={isLocked}
                    className="relative w-11 h-6 rounded-full transition-colors"
                    style={{
                      backgroundColor: creativeControlsEnabled
                        ? themeColors.accent
                        : themeColors.borderColor,
                      opacity: isLocked ? 0.6 : 1,
                    }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                      style={{
                        transform: creativeControlsEnabled
                          ? 'translateX(24px)'
                          : 'translateX(4px)',
                      }}
                    />
                  </button>
                </div>

                {creativeControlsEnabled && (
                  <div
                    className="space-y-3 pt-2 border-t"
                    style={{ borderColor: themeColors.borderColor }}
                  >
                    <UniversalSlider
                      label="Creativity"
                      value={creativity}
                      onChange={onCreativityChange}
                      icon={Sparkles}
                      disabled={isLocked}
                      themeColors={themeColors}
                    />
                    <UniversalSlider
                      label="Variation"
                      value={variation}
                      onChange={onVariationChange}
                      icon={Layers}
                      disabled={isLocked}
                      themeColors={themeColors}
                    />
                    <UniversalSlider
                      label="Uniqueness"
                      value={uniqueness}
                      onChange={onUniquenessChange}
                      icon={Zap}
                      disabled={isLocked}
                      themeColors={themeColors}
                    />
                    <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                      Auto-translated to {modelConfigs[selectedModel].name} parameters
                    </p>
                  </div>
                )}
              </div>

              {/* Depth of Field */}
              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: themeColors.textTertiary }}
                >
                  Depth of Field
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dofOptions.map((dof) => {
                    const isBlocked = conflicts.blockedDOF.has(dof.value);
                    return (
                      <button
                        key={dof.value}
                        onClick={() => !isLocked && !isBlocked && onDepthOfFieldChange(dof.value)}
                        disabled={isLocked || isBlocked}
                        className="p-2.5 rounded-lg text-xs text-left transition-all border flex items-center justify-between"
                        style={{
                          backgroundColor:
                            depthOfField === dof.value ? themeColors.promptBg : 'transparent',
                          borderColor:
                            depthOfField === dof.value
                              ? themeColors.accent
                              : themeColors.borderColor,
                          color: themeColors.textPrimary,
                          opacity: isLocked || isBlocked ? 0.4 : 1,
                        }}
                      >
                        <span>{dof.label}</span>
                        {isBlocked && (
                          <AlertTriangle
                            className="w-3 h-3"
                            style={{ color: themeColors.warning }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* User Presets Placeholder */}
              <div
                className="p-4 rounded-xl border-2 border-dashed"
                style={{ borderColor: themeColors.borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bookmark className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: themeColors.textSecondary }}
                  >
                    User Presets
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: themeColors.warning + '20',
                      color: themeColors.warning,
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                  Save your favorite combinations for quick access
                </p>
                <button
                  disabled
                  className="mt-3 w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 opacity-50"
                  style={{
                    backgroundColor: themeColors.inputBackground,
                    color: themeColors.textTertiary,
                  }}
                >
                  <Save className="w-3 h-3" />
                  Save Current Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

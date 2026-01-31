/**
 * Color Grading Panel Component
 *
 * Professional color grading panel inspired by DaVinci Resolve and Premiere Pro.
 * Includes color wheels, temperature/tint, split toning, and LUT-style presets.
 *
 * @module components/ColorGradingPanel/ColorGradingPanel
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, ChevronRight, Check, RotateCcw } from 'lucide-react';
import { SectionHeader } from '../ui';
import { ColorWheel } from './ColorWheel';
import { colorGradingPresets, getPresetsByCategory, colorGradingCategoryNames } from '../../config/colorGrading';
import type { ThemeColors } from '../../config/types';
import type { ColorGradingStateReturn } from '../../hooks/state/types/colorGrading.types';
import type { ColorGradingCategory, TonalRange } from '../../config/types/colorGrading';
import { helpDescriptions } from '../../config';

interface ColorGradingPanelProps {
  state: ColorGradingStateReturn;
  isExpanded: boolean;
  isLocked: boolean;
  onToggleLock: () => void;
  onToggleSection: (key: string) => void;
  themeColors: ThemeColors;
  onRandomize?: () => void;
}

type TabKey = 'presets' | 'wheels' | 'adjustments';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'presets', label: 'Looks' },
  { key: 'wheels', label: 'Wheels' },
  { key: 'adjustments', label: 'Adjust' },
];

export function ColorGradingPanel({
  state,
  isExpanded,
  isLocked,
  onToggleLock,
  onToggleSection,
  themeColors,
  onRandomize,
}: ColorGradingPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('presets');
  const [expandedCategory, setExpandedCategory] = useState<ColorGradingCategory | null>('cinematic');

  const presetsByCategory = getPresetsByCategory();
  const selectedPresetName = state.selectedPreset
    ? colorGradingPresets[state.selectedPreset]?.name
    : null;

  const handleCategoryToggle = (category: ColorGradingCategory) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div>
      <SectionHeader
        title="Color Grading"
        icon={Palette}
        sectionKey="colorGrading"
        badge={selectedPresetName || (state.enabled ? 'Custom' : undefined)}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.colorGrading}
        onToggle={onToggleSection}
        onToggleLock={onToggleLock}
        onRandomize={onRandomize}
        themeColors={themeColors}
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {/* Tabs */}
            <div
              className="flex gap-1 p-1 mb-3 rounded-lg"
              style={{ backgroundColor: themeColors.borderColor + '40' }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
                  style={{
                    backgroundColor: activeTab === tab.key ? themeColors.accent : 'transparent',
                    color: activeTab === tab.key ? '#fff' : themeColors.textSecondary,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'presets' && (
                <motion.div
                  key="presets"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2 pb-4"
                >
                  {(Object.keys(colorGradingCategoryNames) as ColorGradingCategory[]).map((category) => (
                    <div key={category}>
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-colors"
                        style={{
                          backgroundColor:
                            expandedCategory === category
                              ? themeColors.borderColor + '60'
                              : 'transparent',
                        }}
                      >
                        <span
                          className="text-xs font-medium"
                          style={{ color: themeColors.textPrimary }}
                        >
                          {colorGradingCategoryNames[category]}
                        </span>
                        {expandedCategory === category ? (
                          <ChevronDown className="w-3.5 h-3.5" style={{ color: themeColors.textSecondary }} />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: themeColors.textSecondary }} />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedCategory === category && presetsByCategory[category] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-1.5 pt-1.5 pb-2">
                              {presetsByCategory[category].map(({ key, preset }) => (
                                <button
                                  key={key}
                                  onClick={() => !isLocked && state.applyPreset(key)}
                                  disabled={isLocked}
                                  className="relative p-2 rounded-lg text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                                  style={{
                                    borderColor:
                                      state.selectedPreset === key
                                        ? themeColors.accent
                                        : themeColors.borderColor,
                                    opacity: isLocked ? 0.5 : 1,
                                  }}
                                >
                                  <div
                                    className="absolute inset-0 opacity-30"
                                    style={{ background: preset.gradient }}
                                  />
                                  <div className="relative z-10">
                                    <span
                                      className="text-[11px] font-medium block truncate"
                                      style={{ color: themeColors.textPrimary }}
                                    >
                                      {preset.name}
                                    </span>
                                    {state.selectedPreset === key && (
                                      <Check
                                        className="absolute top-1 right-1 w-3 h-3"
                                        style={{ color: themeColors.accent }}
                                      />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Clear Selection */}
                  {state.selectedPreset && (
                    <button
                      onClick={() => !isLocked && state.reset()}
                      disabled={isLocked}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-lg transition-colors"
                      style={{
                        color: themeColors.textSecondary,
                        opacity: isLocked ? 0.5 : 1,
                      }}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Clear Grade
                    </button>
                  )}
                </motion.div>
              )}

              {activeTab === 'wheels' && (
                <motion.div
                  key="wheels"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="pb-4"
                >
                  {/* Color Wheels */}
                  <div className="grid grid-cols-3 gap-2">
                    {(['lift', 'gamma', 'gain'] as TonalRange[]).map((range) => (
                      <ColorWheel
                        key={range}
                        label={range === 'lift' ? 'Shadows' : range === 'gamma' ? 'Mids' : 'Highs'}
                        position={state.colorWheels[range].position}
                        luminance={state.colorWheels[range].luminance}
                        isLocked={isLocked}
                        themeColors={themeColors}
                        onPositionChange={(pos) => state.setColorWheelPosition(range, pos)}
                        onLuminanceChange={(lum) => state.setColorWheelLuminance(range, lum)}
                        onReset={() => state.resetColorWheel(range)}
                      />
                    ))}
                  </div>

                  {/* Reset All Wheels */}
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => !isLocked && state.resetAllColorWheels()}
                      disabled={isLocked}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors"
                      style={{
                        color: themeColors.textSecondary,
                        backgroundColor: themeColors.borderColor + '40',
                        opacity: isLocked ? 0.5 : 1,
                      }}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Wheels
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'adjustments' && (
                <motion.div
                  key="adjustments"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 pb-4"
                >
                  {/* Temperature & Tint */}
                  <div className="space-y-2">
                    <h4
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: themeColors.textSecondary }}
                    >
                      White Balance
                    </h4>
                    <SliderControl
                      label="Temperature"
                      value={state.temperatureTint.temperature}
                      min={-100}
                      max={100}
                      leftLabel="Cool"
                      rightLabel="Warm"
                      leftColor="#4A90D9"
                      rightColor="#FF9500"
                      isLocked={isLocked}
                      themeColors={themeColors}
                      onChange={state.setTemperature}
                    />
                    <SliderControl
                      label="Tint"
                      value={state.temperatureTint.tint}
                      min={-100}
                      max={100}
                      leftLabel="Green"
                      rightLabel="Magenta"
                      leftColor="#34C759"
                      rightColor="#FF2D92"
                      isLocked={isLocked}
                      themeColors={themeColors}
                      onChange={state.setTint}
                    />
                  </div>

                  {/* Global Adjustments */}
                  <div className="space-y-2">
                    <h4
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: themeColors.textSecondary }}
                    >
                      Global
                    </h4>
                    <SliderControl
                      label="Contrast"
                      value={state.globalAdjustments.contrast}
                      min={-100}
                      max={100}
                      isLocked={isLocked}
                      themeColors={themeColors}
                      onChange={state.setContrast}
                    />
                    <SliderControl
                      label="Saturation"
                      value={state.globalAdjustments.saturation}
                      min={-100}
                      max={100}
                      isLocked={isLocked}
                      themeColors={themeColors}
                      onChange={state.setSaturation}
                    />
                    <SliderControl
                      label="Vibrance"
                      value={state.globalAdjustments.vibrance}
                      min={-100}
                      max={100}
                      isLocked={isLocked}
                      themeColors={themeColors}
                      onChange={state.setVibrance}
                    />
                  </div>

                  {/* Split Toning */}
                  <div className="space-y-2">
                    <h4
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: themeColors.textSecondary }}
                    >
                      Split Toning
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <HueSelector
                        label="Shadows"
                        hue={state.splitToning.shadowHue}
                        saturation={state.splitToning.shadowSaturation}
                        isLocked={isLocked}
                        themeColors={themeColors}
                        onHueChange={state.setShadowHue}
                        onSaturationChange={state.setShadowSaturation}
                      />
                      <HueSelector
                        label="Highlights"
                        hue={state.splitToning.highlightHue}
                        saturation={state.splitToning.highlightSaturation}
                        isLocked={isLocked}
                        themeColors={themeColors}
                        onHueChange={state.setHighlightHue}
                        onSaturationChange={state.setHighlightSaturation}
                      />
                    </div>
                    <SliderControl
                      label="Balance"
                      value={state.splitToning.balance}
                      min={-100}
                      max={100}
                      leftLabel="Shadows"
                      rightLabel="Highlights"
                      isLocked={isLocked}
                      themeColors={themeColors}
                      onChange={state.setSplitToningBalance}
                    />
                  </div>

                  {/* Reset All */}
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => !isLocked && state.reset()}
                      disabled={isLocked}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors"
                      style={{
                        color: themeColors.textSecondary,
                        backgroundColor: themeColors.borderColor + '40',
                        opacity: isLocked ? 0.5 : 1,
                      }}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset All
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  leftLabel?: string;
  rightLabel?: string;
  leftColor?: string;
  rightColor?: string;
  isLocked: boolean;
  themeColors: ThemeColors;
  onChange: (value: number) => void;
}

function SliderControl({
  label,
  value,
  min,
  max,
  leftLabel,
  rightLabel,
  leftColor,
  rightColor,
  isLocked,
  themeColors,
  onChange,
}: SliderControlProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ opacity: isLocked ? 0.5 : 1 }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px]" style={{ color: themeColors.textSecondary }}>
          {label}
        </span>
        <span
          className="text-[11px] font-mono"
          style={{ color: themeColors.textSecondary }}
        >
          {value > 0 ? '+' : ''}{value}
        </span>
      </div>
      <div className="relative">
        {leftLabel && rightLabel && (
          <div className="flex justify-between text-[9px] mb-0.5">
            <span style={{ color: leftColor || themeColors.textSecondary }}>{leftLabel}</span>
            <span style={{ color: rightColor || themeColors.textSecondary }}>{rightLabel}</span>
          </div>
        )}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          disabled={isLocked}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: leftColor && rightColor
              ? `linear-gradient(to right, ${leftColor}, ${themeColors.borderColor}, ${rightColor})`
              : `linear-gradient(to right, ${themeColors.borderColor} ${percentage}%, ${themeColors.borderColor}60 ${percentage}%)`,
          }}
        />
        {/* Center marker for bi-directional sliders */}
        {min < 0 && max > 0 && (
          <div
            className="absolute w-0.5 h-2.5 -translate-x-1/2"
            style={{
              left: '50%',
              top: leftLabel ? '16px' : '0',
              backgroundColor: themeColors.textSecondary + '60',
            }}
          />
        )}
      </div>
    </div>
  );
}

interface HueSelectorProps {
  label: string;
  hue: number;
  saturation: number;
  isLocked: boolean;
  themeColors: ThemeColors;
  onHueChange: (hue: number) => void;
  onSaturationChange: (saturation: number) => void;
}

function HueSelector({
  label,
  hue,
  saturation,
  isLocked,
  themeColors,
  onHueChange,
  onSaturationChange,
}: HueSelectorProps) {
  return (
    <div style={{ opacity: isLocked ? 0.5 : 1 }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px]" style={{ color: themeColors.textSecondary }}>
          {label}
        </span>
        <div
          className="w-4 h-4 rounded-full border"
          style={{
            backgroundColor: `hsl(${hue}, ${saturation}%, 50%)`,
            borderColor: themeColors.borderColor,
          }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(e) => onHueChange(parseInt(e.target.value, 10))}
        disabled={isLocked}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer mb-1"
        style={{
          background: `linear-gradient(to right,
            hsl(0, 70%, 50%),
            hsl(60, 70%, 50%),
            hsl(120, 70%, 50%),
            hsl(180, 70%, 50%),
            hsl(240, 70%, 50%),
            hsl(300, 70%, 50%),
            hsl(360, 70%, 50%)
          )`,
        }}
      />
      <div className="flex items-center gap-1">
        <span className="text-[9px]" style={{ color: themeColors.textSecondary }}>
          Sat
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={saturation}
          onChange={(e) => onSaturationChange(parseInt(e.target.value, 10))}
          disabled={isLocked}
          className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right,
              hsl(${hue}, 0%, 50%),
              hsl(${hue}, 100%, 50%)
            )`,
          }}
        />
        <span className="text-[9px] font-mono w-6 text-right" style={{ color: themeColors.textSecondary }}>
          {saturation}
        </span>
      </div>
    </div>
  );
}

/**
 * Color palette selector component
 * Provides preset and custom color palette selection
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { SectionHeader } from './ui';
import { colorPalettes, helpDescriptions } from '../config';
import type { ThemeColors } from '../config/types';
import { SectionLock } from './SectionLock';

interface ColorPaletteSelectorProps {
  selectedColorPalette: string | null;
  customColors: string[];
  isExpanded: boolean;
  isLocked: boolean;
  onToggleLock: () => void;
  onSelectPalette: (palette: string | null) => void;
  onCustomColorsChange: (colors: string[]) => void;
  onToggleSection: (key: string) => void;
  themeColors: ThemeColors;
}

function isValidHexColor(color: string): boolean {
  return /^#?[0-9A-Fa-f]{6}$/.test(color.trim());
}

export function ColorPaletteSelector({
  selectedColorPalette,
  customColors,
  isExpanded,
  isLocked,
  onToggleLock,
  onSelectPalette,
  onCustomColorsChange,
  onToggleSection,
  themeColors,
}: ColorPaletteSelectorProps) {
  const getBadge = () => {
    if (selectedColorPalette === 'custom') return 'Custom';
    if (selectedColorPalette) return colorPalettes[selectedColorPalette].name;
    return undefined;
  };

  const handleCustomColorChange = (index: number, value: string) => {
    if (!isLocked) {
      const newColors = [...customColors];
      newColors[index] = value;
      onCustomColorsChange(newColors);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Color Palette"
        icon={Palette}
        sectionKey="color"
        badge={getBadge()}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.colorPalette}
        onToggle={onToggleSection}
        onToggleLock={onToggleLock}
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
            <div className="pb-4 space-y-3">
              {/* Preset Palettes + Custom Option */}
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(colorPalettes).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => {
                      if (!isLocked) {
                        onSelectPalette(selectedColorPalette === key ? null : key);
                      }
                    }}
                    disabled={isLocked}
                    className="p-2.5 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      borderColor:
                        selectedColorPalette === key
                          ? themeColors.accent
                          : themeColors.borderColor,
                      backgroundColor:
                        selectedColorPalette === key ? themeColors.promptBg : 'transparent',
                      opacity: isLocked ? 0.4 : 1,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-xs font-medium"
                        style={{ color: themeColors.textPrimary }}
                      >
                        {config.name}
                      </span>
                      {selectedColorPalette === key && (
                        <Check className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
                      )}
                    </div>
                    <div className="flex gap-0.5">
                      {config.colors.slice(0, 6).map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-4 first:rounded-l last:rounded-r"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}

                {/* Custom Palette Option */}
                <button
                  onClick={() => {
                    if (!isLocked) {
                      onSelectPalette(selectedColorPalette === 'custom' ? null : 'custom');
                    }
                  }}
                  disabled={isLocked}
                  className="p-2.5 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    borderColor:
                      selectedColorPalette === 'custom'
                        ? themeColors.accent
                        : themeColors.borderColor,
                    backgroundColor:
                      selectedColorPalette === 'custom' ? themeColors.promptBg : 'transparent',
                    opacity: isLocked ? 0.4 : 1,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-xs font-medium"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Custom
                    </span>
                    {selectedColorPalette === 'custom' && (
                      <Check className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {customColors.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-4 first:rounded-l last:rounded-r border border-dashed"
                        style={{
                          backgroundColor: isValidHexColor(color)
                            ? color.startsWith('#')
                              ? color
                              : `#${color}`
                            : 'transparent',
                          borderColor: themeColors.borderColor,
                        }}
                      />
                    ))}
                  </div>
                </button>
              </div>

              {/* Custom Color Inputs */}
              <AnimatePresence>
                {selectedColorPalette === 'custom' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 space-y-2">
                      <label
                        className="block text-xs"
                        style={{ color: themeColors.textTertiary }}
                      >
                        Enter 6 hex color codes
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {customColors.map((color, index) => (
                          <div key={index} className="flex items-center gap-1.5">
                            <div
                              className="w-8 h-8 rounded-lg border flex-shrink-0"
                              style={{
                                backgroundColor: isValidHexColor(color)
                                  ? color.startsWith('#')
                                    ? color
                                    : `#${color}`
                                  : themeColors.inputBackground,
                                borderColor: themeColors.borderColor,
                              }}
                            />
                            <input
                              type="text"
                              value={color}
                              onChange={(e) => handleCustomColorChange(index, e.target.value)}
                              placeholder={`#${(index + 1).toString().padStart(2, '0')}...`}
                              disabled={isLocked}
                              maxLength={7}
                              className="flex-1 min-w-0 rounded-lg px-2 py-1.5 text-xs transition-all focus:outline-none focus:ring-1"
                              style={{
                                backgroundColor: themeColors.inputBackground,
                                border: `1px solid ${themeColors.inputBorder}`,
                                color: themeColors.textPrimary,
                                opacity: isLocked ? 0.6 : 1,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                        e.g. #FF5733 or FF5733
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

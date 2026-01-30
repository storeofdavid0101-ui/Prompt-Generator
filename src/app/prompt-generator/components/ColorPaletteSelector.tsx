/**
 * Color palette selector component
 * Provides preset and custom color palette selection
 * Includes visual color picker and hex input options
 */

'use client';

import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Pipette } from 'lucide-react';
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

/** Get display color value, ensuring proper hex format */
function getDisplayColor(color: string): string {
  if (!isValidHexColor(color)) return '';
  return color.startsWith('#') ? color : `#${color}`;
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
                        className="block text-xs flex items-center gap-1.5"
                        style={{ color: themeColors.textTertiary }}
                      >
                        <Pipette className="w-3 h-3" />
                        Click squares to pick colors or enter hex codes
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {customColors.map((color, index) => (
                          <ColorPickerInput
                            key={index}
                            index={index}
                            color={color}
                            isLocked={isLocked}
                            themeColors={themeColors}
                            onChange={handleCustomColorChange}
                          />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                        Tip: Click the color square to open color picker
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

/** Individual color picker input with clickable square */
interface ColorPickerInputProps {
  index: number;
  color: string;
  isLocked: boolean;
  themeColors: ThemeColors;
  onChange: (index: number, value: string) => void;
}

function ColorPickerInput({
  index,
  color,
  isLocked,
  themeColors,
  onChange,
}: ColorPickerInputProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleSquareClick = useCallback(() => {
    if (!isLocked && colorInputRef.current) {
      colorInputRef.current.click();
    }
  }, [isLocked]);

  const handleColorPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(index, e.target.value);
    },
    [index, onChange]
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(index, e.target.value);
    },
    [index, onChange]
  );

  const displayColor = getDisplayColor(color);
  const hasValidColor = isValidHexColor(color);

  return (
    <div className="flex items-center gap-1.5">
      {/* Clickable color square with hidden color input */}
      <div className="relative">
        <button
          type="button"
          onClick={handleSquareClick}
          disabled={isLocked}
          className="w-8 h-8 rounded-lg border flex-shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          style={{
            backgroundColor: hasValidColor ? displayColor : themeColors.inputBackground,
            borderColor: hasValidColor ? displayColor : themeColors.borderColor,
            opacity: isLocked ? 0.6 : 1,
          }}
          title="Click to pick a color"
        >
          {!hasValidColor && (
            <Pipette
              className="w-3.5 h-3.5"
              style={{ color: themeColors.textTertiary }}
            />
          )}
        </button>
        {/* Hidden native color input */}
        <input
          ref={colorInputRef}
          type="color"
          value={hasValidColor ? displayColor : '#6366f1'}
          onChange={handleColorPickerChange}
          disabled={isLocked}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          style={{ visibility: 'hidden' }}
          tabIndex={-1}
        />
      </div>

      {/* Hex code text input */}
      <input
        type="text"
        value={color}
        onChange={handleTextChange}
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
  );
}

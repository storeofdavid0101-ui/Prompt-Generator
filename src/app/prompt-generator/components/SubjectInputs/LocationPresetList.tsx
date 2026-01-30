/**
 * LocationPresetList component
 * Renders the categorized list of location presets within the dropdown
 */

'use client';

import { memo, useCallback } from 'react';
import type { ThemeColors } from '../../config/types';
import type { LocationPreset } from '../../config/locationPresets';
import { KeyboardCodes } from './types';

interface LocationPresetListProps {
  presetsByCategory: Record<string, LocationPreset[]>;
  categoryNames: Record<string, string>;
  currentLocation: string;
  themeColors: ThemeColors;
  onSelect: (keywords: string) => void;
  categoryHeaderStyle: React.CSSProperties;
}

/**
 * LocationPresetList - Renders preset categories and items
 */
export const LocationPresetList = memo(function LocationPresetList({
  presetsByCategory,
  categoryNames,
  currentLocation,
  themeColors,
  onSelect,
  categoryHeaderStyle,
}: LocationPresetListProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, keywords: string) => {
      if (e.key === KeyboardCodes.ENTER || e.key === KeyboardCodes.SPACE) {
        e.preventDefault();
        onSelect(keywords);
      }
    },
    [onSelect]
  );

  return (
    <>
      {Object.entries(presetsByCategory).map(([category, presets]) => (
        <li
          key={category}
          role="group"
          aria-label={categoryNames[category] || category}
        >
          <div
            className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider"
            style={categoryHeaderStyle}
            role="presentation"
          >
            {categoryNames[category] || category}
          </div>
          <ul role="group">
            {presets.map((preset) => {
              const isSelected = currentLocation === preset.keywords;
              return (
                <li
                  key={preset.label}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  onClick={() => onSelect(preset.keywords)}
                  onKeyDown={(e) => handleKeyDown(e, preset.keywords)}
                  className="w-full px-3 py-2 text-sm text-left cursor-pointer transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-inset"
                  style={{
                    backgroundColor: isSelected
                      ? `${themeColors.accent}20`
                      : 'transparent',
                    color: themeColors.textPrimary,
                  }}
                >
                  {preset.label}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </>
  );
});

LocationPresetList.displayName = 'LocationPresetList';

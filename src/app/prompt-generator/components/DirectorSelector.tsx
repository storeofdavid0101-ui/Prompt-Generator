/**
 * Director style selector component
 * Allows selection of famous director visual styles
 */

'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { directorStyles } from '../config';
import type { ThemeColors } from '../config/types';

interface DirectorSelectorProps {
  selectedDirector: string;
  settingsLocked: boolean;
  onDirectorChange: (director: string) => void;
  themeColors: ThemeColors;
}

export function DirectorSelector({
  selectedDirector,
  settingsLocked,
  onDirectorChange,
  themeColors,
}: DirectorSelectorProps) {
  return (
    <div className="py-3">
      <label
        className="block text-xs font-medium mb-2 flex items-center gap-1.5"
        style={{ color: themeColors.textTertiary }}
      >
        <Sparkles className="w-3 h-3" /> Director Style
      </label>
      <select
        value={selectedDirector}
        onChange={(e) => onDirectorChange(e.target.value)}
        disabled={settingsLocked}
        className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
        style={{
          backgroundColor: themeColors.inputBackground,
          border: `1px solid ${themeColors.inputBorder}`,
          color: themeColors.textPrimary,
          opacity: settingsLocked ? 0.6 : 1,
        }}
      >
        <option value="">No director style</option>
        {directorStyles.map((director) => (
          <option key={director.name} value={director.name}>
            {director.name}
          </option>
        ))}
      </select>
      {selectedDirector && (
        <p className="text-xs mt-1.5" style={{ color: themeColors.textTertiary }}>
          Some styles locked to match {selectedDirector}&apos;s aesthetic
        </p>
      )}
    </div>
  );
}

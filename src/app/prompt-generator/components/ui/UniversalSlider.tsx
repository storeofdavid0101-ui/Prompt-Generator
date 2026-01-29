/**
 * Universal slider component for creative controls
 * Provides consistent slider styling with visual feedback
 */

'use client';

import React from 'react';
import type { ThemeColors } from '../../config/types';

interface UniversalSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: React.ElementType;
  disabled?: boolean;
  themeColors: ThemeColors;
  min?: number;
  max?: number;
}

export function UniversalSlider({
  label,
  value,
  onChange,
  icon: Icon,
  disabled = false,
  themeColors,
  min = 1,
  max = 100,
}: UniversalSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
          <span
            className="text-xs font-medium"
            style={{ color: themeColors.textSecondary }}
          >
            {label}
          </span>
        </div>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{
            backgroundColor: themeColors.promptBg,
            color: themeColors.textPrimary,
          }}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${themeColors.accent} 0%, ${themeColors.accent} ${percentage}%, ${themeColors.inputBackground} ${percentage}%, ${themeColors.inputBackground} 100%)`,
          opacity: disabled ? 0.6 : 1,
        }}
      />
    </div>
  );
}

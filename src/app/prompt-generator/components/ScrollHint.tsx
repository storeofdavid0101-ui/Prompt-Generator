/**
 * ScrollHint Component
 * Displays a floating scroll indicator to hint users there's more content below
 */

'use client';

import { ChevronDown } from 'lucide-react';
import { useThemeColors } from '../context';

interface ScrollHintProps {
  visible: boolean;
}

export function ScrollHint({ visible }: ScrollHintProps) {
  const themeColors = useThemeColors();

  if (!visible) return null;

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1 px-2 py-3 rounded-full backdrop-blur-sm animate-pulse"
      style={{
        backgroundColor: `${themeColors.cardBackground}cc`,
        border: `1px solid ${themeColors.borderColor}`,
      }}
    >
      <ChevronDown className="w-4 h-4" style={{ color: themeColors.accent }} />
      <span
        className="text-[10px] font-medium"
        style={{
          color: themeColors.textTertiary,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        More
      </span>
      <ChevronDown className="w-4 h-4" style={{ color: themeColors.accent }} />
    </div>
  );
}

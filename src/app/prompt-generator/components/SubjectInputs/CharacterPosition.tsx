/**
 * CharacterPosition component
 * 3-section grid for selecting character placement in frame
 * Based on rule of thirds composition
 */

'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ThemeColors } from '../../config/types';

/** Position option configuration */
interface PositionOption {
  id: string;
  label: string;
}

/** Available position options */
const positionOptions: PositionOption[] = [
  { id: 'left', label: 'Left' },
  { id: 'center', label: 'Center' },
  { id: 'right', label: 'Right' },
];

interface CharacterPositionProps {
  selectedPosition: string;
  isLocked: boolean;
  onPositionChange: (position: string) => void;
  themeColors: ThemeColors;
}

/**
 * CharacterPosition - Visual grid selector for character placement
 */
export const CharacterPosition = memo(function CharacterPosition({
  selectedPosition,
  isLocked,
  onPositionChange,
  themeColors,
}: CharacterPositionProps) {
  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.inputBorder}`,
      },
      section: {
        borderColor: themeColors.inputBorder,
      },
      sectionSelected: {
        backgroundColor: `${themeColors.accent}25`,
        borderColor: themeColors.accent,
      },
      sectionHover: {
        backgroundColor: `${themeColors.accent}10`,
      },
      label: {
        color: themeColors.textTertiary,
      },
      labelSelected: {
        color: themeColors.accent,
      },
      character: {
        backgroundColor: themeColors.textTertiary,
      },
      characterSelected: {
        backgroundColor: themeColors.accent,
      },
    }),
    [themeColors]
  );

  const handleSelect = (positionId: string) => {
    if (isLocked) return;
    // Toggle off if already selected, default to center
    onPositionChange(selectedPosition === positionId ? '' : positionId);
  };

  return (
    <div
      className="rounded-lg overflow-hidden flex h-16"
      style={{
        ...styles.container,
        opacity: isLocked ? 0.5 : 1,
      }}
    >
      {positionOptions.map((option, index) => {
        const isSelected = selectedPosition === option.id;
        const isFirst = index === 0;
        const isLast = index === positionOptions.length - 1;

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            disabled={isLocked}
            whileHover={!isLocked ? { backgroundColor: `${themeColors.accent}10` } : undefined}
            whileTap={!isLocked ? { scale: 0.98 } : undefined}
            className={`
              flex-1 flex flex-col items-center justify-center gap-1.5
              transition-all focus:outline-none focus:ring-2 focus:ring-inset
              ${!isFirst ? 'border-l' : ''}
            `}
            style={{
              ...(isSelected ? styles.sectionSelected : {}),
              borderColor: styles.section.borderColor,
            }}
            aria-label={`Position: ${option.label}`}
            aria-pressed={isSelected}
          >
            {/* Character indicator dot */}
            <div
              className="w-2 h-2 rounded-full transition-colors"
              style={isSelected ? styles.characterSelected : styles.character}
            />
            <span
              className="text-[9px] font-medium uppercase tracking-wide"
              style={isSelected ? styles.labelSelected : styles.label}
            >
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
});

CharacterPosition.displayName = 'CharacterPosition';

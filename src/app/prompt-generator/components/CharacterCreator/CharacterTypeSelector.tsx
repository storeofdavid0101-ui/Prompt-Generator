/**
 * Character Type Selector Component
 *
 * A segmented button toggle for selecting between Human and Other (Custom) character types.
 * Uses Framer Motion for smooth indicator animation.
 *
 * @module components/CharacterCreator/CharacterTypeSelector
 */

'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import type { ThemeColors, CharacterType } from '../../config/types';

interface CharacterTypeSelectorProps {
  value: CharacterType;
  onChange: (value: CharacterType) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

const options: { id: CharacterType; label: string; icon: typeof User }[] = [
  { id: 'human', label: 'Human', icon: User },
  { id: 'other', label: 'Other (Custom)', icon: Sparkles },
];

export const CharacterTypeSelector = memo(function CharacterTypeSelector({
  value,
  onChange,
  isLocked,
  themeColors,
}: CharacterTypeSelectorProps) {
  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: themeColors.inputBackground,
        borderColor: themeColors.inputBorder,
      },
    }),
    [themeColors]
  );

  return (
    <div
      className="flex rounded-lg border p-1"
      style={styles.container}
      role="radiogroup"
      aria-label="Character type"
    >
      {options.map((option) => {
        const isSelected = value === option.id;
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isLocked}
            onClick={() => !isLocked && onChange(option.id)}
            className="relative flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
            style={{
              color: isSelected ? '#fff' : themeColors.textSecondary,
              opacity: isLocked ? 0.6 : 1,
              cursor: isLocked ? 'not-allowed' : 'pointer',
            }}
          >
            {isSelected && (
              <motion.div
                layoutId="character-type-indicator"
                className="absolute inset-0 rounded-md"
                style={{ backgroundColor: themeColors.accent }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
              />
            )}
            <Icon className="relative z-10 w-3.5 h-3.5" />
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
});

CharacterTypeSelector.displayName = 'CharacterTypeSelector';

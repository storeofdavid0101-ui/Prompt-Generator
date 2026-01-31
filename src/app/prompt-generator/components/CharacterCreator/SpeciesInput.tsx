/**
 * Species Input Component
 *
 * Text input for custom species when "Other" character type is selected.
 * Shows placeholder examples and validates max length.
 *
 * @module components/CharacterCreator/SpeciesInput
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { Dna } from 'lucide-react';
import type { ThemeColors } from '../../config/types';

interface SpeciesInputProps {
  value: string;
  onChange: (value: string) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

const MAX_SPECIES_LENGTH = 100;

export const SpeciesInput = memo(function SpeciesInput({
  value,
  onChange,
  isLocked,
  themeColors,
}: SpeciesInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.inputBorder}`,
      },
      input: {
        color: themeColors.textPrimary,
      },
      icon: {
        color: themeColors.textTertiary,
      },
    }),
    [themeColors]
  );

  return (
    <div className="space-y-1.5">
      <label
        className="text-xs font-medium flex items-center gap-1.5"
        style={{ color: themeColors.textSecondary }}
      >
        <Dna className="w-3 h-3" />
        Species / Type
      </label>
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2.5"
        style={styles.container}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          disabled={isLocked}
          maxLength={MAX_SPECIES_LENGTH}
          placeholder="e.g., Elf, Robot, Dragon, Cyborg, Alien"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-inherit placeholder:opacity-50"
          style={{
            ...styles.input,
            opacity: isLocked ? 0.6 : 1,
          }}
          aria-label="Custom species or type"
        />
      </div>
      <p
        className="text-xs"
        style={{ color: themeColors.textTertiary }}
      >
        Enter the species or type of your non-human character
      </p>
    </div>
  );
});

SpeciesInput.displayName = 'SpeciesInput';

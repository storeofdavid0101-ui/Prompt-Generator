/**
 * Clothing Input Component
 *
 * Textarea for describing character attire/clothing.
 * Shows placeholder examples and helper text.
 *
 * @module components/CharacterCreator/ClothingInput
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { Shirt } from 'lucide-react';
import type { ThemeColors } from '../../config/types';

interface ClothingInputProps {
  value: string;
  onChange: (value: string) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

const MAX_CLOTHING_LENGTH = 300;

export const ClothingInput = memo(function ClothingInput({
  value,
  onChange,
  isLocked,
  themeColors,
}: ClothingInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const styles = useMemo(
    () => ({
      textarea: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.inputBorder}`,
        color: themeColors.textPrimary,
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
        <Shirt className="w-3 h-3" />
        Attire / Clothing
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        disabled={isLocked}
        maxLength={MAX_CLOTHING_LENGTH}
        placeholder="e.g., Tactical techwear vest, Victorian silk dress, Weathered leather jacket"
        rows={2}
        className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
        style={{
          ...styles.textarea,
          opacity: isLocked ? 0.6 : 1,
        }}
        aria-label="Character clothing or attire description"
      />
      <p
        className="text-xs"
        style={{ color: themeColors.textTertiary }}
      >
        Describe what the character is wearing. Be specific about style, material, and details.
      </p>
    </div>
  );
});

ClothingInput.displayName = 'ClothingInput';

/**
 * CharacterInput component
 * Text input for entering character descriptions with Enter key submission
 * Shows visual hint when content is present
 */

'use client';

import { memo, useCallback, useMemo, useRef } from 'react';
import { CornerDownLeft } from 'lucide-react';
import type { CharacterInputProps } from './types';
import { KeyboardCodes } from './types';

/**
 * CharacterInput - Input field for character descriptions with submit hint
 */
export const CharacterInput = memo(function CharacterInput({
  value,
  isLocked,
  onChange,
  onSubmit,
  themeColors,
}: CharacterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input value change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  // Handle keyboard events for Enter submission
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KeyboardCodes.ENTER && value.trim()) {
        e.preventDefault();
        onSubmit();
        // Keep focus on input for continuous entry
        inputRef.current?.focus();
      }
    },
    [value, onSubmit]
  );

  // Memoized styles to prevent recreation on each render
  const styles = useMemo(
    () => ({
      input: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.inputBorder}`,
        color: themeColors.textPrimary,
        opacity: isLocked ? 0.6 : 1,
      },
      hint: {
        backgroundColor: `${themeColors.accent}20`,
        color: themeColors.accent,
      },
    }),
    [themeColors, isLocked]
  );

  const hasValue = value.trim().length > 0;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="e.g., tall woman with red hair, wearing armor"
        disabled={isLocked}
        maxLength={500}
        className="w-full rounded-lg pl-3 pr-16 py-2 text-sm transition-all focus:outline-none focus:ring-2"
        style={styles.input}
        aria-label="Character description"
        aria-describedby={hasValue ? 'character-input-hint' : undefined}
      />
      {hasValue && (
        <div
          id="character-input-hint"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] pointer-events-none"
          style={styles.hint}
          role="status"
          aria-live="polite"
        >
          <CornerDownLeft className="w-3 h-3" aria-hidden="true" />
          <span>Enter</span>
        </div>
      )}
    </div>
  );
});

CharacterInput.displayName = 'CharacterInput';

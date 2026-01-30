/**
 * CharacterInput component
 * Textarea for entering character descriptions
 * Content is automatically included in prompt - button is only for adding multiple characters
 */

'use client';

import { memo, useCallback, useMemo, useRef } from 'react';
import { Plus, Check } from 'lucide-react';
import type { CharacterInputProps } from './types';

/**
 * CharacterInput - Textarea for character descriptions
 * Text is auto-included in prompt, button saves it to add more
 */
export const CharacterInput = memo(function CharacterInput({
  value,
  isLocked,
  onChange,
  onSubmit,
  themeColors,
}: CharacterInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle input value change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  // Handle add button click
  const handleAddClick = useCallback(() => {
    if (value.trim()) {
      onSubmit();
      // Keep focus for continuous entry
      textareaRef.current?.focus();
    }
  }, [value, onSubmit]);

  // Memoized styles
  const styles = useMemo(
    () => ({
      textarea: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.inputBorder}`,
        color: themeColors.textPrimary,
        opacity: isLocked ? 0.6 : 1,
      },
      addButton: {
        backgroundColor: 'transparent',
        border: `1px solid ${themeColors.borderColor}`,
        color: themeColors.textSecondary,
        opacity: isLocked || !value.trim() ? 0.5 : 1,
      },
      indicator: {
        backgroundColor: `${themeColors.success}15`,
        color: themeColors.success,
      },
      helperText: {
        color: themeColors.textTertiary,
      },
    }),
    [themeColors, isLocked, value]
  );

  const hasValue = value.trim().length > 0;

  return (
    <div className="space-y-2">
      {/* Textarea for character description */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Describe your character: appearance, clothing, pose, expression..."
        disabled={isLocked}
        maxLength={500}
        rows={2}
        className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
        style={styles.textarea}
        aria-label="Character description"
      />

      {/* Auto-include indicator when text is present */}
      {hasValue && (
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px]"
          style={styles.indicator}
        >
          <Check className="w-3 h-3" />
          <span>This character will be included in your prompt</span>
        </div>
      )}

      {/* Add Another Character Button - for multiple characters */}
      <button
        type="button"
        onClick={handleAddClick}
        disabled={isLocked || !hasValue}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        style={styles.addButton}
        aria-label="Save and add another character"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Another Character</span>
      </button>

      {/* Helper text */}
      <p className="text-[10px]" style={styles.helperText}>
        {hasValue
          ? 'Click the button above only if you want to add more characters'
          : 'Describe your character above - it will be automatically included'}
      </p>
    </div>
  );
});

CharacterInput.displayName = 'CharacterInput';

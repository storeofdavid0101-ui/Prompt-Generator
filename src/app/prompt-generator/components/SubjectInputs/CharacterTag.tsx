/**
 * CharacterTag component
 * Displays a single character description as a removable card
 * Shows full content with remove button
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, X } from 'lucide-react';
import type { CharacterTagProps } from './types';

/** Animation variants for tag appearance */
const tagVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
} as const;

/**
 * CharacterTag - Displays a character description as a removable card
 */
export const CharacterTag = memo(function CharacterTag({
  item,
  isLocked,
  onRemove,
  themeColors,
}: CharacterTagProps) {
  // Handle remove button click
  const handleRemove = useCallback(() => {
    if (!isLocked) {
      onRemove(item.id);
    }
  }, [isLocked, onRemove, item.id]);

  // Memoized styles to prevent recreation on each render
  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.borderColor}`,
      },
      header: {
        color: themeColors.accent,
      },
      content: {
        color: themeColors.textPrimary,
      },
      removeButton: {
        color: themeColors.textTertiary,
        opacity: isLocked ? 0.5 : 1,
        cursor: isLocked ? 'not-allowed' : 'pointer',
      },
    }),
    [themeColors, isLocked]
  );

  return (
    <motion.div
      variants={tagVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className="w-full rounded-lg p-2.5"
      style={styles.container}
      role="listitem"
    >
      <div className="flex items-start gap-2">
        <User
          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
          style={styles.header}
          aria-hidden="true"
        />
        <p
          className="flex-1 text-xs leading-relaxed"
          style={styles.content}
        >
          {item.content}
        </p>
        <button
          type="button"
          onClick={handleRemove}
          disabled={isLocked}
          className="flex-shrink-0 p-1 rounded hover:bg-black/10 transition-all focus:outline-none focus:ring-1"
          style={styles.removeButton}
          aria-label={`Remove character`}
          title={isLocked ? 'Section is locked' : 'Remove character'}
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
});

CharacterTag.displayName = 'CharacterTag';

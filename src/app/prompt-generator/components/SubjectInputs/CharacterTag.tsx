/**
 * CharacterTag component
 * Displays a single character description as a removable tag
 * Accessible with proper button semantics and keyboard support
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, X } from 'lucide-react';
import type { CharacterTagProps } from './types';

/** Animation variants for tag appearance */
const tagVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
} as const;

/** Maximum display length for character content */
const MAX_DISPLAY_LENGTH = 150;

/**
 * CharacterTag - Displays a character description as a removable chip
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

  // Handle keyboard activation of remove button
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isLocked) {
        e.preventDefault();
        onRemove(item.id);
      }
    },
    [isLocked, onRemove, item.id]
  );

  // Memoized styles to prevent recreation on each render
  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: themeColors.promptBg,
        color: themeColors.textPrimary,
        border: `1px solid ${themeColors.borderColor}`,
      },
      icon: {
        color: themeColors.accent,
      },
      removeButton: {
        color: themeColors.textTertiary,
        opacity: isLocked ? 0.5 : 1,
        cursor: isLocked ? 'not-allowed' : 'pointer',
      },
    }),
    [themeColors, isLocked]
  );

  // Truncate content if too long
  const displayContent = useMemo(() => {
    if (item.content.length <= MAX_DISPLAY_LENGTH) {
      return item.content;
    }
    return `${item.content.slice(0, MAX_DISPLAY_LENGTH)}...`;
  }, [item.content]);

  return (
    <motion.div
      variants={tagVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
      style={styles.container}
      role="listitem"
    >
      <User
        className="w-3 h-3 flex-shrink-0"
        style={styles.icon}
        aria-hidden="true"
      />
      <span
        className="max-w-[150px] truncate"
        title={item.content.length > MAX_DISPLAY_LENGTH ? item.content : undefined}
      >
        {displayContent}
      </span>
      <button
        type="button"
        onClick={handleRemove}
        onKeyDown={handleKeyDown}
        disabled={isLocked}
        className="ml-1 p-0.5 rounded hover:opacity-70 transition-opacity focus:outline-none focus:ring-1"
        style={styles.removeButton}
        aria-label={`Remove character: ${item.content.slice(0, 30)}`}
        title={isLocked ? 'Section is locked' : 'Remove character'}
      >
        <X className="w-3 h-3" aria-hidden="true" />
      </button>
    </motion.div>
  );
});

CharacterTag.displayName = 'CharacterTag';

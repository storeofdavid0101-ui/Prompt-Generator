/**
 * MagicButton component
 * Wand button for triggering magic randomization
 * Includes sparkle animation on activation
 */

'use client';

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import type { ThemeColors } from '../config/types';

// Pre-computed sparkle offsets for deterministic animation
const SPARKLE_OFFSETS_SMALL = [
  { x: -12, y: -10 },
  { x: 8, y: -14 },
  { x: 14, y: 5 },
  { x: -8, y: 12 },
  { x: 10, y: 10 },
  { x: -14, y: -5 },
];

const SPARKLE_OFFSETS_LARGE = [
  { x: -80, y: -25, scale: 1.2, delay: 0 },
  { x: -40, y: -35, scale: 0.8, delay: 0.05 },
  { x: 20, y: -40, scale: 1.5, delay: 0.1 },
  { x: 60, y: -30, scale: 1.0, delay: 0.02 },
  { x: 90, y: -20, scale: 1.3, delay: 0.15 },
  { x: -60, y: -15, scale: 0.9, delay: 0.08 },
  { x: 0, y: -45, scale: 1.4, delay: 0.03 },
  { x: 40, y: -50, scale: 0.7, delay: 0.12 },
  { x: -20, y: -35, scale: 1.1, delay: 0.07 },
  { x: 70, y: -45, scale: 0.85, delay: 0.18 },
  { x: -90, y: -40, scale: 1.25, delay: 0.04 },
  { x: 30, y: -20, scale: 0.95, delay: 0.09 },
];

interface MagicButtonProps {
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  themeColors: ThemeColors;
}

/**
 * MagicButton - Compact wand button for randomization
 */
export const MagicButton = memo(function MagicButton({
  onClick,
  disabled = false,
  size = 'sm',
  label,
  themeColors,
}: MagicButtonProps) {
  const [isSparkle, setIsSparkle] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled) return;

    // Trigger sparkle animation
    setIsSparkle(true);
    setTimeout(() => setIsSparkle(false), 600);

    // Execute the randomization
    onClick();
  }, [onClick, disabled]);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1 } : undefined}
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      className={`
        ${sizeClasses[size]}
        relative flex items-center justify-center rounded-lg
        transition-all duration-200 focus:outline-none focus:ring-2
        ${label ? 'gap-1.5 px-3 w-auto' : ''}
      `}
      style={{
        backgroundColor: isSparkle
          ? `${themeColors.accent}30`
          : `${themeColors.accent}15`,
        border: `1px solid ${isSparkle ? themeColors.accent : themeColors.inputBorder}`,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      aria-label={label || 'Randomize'}
      title={label || 'Randomize'}
    >
      {/* Sparkle particles */}
      <AnimatePresence>
        {isSparkle && (
          <>
            {SPARKLE_OFFSETS_SMALL.map((offset, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: offset.x,
                  y: offset.y,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: themeColors.accent,
                  boxShadow: `0 0 4px ${themeColors.accent}`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Wand icon with rotation on sparkle */}
      <motion.span
        animate={isSparkle ? { rotate: [0, -20, 20, 0] } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Wand2
          className={iconSizes[size]}
          style={{ color: themeColors.accent }}
        />
      </motion.span>

      {/* Optional label */}
      {label && (
        <span
          className="text-xs font-medium"
          style={{ color: themeColors.accent }}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
});

MagicButton.displayName = 'MagicButton';

/**
 * RandomizeAllButton - Large button for randomizing all fields
 */
interface RandomizeAllButtonProps {
  onClick: () => void;
  disabled?: boolean;
  themeColors: ThemeColors;
}

export const RandomizeAllButton = memo(function RandomizeAllButton({
  onClick,
  disabled = false,
  themeColors,
}: RandomizeAllButtonProps) {
  const [isSparkle, setIsSparkle] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled) return;

    setIsSparkle(true);
    setTimeout(() => setIsSparkle(false), 800);

    onClick();
  }, [onClick, disabled]);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02, y: -1 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 relative overflow-hidden"
      style={{
        background: isSparkle
          ? `linear-gradient(135deg, ${themeColors.accent}40, ${themeColors.accent}20)`
          : `linear-gradient(135deg, ${themeColors.accent}25, ${themeColors.accent}10)`,
        border: `1px solid ${isSparkle ? themeColors.accent : themeColors.inputBorder}`,
        boxShadow: isSparkle
          ? `0 0 20px ${themeColors.accent}40`
          : 'none',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      aria-label="Randomize all fields"
    >
      {/* Sparkle wave effect */}
      <AnimatePresence>
        {isSparkle && (
          <motion.div
            initial={{ x: '-100%', opacity: 0.5 }}
            animate={{ x: '200%', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${themeColors.accent}50, transparent)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating sparkles */}
      <AnimatePresence>
        {isSparkle && (
          <>
            {SPARKLE_OFFSETS_LARGE.map((offset, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: offset.x,
                  y: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: offset.scale,
                  y: offset.y,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                  delay: offset.delay,
                }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: themeColors.accent,
                  boxShadow: `0 0 6px ${themeColors.accent}`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.span
        animate={isSparkle ? { rotate: [0, -15, 15, -10, 10, 0] } : { rotate: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Wand2
          className="w-5 h-5"
          style={{ color: themeColors.accent }}
        />
      </motion.span>
      <span
        className="text-sm font-semibold"
        style={{ color: themeColors.accent }}
      >
        Randomize All
      </span>
    </motion.button>
  );
});

RandomizeAllButton.displayName = 'RandomizeAllButton';

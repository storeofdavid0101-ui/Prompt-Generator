/**
 * MagicGlow component
 * Wrapper that adds a glow/sparkle effect when activated
 */

'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ThemeColors } from '../config/types';

// Pre-computed sparkle positions for deterministic animation
const GLOW_SPARKLE_POSITIONS = [
  { x: -15, y: -12, top: 25, left: 30 },
  { x: 18, y: -8, top: 40, left: 70 },
  { x: -10, y: 15, top: 65, left: 35 },
  { x: 12, y: 10, top: 50, left: 60 },
];

interface MagicGlowProps {
  isActive: boolean;
  children: React.ReactNode;
  themeColors: ThemeColors;
  className?: string;
}

/**
 * MagicGlow - Adds a subtle glow effect around children when activated
 */
export const MagicGlow = memo(function MagicGlow({
  isActive,
  children,
  themeColors,
  className = '',
}: MagicGlowProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-lg pointer-events-none z-10"
            style={{
              boxShadow: `
                0 0 8px ${themeColors.accent}60,
                0 0 16px ${themeColors.accent}40,
                inset 0 0 8px ${themeColors.accent}20
              `,
              border: `1px solid ${themeColors.accent}80`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Sparkle particles */}
      <AnimatePresence>
        {isActive && (
          <>
            {GLOW_SPARKLE_POSITIONS.map((pos, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: 1.5,
                  x: [0, pos.x],
                  y: [0, pos.y],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: i * 0.05,
                }}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-20"
                style={{
                  backgroundColor: themeColors.accent,
                  boxShadow: `0 0 4px ${themeColors.accent}`,
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Actual content */}
      {children}
    </div>
  );
});

MagicGlow.displayName = 'MagicGlow';

/**
 * MagicPulse - Simpler pulse effect for smaller elements
 */
interface MagicPulseProps {
  isActive: boolean;
  children: React.ReactNode;
  themeColors: ThemeColors;
}

export const MagicPulse = memo(function MagicPulse({
  isActive,
  children,
  themeColors,
}: MagicPulseProps) {
  return (
    <motion.div
      animate={
        isActive
          ? {
              boxShadow: [
                `0 0 0px ${themeColors.accent}00`,
                `0 0 12px ${themeColors.accent}60`,
                `0 0 0px ${themeColors.accent}00`,
              ],
            }
          : {}
      }
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
});

MagicPulse.displayName = 'MagicPulse';

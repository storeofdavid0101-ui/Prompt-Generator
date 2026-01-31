/**
 * BlockedTooltip component
 * Shows a tooltip explaining why an option is blocked
 */

'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { ThemeColors } from '../../config/types';
import type { BlockReason } from '../../config/types/conflict';

interface BlockedTooltipProps {
  /** The block reason to display */
  reason: BlockReason | undefined;
  /** Whether the option is blocked */
  isBlocked: boolean;
  /** Theme colors for styling */
  themeColors: ThemeColors;
  /** Children to wrap with tooltip */
  children: React.ReactNode;
  /** Optional position hint */
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Wraps content with a hover tooltip that explains why an option is blocked
 */
export const BlockedTooltip = memo(function BlockedTooltip({
  reason,
  isBlocked,
  themeColors,
  children,
  position = 'top',
}: BlockedTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate tooltip position based on container position
  useEffect(() => {
    if (isHovered && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = -tooltipRect.height - 8;
          left = (containerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = containerRect.height + 8;
          left = (containerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = (containerRect.height - tooltipRect.height) / 2;
          left = -tooltipRect.width - 8;
          break;
        case 'right':
          top = (containerRect.height - tooltipRect.height) / 2;
          left = containerRect.width + 8;
          break;
      }

      setTooltipPosition({ top, left });
    }
  }, [isHovered, position]);

  if (!isBlocked || !reason) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[9999] px-3 py-2 rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              backgroundColor: themeColors.cardBackground,
              border: `1px solid ${themeColors.warning}40`,
              boxShadow: `0 4px 12px ${themeColors.warning}20`,
            }}
          >
            {/* Arrow */}
            <div
              className="absolute w-2 h-2 rotate-45"
              style={{
                backgroundColor: themeColors.cardBackground,
                borderLeft: position === 'bottom' || position === 'right' ? `1px solid ${themeColors.warning}40` : 'none',
                borderTop: position === 'bottom' || position === 'left' ? `1px solid ${themeColors.warning}40` : 'none',
                borderRight: position === 'top' || position === 'left' ? `1px solid ${themeColors.warning}40` : 'none',
                borderBottom: position === 'top' || position === 'right' ? `1px solid ${themeColors.warning}40` : 'none',
                ...(position === 'top' && { bottom: -4, left: '50%', transform: 'translateX(-50%) rotate(45deg)' }),
                ...(position === 'bottom' && { top: -4, left: '50%', transform: 'translateX(-50%) rotate(45deg)' }),
                ...(position === 'left' && { right: -4, top: '50%', transform: 'translateY(-50%) rotate(45deg)' }),
                ...(position === 'right' && { left: -4, top: '50%', transform: 'translateY(-50%) rotate(45deg)' }),
              }}
            />

            {/* Content */}
            <div className="flex items-start gap-2">
              <AlertTriangle
                className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                style={{ color: themeColors.warning }}
              />
              <div className="text-xs">
                <div className="font-medium" style={{ color: themeColors.textPrimary }}>
                  Blocked by {reason.source}
                </div>
                <div style={{ color: themeColors.textTertiary }}>
                  {reason.reason}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

BlockedTooltip.displayName = 'BlockedTooltip';

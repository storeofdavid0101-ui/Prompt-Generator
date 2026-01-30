/**
 * Collapsible section header component
 * Provides consistent styling for expandable sections throughout the app
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Unlock, HelpCircle, X } from 'lucide-react';
import type { ThemeColors } from '../../config/types';
import type { HelpDescription } from '../../config/helpDescriptions';

interface TooltipPosition {
  top: number;
  left: number;
  width: number;
}

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  sectionKey: string;
  badge?: string;
  isExpanded: boolean;
  isLocked?: boolean;
  help?: HelpDescription;
  onToggle: (key: string) => void;
  onToggleLock?: () => void;
  themeColors: ThemeColors;
}

export function SectionHeader({
  title,
  icon: Icon,
  sectionKey,
  badge,
  isExpanded,
  isLocked,
  help,
  onToggle,
  onToggleLock,
  themeColors,
}: SectionHeaderProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0, width: 300 });
  const helpButtonRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Track if component is mounted (for Portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate tooltip position
  const updatePosition = useCallback(() => {
    if (helpButtonRef.current) {
      const rect = helpButtonRef.current.getBoundingClientRect();
      const containerWidth = Math.min(320, window.innerWidth - 32);
      setPosition({
        top: rect.bottom + 8,
        left: Math.max(16, Math.min(rect.left - 100, window.innerWidth - containerWidth - 16)),
        width: containerWidth,
      });
    }
  }, []);

  // Update position when opening and on scroll/resize
  useEffect(() => {
    if (showHelp) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showHelp, updatePosition]);

  // Close help when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickOnButton = helpButtonRef.current?.contains(target);
      const isClickOnTooltip = tooltipRef.current?.contains(target);

      if (!isClickOnButton && !isClickOnTooltip) {
        setShowHelp(false);
      }
    };

    if (showHelp) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showHelp]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-3">
        <button
          onClick={() => onToggle(sectionKey)}
          className="flex-1 flex items-center gap-2 group"
        >
          <Icon className="w-4 h-4" style={{ color: themeColors.accent }} />
          <span
            className="text-sm font-medium"
            style={{ color: themeColors.textPrimary }}
          >
            {title}
          </span>
          {help && (
            <span
              ref={helpButtonRef}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setShowHelp(!showHelp);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  setShowHelp(!showHelp);
                }
              }}
              className="p-0.5 rounded hover:bg-black/5 cursor-pointer"
            >
              <HelpCircle
                className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: showHelp ? themeColors.accent : themeColors.textTertiary }}
              />
            </span>
          )}
          {badge && (
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: themeColors.promptBg,
                color: themeColors.accent,
              }}
            >
              {badge}
            </span>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              className="w-4 h-4"
              style={{ color: themeColors.accent }}
            />
          </motion.div>
        </button>

        {onToggleLock && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock();
            }}
            className="p-1 rounded-md transition-colors"
            style={{
              color: isLocked ? themeColors.accent : themeColors.textTertiary,
              backgroundColor: isLocked ? `${themeColors.accent}15` : 'transparent',
            }}
            title={isLocked ? 'Unlock this section' : 'Lock this section'}
          >
            {isLocked ? (
              <Lock className="w-3.5 h-3.5" />
            ) : (
              <Unlock className="w-3.5 h-3.5" />
            )}
          </motion.button>
        )}
      </div>

      {/* Help Tooltip - rendered via Portal to avoid overflow clipping */}
      {mounted && createPortal(
        <AnimatePresence>
          {showHelp && help && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed z-[9999] rounded-lg shadow-lg overflow-hidden"
              style={{
                top: position.top,
                left: position.left,
                width: position.width,
                backgroundColor: themeColors.cardBackground,
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{
                  backgroundColor: `${themeColors.accent}10`,
                  borderBottom: `1px solid ${themeColors.borderColor}`,
                }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: themeColors.accent }}
                >
                  {help.title}
                </span>
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  className="p-0.5 rounded hover:bg-black/10 transition-colors"
                  aria-label="Close help"
                >
                  <X className="w-3.5 h-3.5" style={{ color: themeColors.textTertiary }} />
                </button>
              </div>

              {/* Content */}
              <div className="px-3 py-2.5 space-y-2">
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: themeColors.textSecondary }}
                >
                  {help.description}
                </p>

                {help.tip && (
                  <div
                    className="flex items-start gap-2 px-2.5 py-2 rounded-md"
                    style={{ backgroundColor: themeColors.inputBackground }}
                  >
                    <span className="text-[10px]" role="img" aria-label="tip">
                      💡
                    </span>
                    <p
                      className="text-[11px] leading-relaxed"
                      style={{ color: themeColors.textTertiary }}
                    >
                      {help.tip}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

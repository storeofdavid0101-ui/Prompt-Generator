/**
 * Collapsible section header component
 * Provides consistent styling for expandable sections throughout the app
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Unlock, HelpCircle, X } from 'lucide-react';
import type { ThemeColors } from '../../config/types';
import type { HelpDescription } from '../../config/helpDescriptions';

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
  const helpRef = useRef<HTMLDivElement>(null);

  // Close help when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setShowHelp(false);
      }
    };

    if (showHelp) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
              style={{ color: themeColors.textTertiary }}
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

      {/* Help Tooltip */}
      <AnimatePresence>
        {showHelp && help && (
          <motion.div
            ref={helpRef}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 right-0 mt-1 rounded-lg shadow-lg overflow-hidden"
            style={{
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
      </AnimatePresence>
    </div>
  );
}

/**
 * Output bar component
 * Sticky bottom bar with prompt preview and action buttons
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, RotateCcw, Copy, Check, ChevronUp, ChevronDown } from 'lucide-react';
import type { ThemeColors } from '../config/types';

interface OutputBarProps {
  prompt: string;
  copied: boolean;
  onReset: () => void;
  onCopy: () => void;
  themeColors: ThemeColors;
}

export function OutputBar({
  prompt,
  copied,
  onReset,
  onCopy,
  themeColors,
}: OutputBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Auto-expand entire output bar and prompt preview when user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
      if (scrolledToBottom) {
        setIsMinimized(false);
        setIsExpanded(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-xl z-50"
      style={{
        backgroundColor: isMinimized ? `${themeColors.cardBackground}ee` : themeColors.cardBackground,
        borderColor: themeColors.borderColor,
      }}
    >
      <div className="max-w-[480px] mx-auto">
        {/* Minimize/Expand Toggle */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-full flex items-center justify-center py-1 hover:bg-black/5 transition-colors"
        >
          {isMinimized ? (
            <ChevronUp className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
          ) : (
            <ChevronDown className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
          )}
        </button>

        <AnimatePresence>
          {isMinimized ? (
            // Minimized: Just copy button
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-3"
            >
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onReset}
                  className="p-2 rounded-lg border"
                  style={{
                    borderColor: themeColors.borderColor,
                    color: themeColors.textSecondary,
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onCopy}
                  className="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: copied ? themeColors.success : themeColors.accent,
                    color: '#fff',
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // Expanded: Full view
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4"
            >
              {/* Live Preview */}
              <div
                className="rounded-xl p-3 mb-3 overflow-hidden cursor-pointer transition-all"
                style={{
                  backgroundColor: themeColors.promptBg,
                  border: `1px solid ${themeColors.borderColor}`,
                }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex items-start gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    {isExpanded ? (
                      <EyeOff className="w-4 h-4" style={{ color: themeColors.accent }} />
                    ) : (
                      <Eye className="w-4 h-4" style={{ color: themeColors.accent }} />
                    )}
                  </motion.div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={isExpanded ? 'expanded' : 'collapsed'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`text-xs font-mono leading-relaxed ${isExpanded ? '' : 'line-clamp-1'}`}
                      style={{ color: themeColors.textPrimary }}
                    >
                      {prompt}
                    </motion.p>
                  </AnimatePresence>
                </div>
                {!isExpanded && (
                  <p
                    className="text-[10px] mt-1 ml-6"
                    style={{ color: themeColors.textTertiary }}
                  >
                    Click to expand
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onReset}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: themeColors.borderColor,
                    color: themeColors.textSecondary,
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCopy}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: copied ? themeColors.success : themeColors.accent,
                    color: '#fff',
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Prompt
                    </>
                  )}
                </motion.button>
              </div>

              {/* Disclaimer */}
              <p
                className="text-[10px] text-center mt-3 opacity-60"
                style={{ color: themeColors.textTertiary }}
              >
                All director styles are for inspirational purposes and are not endorsed by the artists.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

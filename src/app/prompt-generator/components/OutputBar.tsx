/**
 * Output bar component
 * Sticky bottom bar with prompt preview and action buttons
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, RotateCcw, Copy, Check } from 'lucide-react';
import type { ThemeColors } from '../config/types';

interface OutputBarProps {
  prompt: string;
  copied: boolean;
  settingsLocked: boolean;
  onReset: () => void;
  onCopy: () => void;
  themeColors: ThemeColors;
}

export function OutputBar({
  prompt,
  copied,
  settingsLocked,
  onReset,
  onCopy,
  themeColors,
}: OutputBarProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-xl z-50"
      style={{
        backgroundColor: themeColors.cardBackground,
        borderColor: themeColors.borderColor,
      }}
    >
      <div className="max-w-[480px] mx-auto p-4">
        {/* Live Preview */}
        <div
          className="rounded-xl p-3 mb-3 overflow-hidden"
          style={{
            backgroundColor: themeColors.promptBg,
            border: `1px solid ${themeColors.borderColor}`,
          }}
        >
          <div className="flex items-start gap-2">
            <Eye
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color: themeColors.accent }}
            />
            <p
              className="text-xs font-mono leading-relaxed line-clamp-2"
              style={{ color: themeColors.textPrimary }}
            >
              {prompt}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            disabled={settingsLocked}
            className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border"
            style={{
              backgroundColor: 'transparent',
              borderColor: themeColors.borderColor,
              color: themeColors.textSecondary,
              opacity: settingsLocked ? 0.6 : 1,
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
      </div>
    </motion.div>
  );
}

/**
 * Conflict warning banner component
 * Displays active conflicts between selected options
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';
import type { ThemeColors, ConflictResult } from '../config/types';

interface ConflictBannerProps {
  conflicts: ConflictResult;
  themeColors: ThemeColors;
}

export function ConflictBanner({ conflicts, themeColors }: ConflictBannerProps) {
  const hasConflicts = conflicts.activeConflicts.length > 0;
  const hasStackingWarnings = conflicts.effectStackingWarnings?.length > 0;

  return (
    <AnimatePresence>
      {/* Active Conflicts (errors) */}
      {hasConflicts && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-xl p-3 border"
          style={{
            backgroundColor: themeColors.warning + '15',
            borderColor: themeColors.warning + '40',
          }}
        >
          <div className="flex items-start gap-2">
            <AlertTriangle
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: themeColors.warning }}
            />
            <div>
              <p
                className="text-xs font-medium mb-1"
                style={{ color: themeColors.warning }}
              >
                Parameter Conflicts Detected
              </p>
              <ul
                className="text-xs space-y-0.5"
                style={{ color: themeColors.textSecondary }}
              >
                {conflicts.activeConflicts.map((conflict, i) => (
                  <li key={i}>• {conflict}</li>
                ))}
              </ul>
              {conflicts.warningMessage && (
                <p
                  className="text-xs mt-1 italic"
                  style={{ color: themeColors.textTertiary }}
                >
                  {conflicts.warningMessage}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Effect Stacking Warnings (red warning) */}
      {hasStackingWarnings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-xl p-3 border"
          style={{
            backgroundColor: '#ef444415',
            borderColor: '#ef444440',
          }}
        >
          <div className="flex items-start gap-2">
            <AlertTriangle
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: '#ef4444' }}
            />
            <div>
              <p
                className="text-xs font-medium mb-1"
                style={{ color: '#ef4444' }}
              >
                Effect Stacking Notice
              </p>
              {conflicts.effectStackingWarnings.map((warning, i) => (
                <p
                  key={i}
                  className="text-xs mb-1 last:mb-0"
                  style={{ color: themeColors.textSecondary }}
                >
                  {warning.message}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

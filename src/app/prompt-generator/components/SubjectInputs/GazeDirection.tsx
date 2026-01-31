/**
 * GazeDirection component
 * Grid-based selector for character gaze/look direction
 * Uses Lucide icons for visual representation
 */

'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  UserX,
  RotateCcw,
} from 'lucide-react';
import type { ThemeColors } from '../../config/types';

/** Gaze direction option configuration */
interface GazeOption {
  id: string;
  label: string;
  icon: React.ElementType;
  keywords: string;
}

/** Available gaze direction options */
const gazeOptions: GazeOption[] = [
  {
    id: 'direct',
    label: 'Direct',
    icon: Eye,
    keywords: 'looking directly at the camera, intense eye contact',
  },
  {
    id: 'left',
    label: 'Left',
    icon: ArrowLeft,
    keywords: 'looking away towards the left of the frame, profile view',
  },
  {
    id: 'right',
    label: 'Right',
    icon: ArrowRight,
    keywords: 'looking away towards the right of the frame, profile view',
  },
  {
    id: 'up',
    label: 'Up',
    icon: ArrowUp,
    keywords: 'looking upwards, head tilted up, gazing at the sky',
  },
  {
    id: 'down',
    label: 'Down',
    icon: ArrowDown,
    keywords: 'looking downwards, pensive expression, eyes cast down',
  },
  {
    id: 'away',
    label: 'Away',
    icon: UserX,
    keywords: 'facing away from the camera, back to camera, mysterious atmosphere',
  },
  {
    id: 'shoulder',
    label: 'Over Shoulder',
    icon: RotateCcw,
    keywords: 'looking back over the shoulder towards the camera',
  },
];

interface GazeDirectionProps {
  selectedGaze: string;
  isLocked: boolean;
  onGazeChange: (gaze: string) => void;
  themeColors: ThemeColors;
}

/**
 * Get the keywords for a gaze direction ID
 */
export function getGazeKeywords(gazeId: string): string | null {
  const option = gazeOptions.find((o) => o.id === gazeId);
  return option ? option.keywords : null;
}

/**
 * GazeDirection - Icon-based grid selector for character gaze direction
 */
export const GazeDirection = memo(function GazeDirection({
  selectedGaze,
  isLocked,
  onGazeChange,
  themeColors,
}: GazeDirectionProps) {
  const styles = useMemo(
    () => ({
      button: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.inputBorder}`,
        color: themeColors.textSecondary,
      },
      buttonSelected: {
        backgroundColor: `${themeColors.accent}20`,
        border: `1px solid ${themeColors.accent}`,
        color: themeColors.accent,
      },
      buttonDisabled: {
        opacity: 0.5,
      },
    }),
    [themeColors]
  );

  const handleSelect = (gazeId: string) => {
    if (isLocked) return;
    // Toggle off if already selected
    onGazeChange(selectedGaze === gazeId ? '' : gazeId);
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {gazeOptions.map((option) => {
        const isSelected = selectedGaze === option.id;
        const Icon = option.icon;

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            disabled={isLocked}
            whileHover={!isLocked ? { scale: 1.02 } : undefined}
            whileTap={!isLocked ? { scale: 0.98 } : undefined}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all focus:outline-none focus:ring-2"
            style={{
              ...(isSelected ? styles.buttonSelected : styles.button),
              ...(isLocked ? styles.buttonDisabled : {}),
            }}
            aria-label={`Gaze direction: ${option.label}`}
            aria-pressed={isSelected}
          >
            <Icon
              className="w-4 h-4"
              style={{
                color: isSelected ? themeColors.accent : themeColors.textTertiary,
              }}
            />
            <span
              className="text-[10px] font-medium"
              style={{
                color: isSelected ? themeColors.accent : themeColors.textTertiary,
              }}
            >
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
});

GazeDirection.displayName = 'GazeDirection';

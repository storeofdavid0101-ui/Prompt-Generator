/**
 * PoseAction component
 * Grid-based selector for character pose/action
 * Focused on cinematic stills and frozen motion
 */

'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Footprints,
  Zap,
  Armchair,
  PersonStanding,
  Swords,
} from 'lucide-react';
import type { ThemeColors } from '../../config/types';

/** Pose/Action option configuration */
interface PoseOption {
  id: string;
  label: string;
  icon: React.ElementType;
  keywords: string;
}

/** Available pose/action options */
const poseOptions: PoseOption[] = [
  {
    id: 'standing',
    label: 'Standing',
    icon: User,
    keywords: 'standing still, composed, cinematic portrait stance',
  },
  {
    id: 'stride',
    label: 'Mid-Stride',
    icon: Footprints,
    keywords: 'captured mid-stride, walking, natural movement, slight background motion blur',
  },
  {
    id: 'sprint',
    label: 'Sprint',
    icon: Zap,
    keywords: 'frozen in high-speed run, dynamic body tilt, intense energy, frozen motion, sharp focus',
  },
  {
    id: 'seated',
    label: 'Seated',
    icon: Armchair,
    keywords: 'sitting down, cinematic posture, integrated into the environment',
  },
  {
    id: 'kneeling',
    label: 'Kneeling',
    icon: PersonStanding,
    keywords: 'kneeling on the ground, low perspective, dramatic silhouette',
  },
  {
    id: 'combat',
    label: 'Combat',
    icon: Swords,
    keywords: 'mid-action fighting stance, aggressive energy, frozen dynamic motion',
  },
];

interface PoseActionProps {
  selectedPose: string;
  isLocked: boolean;
  onPoseChange: (pose: string) => void;
  themeColors: ThemeColors;
}

/**
 * Get the keywords for a pose ID
 */
export function getPoseKeywords(poseId: string): string | null {
  const option = poseOptions.find((o) => o.id === poseId);
  return option ? option.keywords : null;
}

/**
 * PoseAction - Icon-based grid selector for character pose/action
 */
export const PoseAction = memo(function PoseAction({
  selectedPose,
  isLocked,
  onPoseChange,
  themeColors,
}: PoseActionProps) {
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

  const handleSelect = (poseId: string) => {
    if (isLocked) return;
    // Toggle off if already selected
    onPoseChange(selectedPose === poseId ? '' : poseId);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {poseOptions.map((option) => {
        const isSelected = selectedPose === option.id;
        const Icon = option.icon;

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            disabled={isLocked}
            whileHover={!isLocked ? { scale: 1.02 } : undefined}
            whileTap={!isLocked ? { scale: 0.98 } : undefined}
            className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-lg transition-all focus:outline-none focus:ring-2"
            style={{
              ...(isSelected ? styles.buttonSelected : styles.button),
              ...(isLocked ? styles.buttonDisabled : {}),
            }}
            aria-label={`Pose: ${option.label}`}
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

PoseAction.displayName = 'PoseAction';

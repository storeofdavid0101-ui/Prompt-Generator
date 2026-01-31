/**
 * Feature Sliders Component
 *
 * A grouped collection of sliders for adjusting facial features.
 * Each slider shows min/max labels and updates the face preview in real-time.
 *
 * @module components/CharacterCreator/FaceBuilder/FeatureSliders
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { Eye, CircleDot, Move, Heart } from 'lucide-react';
import type {
  FaceFeatures,
  FaceFeatureKey,
  ThemeColors,
} from '../../../config/types';
import { faceFeatureConfigs, featureGroups } from '../../../config';

interface FeatureSlidersProps {
  features: FaceFeatures;
  onFeatureChange: (feature: FaceFeatureKey, value: number) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

// Icons for feature groups
const groupIcons: Record<string, typeof Eye> = {
  Eyes: Eye,
  Eyebrows: Move,
  Nose: CircleDot,
  Lips: Heart,
  Face: CircleDot,
};

/**
 * Individual feature slider with min/max labels
 */
const FeatureSlider = memo(function FeatureSlider({
  feature,
  value,
  onChange,
  isLocked,
  themeColors,
}: {
  feature: FaceFeatureKey;
  value: number;
  onChange: (value: number) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}) {
  const config = faceFeatureConfigs[feature];
  const percentage = value;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value, 10));
    },
    [onChange]
  );

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span
          className="text-xs"
          style={{ color: themeColors.textSecondary }}
        >
          {config.label}
        </span>
        <span
          className="text-xs font-mono px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: themeColors.promptBg,
            color: themeColors.textTertiary,
          }}
        >
          {value}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="text-[10px] w-12 text-right"
          style={{ color: themeColors.textTertiary }}
        >
          {config.minLabel}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          disabled={isLocked}
          className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${themeColors.accent} 0%, ${themeColors.accent} ${percentage}%, ${themeColors.inputBackground} ${percentage}%, ${themeColors.inputBackground} 100%)`,
            opacity: isLocked ? 0.6 : 1,
          }}
          aria-label={config.label}
        />
        <span
          className="text-[10px] w-12"
          style={{ color: themeColors.textTertiary }}
        >
          {config.maxLabel}
        </span>
      </div>
    </div>
  );
});

FeatureSlider.displayName = 'FeatureSlider';

/**
 * Feature group with header and sliders
 */
const FeatureGroup = memo(function FeatureGroup({
  name,
  features: featureKeys,
  values,
  onFeatureChange,
  isLocked,
  themeColors,
}: {
  name: string;
  features: readonly FaceFeatureKey[];
  values: FaceFeatures;
  onFeatureChange: (feature: FaceFeatureKey, value: number) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}) {
  const Icon = groupIcons[name] || Eye;

  return (
    <div className="space-y-2">
      <div
        className="flex items-center gap-1.5 text-xs font-medium"
        style={{ color: themeColors.accent }}
      >
        <Icon className="w-3 h-3" />
        {name}
      </div>
      <div className="space-y-3 pl-4">
        {featureKeys.map((feature) => (
          <FeatureSlider
            key={feature}
            feature={feature}
            value={values[feature]}
            onChange={(value) => onFeatureChange(feature, value)}
            isLocked={isLocked}
            themeColors={themeColors}
          />
        ))}
      </div>
    </div>
  );
});

FeatureGroup.displayName = 'FeatureGroup';

/**
 * FeatureSliders - All facial feature sliders organized by group
 */
export const FeatureSliders = memo(function FeatureSliders({
  features,
  onFeatureChange,
  isLocked,
  themeColors,
}: FeatureSlidersProps) {
  return (
    <div className="space-y-4">
      {featureGroups.map((group) => (
        <FeatureGroup
          key={group.name}
          name={group.name}
          features={group.features}
          values={features}
          onFeatureChange={onFeatureChange}
          isLocked={isLocked}
          themeColors={themeColors}
        />
      ))}
    </div>
  );
});

FeatureSliders.displayName = 'FeatureSliders';

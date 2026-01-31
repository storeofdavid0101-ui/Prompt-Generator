/**
 * Face Builder Component
 *
 * Container component that combines the SVG face preview with feature sliders.
 * Provides a two-column layout on larger screens (face left, sliders right).
 *
 * @module components/CharacterCreator/FaceBuilder/FaceBuilder
 */

'use client';

import { memo, useMemo } from 'react';
import type { FaceFeatures, FaceFeatureKey, ThemeColors } from '../../../config/types';
import { FaceSVG } from './FaceSVG';
import { FeatureSliders } from './FeatureSliders';

interface FaceBuilderProps {
  features: FaceFeatures;
  onFeatureChange: (feature: FaceFeatureKey, value: number) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

/**
 * FaceBuilder - Interactive face customization interface
 *
 * Layout:
 * - Mobile: Face preview stacked above sliders
 * - Desktop: Face preview on left, sliders on right
 */
export const FaceBuilder = memo(function FaceBuilder({
  features,
  onFeatureChange,
  isLocked,
  themeColors,
}: FaceBuilderProps) {
  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: themeColors.cardBackground,
        borderColor: themeColors.inputBorder,
      },
      faceContainer: {
        backgroundColor: themeColors.inputBackground,
        borderColor: themeColors.inputBorder,
      },
    }),
    [themeColors]
  );

  return (
    <div
      className="rounded-lg border p-4"
      style={styles.container}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Face Preview */}
        <div className="flex-shrink-0 md:w-[200px]">
          <div
            className="rounded-lg border p-4 flex items-center justify-center"
            style={styles.faceContainer}
          >
            <FaceSVG features={features} themeColors={themeColors} />
          </div>
          <p
            className="text-xs text-center mt-2"
            style={{ color: themeColors.textTertiary }}
          >
            Adjust sliders to customize
          </p>
        </div>

        {/* Feature Sliders */}
        <div className="flex-1 min-w-0">
          <FeatureSliders
            features={features}
            onFeatureChange={onFeatureChange}
            isLocked={isLocked}
            themeColors={themeColors}
          />
        </div>
      </div>
    </div>
  );
});

FaceBuilder.displayName = 'FaceBuilder';

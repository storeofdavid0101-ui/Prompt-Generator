/**
 * Face SVG Component
 *
 * A minimalist, line-art style SVG face that responds to slider values.
 * Features include: face outline, eyes, eyebrows, nose, and lips.
 * All elements transform based on the provided face feature values.
 *
 * @module components/CharacterCreator/FaceBuilder/FaceSVG
 */

'use client';

import { memo, useMemo } from 'react';
import type { FaceFeatures, ThemeColors } from '../../../config/types';

interface FaceSVGProps {
  features: FaceFeatures;
  themeColors: ThemeColors;
}

/**
 * Interpolate a value from 0-100 to a custom range
 */
function interpolate(value: number, min: number, max: number): number {
  return min + (value / 100) * (max - min);
}

/**
 * FaceSVG - Minimalist responsive face illustration
 *
 * The face dynamically transforms based on slider values:
 * - Eye size: scales the eye ellipses
 * - Eye shape: adjusts rx/ry ratio for round vs almond
 * - Nose length/width: modifies the nose path
 * - Lip fullness: adjusts lip curve and thickness
 * - Face width: scales the face outline horizontally
 * - Eyebrow thickness: stroke width of eyebrow paths
 * - Eyebrow arch: vertical position of arch peak
 */
export const FaceSVG = memo(function FaceSVG({
  features,
  themeColors,
}: FaceSVGProps) {
  const strokeColor = themeColors.textSecondary;
  const fillColor = 'none';

  // Memoize computed values for performance
  const computed = useMemo(() => {
    // Face
    const faceRx = interpolate(features.faceWidth, 58, 78);

    // Eyes
    const eyeRy = interpolate(features.eyeSize, 7, 14);
    const eyeRx = interpolate(features.eyeShape, 16, 10); // Round (larger rx) to Almond (smaller rx)

    // Eyebrows
    const browStroke = interpolate(features.eyebrowThickness, 1.5, 4.5);
    const browArchOffset = interpolate(features.eyebrowArch, 0, -10);

    // Nose
    const noseHeight = interpolate(features.noseLength, 18, 38);
    const noseWidth = interpolate(features.noseWidth, 8, 18);

    // Lips
    const lipHeight = interpolate(features.lipFullness, 3, 12);
    const lipWidth = interpolate(features.lipFullness, 0, 8);

    return {
      faceRx,
      eyeRy,
      eyeRx,
      browStroke,
      browArchOffset,
      noseHeight,
      noseWidth,
      lipHeight,
      lipWidth,
    };
  }, [features]);

  return (
    <svg
      viewBox="0 0 200 250"
      className="w-full max-w-[180px] mx-auto"
      aria-label="Face preview"
      role="img"
    >
      {/* Face outline */}
      <ellipse
        cx="100"
        cy="125"
        rx={computed.faceRx}
        ry="90"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />

      {/* Left eyebrow */}
      <path
        d={`M 55 ${78 + computed.browArchOffset}
            Q 70 ${68 + computed.browArchOffset}
            85 ${75 + computed.browArchOffset}`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={computed.browStroke}
        strokeLinecap="round"
      />

      {/* Right eyebrow */}
      <path
        d={`M 115 ${75 + computed.browArchOffset}
            Q 130 ${68 + computed.browArchOffset}
            145 ${78 + computed.browArchOffset}`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={computed.browStroke}
        strokeLinecap="round"
      />

      {/* Left eye */}
      <ellipse
        cx="70"
        cy="100"
        rx={computed.eyeRx}
        ry={computed.eyeRy}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      {/* Left pupil */}
      <circle cx="70" cy="100" r="3" fill={strokeColor} />

      {/* Right eye */}
      <ellipse
        cx="130"
        cy="100"
        rx={computed.eyeRx}
        ry={computed.eyeRy}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      {/* Right pupil */}
      <circle cx="130" cy="100" r="3" fill={strokeColor} />

      {/* Nose */}
      <path
        d={`M 100 ${115 - computed.noseHeight * 0.3}
            L 100 ${115 + computed.noseHeight * 0.5}
            M ${100 - computed.noseWidth} ${118 + computed.noseHeight * 0.4}
            Q 100 ${122 + computed.noseHeight * 0.5}
            ${100 + computed.noseWidth} ${118 + computed.noseHeight * 0.4}`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Upper lip line */}
      <path
        d={`M ${82 - computed.lipWidth} 165
            Q 100 ${158 - computed.lipHeight * 0.3}
            ${118 + computed.lipWidth} 165`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Lower lip */}
      <path
        d={`M ${82 - computed.lipWidth} 165
            Q 100 ${172 + computed.lipHeight}
            ${118 + computed.lipWidth} 165`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={interpolate(features.lipFullness, 1, 2.5)}
        strokeLinecap="round"
      />
    </svg>
  );
});

FaceSVG.displayName = 'FaceSVG';

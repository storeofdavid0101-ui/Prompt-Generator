/**
 * Color Wheel Component
 *
 * Interactive color wheel for professional color grading.
 * Inspired by DaVinci Resolve's color wheels.
 *
 * @module components/ColorGradingPanel/ColorWheel
 */

'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ThemeColors } from '../../config/types';
import type { ColorWheelPosition } from '../../config/types/colorGrading';

interface ColorWheelProps {
  label: string;
  position: ColorWheelPosition;
  luminance: number;
  isLocked: boolean;
  themeColors: ThemeColors;
  onPositionChange: (position: ColorWheelPosition) => void;
  onLuminanceChange: (luminance: number) => void;
  onReset: () => void;
}

/**
 * Convert position to angle and radius for display
 */
function positionToAngleRadius(position: ColorWheelPosition): { angle: number; radius: number } {
  const radius = Math.min(1, Math.sqrt(position.x * position.x + position.y * position.y));
  const angle = Math.atan2(position.y, position.x);
  return { angle, radius };
}

/**
 * Convert angle and radius back to position
 */
function angleRadiusToPosition(angle: number, radius: number): ColorWheelPosition {
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

/**
 * Get color from angle (hue) for display
 */
function angleToColor(angle: number, saturation: number = 1): string {
  const hue = ((angle * 180) / Math.PI + 180) % 360;
  return `hsl(${hue}, ${saturation * 100}%, 50%)`;
}

export function ColorWheel({
  label,
  position,
  luminance,
  isLocked,
  themeColors,
  onPositionChange,
  onLuminanceChange,
  onReset,
}: ColorWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { angle, radius } = positionToAngleRadius(position);
  const indicatorColor = radius > 0.05 ? angleToColor(angle, radius) : themeColors.textSecondary;

  const handleInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (isLocked || !wheelRef.current) return;

      const rect = wheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxRadius = rect.width / 2 - 8; // Account for padding

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedRadius = Math.min(1, distance / maxRadius);

      const newAngle = Math.atan2(dy, dx);
      const newPosition = angleRadiusToPosition(newAngle, normalizedRadius);

      onPositionChange(newPosition);
    },
    [isLocked, onPositionChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isLocked) return;
      setIsDragging(true);
      handleInteraction(e.clientX, e.clientY);
    },
    [isLocked, handleInteraction]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleInteraction(e.clientX, e.clientY);
    },
    [isDragging, handleInteraction]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isLocked) return;
      setIsDragging(true);
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    },
    [isLocked, handleInteraction]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    },
    [isDragging, handleInteraction]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Calculate indicator position
  const indicatorX = 50 + position.x * 42; // 42% max from center
  const indicatorY = 50 + position.y * 42;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label */}
      <div className="flex items-center justify-between w-full px-1">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: themeColors.textSecondary }}
        >
          {label}
        </span>
        <button
          onClick={onReset}
          disabled={isLocked}
          className="text-[10px] px-1.5 py-0.5 rounded transition-colors hover:opacity-80"
          style={{
            color: themeColors.textSecondary,
            opacity: isLocked ? 0.5 : 1,
          }}
        >
          Reset
        </button>
      </div>

      {/* Color Wheel */}
      <div
        ref={wheelRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative w-24 h-24 rounded-full cursor-crosshair select-none"
        style={{
          background: `conic-gradient(
            from 180deg,
            hsl(0, 70%, 50%),
            hsl(60, 70%, 50%),
            hsl(120, 70%, 50%),
            hsl(180, 70%, 50%),
            hsl(240, 70%, 50%),
            hsl(300, 70%, 50%),
            hsl(360, 70%, 50%)
          )`,
          opacity: isLocked ? 0.5 : 1,
        }}
      >
        {/* Saturation gradient overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(128,128,128,1) 0%, rgba(128,128,128,0) 70%)',
          }}
        />

        {/* Center reference point */}
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: 'calc(50% - 4px)',
            top: 'calc(50% - 4px)',
            backgroundColor: themeColors.textSecondary,
            opacity: 0.5,
          }}
        />

        {/* Position indicator */}
        <motion.div
          className="absolute w-4 h-4 rounded-full border-2 shadow-lg"
          style={{
            left: `calc(${indicatorX}% - 8px)`,
            top: `calc(${indicatorY}% - 8px)`,
            backgroundColor: indicatorColor,
            borderColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
          animate={{
            scale: isDragging ? 1.2 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Luminance Slider */}
      <div className="w-full px-1">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[10px]"
            style={{ color: themeColors.textSecondary }}
          >
            Lum
          </span>
          <span
            className="text-[10px] font-mono"
            style={{ color: themeColors.textSecondary }}
          >
            {luminance > 0 ? '+' : ''}{luminance}
          </span>
        </div>
        <input
          type="range"
          min={-100}
          max={100}
          value={luminance}
          onChange={(e) => onLuminanceChange(parseInt(e.target.value, 10))}
          disabled={isLocked}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #000 0%, #888 50%, #fff 100%)`,
            opacity: isLocked ? 0.5 : 1,
          }}
        />
      </div>
    </div>
  );
}

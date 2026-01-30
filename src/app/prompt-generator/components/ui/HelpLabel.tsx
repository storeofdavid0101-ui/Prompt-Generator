/**
 * HelpLabel component
 * Clickable label that reveals helpful descriptions for each parameter section
 * Uses a Portal to render tooltip at document level to avoid overflow clipping
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import type { ThemeColors } from '../../config/types';
import type { HelpDescription } from '../../config/helpDescriptions';

interface HelpLabelProps {
  /** Icon component to display before the label */
  icon?: React.ElementType;
  /** Label text to display */
  label: string;
  /** Help content to show when clicked */
  help: HelpDescription;
  /** Theme colors for styling */
  themeColors: ThemeColors;
  /** Additional className for the label container */
  className?: string;
}

interface TooltipPosition {
  top: number;
  left: number;
}

export function HelpLabel({
  icon: Icon,
  label,
  help,
  themeColors,
  className = '',
}: HelpLabelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Track if component is mounted (for Portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate tooltip position based on button location
  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8, // 8px below the button
        left: Math.max(8, rect.left), // At least 8px from left edge
      });
    }
  }, []);

  // Update position when opening and on scroll/resize
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickOnButton = buttonRef.current?.contains(target);
      const isClickOnTooltip = tooltipRef.current?.contains(target);

      if (!isClickOnButton && !isClickOnTooltip) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use setTimeout to avoid catching the same click that opened it
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Toggle handler
  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  // Close handler
  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  // Tooltip content rendered via Portal
  const tooltipContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: -4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed z-[9999] w-72 rounded-lg shadow-lg overflow-hidden"
          style={{
            top: position.top,
            left: position.left,
            maxWidth: 'calc(100vw - 16px)',
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
              onClick={handleClose}
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
  );

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Clickable Label */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-1.5 group cursor-pointer text-left"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {Icon && (
            <Icon
              className="w-3 h-3 flex-shrink-0"
              style={{ color: themeColors.textTertiary }}
            />
          )}
          <span
            className="text-xs font-medium"
            style={{ color: themeColors.textTertiary }}
          >
            {label}
          </span>
          <HelpCircle
            className="w-3 h-3 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
            style={{ color: isOpen ? themeColors.accent : themeColors.textTertiary }}
          />
        </button>
      </div>

      {/* Render tooltip via Portal to document.body */}
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}

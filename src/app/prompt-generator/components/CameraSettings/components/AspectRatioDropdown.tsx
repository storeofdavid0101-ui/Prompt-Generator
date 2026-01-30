/**
 * AspectRatioDropdown component
 * Stylish dropdown for selecting aspect ratios with visual indicators
 * Includes keyboard navigation and category grouping
 */

'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
  memo,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Square, Monitor, Smartphone, RectangleHorizontal } from 'lucide-react';
import type { ThemeColors } from '../../../config/types';
import { aspectRatioOptionsWithCategory, aspectCategoryNames, type AspectCategory } from '../../../config/cameraOptions';

/** Animation variants for dropdown menu */
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
} as const;

interface AspectRatioDropdownProps {
  selectedRatio: string;
  allowedRatios?: string[];
  onRatioChange: (ratio: string) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

/** Get icon for aspect ratio category */
function getCategoryIcon(category: AspectCategory) {
  switch (category) {
    case 'square':
      return Square;
    case 'standard':
      return Monitor;
    case 'widescreen':
      return RectangleHorizontal;
    case 'vertical':
      return Smartphone;
    default:
      return Monitor;
  }
}

/** Keyboard codes for accessibility */
const KeyboardCodes = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  TAB: 'Tab',
  SPACE: ' ',
} as const;

/** Visual ratio indicator component */
function RatioIndicator({ ratio, themeColors, isSelected }: { ratio: string; themeColors: ThemeColors; isSelected: boolean }) {
  // Parse ratio to get dimensions
  const getDimensions = (ratioStr: string): { width: number; height: number } => {
    if (!ratioStr || ratioStr === '') return { width: 16, height: 12 }; // Default
    const parts = ratioStr.split(':');
    if (parts.length !== 2) return { width: 16, height: 12 };
    const w = parseFloat(parts[0]);
    const h = parseFloat(parts[1]);
    // Normalize to max 20px dimension
    const maxSize = 16;
    const scale = maxSize / Math.max(w, h);
    return { width: Math.round(w * scale), height: Math.round(h * scale) };
  };

  const { width, height } = getDimensions(ratio);

  return (
    <div
      className="flex-shrink-0 rounded-sm"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: isSelected ? themeColors.accent : themeColors.textTertiary,
        opacity: isSelected ? 1 : 0.5,
      }}
    />
  );
}

/**
 * AspectRatioDropdown - Stylish aspect ratio selector with visual indicators
 */
export const AspectRatioDropdown = memo(function AspectRatioDropdown({
  selectedRatio,
  allowedRatios,
  onRatioChange,
  isLocked,
  themeColors,
}: AspectRatioDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownId = useId();

  // Filter options based on allowed ratios
  const filteredOptions = useMemo(() => {
    if (!allowedRatios) return aspectRatioOptionsWithCategory;
    return aspectRatioOptionsWithCategory.filter(
      (opt) => opt.value === 'none' || allowedRatios.includes(opt.ratio)
    );
  }, [allowedRatios]);

  // Group options by category
  const optionsByCategory = useMemo(() => {
    const grouped: Record<AspectCategory, typeof filteredOptions> = {
      square: [],
      standard: [],
      widescreen: [],
      vertical: [],
    };
    filteredOptions.forEach((opt) => {
      if (grouped[opt.category]) {
        grouped[opt.category].push(opt);
      }
    });
    return grouped;
  }, [filteredOptions]);

  // Get display text and ratio for selected
  const selectedOption = useMemo(() => {
    return aspectRatioOptionsWithCategory.find((opt) => opt.value === selectedRatio);
  }, [selectedRatio]);

  const displayText = selectedOption?.label || 'Default';
  const displayRatio = selectedOption?.ratio || '';

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    if (isLocked) return;
    setIsOpen((prev) => {
      setFocusedIndex(prev ? -1 : 0);
      return !prev;
    });
  }, [isLocked]);

  const handleRatioSelect = useCallback((value: string) => {
    onRatioChange(value);
    setIsOpen(false);
    setFocusedIndex(-1);
    toggleButtonRef.current?.focus();
  }, [onRatioChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) {
        if (e.key === KeyboardCodes.ENTER || e.key === KeyboardCodes.SPACE) {
          e.preventDefault();
          handleToggle();
        }
        return;
      }
      switch (e.key) {
        case KeyboardCodes.ESCAPE:
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          toggleButtonRef.current?.focus();
          break;
        case KeyboardCodes.ARROW_DOWN:
          e.preventDefault();
          setFocusedIndex((p) => (p < filteredOptions.length - 1 ? p + 1 : 0));
          break;
        case KeyboardCodes.ARROW_UP:
          e.preventDefault();
          setFocusedIndex((p) => (p > 0 ? p - 1 : filteredOptions.length - 1));
          break;
        case KeyboardCodes.ENTER:
        case KeyboardCodes.SPACE:
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleRatioSelect(filteredOptions[focusedIndex].value);
          }
          break;
        case KeyboardCodes.TAB:
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, focusedIndex, filteredOptions, handleToggle, handleRatioSelect]
  );

  // Memoized styles
  const styles = useMemo(() => ({
    toggleButton: {
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: themeColors.textPrimary,
      opacity: isLocked ? 0.6 : 1,
    },
    dropdown: {
      backgroundColor: themeColors.cardBackground,
      border: `1px solid ${themeColors.borderColor}`,
    },
    categoryHeader: {
      backgroundColor: themeColors.inputBackground,
      color: themeColors.textTertiary,
    },
  }), [themeColors, isLocked]);

  // Category order
  const categoryOrder: AspectCategory[] = ['standard', 'square', 'widescreen', 'vertical'];

  return (
    <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={handleToggle}
        disabled={isLocked}
        className="w-full rounded-lg px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 flex items-center justify-between gap-2"
        style={styles.toggleButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-label={`Aspect Ratio: ${displayText}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <RatioIndicator ratio={displayRatio} themeColors={themeColors} isSelected={true} />
          <span className="truncate text-left">{displayText}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: themeColors.textTertiary }}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.15 }}
            className="absolute z-[9999] w-full mt-1 rounded-lg shadow-lg overflow-hidden"
            style={styles.dropdown}
          >
            <ul
              ref={listRef}
              id={dropdownId}
              role="listbox"
              aria-label="Aspect ratio options"
              className="max-h-[350px] overflow-y-auto"
            >
              {/* Aspect ratio categories */}
              {categoryOrder.map((category) => {
                const options = optionsByCategory[category];
                if (!options || options.length === 0) return null;
                const CategoryIcon = getCategoryIcon(category);

                return (
                  <li key={category} role="group" aria-label={aspectCategoryNames[category]}>
                    {/* Category header */}
                    <div
                      className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 sticky top-0"
                      style={styles.categoryHeader}
                    >
                      <CategoryIcon className="w-3 h-3" />
                      {aspectCategoryNames[category]}
                    </div>

                    {/* Ratio items */}
                    {options.map((option) => {
                      const isSelected = selectedRatio === option.value;

                      return (
                        <div
                          key={option.value}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleRatioSelect(option.value)}
                          className={`
                            w-full px-3 py-2.5 text-sm text-left cursor-pointer transition-all
                            hover:bg-black/5
                            ${isSelected ? 'font-medium' : ''}
                          `}
                          style={{
                            backgroundColor: isSelected ? `${themeColors.accent}15` : undefined,
                            color: isSelected ? themeColors.accent : themeColors.textPrimary,
                            paddingLeft: '1.25rem',
                          }}
                        >
                          <span className="flex items-center gap-2.5">
                            <RatioIndicator
                              ratio={option.ratio}
                              themeColors={themeColors}
                              isSelected={isSelected}
                            />
                            {option.label}
                          </span>
                        </div>
                      );
                    })}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

AspectRatioDropdown.displayName = 'AspectRatioDropdown';

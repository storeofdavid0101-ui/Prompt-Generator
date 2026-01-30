/**
 * LensDropdown component
 * Stylish dropdown for selecting lenses with categories
 * Includes keyboard navigation and custom lens input
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
import { ChevronDown, Aperture, ZoomIn, ZoomOut, CircleDot, Target, Edit3 } from 'lucide-react';
import type { ThemeColors } from '../../../config/types';
import type { LensCategory, LensOptionWithCategory } from '../../../config/cameraOptions';
import { lensesByCategory, lensCategoryNames, lensOptions } from '../../../config/cameraOptions';

/** Animation variants for dropdown menu */
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
} as const;

/** Animation variants for custom input reveal */
const inputVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
} as const;

interface LensDropdownProps {
  selectedLens: string;
  customLens: string;
  onLensChange: (lens: string) => void;
  onCustomLensChange: (value: string) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

/** Get icon for lens category */
function getCategoryIcon(category: LensCategory) {
  switch (category) {
    case 'ultra-wide':
      return ZoomOut;
    case 'wide':
      return ZoomOut;
    case 'standard':
      return CircleDot;
    case 'portrait':
      return Aperture;
    case 'telephoto':
      return ZoomIn;
    case 'super-telephoto':
      return Target;
    case 'special':
      return Aperture;
    default:
      return Aperture;
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

/** Check if a lens is in the preset list */
function isLensPreset(lens: string): boolean {
  return lensOptions.some((l) => l.value === lens);
}

/**
 * LensDropdown - Stylish lens selector with categories
 */
export const LensDropdown = memo(function LensDropdown({
  selectedLens,
  customLens,
  onLensChange,
  onCustomLensChange,
  isLocked,
  themeColors,
}: LensDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [forceCustomMode, setForceCustomMode] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownId = useId();

  // Flatten all options for keyboard navigation
  const allOptions = useMemo(() => {
    const options: { type: 'custom' | 'lens'; value: string; label: string }[] = [
      { type: 'custom', value: '', label: 'Custom' },
    ];
    Object.entries(lensesByCategory).forEach(([, lenses]) => {
      lenses.forEach((lens: LensOptionWithCategory) => {
        options.push({
          type: 'lens',
          value: lens.value,
          label: lens.label,
        });
      });
    });
    return options;
  }, []);

  // Derive custom mode
  const isCustomMode = useMemo(() => {
    if (forceCustomMode) return true;
    if (selectedLens && isLensPreset(selectedLens)) return false;
    return !selectedLens || customLens.trim().length > 0;
  }, [selectedLens, customLens, forceCustomMode]);

  // Get display text
  const displayText = useMemo(() => {
    if (customLens.trim()) return customLens;
    if (selectedLens) return selectedLens;
    return 'Select lens...';
  }, [selectedLens, customLens]);

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

  const handleLensSelect = useCallback((value: string) => {
    setForceCustomMode(false);
    onLensChange(value);
    onCustomLensChange('');
    setIsOpen(false);
    setFocusedIndex(-1);
    toggleButtonRef.current?.focus();
  }, [onLensChange, onCustomLensChange]);

  const handleCustomSelect = useCallback(() => {
    setForceCustomMode(true);
    onLensChange('');
    setIsOpen(false);
    setFocusedIndex(-1);
    setTimeout(() => customInputRef.current?.focus(), 150);
  }, [onLensChange]);

  const handleCustomInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onCustomLensChange(e.target.value),
    [onCustomLensChange]
  );

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
          setFocusedIndex((p) => (p < allOptions.length - 1 ? p + 1 : 0));
          break;
        case KeyboardCodes.ARROW_UP:
          e.preventDefault();
          setFocusedIndex((p) => (p > 0 ? p - 1 : allOptions.length - 1));
          break;
        case KeyboardCodes.ENTER:
        case KeyboardCodes.SPACE:
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < allOptions.length) {
            const opt = allOptions[focusedIndex];
            if (opt.type === 'custom') {
              handleCustomSelect();
            } else {
              handleLensSelect(opt.value);
            }
          }
          break;
        case KeyboardCodes.TAB:
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, focusedIndex, allOptions, handleToggle, handleCustomSelect, handleLensSelect]
  );

  // Memoized styles
  const styles = useMemo(() => ({
    toggleButton: {
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: selectedLens || customLens ? themeColors.textPrimary : themeColors.textTertiary,
      opacity: isLocked ? 0.6 : 1,
    },
    dropdown: {
      backgroundColor: themeColors.cardBackground,
      border: `1px solid ${themeColors.borderColor}`,
    },
    customOption: {
      backgroundColor: isCustomMode ? `${themeColors.accent}20` : 'transparent',
      color: themeColors.textPrimary,
      borderBottom: `1px solid ${themeColors.borderColor}`,
    },
    categoryHeader: {
      backgroundColor: themeColors.inputBackground,
      color: themeColors.textTertiary,
    },
    customInput: {
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: themeColors.textPrimary,
      opacity: isLocked ? 0.6 : 1,
    },
  }), [themeColors, selectedLens, customLens, isLocked, isCustomMode]);

  // Category order
  const categoryOrder: LensCategory[] = [
    'special', 'ultra-wide', 'wide', 'standard', 'portrait', 'telephoto', 'super-telephoto'
  ];

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
        aria-label={`Lens: ${displayText}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Aperture className="w-4 h-4 flex-shrink-0" style={{ color: themeColors.accent }} />
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
            className="absolute z-[100] w-full mt-1 rounded-lg shadow-lg overflow-hidden"
            style={styles.dropdown}
          >
            <ul
              ref={listRef}
              id={dropdownId}
              role="listbox"
              aria-label="Lens options"
              className="max-h-[350px] overflow-y-auto"
            >
              {/* Custom option */}
              <li
                role="option"
                aria-selected={isCustomMode}
                tabIndex={-1}
                onClick={handleCustomSelect}
                className="w-full px-3 py-2.5 text-sm text-left flex items-center gap-2 cursor-pointer transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-inset"
                style={styles.customOption}
              >
                <Edit3 className="w-4 h-4" style={{ color: themeColors.accent }} aria-hidden="true" />
                <span className="font-medium">Custom Lens</span>
              </li>

              {/* Lens categories */}
              {categoryOrder.map((category) => {
                const lenses = lensesByCategory[category];
                if (!lenses || lenses.length === 0) return null;
                const CategoryIcon = getCategoryIcon(category);

                return (
                  <li key={category} role="group" aria-label={lensCategoryNames[category]}>
                    {/* Category header */}
                    <div
                      className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 sticky top-0"
                      style={styles.categoryHeader}
                    >
                      <CategoryIcon className="w-3 h-3" />
                      {lensCategoryNames[category]}
                    </div>

                    {/* Lens items */}
                    {lenses.map((lens) => {
                      const isSelected = selectedLens === lens.value && !customLens;

                      return (
                        <div
                          key={lens.value}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleLensSelect(lens.value)}
                          className={`
                            w-full px-3 py-2 text-sm text-left cursor-pointer transition-all
                            hover:bg-black/5
                            ${isSelected ? 'font-medium' : ''}
                          `}
                          style={{
                            backgroundColor: isSelected ? `${themeColors.accent}15` : undefined,
                            color: isSelected ? themeColors.accent : themeColors.textPrimary,
                            paddingLeft: '2rem',
                          }}
                        >
                          <span className="flex items-center gap-2">
                            {lens.label}
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

      {/* Custom input */}
      <AnimatePresence>
        {isCustomMode && (
          <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" className="mt-2">
            <input
              ref={customInputRef}
              type="text"
              value={customLens}
              onChange={handleCustomInputChange}
              placeholder="Enter custom lens (e.g., Zeiss 55mm f/1.8)"
              disabled={isLocked}
              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
              style={styles.customInput}
              aria-label="Custom lens input"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LensDropdown.displayName = 'LensDropdown';

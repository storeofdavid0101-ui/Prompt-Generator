/**
 * CameraDropdown component
 * Stylish dropdown for selecting cameras with categories
 * Includes keyboard navigation and custom camera input
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
import { ChevronDown, Camera, Video, Film, Aperture, Clapperboard, Edit3 } from 'lucide-react';
import type { ThemeColors } from '../../../config/types';
import type { BlockReasonMap } from '../../../config/types/conflict';
import type { CameraCategory, CameraOptionWithCategory } from '../../../config/cameraOptions';
import { camerasByCategory, cameraCategoryNames } from '../../../config/cameraOptions';

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

interface CameraDropdownProps {
  selectedCamera: string;
  customCamera: string;
  blockedCameras: Set<string>;
  cameraBlockReasons?: BlockReasonMap;
  onCameraChange: (camera: string) => void;
  onCustomCameraChange: (value: string) => void;
  isLocked: boolean;
  themeColors: ThemeColors;
}

/** Get icon for camera category */
function getCategoryIcon(category: CameraCategory) {
  switch (category) {
    case 'consumer':
      return Camera;
    case 'cinema':
    case 'classic':
      return Clapperboard;
    case 'film':
    case 'vintage-film':
      return Film;
    case 'vintage-video':
      return Video;
    default:
      return Camera;
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

/**
 * CameraDropdown - Stylish camera selector with categories
 */
export const CameraDropdown = memo(function CameraDropdown({
  selectedCamera,
  customCamera,
  blockedCameras,
  cameraBlockReasons,
  onCameraChange,
  onCustomCameraChange,
  isLocked,
  themeColors,
}: CameraDropdownProps) {
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
    const options: { type: 'custom' | 'camera'; value: string; label: string; blocked?: boolean }[] = [
      { type: 'custom', value: '', label: 'Custom' },
    ];
    Object.entries(camerasByCategory).forEach(([, cameras]) => {
      cameras.forEach((camera: CameraOptionWithCategory) => {
        options.push({
          type: 'camera',
          value: camera.label,
          label: camera.label,
          blocked: blockedCameras.has(camera.label),
        });
      });
    });
    return options;
  }, [blockedCameras]);

  // Derive custom mode
  const isCustomMode = useMemo(() => {
    if (forceCustomMode) return true;
    if (selectedCamera && allOptions.some(o => o.type === 'camera' && o.value === selectedCamera)) return false;
    return !selectedCamera || customCamera.trim().length > 0;
  }, [selectedCamera, customCamera, allOptions, forceCustomMode]);

  // Get display text
  const displayText = useMemo(() => {
    if (customCamera.trim()) return customCamera;
    if (selectedCamera) return selectedCamera;
    return 'Select camera...';
  }, [selectedCamera, customCamera]);

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

  const handleCameraSelect = useCallback((label: string) => {
    setForceCustomMode(false);
    onCameraChange(label);
    onCustomCameraChange('');
    setIsOpen(false);
    setFocusedIndex(-1);
    toggleButtonRef.current?.focus();
  }, [onCameraChange, onCustomCameraChange]);

  const handleCustomSelect = useCallback(() => {
    setForceCustomMode(true);
    onCameraChange('');
    setIsOpen(false);
    setFocusedIndex(-1);
    setTimeout(() => customInputRef.current?.focus(), 150);
  }, [onCameraChange]);

  const handleCustomInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onCustomCameraChange(e.target.value),
    [onCustomCameraChange]
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
            } else if (!opt.blocked) {
              handleCameraSelect(opt.value);
            }
          }
          break;
        case KeyboardCodes.TAB:
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, focusedIndex, allOptions, handleToggle, handleCustomSelect, handleCameraSelect]
  );

  // Memoized styles
  const styles = useMemo(() => ({
    toggleButton: {
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: selectedCamera || customCamera ? themeColors.textPrimary : themeColors.textTertiary,
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
  }), [themeColors, selectedCamera, customCamera, isLocked, isCustomMode]);

  // Category order
  const categoryOrder: CameraCategory[] = [
    'consumer', 'cinema', 'film', 'premium',
    'classic', 'vintage-film', 'vintage-video', 'vintage-photo', 'antique'
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
        aria-label={`Camera: ${displayText}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Camera className="w-4 h-4 flex-shrink-0" style={{ color: themeColors.accent }} />
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
              aria-label="Camera options"
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
                <span className="font-medium">Custom Camera</span>
              </li>

              {/* Camera categories */}
              {categoryOrder.map((category) => {
                const cameras = camerasByCategory[category];
                if (!cameras || cameras.length === 0) return null;
                const CategoryIcon = getCategoryIcon(category);

                return (
                  <li key={category} role="group" aria-label={cameraCategoryNames[category]}>
                    {/* Category header */}
                    <div
                      className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 sticky top-0"
                      style={styles.categoryHeader}
                    >
                      <CategoryIcon className="w-3 h-3" />
                      {cameraCategoryNames[category]}
                    </div>

                    {/* Camera items */}
                    {cameras.map((camera) => {
                      const isBlocked = blockedCameras.has(camera.label);
                      const isSelected = selectedCamera === camera.label && !customCamera;
                      const blockReason = cameraBlockReasons?.get(camera.label);

                      return (
                        <div
                          key={camera.label}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={isBlocked}
                          onClick={() => !isBlocked && handleCameraSelect(camera.label)}
                          title={isBlocked && blockReason ? blockReason.reason : undefined}
                          className={`
                            w-full px-3 py-2 text-sm text-left cursor-pointer transition-all
                            ${isBlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/5'}
                            ${isSelected ? 'font-medium' : ''}
                          `}
                          style={{
                            backgroundColor: isSelected ? `${themeColors.accent}15` : undefined,
                            color: isSelected ? themeColors.accent : themeColors.textPrimary,
                            paddingLeft: '2rem',
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="flex items-center gap-2">
                              {camera.label}
                              {isBlocked && <span className="text-xs">⚠️</span>}
                            </span>
                            {isBlocked && blockReason && (
                              <span
                                className="text-[10px] mt-0.5"
                                style={{ color: themeColors.warning }}
                              >
                                {blockReason.reason}
                              </span>
                            )}
                          </div>
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
              value={customCamera}
              onChange={handleCustomInputChange}
              placeholder="Enter custom camera (e.g., Fujifilm X-T5)"
              disabled={isLocked}
              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
              style={styles.customInput}
              aria-label="Custom camera input"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

CameraDropdown.displayName = 'CameraDropdown';

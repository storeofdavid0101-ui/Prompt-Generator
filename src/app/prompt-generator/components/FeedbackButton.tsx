/**
 * Feedback Button Component
 * Small floating button that opens a feedback form
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Send, X, Check } from 'lucide-react';
import type { ThemeColors } from '../config/types';

interface FeedbackButtonProps {
  themeColors: ThemeColors;
}

type FeedbackStatus = 'idle' | 'sending' | 'success' | 'error';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

const MAX_CHARS = 100;

export function FeedbackButton({ themeColors }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<FeedbackStatus>('idle');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Reset form after success
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setFeedback('');
        setStatus('idle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = useCallback(async () => {
    if (!feedback.trim() || !FORMSPREE_ENDPOINT) return;

    setStatus('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback.trim(),
          timestamp: new Date().toISOString(),
          page: window.location.href,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, [feedback]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [handleSubmit]
  );

  const charsLeft = MAX_CHARS - feedback.length;

  // Don't render if Formspree is not configured
  if (!FORMSPREE_ENDPOINT) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-8 left-0 w-64 rounded-xl shadow-lg overflow-hidden z-[100]"
            style={{
              backgroundColor: themeColors.cardBackground,
              border: `1px solid ${themeColors.borderColor}`,
            }}
          >
            {/* Header */}
            <div
              className="px-3 py-2 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${themeColors.borderColor}` }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: themeColors.textPrimary }}
              >
                Quick Feedback
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:opacity-70 transition-opacity"
                aria-label="Close feedback"
              >
                <X className="w-3 h-3" style={{ color: themeColors.textTertiary }} />
              </button>
            </div>

            {/* Content */}
            <div className="p-3">
              {status === 'success' ? (
                <div className="flex items-center justify-center gap-2 py-4">
                  <Check className="w-5 h-5" style={{ color: themeColors.accent }} />
                  <span className="text-sm" style={{ color: themeColors.textPrimary }}>
                    Thanks!
                  </span>
                </div>
              ) : (
                <>
                  <textarea
                    ref={textareaRef}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value.slice(0, MAX_CHARS))}
                    onKeyDown={handleKeyDown}
                    placeholder="Share your thoughts..."
                    rows={2}
                    disabled={status === 'sending'}
                    className="w-full rounded-lg px-2.5 py-2 text-xs resize-none focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: themeColors.inputBackground,
                      border: `1px solid ${themeColors.inputBorder}`,
                      color: themeColors.textPrimary,
                    }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className="text-[10px]"
                      style={{
                        color: charsLeft < 20 ? themeColors.warning : themeColors.textTertiary,
                      }}
                    >
                      {charsLeft} left
                    </span>
                    <button
                      onClick={handleSubmit}
                      disabled={!feedback.trim() || status === 'sending'}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                      style={{
                        backgroundColor: themeColors.accent,
                        color: '#fff',
                      }}
                    >
                      {status === 'sending' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span>Send</span>
                        </>
                      )}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p
                      className="text-[10px] mt-1"
                      style={{ color: themeColors.warning }}
                    >
                      Failed to send. Try again.
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: themeColors.textTertiary }}
        aria-label="Send feedback"
        aria-expanded={isOpen}
      >
        <MessageSquare className="w-3 h-3" />
        <span>Feedback</span>
      </button>
    </div>
  );
}

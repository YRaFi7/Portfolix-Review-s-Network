'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number; // Delay in milliseconds between each letter (stagger interval)
  className?: string;
  animateBy?: 'letters' | 'words';
  onAnimationComplete?: () => void;
}

export function BlurText({
  text,
  delay = 40,
  className = '',
  animateBy = 'letters',
  onAnimationComplete,
}: BlurTextProps) {
  const [animKey, setAnimKey] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const lastTriggerRef = useRef(0);

  const triggerAnimation = useCallback(() => {
    const now = Date.now();
    // Throttle triggers to prevent jitter if focused rapidly
    if (now - lastTriggerRef.current < 400) return;
    lastTriggerRef.current = now;
    setAnimKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // 1. Re-trigger whenever window receives focus
    const handleFocus = () => {
      triggerAnimation();
    };
    window.addEventListener('focus', handleFocus);

    // 2. Re-trigger whenever document visibility changes to visible
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        triggerAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 3. Re-trigger on page navigation (pageshow)
    const handlePageShow = () => {
      triggerAnimation();
    };
    window.addEventListener('pageshow', handlePageShow);

    // 4. Re-trigger whenever scrolled back into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // 5. Also allow clicking on document or heading to re-trigger
    const handlePointer = () => {
      triggerAnimation();
    };
    document.addEventListener('pointerdown', handlePointer);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('pointerdown', handlePointer);
      observer.disconnect();
    };
  }, [triggerAnimation]);

  const words = text.split(' ');
  const totalLetters = text.replace(/ /g, '').length;

  useEffect(() => {
    if (onAnimationComplete) {
      const totalDuration = totalLetters * delay + 550;
      const timeout = setTimeout(onAnimationComplete, totalDuration);
      return () => clearTimeout(timeout);
    }
  }, [animKey, totalLetters, delay, onAnimationComplete]);

  let letterIndex = 0;

  return (
    <h1
      key={animKey}
      ref={ref}
      onClick={triggerAnimation}
      className={`inline-flex flex-wrap justify-center items-center gap-x-[0.3em] font-extrabold text-white cursor-pointer select-none ${className}`}
      title="Click to replay animation"
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {animateBy === 'letters' ? (
            word.split('').map((char, charIdx) => {
              const currentIdx = letterIndex++;
              return (
                <span
                  key={charIdx}
                  className="inline-block text-white animate-blur-letter"
                  style={{
                    animationDelay: `${currentIdx * delay}ms`,
                    willChange: 'filter, opacity, transform',
                  }}
                >
                  {char}
                </span>
              );
            })
          ) : (
            <span
              className="inline-block text-white animate-blur-letter"
              style={{
                animationDelay: `${wordIdx * delay}ms`,
                willChange: 'filter, opacity, transform',
              }}
            >
              {word}
            </span>
          )}
        </span>
      ))}
    </h1>
  );
}

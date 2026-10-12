'use client';

import React from 'react';

interface SplitTextHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  accentColor?: string;
}

export function SplitTextHeading({
  text,
  className = '',
  as: Component = 'h1',
  accentColor = 'text-[#ff2020]',
}: SplitTextHeadingProps) {
  const words = text.split(' ');

  return (
    <Component
      className={`inline-flex flex-wrap justify-center items-center gap-x-[0.28em] cursor-default group select-none ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden relative leading-tight py-1"
        >
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="relative inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-full"
              style={{
                transitionDelay: `${(wordIndex * 4 + charIndex) * 18}ms`,
              }}
            >
              {/* Top Primary Letter */}
              <span className="inline-block leading-tight">{char}</span>
              {/* Split Duplicate Letter that reveals smoothly from underneath in Portfolix Crimson */}
              <span
                className={`absolute left-0 top-full inline-block leading-tight ${accentColor} drop-shadow-[0_0_14px_rgba(255,32,32,0.7)]`}
              >
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
}

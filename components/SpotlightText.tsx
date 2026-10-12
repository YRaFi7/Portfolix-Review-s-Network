'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SpotlightTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  className?: string;
}

export function SpotlightText({
  text,
  as: Component = 'h2',
  className = '',
}: SpotlightTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Component
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos(null);
      }}
      className={`relative inline-block select-none cursor-default text-white ${className}`}
    >
      {/* ── Base Solid Text (guaranteed visible and readable at all times) ── */}
      <span className="relative z-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        {text}
      </span>

      {/* ── Slow Spotlight Shine Sweep across the text only ── */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none font-extrabold text-transparent bg-clip-text animate-spotlight-text-slow"
        style={{
          backgroundImage:
            'linear-gradient(110deg, transparent 0%, transparent 35%, rgba(255, 32, 32, 0.9) 47%, #ffffff 50%, rgba(255, 32, 32, 0.9) 53%, transparent 65%, transparent 100%)',
          backgroundSize: '250% 100%',
        }}
      >
        {text}
      </span>

      {/* ── Interactive Cursor Spotlight when hovering over text ── */}
      {isHovered && mousePos && (
        <span
          aria-hidden="true"
          className="absolute inset-0 z-30 pointer-events-none font-extrabold text-transparent bg-clip-text transition-opacity duration-300"
          style={{
            backgroundImage: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, #ff2020, transparent 75%)`,
          }}
        >
          {text}
        </span>
      )}
    </Component>
  );
}

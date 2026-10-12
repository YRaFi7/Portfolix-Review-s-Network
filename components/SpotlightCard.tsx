'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string; // CSS color string e.g. "rgba(255, 32, 32, 0.2)"
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 32, 32, 0.18)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isShining, setIsShining] = useState(false);

  // Trigger luminous shine animation when entering viewport or when page gets focus
  const triggerShine = () => {
    setIsShining(false);
    // Restart animation
    requestAnimationFrame(() => {
      setIsShining(true);
    });
  };

  useEffect(() => {
    // 1. Trigger shine on in-view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerShine();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // 2. Trigger shine when window receives focus
    const handleWindowFocus = () => {
      triggerShine();
    };
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      observer.disconnect();
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#ff2020]/40 ${className}`}
    >
      {/* ── Interactive Spotlight (tracks cursor) ── */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* ── Shine Sweep Flare (shines across the heading whenever focus comes to the section/page) ── */}
      <div
        className={`pointer-events-none absolute inset-0 -translate-x-full transition-transform ${
          isShining ? 'animate-spotlight-shine' : ''
        }`}
        style={{
          background:
            'linear-gradient(105deg, transparent 20%, rgba(255, 32, 32, 0.15) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 32, 32, 0.2) 55%, transparent 75%)',
        }}
      />

      {/* Subtle border shine highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.05]" />

      {/* Heading / Content Stays Solidly in Place */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

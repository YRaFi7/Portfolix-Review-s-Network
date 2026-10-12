'use client';

import React from 'react';
import { BrandConfig, getAllBrands } from '@/lib/brands';
import { RatingStats } from '@/lib/store';
import { Star, CheckCircle2, TrendingUp, Users, ArrowDown } from 'lucide-react';
import { BlurText } from './BlurText';

interface HeroHeaderProps {
  brand: BrandConfig;
  stats: RatingStats;
}

export function HeroHeader({ brand, stats }: HeroHeaderProps) {
  const brands = getAllBrands();

  return (
    <section className="relative overflow-hidden bg-[#050505] text-white pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-white/[0.08]">
      {/* Background Liquid Radial Glow Mesh */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 32, 32, 0.28), rgba(20, 20, 20, 0.4), transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(5,5,5,0.85)_80%,#050505_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] border border-white/[0.12] px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-md shadow-sm">
            <span className="portfolix-dot-glow" />
            <span>Independent Reviews</span>
            <span className="text-white/20">•</span>
            <span className="text-white font-semibold">{brand.name}</span>
          </div>

          {/* Centered Main Heading with BlurText Animation (Re-triggers whenever page appears) */}
          <div className="space-y-4">
            <BlurText
              text="PORTFOLIX REVIEW'S NETWORK"
              delay={45}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
            />
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-neutral-300 font-normal">
              Real feedback from clients, students, and partners. Read verified experiences across all Portfolix brands with zero bias and zero paid removals.
            </p>
          </div>

          {/* Clean Brand Switcher Segmented Control */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              {brands.map((b) => {
                const isActive = b.slug === brand.slug;
                return (
                  <a
                    key={b.slug}
                    href={`/?brand=${b.slug}`}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#ff2020] text-white font-semibold shadow-[0_0_20px_rgba(255,32,32,0.4)]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? 'bg-white' : 'bg-neutral-600'
                      }`}
                    />
                    <span>{b.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 4-Proof Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-4 max-w-4xl mx-auto">
            <div className="pb-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight flex items-center justify-center gap-1.5">
                <span>{stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '5.0'}</span>
                <Star className="h-5 w-5 fill-amber-400 text-amber-400 inline" />
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-medium">Average Rating</p>
            </div>

            <div className="pb-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stats.recommendationPercentage}%
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-medium">Recommend Rate</p>
            </div>

            <div className="pb-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#ff2020] tracking-tight">
                {stats.totalReviews}
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-medium">Verified Reviews</p>
            </div>

            <div className="pb-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-200 tracking-tight">
                100%
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-medium">Human Verified</p>
            </div>
          </div>

          {/* Quick jump to reviews */}
          <div className="pt-2">
            <a
              href="#reviews-section"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <span>Explore client reviews for {brand.name}</span>
              <ArrowDown className="h-3.5 w-3.5 text-[#ff2020]" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

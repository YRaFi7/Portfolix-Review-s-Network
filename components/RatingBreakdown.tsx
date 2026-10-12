'use client';

import React from 'react';
import { RatingStats } from '@/lib/store';
import { Star } from 'lucide-react';

interface RatingBreakdownProps {
  stats: RatingStats;
  selectedRating?: number;
  onSelectRating: (rating?: number) => void;
}

export function RatingBreakdown({ stats, selectedRating, onSelectRating }: RatingBreakdownProps) {
  const stars: (5 | 4 | 3 | 2 | 1)[] = [5, 4, 3, 2, 1];

  return (
    <div className="pb-card p-8 text-white space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white tracking-tight">Rating Distribution</h3>
        {selectedRating && (
          <button
            onClick={() => onSelectRating(undefined)}
            className="text-xs font-semibold text-[#ff2020] hover:text-[#ff4545] hover:underline"
          >
            Clear rating filter ({selectedRating}★)
          </button>
        )}
      </div>

      <div className="space-y-3">
        {stars.map((star) => {
          const breakdown = stats.breakdown[star] || { count: 0, percentage: 0 };
          const isSelected = selectedRating === star;

          return (
            <button
              key={star}
              onClick={() => onSelectRating(isSelected ? undefined : star)}
              className={`w-full flex items-center gap-4 text-left p-2.5 rounded-2xl transition-all group ${
                isSelected 
                  ? 'bg-[#ff2020]/15 ring-1 ring-[#ff2020]' 
                  : 'hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center gap-1.5 w-16 flex-shrink-0 text-xs font-semibold text-neutral-300">
                <span>{star}</span>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>

              <div className="flex-1 h-3 rounded-full bg-black/50 border border-white/5 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 group-hover:brightness-110"
                  style={{ width: `${breakdown.percentage}%` }}
                />
              </div>

              <div className="w-20 text-right text-xs font-medium text-neutral-400 flex-shrink-0">
                <span className="text-white font-bold">{breakdown.count}</span>
                <span className="text-neutral-500 text-[11px] ml-1">({breakdown.percentage}%)</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sentiment & Source Summary */}
      <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Sentiment breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Sentiment Analysis
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff2020]/10 px-3 py-1 font-semibold text-[#ff2020] border border-[#ff2020]/25">
              <span className="h-2 w-2 rounded-full bg-[#ff2020]" />
              Positive: {stats.sentimentBreakdown.positive}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 font-semibold text-neutral-300 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-neutral-400" />
              Neutral: {stats.sentimentBreakdown.neutral}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-950/60 px-3 py-1 font-semibold text-rose-300 border border-rose-500/30">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              Critical: {stats.sentimentBreakdown.negative}
            </span>
          </div>
        </div>

        {/* Source attribution distribution */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Review Sources
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(stats.sourceBreakdown).map(([source, count]) => (
              <span
                key={source}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 font-medium text-neutral-300"
              >
                <span>{source}</span>
                <span className="font-bold text-white">({count})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

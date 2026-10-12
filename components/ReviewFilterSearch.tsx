'use client';

import React from 'react';
import { Search, CheckCircle2, ArrowUpDown, X } from 'lucide-react';

interface ReviewFilterSearchProps {
  search: string;
  onSearchChange: (search: string) => void;
  ratingFilter?: number;
  onRatingChange: (rating?: number) => void;
  verifiedOnly: boolean;
  onVerifiedChange: (verified: boolean) => void;
  sourceFilter: string;
  onSourceChange: (source: string) => void;
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
  onSortChange: (sort: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful') => void;
  totalFilteredCount: number;
}

export function ReviewFilterSearch({
  search,
  onSearchChange,
  ratingFilter,
  onRatingChange,
  verifiedOnly,
  onVerifiedChange,
  sourceFilter,
  onSourceChange,
  sortBy,
  onSortChange,
  totalFilteredCount,
}: ReviewFilterSearchProps) {
  const hasActiveFilters = search || ratingFilter !== undefined || verifiedOnly || sourceFilter !== 'ALL';

  const clearAllFilters = () => {
    onSearchChange('');
    onRatingChange(undefined);
    onVerifiedChange(false);
    onSourceChange('ALL');
  };

  return (
    <div className="pb-card p-6 sm:p-8 space-y-6 text-white">
      
      {/* Top row: Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reviews by keywords, author, company, or service..."
            className="w-full rounded-2xl border border-white/10 bg-black/50 pl-11 pr-10 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:bg-black/70 focus:border-[#ff2020] focus:outline-none focus:ring-1 focus:ring-[#ff2020] transition-all"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ArrowUpDown className="h-4 w-4 text-neutral-400 hidden sm:inline" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="rounded-2xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-xs sm:text-sm font-medium text-neutral-200 focus:border-[#ff2020] focus:outline-none"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="helpful">Sort: Most Helpful</option>
            <option value="highest">Sort: Highest Rating</option>
            <option value="lowest">Sort: Lowest Rating</option>
            <option value="oldest">Sort: Oldest First</option>
          </select>
        </div>
      </div>

      {/* Filter Chips row */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
        
        {/* Star Rating Quick Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => onRatingChange(undefined)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              ratingFilter === undefined
                ? 'bg-[#ff2020] text-white shadow-[0_0_15px_rgba(255,32,32,0.4)]'
                : 'bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] border border-white/10'
            }`}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map((s) => (
            <button
              key={s}
              onClick={() => onRatingChange(ratingFilter === s ? undefined : s)}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                ratingFilter === s
                  ? 'bg-amber-400 text-black ring-2 ring-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] border border-white/10'
              }`}
            >
              <span>{s}★</span>
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        {/* Verified buyers filter button */}
        <button
          onClick={() => onVerifiedChange(!verifiedOnly)}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
            verifiedOnly
              ? 'bg-[#ff2020] text-white shadow-[0_0_15px_rgba(255,32,32,0.4)]'
              : 'bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] border border-white/10'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Verified Clients Only</span>
        </button>

        {/* Source Selector */}
        <select
          value={sourceFilter}
          onChange={(e) => onSourceChange(e.target.value)}
          className="rounded-full border border-white/10 bg-[#0d0d0d] px-3.5 py-1.5 text-xs font-semibold text-neutral-200 focus:outline-none focus:border-[#ff2020]"
        >
          <option value="ALL">All Sources</option>
          <option value="DIRECT">Direct Submissions</option>
          <option value="TRUSTPILOT">Trustpilot</option>
          <option value="CLUTCH">Clutch</option>
          <option value="G2">G2</option>
          <option value="GOOGLE">Google Reviews</option>
        </select>

        {/* Results summary and clear filters button */}
        <div className="ml-auto flex items-center gap-3 text-xs text-neutral-400">
          <span>Showing <strong className="text-white">{totalFilteredCount}</strong> reviews</span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-[#ff2020] hover:underline ml-1"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

    </div>
  );
}

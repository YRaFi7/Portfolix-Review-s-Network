'use client';

import React, { useState, useMemo } from 'react';
import { BrandConfig } from '@/lib/brands';
import { RatingStats, ReviewData } from '@/lib/store';
import { RatingBreakdown } from './RatingBreakdown';
import { ReviewFilterSearch } from './ReviewFilterSearch';
import { ReviewCard } from './ReviewCard';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';
import { ReportModal } from './ReportModal';
import { MessageSquarePlus, ShieldCheck, Inbox } from 'lucide-react';

interface ReviewsViewProps {
  brand: BrandConfig;
  initialReviews: ReviewData[];
  initialStats: RatingStats;
}

export function ReviewsView({ brand, initialReviews, initialStats }: ReviewsViewProps) {
  const [reviews, setReviews] = useState<ReviewData[]>(initialReviews);
  const [stats, setStats] = useState<RatingStats>(initialStats);

  // Filters state
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(undefined);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest');

  // Modal states
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [reportingReviewId, setReportingReviewId] = useState<string | null>(null);

  // Filter and sort reviews client-side (only APPROVED reviews are visible to the public)
  const filteredReviews = useMemo(() => {
    let list = reviews.filter((r) => r.status === 'APPROVED');

    if (ratingFilter !== undefined) {
      list = list.filter((r) => r.rating === ratingFilter);
    }

    if (verifiedOnly) {
      list = list.filter((r) => r.isVerifiedBuyer);
    }

    if (sourceFilter !== 'ALL') {
      list = list.filter((r) => r.source === sourceFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.content.toLowerCase().includes(q) ||
          r.authorName.toLowerCase().includes(q) ||
          (r.authorCompany && r.authorCompany.toLowerCase().includes(q)) ||
          (r.serviceUsed && r.serviceUsed.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
      return 0;
    });

    return list;
  }, [reviews, ratingFilter, verifiedOnly, sourceFilter, search, sortBy]);

  const refreshReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?brandSlug=${brand.slug}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
        setStats(data.stats);
      }
    } catch (e) {
      console.error('Error refreshing reviews:', e);
    }
  };

  return (
    <div id="reviews-section" className="scroll-mt-28 py-16 bg-[#050505] min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid: Rating Breakdown Widget & Review CTA Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8">
            <RatingBreakdown
              stats={stats}
              selectedRating={ratingFilter}
              onSelectRating={setRatingFilter}
            />
          </div>

          <div className="lg:col-span-4 h-full flex flex-col">
            <div 
              id="submit-review"
              className="scroll-mt-28 pb-card p-8 text-white flex-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ff2020]/10 px-3.5 py-1 text-[11px] font-semibold text-[#ff2020] border border-[#ff2020]/25">
                  <span className="pb-dot-glow" />
                  <span>Verified Feedback</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Worked with {brand.name}?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Share your genuine experience with the community. Every submission is verified to maintain real transparency and trust.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#ff2020] hover:bg-[#ff2020]/90 hover:-translate-y-0.5 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,32,32,0.35)] transition-all active:scale-[0.98]"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>Write a Review</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Search & Filter Toolbar */}
        <ReviewFilterSearch
          search={search}
          onSearchChange={setSearch}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          verifiedOnly={verifiedOnly}
          onVerifiedChange={setVerifiedOnly}
          sourceFilter={sourceFilter}
          onSourceChange={setSourceFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalFilteredCount={filteredReviews.length}
        />

        {/* Reviews List Stream */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onReportClick={(id) => setReportingReviewId(id)}
              />
            ))}
          </div>
        ) : (
          <div className="pb-card p-16 text-center">
            <Inbox className="mx-auto h-14 w-14 text-neutral-600 mb-4" />
            <h4 className="text-lg font-bold text-white">
              No matching reviews found
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
              Try adjusting your search keywords, clearing selected star ratings, or resetting your filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setRatingFilter(undefined);
                setVerifiedOnly(false);
                setSourceFilter('ALL');
              }}
              className="mt-6 rounded-full bg-white/[0.08] border border-white/10 px-5 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-white/[0.15] hover:-translate-y-0.5 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Submission Modal */}
      <ReviewSubmissionModal
        brand={brand}
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={refreshReviews}
      />

      {/* Report Modal */}
      <ReportModal
        reviewId={reportingReviewId}
        onClose={() => setReportingReviewId(null)}
      />
    </div>
  );
}

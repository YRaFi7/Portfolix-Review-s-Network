'use client';

import React, { useState } from 'react';
import { ReviewData } from '@/lib/store';
import { 
  Star, 
  CheckCircle, 
  ThumbsUp, 
  Flag, 
  MessageSquare, 
  ExternalLink, 
  Building,
  MapPin,
  Briefcase
} from 'lucide-react';

interface ReviewCardProps {
  review: ReviewData;
  onReportClick?: (reviewId: string) => void;
}

export function ReviewCard({ review, onReportClick }: ReviewCardProps) {
  const [helpfulVotes, setHelpfulVotes] = useState(review.helpfulCount);
  const [hasVoted, setHasVoted] = useState<'HELPFUL' | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type: 'HELPFUL' | 'UNHELPFUL') => {
    if (hasVoted || isVoting) return;
    setIsVoting(true);
    try {
      const res = await fetch(`/api/reviews/${review.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (data.success) {
        setHelpfulVotes(data.helpful);
        setHasVoted('HELPFUL');
      }
    } catch (e) {
      console.error('Vote failed:', e);
    } finally {
      setIsVoting(false);
    }
  };

  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="pb-card p-7 sm:p-9 space-y-5 text-white">
      
      {/* Header: Author name, Stars, Rating, Source Attribution & Date */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-5">

        {/* LEFT: Author avatar + name on top, then stars below */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#ff2020] to-[#990000] text-white font-extrabold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(255,32,32,0.35)] flex-shrink-0 mt-0.5">
            {review.authorName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1.5">
            {/* Author name + verified badge */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{review.authorName}</span>
              {review.isVerifiedBuyer && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#ff2020]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#ff2020] border border-[#ff2020]/30">
                  <CheckCircle className="h-3 w-3 text-[#ff2020]" />
                  Verified Client
                </span>
              )}
            </div>
            {/* Stars below name */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-white tracking-tight">
                {review.rating}.0 / 5.0
              </span>
            </div>
            {/* Author meta info */}
            {(review.authorTitle || review.authorCompany || review.authorLocation) && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                {review.authorTitle && <span>{review.authorTitle}</span>}
                {review.authorCompany && (
                  <span className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-neutral-500" />
                    {review.authorCompany}
                  </span>
                )}
                {review.authorLocation && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-neutral-500" />
                    {review.authorLocation}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Source badge + date */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {review.source === 'DIRECT' ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff2020]/10 px-3 py-1 text-[11px] font-semibold text-[#ff2020] border border-[#ff2020]/30">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff2020]" />
              Verified Direct Review
            </span>
          ) : (
            <a
              href={review.sourceUrl || '#'}
              target={review.sourceUrl ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-neutral-300 hover:text-white hover:bg-white/[0.1] border border-white/10 transition-colors"
            >
              <span>Source: {review.source}</span>
              {review.sourceUrl && <ExternalLink className="h-3 w-3 text-neutral-400" />}
            </a>
          )}
          <time className="text-xs text-neutral-400 font-mono" dateTime={review.createdAt}>
            {formattedDate}
          </time>
        </div>
      </div>

      {/* Title & Service Tag */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white leading-snug tracking-tight break-words">
          {review.title}
        </h3>
        {review.serviceUsed && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff2020] bg-[#ff2020]/10 px-3 py-1 rounded-full border border-[#ff2020]/20">
            <Briefcase className="h-3.5 w-3.5 text-[#ff2020]" />
            <span>Scope: {review.serviceUsed}</span>
          </div>
        )}
      </div>

      {/* Review Body — word-break to prevent overflow */}
      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal break-words whitespace-pre-wrap overflow-hidden">
        {review.content}
      </p>

      {/* Action Controls */}
      <div className="flex items-center gap-2 pt-1">
        {/* Helpful vote button */}
        <button
          onClick={() => handleVote('HELPFUL')}
          disabled={hasVoted !== null || isVoting}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold border transition-all hover:-translate-y-0.5 ${
            hasVoted === 'HELPFUL'
              ? 'bg-[#ff2020] text-white border-[#ff2020] font-bold shadow-[0_0_15px_rgba(255,32,32,0.35)]'
              : 'bg-white/[0.05] border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.1]'
          }`}
          title="Mark this review as helpful"
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>Helpful ({helpfulVotes})</span>
        </button>

        {/* Report review modal trigger */}
        <button
          onClick={() => onReportClick && onReportClick(review.id)}
          className="flex items-center gap-1 rounded-full bg-white/[0.05] border border-white/10 p-2 text-xs text-neutral-400 hover:text-rose-400 hover:border-rose-400/30 hover:-translate-y-0.5 transition-all"
          title="Report review"
        >
          <Flag className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Owner's Response */}
      {review.responses && review.responses.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-black/60 p-5 space-y-3">
          {/* Title only — no card, just bold heading */}
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff2020]">
            Owner's Response
          </p>

          {review.responses.map((resp) => (
            <div key={resp.id} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-bold text-white">
                  {resp.authorName}{' '}
                  <span className="font-normal text-neutral-400">({resp.authorRole})</span>
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {new Date(resp.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-200 bg-black/40 p-4 rounded-xl border border-white/10 break-words whitespace-pre-wrap">
                {resp.content}
              </p>
            </div>
          ))}
        </div>
      )}

    </article>
  );
}

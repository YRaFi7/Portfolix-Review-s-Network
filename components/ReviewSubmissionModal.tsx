'use client';

import React, { useState } from 'react';
import { BrandConfig } from '@/lib/brands';
import { Star, CheckCircle2, AlertCircle, Loader2, X, Send } from 'lucide-react';

interface ReviewSubmissionModalProps {
  brand: BrandConfig;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReviewSubmissionModal({ brand, isOpen, onClose, onSuccess }: ReviewSubmissionModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [authorCompany, setAuthorCompany] = useState('');
  const [serviceUsed, setServiceUsed] = useState(brand.supportedServices[0] || '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isVerifiedBuyer, setIsVerifiedBuyer] = useState(true);

  // Anti-spam honeypot
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        brandSlug: brand.slug,
        rating,
        authorName,
        authorEmail,
        authorTitle,
        authorCompany,
        serviceUsed,
        title,
        content,
        pros: '',
        cons: '',
        isVerifiedBuyer,
        website_honeypot: websiteHoneypot,
        source: 'DIRECT',
      };

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    onClose();
  };

  const inputClass =
    'w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:bg-black/70 focus:border-[#ff2020] focus:outline-none focus:ring-1 focus:ring-[#ff2020] transition-all';
  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#050505] border-b border-white/10 text-white">
          <div className="flex items-center gap-2.5">
            <span className="pb-dot-glow" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Submit a Verified Review for {brand.name}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="rounded-full p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Submission Success Screen */
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ff2020]/15 text-[#ff2020] border border-[#ff2020]/30 shadow-[0_0_25px_rgba(255,32,32,0.2)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Review Submitted for Moderation
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you for sharing your genuine experience with{' '}
              <strong className="text-white">{brand.name}</strong>. Your feedback has been placed in
              the moderation queue and will appear publicly once verified by our team.
            </p>
            <div className="pt-2">
              <button onClick={handleResetAndClose} className="btn-portfolix px-8 py-3 text-xs font-bold">
                Back to Reviews
              </button>
            </div>
          </div>
        ) : (
          /* Review Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">

            {submitError && (
              <div className="flex items-center gap-2 rounded-2xl bg-rose-950/60 p-3.5 text-xs font-medium text-rose-300 border border-rose-500/30">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Honeypot Spam Trap (Hidden) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_honeypot">Leave blank</label>
              <input
                id="website_honeypot"
                type="text"
                value={websiteHoneypot}
                onChange={(e) => setWebsiteHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* ── STEP 1: Your Full Name (above stars) ── */}
            <div>
              <label className={labelClass}>Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* ── STEP 2: Overall Star Rating ── */}
            <div>
              <label className={labelClass}>Overall Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        s <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm font-bold text-[#ff2020] ml-2">
                  {rating === 5 && '5.0 - Exceptional'}
                  {rating === 4 && '4.0 - Very Good'}
                  {rating === 3 && '3.0 - Average'}
                  {rating === 2 && '2.0 - Poor'}
                  {rating === 1 && '1.0 - Unacceptable'}
                </span>
              </div>
            </div>

            {/* ── STEP 3: Review Headline ── */}
            <div>
              <label className={labelClass}>Review Headline *</label>
              <input
                type="text"
                required
                placeholder="e.g. Transformed our executive branding and portfolio conversion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* ── STEP 4: Detailed Experience (text wraps inside box) ── */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className={labelClass}>Detailed Experience *</label>
                <span className="text-[11px] text-neutral-500">{content.length}/3000 chars</span>
              </div>
              <textarea
                required
                rows={5}
                maxLength={3000}
                placeholder="Share specific outcomes, ROI, communication responsiveness, technical delivery, or overall business impact..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* ── STEP 5: Service Category ── */}
            <div>
              <label className={labelClass}>Service / Scope Engaged</label>
              <select
                value={serviceUsed}
                onChange={(e) => setServiceUsed(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-2.5 text-xs sm:text-sm text-neutral-200 focus:border-[#ff2020] focus:outline-none"
              >
                {brand.supportedServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* ── STEP 6: Remaining Author Details ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div>
                <label className={labelClass}>Work / Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className={inputClass}
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Kept private and used strictly for identity verification.
                </span>
              </div>

              <div>
                <label className={labelClass}>Professional Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. VP of Product / Tech Lead"
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Company (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Scaleup Inc"
                  value={authorCompany}
                  onChange={(e) => setAuthorCompany(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* ── Verification Checkbox ── */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="verify-check"
                checked={isVerifiedBuyer}
                onChange={(e) => setIsVerifiedBuyer(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black/40 text-[#ff2020] focus:ring-[#ff2020] accent-[#ff2020]"
              />
              <label htmlFor="verify-check" className="text-xs text-neutral-300 leading-snug">
                I confirm this review is based on my genuine first-party engagement with{' '}
                <strong className="text-white">{brand.name}</strong>, and I agree to the{' '}
                <a href="#methodology" className="underline font-semibold text-[#ff2020]">
                  Review Integrity Standards
                </a>
                .
              </label>
            </div>

            {/* ── Modal Actions ── */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="rounded-full px-5 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-portfolix flex items-center gap-2 px-6 py-2.5 text-xs font-bold disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Flag, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { ReportReason } from '@/lib/store';

interface ReportModalProps {
  reviewId: string | null;
  onClose: () => void;
}

export function ReportModal({ reviewId, onClose }: ReportModalProps) {
  const [reason, setReason] = useState<ReportReason>('SPAM');
  const [details, setDetails] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!reviewId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/reviews/${reviewId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          details,
          reporterEmail: reporterEmail || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit report');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error reporting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs font-medium text-neutral-200 focus:border-[#ff2020] focus:outline-none transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0a0a0a] border border-white/10 p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200 text-white">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4 space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff2020]/15 text-[#ff2020] border border-[#ff2020]/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Report Logged</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Our trust and safety moderation team will investigate this review against our verification guidelines.
            </p>
            <button
              onClick={onClose}
              className="btn-portfolix mt-4 px-6 py-2.5 text-xs font-bold"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <Flag className="h-5 w-5" />
              <h3 className="text-lg font-bold text-white">
                Report Inappropriate Review
              </h3>
            </div>

            <p className="text-xs text-neutral-400">
              Help us maintain an authentic, spam-free reputation network.
            </p>

            {error && (
              <div className="flex items-center gap-2 rounded-2xl bg-rose-950/60 p-3 text-xs text-rose-300 border border-rose-500/30">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Reason for reporting *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-xs font-medium text-neutral-200 focus:border-[#ff2020] focus:outline-none"
              >
                <option value="SPAM">Commercial Spam / Promotional Link</option>
                <option value="FAKE">Unverified / Suspected Fake Review</option>
                <option value="OFFENSIVE">Abusive or Inappropriate Language</option>
                <option value="CONFLICT_OF_INTEREST">Conflict of Interest</option>
                <option value="OTHER">Other Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Additional Details (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Explain why this review violates trust guidelines..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-[#ff2020] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Your Email (Optional, for follow-up)
              </label>
              <input
                type="email"
                placeholder="your.email@company.com"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-[#ff2020] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-500 hover:-translate-y-0.5 disabled:opacity-50 shadow-md transition-all"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

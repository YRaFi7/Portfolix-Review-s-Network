'use client';

import React, { useState } from 'react';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BRANDS } from '@/lib/brands';
import { Flag, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

export default function ReportReviewPage() {
  const [selectedBrandSlug] = useState('portfolio-builders');
  const currentBrand = BRANDS[selectedBrandSlug];

  const [reviewId, setReviewId] = useState('');
  const [reason, setReason] = useState<'SPAM' | 'OFFENSIVE' | 'FAKE' | 'CONFLICT_OF_INTEREST' | 'OTHER'>('FAKE');
  const [details, setDetails] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId,
          reason,
          details,
          reporterEmail: reporterEmail || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to file report');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Error submitting report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar brand={currentBrand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3.5 py-1 text-xs font-bold text-rose-800">
              <Flag className="h-4 w-4 text-rose-600" />
              <span>Community Integrity & Fraud Reporting</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Report a Review for Investigation
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you suspect a review is fraudulent, contains prohibited hate speech, or was submitted without a genuine customer experience, report it here for immediate editorial review.
            </p>
          </div>

          {isSuccess ? (
            <div className="rounded-3xl border border-emerald-200 bg-white p-10 text-center shadow-xs space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Investigation Report Submitted
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Our moderation team will audit the flagged submission against transaction logs and contact the author if necessary. Thank you for maintaining network integrity.
              </p>
              <div className="pt-4">
                <a
                  href="/reviews"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                >
                  Return to Reviews Directory
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs space-y-6">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Review ID or Review URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reviewId}
                  onChange={(e) => setReviewId(e.target.value)}
                  placeholder="e.g. rev-pb-001 or paste review link"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Reason for Reporting <span className="text-rose-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e: any) => setReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="FAKE">Suspected Fake or Inauthentic Review</option>
                  <option value="SPAM">Commercial Spam / Advertising Link</option>
                  <option value="OFFENSIVE">Hate Speech, Defamation or Harassment</option>
                  <option value="CONFLICT_OF_INTEREST">Conflict of Interest (Competitor / Employee)</option>
                  <option value="OTHER">Other Policy Violation</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Detailed Explanation & Evidence <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe why this review violates platform guidelines..."
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Your Email Address (Optional, for investigation updates)
                </label>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {submitError && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-4 text-xs font-medium text-rose-700 border border-rose-200">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-3.5 text-sm font-bold text-white shadow-md hover:bg-rose-500 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Report...</span>
                  </>
                ) : (
                  <>
                    <Flag className="h-4 w-4" />
                    <span>Submit Report for Investigation</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </main>

      <Footer brand={currentBrand} />
    </>
  );
}

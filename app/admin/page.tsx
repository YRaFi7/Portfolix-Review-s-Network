'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';
import { ReviewData, ReviewStatus, ReviewReportData, AuditLogData } from '@/lib/store';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Search,
  ArrowLeft,
  Building,
  Star,
  ExternalLink,
  Loader2,
  RefreshCw,
  UserCheck
} from 'lucide-react';

import { SplitTextHeading } from '@/components/SplitTextHeading';

export default function AdminDashboardPage() {
  const brands = getAllBrands();
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'REVIEWS' | 'REPORTS' | 'AUDIT'>('REVIEWS');
  const [search, setSearch] = useState('');
  
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [reports, setReports] = useState<ReviewReportData[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogData[]>([]);
  const [loading, setLoading] = useState(true);

  // Response Authoring Modal State
  const [respondingReview, setRespondingReview] = useState<ReviewData | null>(null);
  const [responseAuthor, setResponseAuthor] = useState('Sarah Jenkins');
  const [responseRole, setResponseRole] = useState('Head of Client Experience');
  const [responseContent, setResponseContent] = useState('');
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);

  // Rejection Reason Modal
  const [rejectingReviewId, setRejectingReviewId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/reviews?`;
      if (selectedBrand !== 'all') url += `brandSlug=${selectedBrand}&`;
      if (selectedStatus !== 'ALL') url += `status=${selectedStatus}&`;
      if (search) url += `search=${encodeURIComponent(search)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
        setReports(data.reports || []);
        setAuditLogs(data.auditLogs || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [selectedBrand, selectedStatus]);

  const handleUpdateStatus = async (reviewId: string, status: ReviewStatus, reason?: string) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, status, reason, actorEmail: 'admin@portfolix.tech' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
        setRejectingReviewId(null);
        setRejectionReason('');
      }
    } catch (e) {
      console.error('Status update failed:', e);
    }
  };

  const handlePostResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingReview) return;
    setIsSubmittingResponse(true);

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId: respondingReview.id,
          authorName: responseAuthor,
          authorRole: responseRole,
          content: responseContent,
          actorEmail: 'admin@portfolix.tech',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRespondingReview(null);
        setResponseContent('');
        fetchAdminData();
      }
    } catch (e) {
      console.error('Response submission failed:', e);
    } finally {
      setIsSubmittingResponse(false);
    }
  };

  // Metrics calculation
  const totalCount = reviews.length;
  const pendingCount = reviews.filter((r) => r.status === 'PENDING').length;
  const approvedCount = reviews.filter((r) => r.status === 'APPROVED').length;
  const flaggedCount = reviews.filter((r) => r.status === 'FLAGGED').length;

  const inputClass = "w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#ff2020] transition-all";

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#ff2020] selection:text-white">
      
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-[#080808] text-white px-6 py-4 sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff2020] text-white font-extrabold shadow-[0_0_15px_rgba(255,32,32,0.35)]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight uppercase">
                  PORTFOLIX REVIEW'S NETWORK — MODERATION PORTAL
                </h1>
                <span className="rounded-full bg-[#ff2020]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#ff2020] border border-[#ff2020]/30">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Multi-brand reputation governance, review verification, and executive reply management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.1] hover:-translate-y-0.5 transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Data</span>
            </button>
            <Link
              href="/"
              className="btn-portfolix flex items-center gap-1.5 px-4 py-2 text-xs font-bold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Public Platform</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl p-6 sm:p-10 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="pb-card p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Managed Reviews</span>
            <div className="mt-2 text-3xl font-black text-white">{totalCount}</div>
          </div>
          <div className="pb-card p-6 border-amber-500/30 bg-amber-950/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Pending Verification Queue</span>
            <div className="mt-2 text-3xl font-black text-amber-400">{pendingCount}</div>
          </div>
          <div className="pb-card p-6 border-[#ff2020]/30 bg-[#ff2020]/5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#ff2020]">Approved & Published</span>
            <div className="mt-2 text-3xl font-black text-[#ff2020]">{approvedCount}</div>
          </div>
          <div className="pb-card p-6 border-purple-500/30 bg-purple-950/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">Flagged / Under Audit</span>
            <div className="mt-2 text-3xl font-black text-purple-400">{flaggedCount}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 gap-8 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'REVIEWS'
                ? 'border-[#ff2020] text-[#ff2020] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Review Moderation Queue ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('REPORTS')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'REPORTS'
                ? 'border-[#ff2020] text-[#ff2020] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Community Reports ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('AUDIT')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'AUDIT'
                ? 'border-[#ff2020] text-[#ff2020] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Audit Trail & History ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: Reviews Moderation Table */}
        {activeTab === 'REVIEWS' && (
          <div className="space-y-6">
            
            {/* Filter Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-card p-5">
              <div className="flex flex-wrap items-center gap-3">
                {/* Brand Selector */}
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#ff2020]" />
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="rounded-full border border-white/10 bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-neutral-200 focus:outline-none focus:border-[#ff2020]"
                  >
                    <option value="all">All Brands (3)</option>
                    {brands.map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-1.5">
                  {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'FLAGGED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all hover:-translate-y-0.5 ${
                        selectedStatus === st
                          ? 'bg-[#ff2020] text-white shadow-[0_0_15px_rgba(255,32,32,0.35)]'
                          : 'bg-white/[0.05] text-neutral-300 hover:bg-white/[0.1] border border-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchAdminData()}
                  className="rounded-full border border-white/10 bg-black/50 pl-10 pr-4 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#ff2020]"
                />
              </div>
            </div>

            {/* Reviews List */}
            {loading ? (
              <div className="p-16 text-center text-neutral-400 flex items-center justify-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-[#ff2020]" />
                <span>Loading moderation queue...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="pb-card p-16 text-center text-neutral-400 text-xs">
                No reviews match the selected brand and status filters.
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="pb-card p-7 space-y-4 text-white"
                  >
                    {/* Header: Brand, Status, Rating, Author */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-bold text-[#ff2020] border border-[#ff2020]/30">
                          {r.brandSlug}
                        </span>
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-4 w-4 ${
                                s <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-white ml-1.5">{r.rating}.0</span>
                        </div>
                        <span
                          className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            r.status === 'APPROVED'
                              ? 'bg-[#ff2020]/15 text-[#ff2020] border border-[#ff2020]/30'
                              : r.status === 'PENDING'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                              : r.status === 'FLAGGED'
                              ? 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-400 font-mono">
                        Submitted: {new Date(r.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {/* Review content */}
                    <div>
                      <h4 className="text-base font-bold text-white mb-1 tracking-tight">{r.title}</h4>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{r.content}</p>
                    </div>

                    {/* Author metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300 bg-black/50 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{r.authorName}</span>
                        <span className="text-neutral-400 font-mono">({r.authorEmail})</span>
                        {r.authorTitle && <span>• {r.authorTitle}</span>}
                        {r.authorCompany && <span>@ {r.authorCompany}</span>}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[10px] text-neutral-300 border border-white/10">
                          Source: {r.source}
                        </span>
                        {r.isVerifiedBuyer && (
                          <span className="text-[#ff2020] font-semibold flex items-center gap-1">
                            <UserCheck className="h-3.5 w-3.5 text-[#ff2020]" /> Verified Client
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Company response thread if existing */}
                    {r.responses && r.responses.length > 0 && (
                      <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-xs space-y-1.5">
                        <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4 text-[#ff2020]" />
                          <span>Published Company Response ({r.responses[0].authorName} - {r.responses[0].authorRole}):</span>
                        </div>
                        <p className="text-neutral-200 bg-black/40 p-3 rounded-xl border border-white/10">{r.responses[0].content}</p>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setRespondingReview(r)}
                          className="flex items-center gap-1.5 rounded-full bg-white/[0.05] border border-white/10 px-4 py-2 text-xs font-bold text-neutral-200 hover:text-white hover:bg-white/[0.1] hover:-translate-y-0.5 transition-all"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-[#ff2020]" />
                          <span>{r.responses && r.responses.length > 0 ? 'Add Another Reply' : 'Add Official Company Reply'}</span>
                        </button>

                        <Link
                          href={`/reviews/${r.id}`}
                          target="_blank"
                          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.1] hover:-translate-y-0.5 transition-all"
                        >
                          <span>Public URL</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>

                      <div className="flex items-center gap-2">
                        {r.status !== 'APPROVED' && (
                          <button
                            onClick={() => handleUpdateStatus(r.id, 'APPROVED')}
                            className="btn-portfolix flex items-center gap-1.5 px-4 py-2 text-xs font-bold"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Approve & Publish</span>
                          </button>
                        )}

                        {r.status !== 'FLAGGED' && (
                          <button
                            onClick={() => handleUpdateStatus(r.id, 'FLAGGED')}
                            className="flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-900/50 hover:-translate-y-0.5 transition-all"
                          >
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>Flag</span>
                          </button>
                        )}

                        {r.status !== 'REJECTED' && (
                          <button
                            onClick={() => setRejectingReviewId(r.id)}
                            className="flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-950/40 px-3.5 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-900/50 hover:-translate-y-0.5 transition-all"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Community Reports */}
        {activeTab === 'REPORTS' && (
          <div className="pb-card p-8 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">Reported Review Incidents</h3>
            {reports.length === 0 ? (
              <p className="text-xs text-neutral-400">No open community reports.</p>
            ) : (
              <div className="space-y-4">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-5 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-2 text-white">
                    <div className="flex justify-between font-bold text-white">
                      <span>Reason: {rep.reason}</span>
                      <span className="text-neutral-400 font-mono font-normal">{new Date(rep.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-neutral-300">{rep.details || 'No additional details submitted.'}</p>
                    <div className="text-neutral-400 text-[11px]">Reporter: {rep.reporterEmail || 'Anonymous'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Audit Trail */}
        {activeTab === 'AUDIT' && (
          <div className="pb-card p-8 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">Cryptographic Audit History</h3>
            <div className="space-y-3 font-mono text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-black/50 border border-white/10 flex justify-between items-center text-white">
                  <div>
                    <span className="text-[#ff2020] font-bold">{log.action}</span>
                    <span className="text-neutral-300 ml-2">by {log.actorEmail}</span>
                    {log.metadata && <span className="text-neutral-400 ml-2">({log.metadata})</span>}
                  </div>
                  <span className="text-neutral-500 text-[11px]">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Official Response Composer Modal */}
      {respondingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 space-y-5 text-white shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
              <MessageSquare className="h-5 w-5 text-[#ff2020]" />
              <span>Publish Official Company Reply</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Replying to review "{respondingReview.title}" by {respondingReview.authorName} ({respondingReview.brandSlug})
            </p>

            <form onSubmit={handlePostResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">Representative Name</label>
                <input
                  type="text"
                  required
                  value={responseAuthor}
                  onChange={(e) => setResponseAuthor(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff2020]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">Official Role / Title</label>
                <input
                  type="text"
                  required
                  value={responseRole}
                  onChange={(e) => setResponseRole(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff2020]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">Response Content</label>
                <textarea
                  required
                  rows={4}
                  value={responseContent}
                  onChange={(e) => setResponseContent(e.target.value)}
                  placeholder="Thank the reviewer, address specific observations, or outline corrective actions..."
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff2020]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setRespondingReview(null)}
                  className="rounded-full px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingResponse}
                  className="btn-portfolix px-5 py-2 text-xs font-bold disabled:opacity-50"
                >
                  {isSubmittingResponse ? 'Publishing...' : 'Publish Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectingReviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 space-y-4 text-white shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              <span>Reject Review</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Provide an optional internal audit reason for rejecting this review.
            </p>
            <input
              type="text"
              placeholder="e.g. Unverified email / commercial spam / violates policy"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-400"
            />
            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setRejectingReviewId(null)}
                className="rounded-full px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(rejectingReviewId, 'REJECTED', rejectionReason)}
                className="rounded-full bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-500 hover:-translate-y-0.5 shadow-md transition-all"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

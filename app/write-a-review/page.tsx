'use client';

import React, { useState } from 'react';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BRANDS, BrandConfig } from '@/lib/brands';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  FileCheck,
  Send,
  HelpCircle,
  Building,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

export default function WriteAReviewPage() {
  // Brand selection (defaulting to current active brand or portfolio-builders)
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('portfolio-builders');
  const currentBrand: BrandConfig = BRANDS[selectedBrandSlug] || BRANDS['portfolio-builders'];

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Form Fields as per Section 9
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Student');
  const [serviceUsed, setServiceUsed] = useState(currentBrand.supportedServices[0] || '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [experienceDate, setExperienceDate] = useState('');
  const [location, setLocation] = useState('');
  const [permissionToPublish, setPermissionToPublish] = useState(true);
  const [verificationEvidence, setVerificationEvidence] = useState('');

  // Honeypot spam field
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBrandChange = (newSlug: string) => {
    setSelectedBrandSlug(newSlug);
    const newBrand = BRANDS[newSlug];
    if (newBrand && newBrand.supportedServices.length > 0) {
      setServiceUsed(newBrand.supportedServices[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!permissionToPublish) {
      setSubmitError('Permission to publish is required to submit your review.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        brandSlug: selectedBrandSlug,
        rating,
        authorName: fullName,
        authorEmail: email,
        authorPhone: phone || undefined,
        reviewerType: relationship,
        serviceUsed,
        title,
        content,
        pros,
        cons,
        experienceDate: experienceDate || undefined,
        authorLocation: location || undefined,
        permissionToPublish,
        verificationEvidence: verificationEvidence || undefined,
        isVerifiedBuyer: Boolean(verificationEvidence || email),
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
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while submitting your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar brand={currentBrand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Card */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Authentic Experience Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Share Your Genuine Experience
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              We publish genuine feedback from students, clients, and partners. Both positive and constructive reviews are published to maintain real accountability.
            </p>
          </div>

          {/* Submission Success View */}
          {isSubmitted ? (
            <div className="rounded-3xl border border-emerald-200 bg-white p-10 text-center shadow-sm space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  Thank You for Your Review!
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your review has been submitted to the moderation queue for verification. We never delete genuine critical feedback. You will receive an email update once published.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`/reviews?brand=${selectedBrandSlug}`}
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                >
                  Browse Published Reviews
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Submit Another Feedback
                </button>
              </div>
            </div>
          ) : (
            /* Form Container */
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm space-y-8">
              
              {/* Brand Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span>Select Company / Division</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.values(BRANDS).map((b) => (
                    <button
                      key={b.slug}
                      type="button"
                      onClick={() => handleBrandChange(b.slug)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        selectedBrandSlug === b.slug
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm font-bold text-blue-950'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{b.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{b.domain}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating Section */}
              <div className="space-y-2 rounded-2xl bg-slate-50 p-6 border border-slate-100 text-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Overall Rating <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`h-9 w-9 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-xs font-semibold text-slate-600 pt-1">
                  {rating === 5 && '5 Stars — Excellent Experience'}
                  {rating === 4 && '4 Stars — Very Good Experience'}
                  {rating === 3 && '3 Stars — Average / Satisfactory'}
                  {rating === 2 && '2 Stars — Below Expectations'}
                  {rating === 1 && '1 Star — Poor Experience'}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Full Name <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Athul Krishna"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <span className="text-[10px] text-slate-400">Used strictly for verification. Never shown publicly.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Relationship with Brand <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Student">Student</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Client">Client</option>
                    <option value="Business Client">Business Client</option>
                    <option value="Intern">Intern</option>
                    <option value="Parent">Parent</option>
                    <option value="Partner">Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Service & Experience Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700">
                    Program / Service <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    {currentBrand.supportedServices.map((svc) => (
                      <option key={svc} value={svc}>
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Date of Experience</span>
                  </label>
                  <input
                    type="date"
                    value={experienceDate}
                    onChange={(e) => setExperienceDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kochi, Kerala"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Review Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Sum up your experience in one compelling sentence"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Detailed Experience <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share specific details about what you worked on, mentor interaction, technical curriculum, or project outcomes..."
                    className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-emerald-800">
                      What Did You Like? (Pros)
                    </label>
                    <textarea
                      rows={3}
                      value={pros}
                      onChange={(e) => setPros(e.target.value)}
                      placeholder="Highlights, strengths, helpful mentorship..."
                      className="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-800">
                      What Could Be Improved? (Cons)
                    </label>
                    <textarea
                      rows={3}
                      value={cons}
                      onChange={(e) => setCons(e.target.value)}
                      placeholder="Pacing, tooling, mock interviews, scheduling..."
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 p-3 text-xs text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Verification Evidence (Private) */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <Lock className="h-4 w-4 text-blue-600" />
                  <span>Verification Evidence (Confidential & Private)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Provide your Enrollment ID, Invoice Reference, Certificate Link, or Project Agreement number. This helps us award you the <strong>Verified Customer/Student</strong> badge. It is strictly private and never published.
                </p>
                <input
                  type="text"
                  value={verificationEvidence}
                  onChange={(e) => setVerificationEvidence(e.target.value)}
                  placeholder="e.g. Student ID #PB-2026-8812 or Invoice #INV-492"
                  className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Honeypot hidden input */}
              <input
                type="text"
                name="website_url"
                value={websiteHoneypot}
                onChange={(e) => setWebsiteHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                style={{ display: 'none' }}
              />

              {/* Permission & Publication Consent */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissionToPublish}
                    onChange={(e) => setPermissionToPublish(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I confirm this review represents my own genuine experience. I grant permission to publish this feedback on {currentBrand.name} Reviews according to the <a href="/review-policy" className="text-blue-600 hover:underline">Review Policy</a>.
                  </span>
                </label>
              </div>

              {/* Error Banner */}
              {submitError && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-4 text-xs font-medium text-rose-700 border border-rose-200">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Verified Review for Moderation</span>
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

import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, AlertCircle, CheckCircle2, Ban, RefreshCw, FileText, Scale } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Review Guidelines & Community Policy`,
    description: `Rules, standards, and guidelines for submitting, moderating, and appealing customer reviews on ${brand.name}.`,
    alternates: {
      canonical: `https://${brand.domain}/review-guidelines`,
    },
  };
}

export default function ReviewGuidelinesPage() {
  const brand = getTenantBrand();

  const rules = [
    {
      title: '1. Who Can Submit Reviews',
      content: 'Any individual who has directly engaged with the brand as an enrolled student, program alumni, enterprise client, intern, commercial customer, or corporate partner is encouraged to submit feedback.',
    },
    {
      title: '2. Prohibited Content',
      content: 'We will not publish reviews containing vulgarity, hate speech, defamatory personal insults, trade secrets, confidential internal source code, or personal private details (doxxing). Reviews must focus on actual services and course experiences.',
    },
    {
      title: '3. Authenticity & Zero Fake Testimonials',
      content: 'We strictly ban paid reviews, fabricated author personas, AI-generated synthetic reviews, and coordinated review attacks. Discovered fraudulent submissions are permanently blocked and flagged in our internal audit logs.',
    },
    {
      title: '4. Incentivized Reviews Disclosure',
      content: 'If a reviewer participated in an authorized educational survey with a standard entry reward or gift token, the review must be disclosed with an "Incentivized Feedback" tag. Rewards are never tied to positive ratings.',
    },
    {
      title: '5. Moderation Standard',
      content: 'Submissions are reviewed by trained moderators within 24 hours. A review is never rejected simply for being critical or scoring 1 to 2 stars. Honest negative reviews provide vital accountability.',
    },
    {
      title: '6. Review Edits & Updates',
      content: 'Authors may request updates to their review if their experience changes or a concern was resolved. Edited reviews retain an audit trail and an "Edited" badge with the revised timestamp.',
    },
    {
      title: '7. Appeals & Disputes',
      content: 'If an author or company believes a review was rejected in error, an appeal can be filed at reviews@portfolix.tech with supporting evidence for independent secondary evaluation.',
    },
  ];

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <Scale className="h-4 w-4 text-blue-600" />
              <span>Editorial Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Review Guidelines & Conduct Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our standards ensure that every published review is genuine, civil, and legally compliant, maintaining a trustworthy reputation hub for all visitors.
            </p>
          </div>

          <div className="space-y-6">
            {rules.map((r, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs space-y-2">
                <h2 className="text-base font-bold text-slate-900">{r.title}</h2>
                <p className="text-sm text-slate-700 leading-relaxed">{r.content}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

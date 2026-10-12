import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Scale, 
  Search, 
  Sparkles, 
  MessageSquare, 
  RefreshCw, 
  FileCheck,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Review Methodology & Trust Standards | Official Hub`,
    description: `Public explanation of how reviews are collected, verified, imported, calculated, and moderated across the ${brand.name} reputation network.`,
    alternates: {
      canonical: `https://${brand.domain}/methodology`,
    },
  };
}

export default function MethodologyPage() {
  const brand = getTenantBrand();

  const methodologySections = [
    {
      title: '1. How Reviews Are Collected',
      icon: <FileCheck className="h-5 w-5 text-blue-600" />,
      content:
        'Reviews are submitted directly through our verified /write-a-review portal by students, alumni, clients, and verified commercial stakeholders. Reviewers submit detailed feedback including pros, areas for improvement, date of experience, and optional private verification evidence (such as LMS enrollment IDs or commercial invoice references).',
    },
    {
      title: '2. How Reviews Are Verified',
      icon: <Lock className="h-5 w-5 text-emerald-600" />,
      content:
        'We enforce strict verification protocols without exposing private student or client identities. Submissions are matched against verified email OTPs, corporate domain records, LMS student rosters, or transaction IDs. Reviews are awarded a "Verified" badge only when authentic engagement has been confirmed. Unverified submissions are clearly labeled as "Unverified" and never granted synthetic badges.',
    },
    {
      title: '3. How External Reviews Are Imported',
      icon: <Search className="h-5 w-5 text-purple-600" />,
      content:
        'We aggregate permitted excerpts from established external platforms such as Google, Clutch, Trustpilot, and G2. Every imported review prominently indicates its origin, display platform badge, imported date, and a direct link to the original review profile. We never disguise an external platform review as a direct submission.',
    },
    {
      title: '4. How Ratings Are Calculated',
      icon: <Scale className="h-5 w-5 text-amber-600" />,
      content:
        'Overall aggregate ratings and percentage distributions are calculated dynamically from approved database records. We never hard-code ratings, fake review counts, or round up unearned decimals. All 1-star through 5-star ratings are factored into the dynamic weighted score.',
    },
    {
      title: '5. How Duplicate Reviews Are Identified',
      icon: <RefreshCw className="h-5 w-5 text-rose-600" />,
      content:
        'Our database enforces unique constraints on review fingerprints, IP hashes, and reviewer tokens. Submissions containing identical or substantially duplicated text across multiple accounts are quarantined for administrative review to prevent astroturfing.',
    },
    {
      title: '6. How Suspicious Reviews & Fraud Are Handled',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      content:
        'Submissions are scored using automated spam filters, disposable email checks, honeypot inputs, and rate-limiting throttling. Reviews flagged as suspicious are placed in a moderation hold. We never automatically delete a review based solely on an automated score; instead, human moderators conduct an audit.',
    },
    {
      title: '7. How Reviews Are Moderated',
      icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
      content:
        'Moderators review submissions solely for authenticity, legal compliance, and prohibited content (such as hate speech, private personal data, or trade secrets). A genuine review is NEVER rejected simply because it contains a negative or critical rating. Negative feedback is published to maintain public integrity.',
    },
    {
      title: '8. How Company Responses Work',
      icon: <MessageSquare className="h-5 w-5 text-teal-600" />,
      content:
        'Official representatives have the right to post public, transparent responses to address student or client observations. Company responses are clearly badged with executive titles and timestamps. A company response cannot edit, overwrite, or hide the customer review.',
    },
    {
      title: '9. How Corrections & Edits Are Handled',
      icon: <HelpCircle className="h-5 w-5 text-slate-600" />,
      content:
        'If a reviewer updates their feedback or rectifies an issue with our support team, the update displays an "Edited" timestamp. Historical versions and audit logs are retained permanently in our internal database to prevent covert revisions.',
    },
    {
      title: '10. How AI Review Summaries Are Generated',
      icon: <Sparkles className="h-5 w-5 text-indigo-600" />,
      content:
        'AI linguistic models are used exclusively to synthesize recurring praise and constructive themes across batches of approved reviews. The AI is strictly barred from inventing testimonials, altering star ratings, or rephrasing user sentiment. Every AI summary discloses the exact sample size analyzed, and links directly to the underlying raw reviews.',
    },
  ];

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Public Trust & Integrity Standard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Review Methodology & Verification Standards
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Trust is the foundational asset of this platform. We operate with complete transparency regarding how reviews are submitted, verified, calculated, and audited.
            </p>
          </div>

          {/* Operational Disclosure Banner */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Ownership & Integrity Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This review platform is operated directly by <strong>{brand.legalName}</strong> as the official customer experience hub for <strong>{brand.name}</strong>. We explicitly do not pretend to be an unaffiliated third-party agency. Because our goal is authentic improvement and public trust, negative genuine feedback is published alongside positive sentiment.
            </p>
          </div>

          {/* Methodology Sections */}
          <div className="space-y-6">
            {methodologySections.map((sec, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs space-y-3 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                    {sec.icon}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {sec.title}
                  </h2>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact for Methodology Audits */}
          <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-6 text-center space-y-2 text-xs text-slate-700">
            <h3 className="font-bold text-blue-950 text-sm">Questions Regarding Our Review Methodology?</h3>
            <p>Our editorial integrity board can be contacted directly at <a href={`mailto:${brand.contactEmail}`} className="text-blue-600 underline font-semibold">{brand.contactEmail}</a>.</p>
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

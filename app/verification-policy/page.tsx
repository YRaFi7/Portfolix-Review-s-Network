import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, CheckCircle2, Lock, FileText, Mail, Building, Users } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Review Verification Policy | Verified Badges & Trust`,
    description: `Learn how ${brand.name} validates client identity, student enrollments, and transaction records without exposing private customer information.`,
    alternates: {
      canonical: `https://${brand.domain}/verification-policy`,
    },
  };
}

export default function VerificationPolicyPage() {
  const brand = getTenantBrand();

  const methods = [
    {
      title: 'Email OTP Verification',
      desc: 'Authors must confirm ownership of their email address using a time-sensitive verification code. Disposable or throwaway email domains are barred from receiving verified status.',
    },
    {
      title: 'LMS & Student Account Matching',
      desc: 'For academic and internship reviews on Portfolio Builders, author details are checked against registered LMS cohort records and attendance metrics.',
    },
    {
      title: 'Invoice & Project Reference Match',
      desc: 'Commercial engineering clients on Portfolix.Tech can submit a valid commercial invoice ID, Git repository agreement, or service order reference.',
    },
    {
      title: 'Corporate Domain Verification',
      desc: 'Reviews originating from verified corporate email domains matching contracting partners are verified automatically for organizational reviews.',
    },
    {
      title: 'Manual Administrator Verification',
      desc: 'For complex client feedback or offline engagements, an independent compliance officer inspects documentation prior to granting the Verified badge.',
    },
  ];

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Zero Fake Badges Standard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer & Student Verification Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We never fabricate verification badges. The "Verified" badge is awarded exclusively when a factual commercial or educational relationship is established.
            </p>
          </div>

          {/* Privacy Guarantee Box */}
          <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-7 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 font-bold text-blue-950 text-sm">
              <Lock className="h-5 w-5 text-blue-600" />
              <span>Strict Privacy Protection Guarantee (Section 43)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We will never publicly reveal an author's phone number, student registration ID, invoice total, private project contract, IP address, or uploaded evidence. Verification documents are encrypted in our private storage and used solely for audit validation.
            </p>
          </div>

          {/* Verification Methods */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Approved Verification Channels
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {methods.map((m, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{m.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Unverified Reviews */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 space-y-3">
            <h3 className="font-bold text-slate-900 text-base">What Happens If a Review Is Unverified?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If an author chooses not to provide evidence or submits an untraceable reference, their genuine review can still be published if it passes community conduct standards. However, it will be labeled prominently as <strong>"Unverified Review"</strong> to maintain transparent provenance for all readers.
            </p>
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

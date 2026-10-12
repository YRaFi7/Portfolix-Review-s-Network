import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Reviews Privacy Policy & Data Safeguards`,
    description: `Privacy policy governing student and client reviews on ${brand.name}. Zero exposure of private phone numbers, student IDs, invoices, or IP addresses.`,
    alternates: {
      canonical: `https://${brand.domain}/privacy`,
    },
  };
}

export default function PrivacyPage() {
  const brand = getTenantBrand();

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <Lock className="h-4 w-4 text-blue-600" />
              <span>Consumer & Student Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy & Verification Data Protection
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We take the privacy of our reviewers seriously. Learn what data is published, what data remains strictly confidential, and how to request deletion.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                1. Information Never Disclosed Publicly (Section 43 Standard)
              </h2>
              <p>
                To protect our community members from unsolicited contact, spam, and identity exposure, the following data points are <strong>permanently restricted to private encrypted storage and will never appear on public review pages:</strong>
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800 pt-2">
                <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Email Addresses</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Phone Numbers</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Student & Enrollment IDs</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Invoice & Payment Numbers</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Uploaded Verification Evidence</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Raw IP Addresses & Network Logs</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                2. Information Displayed Publicly
              </h2>
              <p>
                When you submit a review with permission to publish, only the following information is visible on the review card:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Author Display Name (e.g., Athul Krishna)</li>
                <li>Professional title or relationship (e.g., UI/UX Student or Junior Designer)</li>
                <li>General location (e.g., Kochi, Kerala)</li>
                <li>Star rating (1 to 5)</li>
                <li>Review title, detailed feedback, pros, and cons</li>
                <li>Verification badge status (e.g., Verified Student / Verified Customer)</li>
                <li>Submission date</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                3. Data Deletion & Privacy Rights
              </h2>
              <p>
                Authors maintain the right to request deletion or modification of their published reviews. You can submit a deletion request by emailing <a href={`mailto:${brand.contactEmail}`} className="text-blue-600 underline font-semibold">{brand.contactEmail}</a> from the email address used during initial submission. Upon verification, the review and associated metadata will be removed within 5 business days.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

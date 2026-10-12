import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  FileText, 
  Scale, 
  Eye, 
  Flag, 
  ArrowRight,
  Database,
  Building
} from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Trust Centre | Governance, Security & Integrity`,
    description: `Comprehensive trust center consolidating review policies, verification methods, moderation standards, fraud protection, and privacy safeguards for ${brand.name}.`,
    alternates: {
      canonical: `https://${brand.domain}/trust`,
    },
  };
}

export default function TrustCentrePage() {
  const brand = getTenantBrand();

  const trustPillars = [
    {
      title: 'Review Methodology',
      href: '/methodology',
      icon: <Scale className="h-6 w-6 text-blue-600" />,
      desc: 'Transparent protocols detailing collection, calculations, duplicate checks, and authentic rating logic.',
    },
    {
      title: 'Verification Policy',
      href: '/verification-policy',
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
      desc: 'How customer email OTPs, LMS records, and commercial invoice references are audited without exposing private data.',
    },
    {
      title: 'Review Guidelines',
      href: '/review-guidelines',
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      desc: 'Community standards, prohibited content rules, and zero tolerance for fake or synthetic testimonials.',
    },
    {
      title: 'Sources Directory',
      href: '/sources',
      icon: <Eye className="h-6 w-6 text-purple-600" />,
      desc: 'Provenance directory separating direct verified reviews from attributed third-party excerpts.',
    },
    {
      title: 'Audited Brand Facts',
      href: '/brand-facts',
      icon: <Building className="h-6 w-6 text-amber-600" />,
      desc: 'Corporate parent relationships, registration facts, and service taxonomies structured for AEO/GEO.',
    },
    {
      title: 'Report a Review',
      href: '/report-review',
      icon: <Flag className="h-6 w-6 text-rose-600" />,
      desc: 'Public investigation portal to report suspicious submissions, conflicts of interest, or policy violations.',
    },
  ];

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Unified Reputation & Transparency Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {brand.name} Trust Centre
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We hold this platform to the highest standards of data integrity and consumer trust. Explore our governance frameworks, privacy safeguards, and moderation policies below.
            </p>
          </div>

          {/* Operational Statement */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Lock className="h-5 w-5 text-emerald-600" />
              <span>Core Principle: Authentic Accountability</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              This platform is operated by <strong>{brand.legalName}</strong>. Unlike promotional landing pages, this network is built to serve as an immutable repository of public customer sentiment. We do not gate negative feedback, we do not sell ratings, and we display all review verification statuses transparently.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPillars.map((p, i) => (
              <Link
                key={i}
                href={p.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    {p.icon}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 pt-2">
                  <span>Explore Standard</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Security & Data Safeguards */}
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 sm:p-10 text-white shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-bold">
                Platform Security & Audit Guarantees
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
              <div className="space-y-1.5">
                <strong className="text-white block font-semibold">Immutable Audit Trail:</strong>
                <p>Every submission, status transition, response, and moderation decision is timestamped and logged permanently in PostgreSQL.</p>
              </div>

              <div className="space-y-1.5">
                <strong className="text-white block font-semibold">Zero Private Leakage:</strong>
                <p>Student registration numbers, invoices, IP addresses, and private emails are permanently quarantined from public view.</p>
              </div>

              <div className="space-y-1.5">
                <strong className="text-white block font-semibold">Anti-Abuse Safeguards:</strong>
                <p>Submissions are shielded with honeypots, rate limiters, duplicate-text fingerprinting, and cryptographic IP hashes.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

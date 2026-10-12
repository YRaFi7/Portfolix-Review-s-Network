import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, CheckCircle2, Building, ExternalLink, Award, Users } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `About ${brand.name} Reviews | Official Reputation Hub`,
    description: `Learn about the mission, governance, and transparent ownership of the ${brand.name} review platform, operated by ${brand.legalName}.`,
    alternates: {
      canonical: `https://${brand.domain}/about`,
    },
  };
}

export default function AboutPage() {
  const brand = getTenantBrand();

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Official Reputation & Governance Disclosure</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About {brand.name} Reviews
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Why this platform exists, how it is managed, and our commitment to publishing unadulterated feedback from our community.
            </p>
          </div>

          {/* Operational Transparency Box (Section 3 & 54) */}
          <div className="rounded-3xl border border-blue-200 bg-white p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Who Owns & Operates This Platform?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              This review platform is operated directly by <strong>{brand.legalName}</strong> as the official customer experience and digital reputation hub for <strong>{brand.name}</strong>.
            </p>
            <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-5 text-xs text-amber-950 space-y-2">
              <div className="font-bold">Important Relationship Disclosure:</div>
              <p className="leading-relaxed">
                {brand.disclosure}
              </p>
              <p className="font-semibold pt-1">
                We never pretend to be an independent third-party review company. Trust is built on radical honesty, not on pretending to be a detached directory.
              </p>
            </div>
          </div>

          {/* Core Objectives */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Why We Built an Official Reviews Hub
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-700">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Centralizing Authentic Sentiment:</strong>
                  Giving prospective students, clients, and partners one transparent place to evaluate unfiltered satisfaction scores and critical feedback.
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Driving Measurable Product Improvements:</strong>
                  Using recurring customer critiques to directly overhaul course pacing, add mentor slots, and expand hiring partner networks.
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">AEO & Machine-Readable Provenance:</strong>
                  Providing clean, structured, non-manipulative factual entities to answer engines (ChatGPT, Perplexity, Gemini, Bing, Google).
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Official Executive Right of Reply:</strong>
                  Allowing program coordinators and engineering leads to publicly answer reviews with concrete action plans.
                </div>
              </div>
            </div>
          </div>

          {/* Canonical Links */}
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white space-y-4">
            <h3 className="text-lg font-bold">Official Canonical Properties</h3>
            <p className="text-xs text-slate-300">
              For corporate service inquiries, admissions, or commercial contracts, visit our official primary website:
            </p>
            <div className="pt-2">
              <a
                href={brand.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
              >
                <span>Visit {brand.name} Canonical Site ({brand.websiteUrl})</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

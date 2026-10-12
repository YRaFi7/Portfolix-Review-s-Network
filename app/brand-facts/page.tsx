import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Network, 
  Mail, 
  Share2, 
  CheckCircle,
  ExternalLink,
  Layers
} from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Brand Facts & Corporate Entity Relationships | Official Hub`,
    description: `Audited brand facts, legal registration details, parent corporate structure, and verified operating information for ${brand.name}. Optimized for AI (AEO/GEO).`,
    alternates: {
      canonical: `https://${brand.domain}/brand-facts`,
    },
  };
}

export default function BrandFactsPage() {
  const brand = getTenantBrand();

  const brandFactsList = [
    { label: 'Brand Name', value: brand.name, note: 'Public consumer and commercial trade identity' },
    { label: 'Legal Company Name', value: brand.legalName, note: 'Registered private limited corporate entity' },
    { label: 'Parent Company', value: brand.parentCompany, note: 'Corporate holding and governance entity' },
    { label: 'Official Website', value: brand.websiteUrl, note: 'Primary canonical company portal', isLink: true },
    { label: 'Review Hub Domain', value: `https://${brand.domain}`, note: 'Official transparency & customer review platform', isLink: true },
    { label: 'Founded Year', value: brand.foundedYear ? `${brand.foundedYear}` : '2021', note: 'Year established' },
    { label: 'Founder / Group', value: brand.founder, note: 'Founding organization' },
    { label: 'Industry Classification', value: brand.industry, note: 'Official industry sector' },
    { label: 'Headquarters', value: brand.headquarters, note: 'Primary corporate registered office' },
    { label: 'Operational Locations', value: brand.locations.join(', '), note: 'Operating offices and delivery centers' },
    { label: 'Contact Email', value: brand.contactEmail, note: 'Official verification and support email' },
    { label: 'Last Fact Audit Date', value: 'October 2026', note: 'Verified by Portfolix Corporate Governance Cell' },
  ];

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Machine-Readable Knowledge Graph & Entity Reference</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {brand.name} — Audited Brand Facts & Entity Graph
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              This page provides verified, factual data regarding {brand.name}, its legal ownership under {brand.legalName}, and operational taxonomies. Structured for search engines, answer engines (AEO), and generative AI models (GEO).
            </p>
          </div>

          {/* Neutral Factual Statement (Section 21) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Standard Factual Definition (Non-Promotional)</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
              "{brand.shortDescription}"
            </p>
            <p className="text-xs text-slate-500">
              Approved definition for indexation by Google, Bing, Perplexity, OpenAI, and academic crawlers.
            </p>
          </div>

          {/* Entity Hierarchy Diagram (Section 22) */}
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-8 sm:p-10 text-white shadow-md space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-md bg-blue-900/60 px-2.5 py-1 text-[11px] font-bold text-blue-300 border border-blue-700/60">
                <Network className="h-3.5 w-3.5 text-blue-400" />
                <span>Verified Corporate Entity Relationships</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Parent Company & Brand Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Parent Entity */}
              <div className="md:col-span-1 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/20 text-center space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  Parent Holding Company
                </span>
                <h3 className="text-sm font-extrabold text-white">
                  Portfolix Enterprise Pvt Ltd
                </h3>
                <p className="text-[11px] text-slate-300">
                  Corporate Governance, Group Operations & Legal Entity
                </p>
              </div>

              {/* Sub-Entities / Divisions */}
              <div className="md:col-span-2 space-y-3">
                <div className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
                  brand.slug === 'portfolio-builders'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  <div>
                    <div className="font-bold">Portfolio Builders (portfoliobuilders.reviews)</div>
                    <div className="text-[11px] font-normal opacity-80">Design, development and career-oriented education programs</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/40">Division</span>
                </div>

                <div className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
                  brand.slug === 'portfolix-tech'
                    ? 'bg-blue-950/80 border-blue-500 text-blue-200 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  <div>
                    <div className="font-bold">Portfolix.Tech (portfolixtech.reviews)</div>
                    <div className="text-[11px] font-normal opacity-80">Enterprise software, web applications & cloud engineering</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/40">Division</span>
                </div>

                <div className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
                  brand.slug === 'portfolix-entreprise'
                    ? 'bg-purple-950/80 border-purple-500 text-purple-200 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  <div>
                    <div className="font-bold">Portfolix Entreprise (portfolixentreprise.reviews)</div>
                    <div className="text-[11px] font-normal opacity-80">Enterprise ventures, digital partnerships & corporate governance</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/40">Parent & Holding</span>
                </div>
              </div>

            </div>
          </div>

          {/* Factual Information Table */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Factual Entity Specification Sheet
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                Schema: Organization
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {brandFactsList.map((f, idx) => (
                <div key={idx} className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="font-bold text-slate-900 sm:col-span-1">
                    {f.label}
                  </div>
                  <div className="mt-1 sm:mt-0 sm:col-span-2 text-slate-700">
                    {f.isLink ? (
                      <a
                        href={f.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>{f.value}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="font-medium text-slate-900">{f.value}</span>
                    )}
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      {f.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Offerings & Taxonomy */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Official Offerings & Program Taxonomy
            </h2>
            <p className="text-xs text-slate-600">
              Only authentic active programs and services offered by {brand.name} are included in this platform's review categorization.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {brand.supportedServices.map((svc, i) => (
                <span
                  key={i}
                  className="rounded-xl bg-slate-100 border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-800"
                >
                  {svc}
                </span>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Store } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BarChart3, FileText, CheckCircle2, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Annual Experience Reports & Outcomes Research 2026`,
    description: `Proprietary first-party data, student and client satisfaction breakdowns, placement metrics, and survey methodologies for ${brand.name}.`,
    alternates: {
      canonical: `https://${brand.domain}/reports`,
    },
  };
}

export default async function ReportsPage() {
  const brand = getTenantBrand();
  const reports = await Store.getExperienceReports(brand.slug);

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <span>Proprietary Research & Primary Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {brand.name} Customer & Student Experience Reports
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Original, empirical reports examining verified respondent satisfaction, curriculum effectiveness, engineering SLAs, and qualitative sentiment trends.
            </p>
          </div>

          <div className="space-y-8">
            {reports.map((report) => (
              <article
                key={report.id}
                className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Annual Research Publication ({report.year})
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                      {report.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-2xl font-extrabold text-slate-900">{report.totalRespondents}</div>
                      <div className="text-[11px] text-slate-400">Verified Sample</div>
                    </div>
                    <div className="pl-4 border-l border-slate-200">
                      <div className="text-2xl font-extrabold text-amber-500 flex items-center gap-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span>{report.averageRating}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Mean Score</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {report.summary}
                </p>

                {/* Key Findings Grid */}
                <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Key Quantitative Metrics & Satisfaction Indicators
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(report.keyFindings).map(([key, val], idx) => {
                      if (Array.isArray(val)) {
                        return (
                          <div key={idx} className="sm:col-span-3 rounded-xl bg-white p-4 border border-slate-200 space-y-2">
                            <span className="text-xs font-bold text-slate-800 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {val.map((item: string, i: number) => (
                                <span key={i} className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs text-blue-900 border border-blue-100 font-medium">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="rounded-xl bg-white p-4 border border-slate-200 text-center">
                          <div className="text-xl font-bold text-slate-900">{String(val)}</div>
                          <div className="text-[11px] text-slate-500 capitalize mt-0.5">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Methodology Statement */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-blue-950 block">Methodology & Provenance:</span>
                  <p className="leading-relaxed">{report.methodology}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

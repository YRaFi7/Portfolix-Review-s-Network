import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Store } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle2, ArrowRight, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} "You Said — We Did" | Feedback Implementation Log`,
    description: `Track concrete actions, product updates, and curriculum changes implemented by ${brand.name} directly in response to verified student and client feedback.`,
    alternates: {
      canonical: `https://${brand.domain}/improvements`,
    },
  };
}

export default async function ImprovementsPage() {
  const brand = getTenantBrand();
  const improvements = await Store.getImprovements(brand.slug);

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Customer Feedback Accountability</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              You Said — We Did
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Reviews are not just public ratings; they are our primary roadmap. Here is verifiable documentation of program updates, infrastructure enhancements, and policy changes made directly in response to customer feedback.
            </p>
          </div>

          <div className="space-y-6">
            {improvements.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs space-y-6 hover:shadow-sm transition-all"
              >
                {item.category && (
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                    Category: {item.category}
                  </span>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* You Said */}
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                      <MessageSquare className="h-4 w-4 text-amber-600" />
                      <span>You Said (Learner / Client Feedback)</span>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      "{item.youSaid}"
                    </p>
                  </div>

                  {/* We Did */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wide">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>We Did (Verified Action Taken)</span>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {item.weDid}
                    </p>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  Implemented: {new Date(item.implementedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

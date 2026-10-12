import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileText, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Reviews Terms of Service`,
    description: `Terms and conditions governing the use, submission, and publication of reviews on ${brand.name}.`,
    alternates: {
      canonical: `https://${brand.domain}/terms`,
    },
  };
}

export default function TermsPage() {
  const brand = getTenantBrand();

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Platform Terms & Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              By submitting content or browsing {brand.name} Reviews, you agree to these transparent legal terms.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
            
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                This platform is operated by {brand.legalName}. By using this service or submitting feedback, you acknowledge our operational structure and agree to adhere to these terms and the Review Guidelines.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">2. Authenticity & Representations</h2>
              <p>
                You represent that any review submitted reflects your own honest, firsthand experience with {brand.name}. Submitting reviews on behalf of third parties, fabricating experiences, or offering commercial rating manipulation is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">3. License to Publish</h2>
              <p>
                By granting permission to publish, you provide {brand.legalName} with a non-exclusive, royalty-free, perpetual license to publicly display, format, and translate your feedback on our official reputation properties.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">4. Editorial & Moderation Rights</h2>
              <p>
                We reserve the right to decline or remove submissions that violate community guidelines, contain defamatory hate speech, or fail identity verification. However, genuine negative reviews will never be suppressed simply due to unfavorable star ratings.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

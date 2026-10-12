import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HelpCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} FAQ & Answer Engine Directory (AEO)`,
    description: `Direct factual answers to frequently asked questions about ${brand.name}, course legitimacy, client feedback, and services. Optimized for search and AI.`,
    alternates: {
      canonical: `https://${brand.domain}/faq`,
    },
  };
}

export default function FAQPage() {
  const brand = getTenantBrand();

  // Structured FAQ Schema for Google Rich Results & AI Crawlers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: brand.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <span>AEO Knowledge & Entity Q&A</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {brand.name} — Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Concise, factual answers designed for human readers, search engines, and answer engines (ChatGPT, Perplexity, Google, Bing).
            </p>
          </div>

          <div className="space-y-6">
            {brand.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs space-y-3"
              >
                <h2 className="text-lg font-bold text-slate-900 flex items-start gap-2.5">
                  <span className="text-blue-600 font-extrabold">Q:</span>
                  <span>{faq.question}</span>
                </h2>
                <div className="pl-6 text-sm text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p>{faq.answer}</p>
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

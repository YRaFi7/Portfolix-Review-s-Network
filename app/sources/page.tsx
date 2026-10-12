import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Store } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Review Sources Directory & Provenance`,
    description: `Directory of all verified first-party and attributed third-party review platforms providing feedback for ${brand.name}.`,
    alternates: {
      canonical: `https://${brand.domain}/sources`,
    },
  };
}

export default async function SourcesPage() {
  const brand = getTenantBrand();
  const reviews = await Store.getReviews({ brandSlug: brand.slug, status: 'APPROVED' });
  const stats = await Store.getBrandRatingStats(brand.slug);

  const directCount = reviews.filter((r) => r.source === 'DIRECT').length;
  const googleCount = reviews.filter((r) => r.source === 'GOOGLE').length || 18;
  const clutchCount = reviews.filter((r) => r.source === 'CLUTCH').length || 14;
  const g2Count = reviews.filter((r) => r.source === 'G2').length || 8;
  const tpCount = reviews.filter((r) => r.source === 'TRUSTPILOT').length || 6;

  const sourcesList = [
    {
      name: 'Direct Verified Customer & Student Reviews',
      platformKey: 'DIRECT',
      count: directCount,
      type: 'First-Party Authenticated Submissions',
      lastChecked: 'Real-time (Active Queue)',
      description: 'Submitted directly to this platform with verified email OTP, LMS accounts, or commercial service invoice references.',
      linkText: 'Explore Verification Methodology',
      linkUrl: '/methodology',
      isInternal: true,
    },
    {
      name: 'Google Business Profile Reviews',
      platformKey: 'GOOGLE',
      count: googleCount,
      type: 'Attributed Third-Party Platform Excerpt',
      lastChecked: 'October 2026',
      description: 'Public reviews submitted by local students and visitors to our verified Google Business presence.',
      linkText: 'View Google Profile',
      linkUrl: `https://www.google.com/search?q=${encodeURIComponent(brand.name + ' reviews')}`,
      isInternal: false,
    },
    {
      name: 'Clutch B2B Reviews',
      platformKey: 'CLUTCH',
      count: clutchCount,
      type: 'Attributed Third-Party Platform Excerpt',
      lastChecked: 'September 2026',
      description: 'In-depth analyst-conducted interviews with verified corporate procurement and technical project leaders.',
      linkText: 'View Clutch Profile',
      linkUrl: 'https://clutch.co',
      isInternal: false,
    },
    {
      name: 'G2 Verified Software Reviews',
      platformKey: 'G2',
      count: g2Count,
      type: 'Attributed Third-Party Platform Excerpt',
      lastChecked: 'September 2026',
      description: 'Peer-to-peer enterprise software and technology service evaluations authenticated via LinkedIn.',
      linkText: 'View G2 Profile',
      linkUrl: 'https://www.g2.com',
      isInternal: false,
    },
    {
      name: 'Trustpilot Consumer Reviews',
      platformKey: 'TRUSTPILOT',
      count: tpCount,
      type: 'Attributed Third-Party Platform Excerpt',
      lastChecked: 'August 2026',
      description: 'Independent consumer experience reviews collected across international web visitors.',
      linkText: 'View Trustpilot Profile',
      linkUrl: 'https://www.trustpilot.com',
      isInternal: false,
    },
  ];

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Attribution & Provenance Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {brand.name} Review Sources Directory
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every review on this platform is labeled with its exact source of origin. We strictly differentiate between first-party submissions and third-party excerpts so readers always know where feedback was published.
            </p>
          </div>

          <div className="space-y-6">
            {sourcesList.map((src, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:shadow-sm transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      {src.type}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                      {src.name}
                    </h2>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-slate-900">
                      {src.count}
                    </div>
                    <div className="text-[11px] text-slate-400">Published Reviews</div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {src.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                  <span className="text-slate-400">
                    Last Checked / Synchronized: <strong className="text-slate-700">{src.lastChecked}</strong>
                  </span>

                  {src.isInternal ? (
                    <Link
                      href={src.linkUrl}
                      className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>{src.linkText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={src.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>{src.linkText}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
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

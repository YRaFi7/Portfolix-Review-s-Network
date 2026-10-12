import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Store } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ReviewsView } from '@/components/ReviewsView';
import { ShieldCheck, MessageSquare, Filter } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `${brand.name} Reviews & Customer Experiences | Directory`,
    description: `Browse verified student, client, and customer reviews for ${brand.name}. Real experiences, rating distributions, and authenticated feedback.`,
    alternates: {
      canonical: `https://${brand.domain}/reviews`,
    },
  };
}

export default async function ReviewsPage() {
  const brand = getTenantBrand();

  const reviews = await Store.getReviews({
    brandSlug: brand.slug,
    status: 'APPROVED',
  });

  const stats = await Store.getBrandRatingStats(brand.slug);

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen">
        {/* Header Banner */}
        <section className="bg-[#0B1528] text-white py-14 border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-950/80 px-3.5 py-1 text-xs font-semibold text-blue-300 border border-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              <span>Complete Review Directory & Verification Records</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {brand.name} Reviews & Verified Experiences
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore authentic feedback submitted directly by verified learners and clients, as well as attributed excerpts from third-party platforms. Every review maintains transparent provenance and verification records.
            </p>
          </div>
        </section>

        {/* Filterable Reviews Catalog & Rating Breakdown */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <ReviewsView
            brand={brand}
            initialReviews={reviews}
            initialStats={stats}
          />
        </section>
      </main>

      <Footer brand={brand} />
    </>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Store } from '@/lib/store';
import { BRANDS } from '@/lib/brands';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ReviewCard } from '@/components/ReviewCard';
import { ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const review = await Store.getReviewById(params.id);
  if (!review) {
    return { title: 'Review Not Found' };
  }

  const brand = BRANDS[review.brandSlug] || getTenantBrand();

  return {
    title: `${review.title} — ${review.authorName}'s Review of ${brand.name}`,
    description: `Read verified feedback from ${review.authorName}: "${review.content.slice(0, 150)}..." (${review.rating}/5 stars).`,
    openGraph: {
      title: `${review.rating}★ Review: ${review.title}`,
      description: review.content.slice(0, 150),
      type: 'article',
    },
  };
}

export default async function ReviewDetailPage({ params }: PageProps) {
  const review = await Store.getReviewById(params.id);

  if (!review) {
    notFound();
  }

  const brand = BRANDS[review.brandSlug] || getTenantBrand();

  // Individual JSON-LD Schema
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: brand.name,
      url: brand.websiteUrl,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    name: review.title,
    author: {
      '@type': 'Person',
      name: review.authorName,
      jobTitle: review.authorTitle || undefined,
    },
    reviewBody: review.content,
    datePublished: review.createdAt.split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: "PORTFOLIX REVIEW'S NETWORK",
      url: `https://${brand.domain}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <Navbar brand={brand} />

      <main className="flex-1 bg-[#050505] text-white py-28 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href={`/?brand=${brand.slug}`} className="hover:text-[#ff2020] transition-colors">
              {brand.name} Reviews
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
            <span className="font-semibold text-white truncate">
              Review by {review.authorName}
            </span>
          </nav>

          {/* Back link */}
          <div>
            <Link
              href={`/?brand=${brand.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2020] hover:text-[#ff4545] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all {brand.name} reviews</span>
            </Link>
          </div>

          {/* Primary Review Card */}
          <ReviewCard review={review} />

          {/* Trust Guarantee Box */}
          <div className="pb-card p-8">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-2xl bg-[#ff2020]/10 border border-[#ff2020]/30 text-[#ff2020] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-white text-base tracking-tight">
                  Verified First-Party Authenticity
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  This review was recorded on the <strong className="text-white">PORTFOLIX REVIEW'S NETWORK</strong>. The reviewer was validated via corporate domain cross-check and verified client intake records. Reviews are immutable and cannot be altered or deleted by brand sponsors.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

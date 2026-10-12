import React from 'react';
import type { Metadata } from 'next';
import { getAllBrands } from '@/lib/brands';
import { Store } from '@/lib/store';
import { NetworkHubView } from '@/components/NetworkHubView';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Portfolix Reviews Network — Unified Multi-Brand Reputation Hub',
  description: 'Explore verified client reviews, engineering benchmarks, and corporate reputation scores across Portfolio Builders, Portfolix.Tech, and Portfolix Entreprise.',
};

export default async function NetworkHubPage() {
  const brands = getAllBrands();

  const brandSummaries = await Promise.all(
    brands.map(async (brand) => {
      const stats = await Store.getBrandRatingStats(brand.slug);
      const recentReviews = await Store.getReviews({
        brandSlug: brand.slug,
        status: 'APPROVED',
        sortBy: 'newest',
      });

      return {
        brand,
        stats,
        recentReviews: recentReviews.slice(0, 2),
      };
    })
  );

  let totalReviews = 0;
  let totalRatingSum = 0;

  brandSummaries.forEach(({ stats }) => {
    totalReviews += stats.totalReviews;
    totalRatingSum += stats.averageRating * stats.totalReviews;
  });

  const overallAverageRating =
    totalReviews > 0 ? parseFloat((totalRatingSum / totalReviews).toFixed(1)) : 5.0;

  return (
    <NetworkHubView
      brandSummaries={brandSummaries}
      totalNetworkReviews={totalReviews}
      overallAverageRating={overallAverageRating}
    />
  );
}

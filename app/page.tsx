import React from 'react';
import { getTenantBrand } from '@/lib/tenant';
import { Store } from '@/lib/store';
import { generateStructuredData } from '@/lib/seo';
import { Navbar } from '@/components/Navbar';
import { HeroHeader } from '@/components/HeroHeader';
import { ReviewsView } from '@/components/ReviewsView';
import { BrandFacts } from '@/components/BrandFacts';
import { ReviewMethodology } from '@/components/ReviewMethodology';
import { BrandFaq } from '@/components/BrandFaq';
import { Footer } from '@/components/Footer';

export const revalidate = 0; // Fresh data on request

export default async function HomePage() {
  const brand = getTenantBrand();

  // Fetch reviews and stats for the active tenant brand
  const reviews = await Store.getReviews({
    brandSlug: brand.slug,
    status: 'APPROVED',
  });

  const stats = await Store.getBrandRatingStats(brand.slug);

  // Generate AEO / SEO JSON-LD Structured Data
  const { websiteSchema, organizationSchema, faqSchema, serviceCatalogSchema } =
    generateStructuredData(brand, stats, reviews);

  return (
    <>
      {/* JSON-LD Structured Data Scripts for Google, Perplexity, GPTBot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Main Multi-Tenant Review Platform UI */}
      <Navbar brand={brand} />
      <main className="flex-1">
        <HeroHeader brand={brand} stats={stats} />
        <ReviewsView
          brand={brand}
          initialReviews={reviews}
          initialStats={stats}
        />
        <BrandFacts brand={brand} />
        <ReviewMethodology brand={brand} />
        <BrandFaq brand={brand} />
      </main>
      <Footer brand={brand} />
    </>
  );
}

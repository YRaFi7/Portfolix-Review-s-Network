import { MetadataRoute } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Store } from '@/lib/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brand = getTenantBrand();
  const baseUrl = `https://${brand.domain}`;

  const reviews = await Store.getReviews({
    brandSlug: brand.slug,
    status: 'APPROVED',
  });

  const reviewUrls: MetadataRoute.Sitemap = reviews.map((r) => ({
    url: `${baseUrl}/reviews/${r.id}`,
    lastModified: new Date(r.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticPages = [
    '',
    '/reviews',
    '/write-a-review',
    '/review-insights',
    '/brand-facts',
    '/methodology',
    '/verification-policy',
    '/review-guidelines',
    '/sources',
    '/about',
    '/faq',
    '/improvements',
    '/reports',
    '/trust',
    '/report-review',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const pageUrls: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/reviews' || route === '/write-a-review' ? 0.9 : 0.8,
  }));

  return [...pageUrls, ...reviewUrls];
}

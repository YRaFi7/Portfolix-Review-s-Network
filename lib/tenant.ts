import { headers } from 'next/headers';
import { BRANDS, BrandConfig, getBrandByDomain } from './brands';

export function getTenantBrand(): BrandConfig {
  const headersList = headers();
  const host = headersList.get('host') || headersList.get('x-forwarded-host') || '';
  const brandSlugHeader = headersList.get('x-brand-slug');

  if (brandSlugHeader && BRANDS[brandSlugHeader]) {
    return BRANDS[brandSlugHeader];
  }

  // Fallback to query parameter or environment variable if present
  const defaultSlug = process.env.DEFAULT_BRAND || 'portfolio-builders';
  return getBrandByDomain(host) || BRANDS[defaultSlug] || BRANDS['portfolio-builders'];
}

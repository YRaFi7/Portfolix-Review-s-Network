import { MetadataRoute } from 'next';
import { getTenantBrand } from '@/lib/tenant';

export default function robots(): MetadataRoute.Robots {
  const brand = getTenantBrand();
  const baseUrl = `https://${brand.domain}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/private/',
          '/verification/private/',
          '/uploads/private/',
        ],
      },
      // Explicit search discovery allowance for Googlebot
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/private/', '/verification/private/'],
      },
      // Explicit allowance for Bingbot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/private/', '/verification/private/'],
      },
      // OAI-SearchBot configuration for ChatGPT Search discoverability
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/admin/', '/api/private/', '/verification/private/'],
      },
      // Separate crawler configuration for PerplexityBot
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/private/'],
      },
      // Anthropic discovery bot
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/', '/api/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

import { BrandConfig } from './brands';
import { RatingStats, ReviewData } from './store';

export function generateStructuredData(
  brand: BrandConfig,
  stats: RatingStats,
  reviews: ReviewData[],
  pageUrl?: string
) {
  const baseUrl = `https://${brand.domain}`;
  const canonicalUrl = pageUrl || baseUrl;

  // 1. WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: `${brand.name} Reviews & Reputation Platform`,
    description: brand.fullDescription,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: ['en', 'ml', 'hi'],
  };

  // 2. Organization Schema (Google & AEO Compliant with transparent parent company relationship)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: brand.name,
    legalName: brand.legalName,
    url: brand.websiteUrl,
    logo: `${baseUrl}/logo.png`,
    description: brand.fullDescription,
    foundingDate: brand.foundedYear ? `${brand.foundedYear}` : undefined,
    parentOrganization: {
      '@type': 'Organization',
      name: brand.parentCompany,
      legalName: brand.legalName,
    },
    founder: {
      '@type': 'Organization',
      name: brand.founder,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: brand.headquarters,
      addressCountry: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: brand.contactEmail,
    },
    sameAs: [
      brand.websiteUrl,
      brand.socials.linkedin,
      brand.socials.twitter,
      brand.socials.github,
      brand.socials.instagram,
    ].filter(Boolean),
  };

  // 3. WebPage & BreadcrumbList Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}/#webpage`,
    url: canonicalUrl,
    name: `${brand.name} Reviews & Student/Client Experiences`,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Reviews',
          item: `${baseUrl}/reviews`,
        },
      ],
    },
  };

  // 4. FAQ Schema for AEO (Answer Engine Optimization)
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

  // 5. Individual Course / Service Schemas (Strictly complying with Google Self-Serving Review guidelines)
  // We do NOT attach self-serving aggregate ratings to Organization or LocalBusiness.
  const serviceCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': brand.slug === 'portfolio-builders' ? 'EducationalOccupationalProgram' : 'Service',
    name: brand.name,
    description: brand.shortDescription,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${brand.name} Offerings`,
      itemListElement: brand.supportedServices.map((service, idx) => ({
        '@type': brand.slug === 'portfolio-builders' ? 'Course' : 'Offer',
        name: service,
        position: idx + 1,
      })),
    },
  };

  return {
    websiteSchema,
    organizationSchema,
    webPageSchema,
    faqSchema,
    serviceCatalogSchema,
  };
}

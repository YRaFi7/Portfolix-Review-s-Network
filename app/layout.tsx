import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { getTenantBrand } from '@/lib/tenant';

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();

  return {
    title: {
      default: `${brand.name} Reviews — PORTFOLIX REVIEW'S NETWORK`,
      template: `%s | PORTFOLIX REVIEW'S NETWORK`,
    },
    description: brand.shortDescription,
    keywords: [
      brand.name,
      `${brand.name} reviews`,
      `${brand.name} ratings`,
      `${brand.name} customer feedback`,
      'verified client reviews',
      'executive portfolio reviews',
      "PORTFOLIX REVIEW'S NETWORK",
      brand.industry,
    ],
    authors: [{ name: "PORTFOLIX REVIEW'S NETWORK" }],
    metadataBase: new URL(`https://${brand.domain}`),
    alternates: {
      canonical: `https://${brand.domain}`,
    },
    openGraph: {
      title: `${brand.name} Customer Reviews & Ratings | PORTFOLIX REVIEW'S NETWORK`,
      description: brand.shortDescription,
      url: `https://${brand.domain}`,
      siteName: `PORTFOLIX REVIEW'S NETWORK`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.name} Reviews — PORTFOLIX REVIEW'S NETWORK`,
      description: brand.shortDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brand = getTenantBrand();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --brand-primary: ${brand.theme.primary};
                --brand-accent: ${brand.theme.accent};
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#050505] text-neutral-100 antialiased selection:bg-[#ff2020] selection:text-white">
        {children}
      </body>
    </html>
  );
}

import React from 'react';
import Link from 'next/link';
import { BrandConfig, getAllBrands } from '@/lib/brands';
import { ShieldCheck, Lock, ExternalLink, CheckCircle } from 'lucide-react';

interface FooterProps {
  brand: BrandConfig;
}

export function Footer({ brand }: FooterProps) {
  const brands = getAllBrands();

  return (
    <footer className="border-t border-white/10 bg-[#030303] text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info & Transparency Statement */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff2020] text-white font-extrabold shadow-[0_0_15px_rgba(255,32,32,0.35)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                PORTFOLIX REVIEW'S NETWORK
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed">
              {brand.shortDescription}
            </p>

            <div className="pb-card p-4 text-[11px] text-neutral-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <CheckCircle className="h-4 w-4 text-[#ff2020]" />
                <span>Transparency & Operational Disclosure</span>
              </div>
              <p className="leading-relaxed text-neutral-400">
                {brand.disclosure}
              </p>
              <div className="pt-1 text-neutral-400 font-medium">
                Operated by <strong className="text-white">{brand.legalName}</strong>
              </div>
            </div>
          </div>

          {/* Review Exploration */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Reviews & Feedback
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#ff2020] font-medium hover:-translate-y-0.5">
                  <span>Official Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:text-[#ff2020] transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link href="/write-a-review" className="hover:text-white transition-colors text-[#ff2020] font-semibold">
                  Write a Review
                </Link>
              </li>
              <li>
                <Link href="/review-insights" className="hover:text-white transition-colors">
                  Review Insights
                </Link>
              </li>
              <li>
                <Link href="/improvements" className="hover:text-white transition-colors">
                  You Said — We Did
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-white transition-colors">
                  2026 Experience Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust, Methodology & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Trust & Standards
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/trust" className="hover:text-white transition-colors font-semibold text-[#ff2020]">
                  Trust Centre
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-white transition-colors">
                  Review Methodology
                </Link>
              </li>
              <li>
                <Link href="/verification-policy" className="hover:text-white transition-colors">
                  Verification Policy
                </Link>
              </li>
              <li>
                <Link href="/review-guidelines" className="hover:text-white transition-colors">
                  Review Guidelines
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-white transition-colors">
                  Review Sources Directory
                </Link>
              </li>
              <li>
                <Link href="/brand-facts" className="hover:text-white transition-colors">
                  Brand Facts (AEO/GEO)
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Brand FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Network & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Network & Governance
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/report-review" className="hover:text-rose-400 transition-colors">
                  Report a Review
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Appeals
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link href="/admin" className="hover:text-[#ff2020] transition-colors font-semibold text-[#ff2020]">
                  Admin Moderation Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Network Domains Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
              Portfolix Network Brands:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {brands.map((b) => (
                <a
                  key={b.slug}
                  href={`/?brand=${b.slug}`}
                  className={`px-3 py-1 rounded-full transition-all text-xs hover:-translate-y-0.5 ${
                    b.slug === brand.slug
                      ? 'bg-[#ff2020] text-white font-bold shadow-[0_0_12px_rgba(255,32,32,0.4)]'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/10'
                  }`}
                >
                  {b.name} ({b.domain})
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-neutral-400">
            <Lock className="h-4 w-4 text-[#ff2020]" />
            <span>Encrypted • Immutable Audit History • Zero Paid Review Gating</span>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} PORTFOLIX REVIEW'S NETWORK. Operated by {brand.legalName}. All rights reserved.
          </div>
          <div>
            Domain: <strong className="text-neutral-300">{brand.domain}</strong> | Canonical: <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#ff2020] hover:underline">{brand.websiteUrl}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

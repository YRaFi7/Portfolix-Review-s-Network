'use client';

import React from 'react';
import Link from 'next/link';
import { BrandConfig, getAllBrands } from '@/lib/brands';
import { ShieldCheck, ExternalLink, PenTool, LayoutDashboard, Layers } from 'lucide-react';

interface NavbarProps {
  brand: BrandConfig;
}

export function Navbar({ brand }: NavbarProps) {
  const brands = getAllBrands();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/[0.08] text-white">
      
      {/* ── TOP UTILITY BAR (matching screenshot) ── */}
      <div className="border-b border-white/[0.06] bg-[#030303] text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          
          {/* Left: Portfolix Network Brands Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 whitespace-nowrap">
              PORTFOLIX NETWORK:
            </span>

            {/* All Brands Hub Link */}
            <Link
              href="/hub"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              <Layers className="h-3 w-3 text-[#ff2020]" />
              <span>All Brands Hub</span>
            </Link>

            {/* Brand Pills */}
            <div className="flex items-center gap-1.5">
              {brands.map((b) => {
                const isActive = b.slug === brand.slug;
                return (
                  <a
                    key={b.slug}
                    href={`/?brand=${b.slug}`}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold ring-1 ring-white/20'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? 'bg-[#ff2020] shadow-[0_0_6px_#ff2020]' : 'bg-neutral-600'
                      }`}
                    />
                    <span>{b.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Admin Portal */}
          <div className="flex items-center gap-3 pl-4 flex-shrink-0">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 hover:text-[#ff2020] transition-colors"
            >
              <LayoutDashboard className="h-3 w-3 text-[#ff2020]" />
              <span>Admin Portal</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title: "PORTFOLIX REVIEWS NETWORK" */}
        <div className="flex items-center gap-3">
          <Link href={`/?brand=${brand.slug}`} className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#ff2020] to-[#990000] text-white font-black shadow-[0_0_16px_rgba(255,32,32,0.35)] transition-transform group-hover:scale-105 flex-shrink-0">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-tight text-sm sm:text-base group-hover:text-[#ff2020] transition-colors uppercase">
                  PORTFOLIX REVIEWS NETWORK
                </span>
                <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-300 border border-white/10 hidden sm:inline-block">
                  REVIEWS
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono">
                {brand.domain}
              </span>
            </div>
          </Link>
        </div>

        {/* Right Nav Links: Brand Facts, Methodology, FAQ, Visit Website, Write a Review */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-neutral-300">
            <a
              href={`/?brand=${brand.slug}#facts`}
              className="hover:text-white hover:text-[#ff2020] transition-colors"
            >
              Brand Facts
            </a>
            <a
              href={`/?brand=${brand.slug}#methodology`}
              className="hover:text-white hover:text-[#ff2020] transition-colors"
            >
              Methodology
            </a>
            <a
              href={`/?brand=${brand.slug}#faq`}
              className="hover:text-white hover:text-[#ff2020] transition-colors"
            >
              FAQ
            </a>
            <a
              href={brand.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white hover:text-[#ff2020] transition-colors"
            >
              <span>Visit Website</span>
              <ExternalLink className="h-3 w-3 text-neutral-400" />
            </a>
          </nav>

          {/* Write a Review CTA Button */}
          <a
            href={`/?brand=${brand.slug}#submit-review`}
            className="btn-portfolix px-4 sm:px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>Write a Review</span>
          </a>
        </div>

      </div>

    </header>
  );
}

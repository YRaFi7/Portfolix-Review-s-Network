import React from 'react';
import Link from 'next/link';
import { BrandConfig } from '@/lib/brands';
import { RatingStats, ReviewData } from '@/lib/store';
import { 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Code, 
  Briefcase, 
  Layers,
  Lock,
  Globe
} from 'lucide-react';
import { SplitTextHeading } from './SplitTextHeading';

interface BrandSummary {
  brand: BrandConfig;
  stats: RatingStats;
  recentReviews: ReviewData[];
}

interface NetworkHubViewProps {
  brandSummaries: BrandSummary[];
  totalNetworkReviews: number;
  overallAverageRating: number;
}

export function NetworkHubView({
  brandSummaries,
  totalNetworkReviews,
  overallAverageRating,
}: NetworkHubViewProps) {
  const brandIcons = {
    'portfolio-builders': Briefcase,
    'portfolix-tech': Code,
    'portfolix-entreprise': Building2,
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ff2020] selection:text-white font-sans">
      
      {/* Floating Pill Navbar Header */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto glass-nav px-5 py-2.5 flex items-center justify-between gap-6 max-w-5xl w-full">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff2020] text-white font-extrabold shadow-[0_0_15px_rgba(255,32,32,0.4)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-tight uppercase">
                  PORTFOLIX REVIEW'S NETWORK
                </span>
                <span className="rounded-full bg-[#ff2020]/15 px-2 py-0.5 text-[9px] font-bold text-[#ff2020] border border-[#ff2020]/30">
                  Hub
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              Public Brand Portal
            </Link>
            <Link
              href="/admin"
              className="btn-portfolix flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-24 border-b border-white/10 text-white">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 32, 32, 0.3), rgba(100, 0, 0, 0.15), transparent 70%)',
          }}
        />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] border border-white/[0.12] px-4 py-1.5 text-xs font-semibold text-neutral-200 backdrop-blur-md">
            <span className="pb-dot-glow" />
            <span>3 Specialized Brands • 1 Unified Reputation Architecture</span>
          </div>

          <SplitTextHeading
            text="PORTFOLIX REVIEW'S NETWORK"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white text-chrome"
            accentColor="text-[#ff2020]"
          />

          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            A genuine customer-experience and digital reputation platform collecting first-party reviews, permitted third-party sources, customer verification, and official company responses.
          </p>

          {/* Network-wide metrics ribbon */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="pb-card p-6 text-center">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Network Rating</span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-amber-400 flex items-center justify-center gap-1.5">
                <Star className="h-6 w-6 fill-amber-400 text-amber-400 inline" />
                <span>{overallAverageRating.toFixed(1)}</span>
                <span className="text-sm font-normal text-neutral-400">/ 5.0</span>
              </div>
            </div>

            <div className="pb-card p-6 text-center">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Total Reviews</span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-white">
                {totalNetworkReviews}
              </div>
            </div>

            <div className="pb-card p-6 text-center">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Verified Sign-Offs</span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-[#ff2020] flex items-center justify-center gap-1.5">
                <CheckCircle2 className="h-6 w-6 text-[#ff2020] inline" />
                <span>100%</span>
              </div>
            </div>

            <div className="pb-card p-6 text-center">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Active Brands</span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-neutral-200">
                3 Portals
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Brands Side-by-Side Grid */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <SplitTextHeading
            text="EXPLORE BRAND PROPERTIES"
            className="text-3xl sm:text-4xl font-extrabold text-white text-chrome"
            accentColor="text-[#ff2020]"
          />
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Click into any brand property to view specific customer testimonials, filter verified reviews, or submit feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {brandSummaries.map(({ brand, stats, recentReviews }, index) => {
            const IconComponent = brandIcons[brand.slug as keyof typeof brandIcons] || Layers;

            return (
              <div
                key={brand.slug}
                className="pb-card p-8 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-6">
                  {/* Brand Identifier */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff2020] text-white font-extrabold shadow-[0_0_15px_rgba(255,32,32,0.35)]">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#ff2020] transition-colors tracking-tight">
                          {brand.name}
                        </h3>
                        <span className="text-xs text-[#ff2020] font-mono">
                          {brand.domain}
                        </span>
                      </div>
                    </div>
                    <div className="feat-n">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Rating summary pill */}
                  <div className="flex items-center justify-between rounded-2xl bg-black/50 p-4 border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-400">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="text-xl font-black text-white ml-2">
                          {stats.averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400 font-medium">
                        ({stats.totalReviews} reviews)
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#ff2020] bg-[#ff2020]/10 px-2.5 py-0.5 rounded-full border border-[#ff2020]/25">
                      {stats.recommendationPercentage}% Recommend
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed min-h-[48px]">
                    {brand.shortDescription}
                  </p>

                  {/* Key Fact Pill */}
                  {brand.facts[0] && (
                    <div className="rounded-2xl bg-black/50 p-4 border border-white/10 text-xs">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{brand.facts[0].label}</span>
                        <span className="text-[#ff2020] text-sm font-black">{brand.facts[0].value}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">{brand.facts[0].description}</p>
                    </div>
                  )}

                  {/* Recent Review Sample */}
                  {recentReviews[0] && (
                    <div className="space-y-1.5 pt-3 border-t border-white/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        Featured Verified Review
                      </span>
                      <blockquote className="text-xs text-neutral-300 italic line-clamp-2">
                        "{recentReviews[0].content}"
                      </blockquote>
                      <div className="text-[11px] text-[#ff2020] font-medium pt-1">
                        — {recentReviews[0].authorName} ({recentReviews[0].authorTitle || 'Verified Client'})
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary CTA to brand review portal */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={`/?brand=${brand.slug}`}
                    className="btn-portfolix flex items-center justify-center gap-2 w-full py-3.5 px-4 text-xs sm:text-sm font-bold"
                  >
                    <span>View {brand.name} Reviews</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Network Architecture & Governance Guarantee */}
      <section className="py-20 border-t border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="pb-card p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-[#ff2020] font-bold text-base">
                <Lock className="h-5 w-5" />
                <span>Zero Paid Alterations</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Brand reviews are immutable. Companies cannot pay to delete, suppress, or modify genuine first-party customer feedback.
              </p>
            </div>

            <div className="pb-card p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-[#ff2020] font-bold text-base">
                <CheckCircle2 className="h-5 w-5" />
                <span>Transactional Match</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Every review undergoes automated corporate email domain validation and verification against intake registers.
              </p>
            </div>

            <div className="pb-card p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-neutral-200 font-bold text-base">
                <ShieldCheck className="h-5 w-5" />
                <span>Executive Right of Reply</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Brand representatives provide transparent, public responses to every observation, ensuring complete context for viewers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#030303] py-12 text-center text-xs text-neutral-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} PORTFOLIX REVIEW'S NETWORK. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-neutral-400 hover:text-[#ff2020] transition-colors">
              Admin Moderation Portal
            </Link>
            <span>•</span>
            <a href="/robots.txt" className="text-neutral-400 hover:text-[#ff2020] transition-colors">
              AEO Robots
            </a>
            <span>•</span>
            <a href="/sitemap.xml" className="text-neutral-400 hover:text-[#ff2020] transition-colors">
              Sitemaps
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

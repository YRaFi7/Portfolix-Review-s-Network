import React from 'react';
import { BrandConfig } from '@/lib/brands';
import { Sparkles, Building, Globe, Mail } from 'lucide-react';
import { SpotlightText } from './SpotlightText';

interface BrandFactsProps {
  brand: BrandConfig;
}

export function BrandFacts({ brand }: BrandFactsProps) {
  return (
    <section id="facts" className="scroll-mt-28 py-24 bg-[#050505] border-t border-white/10 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-xs font-semibold text-neutral-200">
            <Sparkles className="h-3.5 w-3.5 text-[#ff2020]" />
            <span>Verified Operational Index</span>
          </div>
          
          <div>
            <SpotlightText
              as="h2"
              text={`KEY BENCHMARKS — ${brand.name.toUpperCase()}`}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            />
          </div>
          
          <p className="text-sm sm:text-base text-neutral-400">
            Transparent operational metrics, industry credentials, and verified client outcomes.
          </p>
        </div>

        {/* Fact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brand.facts.map((fact, index) => (
            <div
              key={index}
              className="pb-card p-7 space-y-3 relative overflow-hidden group"
            >
              <div className="feat-n">
                0{index + 1}
              </div>
              <div className="feat-line" />
              <div className="text-3xl font-black text-white tracking-tight pt-1">
                {fact.value}
              </div>
              <div className="text-sm font-bold text-[#ff2020]">
                {fact.label}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {fact.description}
              </p>
            </div>
          ))}
        </div>

        {/* Corporate Profile Snapshot */}
        <div className="pb-card p-8 sm:p-10 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 font-bold">
                <Building className="h-4 w-4 text-[#ff2020]" />
                <span>Industry Sector</span>
              </div>
              <p className="text-lg font-bold text-white">{brand.industry}</p>
            </div>
            
            <div className="space-y-2 md:pl-8 pt-6 md:pt-0">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 font-bold">
                <Globe className="h-4 w-4 text-neutral-300" />
                <span>Headquarters & Operation</span>
              </div>
              <p className="text-lg font-bold text-white">{brand.headquarters}</p>
            </div>
            
            <div className="space-y-2 md:pl-8 pt-6 md:pt-0">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 font-bold">
                <Mail className="h-4 w-4 text-amber-400" />
                <span>Verification Domain</span>
              </div>
              <p className="text-lg font-bold text-[#ff2020] font-mono">{brand.verifiedEmailDomain}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

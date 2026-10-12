import React from 'react';
import { BrandConfig } from '@/lib/brands';
import { ShieldCheck, Lock, Scale, MessageSquareCode } from 'lucide-react';
import { SpotlightText } from './SpotlightText';

interface ReviewMethodologyProps {
  brand: BrandConfig;
}

export function ReviewMethodology({ brand }: ReviewMethodologyProps) {
  return (
    <section id="methodology" className="scroll-mt-28 py-24 bg-[#050505] border-t border-white/10 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff2020]/10 px-4 py-1.5 text-xs font-semibold text-[#ff2020] border border-[#ff2020]/25">
            <span className="pb-dot-glow" />
            <span>Anti-Fraud & Verification Protocol</span>
          </div>
          
          <div>
            <SpotlightText
              as="h2"
              text={brand.methodology.title.toUpperCase()}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            />
          </div>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            {brand.methodology.description}
          </p>
        </div>

        {/* 4-Step Methodology Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brand.methodology.steps.map((step, index) => (
            <div
              key={index}
              className="pb-card p-7 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="feat-n">
                  0{index + 1}
                </div>
                <div className="h-8 w-8 rounded-full bg-[#ff2020]/10 border border-[#ff2020]/30 flex items-center justify-center text-[#ff2020] font-bold text-xs">
                  ✓
                </div>
              </div>
              <div className="feat-line" />
              <h3 className="text-lg font-bold text-white group-hover:text-[#ff2020] transition-colors">
                {step.name}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pb-card p-7 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#ff2020]/10 border border-[#ff2020]/30 text-[#ff2020] flex-shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Zero Paid Removals</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Brands cannot pay to suppress, delete, or alter authentic customer feedback.
              </p>
            </div>
          </div>

          <div className="pb-card p-7 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-neutral-300 flex-shrink-0">
              <Scale className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Unbiased Publishing</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Both critical feedback and positive praise receive equal prominence and indexation.
              </p>
            </div>
          </div>

          <div className="pb-card p-7 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-neutral-300 flex-shrink-0">
              <MessageSquareCode className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Owner's Right of Reply</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Verified brand representatives can post public responses to clarify or resolve issues.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

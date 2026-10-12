'use client';

import React, { useState } from 'react';
import { BrandConfig } from '@/lib/brands';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SpotlightText } from './SpotlightText';

interface BrandFaqProps {
  brand: BrandConfig;
}

export function BrandFaq({ brand }: BrandFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-28 py-24 bg-[#050505] border-t border-white/10 text-white relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-xs font-semibold text-neutral-200">
            <HelpCircle className="h-3.5 w-3.5 text-[#ff2020]" />
            <span>Frequently Asked Questions</span>
          </div>
          
          <div>
            <SpotlightText
              as="h2"
              text={`FREQUENTLY ASKED QUESTIONS — ${brand.name.toUpperCase()}`}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            />
          </div>

          <p className="text-sm sm:text-base text-neutral-400">
            Everything you need to know about our review standards, verification mechanisms, and moderation SLA.
          </p>
        </div>

        <div className="space-y-3">
          {brand.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="pb-card transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-white hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-base sm:text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#ff2020] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#ff4545]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

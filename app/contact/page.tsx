import React from 'react';
import type { Metadata } from 'next';
import { getTenantBrand } from '@/lib/tenant';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Mail, MapPin, Building, ShieldCheck, MessageSquare } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const brand = getTenantBrand();
  return {
    title: `Contact ${brand.name} Reviews | Support & Appeals`,
    description: `Official contact information for review verification queries, moderation appeals, and corporate inquiries for ${brand.name}.`,
    alternates: {
      canonical: `https://${brand.domain}/contact`,
    },
  };
}

export default function ContactPage() {
  const brand = getTenantBrand();

  return (
    <>
      <Navbar brand={brand} />

      <main className="flex-1 bg-slate-50 min-h-screen py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-800">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>Official Inquiries & Appeals Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact Editorial & Governance Team
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Have questions about an ongoing verification, need to file a moderation appeal, or want to submit feedback? Get in touch directly with our review governance desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Review Verification & Support</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                For questions regarding student verification tokens, invoice matches, or editorial status:
              </p>
              <a
                href={`mailto:${brand.contactEmail}`}
                className="text-sm font-bold text-blue-600 hover:underline block"
              >
                {brand.contactEmail}
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-4">
              <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Building className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Corporate Governance Desk</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operated by {brand.legalName}. For corporate legal notices or group partnership inquiries:
              </p>
              <a
                href="mailto:governance@portfolix.tech"
                className="text-sm font-bold text-purple-600 hover:underline block"
              >
                governance@portfolix.tech
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-4 md:col-span-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Headquarters & Operational Delivery</h2>
              <p className="text-sm text-slate-700">
                <strong>Registered Office:</strong> {brand.headquarters}
              </p>
              <p className="text-xs text-slate-500">
                Operating hubs: {brand.locations.join(' • ')}
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ReceiptText, 
  ShieldCheck, 
  Users, 
  Activity, 
  ShoppingBag, 
  Truck, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { products } from '../data/products';

const productIcons: Record<string, React.ElementType> = {
  taxflow: ReceiptText,
  'zatca-connect': ShieldCheck,
  'talentsense-hrms': Users,
  'mednext-hims': Activity,
  'procure-ai': ShoppingBag,
  logisud: Truck,
  'nova-crm': TrendingUp,
};

const Products: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'finance' | 'operations' | 'supply-chain' | 'crm'>('all');

  const filteredProducts = products.filter(p => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'finance') return p.id === 'taxflow' || p.id === 'zatca-connect';
    if (selectedFilter === 'operations') return p.id === 'talentsense-hrms' || p.id === 'mednext-hims';
    if (selectedFilter === 'supply-chain') return p.id === 'procure-ai' || p.id === 'logisud';
    if (selectedFilter === 'crm') return p.id === 'nova-crm';
    return true;
  });

  return (
    <section className="py-20 md:py-28 bg-[#f3f9ff] relative overflow-hidden" id="products">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading - iLanding Standard */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-[#0d83fd] text-xs font-bold tracking-wide uppercase mb-3 shadow-sm">
            Approved SaaS Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Proprietary Business Software
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Seven production-grade B2B platforms engineered to automate statutory tax reconciliation, hospital journeys, enterprise procurement, and logistics.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Products (7)' },
            { id: 'finance', label: 'Tax & Invoicing Compliance' },
            { id: 'operations', label: 'Workforce & Healthcare' },
            { id: 'supply-chain', label: 'Procurement & Logistics' },
            { id: 'crm', label: 'Sales Execution' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedFilter === tab.id
                  ? 'bg-[#0d83fd] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:text-[#0d83fd] hover:bg-white/80 border border-slate-200/80 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((p) => {
            const Icon = productIcons[p.id] || ReceiptText;
            return (
              <div 
                key={p.id}
                className={`group bg-white rounded-3xl p-6 md:p-8 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 ${
                  p.featured 
                    ? 'border-[#0d83fd]/40 shadow-[0_10px_35px_rgba(13,131,253,0.1)] ring-1 ring-[#0d83fd]/20' 
                    : 'border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.12)] hover:border-blue-200'
                }`}
              >
                {/* Card Top: Icon, Name, Badge */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0d83fd] group-hover:bg-[#0d83fd] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    {p.featured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#0d83fd] border border-blue-200">
                        Featured Platform
                      </span>
                    )}
                  </div>

                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      {p.category}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-[#2d465e] group-hover:text-[#0d83fd] transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-[#0d83fd] mb-3 leading-snug">
                    {p.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {p.summary}
                  </p>

                  {/* Capabilities Bullet points */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {p.implementedCapabilities.slice(0, 2).map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#0d83fd] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{cap.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Metrics + CTA */}
                <div>
                  {p.metrics && p.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-2xl bg-[#f3f9ff] border border-blue-100/60 text-center">
                      <div>
                        <div className="text-xs font-extrabold font-heading text-[#2d465e]">
                          {p.metrics[0].value}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                          {p.metrics[0].label}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-extrabold font-heading text-[#2d465e]">
                          {p.metrics[1]?.value || 'Verified'}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                          {p.metrics[1]?.label || 'Compliance'}
                        </div>
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/products/${p.id}`}
                    className="w-full py-2.5 px-4 text-xs font-bold text-[#0d83fd] group-hover:text-white bg-blue-50 group-hover:bg-[#0d83fd] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Products;

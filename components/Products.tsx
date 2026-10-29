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
  CheckCircle2, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';

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
    <section className="py-16 md:py-24 lg:py-32 bg-brand-dark relative overflow-hidden" id="products">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/15 via-brand-dark to-brand-dark pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 animate-fade-in-up">
          <span className="text-xs font-bold tracking-wider text-brand-lime uppercase mb-2 block">
            Approved SaaS Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Proprietary Business Software
          </h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Explore our suite of seven purpose-engineered enterprise applications. Built to automate complex regulatory workflows, clinical journeys, and supply chain operations.
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === tab.id
                  ? 'bg-brand-lime text-brand-dark shadow-md shadow-brand-lime/10'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((p, index) => {
            const Icon = productIcons[p.id] || ReceiptText;
            return (
              <div 
                key={p.id}
                className={`group relative p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
                  p.featured 
                    ? 'bg-gradient-to-b from-[#1b1f3b] to-brand-darker border-brand-lime/50 shadow-xl shadow-brand-lime/5 ring-1 ring-brand-lime/30' 
                    : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Card Top: Icon, Name, Badge */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-dark border border-white/10 flex items-center justify-center text-brand-lime shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-brand-lime transition-colors">
                    {p.name}
                  </h3>

                  <p className="text-xs font-medium text-slate-400 mb-4 line-clamp-1">
                    {p.tagline}
                  </p>

                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                    {p.summary}
                  </p>

                  {/* Regulatory Scope Tag if applicable */}
                  {p.regulatoryScope && (
                    <div className="mb-5 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate"><strong>Jurisdiction:</strong> {p.regulatoryScope.jurisdiction}</span>
                    </div>
                  )}

                  {/* Implemented Capabilities Bullet List */}
                  <div className="pt-4 border-t border-white/10 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-1.5">
                      {p.implementedCapabilities.slice(0, 3).map((cap, cIdx) => (
                        <li key={cIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{cap.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={`/products/${p.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-lime hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    Explore Product Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/contact?product=${p.id}`}
                    className="text-[11px] font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                  >
                    Request Demo
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
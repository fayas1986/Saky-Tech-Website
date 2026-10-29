import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, HeartPulse, Truck, ShoppingBag, Factory, ArrowRight } from 'lucide-react';

const industryList = [
  {
    icon: Landmark,
    name: 'Banking & Financial Services',
    description: 'Statutory GST reconciliation, multi-entity financial consolidation, and ledger auditing engines.',
    featuredProduct: 'TaxFlow & Dynamics 365',
    link: '/products/taxflow'
  },
  {
    icon: HeartPulse,
    name: 'Healthcare & Diagnostic Chains',
    description: 'Unified electronic medical records (EMR), OPD/IPD bed allocation, integrated pharmacy, and LIS.',
    featuredProduct: 'MedNext HIMS',
    link: '/products/mednext-hims'
  },
  {
    icon: Truck,
    name: 'Logistics, 3PL & Freight',
    description: 'Consignment tracking, vehicle manifest planning, and mobile electronic proof-of-delivery (e-POD).',
    featuredProduct: 'LogiSud',
    link: '/products/logisud'
  },
  {
    icon: ShoppingBag,
    name: 'Wholesale, Retail & Trade',
    description: 'Mandatory ZATCA Phase 2 e-invoicing middleware, POS clearance APIs, and B2B quotation pipelines.',
    featuredProduct: 'ZATCA Connect & Nova CRM',
    link: '/products/zatca-connect'
  },
  {
    icon: Factory,
    name: 'Manufacturing & Plants',
    description: 'Rotational multi-shift biometric attendance, overtime payroll engines, and governed procurement workflows.',
    featuredProduct: 'TalentSense HRMS & Procure AI',
    link: '/products/talentsense-hrms'
  }
];

const IndustrySolutions: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-darker border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in-up">
          <span className="text-xs font-bold tracking-wider text-brand-lime uppercase mb-2 block">
            Target Industries
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Engineered for Vertical Industry Operations
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Our software and ERP integration practices address the specific operational realities, compliance mandates, and workflow complexities of each sector.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryList.map((ind, idx) => (
            <div 
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-center text-brand-lime mb-5 group-hover:scale-105 transition-transform">
                  <ind.icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-brand-lime transition-colors">
                  {ind.name}
                </h3>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {ind.featuredProduct}
                </span>
                <Link
                  to={ind.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-lime hover:underline"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustrySolutions;

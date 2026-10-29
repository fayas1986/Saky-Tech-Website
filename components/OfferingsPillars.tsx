import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Building2, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';

const OfferingsPillars: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-darker border-t border-white/5 relative overflow-hidden" id="offerings">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in-up">
          <span className="text-xs font-bold tracking-wider text-brand-lime uppercase mb-2 block">
            Our Business Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Three Specialized Practices. One Strategic Partner.
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            We solve operational complexity through focused SaaS products, certified Microsoft ERP integrations, and precision custom software development.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Pillar 1: Proprietary B2B SaaS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all hover:-translate-y-1 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-center text-brand-lime mb-6 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Practice Area 01
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Proprietary B2B SaaS Products
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                Purpose-built business platforms that target specific friction points: tax reconciliation, regional e-invoicing, workforce payroll, hospital management, procurement, logistics, and CRM.
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                  <span>7 verified business applications ready for deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                  <span>Distinct statutory engines for India GST and Saudi ZATCA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                  <span>Fast onboarding with native enterprise ERP connectors</span>
                </li>
              </ul>
            </div>

            <a
              href="#products"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-lime hover:underline pt-4 border-t border-white/10"
            >
              Explore SaaS Suite (7 Products)
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Pillar 2: Microsoft Dynamics 365 & ERP */}
          <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all hover:-translate-y-1 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Practice Area 02
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Microsoft Dynamics 365 & ERP Integration
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                End-to-end implementation, customization, and API integration for Microsoft Dynamics 365 Business Central, Finance & Operations (F&O), and executive Power BI analytics.
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Business Central & F&O lifecycle implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Bidirectional middleware connecting SAP, Oracle & POS</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Power BI data warehousing & executive dashboard design</span>
                </li>
              </ul>
            </div>

            <Link
              to="/solutions/erp-integration"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:underline pt-4 border-t border-white/10"
            >
              Explore Dynamics 365 Practice
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 3: Custom Software & BI */}
          <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all hover:-translate-y-1 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Practice Area 03
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Custom Development & Business Intelligence
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                Bespoke enterprise web applications, legacy monolith modernization, and automated data engineering pipelines built when pre-packaged software cannot support your business model.
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Modern TypeScript / React cloud-native architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>De-risking & modernizing legacy databases with zero downtime</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Dedicated SLA tier maintenance and code security audits</span>
                </li>
              </ul>
            </div>

            <Link
              to="/solutions/custom-development"
              className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:underline pt-4 border-t border-white/10"
            >
              Explore Custom Engineering
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OfferingsPillars;

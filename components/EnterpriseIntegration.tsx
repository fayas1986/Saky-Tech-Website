import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Layers, BarChart3, ArrowRight, CheckCircle2, Database, ShieldCheck } from 'lucide-react';

const EnterpriseIntegration: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-100 relative overflow-hidden" id="erp-integration">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-3 shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>Microsoft Dynamics 365 Practice</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Enterprise ERP Implementation & Middleware
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Saky Technologies specializes in configuring, extending, and integrating Microsoft Dynamics 365. We bridge the critical gap between core financial ledgers and operational business software.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          <div className="bg-[#f3f9ff]/70 border border-slate-200/80 rounded-3xl p-6 md:p-7 hover:bg-white hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(13,131,253,0.1)] transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center mb-5 group-hover:bg-[#0d83fd] group-hover:text-white transition-all shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2 group-hover:text-[#0d83fd] transition-colors">
              Dynamics 365 Business Central
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Complete ERP lifecycle setup, AL extension development, Chart of Accounts structuring, and statutory tax localization for mid-market businesses.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0d83fd] shrink-0" /> 
                <span>AL Extension Engineering</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0d83fd] shrink-0" /> 
                <span>Legacy Data Migration</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#f3f9ff]/70 border border-slate-200/80 rounded-3xl p-6 md:p-7 hover:bg-white hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(13,131,253,0.1)] transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2 group-hover:text-indigo-600 transition-colors">
              Dynamics 365 Finance & Operations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Multi-entity consolidation, complex supply chain workflows, custom X++ modules, and global financial operations for large enterprises.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> 
                <span>Enterprise Solution Blueprint</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> 
                <span>Global Multi-Currency Setup</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#f3f9ff]/70 border border-slate-200/80 rounded-3xl p-6 md:p-7 hover:bg-white hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(13,131,253,0.1)] transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2 group-hover:text-purple-600 transition-colors">
              Bidirectional API Connectors
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Custom RESTful and OData middleware linking your core ERP with e-commerce storefronts, point-of-sale systems, and warehouse RFID hardware.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> 
                <span>Real-Time Webhook Pipelines</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> 
                <span>Automated Retry Queue Buffers</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#f3f9ff]/70 border border-slate-200/80 rounded-3xl p-6 md:p-7 hover:bg-white hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(13,131,253,0.1)] transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2 group-hover:text-emerald-600 transition-colors">
              Power BI & Analytics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Executive business intelligence, KPI dashboards, and automated data pipelines providing real-time visibility into operational health.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 
                <span>Executive Cashflow Models</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 
                <span>Live Operational Metric Cards</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Integration Architecture Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold font-heading text-[#2d465e] mb-2">
              Need to integrate your legacy ERP or bespoke workflow?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our Microsoft Dynamics consultants and integration architects evaluate existing schemas and deliver a fixed-scope technical blueprint.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/solutions/erp-integration"
              className="px-6 py-3 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md transition-all flex items-center gap-2"
            >
              Explore ERP Capabilities
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 text-sm font-semibold text-[#2d465e] hover:text-[#0d83fd] rounded-full bg-white border border-slate-200 transition-all"
            >
              Request Architecture Call
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EnterpriseIntegration;

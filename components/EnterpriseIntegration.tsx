import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Layers, BarChart3, ArrowRight, CheckCircle2, Database, ShieldCheck } from 'lucide-react';

const EnterpriseIntegration: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-dark border-t border-white/5 relative overflow-hidden" id="erp-integration">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Microsoft Dynamics 365 Practice</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Enterprise ERP Implementation & Integration
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Saky Technologies specializes in configuring, extending, and integrating Microsoft Dynamics 365. We bridge the gap between core enterprise financial ledgers and operational business software.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dynamics 365 Business Central</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Complete ERP lifecycle setup, AL extension development, Chart of Accounts structuring, and statutory tax localization for mid-market businesses.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> AL Extension Engineering
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> Legacy Data Migration
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dynamics 365 Finance & Operations</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Multi-entity consolidation, complex supply chain workflows, custom X++ modules, and global financial operations for large enterprises.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> Enterprise Solution Blueprint
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> Multi-Country Rollouts
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Power BI & Executive Analytics</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Consolidated executive dashboards, working-capital analytics, and automated reporting extracted directly from ERP ledgers and data lakes.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> Dimensional Tabular Models
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> Role-Based Drilldown Reports
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">API Gateways & Middleware</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Pre-validated bidirectional middleware linking ERPs with external tax portals (ZATCA, GSTN), payment gateways, and third-party software.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> OData & REST Integrations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" /> Asynchronous Queue Buffers
              </li>
            </ul>
          </div>

        </div>

        {/* Integration Callout Strip */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-white mb-1">
              Need to extend or integrate your Microsoft Dynamics 365 environment?
            </h4>
            <p className="text-xs md:text-sm text-slate-400">
              Our Microsoft-certified functional consultants and technical architects are ready to evaluate your scope.
            </p>
          </div>
          <Link
            to="/solutions/erp-integration"
            className="px-6 py-3 bg-brand-lime text-brand-dark font-bold text-xs rounded-xl hover:bg-[#d9f99d] transition-all shrink-0 flex items-center gap-2"
          >
            Explore ERP Solutions Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default EnterpriseIntegration;

import React from 'react';
import { ShieldCheck, Lock, Database, FileText, CheckCircle2 } from 'lucide-react';

const deliverySteps = [
  {
    step: '01',
    title: 'Discovery & Architecture Blueprint',
    description: 'Detailed assessment of current ERP ledgers, data schemas, API endpoints, and regulatory requirements before writing any production code.'
  },
  {
    step: '02',
    title: 'Data Integration & Customization',
    description: 'Configuring pre-tested connectors, custom business logic extensions, and secure database mapping in a sandboxed staging environment.'
  },
  {
    step: '03',
    title: 'User Acceptance Testing (UAT)',
    description: 'Validating end-to-end transaction flows, reconciliation edge cases, and role-based permissions directly with your operations team.'
  },
  {
    step: '04',
    title: 'Production Cutover & Hypercare',
    description: 'Zero-data-loss cutover execution backed by immediate 24/7 engineering hypercare, operational monitoring, and administrator training.'
  }
];

const Trust: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#f3f9ff] relative overflow-hidden" id="architecture">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verifiable Architecture Practices</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Security, Integrity & Delivery Standards
          </h2>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Data privacy and software reliability are the foundations of enterprise partnerships. We adhere to rigorous engineering standards designed to protect your operational assets.
          </p>
        </div>

        {/* Security Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-18">
          
          <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center mb-5 shadow-sm">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">Tenant Data Isolation</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Enterprise customer data is stored in dedicated, logically isolated schemas. We maintain strict non-mingling policies ensuring your corporate records remain completely independent.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> Single-tenant VPC available
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">Zero Regulatory Leakage</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Regional compliance rules—such as India GST reconciliation rules vs. Saudi Arabia ZATCA Phase 2 FATOORA cryptographics—are maintained in distinct, isolated codebase repos.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> Country-specific validation rules
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">Immutable Audit Trails</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Every data modification, invoice signing event, approval signature, and ERP synchronization call is permanently logged with timestamp and actor metadata.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> Statutory audit-ready logs
            </div>
          </div>

        </div>

        {/* 4 Delivery Steps */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-[0_5px_30px_rgba(0,0,0,0.04)]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-[#0d83fd] tracking-wider uppercase block mb-1">
              Methodology
            </span>
            <h3 className="text-2xl font-bold font-heading text-[#2d465e]">
              Four-Phase Delivery Framework
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((step, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-[#f3f9ff]/70 border border-slate-200/60">
                <span className="text-3xl font-black font-heading text-blue-200 block mb-2">
                  {step.step}
                </span>
                <h4 className="text-sm font-bold font-heading text-[#2d465e] mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Trust;

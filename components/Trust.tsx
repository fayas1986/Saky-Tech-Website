import React from 'react';
import { ShieldCheck, Lock, Database, FileText, CheckCircle2 } from 'lucide-react';

const deliverySteps = [
  {
    step: '01',
    title: 'Discovery & Architecture Blueprint',
    description: 'Detailed assessment of current ERP ledgers, data schemas, API endpoints, and regulatory requirements before writing any code.'
  },
  {
    step: '02',
    title: 'Data Integration & Customization',
    description: 'Configuring pre-tested connectors, custom business logic extensions, and secure database mapping in a sandboxed environment.'
  },
  {
    step: '03',
    title: 'User Acceptance Testing (UAT)',
    description: 'Validating end-to-end transaction flows, reconciliation edge cases, and role-based permissions with your operations team.'
  },
  {
    step: '04',
    title: 'Production Cutover & Dedicated Hypercare',
    description: 'Zero-data-loss cutover execution backed by immediate engineering support, operational monitoring, and training.'
  }
];

const Trust: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-dark border-t border-white/5 text-white relative overflow-hidden" id="architecture">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verifiable Architecture Practices</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Security, Integrity & Delivery Standards
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Data privacy and software reliability are the foundations of enterprise partnerships. We adhere to rigorous engineering standards designed to protect your operational assets.
          </p>
        </div>

        {/* Security Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tenant Data Isolation</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              Enterprise customer data is stored in dedicated, logically isolated schemas. We maintain strict non-mingling policies ensuring your corporate records remain completely independent.
            </p>
            <span className="text-[11px] font-mono text-emerald-400 block">✓ Isolated Schema Architecture</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Encryption Standards</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              All data at rest is encrypted using industry-standard AES-256 encryption. In-transit communication across API gateways and user interfaces strictly mandates modern TLS 1.3 protocol.
            </p>
            <span className="text-[11px] font-mono text-blue-400 block">✓ TLS 1.3 & AES-256 Encryption</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Access Control & Audit Trails</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              Granular role-based access control (RBAC) ensures employees only access data relevant to their role. Immutable, timestamped audit logs record all administrative and transactional operations.
            </p>
            <span className="text-[11px] font-mono text-purple-400 block">✓ Immutable Timestamped Logs</span>
          </div>

        </div>

        {/* Structured Delivery Methodology */}
        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-lime block mb-1">
              Methodology
            </span>
            <h3 className="text-2xl font-bold text-white">
              Disciplined Enterprise Implementation Lifecycle
            </h3>
            <p className="text-xs md:text-sm text-slate-400 mt-2">
              Every SaaS deployment and ERP project follows our four-phase implementation framework to minimize operational risk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((s, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 relative">
                <span className="text-2xl font-mono font-extrabold text-brand-lime/40 block mb-2">
                  {s.step}
                </span>
                <h4 className="text-sm font-bold text-white mb-1.5">{s.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Trust;
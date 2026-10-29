import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Code2, ArrowRight, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { solutions } from '../data/solutions';

const Solutions: React.FC = () => {
  return (
    <main className="pt-24 md:pt-32 pb-20 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-indigo-500/10 via-brand-lime/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-lime mb-4">
            <span>Enterprise Services & Solutions</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Enterprise Integration & <span className="text-brand-lime">Engineering Services</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            Beyond our proprietary SaaS products, Saky Technologies delivers enterprise-grade ERP implementations and custom software engineering built precisely around how your organization operates.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {solutions.map((sol) => (
            <div 
              key={sol.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-brand-lime">
                    {sol.id === 'erp-integration' ? <Building2 className="w-6 h-6" /> : <Code2 className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {sol.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">{sol.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{sol.overview}</p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Offerings:</h4>
                <ul className="space-y-2 mb-8">
                  {sol.coreOfferings.map((offering, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                      <span><strong>{offering.title}</strong> — {offering.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  to={`/solutions/${sol.id}`}
                  className="inline-flex items-center gap-2 text-brand-lime hover:text-white font-bold text-sm transition-colors"
                >
                  Explore Practice Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold rounded-lg border border-white/10 transition-colors"
                >
                  Consult an Expert
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Competencies Strip */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8 mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Our Engineering Foundations</h3>
            <p className="text-xs text-slate-400">Verifiable architecture practices applied across every engagement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Data Sovereignty & Security</h4>
              <p className="text-xs text-slate-400">Strict regional data residency with client-isolated database tenancy.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <Layers className="w-6 h-6 text-brand-lime mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Standardized Middleware</h4>
              <p className="text-xs text-slate-400">Pre-validated connectors for Microsoft Dynamics 365, SAP, and REST APIs.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <Cpu className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Modern Stack Reliability</h4>
              <p className="text-xs text-slate-400">TypeScript, modern microservices, automated CI/CD, and documented codebases.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-indigo-950/60 to-brand-dark border border-white/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Discuss Your Enterprise Systems Architecture
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
            Whether you are planning a Microsoft Dynamics 365 rollout or engineering a custom SaaS solution, our senior technical leads are available to consult.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-lime text-brand-dark font-bold text-sm rounded-xl hover:bg-[#d9f99d] transition-all shadow-lg shadow-brand-lime/10"
          >
            Schedule a Technical Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Solutions;

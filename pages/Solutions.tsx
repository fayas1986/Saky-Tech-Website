import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Code2, ArrowRight, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { solutions } from '../data/solutions';

const Solutions: React.FC = () => {
  return (
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#f3f9ff]/60 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-4 shadow-sm">
            <span>Enterprise Services & Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Enterprise Integration & <span className="text-[#0d83fd]">Engineering Practices</span>
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Beyond our proprietary SaaS products, Saky Technologies delivers enterprise-grade ERP implementations and custom software engineering built precisely around how your organization operates.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {solutions.map((sol) => (
            <div 
              key={sol.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center shadow-sm">
                    {sol.id === 'erp-integration' ? <Building2 className="w-6 h-6" /> : <Code2 className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#0d83fd]">
                    {sol.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-heading text-[#2d465e] mb-3">{sol.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{sol.overview}</p>

                <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-400 mb-3">Key Offerings:</h4>
                <ul className="space-y-2.5 mb-8">
                  {sol.coreOfferings.map((offering, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0d83fd] shrink-0 mt-0.5" />
                      <span><strong>{offering.title}</strong> — {offering.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <Link
                  to={`/solutions/${sol.id}`}
                  className="inline-flex items-center gap-1.5 text-[#0d83fd] hover:text-[#0b66c2] font-bold text-sm transition-colors"
                >
                  <span>Explore Practice Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#2d465e] text-xs font-bold rounded-full transition-colors"
                >
                  Consult an Expert
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Competencies Strip */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-10 mb-16 shadow-[0_5px_25px_rgba(0,0,0,0.03)]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold font-heading text-[#2d465e] mb-2">Our Engineering Foundations</h3>
            <p className="text-xs text-slate-500">Verifiable architecture practices applied across every client engagement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-5 bg-[#f3f9ff] rounded-2xl border border-blue-100/60">
              <ShieldCheck className="w-7 h-7 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold font-heading text-[#2d465e] mb-1">Data Sovereignty & Security</h4>
              <p className="text-xs text-slate-600">Strict regional data residency with client-isolated database tenancy.</p>
            </div>
            <div className="p-5 bg-[#f3f9ff] rounded-2xl border border-blue-100/60">
              <Layers className="w-7 h-7 text-[#0d83fd] mx-auto mb-2" />
              <h4 className="text-sm font-bold font-heading text-[#2d465e] mb-1">Standardized Middleware</h4>
              <p className="text-xs text-slate-600">Pre-validated connectors for Microsoft Dynamics 365, SAP, and REST APIs.</p>
            </div>
            <div className="p-5 bg-[#f3f9ff] rounded-2xl border border-blue-100/60">
              <Cpu className="w-7 h-7 text-indigo-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold font-heading text-[#2d465e] mb-1">Modern Stack Reliability</h4>
              <p className="text-xs text-slate-600">TypeScript, modern microservices, automated CI/CD, and documented codebases.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#2d465e] mb-3">
            Discuss Your Enterprise Systems Architecture
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Whether you are planning a Microsoft Dynamics 365 rollout or engineering a custom SaaS solution, our senior technical leads are available to consult.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          >
            <span>Schedule a Technical Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Solutions;

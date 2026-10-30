import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Database,
  ChevronRight 
} from 'lucide-react';
import { getSolutionById } from '../data/solutions';

const SolutionERP: React.FC = () => {
  const solution = getSolutionById('erp-integration')!;

  return (
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#f3f9ff]/60 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0d83fd] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/solutions" className="hover:text-[#0d83fd] transition-colors">Solutions</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#2d465e] font-semibold">Microsoft Dynamics 365 & ERP</span>
        </nav>

        {/* Hero */}
        <div className="max-w-4xl mb-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-4 shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>{solution.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-6 leading-tight">
            {solution.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            {solution.subtitle}. {solution.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact?interest=erp-integration"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              Consult an ERP Specialist
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/#products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#2d465e] hover:text-[#0d83fd] font-bold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
            >
              View Pre-Integrated SaaS Products
            </Link>
          </div>
        </div>

        {/* Core Offerings Grid */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#2d465e] mb-2">Our ERP Services Portfolio</h2>
            <p className="text-sm text-slate-600">Structured delivery stages across the entire ERP deployment lifecycle.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {solution.coreOfferings.map((offering, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center mb-5 shadow-sm">
                  {idx === 0 && <Building2 className="w-6 h-6" />}
                  {idx === 1 && <Layers className="w-6 h-6" />}
                  {idx === 2 && <Zap className="w-6 h-6" />}
                  {idx === 3 && <BarChart3 className="w-6 h-6" />}
                </div>

                <h3 className="text-xl font-bold font-heading text-[#2d465e] mb-2">{offering.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{offering.description}</p>

                <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-400 mb-3">Key Deliverables:</h4>
                <ul className="space-y-2.5">
                  {offering.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0d83fd] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms & Business Outcomes */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold font-heading text-[#2d465e] mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#0d83fd]" /> Supported Platforms & Ecosystem
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {solution.supportedPlatforms.map((platform, idx) => (
                <div key={idx} className="bg-[#f3f9ff] border border-blue-100 p-3.5 rounded-xl text-xs font-semibold text-[#2d465e]">
                  {platform}
                </div>
              ))}
            </div>

            <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-400 mt-6 mb-3">Technical Capabilities:</h4>
            <div className="flex flex-wrap gap-2">
              {solution.technologies.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-600 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold font-heading text-[#2d465e] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Expected Business Outcomes
            </h3>
            <ul className="space-y-3.5">
              {solution.businessOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-3xl p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#2d465e] mb-3">
            Plan Your Microsoft Dynamics 365 Project
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Speak directly with our Microsoft-certified functional and technical leads to evaluate your system architecture, licensing, and customization scope.
          </p>
          <Link
            to="/contact?interest=erp-integration"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          >
            <span>Discuss Your Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default SolutionERP;

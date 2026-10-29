import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  RefreshCw, 
  Database, 
  ShieldCheck, 
  HeartHandshake,
  ChevronRight 
} from 'lucide-react';
import { getSolutionById } from '../data/solutions';

const SolutionCustom: React.FC = () => {
  const solution = getSolutionById('custom-development')!;

  return (
    <main className="pt-24 md:pt-32 pb-20 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-brand-lime transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link to="/solutions" className="hover:text-brand-lime transition-colors">Solutions</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200 font-medium">Custom Development & BI</span>
        </nav>

        {/* Hero */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>{solution.badge}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {solution.title}
          </h1>

          <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl">
            {solution.subtitle}. {solution.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact?interest=custom-engineering"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-lime text-brand-dark font-bold text-sm rounded-xl shadow-lg shadow-brand-lime/10 hover:bg-[#d9f99d] transition-all"
            >
              Discuss Your Application Needs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/#products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 text-slate-200 font-semibold text-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Review Pre-Built SaaS Platforms
            </Link>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Custom Engineering Services</h2>
            <p className="text-sm text-slate-400">Enterprise software engineered for maintainability, speed, and business precision.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {solution.coreOfferings.map((offering, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                  {idx === 0 && <Layers className="w-5 h-5" />}
                  {idx === 1 && <RefreshCw className="w-5 h-5" />}
                  {idx === 2 && <Database className="w-5 h-5" />}
                  {idx === 3 && <HeartHandshake className="w-5 h-5" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{offering.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{offering.description}</p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Deliverables:</h4>
                <ul className="space-y-2">
                  {offering.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy & Outcomes */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-brand-lime" /> Technology Stack & Standards
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              We build strictly on industry-standard, strongly typed architectures that your internal teams can easily maintain without vendor lock-in.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {solution.technologies.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-brand-dark/70 rounded-lg border border-white/10 text-xs font-medium text-slate-200">
                  {tech}
                </span>
              ))}
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Cloud Infrastructure:</h4>
            <div className="space-y-2 text-xs text-slate-300">
              {solution.supportedPlatforms.map((platform, idx) => (
                <div key={idx} className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                  {platform}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Commercial & Operational Advantages
            </h3>
            <ul className="space-y-4">
              {solution.businessOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-950/50 to-brand-darker border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Build Software Centered Around Your Business
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
            Tell us about the operational challenge you want to solve. We will prepare an architectural review, milestone breakdown, and feasibility assessment.
          </p>
          <Link
            to="/contact?interest=custom-engineering"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-lime text-brand-dark font-bold text-sm rounded-xl hover:bg-[#d9f99d] transition-all shadow-lg shadow-brand-lime/10"
          >
            Discuss Your Custom Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default SolutionCustom;

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
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#f3f9ff]/60 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0d83fd] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/solutions" className="hover:text-[#0d83fd] transition-colors">Solutions</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#2d465e] font-semibold">Custom Software Engineering & BI</span>
        </nav>

        {/* Hero */}
        <div className="max-w-4xl mb-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-xs font-bold text-purple-600 tracking-wide uppercase mb-4 shadow-sm">
            <Code2 className="w-3.5 h-3.5" />
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
              to="/contact?interest=custom-engineering"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              Discuss Your Application Needs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/#products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#2d465e] hover:text-[#0d83fd] font-bold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
            >
              Review Pre-Built SaaS Platforms
            </Link>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#2d465e] mb-2">Custom Engineering Services</h2>
            <p className="text-sm text-slate-600">Enterprise software engineered for maintainability, speed, and business precision.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {solution.coreOfferings.map((offering, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 shadow-sm">
                  {idx === 0 && <Layers className="w-6 h-6" />}
                  {idx === 1 && <RefreshCw className="w-6 h-6" />}
                  {idx === 2 && <Database className="w-6 h-6" />}
                  {idx === 3 && <HeartHandshake className="w-6 h-6" />}
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

        {/* Engineering Philosophy & Outcomes */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold font-heading text-[#2d465e] mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#0d83fd]" /> Technology Stack & Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              We build strictly on industry-standard, strongly typed architectures that your internal teams can easily maintain without vendor lock-in.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {solution.technologies.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#f3f9ff] rounded-xl border border-blue-100 text-xs font-semibold text-[#2d465e]">
                  {tech}
                </span>
              ))}
            </div>

            <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-400 mb-3">Cloud Infrastructure:</h4>
            <div className="space-y-2 text-xs text-slate-600">
              {solution.supportedPlatforms.map((platform, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-medium">
                  {platform}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold font-heading text-[#2d465e] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Commercial & Operational Advantages
            </h3>
            <ul className="space-y-4">
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
            Build Software Centered Around Your Business
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Tell us about the operational challenge you want to solve. We will prepare an architectural review, milestone breakdown, and feasibility assessment.
          </p>
          <Link
            to="/contact?interest=custom-engineering"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          >
            <span>Discuss Your Custom Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default SolutionCustom;

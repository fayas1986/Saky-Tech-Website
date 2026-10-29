import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Building2, CheckCircle2 } from 'lucide-react';
import { companyConfig } from '../data/company';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-indigo-500/10 via-brand-lime/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-lime mb-6">
            <Building2 className="w-3.5 h-3.5" />
            <span>Enterprise Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Ready to Build Software Around <span className="text-brand-lime">The Way You Work?</span>
          </h2>
          
          <p className="text-sm md:text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Schedule an architectural review or product demonstration with our senior functional consultants. We will evaluate your operational scope, integration roadmap, and timelines.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <Link 
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-brand-dark bg-brand-lime rounded-xl shadow-xl shadow-brand-lime/10 hover:bg-[#d9f99d] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-lime"
            >
              Discuss Your Requirements
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#products"
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:text-white transition-all text-center focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Products
            </a>
          </div>

          {/* Direct Contact Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-lime" />
              <span>Direct Phone:</span>
              <a href={companyConfig.primaryPhoneLink} className="text-slate-200 hover:text-brand-lime font-medium">
                {companyConfig.primaryPhone}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-lime" />
              <span>Direct Email:</span>
              <a href={companyConfig.primaryEmailLink} className="text-slate-200 hover:text-brand-lime font-medium">
                {companyConfig.primaryEmail}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;
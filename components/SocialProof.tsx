import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin, Phone, Mail, Building, ArrowRight } from 'lucide-react';
import { officeLocations, companyConfig } from '../data/company';

const SocialProof: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-darker border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-lime mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>Regional Presence</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Global Reach. Local Operational Presence.
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Headquartered in Singapore with an established branch in the Sultanate of Oman and our core engineering development center in Chennai, India.
          </p>
        </div>

        {/* Global Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
          
          {/* Singapore HQ */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-lime">
                  {officeLocations.singapore.badge}
                </span>
                <span className="text-xs text-slate-500 font-mono">SG</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {officeLocations.singapore.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {officeLocations.singapore.addressLines.join(', ')}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
              <div>Phone: <span className="text-slate-200">{officeLocations.singapore.phone}</span></div>
              <div>Email: <span className="text-slate-200">{officeLocations.singapore.email}</span></div>
            </div>
          </div>

          {/* Oman Office */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                  {officeLocations.oman.badge}
                </span>
                <span className="text-xs text-slate-500 font-mono">OM</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {officeLocations.oman.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {officeLocations.oman.addressLines.join(', ')}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
              <div>Phone: <span className="text-slate-200">{officeLocations.oman.phone}</span></div>
              <div>Email: <span className="text-slate-200">{officeLocations.oman.email}</span></div>
            </div>
          </div>

          {/* India Development Center */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  {officeLocations.india.badge}
                </span>
                <span className="text-xs text-slate-500 font-mono">IN</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {officeLocations.india.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {officeLocations.india.addressLines.join(', ')}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
              <div>Phone: <span className="text-slate-200">{officeLocations.india.phone}</span></div>
              <div>Email: <span className="text-slate-200">{officeLocations.india.email}</span></div>
            </div>
          </div>

        </div>

        {/* Action Link to Contact */}
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-brand-lime hover:underline"
          >
            Connect With Our Regional Offices & Schedule a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
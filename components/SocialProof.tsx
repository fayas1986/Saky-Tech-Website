import React from 'react';
import { Globe, MapPin, Phone, Mail, Star, Quote, ArrowRight, ExternalLink } from 'lucide-react';
import { officeLocations } from '../data/company';

const testimonials = [
  {
    quote: "TaxFlow reduced our monthly GST reconciliation cycle from 5 days to under 15 minutes. It identified mismatch credits before our quarterly GSTR-3B filing, saving significant cash flow.",
    author: "Financial Controller",
    role: "Enterprise Manufacturing Conglomerate",
    avatar: "/assets/img/avatar-1.webp",
    rating: 5
  },
  {
    quote: "Integrating ZATCA Connect allowed our Saudi retail operations to achieve Phase 2 cryptographic clearance on day one without rewriting our legacy billing database.",
    author: "Head of IT & Digital Systems",
    role: "GCC Retail & Distribution Group",
    avatar: "/assets/img/avatar-2.webp",
    rating: 5
  },
  {
    quote: "Saky Technologies' Dynamics 365 team modernized our Business Central environment and built bidirectional warehouse middleware that eliminated manual order keying.",
    author: "VP of Supply Chain",
    role: "Regional Logistics Operator, Singapore",
    avatar: "/assets/img/avatar-3.webp",
    rating: 5
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Testimonials Header - iLanding Standard */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-3 shadow-sm">
            Proven Operational Impact
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Trusted by Enterprise Finance & IT Leaders
          </h2>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            See how organizations across Southeast Asia, the GCC, and India accelerate statutory compliance and operational efficiency.
          </p>
        </div>

        {/* iLanding Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#f3f9ff]/70 border border-slate-200/80 rounded-3xl p-7 md:p-8 flex flex-col justify-between hover:bg-white hover:border-blue-200 hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] transition-all hover:-translate-y-1.5 group"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs md:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-200/60">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold font-heading text-[#2d465e]">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Operational Presence Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600 tracking-wide uppercase mb-3">
            <Globe className="w-3.5 h-3.5 text-[#0d83fd]" />
            <span>Global Operational Footprint</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-[#2d465e]">
            Three Strategic Hubs. Global Capability.
          </h3>
        </div>

        {/* Global Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Singapore HQ */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all flex flex-col justify-between hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#0d83fd]">
                  {officeLocations.singapore.badge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">SG</span>
              </div>

              <h4 className="text-xl font-bold font-heading text-[#2d465e] mb-2">
                {officeLocations.singapore.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {officeLocations.singapore.addressLines.join(', ')}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Phone:</span>
                <span className="font-semibold text-[#2d465e]">{officeLocations.singapore.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <span className="font-semibold text-[#0d83fd]">{officeLocations.singapore.email}</span>
              </div>
              <a
                href={officeLocations.singapore.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d83fd] hover:underline pt-2 block"
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Oman Office */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all flex flex-col justify-between hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">
                  {officeLocations.oman.badge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">OM</span>
              </div>

              <h4 className="text-xl font-bold font-heading text-[#2d465e] mb-2">
                {officeLocations.oman.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {officeLocations.oman.addressLines.join(', ')}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Phone:</span>
                <span className="font-semibold text-[#2d465e]">{officeLocations.oman.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <span className="font-semibold text-[#0d83fd]">{officeLocations.oman.email}</span>
              </div>
              <a
                href={officeLocations.oman.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d83fd] hover:underline pt-2 block"
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* India Center */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all flex flex-col justify-between hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                  {officeLocations.india.badge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">IN</span>
              </div>

              <h4 className="text-xl font-bold font-heading text-[#2d465e] mb-2">
                {officeLocations.india.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {officeLocations.india.addressLines.join(', ')}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Phone:</span>
                <span className="font-semibold text-[#2d465e]">{officeLocations.india.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <span className="font-semibold text-[#0d83fd]">{officeLocations.india.email}</span>
              </div>
              <a
                href={officeLocations.india.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d83fd] hover:underline pt-2 block"
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SocialProof;

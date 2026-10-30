import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Building2,
  Award,
  Play
} from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-b from-[#f3f9ff] via-[#f3f9ff]/50 to-white overflow-hidden">

      {/* Decorative Subtle Background Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Main Hero Copy - Left 6-7 Columns */}
          <div className="lg:col-span-7 text-center lg:text-left animate-fade-in-up">

            {/* Approved Headline with Accent Text */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#2d465e] mb-6 leading-[1.18]">
              Business software built around <br className="hidden sm:inline" />
              <span className="text-[#0d83fd]">the way you work.</span>
            </h1>

            {/* Positioning Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Saky Technologies delivers proprietary B2B SaaS applications, certified Microsoft Dynamics 365 ERP implementations, and custom software engineering designed to eliminate operational friction and accelerate growth.
            </p>

            {/* Quick 3 Pillar Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <span className="text-[#0d83fd] font-bold text-xs block mb-1">01. SaaS Suite</span>
                <p className="text-xs text-slate-500 leading-snug">TaxFlow, ZATCA Connect, HRMS & healthcare platforms.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <span className="text-indigo-600 font-bold text-xs block mb-1">02. Dynamics 365 ERP</span>
                <p className="text-xs text-slate-500 leading-snug">Business Central, F&O implementations & integrations.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <span className="text-emerald-600 font-bold text-xs block mb-1">03. Custom Engineering</span>
                <p className="text-xs text-slate-500 leading-snug">Bespoke software and enterprise BI dashboards.</p>
              </div>
            </div>

            {/* Primary & Secondary Hero Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md shadow-blue-500/25 hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#products"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#2d465e] hover:text-[#0d83fd] rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 text-[#0d83fd] flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Explore Products</span>
              </a>
            </div>

          </div>

          {/* Right Column: iLanding Hero Image & Floating Customers Badge */}
          <div className="lg:col-span-5 relative animate-fade-in-up">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* iLanding Hero Illustration */}
              <div className="relative z-10 overflow-hidden rounded-2xl bg-white/40 p-2 backdrop-blur-sm shadow-xl border border-white/80">
                <img
                  src="/assets/img/illustration-1.webp"
                  alt="Saky Technologies Enterprise Cloud Suite"
                  className="w-full h-auto rounded-xl object-cover hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Floating Customers Badge - Exact iLanding Structure */}
              <div className="relative sm:absolute -bottom-6 -left-4 sm:left-6 z-20 mt-4 sm:mt-0 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.1)] max-w-xs animate-float">
                <div className="flex items-center mb-2">
                  <img src="/assets/img/avatar-1.webp" alt="Client 1" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                  <img src="/assets/img/avatar-2.webp" alt="Client 2" className="w-8 h-8 rounded-full border-2 border-white object-cover -ml-2 shadow-sm" />
                  <img src="/assets/img/avatar-3.webp" alt="Client 3" className="w-8 h-8 rounded-full border-2 border-white object-cover -ml-2 shadow-sm" />
                  <img src="/assets/img/avatar-4.webp" alt="Client 4" className="w-8 h-8 rounded-full border-2 border-white object-cover -ml-2 shadow-sm" />
                  <img src="/assets/img/avatar-5.webp" alt="Client 5" className="w-8 h-8 rounded-full border-2 border-white object-cover -ml-2 shadow-sm" />
                  <span className="w-8 h-8 rounded-full border-2 border-white bg-[#0d83fd] text-white text-[11px] font-bold flex items-center justify-center -ml-2 shadow-sm">
                    12+
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#2d465e] leading-snug">
                  100+ Enterprise Deployments across Singapore, Oman & India
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* iLanding Bottom Stats Row (4 Stat Items) */}
        <div className="mt-16 lg:mt-24 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_5px_30px_rgba(0,0,0,0.06)] border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

            {/* Stat Item 1 */}
            <div className="p-4 md:p-6 flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center shrink-0 group-hover:bg-[#0d83fd] group-hover:text-white transition-all shadow-sm">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-black font-heading text-[#2d465e] leading-none mb-1">
                  7+
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Proprietary SaaS Platforms
                </p>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="p-4 md:p-6 flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-black font-heading text-[#2d465e] leading-none mb-1">
                  100%
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  ZATCA & GST Statutory Compliance
                </p>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="p-4 md:p-6 flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-black font-heading text-[#2d465e] leading-none mb-1">
                  3 Offices
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Singapore (HQ), Oman & India
                </p>
              </div>
            </div>

            {/* Stat Item 4 */}
            <div className="p-4 md:p-6 flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-black font-heading text-[#2d465e] leading-none mb-1">
                  99.9%
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Production SLA Guarantee
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

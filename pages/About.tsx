import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Building2, Globe, PhoneCall, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { companyConfig, officeLocations } from '../data/company';

const About: React.FC = () => {
  return (
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* iLanding About Section Structure */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Story, Features, Leadership & Contact Card */}
          <div className="lg:col-span-6 animate-fade-in-up">
            <span className="text-xs font-bold text-[#0d83fd] tracking-widest uppercase block mb-3">
              MORE ABOUT US
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-6 leading-tight">
              Enterprise software engineered around <span className="text-[#0d83fd]">your operations</span>
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Saky Technologies is an enterprise software engineering company delivering proprietary B2B SaaS platforms and certified Microsoft Dynamics 365 ERP implementations. We bridge the gap between core financial ledgers and modern operational agility.
            </p>

            {/* 2-Column Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">7 Proprietary SaaS Platforms</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">Dynamics 365 BC & F&O Certified</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">India GST & KSA ZATCA Engines</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">Single-Tenant Cloud Deployments</span>
              </div>
            </div>

            {/* iLanding Profile & Telephone Quick Dial Card */}
            <div className="p-5 rounded-2xl bg-[#f3f9ff] border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/img/avatar-1.webp" 
                  alt="Saky Technologies Leadership" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold font-heading text-[#2d465e]">Executive Advisory</h4>
                  <p className="text-xs text-slate-500">Enterprise Solutions & Architecture</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:border-l sm:border-blue-200 sm:pl-4">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0d83fd] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Call us anytime</p>
                  <a href="tel:+6567767822" className="text-xs font-bold text-[#2d465e] hover:text-[#0d83fd]">
                    +65 6776 7822
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: iLanding Overlapping Dual Images with 15+ Years Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/assets/img/about-5.webp" 
                  alt="Enterprise Architecture Session" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Secondary Overlapping Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <img 
                  src="/assets/img/about-2.webp" 
                  alt="Software Engineering Team" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating 15+ Years Experience Badge */}
              <div className="absolute -top-6 -left-4 sm:-left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-slate-100 animate-float">
                <div className="text-2xl sm:text-3xl font-black font-heading text-[#0d83fd] leading-tight">
                  15+ <span className="text-sm text-[#2d465e] font-bold">Years</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Combined Enterprise Experience
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Global Delivery Hubs */}
        <div className="bg-[#f3f9ff] rounded-3xl p-8 md:p-14 border border-blue-100/80 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[#2d465e]">
              Global Presence. Local Technical Accountability.
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Strategically operating across Singapore, the GCC, and India to support round-the-clock enterprise deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
              <span className="text-xs font-bold text-[#0d83fd] uppercase tracking-wider block mb-1">Global Headquarters</span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">{officeLocations.singapore.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{officeLocations.singapore.addressLines.join(', ')}</p>
              <div className="text-xs text-slate-500 pt-3 border-t border-slate-100">Phone: {officeLocations.singapore.phone}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">Regional Branch</span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">{officeLocations.oman.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{officeLocations.oman.addressLines.join(', ')}</p>
              <div className="text-xs text-slate-500 pt-3 border-t border-slate-100">Phone: {officeLocations.oman.phone}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">R&D & Engineering Hub</span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">{officeLocations.india.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{officeLocations.india.addressLines.join(', ')}</p>
              <div className="text-xs text-slate-500 pt-3 border-t border-slate-100">Phone: {officeLocations.india.phone}</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          >
            <span>Connect with Our Leadership Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default About;

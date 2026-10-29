import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Cpu, 
  Layers, 
  ReceiptText, 
  Users, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

const Hero: React.FC = () => {
  const [activeConsoleTab, setActiveConsoleTab] = useState<'taxflow' | 'zatca' | 'hrms'>('taxflow');

  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-brand-dark">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-brand-lime/5 rounded-full blur-[70px] md:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Main Hero Copy */}
          <div className="flex-1 w-full text-center lg:text-left animate-fade-in-up">
            
            {/* Positioning Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-lime text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
              Enterprise B2B Software & ERP Practice
            </div>
            
            {/* Approved Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.2] lg:leading-[1.15]">
              Business software built around <span className="text-brand-lime">the way you work.</span>
            </h1>
            
            {/* Positioning Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Saky Technologies delivers proprietary B2B SaaS applications, certified Microsoft Dynamics 365 ERP implementations, and custom engineering designed to eliminate operational friction and accelerate growth.
            </p>

            {/* Three Offerings Quick Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-brand-lime font-bold text-xs block mb-1">01. SaaS Products</span>
                <p className="text-[11px] text-slate-300 leading-snug">7 focused platforms for tax, payroll, hospital, & supply chain.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-blue-400 font-bold text-xs block mb-1">02. Dynamics 365 ERP</span>
                <p className="text-[11px] text-slate-300 leading-snug">Business Central, F&O implementation & Power BI analytics.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-purple-400 font-bold text-xs block mb-1">03. Custom Engineering</span>
                <p className="text-[11px] text-slate-300 leading-snug">Bespoke software and modernization for proprietary workflows.</p>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-brand-dark bg-brand-lime rounded-xl shadow-xl shadow-brand-lime/10 hover:bg-[#d9f99d] hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-brand-lime flex items-center justify-center gap-2"
              >
                Discuss Your Requirements
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#products"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:text-white transition-all text-center focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Products
              </a>
            </div>

          </div>

          {/* Labelled Interactive Software Preview Console */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none animate-fade-in-up">
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 ring-1 ring-white/10">
              
              {/* Mandatory Illustration Disclaimer Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="text-[11px] font-mono text-slate-300 font-medium ml-1">Saky Operational Suite Console</span>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Interactive Product Preview — illustrative sample data
                </span>
              </div>

              {/* Console Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5 mb-4 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('taxflow')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                    activeConsoleTab === 'taxflow' 
                      ? 'bg-brand-lime text-brand-dark shadow-sm' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  TaxFlow (GST)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('zatca')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                    activeConsoleTab === 'zatca' 
                      ? 'bg-brand-lime text-brand-dark shadow-sm' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ZATCA Connect
                </button>
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('hrms')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                    activeConsoleTab === 'hrms' 
                      ? 'bg-brand-lime text-brand-dark shadow-sm' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  TalentSense HRMS
                </button>
              </div>

              {/* Console Body Content based on Tab */}
              {activeConsoleTab === 'taxflow' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div className="bg-brand-darker p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">GSTR-2B Inward Matching</div>
                      <div className="text-base font-bold text-white mt-1">48,210 Invoices</div>
                      <div className="text-[10px] text-emerald-400">✓ 99.8% Auto-Matched</div>
                    </div>
                    <div className="bg-brand-darker p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">ITC Recovery Protection</div>
                      <div className="text-base font-bold text-brand-lime mt-1">100% Eligible</div>
                      <div className="text-[10px] text-slate-400">0 Ineligible Risk Flags</div>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-darker rounded-lg border border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>ERP Purchase Ledger</span>
                      <span className="text-slate-300 font-semibold">MS Dynamics 365 Connected</span>
                    </div>
                    <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>Jurisdiction</span>
                      <span className="text-indigo-400 font-semibold">India Domestic GST</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Reconciliation Status</span>
                      <span className="text-emerald-400 font-bold">Synchronized</span>
                    </div>
                  </div>
                </div>
              )}

              {activeConsoleTab === 'zatca' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div className="bg-brand-darker p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">Phase 2 Clearance API</div>
                      <div className="text-base font-bold text-white mt-1">Real-Time</div>
                      <div className="text-[10px] text-emerald-400">Avg Latency &lt; 1.2s</div>
                    </div>
                    <div className="bg-brand-darker p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">CSID Cryptographic Status</div>
                      <div className="text-base font-bold text-emerald-400 mt-1">Active & Valid</div>
                      <div className="text-[10px] text-slate-400">ECDSA secp256k1 Signed</div>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-darker rounded-lg border border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>XML Schema Conformance</span>
                      <span className="text-emerald-400 font-semibold">UBL 2.1 Schematron Validated</span>
                    </div>
                    <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>Mandate Scope</span>
                      <span className="text-indigo-400 font-semibold">Saudi Arabia ZATCA Phase 2</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Queue Buffer Status</span>
                      <span className="text-brand-lime font-bold">0 Pending Failovers</span>
                    </div>
                  </div>
                </div>
              )}

              {activeConsoleTab === 'hrms' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div className="bg-brand-darker p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">Biometric Sync Terminals</div>
                      <div className="text-base font-bold text-white mt-1">12 Terminals Live</div>
                      <div className="text-[10px] text-emerald-400">ZKTeco / IP Push Protocol</div>
                    </div>
                    <div className="bg-brand-darker p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">Payroll Calculation Run</div>
                      <div className="text-base font-bold text-brand-lime mt-1">Automated</div>
                      <div className="text-[10px] text-slate-400">Statutory Deductions Applied</div>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-darker rounded-lg border border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>Roster Engine</span>
                      <span className="text-slate-300 font-semibold">Rotational Multi-Shift Roster</span>
                    </div>
                    <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>Bank Payout Format</span>
                      <span className="text-indigo-400 font-semibold">Direct Remittance CSV Ready</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Employee Portal (ESS)</span>
                      <span className="text-emerald-400 font-bold">Active & Responsive</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Console Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>View full specification</span>
                <Link
                  to={`/products/${activeConsoleTab === 'taxflow' ? 'taxflow' : activeConsoleTab === 'zatca' ? 'zatca-connect' : 'talentsense-hrms'}`}
                  className="text-brand-lime hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Deep Dive <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Building2, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  CheckCheck,
  Zap,
  Lock,
  Cpu
} from 'lucide-react';

const OfferingsPillars: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'saas' | 'erp' | 'custom'>('saas');

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="offerings">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* iLanding Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0d83fd] text-xs font-bold tracking-wide uppercase mb-4">
            Core Business Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Three Specialized Practices. One Strategic Partner.
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            We solve operational complexity through focused B2B SaaS products, certified Microsoft ERP implementations, and precision custom software engineering.
          </p>
        </div>

        {/* iLanding Interactive Feature Tabs */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-inner max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('saas')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'saas'
                  ? 'bg-white text-[#0d83fd] shadow-[0_4px_15px_rgba(0,0,0,0.08)]'
                  : 'text-slate-600 hover:text-[#2d465e]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>01. SaaS Products</span>
            </button>
            <button
              onClick={() => setActiveTab('erp')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'erp'
                  ? 'bg-white text-[#0d83fd] shadow-[0_4px_15px_rgba(0,0,0,0.08)]'
                  : 'text-slate-600 hover:text-[#2d465e]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>02. Dynamics 365 ERP</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'custom'
                  ? 'bg-white text-[#0d83fd] shadow-[0_4px_15px_rgba(0,0,0,0.08)]'
                  : 'text-slate-600 hover:text-[#2d465e]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>03. Custom Engineering & BI</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display Area (iLanding Layout) */}
        <div className="bg-[#f3f9ff]/70 border border-slate-200/70 rounded-3xl p-6 md:p-10 lg:p-12 mb-20 shadow-[0_5px_30px_rgba(0,0,0,0.03)]">
          {activeTab === 'saas' && (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fade-in-up">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <span className="text-xs font-bold text-[#0d83fd] tracking-wider uppercase block mb-2">
                  Proprietary B2B Applications
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-[#2d465e] mb-4">
                  Purpose-Built Software Eliminating Operational Friction
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  Targeted business platforms built specifically for tax reconciliation, statutory e-invoicing, hospital operations, procurement automation, logistics tracking, and enterprise CRM.
                </p>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>7 Production-Grade Platforms</strong> — TaxFlow, ZATCA Connect, TalentSense HRMS, MedNext HIMS, ProcureAI, LogiSud, and Nova CRM.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Zero Regulatory Logic Leakage</strong> — Dedicated regulatory compliance engines for India GST and Saudi Arabia ZATCA Phase 2.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Native ERP Connectors</strong> — Seamless pre-built integration with Dynamics 365, SAP S/4HANA, and Tally Prime.</span>
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#products"
                    className="px-6 py-3 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md transition-all flex items-center gap-2"
                  >
                    Explore SaaS Suite
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    to="/contact"
                    className="px-6 py-3 text-sm font-semibold text-[#2d465e] hover:text-[#0d83fd] rounded-full bg-white border border-slate-200 transition-all"
                  >
                    Request Technical Demo
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 text-center">
                <div className="bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100">
                  <img 
                    src="/assets/img/features-illustration-1.webp" 
                    alt="Saky SaaS Platform" 
                    className="w-full h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'erp' && (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fade-in-up">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <span className="text-xs font-bold text-[#0d83fd] tracking-wider uppercase block mb-2">
                  Microsoft Dynamics 365 Practice
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-[#2d465e] mb-4">
                  Certified Microsoft ERP Implementation & Middleware
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  Certified consultants and solution architects delivering full-lifecycle Microsoft Dynamics 365 Business Central and Finance & Operations (F&O) implementations across the GCC, Singapore, and India.
                </p>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Business Central & F&O Deployments</strong> — Streamlined financial ledgers, multi-currency accounting, and supply chain management.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Bidirectional API Integration</strong> — Seamlessly bridges proprietary SaaS tools, POS terminals, and third-party warehouse systems.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Enterprise Power BI Analytics</strong> — Executive dashboards delivering real-time financial and operational intelligence.</span>
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/solutions/erp-integration"
                    className="px-6 py-3 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md transition-all flex items-center gap-2"
                  >
                    View ERP Practice
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 text-sm font-semibold text-[#2d465e] hover:text-[#0d83fd] rounded-full bg-white border border-slate-200 transition-all"
                  >
                    Discuss ERP Migration
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 text-center">
                <div className="bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100">
                  <img 
                    src="/assets/img/features-illustration-2.webp" 
                    alt="Microsoft Dynamics 365 Practice" 
                    className="w-full h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fade-in-up">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <span className="text-xs font-bold text-[#0d83fd] tracking-wider uppercase block mb-2">
                  Custom Engineering & Data
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-[#2d465e] mb-4">
                  Bespoke Enterprise Software & Secure Cloud Architecture
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  When off-the-shelf software fails to match your operational advantage, our senior engineering team builds high-throughput cloud platforms, legacy modernization, and automated data pipelines.
                </p>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Modern Microservices Architecture</strong> — High-concurrency Node.js, Go, Python, and .NET Core backend microservices.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Sovereign Cloud Deployments</strong> — Single-tenant VPC deployments on Azure and AWS adhering to regional data residency laws.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCheck className="w-5 h-5 text-[#0d83fd] shrink-0 mt-0.5" />
                    <span><strong>Mission-Critical SLAs</strong> — Enterprise maintenance contracts, monitoring, and 24/7 engineering support.</span>
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/solutions/custom-development"
                    className="px-6 py-3 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md transition-all flex items-center gap-2"
                  >
                    View Engineering Services
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 text-sm font-semibold text-[#2d465e] hover:text-[#0d83fd] rounded-full bg-white border border-slate-200 transition-all"
                  >
                    Consult an Architect
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 text-center">
                <div className="bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100">
                  <img 
                    src="/assets/img/features-illustration-3.webp" 
                    alt="Custom Engineering" 
                    className="w-full h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* iLanding Features Cards Section (4 Colored Feature Boxes) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-[#2d465e]">
              Engineered for Enterprise Confidence
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Every platform and integration delivered by Saky Technologies adheres to rigorous architectural principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Orange */}
            <div className="bg-white p-7 rounded-2xl border-t-4 border-amber-500 shadow-[0_5px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                Statutory Precision
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated e-invoicing and tax engines with zero penalty exposure, verified against Indian GST and Saudi ZATCA standards.
              </p>
            </div>

            {/* Box 2: Blue */}
            <div className="bg-white p-7 rounded-2xl border-t-4 border-[#0d83fd] shadow-[0_5px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0d83fd] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                ERP Certification
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Specialized Microsoft Dynamics 365 Business Central and F&O implementations engineered by accredited ERP specialists.
              </p>
            </div>

            {/* Box 3: Green */}
            <div className="bg-white p-7 rounded-2xl border-t-4 border-emerald-500 shadow-[0_5px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                Sovereign Cloud
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Single-tenant VPC deployments with tenant isolation, TLS 1.3 encryption, and compliance with local data protection acts.
              </p>
            </div>

            {/* Box 4: Red/Purple */}
            <div className="bg-white p-7 rounded-2xl border-t-4 border-purple-500 shadow-[0_5px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                High-Volume Scale
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Transactional reliability capable of processing millions of invoice lines and ERP sync events with full audit logging.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default OfferingsPillars;

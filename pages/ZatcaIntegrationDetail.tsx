import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Layers,
  Server,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileCode2,
} from 'lucide-react';
import {
  getZatcaIntegrationBySlug,
  ZATCA_INTEGRATION_PAGES,
} from '../data/zatca-seo-content';
import ZatcaDemoForm from '../components/ZatcaDemoForm';
import NotFound from './NotFound';
import { trackZatcaEvent } from '../utils/analytics';

const ZatcaIntegrationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const integration = slug ? getZatcaIntegrationBySlug(slug) : undefined;
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!integration) {
    return <NotFound />;
  }

  const otherIntegrations = ZATCA_INTEGRATION_PAGES.filter(
    (item) => item.slug !== integration.slug
  );

  const handleDemoClick = (ctaLocation: string) => {
    trackZatcaEvent('zatca_demo_click', {
      cta_location: ctaLocation,
      page_path: integration.path,
      erp_system: integration.erpName,
    });
    const el = document.getElementById('zatca-demo-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#f3f9ff]/60 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500"
        >
          <Link to="/" className="hover:text-[#0d83fd] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link
            to="/products/zatca-connect"
            className="hover:text-[#0d83fd] transition-colors"
          >
            ZATCA Connect
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#2d465e] font-semibold">
            {integration.shortName} Integration
          </span>
        </nav>

        {/* Hero Section */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 md:p-12 mb-14 shadow-sm">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {integration.verificationStatus}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0d83fd] text-xs font-bold uppercase tracking-wider">
                {integration.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4 leading-tight">
              {integration.h1}
            </h1>

            <p className="text-sm sm:text-base font-bold text-[#2d465e] bg-[#f3f9ff] border-l-4 border-[#0d83fd] px-4 py-3 rounded-r-xl mb-5">
              {integration.positioningStatement}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              {integration.heroSummary}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#zatca-demo-form"
                onClick={(e) => {
                  e.preventDefault();
                  handleDemoClick('integration_hero');
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
              >
                <span>Request a {integration.shortName} Technical Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/products/zatca-connect"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#2d465e] hover:text-[#0d83fd] font-bold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
              >
                <span>Overview: Saky ZATCA Connect</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Architecture Data Flow */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 mb-14 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              Technical Data Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2">
              How {integration.erpName} Connects to ZATCA FATOORA
            </h2>
            <p className="text-sm text-slate-600">
              End-to-end transaction lifecycle from ERP invoice posting to ZATCA Phase 2 clearance
              and QR write-back.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d83fd] block mb-1">
                01. ERP Source
              </span>
              <h3 className="text-sm font-bold text-[#2d465e] mb-2">Invoice Origination</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {integration.architectureFlow.source}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                02. Connector Layer
              </span>
              <h3 className="text-sm font-bold text-[#2d465e] mb-2">Payload Extraction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {integration.architectureFlow.extractionMethod}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/90 border border-blue-200 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d83fd] block mb-1">
                03. Saky ZATCA Middleware
              </span>
              <h3 className="text-sm font-bold text-[#2d465e] mb-2">XML &amp; Cryptographic Stamp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {integration.architectureFlow.middlewareAction}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                04. ERP Write-Back
              </span>
              <h3 className="text-sm font-bold text-[#2d465e] mb-2">Cleared XML &amp; QR Return</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {integration.architectureFlow.writebackMethod}
              </p>
            </div>
          </div>
        </section>

        {/* ERP-Specific Challenges Addressed */}
        <section className="mb-14">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              Engineering Challenges Solved
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2">
              Why {integration.shortName} Teams Choose Middleware Over Custom In-ERP Coding
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {integration.painPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-[#2d465e] mb-2">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Capabilities & Supported Document Types */}
        <section className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d83fd] mb-2">
              <Layers className="w-4 h-4" />
              <span>Connector Capabilities</span>
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-[#2d465e] mb-6">
              {integration.shortName} ZATCA Capabilities
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {integration.technicalCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80"
                >
                  <h3 className="text-sm font-bold font-heading text-[#2d465e] mb-1.5">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              <FileCode2 className="w-4 h-4" />
              <span>Supported Invoice &amp; Note Types</span>
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-[#2d465e] mb-6">
              Supported Document Workflows
            </h2>
            <ul className="space-y-3">
              {integration.supportedDocumentTypes.map((docType, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f3f9ff] border border-blue-100 text-xs sm:text-sm font-semibold text-[#2d465e]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{docType}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 mb-16 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d83fd] mb-2">
              <Server className="w-4 h-4" />
              <span>Onboarding Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2">
              4-Step {integration.shortName} Integration Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {integration.implementationSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#f3f9ff]/80 border border-blue-100 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black font-heading text-[#0d83fd] block mb-2">
                    {step.step}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold font-heading text-[#2d465e] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16" aria-labelledby="integration-faq-heading">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              Integration FAQ
            </span>
            <h2
              id="integration-faq-heading"
              className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e]"
            >
              {integration.shortName} ZATCA Phase 2 Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {integration.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-[#2d465e] hover:text-[#0d83fd] transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0d83fd] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`${
                      isOpen ? 'block' : 'hidden'
                    } px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed`}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contextual Links to Related ZATCA Resources & Other ERP Connectors */}
        <section className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d83fd] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Technical Guides</span>
            </div>
            <h2 className="text-xl font-bold font-heading text-[#2d465e] mb-4">
              Related ZATCA Phase 2 Documentation
            </h2>
            <div className="space-y-3">
              {integration.relatedResources.map((res, idx) => (
                <Link
                  key={idx}
                  to={res.path}
                  className="block p-4 rounded-2xl bg-[#f8fafc] hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-200 transition-all"
                >
                  <h3 className="text-sm font-bold text-[#0d83fd] mb-1">{res.title}</h3>
                  <p className="text-xs text-slate-600">{res.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Other Verified Connectors</span>
              </div>
              <h2 className="text-xl font-bold font-heading text-[#2d465e] mb-4">
                Additional ERP Integration Pathways
              </h2>
              <div className="space-y-3">
                {otherIntegrations.map((other) => (
                  <Link
                    key={other.slug}
                    to={other.path}
                    className="block p-4 rounded-2xl bg-[#f8fafc] hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-200 transition-all"
                  >
                    <h3 className="text-sm font-bold text-[#2d465e] hover:text-[#0d83fd] mb-1">
                      {other.erpName}
                    </h3>
                    <p className="text-xs text-slate-500">{other.badge}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/solutions/erp-integration"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d83fd] hover:underline"
              >
                <span>Explore our full Microsoft Dynamics 365 ERP Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final Demo Enquiry Form */}
        <ZatcaDemoForm
          defaultErpSystem={integration.erpName}
          sourcePage={integration.path}
          heading={`Request a ${integration.shortName} ZATCA Phase 2 Demo`}
        />
      </div>
    </main>
  );
};

export default ZatcaIntegrationDetail;


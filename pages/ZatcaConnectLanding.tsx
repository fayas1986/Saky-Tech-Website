import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Server,
  Layers,
  FileCode2,
  KeyRound,
  RefreshCw,
  Activity,
  Lock,
  Building2,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Phone,
  Clock,
} from 'lucide-react';
import ZatcaDemoForm from '../components/ZatcaDemoForm';
import {
  ZATCA_CONNECT_FAQS,
  ZATCA_INTEGRATION_PAGES,
  ZATCA_RESOURCE_ARTICLES,
} from '../data/zatca-seo-content';
import { trackZatcaEvent } from '../utils/analytics';
import { companyConfig } from '../data/company';

const ZatcaConnectLanding: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleDemoClick = (ctaLocation: string) => {
    trackZatcaEvent('zatca_demo_click', {
      cta_location: ctaLocation,
      page_path: '/products/zatca-connect',
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
          <Link to="/#products" className="hover:text-[#0d83fd] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#2d465e] font-semibold">ZATCA Connect</span>
        </nav>

        {/* 1 & 2. Hero Section & Primary CTA */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 md:p-12 mb-14 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 tracking-wide uppercase mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saudi Arabia (KSA) · ZATCA FATOORA Phase 2 Middleware</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4 leading-tight">
                ZATCA Phase 2 E-Invoicing Integration for{' '}
                <span className="text-[#0d83fd]">Your Existing ERP</span>
              </h1>

              <p className="text-base sm:text-lg font-bold text-[#2d465e] bg-[#f3f9ff] border-l-4 border-[#0d83fd] px-4 py-3 rounded-r-xl mb-5">
                Keep your existing ERP. Connect it to ZATCA FATOORA Phase 2 through Saky ZATCA
                Connect.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                Saky ZATCA Connect is dedicated integration middleware engineered for businesses
                operating in the Kingdom of Saudi Arabia. Instead of replacing your accounting or
                ERP platform, our middleware connects Microsoft Dynamics 365, custom ERP software,
                and POS systems to ZATCA FATOORA—handling UBL 2.1 XML transformation, CSID
                cryptographic stamping, Phase 2 TLV QR codes, and real-time clearance and reporting
                APIs.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#zatca-demo-form"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDemoClick('hero_primary');
                  }}
                  data-testid="zatca-hero-demo-cta"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
                >
                  <span>Request a Technical Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#integration-architecture"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#2d465e] hover:text-[#0d83fd] font-bold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <span>View Middleware Architecture</span>
                </a>

                <a
                  href={companyConfig.primaryPhoneLink}
                  onClick={() =>
                    trackZatcaEvent('zatca_phone_click', {
                      click_location: 'zatca_hero',
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0d83fd] px-3 py-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0d83fd]" />
                  <span>{companyConfig.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Column Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    ZATCA Phase 2 Technical Scope
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                    UBL 2.1 XML
                  </span>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-6">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Standard Tax Invoices (0100000):</strong> Real-time synchronous B2B
                      &amp; B2G clearance via FATOORA API.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Simplified Tax Invoices (0200000):</strong> Local ECDSA cryptographic
                      stamping, 9-tag TLV QR &amp; 24-hour reporting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>CSID Lifecycle Management:</strong> CSR generation, OTP compliance
                      checks &amp; multi-branch Production CSIDs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Pre-Flight Schematron Validation:</strong> Checks BR-KSA rules (VAT
                      number, national address, credit note links) before transmission.
                    </span>
                  </li>
                </ul>

                <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-[11px] text-slate-300 leading-relaxed">
                  <strong>Regulatory Independence Note:</strong> Saky ZATCA Connect is engineered to
                  align with ZATCA’s published Phase 2 XML and cryptographic specifications. Saky
                  Technologies is an independent integration provider and does not claim official
                  endorsement by ZATCA.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ERP and Accounting Systems Supported */}
        <section className="mb-16" aria-labelledby="supported-erp-heading">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              Verified ERP &amp; Billing Connectivity
            </span>
            <h2
              id="supported-erp-heading"
              className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2"
            >
              ERP, POS &amp; Accounting Systems Supported
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We prioritize transparent engineering delivery. Below are our verified integration
              pathways for Microsoft Dynamics 365 and custom ERP/POS platforms, alongside API
              middleware connectivity for SAP and Oracle landscapes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {ZATCA_INTEGRATION_PAGES.map((integration) => (
              <div
                key={integration.slug}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {integration.verificationStatus}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {integration.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                    {integration.erpName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {integration.heroSummary}
                  </p>
                  <div className="p-3 rounded-xl bg-[#f3f9ff] border border-blue-100 text-xs text-slate-700 mb-5">
                    <strong>Connector Method:</strong> {integration.architectureFlow.extractionMethod}
                  </div>
                </div>

                <Link
                  to={integration.path}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0d83fd] hover:text-[#0b66c2] transition-colors"
                >
                  <span>Explore {integration.shortName} ZATCA Integration</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Honest note on SAP & Oracle Middleware connectivity */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold font-heading text-[#2d465e]">
                  Running SAP (S/4HANA / ECC) or Oracle (EBS / NetSuite) in Saudi Arabia?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  We connect SAP and Oracle ERP environments to ZATCA FATOORA through our REST API,
                  IDoc/OData, and database staging middleware. Contact our integration architects to
                  review your invoice extraction schema.
                </p>
              </div>
            </div>
            <Link
              to="/integrations/custom-erp-zatca"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#2d465e] text-xs font-bold transition-colors"
            >
              <span>View API Middleware Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 4. Integration Architecture Diagram */}
        <section
          id="integration-architecture"
          aria-labelledby="architecture-diagram-heading"
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 mb-16 shadow-sm"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              End-to-End Data Flow
            </span>
            <h2
              id="architecture-diagram-heading"
              className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2"
            >
              Integration Architecture: ERP / POS / Billing System → Saky ZATCA Middleware → ZATCA
              FATOORA
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Saky ZATCA Connect sits cleanly between your internal billing environment and the
              ZATCA FATOORA portal, isolating cryptographic signing and XML schema transformations
              from your core ledger.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {/* Stage 1: ERP / POS / Billing System */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100 text-blue-900">
                    Stage 1: Source System
                  </span>
                  <Building2 className="w-5 h-5 text-[#0d83fd]" />
                </div>
                <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                  ERP / POS / Billing System
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Your existing ERP or POS posts a tax invoice, simplified receipt, credit note, or
                  debit note using its standard accounting workflow.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li>• Dynamics 365 Finance &amp; Operations (X++ / OData)</li>
                  <li>• Dynamics 365 Business Central (AL Extension / API)</li>
                  <li>• Custom ERP, POS, HIMS or Travel Billing (JSON REST)</li>
                  <li>• SAP / Oracle Outbound Invoice Payloads</li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                Outbound: JSON / OData / Webhook Payload
              </div>
            </div>

            {/* Stage 2: Saky ZATCA Middleware */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg border border-blue-500/30">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Stage 2: Saky ZATCA Middleware
                  </span>
                  <Server className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold font-heading text-white mb-2">
                  Saky ZATCA Connect Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Validates business rules, transforms payloads to UBL 2.1 XML, chains invoice
                  hashes, signs with the branch CSID, and manages API queues.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li>• Pre-flight XSD &amp; BR-KSA Schematron validation</li>
                  <li>• UBL 2.1 XML generation &amp; UUID assignment</li>
                  <li>• Sequential ICV counter &amp; SHA-256 PIH chaining</li>
                  <li>• ECDSA cryptographic stamping &amp; 9-tag TLV QR</li>
                  <li>• Persistent retry queue &amp; audit logging</li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-700 text-[11px] font-mono text-emerald-300">
                Signed UBL 2.1 XML + CSID BinarySecurityToken
              </div>
            </div>

            {/* Stage 3: ZATCA FATOORA */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900">
                    Stage 3: Tax Authority Portal
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                  ZATCA FATOORA API
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  ZATCA FATOORA processes the signed XML via Clearance or Reporting endpoints and
                  returns the authoritative status and cleared XML back to your ERP.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li>• B2B Clearance API: Synchronous stamp &amp; QR return</li>
                  <li>• B2C Reporting API: Sub-24h simplified invoice filing</li>
                  <li>• Compliance &amp; Production CSID onboarding APIs</li>
                  <li>• Write-back of CLEARED / REPORTED status &amp; QR to ERP</li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                Inbound: Cleared XML + QR Code + Status Log
              </div>
            </div>
          </div>
        </section>

        {/* 5. ZATCA Phase 2 Workflow */}
        <section className="mb-16" aria-labelledby="zatca-workflow-heading">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              Transaction Lifecycle
            </span>
            <h2
              id="zatca-workflow-heading"
              className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2"
            >
              ZATCA Phase 2 Invoice Workflows Supported
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every invoice document type and operational exception is handled through structured
              validation and API state management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-[#0d83fd] uppercase tracking-wider block mb-2">
                01. B2B &amp; B2G Clearance
              </span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                Standard Tax Invoice Clearance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Submits Standard Tax Invoices (`0100000`) synchronously to ZATCA’s Clearance API.
                Receives ZATCA’s cryptographic stamp and cleared UBL 2.1 XML with embedded QR code
                before the invoice is issued to your corporate buyer.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">
                02. B2C POS Reporting
              </span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                Simplified Tax Invoice Reporting
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Signs Simplified Tax Invoices (`0200000`) locally using the branch EGS private key
                and generates the 9-tag Phase 2 TLV QR code immediately for customer checkout, then
                reports the signed XML to ZATCA within 24 hours.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                03. Financial Adjustments
              </span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                Credit &amp; Debit Notes (381 / 383)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Enforces mandatory ZATCA `cac:BillingReference` linkage to the original invoice
                number and structured issuance reasons (`cbc:InstructionNote`) for both Standard and
                Simplified Credit and Debit Notes.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-2">
                04. Pre-Flight Conformance
              </span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                XSD &amp; Schematron Invoice Validation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Validates buyer 15-digit VAT numbers (`BR-KSA-81`), mandatory B2B national address
                elements (`BR-10`), tax category codes (`S`, `Z`, `E`, `O`), and line-item arithmetic
                prior to calling ZATCA endpoints.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-2">
                05. Resilience &amp; Recovery
              </span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                Error Handling &amp; Retry Processing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Separates data validation rejections (requiring finance correction) from transient
                network or certificate issues, automatically scheduling queue retries while
                preserving sequential hash integrity.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-2">
                06. Real-Time Visibility
              </span>
              <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-2">
                Transaction Status Tracking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tracks every invoice across `PENDING`, `CLEARED`, `REPORTED`, `WARNING`, and
                `REJECTED` states with downloadable signed XML, QR payload inspection, and ZATCA
                response codes.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Technical Capabilities */}
        <section className="mb-16" aria-labelledby="technical-capabilities-heading">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              Core Engineering Specifications
            </span>
            <h2
              id="technical-capabilities-heading"
              className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2"
            >
              Technical Capabilities Built into ZATCA Connect
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Purpose-built to handle the cryptographic and XML requirements defined in the ZATCA
              E-Invoicing Detailed Technical Guidelines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <KeyRound className="w-6 h-6 text-[#0d83fd] mb-3" />
              <h3 className="text-base font-bold font-heading text-[#2d465e] mb-2">
                CSID Onboarding &amp; Certificate Lifecycle
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Manages the two-stage Compliance CSID (CCSID) and Production CSID (PCSID) issuance
                flow, tracks certificate expiry dates across branches, and streamlines certificate
                renewal.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="text-base font-bold font-heading text-[#2d465e] mb-2">
                CSR &amp; Production Credential Management
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Generates `secp256k1` ECDSA keypairs and Certificate Signing Requests (CSRs)
                populated with mandatory ZATCA OID attributes (EGS serial number, VAT registration
                number, branch location, and invoice type flags).
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <FileCode2 className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-bold font-heading text-[#2d465e] mb-2">
                UBL 2.1 XML Generation &amp; Validation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Constructs canonicalized UBL 2.1 XML documents (`C14N11`) with `ubl:Invoice`,
                `ext:UBLExtensions`, `ds:Signature`, and `cac:AdditionalDocumentReference` blocks
                validated against ZATCA schemas.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <Layers className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-base font-bold font-heading text-[#2d465e] mb-2">
                Invoice Hashing &amp; Phase 2 QR Code Generation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Computes SHA-256 XML digests, maintains the sequential Previous Invoice Hash (`PIH`)
                and Invoice Counter Value (`ICV`), and encodes all 9 Tag-Length-Value (TLV) Base64
                fields into the Phase 2 QR code.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <RefreshCw className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="text-base font-bold font-heading text-[#2d465e] mb-2">
                Clearance &amp; Reporting API Integration
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Authenticates with ZATCA FATOORA Sandbox, Simulation, and Production endpoints using
                CSID `BinarySecurityToken` headers, handling HTTP 200, 202 (Warning), and 400
                responses.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <Activity className="w-6 h-6 text-teal-600 mb-3" />
              <h3 className="text-base font-bold font-heading text-[#2d465e] mb-2">
                Audit Logs &amp; Transaction Monitoring
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Records an immutable operational log for every submission attempt, retry event,
                actor, timestamp, invoice UUID, and integrity hash for internal finance and tax
                audits.
              </p>
            </div>
          </div>
        </section>

        {/* 7 & 8. Security/Deployment Architecture + ERP Integration Process */}
        <section className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* 7. Security and Deployment Architecture */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d83fd] mb-3">
                <Lock className="w-4 h-4" />
                <span>Security &amp; Hosting Models</span>
              </div>
              <h2 className="text-2xl font-extrabold font-heading text-[#2d465e] mb-3">
                Security &amp; Deployment Architecture
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Designed around enterprise network boundaries and cryptographic key protection:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#f3f9ff] border border-blue-100">
                  <h3 className="text-sm font-bold text-[#2d465e] mb-1">
                    1. Single-Tenant Private Cloud (VPC)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dedicated cloud instance with isolated database schemas, TLS 1.3 encrypted API
                    transport, and IP allowlisting between your ERP and the middleware.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200">
                  <h3 className="text-sm font-bold text-[#2d465e] mb-1">
                    2. On-Premises / Corporate Network Deployment
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Deploy ZATCA Connect inside your own Windows/Linux server infrastructure or
                    private cloud so ERP database traffic and ECDSA private keys stay inside your
                    firewall.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200">
                  <h3 className="text-sm font-bold text-[#2d465e] mb-1">
                    3. Encrypted Keystore &amp; Role-Based Access
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Branch private keys and ZATCA CSID secrets are stored encrypted at rest, with
                    role-based access control separating IT administrators from finance auditors.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Need custom network topology or VPN peering?{' '}
              <a
                href="#zatca-demo-form"
                onClick={(e) => {
                  e.preventDefault();
                  handleDemoClick('security_section');
                }}
                className="text-[#0d83fd] font-bold hover:underline"
              >
                Speak with an integration architect →
              </a>
            </div>
          </div>

          {/* 8. ERP Integration Process */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d83fd] mb-3">
              <Server className="w-4 h-4" />
              <span>Implementation Methodology</span>
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-[#2d465e] mb-3">
              5-Step ERP Integration Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Our engineering team follows a structured onboarding sequence so your live ERP billing
              operations experience zero unplanned downtime.
            </p>

            <div className="space-y-4">
              {[
                {
                  step: 'Step 01',
                  title: 'ERP Invoice Schema & Tax Code Assessment',
                  desc: 'We audit your invoice document types (B2B, B2C, Credit/Debit notes, prepayments), VAT categories (S, Z, E, O), and customer master address fields against ZATCA UBL 2.1 requirements.',
                },
                {
                  step: 'Step 02',
                  title: 'Middleware & Connector Configuration',
                  desc: 'We deploy the Dynamics 365 connector or REST API webhook bridge in your staging environment and map your ERP fields to the ZATCA Connect payload contract.',
                },
                {
                  step: 'Step 03',
                  title: 'ZATCA Simulation & Compliance CSID Testing',
                  desc: 'We generate branch CSRs, onboard Compliance CSIDs via FATOORA OTP, and validate sample Standard, Simplified, Credit, and Debit invoices against ZATCA Simulation.',
                },
                {
                  step: 'Step 04',
                  title: 'Production CSID Issuance & Print QR Integration',
                  desc: 'Once compliance checks pass, we issue Production CSIDs for each branch and embed the returned Phase 2 QR code and UUID into your ERP invoice PDF/print templates.',
                },
                {
                  step: 'Step 05',
                  title: 'Go-Live Cutover & Queue Monitoring',
                  desc: 'We transition your production branches to live ZATCA Clearance and Reporting endpoints with real-time dashboard monitoring and finance team training.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80"
                >
                  <span className="px-2.5 py-1 rounded-lg bg-[#0d83fd] text-white text-xs font-bold shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-heading text-[#2d465e] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Customer Implementation Evidence / Production Case Study */}
        <section
          aria-labelledby="implementation-evidence-heading"
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-16 shadow-lg"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                Production Implementation Evidence
              </span>
              <h2
                id="implementation-evidence-heading"
                className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-3"
              >
                Multi-Branch Saudi Travel &amp; Commercial Services Enterprise Deployment
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                A multi-branch commercial travel and corporate services organization operating across{' '}
                <strong>Riyadh, Jeddah, Dammam, and Al Khobar</strong> needed to connect its
                existing branch billing operations to ZATCA FATOORA Phase 2 without replacing its
                back-office reservation and accounting software.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-200">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-emerald-300 mb-1">Multi-Branch CSID Isolation</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Configured independent EGS units and Production CSID certificates for 4 KSA
                    branches, maintaining isolated sequential invoice counters (ICV) and SHA-256
                    hash chains per branch.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-emerald-300 mb-1">
                    Automated Queue &amp; Certificate Recovery
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Implemented pre-flight buyer VAT (`BR-KSA-81`) and address (`BR-10`) checks plus
                    automated retry queues so invoices queued during certificate renewal cleared
                    seamlessly once active CSIDs were provisioned.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
                Verified Production Architecture Highlights
              </h3>
              <dl className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <dt className="text-slate-400">Active KSA Branches</dt>
                  <dd className="font-bold text-white">4 Branches (Riyadh, Jeddah, Dammam, Khobar)</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <dt className="text-slate-400">Invoice Flows</dt>
                  <dd className="font-bold text-white">B2B Clearance &amp; B2C Reporting + Cr. Notes</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <dt className="text-slate-400">Schema Standard</dt>
                  <dd className="font-bold text-emerald-300">UBL 2.1 XML + 9-Tag TLV QR</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-slate-400">Audit Trail</dt>
                  <dd className="font-bold text-white">Signed XML &amp; SHA-256 Integrity Verification</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Contextual Internal Links to Technical Resource Articles */}
        <section className="mb-16" aria-labelledby="zatca-resources-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
                Technical Documentation &amp; Regulatory Guides
              </span>
              <h2
                id="zatca-resources-heading"
                className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e]"
              >
                ZATCA Phase 2 Engineering Resource Library
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Looking for India GST reconciliation instead? Explore{' '}
              <Link
                to="/products/taxflow"
                className="text-[#0d83fd] font-bold hover:underline"
              >
                TaxFlow (India GST Engine)
              </Link>
              , maintained as a completely separate statutory codebase.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ZATCA_RESOURCE_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                to={article.path}
                className="group bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-[#0d83fd] hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#0d83fd] mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{article.badge}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-heading text-[#2d465e] group-hover:text-[#0d83fd] transition-colors mb-2">
                    {article.h1}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {article.metaDescription}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0d83fd]">
                  Read Technical Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 9. Frequently Asked Questions */}
        <section className="mb-16" aria-labelledby="zatca-faq-heading">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d83fd] block mb-2">
              Technical &amp; Compliance FAQ
            </span>
            <h2
              id="zatca-faq-heading"
              className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2"
            >
              Frequently Asked Questions — ZATCA Phase 2 Integration
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Answers for Saudi CIOs, ERP project managers, and finance controllers evaluating
              FATOORA Phase 2 middleware.
            </p>
          </div>

          <div className="space-y-3.5">
            {ZATCA_CONNECT_FAQS.map((faq, idx) => {
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

        {/* 11. Final Demo Enquiry Form */}
        <ZatcaDemoForm sourcePage="/products/zatca-connect" />
      </div>
    </main>
  );
};

export default ZatcaConnectLanding;


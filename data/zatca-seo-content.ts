export interface FAQEntry {
  question: string;
  answer: string;
}

export interface ZatcaIntegrationPageData {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  badge: string;
  erpName: string;
  shortName: string;
  verificationStatus: 'Verified Integration' | 'API Middleware Architecture';
  heroSummary: string;
  positioningStatement: string;
  architectureFlow: {
    source: string;
    extractionMethod: string;
    middlewareAction: string;
    writebackMethod: string;
  };
  painPoints: Array<{
    title: string;
    description: string;
  }>;
  technicalCapabilities: Array<{
    title: string;
    description: string;
  }>;
  supportedDocumentTypes: string[];
  implementationSteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  faqs: FAQEntry[];
  relatedResources: Array<{
    title: string;
    path: string;
    summary: string;
  }>;
}

export interface ZatcaResourceArticleData {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  badge: string;
  lastReviewed: string;
  readingTime: string;
  executiveSummary: string;
  regulatoryNotice: string;
  sections: Array<{
    id: string;
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    codeOrTable?: {
      caption: string;
      headers: string[];
      rows: string[][];
    };
  }>;
  officialReferences: Array<{
    title: string;
    url: string;
    publisher: string;
  }>;
  faqs: FAQEntry[];
}

export interface ArabicRoutePreparation {
  enPath: string;
  arPath: string;
  published: boolean;
  hreflangEn: string;
  hreflangAr: string;
  arTitleDraft: string;
  arDescriptionDraft: string;
  targetKeywordsAr: string[];
  editorialStatus: 'awaiting_native_saudi_arabic_review' | 'approved';
}

export const ZATCA_CONNECT_FAQS: FAQEntry[] = [
  {
    question: 'Do we need to replace our existing ERP to comply with ZATCA Phase 2?',
    answer:
      'No. Saky ZATCA Connect is designed as non-invasive integration middleware. You keep your existing Microsoft Dynamics 365, custom ERP, POS, or accounting system while ZATCA Connect handles UBL 2.1 XML transformation, cryptographic stamping, QR generation, and FATOORA API communication.',
  },
  {
    question: 'What is the difference between ZATCA Phase 2 Clearance and Reporting?',
    answer:
      'Standard Tax Invoices (B2B/B2G) must be submitted synchronously to ZATCA’s Clearance API in real time; ZATCA validates, cryptographically stamps, and returns the cleared XML before the invoice is shared with the buyer. Simplified Tax Invoices (B2C POS receipts) are signed locally with a Phase 2 cryptographic stamp and QR code, issued to the customer immediately, and reported asynchronously to ZATCA’s Reporting API within 24 hours.',
  },
  {
    question: 'How does ZATCA Connect manage CSID onboarding and multi-branch certificates?',
    answer:
      'ZATCA Connect generates the Certificate Signing Request (CSR) for each branch or E-Invoice Generation Solution (EGS) unit, processes the ZATCA FATOORA portal OTP to obtain the Compliance CSID, executes the mandatory compliance invoice test checks, and exchanges them for the Production CSID with automated expiration monitoring.',
  },
  {
    question: 'What happens if an invoice is rejected by ZATCA or the internet connection drops?',
    answer:
      'Before calling ZATCA, ZATCA Connect runs pre-flight XSD and Schematron business rule validations (such as buyer VAT number BR-KSA-81 and address checks BR-10) so data issues are caught early. For transient network outages or ZATCA maintenance windows, transactions are held in a persistent queue with configurable retry scheduling and full audit logs.',
  },
  {
    question: 'Can ZATCA Connect be deployed on-premises or in a private Saudi cloud?',
    answer:
      'Yes. We support single-tenant cloud VPC deployments as well as on-premises / private network installations where cryptographic private keys and ERP database connections remain within your corporate firewall.',
  },
  {
    question: 'Does ZATCA endorse or certify third-party middleware vendors?',
    answer:
      'ZATCA publishes technical specifications, XML schemas, and SDK validation rules for Phase 2 (FATOORA). Saky Technologies is an independent software and ERP integration provider whose middleware is engineered to align with ZATCA’s published Phase 2 specifications; we do not claim official endorsement by ZATCA.',
  },
];

export const ZATCA_INTEGRATION_PAGES: ZatcaIntegrationPageData[] = [
  {
    slug: 'microsoft-dynamics-365-finance-zatca',
    path: '/integrations/microsoft-dynamics-365-finance-zatca',
    title: 'Microsoft Dynamics 365 Finance ZATCA Phase 2 Integration | Saky',
    metaDescription:
      'Connect Microsoft Dynamics 365 Finance & Operations (F&O) to ZATCA FATOORA Phase 2. Automate UBL 2.1 XML generation, CSID stamping, B2B clearance and B2C reporting.',
    h1: 'Microsoft Dynamics 365 Finance & Operations (F&O) ZATCA Phase 2 Integration',
    badge: 'Dynamics 365 F&O Connector',
    erpName: 'Microsoft Dynamics 365 Finance & Operations',
    shortName: 'Dynamics 365 Finance',
    verificationStatus: 'Verified Integration',
    heroSummary:
      'Bridge Microsoft Dynamics 365 Finance & Operations (F&O) with Saudi Arabia’s ZATCA FATOORA Phase 2 platform without disrupting your core X++ financial postings, multi-entity ledgers, or custom invoice print layouts.',
    positioningStatement:
      'Keep your existing Dynamics 365 Finance & Operations environment. Connect it to ZATCA FATOORA Phase 2 through Saky ZATCA Connect.',
    architectureFlow: {
      source: 'Dynamics 365 F&O (CustInvoiceJour /ProjInvoiceJour / Retail POS)',
      extractionMethod: 'OData REST Entities, Custom X++ Business Events & Service Endpoints',
      middlewareAction: 'UBL 2.1 XML Transformation, SHA-256 Chaining (PIH), ECDSA Signing & Schematron Check',
      writebackMethod: 'Write-back of ZATCA UUID, Cryptographic Stamp, Cleared XML & Phase 2 TLV QR Code to F&O',
    },
    painPoints: [
      {
        title: 'Custom X++ Invoice Tables & Vertical Workflows',
        description:
          'Many Saudi enterprises run heavily customized F&O sales order, project accounting, or industry sub-ledgers where standard Electronic Reporting (ER) configurations require extensive rework.',
      },
      {
        title: 'Multi-Entity & Multi-Branch CSID Management',
        description:
          'Enterprises operating multiple legal entities or branch EGS units across Riyadh, Jeddah, and Dammam need isolated CSID certificates, sequential invoice counters (ICV), and previous invoice hash (PIH) chains per device/branch.',
      },
      {
        title: 'Clearance Rejection Visibility for Finance Teams',
        description:
          'When a B2B invoice fails a ZATCA rule (such as missing buyer national address components or tax category mismatch), finance users need clear, actionable validation messages rather than raw XML fault logs.',
      },
    ],
    technicalCapabilities: [
      {
        title: 'Event-Driven X++ & OData Integration',
        description:
          'Triggers automatically upon F&O invoice posting or pro-forma validation via Dynamics 365 Business Events and OData APIs, keeping ERP response times fast.',
      },
      {
        title: 'Multi-Legal Entity & Branch EGS Routing',
        description:
          'Maps each Dynamics 365 legal entity, site, or warehouse to its corresponding ZATCA cryptographic stamp (CSID) and maintains independent hash chains.',
      },
      {
        title: 'Pre-Posting & Post-Posting Validation Modes',
        description:
          'Validates mandatory ZATCA Phase 2 buyer master fields (15-digit VAT number, building number, street, district, city, 5-digit postal code) before calling the FATOORA Clearance API.',
      },
      {
        title: 'SSRS & Custom Print Report QR Injection',
        description:
          'Returns the ZATCA-cleared XML, cryptographic UUID, and 9-tag Phase 2 TLV QR code directly to Dynamics 365 F&O so your existing SSRS invoice PDF includes the compliant QR code.',
      },
    ],
    supportedDocumentTypes: [
      'Free Text Invoices (CustInvoiceTable / CustInvoiceJour)',
      'Sales Order Tax Invoices & Credit Notes',
      'Project Invoices & Milestone Billing (PMA)',
      'Advance Payment / Prepayment Tax Invoices',
      'Retail & Commerce Simplified Tax Invoices (B2C)',
      'Debit Notes & Financial Adjustment Memos',
    ],
    implementationSteps: [
      {
        step: '01',
        title: 'F&O Data Model & Tax Code Mapping',
        description:
          'Review your Dynamics 365 Finance legal entities, sales tax codes, customer address fields, and invoice types against ZATCA UBL 2.1 mandatory tags.',
      },
      {
        step: '02',
        title: 'Middleware & Business Event Deployment',
        description:
          'Configure the Saky ZATCA Connect service connector in your UAT environment and connect F&O invoice posting events.',
      },
      {
        step: '03',
        title: 'ZATCA Sandbox & Compliance CSID Checks',
        description:
          'Generate CSRs, onboard compliance CSIDs via FATOORA OTP, and execute standard, simplified, credit, and debit test scenarios.',
      },
      {
        step: '04',
        title: 'Production CSID Cutover & Hypercare',
        description:
          'Switch to production CSIDs, verify SSRS PDF QR rendering, and monitor live clearance/reporting queues with your finance team.',
      },
    ],
    faqs: [
      {
        question: 'Does Saky ZATCA Connect work with customized Dynamics 365 F&O invoice workflows?',
        answer:
          'Yes. Because ZATCA Connect ingests structured JSON/OData payloads from F&O, we map your custom X++ fields and project or sales invoice extensions without forcing you to rewrite your existing ERP business logic.',
      },
      {
        question: 'How are SSRS invoice printouts updated with the ZATCA Phase 2 QR code?',
        answer:
          'Once ZATCA clears a Standard B2B invoice (or signs a Simplified B2C invoice), the middleware writes the Base64 TLV QR string, ZATCA UUID, and clearance status back to Dynamics 365 so your SSRS report renders the exact QR code.',
      },
      {
        question: 'Can we manage multiple Saudi branches or VAT group entities from one F&O instance?',
        answer:
          'Yes. ZATCA Connect supports multi-entity VAT groups and multi-branch EGS units, maintaining separate CSID certificates, Invoice Counter Values (ICV), and Previous Invoice Hashes (PIH) for each branch.',
      },
    ],
    relatedResources: [
      {
        title: 'Complete ZATCA Phase 2 Integration Guide',
        path: '/resources/zatca-phase-2-guide',
        summary: 'Technical overview of UBL 2.1 XML, cryptographic stamps, and API integration.',
      },
      {
        title: 'ZATCA CSID & Production Onboarding Guide',
        path: '/resources/zatca-csid-onboarding',
        summary: 'Step-by-step CSR generation, OTP verification, and production CSID lifecycle.',
      },
      {
        title: 'ZATCA Clearance vs Reporting Explained',
        path: '/resources/zatca-clearance-vs-reporting',
        summary: 'Differences between B2B real-time clearance and B2C 24-hour reporting.',
      },
    ],
  },
  {
    slug: 'dynamics-365-business-central-zatca',
    path: '/integrations/dynamics-365-business-central-zatca',
    title: 'Dynamics 365 Business Central ZATCA Phase 2 Integration | Saky',
    metaDescription:
      'Integrate Microsoft Dynamics 365 Business Central with ZATCA FATOORA Phase 2. AL extension & middleware for UBL 2.1 XML, CSID stamping, QR codes, and API clearance.',
    h1: 'Microsoft Dynamics 365 Business Central ZATCA Phase 2 Integration',
    badge: 'Business Central Connector',
    erpName: 'Microsoft Dynamics 365 Business Central',
    shortName: 'Business Central',
    verificationStatus: 'Verified Integration',
    heroSummary:
      'Connect Microsoft Dynamics 365 Business Central (Cloud or On-Premises) to ZATCA FATOORA Phase 2 through lightweight AL extension hooks and Saky ZATCA Connect middleware.',
    positioningStatement:
      'Keep your Dynamics 365 Business Central ledger. Automate ZATCA Phase 2 clearance and reporting with Saky ZATCA Connect.',
    architectureFlow: {
      source: 'Dynamics 365 Business Central (Posted Sales Invoices & Cr. Memos)',
      extractionMethod: 'AL Extension Codeunit Webhooks & Business Central API Pages (v2.0)',
      middlewareAction: 'Schematron Pre-Validation, UBL 2.1 XML Generation, Cryptographic Stamp & FATOORA API',
      writebackMethod: 'Synchronous Status, Cleared XML Attachment & TLV QR Code Write-Back to BC',
    },
    painPoints: [
      {
        title: 'Missing ZATCA Phase 2 Fields on Standard BC Customer Cards',
        description:
          'Standard Business Central customer and company cards often lack dedicated fields for Saudi National Address components (Building Number, District, Additional Number) and ZATCA tax exemption reason codes.',
      },
      {
        title: 'Preventing Un-Cleared B2B Invoice Distribution',
        description:
          'Under ZATCA Phase 2 rules, a Standard Tax Invoice is not legally valid until cleared by ZATCA. Finance teams need an automated workflow that clears the invoice before emailing or printing.',
      },
      {
        title: 'Credit Memo Billing Reference Rules (BR-KSA-56)',
        description:
          'ZATCA requires every Sales Credit Memo to reference the original invoice number and include a valid issuance reason in the UBL 2.1 XML payload.',
      },
    ],
    technicalCapabilities: [
      {
        title: 'Lightweight AL Extension for Business Central',
        description:
          'Adds required Saudi National Address fields, ZATCA status badges, and one-click or automated post-and-clear actions directly inside Business Central.',
      },
      {
        title: 'Automated B2B Clearance & B2C Reporting',
        description:
          'Routes B2B Posted Sales Invoices to ZATCA’s Clearance API and B2C retail/POS invoices to the Reporting API with full status tracking.',
      },
      {
        title: 'Pre-Flight Customer & VAT Validation',
        description:
          'Checks 15-digit Saudi VAT registration numbers (starting and ending with 3) and buyer address completeness before posting or transmitting to ZATCA.',
      },
      {
        title: 'RDLC & Word Layout QR Code Support',
        description:
          'Stores the generated Phase 2 QR code image and cleared XML against the Posted Sales Invoice record for seamless inclusion on RDLC or Word invoice layouts.',
      },
    ],
    supportedDocumentTypes: [
      'Posted Sales Invoices (Standard B2B & Simplified B2C)',
      'Posted Sales Credit Memos (Linked to Original Invoice Reference)',
      'Sales Debit Notes & Price Adjustments',
      'Prepayment Invoices & Prepayment Credit Memos',
      'Service Module Invoices & Contract Billing',
      'Multi-Currency Export & Zero-Rated Tax Invoices',
    ],
    implementationSteps: [
      {
        step: '01',
        title: 'Business Central Environment & VAT Setup Audit',
        description:
          'Assess your Business Central version (SaaS or On-Premises), VAT Posting Setup, and custom invoice report layouts.',
      },
      {
        step: '02',
        title: 'AL Extension & Middleware Connection',
        description:
          'Deploy the ZATCA fields extension in your Business Central sandbox and connect it to Saky ZATCA Connect.',
      },
      {
        step: '03',
        title: 'CSID Onboarding & Compliance Simulation',
        description:
          'Generate branch CSRs, complete FATOORA compliance checks, and verify credit memo and tax invoice scenarios.',
      },
      {
        step: '04',
        title: 'Production Activation & User Training',
        description:
          'Enable production CSID credentials, train finance users on status monitoring, and provide post-go-live support.',
      },
    ],
    faqs: [
      {
        question: 'Does this integration support both Business Central Cloud (SaaS) and On-Premises?',
        answer:
          'Yes. Saky ZATCA Connect communicates over HTTPS REST APIs and OData v4, supporting both Microsoft-hosted Business Central SaaS tenants and on-premises Dynamics NAV / Business Central deployments.',
      },
      {
        question: 'Can we validate customer VAT numbers and addresses before posting an invoice in Business Central?',
        answer:
          'Yes. Our integration validates mandatory ZATCA Phase 2 buyer fields (15-digit VAT number, street, building number, district, city, postal code, and country code) prior to submission so rejected postings are avoided.',
      },
      {
        question: 'How long does a typical Business Central ZATCA Phase 2 integration take?',
        answer:
          'For standard Business Central sales and credit memo workflows, sandbox connection and CSID onboarding typically complete within 1 to 3 weeks depending on custom report layouts and number of branches.',
      },
    ],
    relatedResources: [
      {
        title: 'Complete ZATCA Phase 2 Integration Guide',
        path: '/resources/zatca-phase-2-guide',
        summary: 'End-to-end technical guide to Saudi Arabia e-invoicing Phase 2 requirements.',
      },
      {
        title: 'ZATCA Wave 25: Requirements & Preparation',
        path: '/resources/zatca-wave-25-2027',
        summary: 'How Saudi businesses in upcoming waves can prepare their ERP systems.',
      },
      {
        title: 'ZATCA Clearance vs Reporting Explained',
        path: '/resources/zatca-clearance-vs-reporting',
        summary: 'Understanding B2B clearance vs B2C reporting rules and mandatory fields.',
      },
    ],
  },
  {
    slug: 'custom-erp-zatca',
    path: '/integrations/custom-erp-zatca',
    title: 'Custom ERP & POS ZATCA Phase 2 API Integration | Saky',
    metaDescription:
      'Connect custom ERP, POS, billing, and legacy software to ZATCA FATOORA Phase 2 via Saky ZATCA Connect REST API. Automate UBL 2.1 XML, CSID signing, and clearance.',
    h1: 'Custom ERP, POS & Billing Software ZATCA Phase 2 API Integration',
    badge: 'REST API & Webhook Middleware',
    erpName: 'Custom ERP, POS & In-House Billing Systems',
    shortName: 'Custom ERP & POS',
    verificationStatus: 'Verified Integration',
    heroSummary:
      'Avoid building complex cryptographic signing, UBL 2.1 XML canonicalization, and SHA-256 hash chaining from scratch. Send simple JSON invoice payloads from your custom ERP or POS to Saky ZATCA Connect, and let our middleware handle ZATCA FATOORA Phase 2.',
    positioningStatement:
      'Your engineering team sends clean JSON. Saky ZATCA Connect handles UBL 2.1 XML, CSID cryptography, QR codes, and ZATCA FATOORA APIs.',
    architectureFlow: {
      source: 'Custom ERP / Retail POS / Hospital HIMS / Travel & Logistics Billing',
      extractionMethod: 'RESTful JSON API (POST /api/v1/invoices) or Database/Queue Connector',
      middlewareAction: 'JSON-to-UBL 2.1 XML Mapping, XSD/Schematron Check, ECDSA Signing & FATOORA Submission',
      writebackMethod: 'JSON Webhook / API Response with Cleared XML, UUID, Hash & Base64 TLV QR Code',
    },
    painPoints: [
      {
        title: 'Complex XML C14N Canonicalization & ECDSA Cryptography',
        description:
          'Implementing ZATCA’s exact XML canonicalization (C14N11), XAdES digital signature tags, secp256k1 ECDSA keys, and 9-tag TLV QR encoding directly inside legacy PHP, .NET, Java, or Node.js billing apps is error-prone and time-consuming.',
      },
      {
        title: 'Strict Sequential Hash Chaining (PIH & ICV)',
        description:
          'Every invoice submitted by an EGS unit must embed the SHA-256 hash of the previous invoice (PIH) and an incrementing Invoice Counter Value (ICV). Concurrent POS terminals or web workers can easily break hash sequences without a serialized signing queue.',
      },
      {
        title: 'Certificate Renewal & Retry Queue Maintenance',
        description:
          'When CSID certificates expire or ZATCA endpoints experience latency, in-house scripts without dead-letter retry queues risk dropping production invoices.',
      },
    ],
    technicalCapabilities: [
      {
        title: 'Developer-Friendly JSON-to-UBL 2.1 API',
        description:
          'Submit standard JSON invoice objects over HTTPS. ZATCA Connect constructs the complete UBL 2.1 XML document with all required `cac:` and `cbc:` namespaces.',
      },
      {
        title: 'Serialized Hash Chain & Counter Management',
        description:
          'Automatically manages the Invoice Counter Value (ICV) and Previous Invoice Hash (PIH) per branch or EGS device, preventing concurrency collisions across multi-branch deployments.',
      },
      {
        title: 'Built-In CSID Portal & Certificate Vault',
        description:
          'Includes an administrative dashboard for CSR generation, OTP compliance onboarding, XML validator testing, and multi-branch certificate status monitoring.',
      },
      {
        title: 'Resilient Queue & Webhook Callbacks',
        description:
          'Handles retry scheduling if upstream connectivity is interrupted or if a branch certificate needs rotation, notifying your application via webhook once cleared.',
      },
    ],
    supportedDocumentTypes: [
      'Standard Tax Invoices (0100000 — B2B / B2G Clearance)',
      'Simplified Tax Invoices (0200000 — B2C POS Reporting)',
      'Standard & Simplified Credit Notes (381)',
      'Standard & Simplified Debit Notes (383)',
      'Prepayment / Advance Receipt Tax Invoices (386)',
      'Multi-Branch & Multi-Terminal Retail / Travel / Healthcare Billing',
    ],
    implementationSteps: [
      {
        step: '01',
        title: 'JSON Payload Contract & Tax Rule Mapping',
        description:
          'Map your existing database invoice fields (seller, buyer, line items, VAT categories S/Z/E/O) to our documented JSON request schema.',
      },
      {
        step: '02',
        title: 'Sandbox API Integration & XML Validation',
        description:
          'Point your staging application to the ZATCA Connect API and validate generated UBL 2.1 XML payloads against ZATCA Schematron rules.',
      },
      {
        step: '03',
        title: 'Branch EGS & CSID Onboarding',
        description:
          'Register each branch or POS group, complete the 6 mandatory ZATCA compliance check invoice types, and issue Production CSIDs.',
      },
      {
        step: '04',
        title: 'Production Cutover & Audit Monitoring',
        description:
          'Switch API keys to production, embed returned QR codes on your customer PDFs/receipts, and monitor real-time clearance logs.',
      },
    ],
    faqs: [
      {
        question: 'What programming languages or databases can integrate with Saky ZATCA Connect?',
        answer:
          'Any system capable of making HTTPS REST requests (.NET, Java, PHP, Python, Node.js, Go, Ruby) or exposing a SQL/webhook feed can integrate. We also support SAP and Oracle landscapes via API middleware.',
      },
      {
        question: 'Does our engineering team need to generate UBL 2.1 XML or cryptographic signatures?',
        answer:
          'No. Your application sends a clean JSON payload with the invoice header, buyer details, and line items. Saky ZATCA Connect generates the UBL 2.1 XML, computes the SHA-256 hash, signs with the branch ECDSA private key, generates the TLV QR code, and communicates with ZATCA.',
      },
      {
        question: 'How does ZATCA Connect handle multi-branch Saudi businesses?',
        answer:
          'Each branch (such as Riyadh, Jeddah, Dammam, or Al Khobar) is configured with its own EGS profile and CSID certificate. You simply pass the `branchId` in your API request and the middleware routes signing and clearance through the correct certificate.',
      },
    ],
    relatedResources: [
      {
        title: 'ZATCA CSID & Production Onboarding Guide',
        path: '/resources/zatca-csid-onboarding',
        summary: 'How CSR generation, compliance checks, and production CSIDs work.',
      },
      {
        title: 'ZATCA Clearance vs Reporting Explained',
        path: '/resources/zatca-clearance-vs-reporting',
        summary: 'Technical comparison of B2B Clearance API and B2C Reporting API.',
      },
      {
        title: 'Complete ZATCA Phase 2 Integration Guide',
        path: '/resources/zatca-phase-2-guide',
        summary: 'Architecture blueprint for connecting ERPs to ZATCA FATOORA.',
      },
    ],
  },
];

export const ZATCA_RESOURCE_ARTICLES: ZatcaResourceArticleData[] = [
  {
    slug: 'zatca-phase-2-guide',
    path: '/resources/zatca-phase-2-guide',
    title: 'Complete ZATCA Phase 2 E-Invoicing Integration Guide (FATOORA) | Saky',
    metaDescription:
      'Technical guide to ZATCA Phase 2 (Integration Phase) in Saudi Arabia: UBL 2.1 XML structure, CSID cryptographic stamping, QR tags, and ERP API connectivity.',
    h1: 'Complete ZATCA Phase 2 (Integration Phase) Technical & ERP Guide',
    badge: 'ZATCA Regulatory & Technical Guide',
    lastReviewed: 'November 1, 2026',
    readingTime: '9 min read',
    executiveSummary:
      'Saudi Arabia’s Zakat, Tax and Customs Authority (ZATCA) Phase 2—known as the Integration Phase—requires VAT-registered taxpayers to integrate their E-Invoice Generation Solutions (EGS) directly with the FATOORA portal using UBL 2.1 XML, cryptographic stamps (CSID), SHA-256 invoice hash chaining, and real-time or 24-hour API transmission.',
    regulatoryNotice:
      'Regulatory Note: ZATCA rolls out Phase 2 integration waves based on annual taxable revenue thresholds. Do not confuse a wave announcement date with your organization’s specific integration deadline—always verify your official ZATCA notification and FATOORA portal status.',
    sections: [
      {
        id: 'phase-1-vs-phase-2',
        heading: '1. ZATCA Phase 1 (Generation) vs. Phase 2 (Integration)',
        paragraphs: [
          'Phase 1 (effective December 4, 2021) required taxpayers to stop issuing handwritten or unstructured invoices and generate electronic invoices containing basic mandatory fields and a 5-tag Base64 QR code on B2C receipts.',
          'Phase 2 (the Integration Phase, rolled out in waves starting January 1, 2023) introduces strict technical and cryptographic requirements. Every invoice must be structured in ZATCA-compliant UBL 2.1 XML, linked to the preceding invoice via a SHA-256 Previous Invoice Hash (PIH), stamped with a Cryptographic Stamp Identifier (CSID) issued by ZATCA, and transmitted to ZATCA’s FATOORA APIs.',
        ],
        codeOrTable: {
          caption: 'Comparison of ZATCA Phase 1 and Phase 2 Technical Requirements',
          headers: ['Requirement Area', 'Phase 1 (Generation Phase)', 'Phase 2 (Integration Phase)'],
          rows: [
            ['Invoice Format', 'Any electronic format (PDF, print)', 'Mandatory UBL 2.1 XML (or PDF/A-3 with embedded XML)'],
            ['ZATCA Connectivity', 'Offline (no API transmission required)', 'Direct API integration with ZATCA FATOORA portal'],
            ['Cryptographic Stamp', 'Not required in Phase 1', 'Mandatory ECDSA cryptographic signature via ZATCA CSID'],
            ['Invoice Chaining', 'Standard sequential numbering', 'Mandatory Invoice Counter Value (ICV) + Previous Invoice Hash (PIH)'],
            ['QR Code Structure', '5 TLV tags (Seller, VAT, Timestamp, Total, VAT Amt)', '9 TLV tags (adds XML Hash, ECDSA Signature, Public Key & Certificate Signature)'],
          ],
        },
      },
      {
        id: 'core-xml-and-cryptography',
        heading: '2. Core Technical Pillars: UBL 2.1 XML, PIH Chaining & TLV QR',
        paragraphs: [
          'Under Phase 2, an ERP cannot simply generate a visual PDF. The system must first construct a canonicalized UBL 2.1 XML document adhering to ZATCA’s Data Dictionary and Schematron validation rules (BR-KSA-*).',
          'Each E-Invoice Generation Solution (EGS) unit maintains an immutable chain of invoices. The first invoice uses a base64-encoded SHA-256 hash of "0" as its Previous Invoice Hash (PIH), and every subsequent invoice embeds the SHA-256 digest of the immediately preceding XML invoice.',
        ],
        bullets: [
          'UUID (Universally Unique Identifier): A RFC 4122 UUID v4 generated uniquely for every tax document.',
          'ICV (Invoice Counter Value): A strictly incrementing integer counter maintained per EGS unit without gaps.',
          'PIH (Previous Invoice Hash): Cryptographic link preventing retroactive deletion or tampering of historical invoices.',
          'ECDSA Digital Signature: Generated using the private key paired with the EGS unit’s ZATCA-issued CSID certificate.',
        ],
      },
      {
        id: 'erp-integration-architecture',
        heading: '3. Why Enterprises Use Middleware Between Their ERP and ZATCA',
        paragraphs: [
          'Core ERP platforms—such as Microsoft Dynamics 365, SAP, Oracle, and custom sector-specific billing systems—are designed for accounting ledgers and operational workflows, not real-time cryptographic XML signing and authority API retry management.',
          'Deploying dedicated middleware like Saky ZATCA Connect decouples statutory e-invoicing cryptography from your core ERP upgrade cycle. Your ERP continues posting invoices normally while the middleware transforms payloads into UBL 2.1 XML, runs pre-flight Schematron validations, communicates with FATOORA, and returns the cleared XML and QR code.',
        ],
      },
    ],
    officialReferences: [
      {
        title: 'ZATCA E-Invoicing (FATOORA) Portal & Technical Guidelines',
        url: 'https://zatca.gov.sa/en/E-Invoicing/Pages/default.aspx',
        publisher: 'Zakat, Tax and Customs Authority (ZATCA)',
      },
      {
        title: 'ZATCA E-Invoicing Detailed Technical Guideline & XML Implementation Standards',
        url: 'https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Pages/default.aspx',
        publisher: 'Zakat, Tax and Customs Authority (ZATCA)',
      },
    ],
    faqs: [
      {
        question: 'Does Phase 2 apply to both B2B and B2C transactions in Saudi Arabia?',
        answer:
          'Yes. Standard Tax Invoices (B2B/B2G) require real-time API clearance from ZATCA prior to issuance, while Simplified Tax Invoices (B2C) must be cryptographically signed and reported to ZATCA within 24 hours.',
      },
      {
        question: 'Can we keep our existing ERP and still meet Phase 2 requirements?',
        answer:
          'Yes. Using integration middleware such as Saky ZATCA Connect allows you to keep your existing Microsoft Dynamics 365, SAP, Oracle, or custom ERP and connect it to ZATCA FATOORA via API.',
      },
    ],
  },
  {
    slug: 'zatca-wave-25-2027',
    path: '/resources/zatca-wave-25-2027',
    title: 'ZATCA Wave 25 Requirements & ERP Integration Preparation | Saky',
    metaDescription:
      'Understand ZATCA Phase 2 Wave 25 criteria in Saudi Arabia, why notification dates differ from integration deadlines, and how to prepare your ERP system.',
    h1: 'ZATCA Wave 25: Eligibility, Timeline Verification & ERP Readiness Guide',
    badge: 'ZATCA Wave Readiness',
    lastReviewed: 'November 1, 2026',
    readingTime: '7 min read',
    executiveSummary:
      'As ZATCA expands Phase 2 (Integration Phase) across progressively lower annual VAT-taxable revenue brackets—including Wave 25 and subsequent rollout groups—Saudi businesses must prepare their ERP, POS, and billing systems well ahead of their assigned integration window.',
    regulatoryNotice:
      'Important Compliance Distinction: Do not confuse a ZATCA wave announcement date or notification date with your company’s final integration deadline. Each wave specifies a revenue threshold and an integration window; businesses must verify their exact obligation date directly via official ZATCA notifications and the FATOORA portal.',
    sections: [
      {
        id: 'understanding-zatca-waves',
        heading: '1. How ZATCA Phase 2 Integration Waves Work',
        paragraphs: [
          'ZATCA implements the Phase 2 Integration Phase in sequential waves determined by the taxpayer’s annual taxable revenue subject to VAT in historical reference years (such as 2021, 2022, 2023, or 2024).',
          'For each wave, ZATCA announces the revenue threshold at least six months prior to the mandatory integration window. Taxpayers falling within the announced revenue threshold receive official notifications from ZATCA instructing them to complete FATOORA onboarding within their assigned start and end dates.',
        ],
      },
      {
        id: 'notification-vs-deadline',
        heading: '2. Notification Date vs. Actual Integration Deadline',
        paragraphs: [
          'A common mistake among finance and IT teams is treating the date of ZATCA’s public announcement—or the date an email notice arrives—as the final cutover date, or conversely waiting until the final week of the integration window to begin technical work.',
          'Because ZATCA provides a Sandbox and Simulation environment on the FATOORA portal, businesses should use the preparation period to audit customer master data, configure ERP tax codes, test UBL 2.1 XML generation, and complete Compliance CSID checks before switching to Production CSIDs.',
        ],
        bullets: [
          'Step 1 — Verify Your Status: Log in to the ZATCA portal and check official correspondence for your VAT Registration Number (TRN).',
          'Step 2 — Audit All EGS Units: Identify every ERP module, branch billing system, and POS system that issues tax invoices or credit/debit notes.',
          'Step 3 — Cleanse Customer Master Data: Ensure B2B customer records contain valid 15-digit VAT numbers and full Saudi National Address fields.',
          'Step 4 — Complete Simulation Testing Early: Run compliance checks in ZATCA Simulation before activating Production CSIDs.',
        ],
      },
      {
        id: 'erp-preparation-checklist',
        heading: '3. Technical Readiness Checklist for Wave 25 Taxpayers',
        paragraphs: [
          'For mid-market and growing Saudi enterprises included in Wave 25 and adjacent waves, ERP readiness typically stalls on master data completeness and credit/debit note linkage rather than network connectivity.',
        ],
        codeOrTable: {
          caption: 'ERP Preparation Checklist Prior to ZATCA Phase 2 Go-Live',
          headers: ['Checklist Domain', 'Required Action in ERP / POS', 'ZATCA Rule Reference'],
          rows: [
            ['Seller & Branch Identity', 'Verify 15-digit VAT number, CRN, and National Address for every branch', 'BR-KSA-08 / BR-KSA-09'],
            ['B2B Buyer Master Data', 'Enforce buyer 15-digit VAT number (for VAT-registered buyers) and full structured address', 'BR-KSA-81 / BR-10'],
            ['Credit & Debit Notes', 'Enforce original invoice reference number and issuance reason on all adjustments', 'BR-KSA-56 / BR-KSA-17'],
            ['VAT Exemption Reasons', 'Map zero-rated (Z), exempt (E), and out-of-scope (O) tax codes to official ZATCA reason codes', 'BR-KSA-DEC-01'],
          ],
        },
      },
    ],
    officialReferences: [
      {
        title: 'ZATCA Phase 2 Rollout Waves & Official Announcements',
        url: 'https://zatca.gov.sa/en/E-Invoicing/Introduction/Rolloutphases/Pages/Rollout-Phases.aspx',
        publisher: 'Zakat, Tax and Customs Authority (ZATCA)',
      },
      {
        title: 'ZATCA FATOORA Developer & Simulation Portal Information',
        url: 'https://zatca.gov.sa/en/E-Invoicing/SystemsDevelopers/Pages/default.aspx',
        publisher: 'Zakat, Tax and Customs Authority (ZATCA)',
      },
    ],
    faqs: [
      {
        question: 'How do we confirm whether our company falls under ZATCA Wave 25?',
        answer:
          'Check your annual VAT-taxable revenue against ZATCA’s official Rollout Phases page on zatca.gov.sa and review official notifications sent to your registered ZATCA portal account and email.',
      },
      {
        question: 'Can we integrate with ZATCA Phase 2 before our mandatory wave deadline?',
        answer:
          'Yes. ZATCA permits voluntary early onboarding in the FATOORA simulation and production portals, allowing your IT and finance teams to complete integration without deadline pressure.',
      },
    ],
  },
  {
    slug: 'zatca-csid-onboarding',
    path: '/resources/zatca-csid-onboarding',
    title: 'ZATCA CSID Onboarding & CSR Generation Guide | Saky Technologies',
    metaDescription:
      'Step-by-step technical guide to ZATCA CSID onboarding: CSR generation, FATOORA OTP verification, Compliance CSID checks, and Production CSID lifecycle.',
    h1: 'ZATCA CSID Onboarding, CSR Generation & Certificate Lifecycle Guide',
    badge: 'Cryptographic Onboarding Guide',
    lastReviewed: 'November 1, 2026',
    readingTime: '8 min read',
    executiveSummary:
      'Every E-Invoice Generation Solution (EGS) unit in Saudi Arabia must obtain a Cryptographic Stamp Identifier (CSID) from ZATCA before it can clear or report Phase 2 invoices. This guide explains the technical lifecycle from Certificate Signing Request (CSR) generation to Production CSID renewal.',
    regulatoryNotice:
      'Technical Note: Each distinct EGS unit or branch billing system requires its own CSR configuration and CSID lifecycle. Never share private keys across unrelated legal entities.',
    sections: [
      {
        id: 'what-is-csid',
        heading: '1. What Is a ZATCA Cryptographic Stamp Identifier (CSID)?',
        paragraphs: [
          'A Cryptographic Stamp Identifier (CSID) is an X.509 digital certificate issued by ZATCA’s FATOORA Certificate Authority using Elliptic Curve Cryptography (`secp256k1`). It authenticates your EGS unit when calling ZATCA’s Clearance and Reporting APIs and is used to sign simplified tax invoices and generate Phase 2 QR codes.',
          'ZATCA uses a two-stage certificate issuance model: first a **Compliance CSID (CCSID)** used to verify that your system generates valid UBL 2.1 XML payloads, followed by a **Production CSID (PCSID)** used for live commercial transactions.',
        ],
      },
      {
        id: 'four-step-onboarding-flow',
        heading: '2. The 4-Step CSID Onboarding Workflow',
        paragraphs: [
          'Onboarding an ERP or POS unit to ZATCA FATOORA follows a deterministic four-step cryptographic handshake:',
        ],
        codeOrTable: {
          caption: 'ZATCA FATOORA CSID Onboarding Sequence',
          headers: ['Step', 'Technical Operation', 'Input & Output Artifacts'],
          rows: [
            ['1. CSR Generation', 'Generate ECDSA secp256k1 keypair and CSR with ZATCA OID extensions', 'Input: Organization VAT, Branch Name, Invoice Type (1100/1000/0100). Output: Private Key + .csr'],
            ['2. Compliance CSID (CCSID)', 'Submit CSR + 6-digit FATOORA portal OTP to /compliance endpoint', 'Input: Base64 CSR + OTP Header. Output: binarySecurityToken (CCSID) + Secret'],
            ['3. Compliance Invoice Checks', 'Submit sample Standard, Simplified, Credit & Debit XMLs to /compliance/invoices', 'Input: Signed UBL 2.1 XMLs. Output: PASS validation results for required document types'],
            ['4. Production CSID (PCSID)', 'Exchange validated CCSID at /production/csids endpoint', 'Input: CCSID credentials + request_id. Output: Production binarySecurityToken (PCSID) + Secret'],
          ],
        },
      },
      {
        id: 'certificate-renewal-and-revocation',
        heading: '3. Production CSID Renewal, Expiration & Multi-Branch Operations',
        paragraphs: [
          'Production CSIDs have a defined validity period and can also be revoked on the FATOORA portal if a device is decommissioned or re-keyed. If an active certificate expires or is missing for a branch, ZATCA API calls will fail until a valid PCSID is provisioned.',
          'Saky ZATCA Connect centralizes CSID management across all branches—monitoring certificate status, automating CSR generation per branch, and alerting administrators prior to certificate expiration.',
        ],
      },
    ],
    officialReferences: [
      {
        title: 'ZATCA E-Invoicing Security Features Implementation Standards',
        url: 'https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Pages/default.aspx',
        publisher: 'Zakat, Tax and Customs Authority (ZATCA)',
      },
      {
        title: 'ZATCA FATOORA Onboarding & Developer Portal Documentation',
        url: 'https://zatca.gov.sa/en/E-Invoicing/SystemsDevelopers/Pages/default.aspx',
        publisher: 'Zakat, Tax and Customs Authority (ZATCA)',
      },
    ],
    faqs: [
      {
        question: 'What does the Invoice Type flag (e.g. 1100, 1000, 0100) in the ZATCA CSR mean?',
        answer:
          'The 4-digit CSR title/functionality flag specifies which invoice types the EGS unit will issue: the first digit indicates Standard Tax Invoices (B2B) and the second digit indicates Simplified Tax Invoices (B2C). A value of 1100 means the EGS issues both Standard and Simplified invoices.',
      },
      {
        question: 'How long is a ZATCA FATOORA OTP valid during CSID onboarding?',
        answer:
          'The 6-digit One-Time Password (OTP) generated in the ZATCA FATOORA portal is valid for 1 hour and can only be used once to issue a single CSID.',
      },
    ],
  },
  {
    slug: 'zatca-clearance-vs-reporting',
    path: '/resources/zatca-clearance-vs-reporting',
    title: 'ZATCA Clearance vs Reporting API Explained (B2B vs B2C) | Saky',
    metaDescription:
      'Detailed comparison of ZATCA Phase 2 Clearance API (Standard B2B Tax Invoices) vs Reporting API (Simplified B2C Tax Invoices), mandatory fields, and QR rules.',
    h1: 'ZATCA Clearance vs. Reporting Explained: B2B Standard vs. B2C Simplified Invoices',
    badge: 'ZATCA API & Validation Guide',
    lastReviewed: 'November 1, 2026',
    readingTime: '8 min read',
    executiveSummary:
      'In ZATCA Phase 2, Saudi Arabia enforces two distinct API transmission models depending on the transaction type: real-time synchronous Clearance for Standard Tax Invoices (B2B/B2G) and asynchronous Reporting within 24 hours for Simplified Tax Invoices (B2C). Understanding the validation rules for each workflow is essential for ERP configuration.',
    regulatoryNotice:
      'Validation Reminder: Configure your ERP validations separately for B2B (VAT-registered buyers), B2C (Individual/Walk-in customers), and non-VAT-registered corporate buyers to align with ZATCA rules BR-10 and BR-KSA-81.',
    sections: [
      {
        id: 'clearance-vs-reporting-matrix',
        heading: '1. Side-by-Side Comparison: Clearance API vs. Reporting API',
        paragraphs: [
          'ZATCA distinguishes between Standard Tax Invoices (Type Code `388` with subtype `0100000`, typically B2B or B2G) and Simplified Tax Invoices (Type Code `388` with subtype `0200000`, typically B2C retail or point-of-sale).',
        ],
        codeOrTable: {
          caption: 'ZATCA Phase 2 Clearance vs. Reporting Workflow Comparison',
          headers: ['Dimension', 'Standard Tax Invoice (Clearance)', 'Simplified Tax Invoice (Reporting)'],
          rows: [
            ['Primary Use Case', 'B2B & B2G transactions', 'B2C retail, POS, and walk-in transactions'],
            ['XML Subtype Code', '0100000', '0200000'],
            ['API Transmission Timing', 'Real-time synchronous prior to sharing with buyer', 'Asynchronous within 24 hours of issuance'],
            ['Who Applies Final Stamp & QR?', 'ZATCA FATOORA clears XML, embeds stamp & returns QR', 'Taxpayer EGS signs XML & generates 9-tag QR locally before printing'],
            ['Legal Validity Condition', 'Valid only after receiving CLEARED status from ZATCA', 'Issued immediately to customer with EGS cryptographic stamp'],
          ],
        },
      },
      {
        id: 'mandatory-buyer-fields',
        heading: '2. Mandatory Buyer Fields: VAT Number & Client Address (B2B vs. B2C)',
        paragraphs: [
          'One of the most frequent causes of ZATCA rejection errors (`BR-10`, `BR-KSA-09`, `BR-KSA-81`, `BR-KSA-46`) is misconfigured buyer master data validation in the source ERP.',
          'For Standard Tax Invoices (`0100000`), the buyer’s full structured address (`cac:AccountingCustomerParty/cac:Party/cac:PostalAddress`) is strictly mandatory under `BR-10`. Additionally, if the buyer is a VAT-registered corporate business in KSA, their 15-digit VAT Registration Number (`BT-48`, starting and ending with `3`) is mandatory under `BR-KSA-81`. If a corporate buyer is not VAT-registered (or is a foreign buyer), an alternative Buyer Other ID (`BT-46`, such as Commercial Registration `CRN` or `MOM` license) must be supplied.',
          'For Simplified Tax Invoices (`0200000` — B2C individual/walk-in customers), neither the Buyer VAT Registration Number nor the Buyer Address is mandatory in the UBL 2.1 XML.',
        ],
        codeOrTable: {
          caption: 'Mandatory Field Validation Matrix by Customer Type',
          headers: ['Field', 'B2B (VAT-Registered)', 'Corporate (Non-VAT Registered)', 'B2C (Individual / Walk-in)'],
          rows: [
            ['Invoice Workflow', 'Standard (0100000 — Clearance)', 'Standard (0100000 — Clearance)', 'Simplified (0200000 — Reporting)'],
            ['Buyer 15-Digit VAT Number', 'Mandatory (BR-KSA-81)', 'Not Applicable (Supply CRN / Other ID in BT-46)', 'Optional / Not Required'],
            ['Buyer National Address', 'Mandatory (Street, Building, District, City, 5-Digit Zip, SA)', 'Mandatory (BR-10)', 'Optional / Not Required'],
          ],
        },
      },
      {
        id: 'handling-warnings-and-rejections',
        heading: '3. Handling ZATCA API Statuses: CLEARED, REPORTED, WARNING & REJECTED',
        paragraphs: [
          'Both the Clearance and Reporting APIs return structured validation results. A status of `CLEARED` (HTTP 200) or `REPORTED` (HTTP 200) may also include non-blocking `WARNING` messages (HTTP 202), which indicate minor specification advisories that should be remediated in your ERP mapping.',
          'A `REJECTED` status (HTTP 400) means the invoice failed a mandatory XSD or Schematron `ERROR` rule and was not accepted by ZATCA. Arejected invoice must be corrected and resubmitted rather than distributed to a B2B customer.',
        ],
      },
    ],
    officialReferences: [
      {
        title: 'ZATCA Electronic Invoice XML Implementation Standard & Data Dictionary',
        url: 'https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Pages/default.aspx',
        publisher: 'Zakat, Tax and Customs Authority (ZATCA)',
      },
    ],
    faqs: [
      {
        question: 'Is Buyer Address mandatory for both B2B and B2C invoices in ZATCA Phase 2?',
        answer:
          'No. Buyer Address is strictly mandatory for Standard Tax Invoices (0100000 — B2B and corporate invoices) under rule BR-10, including Street, Building Number, District, City, 5-digit Postal Code (for KSA), and Country Code. For Simplified Tax Invoices (0200000 — B2C walk-in customers), Buyer Address is optional.',
      },
      {
        question: 'Can we send a Standard B2B invoice to the Reporting API instead of the Clearance API?',
        answer:
          'No. ZATCA’s API endpoints enforce invoice subtype rules: Standard Tax Invoices (0100000) must be sent to the Clearance API, while Simplified Tax Invoices (0200000) must be sent to the Reporting API.',
      },
    ],
  },
];

// Section 8: Arabic SEO Architecture Preparation (Unpublished until native Saudi Arabic review)
export const ARABIC_SEO_PREPARATION_REGISTRY: ArabicRoutePreparation[] = [
  {
    enPath: '/products/zatca-connect',
    arPath: '/ar/products/zatca-connect',
    published: false,
    hreflangEn: 'en-SA',
    hreflangAr: 'ar-SA',
    arTitleDraft: '[Draft — Pending Native Saudi Arabic Review] ربط الفوترة الإلكترونية (فاتورة المرحلة الثانية) مع أنظمة ERP | Saky',
    arDescriptionDraft:
      '[Draft — Pending Native Saudi Arabic Review] حلول الربط والتكامل مع هيئة الزكاة والضريبة والجمارك (فاتورة المرحلة الثانية) لأنظمة Microsoft Dynamics و SAP و Oracle والأنظمة المخصصة.',
    targetKeywordsAr: [
      'الفوترة الإلكترونية السعودية',
      'برنامج الفوترة الإلكترونية',
      'نظام الفوترة الإلكترونية',
      'ربط الفوترة الإلكترونية مع فاتورة',
      'الربط والتكامل مع هيئة الزكاة والضريبة والجمارك',
      'تكامل نظام ERP مع فاتورة',
    ],
    editorialStatus: 'awaiting_native_saudi_arabic_review',
  },
  {
    enPath: '/resources/zatca-phase-2-guide',
    arPath: '/ar/resources/zatca-phase-2-guide',
    published: false,
    hreflangEn: 'en-SA',
    hreflangAr: 'ar-SA',
    arTitleDraft: '[Draft — Pending Native Saudi Arabic Review] دليل الربط والتكامل مع المرحلة الثانية للفوترة الإلكترونية (فاتورة) | Saky',
    arDescriptionDraft:
      '[Draft — Pending Native Saudi Arabic Review] الدليل التقني الشامل لمتطلبات المرحلة الثانية من الفوترة الإلكترونية في المملكة العربية السعودية.',
    targetKeywordsAr: [
      'الربط والتكامل مع هيئة الزكاة والضريبة والجمارك',
      'ربط الفوترة الإلكترونية مع فاتورة',
      'تكامل نظام ERP مع فاتورة',
    ],
    editorialStatus: 'awaiting_native_saudi_arabic_review',
  },
];

export function getZatcaIntegrationBySlug(slug: string): ZatcaIntegrationPageData | undefined {
  return ZATCA_INTEGRATION_PAGES.find((p) => p.slug === slug);
}

export function getZatcaResourceBySlug(slug: string): ZatcaResourceArticleData | undefined {
  return ZATCA_RESOURCE_ARTICLES.find((a) => a.slug === a.slug && a.slug === slug);
}


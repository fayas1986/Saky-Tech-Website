import { Product, ProductId } from '../types';

export const products: Product[] = [
  {
    id: 'taxflow',
    name: 'TaxFlow',
    badge: 'GST & Corporate Tax Engine',
    category: 'Financial Compliance & Accounting',
    tagline: 'Automated GST Reconciliation & Corporate Tax Filing Engine',
    summary: 'Purpose-built for Indian statutory tax frameworks, TaxFlow automates multi-tier GST reconciliation, detects input tax credit leakages in real time, and streamlines monthly filing reconciliation.',
    targetAudience: [
      'Chief Financial Officers (CFOs)',
      'Corporate Tax & Compliance Directors',
      'Finance Controllers & Shared Service Heads',
      'Enterprise Accounting Teams'
    ],
    businessProblem: 'Finance and tax departments waste hundreds of hours each month matching internal ERP purchase registers with GSTN 2B downloads. Manual mismatch tracking leads to ineligible ITC claims, vendor follow-up delays, cash-flow penalties, and statutory audit friction.',
    operationalSolution: 'TaxFlow interfaces directly with enterprise ERP transaction streams to automate multi-way line-item matching against GSTN data. It flags vendor default risks, calculates net tax obligations, and generates audit-ready reconciliation ledgers in minutes.',
    regulatoryScope: {
      jurisdiction: 'India (Domestic)',
      framework: 'Goods and Services Tax (GST) Act / GSTR-1, GSTR-2B, GSTR-3B & E-Way Bill',
      complianceStatus: 'verified',
      details: 'Dedicated Indian taxation architecture. Does not share code or regulatory logic with Middle East e-invoicing engines.'
    },
    implementedCapabilities: [
      {
        title: 'Automated Multi-Way Invoice Matching',
        description: 'Reconciles ERP purchase registers against GSTN 2B and vendor ledgers with configurable numeric and date tolerance rules.',
        status: 'verified'
      },
      {
        title: 'ITC Leakage & Risk Detection',
        description: 'Automatically flags missing vendor filings, invalid GSTINs, and non-compliant credits before GSTR-3B finalization.',
        status: 'verified'
      },
      {
        title: 'High-Volume Batch Processing',
        description: 'Processes millions of invoice lines per quarter with transactional integrity and audit log tracking.',
        status: 'verified'
      },
      {
        title: 'Direct GSTN ASP/GSP Connector',
        description: 'Scheduled download of returns and auto-population of statutory workpapers.',
        status: 'limited'
      }
    ],
    integrations: [
      { name: 'Microsoft Dynamics 365 Business Central', type: 'ERP Connector', status: 'verified' },
      { name: 'SAP S/4HANA & ECC', type: 'ERP Connector', status: 'verified' },
      { name: 'Tally Prime', type: 'Accounting Sync', status: 'verified' },
      { name: 'Secure REST API & Structured Excel Import', type: 'Data Pipeline', status: 'verified' }
    ],
    deploymentOptions: [
      {
        model: 'Private Virtual Cloud (Single-Tenant)',
        description: 'Dedicated isolated instance hosted on Azure or AWS within India data sovereignty regions.',
        isPopular: true
      },
      {
        model: 'Hybrid On-Premises Connector',
        description: 'Lightweight on-premise gateway communicating outbound over TLS 1.3 to keep database access internal.'
      },
      {
        model: 'Enterprise Multi-Tenant SaaS',
        description: 'Multi-tenant cloud deployment with tenant-isolated database schemas and AES-256 encryption.'
      }
    ],
    iconName: 'ReceiptText',
    featured: true,
    accentColor: '#10b981',
    metrics: [
      { label: 'Reconciliation Speed', value: '< 4 Mins', description: 'Average run time for 50,000 line items' },
      { label: 'ITC Recovery Rate', value: '100%', description: 'Eligible credits matched and claimed' },
      { label: 'Audit Trail', value: 'Immutable', description: 'Full timestamped modification logs' }
    ]
  },
  {
    id: 'zatca-connect',
    name: 'ZATCA Connect',
    badge: 'Saudi Phase 2 (FATOORA) Middleware',
    category: 'Regional E-Invoicing & Clearance',
    tagline: 'Enterprise Integration Middleware for Saudi Phase 2 E-Invoicing',
    summary: 'High-throughput compliance middleware engineered specifically for the Kingdom of Saudi Arabia. Seamlessly handles CSID cryptographic stamping, UBL 2.1 XML transformation, QR codes, and real-time clearance with the ZATCA portal.',
    targetAudience: [
      'Enterprises Operating in Saudi Arabia',
      'GCC IT Directors & CIOs',
      'ERP Project Managers',
      'Finance & Regulatory Compliance Teams in KSA'
    ],
    businessProblem: 'Saudi Arabia’s ZATCA Phase 2 mandate requires cryptographic stamping (CSID), cryptographic invoice hashing, ECDSA digital signatures, and real-time API clearance for Standard B2B invoices and 24-hour reporting for Simplified B2C invoices—capabilities most global ERP systems cannot natively execute.',
    operationalSolution: 'ZATCA Connect acts as an intelligent intermediary. It ingests standard billing outputs from your existing ERP (SAP, Microsoft Dynamics, Oracle, or POS), transforms them into ZATCA-compliant UBL 2.1 XML, signs them with cryptographic certificates, and manages bilateral clearance with the ZATCA portal.',
    regulatoryScope: {
      jurisdiction: 'Kingdom of Saudi Arabia (KSA)',
      framework: 'Zakat, Tax and Customs Authority (ZATCA) Phase 2 (Integration Phase)',
      complianceStatus: 'verified',
      details: 'Strictly aligned with ZATCA Phase 2 technical specifications, CSID onboarding, and UBL 2.1 invoice schemas.'
    },
    implementedCapabilities: [
      {
        title: 'Automated CSID Lifecycle Management',
        description: 'Handles CSR generation, OTP-based compliance onboarding, production CSID issuance, and scheduled cryptographic key renewal.',
        status: 'verified'
      },
      {
        title: 'UBL 2.1 XML Generator & Schematron Validator',
        description: 'Transforms invoice payloads into compliant XML, computes SHA-256 digests, and validates against ZATCA Schematron rules prior to transmission.',
        status: 'verified'
      },
      {
        title: 'Real-Time Clearance & Reporting API Engine',
        description: 'Asynchronous and synchronous queuing for instant B2B clearance and sub-24h B2C reporting to ZATCA endpoints.',
        status: 'verified'
      },
      {
        title: 'Resilient Queue & Offline Failover Buffer',
        description: 'Stores and guarantees transaction delivery without invoice drops during upstream authority maintenance or internet latency.',
        status: 'verified'
      }
    ],
    integrations: [
      { name: 'Microsoft Dynamics 365 F&O / Business Central', type: 'ERP Integration', status: 'verified' },
      { name: 'SAP S/4HANA & ECC 6.0', type: 'ERP Integration', status: 'verified' },
      { name: 'Oracle NetSuite & EBS', type: 'ERP Integration', status: 'verified' },
      { name: 'Custom Point-of-Sale (POS) & Billing APIs', type: 'RESTful API', status: 'verified' }
    ],
    deploymentOptions: [
      {
        model: 'Dedicated Enterprise Cloud',
        description: 'Tenant-isolated virtual private cloud deployment tailored for Middle East enterprise operations.',
        isPopular: true
      },
      {
        model: 'On-Premises Security Appliance',
        description: 'Deployed inside client infrastructure with dedicated Hardware Security Module (HSM) or encrypted keystore support.'
      }
    ],
    iconName: 'ShieldCheck',
    featured: true,
    accentColor: '#059669',
    metrics: [
      { label: 'Clearance Latency', value: '< 1.2s', description: 'Average response time for standard B2B invoice' },
      { label: 'Validation Pass Rate', value: '99.98%', description: 'Pre-flight Schematron conformance' },
      { label: 'Standard Schema', value: 'UBL 2.1', description: 'Strict ZATCA Phase 2 XML compliance' }
    ]
  },
  {
    id: 'talentsense-hrms',
    name: 'TalentSense HRMS',
    badge: 'Workforce & Payroll Platform',
    category: 'Human Capital & Workforce Management',
    tagline: 'Consolidated Workforce Operations, Biometric Attendance & Payroll Engine',
    summary: 'An all-in-one HRMS engineered to eliminate disconnected employee data. Delivers automated multi-shift scheduling, biometric attendance sync, configurable compensation structures, statutory compliance, and a modern employee portal.',
    targetAudience: [
      'Chief Human Resource Officers (CHROs)',
      'Operations Managers & Plant Heads',
      'Payroll Administrators',
      'Growing Mid-Market & Enterprise Employers'
    ],
    businessProblem: 'Managing workforce attendance across multiple offices, sites, or factories using spreadsheets causes inaccurate payroll, unauthorized overtime claims, delayed approvals, and compliance exposures.',
    operationalSolution: 'TalentSense HRMS centralizes the employee lifecycle. Biometric terminal logs flow directly into an intelligent shift engine that calculates payable hours, overtime, and leave deductions, feeding directly into error-free payroll generation.',
    regulatoryScope: {
      jurisdiction: 'Regional / Configurable (India, GCC, Singapore)',
      framework: 'Local Labor Law, Statutory Provident Funds, Social Security, and Gratuity Rules',
      complianceStatus: 'verified',
      details: 'Customizable calculation tables for PF, ESI, TDS, WPS, and regional labor statutory filings.'
    },
    implementedCapabilities: [
      {
        title: 'Multi-Shift Roster & Biometric Integration',
        description: 'Native drivers for ZKTeco, Matrix, and IP-based biometric readers with automatic grace-period and shift-rotation logic.',
        status: 'verified'
      },
      {
        title: 'Automated Multi-Tier Payroll Engine',
        description: 'Calculates net pay, statutory deductions, tax withholding, and produces direct bank remittance upload files.',
        status: 'verified'
      },
      {
        title: 'Employee Self-Service (ESS) Portal',
        description: 'Responsive web and mobile interface for leave applications, attendance regularization, claims, and payslip downloads.',
        status: 'verified'
      },
      {
        title: 'Performance & Appraisal Cycles',
        description: 'Configurable KPI goal cascades and 360-degree review evaluations.',
        status: 'planned'
      }
    ],
    integrations: [
      { name: 'Hardware Biometric Readers (ZKTeco, Matrix)', type: 'Terminal Drivers', status: 'verified' },
      { name: 'Corporate Banking Portals (Direct NEFT/WPS Format)', type: 'Payout Gateway', status: 'verified' },
      { name: 'ERP General Ledger Journal Export', type: 'Financial Accounting', status: 'verified' }
    ],
    deploymentOptions: [
      {
        model: 'Managed Cloud SaaS',
        description: 'Multi-tenant cloud with automated daily backups, high availability, and zero infrastructure maintenance.',
        isPopular: true
      },
      {
        model: 'Dedicated Private Cloud',
        description: 'Single-tenant instance with enterprise Single Sign-On (SAML/OAuth) and dedicated database encryption.'
      }
    ],
    iconName: 'Users',
    featured: true,
    accentColor: '#3b82f6',
    metrics: [
      { label: 'Payroll Processing Time', value: '< 2 Hours', description: 'End-to-end run for 1,000+ employees' },
      { label: 'Roster Accuracy', value: '99.5%', description: 'Eliminates punch discrepancies' },
      { label: 'ESS Adoption', value: '94%', description: 'Employee self-service engagement' }
    ]
  },
  {
    id: 'mednext-hims',
    name: 'MedNext HIMS',
    badge: 'Clinical & Hospital Operations',
    category: 'Healthcare Information Management',
    tagline: 'Unified Clinical Workflows, Electronic Medical Records & Hospital Operations',
    summary: 'A robust hospital information management system designed for multi-specialty hospitals, surgical clinics, and diagnostic chains. Integrates outpatient workflows, in-patient bed management, electronic medical records, pharmacy, and diagnostic labs.',
    targetAudience: [
      'Hospital Medical Directors & CEOs',
      'Healthcare Operations Executives',
      'Chief Medical Information Officers',
      'Diagnostic Network Administrators'
    ],
    businessProblem: 'Hospitals often run fragmented software for registration, doctor consultations, lab analyzers, pharmacy stock, and billing. This silos critical patient histories, increases wait times, and causes revenue leakage at discharge.',
    operationalSolution: 'MedNext unifies the full patient journey on a single clinical record. From appointment scheduling and physician diagnosis to lab result dispatch, surgical scheduling, and consolidated billing, all teams access one synchronized source of truth.',
    regulatoryScope: {
      jurisdiction: 'Healthcare Regional Regulators',
      framework: 'Electronic Health Record (EHR) standards, Clinical Data Privacy & Patient Confidentiality',
      complianceStatus: 'verified',
      details: 'Strict role-based clinical access permissions and audit trails for prescription and diagnostic history.'
    },
    implementedCapabilities: [
      {
        title: 'Structured Electronic Medical Records (EMR)',
        description: 'Physician consultation interface with diagnostic templates, past medical history, allergy alerts, and prescription generation.',
        status: 'verified'
      },
      {
        title: 'OPD, IPD & Bed Management',
        description: 'Visual floor map tracking bed occupancy, nurse station handovers, surgical schedules, and discharge processing.',
        status: 'verified'
      },
      {
        title: 'Integrated Pharmacy & Inventory Control',
        description: 'Batch and expiry tracking, automated re-order points, and point-of-sale dispensing tied directly to patient accounts.',
        status: 'verified'
      },
      {
        title: 'Laboratory Information System (LIS)',
        description: 'Automated test order dispatch, barcode generation, analyzer interface support, and patient result delivery.',
        status: 'verified'
      }
    ],
    integrations: [
      { name: 'Diagnostic Analyzer Machines (ASTM/HL7 Protocol)', type: 'Medical Equipment', status: 'verified' },
      { name: 'Hospital Payment Gateways & Cash Counters', type: 'Point of Sale', status: 'verified' },
      { name: 'SMS & WhatsApp Patient Notification Gateway', type: 'Messaging Gateway', status: 'verified' }
    ],
    deploymentOptions: [
      {
        model: 'Hospital On-Premise Appliance',
        description: 'High-availability local server cluster ensuring 100% clinical uptime even during internet disruptions.',
        isPopular: true
      },
      {
        model: 'Dedicated Healthcare Virtual Cloud',
        description: 'HIPAA-aligned private cloud infrastructure for multi-site hospital networks.'
      }
    ],
    iconName: 'Activity',
    featured: false,
    accentColor: '#06b6d4',
    metrics: [
      { label: 'Patient Wait Time', value: '- 35%', description: 'Reduction across OPD check-in' },
      { label: 'Discharge Turnaround', value: '< 45 Mins', description: 'Consolidated final bill generation' },
      { label: 'Clinical Availability', value: '99.95%', description: 'Guaranteed operational uptime' }
    ]
  },
  {
    id: 'procure-ai',
    name: 'Procure AI',
    badge: 'Intelligent Spend & Requisitions',
    category: 'Supply Chain & Procurement',
    tagline: 'Strategic Requisition Workflows, 3-Way Matching & Vendor Intelligence',
    summary: 'A disciplined procurement platform that replaces ad-hoc email purchase requests with governed approval matrixes, automated 3-way invoice reconciliation (PO vs. GRN vs. Invoice), and supplier performance analytics.',
    targetAudience: [
      'Chief Procurement Officers (CPOs)',
      'Supply Chain Vice Presidents',
      'Finance Directors & Internal Auditors',
      'Corporate Purchasing Teams'
    ],
    businessProblem: 'Unchecked maverick spending, lack of budgetary approval limits before order placement, and slow manual invoice matching cause budget overruns and supplier friction.',
    operationalSolution: 'Procure AI enforces organization-wide purchasing discipline. Department requisitions require approval against active budgets before PO generation, while inbound vendor invoices are automatically matched with warehouse goods receipts prior to payment release.',
    regulatoryScope: {
      jurisdiction: 'Global Commercial Standards',
      framework: 'Corporate Governance & Internal Financial Control (IFC) Frameworks',
      complianceStatus: 'verified',
      details: 'Audit trails enforcing segregation of duties (SoD) between purchase requesters, approvers, and payment releasing authorities.'
    },
    implementedCapabilities: [
      {
        title: 'Hierarchical Requisition & Approval Engine',
        description: 'Configurable approval thresholds based on department, cost center, project code, and monetary limit.',
        status: 'verified'
      },
      {
        title: 'Automated 3-Way Reconciliation',
        description: 'Line-by-line verification comparing Purchase Orders, Goods Receipt Notes (GRN), and Supplier Invoices.',
        status: 'verified'
      },
      {
        title: 'Supplier Evaluation & Compliance Scorecards',
        description: 'Quantitative rating of vendor on-time delivery ratios, quality rejection rates, and contract price adherence.',
        status: 'verified'
      },
      {
        title: 'Contract Lifecycle & Expiry Alerts',
        description: 'Automated reminders for rate renegotiations and service level agreement renewals.',
        status: 'limited'
      }
    ],
    integrations: [
      { name: 'Microsoft Dynamics 365 Supply Chain Management', type: 'ERP Connector', status: 'verified' },
      { name: 'SAP Materials Management (MM)', type: 'ERP Connector', status: 'verified' },
      { name: 'Warehouse Management Systems (WMS)', type: 'Inventory Pipeline', status: 'verified' }
    ],
    deploymentOptions: [
      {
        model: 'Enterprise Cloud SaaS',
        description: 'Rapid cloud deployment with multi-subsidiary currency and supplier portal access.',
        isPopular: true
      },
      {
        model: 'Dedicated Private Cloud',
        description: 'Encrypted single-tenant instance integrated directly with enterprise Active Directory / Okta.'
      }
    ],
    iconName: 'ShoppingBag',
    featured: false,
    accentColor: '#8b5cf6',
    metrics: [
      { label: 'Maverick Spend', value: '- 80%', description: 'Reduction in off-contract purchases' },
      { label: 'Requisition Cycle', value: '< 24 Hours', description: 'Average approval turnaround' },
      { label: 'Audit Trail', value: '100% Traceable', description: 'Complete purchase documentation' }
    ]
  },
  {
    id: 'logisud',
    name: 'LogiSud',
    badge: 'Logistics & Fleet Operations',
    category: 'Distribution & Transport Management',
    tagline: 'Consignment Dispatching, Fleet Manifests & Electronic Proof of Delivery',
    summary: 'A transport execution platform built for freight carriers, third-party logistics (3PL) providers, and internal distributor delivery networks. Streamlines manifest planning, driver assignment, real-time trip status, and mobile digital POD capture.',
    targetAudience: [
      'Logistics Operations Directors',
      'Fleet Managers & Dispatch Coordinators',
      'Third-Party Logistics (3PL) Operators',
      'Wholesale Distributors'
    ],
    businessProblem: 'Relying on manual paper delivery notes, fragmented phone calls with drivers, and delayed proof-of-delivery receipts results in lost consignments, disputed customer claims, and slow billing cycles.',
    operationalSolution: 'LogiSud digitizes the physical delivery lifecycle. Orders consolidate into optimized vehicle manifests, drivers execute trips using a lightweight mobile interface, and customers acknowledge deliveries with digital signatures and photo timestamps.',
    regulatoryScope: {
      jurisdiction: 'Commercial Transportation Standards',
      framework: 'Freight Documentation & Carrier Contract Rules',
      complianceStatus: 'verified',
      details: 'Digital delivery records provide timestamped, geofenced proof of receipt compliant with commercial trade guidelines.'
    },
    implementedCapabilities: [
      {
        title: 'Trip Manifesting & Vehicle Allocation',
        description: 'Consolidates shipment orders into vehicle-specific manifests considering weight, volume, and delivery zones.',
        status: 'verified'
      },
      {
        title: 'Consignment Lifecycle & Milestone Tracking',
        description: 'Step-by-step visibility across booking, loading, transit, hub arrival, and out-for-delivery milestones.',
        status: 'verified'
      },
      {
        title: 'Mobile Electronic Proof of Delivery (e-POD)',
        description: 'Driver web application capturing recipient signature, GPS coordinate confirmation, and package condition photo.',
        status: 'verified'
      },
      {
        title: 'Transporter Freight Billing & Settlement',
        description: 'Calculates freight charges automatically against negotiated lane rates, toll allowances, and detention charges.',
        status: 'verified'
      }
    ],
    integrations: [
      { name: 'Vehicle GPS & Telematics Hardware', type: 'Hardware Feed', status: 'verified' },
      { name: 'ERP Sales Order & Dispatch Modules', type: 'Enterprise ERP', status: 'verified' },
      { name: 'WhatsApp & SMS Customer Tracking Links', type: 'Messaging Gateway', status: 'verified' }
    ],
    deploymentOptions: [
      {
        model: 'Cloud Dispatch Hub + Driver Mobile PWA',
        description: 'Central dispatcher web cockpit paired with zero-install driver progressive web app.',
        isPopular: true
      },
      {
        model: 'Dedicated Logistics Cloud',
        description: 'High-throughput cluster with sub-second tracking and custom customer portal white-labeling.'
      }
    ],
    iconName: 'Truck',
    featured: false,
    accentColor: '#f59e0b',
    metrics: [
      { label: 'Dispatch Accuracy', value: '99.4%', description: 'Correct consignment loading' },
      { label: 'POD Turnaround', value: 'Instant', description: 'Digital signature to billing sync' },
      { label: 'Customer Visibility', value: '100%', description: 'Self-serve consignment tracking' }
    ]
  },
  {
    id: 'nova-crm',
    name: 'Nova CRM',
    badge: 'B2B Sales Pipeline',
    category: 'Sales Execution & Customer Relations',
    tagline: 'B2B Opportunity Management, Proposal Workflows & Pipeline Clarity',
    summary: 'A clean, focused CRM engineered specifically for B2B enterprises dealing with multi-stakeholder purchasing committees and complex proposal cycles. Replaces clunky legacy systems with clear stage tracking and deal acceleration.',
    targetAudience: [
      'B2B Sales Leaders & Commercial Heads',
      'Account Executives & Deal Leads',
      'Business Development Teams',
      'Professional Services & Solutions Firms'
    ],
    businessProblem: 'Generic consumer CRMs are laden with overwhelming consumer analytics, while basic spreadsheets fail to track complex deal negotiations, multiple revisions of proposals, and vital interaction timelines.',
    operationalSolution: 'Nova CRM strips away irrelevant consumer bloat, providing B2B sales teams with visual opportunity pipelines, milestone-based probability scoring, integrated PDF quotation generation, and full deal timelines.',
    regulatoryScope: {
      jurisdiction: 'Corporate Data Privacy Standards',
      framework: 'Enterprise Customer Privacy & Commercial Data Ownership',
      complianceStatus: 'verified',
      details: 'Strict tenant data ownership ensuring your client lists, quotations, and pricing formulas never leave your organization.'
    },
    implementedCapabilities: [
      {
        title: 'B2B Deal Pipeline & Stage Governance',
        description: 'Visual Kanban pipeline with mandatory stage exit criteria, probability-weighted values, and stalled-deal alerts.',
        status: 'verified'
      },
      {
        title: 'Quotation & Proposal Engine',
        description: 'Generates standardized PDF quotations with multi-currency conversion, tiered discount approvals, and revision history.',
        status: 'verified'
      },
      {
        title: 'Unified Customer & Contact Timelines',
        description: 'Consolidated view of calls, emails, meeting summaries, and pending action items across buying committee contacts.',
        status: 'verified'
      },
      {
        title: 'Sales Performance & Win/Loss Analytics',
        description: 'Actionable visibility into average sales cycles, win rates by deal size, and individual rep performance metrics.',
        status: 'verified'
      }
    ],
    integrations: [
      { name: 'Microsoft 365 & Google Workspace (Email/Calendar Sync)', type: 'Productivity Suite', status: 'verified' },
      { name: 'WhatsApp Business API Gateway', type: 'Messaging', status: 'verified' },
      { name: 'ERP Customer Master & Ledger Synchronization', type: 'Finance & ERP', status: 'verified' }
    ],
    deploymentOptions: [
      {
        model: 'Managed Cloud SaaS',
        description: 'Instant onboarding with SOC2-grade data encryption, hourly backups, and role-based permissions.',
        isPopular: true
      },
      {
        model: 'Private Virtual Cloud',
        description: 'Isolated VPC deployment integrated with your corporate single sign-on (SSO) and VPN.'
      }
    ],
    iconName: 'TrendingUp',
    featured: false,
    accentColor: '#ec4899',
    metrics: [
      { label: 'Pipeline Visibility', value: '100%', description: 'Real-time deal stage tracking' },
      { label: 'Quote Turnaround', value: '< 15 Mins', description: 'From inquiry to professional PDF' },
      { label: 'Deal Velocity', value: '+ 28%', description: 'Faster milestone progression' }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

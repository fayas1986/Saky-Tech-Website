import { Solution, SolutionId } from '../types';

export const solutions: Solution[] = [
  {
    id: 'erp-integration',
    title: 'Microsoft Dynamics 365 & ERP Integration',
    badge: 'Enterprise ERP Practice',
    subtitle: 'Certified Microsoft Dynamics Implementation, Customization & Enterprise Middleware',
    overview: 'Saky Technologies bridges the gap between core enterprise resource planning platforms and specialized operational applications. We specialize in end-to-end implementation, custom business logic, and API middleware for Microsoft Dynamics 365 Business Central, Finance & Operations (F&O), and enterprise ERPs.',
    coreOfferings: [
      {
        title: 'Microsoft Dynamics 365 Business Central',
        description: 'Comprehensive ERP setup, data migration, Chart of Accounts tailoring, and local statutory tax compliance for growing and mid-sized enterprises.',
        deliverables: [
          'Full lifecycle implementation & configuration',
          'Extension development (AL language)',
          'Automated data migration from legacy systems',
          'User training & continuous operational support'
        ]
      },
      {
        title: 'Microsoft Dynamics 365 Finance & Operations (F&O)',
        description: 'Scalable enterprise solutions designed for complex global manufacturing, multi-currency trade, supply chain management, and consolidated financial operations.',
        deliverables: [
          'Enterprise solution blueprint & gap analysis',
          'Custom X++ module engineering',
          'Multi-entity consolidation & statutory compliance',
          'Performance tuning & upgrade assessments'
        ]
      },
      {
        title: 'Enterprise Integration Middleware & API Gateways',
        description: 'Robust bidirectional middleware connecting your ERP with internal SaaS tools, banking channels, tax authorities (such as ZATCA and GSTN), and e-commerce portals.',
        deliverables: [
          'Secure RESTful & OData microservices',
          'Asynchronous queueing & failover buffer mechanisms',
          'Bi-directional transactional synchronization',
          'Real-time transaction status dashboards'
        ]
      },
      {
        title: 'Power BI & Operational Analytics',
        description: 'Executive dashboards, operational cash-flow analytics, and drill-down KPI reports unified directly from ERP ledgers and operational databases.',
        deliverables: [
          'Data warehouse & tabular model architecture',
          'Executive KPI dashboards & automated report scheduling',
          'Cross-departmental metric normalization',
          'Role-based report access permissions'
        ]
      }
    ],
    supportedPlatforms: [
      'Microsoft Dynamics 365 Business Central',
      'Microsoft Dynamics 365 Finance & Operations',
      'SAP S/4HANA & ECC',
      'Oracle NetSuite & EBS',
      'Microsoft Power BI',
      'Azure Integration Services'
    ],
    businessOutcomes: [
      'Elimination of manual double-entry between disparate business systems',
      'Full statutory and regulatory compliance across tax and financial authorities',
      'Accelerated period-end financial closing and real-time ledger visibility',
      'Predictable implementation timetables with dedicated post-go-live hypercare'
    ],
    technologies: [
      'AL (Business Central)',
      'X++ (Finance & Operations)',
      'Microsoft Azure Cloud',
      'Power BI Embedded',
      'OData & REST APIs',
      'SQL Server'
    ]
  },
  {
    id: 'custom-development',
    title: 'Custom Software Development & Business Intelligence',
    badge: 'Custom Engineering Practice',
    subtitle: 'Tailored Enterprise Web Applications, System Modernization & Data Engineering',
    overview: 'When off-the-shelf software fails to match your proprietary operational workflows, Saky Technologies designs, builds, and maintains custom software applications tailored exactly around the way your teams execute.',
    coreOfferings: [
      {
        title: 'Bespoke Enterprise Web & Mobile Applications',
        description: 'Clean, resilient, and accessible software designed to automate specific operational bottlenecks, partner portals, and internal workflows.',
        deliverables: [
          'Architecture specification & technical blueprint',
          'Responsive frontend engineering (React, TypeScript)',
          'Robust backend microservices and databases',
          'Comprehensive automated testing & CI/CD deployment'
        ]
      },
      {
        title: 'Legacy System Modernization & Re-Engineering',
        description: 'De-risking and migrating obsolete legacy monolithic databases, FoxPro/Access systems, or dated desktop software into modern cloud-native web architectures.',
        deliverables: [
          'Legacy code and database audit',
          'Incremental phased migration strategy',
          'Data cleansing, schema transformation, and verification',
          'Zero-downtime cutover planning'
        ]
      },
      {
        title: 'Enterprise Data Engineering & Analytics Pipelines',
        description: 'Ingesting, cleaning, and transforming distributed business logs into centralized analytical databases for executive decision support.',
        deliverables: [
          'Automated ETL / ELT pipeline design',
          'Normalized dimensional data modeling',
          'Real-time telemetry and error monitoring',
          'Self-service business reporting portals'
        ]
      },
      {
        title: 'Ongoing Application Support & SLA Maintenance',
        description: 'Proactive code audits, security patch management, performance tuning, and guaranteed tier-2/3 technical response times.',
        deliverables: [
          'Guaranteed uptime and response SLA tiers',
          'Scheduled security updates & dependency audits',
          'Continuous code optimization and query tuning',
          'Dedicated engineering point of contact'
        ]
      }
    ],
    supportedPlatforms: [
      'Cloud Native (AWS, Microsoft Azure, Google Cloud)',
      'Containerized Orchestration (Docker, Kubernetes)',
      'Relational & Analytical Databases (PostgreSQL, SQL Server, MySQL)',
      'Modern Frontend Frameworks (React, TypeScript, Tailwind CSS)'
    ],
    businessOutcomes: [
      'Proprietary competitive advantage through software molded directly to your processes',
      'Significant reduction in software licensing bloat and unused features',
      'High security standards with single-tenant data isolation and role-based permissions',
      'Long-term technical maintainability with cleanly documented, typed codebases'
    ],
    technologies: [
      'TypeScript / Node.js',
      'React / Modern Web Standards',
      'Python Data Pipelines',
      'PostgreSQL / Microsoft SQL Server',
      'Docker & Containerized Microservices',
      'REST & GraphQL Protocols'
    ]
  }
];

export const getSolutionById = (id: string): Solution | undefined => {
  return solutions.find(s => s.id === id);
};

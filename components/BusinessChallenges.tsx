import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldAlert, 
  Clock, 
  DollarSign, 
  Truck 
} from 'lucide-react';

const challenges = [
  {
    icon: FileSpreadsheet,
    title: 'Inward Tax Discrepancies & ITC Leakage',
    problem: 'Corporate tax teams lose hundreds of hours reconciling ERP purchase ledgers with tax portal downloads, causing delayed credit claims, vendor follow-up friction, and audit exposures.',
    solutionTitle: 'TaxFlow Automated Reconciliation',
    solution: 'Connects directly with your ERP, performs line-item matching against statutory returns, flags vendor defaults, and ensures 100% eligible input tax credit recovery.',
    link: '/products/taxflow',
    productName: 'TaxFlow'
  },
  {
    icon: ShieldAlert,
    title: 'Saudi Phase 2 E-Invoicing Mandate Complexity',
    problem: 'Complying with ZATCA Phase 2 demands cryptographic stamps (CSID), ECDSA signatures, and real-time clearance APIs that legacy ERPs cannot natively support.',
    solutionTitle: 'ZATCA Connect Integration Middleware',
    solution: 'Translates ERP billing into validated UBL 2.1 XML, executes cryptographic signing, and manages instant API clearance with resilient offline failover buffers.',
    link: '/products/zatca-connect',
    productName: 'ZATCA Connect'
  },
  {
    icon: Clock,
    title: 'Biometric Roster Chaos & Payroll Errors',
    problem: 'Disconnected shift records across factories or sites cause manual payroll re-work, inaccurate overtime payouts, and compliance calculation headaches.',
    solutionTitle: 'TalentSense HRMS Unified Workforce Engine',
    solution: 'Pulls raw logs directly from biometric terminals, calculates overtime and leaves through configurable rule matrixes, and automates payroll and bank upload files.',
    link: '/products/talentsense-hrms',
    productName: 'TalentSense HRMS'
  },
  {
    icon: DollarSign,
    title: 'Maverick Spend & Slow 3-Way Invoice Matching',
    problem: 'Unbudgeted purchase requests made over email bypass financial controls, while manual matching of POs against warehouse receipts delays payments.',
    solutionTitle: 'Procure AI Requisition & Matching',
    solution: 'Enforces departmental approval matrixes before order placement, and conducts automated 3-way matching between POs, Goods Receipts, and vendor invoices.',
    link: '/products/procure-ai',
    productName: 'Procure AI'
  },
  {
    icon: Truck,
    title: 'Paper Delivery Notes & Fleet Transit Opacity',
    problem: 'Relying on manual paper delivery receipts and phone check-ins causes misplaced shipments, disputed delivery claims, and lengthy billing delays.',
    solutionTitle: 'LogiSud Manifesting & Mobile e-POD',
    solution: 'Digitizes transport execution with consolidated vehicle manifests, real-time dispatch milestones, and mobile digital signature and photo proof of delivery.',
    link: '/products/logisud',
    productName: 'LogiSud'
  }
];

const BusinessChallenges: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-darker border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in-up">
          <span className="text-xs font-bold tracking-wider text-brand-lime uppercase mb-2 block">
            Operational Problem Solving
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Real Business Challenges. Verifiable Solutions.
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            We don't offer generic software templates. We engineer targeted solutions for the high-friction bottlenecks that drain enterprise productivity.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {challenges.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/[0.07] transition-all"
            >
              <div className="grid md:grid-cols-12 gap-6 items-center">
                
                {/* Problem Side */}
                <div className="md:col-span-6 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                      The Operational Challenge
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{item.problem}</p>
                </div>

                {/* Solution Side */}
                <div className="md:col-span-6 pl-0 md:pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-lime">
                      {item.solutionTitle}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">{item.solution}</p>
                  
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-lime hover:underline"
                  >
                    Explore {item.productName} Solution Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BusinessChallenges;

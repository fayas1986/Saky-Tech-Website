import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  ShieldAlert, 
  Clock, 
  DollarSign, 
  Truck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const challenges = [
  {
    icon: FileSpreadsheet,
    title: 'Inward Tax Discrepancies & ITC Leakage',
    problem: 'Corporate tax teams lose hundreds of hours reconciling internal ERP purchase registers with GST portal downloads, resulting in delayed credit claims, vendor defaults, and audit fines.',
    solutionTitle: 'TaxFlow Automated Reconciliation',
    solution: 'Interfaces directly with your ERP, performs automated multi-way matching down to invoice line items, flags ineligible credits, and achieves 100% eligible ITC recovery.',
    link: '/products/taxflow',
    productName: 'TaxFlow',
    badge: 'Indian GST Framework'
  },
  {
    icon: ShieldAlert,
    title: 'Saudi ZATCA Phase 2 (FATOORA) Complexity',
    problem: 'Complying with Phase 2 mandate requirements—cryptographic CSIDs, ECDSA signatures, and sub-second API clearance—creates severe bottlenecks on legacy systems.',
    solutionTitle: 'ZATCA Connect Integration Engine',
    solution: 'Generates compliant UBL 2.1 XML invoices with cryptographic QR codes, submits directly to ZATCA APIs, and maintains persistent offline transaction queues.',
    link: '/products/zatca-connect',
    productName: 'ZATCA Connect',
    badge: 'KSA Tax Authority'
  },
  {
    icon: Clock,
    title: 'Biometric Roster Chaos & Overtime Errors',
    problem: 'Decentralized shift logs across branch offices or factory sites lead to manual payroll re-work, inaccurate overtime payouts, and statutory labor reporting headaches.',
    solutionTitle: 'TalentSense HRMS Workforce Engine',
    solution: 'Ingests biometric terminal data in real time, applies configurable labor overtime rules, and automates multi-entity payroll runs and direct bank credit files.',
    link: '/products/talentsense-hrms',
    productName: 'TalentSense HRMS',
    badge: 'Workforce Operations'
  },
  {
    icon: DollarSign,
    title: 'Maverick Spend & Slow 3-Way Invoice Matching',
    problem: 'Unbudgeted purchase requests made over email bypass financial limits, while manual matching of purchase orders against warehouse delivery slips stalls accounting.',
    solutionTitle: 'Procure AI Automated PO & 3-Way Matching',
    solution: 'Enforces role-based expenditure approval matrixes, and executes automated 3-way matching between POs, warehouse Goods Receipts (GRN), and vendor invoices.',
    link: '/products/procure-ai',
    productName: 'Procure AI',
    badge: 'Spend Governance'
  },
  {
    icon: Truck,
    title: 'Paper Delivery Slips & Transit Opacity',
    problem: 'Relying on manual paper delivery notes and phone check-ins causes lost consignments, disputed customer delivery timelines, and delayed invoice recognition.',
    solutionTitle: 'LogiSud Digital Manifesting & Mobile e-POD',
    solution: 'Provides digital vehicle manifests, live transit milestones, and smartphone-based digital signatures and photo capture for verified proof of delivery.',
    link: '/products/logisud',
    productName: 'LogiSud',
    badge: 'Fleet & Dispatch'
  }
];

const BusinessChallenges: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#f3f9ff] relative overflow-hidden" id="challenges">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-[#0d83fd] text-xs font-bold tracking-wide uppercase mb-3 shadow-sm">
            Operational Problem Solving
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Real Business Challenges. Verifiable Solutions.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We don't offer generic templates. We engineer targeted platforms for the high-friction friction points that drain enterprise productivity and financial velocity.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {challenges.map((c, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-[0_5px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(13,131,253,0.1)] hover:border-blue-200 transition-all flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center shrink-0 group-hover:bg-[#0d83fd] group-hover:text-white transition-all shadow-sm">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-[#2d465e] mb-3 group-hover:text-[#0d83fd] transition-colors leading-snug">
                  {c.title}
                </h3>

                <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 mb-4 text-xs text-red-900/80 leading-relaxed">
                  <strong className="block text-red-700 font-bold mb-1">Operational Problem:</strong>
                  {c.problem}
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950/80 leading-relaxed mb-6">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{c.solutionTitle}:</span>
                  </div>
                  {c.solution}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold font-heading text-[#2d465e]">
                  {c.productName}
                </span>
                <Link
                  to={c.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d83fd] hover:text-[#0b66c2]"
                >
                  <span>Explore Product</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BusinessChallenges;

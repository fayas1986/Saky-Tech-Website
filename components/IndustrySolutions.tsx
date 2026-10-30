import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  HeartPulse, 
  Truck, 
  ShoppingBag, 
  Factory, 
  Layers,
  Clock,
  Calendar,
  FileText,
  Users,
  CheckCircle2,
  Fingerprint,
  Wifi,
  BatteryCharging,
  Home,
  Bell
} from 'lucide-react';

const IndustrySolutions: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="industries">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header - iLanding Standard */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0d83fd] text-xs font-bold tracking-wide uppercase mb-3 shadow-sm">
            Target Vertical Solutions
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
            Engineered for Vertical Industry Operations
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our software products and Microsoft ERP integration practices address the precise compliance mandates, workflows, and operational realities of each sector.
          </p>
        </div>

        {/* iLanding Features 2: 3-Column Layout with Center Phone Mockup */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: 3 Industries (Right-Aligned on desktop) */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-10">
            
            {/* Item 1 */}
            <div className="flex flex-col lg:items-end text-left lg:text-right group">
              <div className="flex items-center lg:flex-row-reverse gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center shrink-0 group-hover:bg-[#0d83fd] group-hover:text-white transition-all shadow-sm">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-[#2d465e] group-hover:text-[#0d83fd] transition-colors">
                    Banking & Financial Services
                  </h3>
                  <span className="text-[11px] font-semibold text-[#0d83fd]">TaxFlow & Dynamics 365</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Automated multi-way GST reconciliation, audit trail preservation, and multi-tier corporate tax compliance.
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col lg:items-end text-left lg:text-right group">
              <div className="flex items-center lg:flex-row-reverse gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-[#2d465e] group-hover:text-emerald-600 transition-colors">
                    Healthcare & Hospital Chains
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-600">MedNext HIMS Platform</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Unified electronic medical records (EMR), bed management, integrated clinical pharmacy, and diagnostic laboratory automation.
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col lg:items-end text-left lg:text-right group">
              <div className="flex items-center lg:flex-row-reverse gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-[#2d465e] group-hover:text-amber-600 transition-colors">
                    Logistics, 3PL & Freight
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-600">LogiSud Fleet Engine</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Multi-leg consignment tracking, vehicle manifest planning, and mobile electronic proof-of-delivery (e-POD).
              </p>
            </div>

          </div>

          {/* Center Column: TalentSense HRMS Mobile App Mockup */}
          <div className="lg:col-span-4 my-6 lg:my-0">
            <div className="relative mx-auto max-w-[290px] sm:max-w-[310px]">
              {/* Phone Bezel */}
              <div className="p-3 bg-slate-900 rounded-[44px] shadow-[0_25px_60px_rgba(13,131,253,0.18)] border-4 border-slate-800 relative">
                
                {/* Top Speaker / Dynamic Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-950 rounded-full z-20 flex items-center justify-end px-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                </div>

                {/* Phone Screen Content */}
                <div className="bg-[#f8fafc] rounded-[34px] overflow-hidden border border-slate-200 text-left flex flex-col">
                  
                  {/* Top Header (TalentSense HRMS Blue Header) */}
                  <div className="bg-gradient-to-br from-[#0d83fd] to-[#0b66c2] text-white pt-3 pb-6 px-4 relative">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between text-[10px] font-semibold opacity-90 mb-5 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1.5">
                        <Wifi className="w-3 h-3" />
                        <BatteryCharging className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* App Title & User Profile */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                          TalentSense HRMS
                        </span>
                        <h4 className="text-base font-extrabold font-heading text-white leading-tight">
                          Employee Portal
                        </h4>
                        <p className="text-[11px] text-blue-100">
                          Singapore HQ &bull; Shift A
                        </p>
                      </div>
                      <div className="relative">
                        <img
                          src="/assets/img/avatar-1.webp"
                          alt="Employee Profile"
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white absolute bottom-0 right-0"></span>
                      </div>
                    </div>
                  </div>

                  {/* Main App Body */}
                  <div className="px-3.5 -mt-3.5 pb-3 space-y-3 relative z-10">
                    
                    {/* Biometric Attendance Status Card */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-md border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Fingerprint className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-[#2d465e]">Biometric Verified</div>
                            <div className="text-[9px] text-slate-400">Clocked In: 08:56 AM</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                          Active
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                        <div className="bg-[#f3f9ff] rounded-xl py-1.5 px-2">
                          <div className="text-xs font-black text-[#0d83fd]">07h 45m</div>
                          <div className="text-[9px] text-slate-500">Logged Today</div>
                        </div>
                        <div className="bg-[#f3f9ff] rounded-xl py-1.5 px-2">
                          <div className="text-xs font-black text-[#2d465e]">14 Days</div>
                          <div className="text-[9px] text-slate-500">Leave Balance</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick HRMS Actions (4 Circular Icons) */}
                    <div className="grid grid-cols-4 gap-1.5 text-center py-1">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#0d83fd] text-white flex items-center justify-center shadow-sm mb-1">
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-700">Attendance</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#0d83fd] text-white flex items-center justify-center shadow-sm mb-1">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-700">Leave</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#0d83fd] text-white flex items-center justify-center shadow-sm mb-1">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-700">Payslips</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#0d83fd] text-white flex items-center justify-center shadow-sm mb-1">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-700">Roster</span>
                      </div>
                    </div>

                    {/* Monthly Payroll & Compliance Card */}
                    <div>
                      <div className="flex items-center justify-between px-1 mb-1.5">
                        <span className="text-[10px] font-bold text-[#2d465e]">Payroll & Approvals</span>
                        <span className="text-[9px] font-semibold text-[#0d83fd]">Synced</span>
                      </div>
                      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <div>
                              <div className="text-[10px] font-bold text-[#2d465e]">Oct Salary Slip Dispatched</div>
                              <div className="text-[9px] text-slate-400">WPS / Bank File Approved</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-bold text-[#0d83fd] bg-blue-50 px-1.5 py-0.5 rounded">PDF</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                            <div>
                              <div className="text-[10px] font-bold text-[#2d465e]">Overtime Matrix (+2.0h)</div>
                              <div className="text-[9px] text-slate-400">Auto-calculated via Terminal</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Active Shift Team Members */}
                    <div>
                      <div className="flex items-center justify-between px-1 mb-1.5">
                        <span className="text-[10px] font-bold text-[#2d465e]">Department Shift Roster</span>
                        <span className="text-[9px] font-semibold text-slate-400">248 On-Site</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
                          <img src="/assets/img/avatar-2.webp" alt="Staff" className="w-6 h-6 rounded-full object-cover" />
                          <div className="truncate">
                            <div className="text-[9px] font-bold text-[#2d465e] truncate">Sarah Lin</div>
                            <div className="text-[8px] text-emerald-600 font-semibold">● On Shift</div>
                          </div>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
                          <img src="/assets/img/avatar-3.webp" alt="Staff" className="w-6 h-6 rounded-full object-cover" />
                          <div className="truncate">
                            <div className="text-[9px] font-bold text-[#2d465e] truncate">Khalid Al-Said</div>
                            <div className="text-[8px] text-emerald-600 font-semibold">● On Shift</div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom App Navigation Bar */}
                  <div className="bg-white border-t border-slate-100 px-5 py-2.5 flex items-center justify-between text-slate-400">
                    <div className="flex items-center gap-1.5 text-[#0d83fd]">
                      <Home className="w-4 h-4" />
                      <span className="text-[10px] font-bold">TalentSense</span>
                    </div>
                    <Calendar className="w-4 h-4 hover:text-[#0d83fd]" />
                    <Bell className="w-4 h-4 hover:text-[#0d83fd]" />
                  </div>

                  {/* Home Indicator */}
                  <div className="bg-white pb-2 flex justify-center">
                    <div className="w-24 h-1 bg-slate-300 rounded-full"></div>
                  </div>

                </div>
              </div>
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>

          {/* Right Column: 3 Industries (Left-Aligned) */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-10">
            
            {/* Item 4 */}
            <div className="flex flex-col items-start group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-[#2d465e] group-hover:text-purple-600 transition-colors">
                    Wholesale, Retail & Trade
                  </h3>
                  <span className="text-[11px] font-semibold text-purple-600">ZATCA Connect & Nova CRM</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Saudi Phase 2 e-invoicing middleware with instant cryptographic clearance, POS integration, and sales pipeline management.
              </p>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col items-start group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-[#2d465e] group-hover:text-indigo-600 transition-colors">
                    Manufacturing & Plants
                  </h3>
                  <span className="text-[11px] font-semibold text-indigo-600">TalentSense & Procure AI</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Biometric multi-shift attendance sync, statutory overtime calculations, and 3-way automated matching of purchase orders.
              </p>
            </div>

            {/* Item 6 */}
            <div className="flex flex-col items-start group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0d83fd] flex items-center justify-center shrink-0 group-hover:bg-[#0d83fd] group-hover:text-white transition-all shadow-sm">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-[#2d465e] group-hover:text-[#0d83fd] transition-colors">
                    Global Trading & Distribution
                  </h3>
                  <span className="text-[11px] font-semibold text-[#0d83fd]">Dynamics 365 Business Central</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Multi-currency general ledger accounting, automated tariff handling, and executive business intelligence dashboards.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndustrySolutions;

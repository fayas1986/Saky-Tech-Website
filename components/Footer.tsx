import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { products } from '../data/products';
import { solutions } from '../data/solutions';
import { officeLocations, companyConfig } from '../data/company';
import { Phone, Mail, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f8fafc] border-t border-slate-200 pt-16 md:pt-20 pb-12 text-slate-600">
      <div className="container mx-auto px-4 md:px-6">

        {/* Main Footer Grid - iLanding Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">

          {/* Column 1 & 2: Brand & Global Footprint */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-2xl font-black font-heading tracking-tight text-[#2d465e]">
                Saky<span className="text-[#0d83fd]">.</span>
              </span>
            </Link>

            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              {companyConfig.tagline} Empowering enterprises across Singapore, the GCC, and India with specialized SaaS platforms and certified Microsoft Dynamics 365 ERP implementations.
            </p>

            {/* Approved Global Office Locations */}
            <div className="pt-4 border-t border-slate-200/80 space-y-3.5 text-xs text-slate-600">
              <div>
                <p className="font-bold text-[#2d465e] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d83fd]" />
                  Singapore (Global Headquarters):
                </p>
                <p className="text-slate-500 pl-3">
                  {officeLocations.singapore.addressLines.join(', ')}
                </p>
              </div>

              <div>
                <p className="font-bold text-[#2d465e] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Oman Branch Office:
                </p>
                <p className="text-slate-500 pl-3">
                  {officeLocations.oman.addressLines.join(', ')}
                </p>
              </div>

              <div>
                <p className="font-bold text-[#2d465e] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  India Engineering Center:
                </p>
                <p className="text-slate-500 pl-3">
                  {officeLocations.india.addressLines.join(', ')}
                </p>
              </div>

              <div className="pt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0d83fd]" />
                  <a href={companyConfig.primaryPhoneLink} className="text-[#2d465e] hover:text-[#0d83fd] font-bold">
                    {companyConfig.primaryPhone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0d83fd]" />
                  <a href={companyConfig.primaryEmailLink} className="text-[#2d465e] hover:text-[#0d83fd] font-bold">
                    {companyConfig.primaryEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Approved Products Directory */}
          <div>
            <h4 className="font-bold font-heading text-[#2d465e] text-sm uppercase tracking-wider mb-4">
              SaaS Suite
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                    <span>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Solutions & Practices */}
          <div>
            <h4 className="font-bold font-heading text-[#2d465e] text-sm uppercase tracking-wider mb-4">
              Practices
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {solutions.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/solutions/${s.id}`}
                    className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/#industries"
                  className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                  <span>Vertical Solutions</span>
                </a>
              </li>
              <li>
                <a
                  href="/#architecture"
                  className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                  <span>Security & SLA</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Quick Links */}
          <div>
            <h4 className="font-bold font-heading text-[#2d465e] text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                  <span>About Saky</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <a href="/#testimonials" className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                  <span>Client Outcomes</span>
                </a>
              </li>
              <li>
                <a href={officeLocations.singapore.directionsUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-[#0d83fd] transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0d83fd] transition-colors" />
                  <span>Singapore Map</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar - iLanding Standard */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-[#2d465e]">{companyConfig.legalName}</strong>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-400">Singapore &bull; Oman &bull; India</span>
            <Link to="/contact" className="hover:text-[#0d83fd] transition-colors">Privacy & Security</Link>
            <Link to="/contact" className="hover:text-[#0d83fd] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

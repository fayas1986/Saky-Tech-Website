import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { products } from '../data/products';
import { solutions } from '../data/solutions';
import { officeLocations, companyConfig } from '../data/company';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darker border-t border-white/10 pt-14 md:pt-20 pb-10 text-slate-300">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-14">
          
          {/* Column 1 & 2: Brand & Approved Global Offices */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7 md:h-8 md:w-8" />
              <span className="text-xl font-bold text-white tracking-tight">Saky Technologies</span>
            </div>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {companyConfig.tagline} Empowering enterprises with intelligent business software, Microsoft Dynamics 365 implementations, and custom engineering.
            </p>

            {/* Approved Global Office Locations */}
            <div className="pt-2 border-t border-white/5 space-y-3.5 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-brand-lime">
                  Singapore (Global HQ):
                </p>
                <p className="text-slate-400">
                  {officeLocations.singapore.addressLines.join(', ')}
                </p>
              </div>

              <div>
                <p className="font-semibold text-brand-lime">
                  Oman Branch Office:
                </p>
                <p className="text-slate-400">
                  {officeLocations.oman.addressLines.join(', ')}
                </p>
              </div>

              <div>
                <p className="font-semibold text-brand-lime">
                  India Development Center:
                </p>
                <p className="text-slate-400">
                  {officeLocations.india.addressLines.join(', ')}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-x-6 gap-y-1 text-slate-300">
                <p>
                  <span className="text-slate-500">Tel:</span>{' '}
                  <a href={companyConfig.primaryPhoneLink} className="text-brand-lime hover:underline font-medium">
                    {companyConfig.primaryPhone}
                  </a>
                </p>
                <p>
                  <span className="text-slate-500">Email:</span>{' '}
                  <a href={companyConfig.primaryEmailLink} className="text-brand-lime hover:underline font-medium">
                    {companyConfig.primaryEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Approved Products Directory */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider text-xs mb-4 md:mb-6">
              SaaS Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {products.map((p) => (
                <li key={p.id}>
                  <Link 
                    to={`/products/${p.id}`} 
                    className="text-slate-400 hover:text-brand-lime transition-colors block py-0.5"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Enterprise Solutions */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider text-xs mb-4 md:mb-6">
              Enterprise Solutions
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/solutions" className="hover:text-brand-lime transition-colors block py-0.5">
                  Solutions Overview
                </Link>
              </li>
              <li>
                <Link to="/solutions/erp-integration" className="hover:text-brand-lime transition-colors block py-0.5">
                  Microsoft Dynamics 365
                </Link>
              </li>
              <li>
                <Link to="/solutions/erp-integration" className="hover:text-brand-lime transition-colors block py-0.5">
                  Business Central & F&O
                </Link>
              </li>
              <li>
                <Link to="/solutions/custom-development" className="hover:text-brand-lime transition-colors block py-0.5">
                  Custom Development
                </Link>
              </li>
              <li>
                <Link to="/solutions/custom-development" className="hover:text-brand-lime transition-colors block py-0.5">
                  Power BI & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Legal */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider text-xs mb-4 md:mb-6">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-brand-lime transition-colors block py-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-lime transition-colors block py-0.5">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact?interest=erp-integration" className="hover:text-brand-lime transition-colors block py-0.5">
                  Enterprise Enquiries
                </Link>
              </li>
              <li>
                <Link to="/about#vision" className="hover:text-brand-lime transition-colors block py-0.5">
                  Our Methodology
                </Link>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Sub-footer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Saky Technologies Pvt Ltd. All rights reserved.</p>
          <p className="text-slate-500">
            Singapore · Sultanate of Oman · India
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darker border-t border-white/5 pt-12 md:pt-16 pb-8 text-slate-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-6 w-6 md:h-8 md:w-8" />
              <span className="text-lg md:text-xl font-bold text-white tracking-tight">Saky Technologies</span>
            </div>
            <p className="text-slate-400 text-sm mb-4 max-w-xs leading-relaxed">
              Empowering enterprises with intelligent software that drives growth, efficiency, and innovation.
            </p>
            <div className="text-xs text-slate-400 space-y-1 mb-5">
              <p className="text-slate-300"><span className="text-brand-lime font-medium">Singapore (HQ):</span> Blk 71, #03-08 Ayer Rajah Crescent, Singapore 139951</p>
              <p className="text-slate-300"><span className="text-brand-lime font-medium">Oman Office:</span> PO BOX 220, Ruwi, PC112, Muscat, Oman</p>
              <p>Tel: <a href="tel:+6567767822" className="text-brand-lime hover:underline font-medium">+65 6776 7822</a></p>
            </div>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-brand-lime hover:text-brand-dark cursor-pointer transition-colors font-bold">𝕏</div>
               <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-brand-lime hover:text-brand-dark cursor-pointer transition-colors font-bold">in</div>
               <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-brand-lime hover:text-brand-dark cursor-pointer transition-colors font-bold">G</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4 md:mb-6">Product</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-brand-lime transition-colors">Saky Predict</Link></li>
              <li><Link to="/" className="hover:text-brand-lime transition-colors">Saky Automate</Link></li>
              <li><Link to="/" className="hover:text-brand-lime transition-colors">Saky Insight</Link></li>
              <li><Link to="/" className="hover:text-brand-lime transition-colors">Saky Guardian</Link></li>
              <li><Link to="/" className="hover:text-brand-lime transition-colors">ZatcaConnect</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4 md:mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-brand-lime transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-brand-lime transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-brand-lime transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-brand-lime transition-colors">Partners</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-500 text-xs md:text-sm">© {new Date().getFullYear()} Saky Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ReceiptText, 
  ShieldCheck, 
  Users, 
  Activity, 
  ShoppingBag, 
  Truck, 
  TrendingUp, 
  Building2, 
  Code2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';
import { products } from '../data/products';
import { solutions } from '../data/solutions';

const productIcons: Record<string, React.ElementType> = {
  taxflow: ReceiptText,
  'zatca-connect': ShieldCheck,
  'talentsense-hrms': Users,
  'mednext-hims': Activity,
  'procure-ai': ShoppingBag,
  logisud: Truck,
  'nova-crm': TrendingUp,
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'solutions' | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation listener (Escape closes menus)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav 
      ref={navRef}
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-darker/95 backdrop-blur-lg border-b border-white/10 py-3 shadow-xl' 
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 md:gap-3 cursor-pointer group z-10 focus-visible:ring-2 focus-visible:ring-brand-lime rounded-lg"
          aria-label="Saky Technologies Home"
        >
          <Logo className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
              Saky Technologies
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Business Software
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          
          {/* Products Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
              onMouseEnter={() => setActiveDropdown('products')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'products'}
              aria-controls="products-menu"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-lime ${
                activeDropdown === 'products' || location.pathname.startsWith('/products')
                  ? 'text-brand-lime bg-white/5'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
            </button>

            {/* Products Mega-Menu Dropdown */}
            {activeDropdown === 'products' && (
              <div 
                id="products-menu"
                role="menu"
                aria-label="Software Products"
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 -translate-x-12 w-[680px] bg-brand-darker border border-white/10 rounded-2xl shadow-2xl p-5 mt-2 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl"
              >
                <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Proprietary B2B SaaS Portfolio (7 Approved Products)
                  </span>
                  <Link 
                    to="/#products" 
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-semibold text-brand-lime hover:underline flex items-center gap-1"
                  >
                    View All in Portfolio <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {products.map((p) => {
                  const Icon = productIcons[p.id] || ReceiptText;
                  return (
                    <Link
                      key={p.id}
                      to={`/products/${p.id}`}
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group focus-visible:ring-2 focus-visible:ring-brand-lime border border-transparent hover:border-white/5"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-lime group-hover:text-brand-dark text-brand-lime transition-all mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-white group-hover:text-brand-lime transition-colors">
                            {p.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-slate-300 font-medium">
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-snug line-clamp-1 mt-0.5">
                          {p.tagline}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
              onMouseEnter={() => setActiveDropdown('solutions')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'solutions'}
              aria-controls="solutions-menu"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-lime ${
                activeDropdown === 'solutions' || location.pathname.startsWith('/solutions')
                  ? 'text-brand-lime bg-white/5'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Solutions</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
            </button>

            {/* Solutions Dropdown Menu */}
            {activeDropdown === 'solutions' && (
              <div 
                id="solutions-menu"
                role="menu"
                aria-label="Enterprise Solutions"
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 w-[420px] bg-brand-darker border border-white/10 rounded-2xl shadow-2xl p-4 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl"
              >
                <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Enterprise Services & Practice Areas
                  </span>
                  <Link 
                    to="/solutions" 
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-semibold text-brand-lime hover:underline"
                  >
                    Overview
                  </Link>
                </div>

                {solutions.map((sol) => (
                  <Link
                    key={sol.id}
                    to={`/solutions/${sol.id}`}
                    role="menuitem"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group focus-visible:ring-2 focus-visible:ring-brand-lime border border-transparent hover:border-white/5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-lime group-hover:text-brand-dark text-brand-lime transition-all mt-0.5">
                      {sol.id === 'erp-integration' ? <Building2 className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white group-hover:text-brand-lime transition-colors block">
                        {sol.title}
                      </span>
                      <p className="text-xs text-slate-400 leading-snug line-clamp-1 mt-0.5">
                        {sol.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About Us Link */}
          <Link 
            to="/about"
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-lime ${
              location.pathname === '/about' 
                ? 'text-brand-lime bg-white/5' 
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            }`}
          >
            About Us
          </Link>

          {/* Contact Us Link */}
          <Link 
            to="/contact"
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-lime ${
              location.pathname === '/contact' 
                ? 'text-brand-lime bg-white/5' 
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Action CTAs (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/#products"
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg border border-white/10 hover:bg-white/5 transition-all focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore Products
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 text-xs font-bold text-brand-dark bg-brand-lime rounded-lg shadow-md shadow-brand-lime/10 hover:bg-[#d9f99d] transition-all focus-visible:ring-2 focus-visible:ring-brand-lime"
          >
            Discuss Your Requirements
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/contact"
            className="px-3 py-1.5 text-xs font-bold text-brand-dark bg-brand-lime rounded-lg"
          >
            Contact
          </Link>
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg transition-colors text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-lime"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden bg-brand-darker border-b border-white/10 shadow-2xl py-5 px-4 flex flex-col space-y-3 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2"
        >
          {/* Mobile Products Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-base font-semibold text-white hover:bg-white/5 transition-colors"
            >
              <span>Products ({products.length})</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProductsOpen && (
              <div className="pl-3 pr-1 py-2 space-y-2 border-l border-white/10 ml-3 mt-1">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="text-sm font-bold text-slate-100">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.badge}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Solutions Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-base font-semibold text-white hover:bg-white/5 transition-colors"
            >
              <span>Solutions</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSolutionsOpen && (
              <div className="pl-3 pr-1 py-2 space-y-2 border-l border-white/10 ml-3 mt-1">
                <Link
                  to="/solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-lg hover:bg-white/5 text-xs text-brand-lime font-bold uppercase tracking-wider"
                >
                  All Solutions Overview →
                </Link>
                {solutions.map((sol) => (
                  <Link
                    key={sol.id}
                    to={`/solutions/${sol.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="text-sm font-bold text-slate-100">{sol.title}</div>
                    <div className="text-xs text-slate-400">{sol.subtitle}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-white p-3 hover:bg-white/5 rounded-lg transition-colors"
          >
            About Us
          </Link>

          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-white p-3 hover:bg-white/5 rounded-lg transition-colors"
          >
            Contact & Office Locations
          </Link>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-200 bg-white/5 rounded-lg border border-white/10"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-bold text-brand-dark bg-brand-lime rounded-lg"
            >
              Discuss Your Requirements
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
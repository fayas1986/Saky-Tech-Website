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
  PhoneCall
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
      setIsScrolled(window.scrollY > 15);
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

  // Keyboard navigation listener
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
    <header
      ref={navRef}
      aria-label="Main Header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${isScrolled
          ? 'border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-3'
          : 'border-b border-slate-100 py-4 md:py-4.5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Brand Logo - iLanding Sitename Style */}
        <Link
          to="/"
          className="flex items-center gap-2.5 md:gap-3 cursor-pointer group z-10 focus-visible:ring-2 focus-visible:ring-[#0d83fd] rounded-lg"
          aria-label="Saky Technologies Home"
        >
          <Logo className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black font-heading tracking-tight text-[#2d465e] leading-none group-hover:text-[#0d83fd] transition-colors">
              Saky<span className="text-[#0d83fd]">.</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
              Technologies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${location.pathname === '/'
                ? 'text-[#0d83fd] font-bold'
                : 'text-[#2d465e] hover:text-[#0d83fd]'
              }`}
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
              onMouseEnter={() => setActiveDropdown('products')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'products'}
              aria-controls="products-menu"
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#0d83fd] ${activeDropdown === 'products' || location.pathname.startsWith('/products')
                  ? 'text-[#0d83fd] bg-blue-50/70'
                  : 'text-[#2d465e] hover:text-[#0d83fd] hover:bg-slate-50'
                }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
            </button>

            {/* Products Dropdown Menu */}
            {activeDropdown === 'products' && (
              <div
                id="products-menu"
                role="menu"
                aria-label="Software Products"
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 -translate-x-12 w-[680px] bg-white border border-slate-200/90 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-5 mt-2 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="col-span-2 pb-2.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Proprietary SaaS Portfolio (7 Approved Products)
                  </span>
                  <Link
                    to="/#products"
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-semibold text-[#0d83fd] hover:underline flex items-center gap-1"
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
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/60 transition-all group focus-visible:ring-2 focus-visible:ring-[#0d83fd] border border-transparent hover:border-blue-100"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-[#0d83fd] group-hover:text-white text-[#0d83fd] transition-all mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#2d465e] group-hover:text-[#0d83fd] transition-colors">
                            {p.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-snug line-clamp-1 mt-0.5">
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
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#0d83fd] ${activeDropdown === 'solutions' || location.pathname.startsWith('/solutions')
                  ? 'text-[#0d83fd] bg-blue-50/70'
                  : 'text-[#2d465e] hover:text-[#0d83fd] hover:bg-slate-50'
                }`}
            >
              <span>Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
            </button>

            {/* Solutions Dropdown Menu */}
            {activeDropdown === 'solutions' && (
              <div
                id="solutions-menu"
                role="menu"
                aria-label="Enterprise Solutions"
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 w-[420px] bg-white border border-slate-200/90 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-4 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Enterprise Services & Practice Areas
                  </span>
                  <Link
                    to="/solutions"
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-semibold text-[#0d83fd] hover:underline"
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
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-all group focus-visible:ring-2 focus-visible:ring-[#0d83fd] border border-transparent hover:border-blue-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-[#0d83fd] group-hover:text-white text-[#0d83fd] transition-all mt-0.5">
                      {sol.id === 'erp-integration' ? <Building2 className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#2d465e] group-hover:text-[#0d83fd] transition-colors block">
                        {sol.title}
                      </span>
                      <p className="text-xs text-slate-500 leading-snug line-clamp-1 mt-0.5">
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
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#0d83fd] ${location.pathname === '/about'
                ? 'text-[#0d83fd] font-bold'
                : 'text-[#2d465e] hover:text-[#0d83fd]'
              }`}
          >
            About
          </Link>

          {/* Contact Us Link */}
          <Link
            to="/contact"
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#0d83fd] ${location.pathname === '/contact'
                ? 'text-[#0d83fd] font-bold'
                : 'text-[#2d465e] hover:text-[#0d83fd]'
              }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action CTAs (Desktop) - iLanding btn-getstarted style */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold hover:text-[#0d83fd] transition-colors px-3 py-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#0d83fd]" />
            <span>+65 6776 7822</span>
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-sm shadow-blue-500/25 hover:shadow-md transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#0d83fd]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/contact"
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg transition-colors text-[#2d465e] hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#0d83fd]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-white border-b border-slate-200 shadow-xl py-5 px-4 flex flex-col space-y-3 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2"
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold text-[#2d465e] p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Home
          </Link>

          {/* Mobile Products Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg text-base font-bold text-[#2d465e] hover:bg-slate-50 transition-colors"
            >
              <span>Products ({products.length})</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProductsOpen && (
              <div className="pl-3 pr-1 py-2 space-y-2 border-l-2 border-blue-100 ml-2 mt-1">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="text-sm font-bold text-[#2d465e]">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.badge}</div>
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
              className="w-full flex items-center justify-between p-2 rounded-lg text-base font-bold text-[#2d465e] hover:bg-slate-50 transition-colors"
            >
              <span>Solutions</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSolutionsOpen && (
              <div className="pl-3 pr-1 py-2 space-y-2 border-l-2 border-blue-100 ml-2 mt-1">
                <Link
                  to="/solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-lg hover:bg-blue-50/50 text-xs text-[#0d83fd] font-bold uppercase tracking-wider"
                >
                  All Solutions Overview →
                </Link>
                {solutions.map((sol) => (
                  <Link
                    key={sol.id}
                    to={`/solutions/${sol.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="text-sm font-bold text-[#2d465e]">{sol.title}</div>
                    <div className="text-xs text-slate-500">{sol.subtitle}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold text-[#2d465e] p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold text-[#2d465e] p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Contact & Global Offices
          </Link>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md"
            >
              Get Started / Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

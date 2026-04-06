import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Products', path: '/' },
    { name: 'Solutions', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-sm' : 'bg-transparent py-4 md:py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-2.5 cursor-pointer group z-10">
          <Logo className="h-6 w-6 md:h-8 md:w-8" />
          <span className={`text-lg md:text-xl font-bold tracking-tight text-white`}>Saky Technologies</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
             <Link 
                key={item.name} 
                to={item.path} 
                className={`text-sm font-medium transition-colors hover:text-brand-lime text-white/80`}
             >
                {item.name}
             </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-10">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-lg transition-colors text-white hover:bg-white/10`}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 shadow-xl py-4 px-4 flex flex-col space-y-2 md:hidden animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white p-3 hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
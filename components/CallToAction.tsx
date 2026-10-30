import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Sparkles } from 'lucide-react';
import { companyConfig } from '../data/company';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="cta">
      <div className="container mx-auto px-4 md:px-6 relative">
        
        {/* iLanding CTA Container Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d83fd] to-[#0b66c2] text-white p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden shadow-2xl">
          
          {/* Abstract SVG Shape 1 */}
          <div className="absolute -top-24 -right-12 w-72 h-72 opacity-15 pointer-events-none rotate-45 animate-pulse-subtle">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-white">
              <path d="M47.1,-57.1C59.9,-45.6,68.5,-28.9,71.4,-10.9C74.2,7.1,71.3,26.3,61.5,41.1C51.7,55.9,35,66.2,16.9,69.2C-1.3,72.2,-21,67.8,-36.9,57.9C-52.8,48,-64.9,32.6,-69.1,15.1C-73.3,-2.4,-69.5,-22,-59.4,-37.1C-49.3,-52.2,-32.8,-62.9,-15.7,-64.9C1.5,-67,34.3,-68.5,47.1,-57.1Z" transform="translate(100 100)" />
            </svg>
          </div>

          {/* Abstract SVG Shape 2 */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 opacity-20 pointer-events-none -rotate-12 animate-float">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-white">
              <path d="M41.3,-49.1C54.4,-39.3,66.6,-27.2,71.1,-12.1C75.6,3,72.4,20.9,63.3,34.4C54.2,47.9,39.2,56.9,23.2,62.3C7.1,67.7,-10,69.4,-24.8,64.1C-39.7,58.8,-52.3,46.5,-60.1,31.5C-67.9,16.4,-70.9,-1.4,-66.3,-16.6C-61.8,-31.8,-49.7,-44.3,-36.3,-54C-22.9,-63.7,-8.2,-70.6,3.6,-75.1C15.4,-79.6,28.2,-58.9,41.3,-49.1Z" transform="translate(100 100)" />
            </svg>
          </div>

          {/* Dot Grid Pattern */}
          <div className="absolute top-6 left-12 w-36 h-36 opacity-20 pointer-events-none hidden sm:block">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#ffffff" />
              </pattern>
              <rect width="100" height="100" fill="url(#dot-pattern)" />
            </svg>
          </div>

          {/* Card Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Enterprise Consultation & Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight mb-6 leading-tight">
              Ready to Build Business Software Around The Way You Work?
            </h2>

            <p className="text-base sm:text-lg text-blue-50 mb-10 leading-relaxed font-normal max-w-2xl mx-auto">
              Schedule an architecture discovery session with our senior enterprise consultants. We will evaluate your operational workflows, statutory compliance mandates, and integration roadmap.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
              <Link 
                to="/contact"
                className="w-full sm:w-auto px-9 py-4 text-sm font-bold text-[#0d83fd] bg-white hover:bg-blue-50 rounded-full shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <span>Discuss Your Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-transparent hover:bg-white/10 rounded-full border-2 border-white transition-all text-center"
              >
                Explore Products
              </a>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-blue-100 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <span>Call Directly:</span>
                <a href={companyConfig.primaryPhoneLink} className="text-white hover:underline font-bold">
                  {companyConfig.primaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <span>Email Us:</span>
                <a href={companyConfig.primaryEmailLink} className="text-white hover:underline font-bold">
                  {companyConfig.primaryEmail}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CallToAction;

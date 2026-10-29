import React from 'react';
import { Brain, Workflow, LineChart, ShieldCheck, Sparkles, Network } from 'lucide-react';
import { LegacyProduct } from '../types';

const products: LegacyProduct[] = [
  {
    id: '1',
    name: 'Saky Predict',
    valueProp: 'Turn historical data into future foresight.',
    aiCapability: 'Advanced Time-Series Forecasting',
    icon: LineChart,
  },
  {
    id: '2',
    name: 'Saky Automate',
    valueProp: 'Streamline complex workflows autonomously.',
    aiCapability: 'Generative Process Automation',
    icon: Workflow,
    featured: true,
  },
  {
    id: '3',
    name: 'Saky Insight',
    valueProp: 'Deep customer understanding at scale.',
    aiCapability: 'Semantic NLP & Sentiment Analysis',
    icon: Brain,
  },
  {
    id: '4',
    name: 'Saky Guardian',
    valueProp: 'Real-time threat detection and compliance.',
    aiCapability: 'Anomaly Detection & Pattern Matching',
    icon: ShieldCheck,
  },
  {
    id: '5',
    name: 'ZatcaConnect',
    valueProp: 'Seamless middleware integration for KSA e-invoicing.',
    aiCapability: 'Automated ZATCA Phase 2 Compliance',
    icon: Network,
  },
];

const Products: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-brand-dark relative overflow-hidden" id="products">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-brand-dark to-brand-dark pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 animate-fade-in-up">
          <h2 className="text-xs md:text-sm font-bold tracking-wide text-brand-lime uppercase mb-2 md:mb-3">Our Platform</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Intelligent Solutions for Modern Enterprises
          </h3>
          <p className="text-base md:text-lg text-slate-400 leading-relaxed px-4 md:px-0">
            A unified suite of AI tools designed to solve specific business challenges with precision and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              style={{ animationDelay: `${index * 100}ms` }}
              className={`group relative p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border transition-all duration-500 animate-fade-in-up hover:-translate-y-2
                ${product.featured 
                  ? 'bg-gradient-to-b from-[#2e2a63] to-brand-dark border-brand-lime shadow-2xl shadow-brand-lime/10 ring-1 ring-brand-lime/50 z-10' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-xl hover:shadow-black/20'
                }`}
            >
              {product.featured && (
                <div className="absolute top-0 right-0 bg-brand-lime text-brand-dark text-[10px] font-bold uppercase tracking-wider py-1 px-2 md:py-1.5 md:px-3 rounded-bl-xl md:rounded-bl-2xl rounded-tr-2xl md:rounded-tr-3xl flex items-center gap-1 md:gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3" /> Featured
                </div>
              )}

              <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl shadow-sm border flex items-center justify-center mb-5 md:mb-6 lg:mb-8 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md
                ${product.featured ? 'bg-white/10 border-white/10' : 'bg-white/5 border-white/5 group-hover:bg-brand-lime/10 group-hover:border-brand-lime/20'}`}>
                <product.icon className={`h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 transition-colors duration-500 ${product.featured ? 'text-brand-lime' : 'text-slate-400 group-hover:text-brand-lime'}`} />
              </div>
              
              <h4 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 tracking-tight text-white">{product.name}</h4>
              <p className="mb-4 md:mb-6 min-h-0 sm:min-h-[3rem] md:h-12 leading-relaxed text-xs md:text-sm text-slate-400">{product.valueProp}</p>
              
              <div className={`pt-4 md:pt-5 lg:pt-6 border-t ${product.featured ? 'border-white/10' : 'border-white/5'}`}>
                <p className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-1 md:mb-1.5 lg:mb-2 ${product.featured ? 'text-slate-400' : 'text-slate-500'}`}>Core AI Capability</p>
                <p className={`text-xs md:text-sm font-medium leading-snug ${product.featured ? 'text-slate-200' : 'text-slate-300'}`}>{product.aiCapability}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
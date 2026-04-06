import React from 'react';
import { Landmark, HeartPulse, Truck, ShoppingBag, Server } from 'lucide-react';
import { Industry } from '../types';

const industries: Industry[] = [
  {
    name: 'Finance',
    description: 'Fraud detection and algorithmic trading strategies.',
    icon: Landmark,
  },
  {
    name: 'Healthcare',
    description: 'Patient outcome prediction and resource allocation.',
    icon: HeartPulse,
  },
  {
    name: 'Logistics',
    description: 'Route optimization and supply chain foresight.',
    icon: Truck,
  },
  {
    name: 'Retail',
    description: 'Dynamic pricing and hyper-personalized marketing.',
    icon: ShoppingBag,
  },
  {
    name: 'SaaS',
    description: 'Churn prediction and product usage analytics.',
    icon: Server,
  },
];

const Industries: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-brand-darker border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-brand-violet/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 md:mb-6 tracking-tight">Tailored for Your Industry</h2>
          <p className="text-sm md:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
             Our models are pre-trained on industry-specific datasets, ensuring rapid deployment and high accuracy out of the box.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {industries.map((ind, idx) => (
            <div 
                key={idx} 
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group relative flex flex-col items-center p-5 md:p-6 lg:p-8 bg-white/5 rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/5 w-full sm:w-[calc(50%-1rem)] lg:w-72 text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-brand-lime/20 hover:shadow-2xl hover:shadow-brand-lime/5 animate-fade-in-up backdrop-blur-sm"
            >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl lg:rounded-3xl bg-gradient-to-b from-transparent via-transparent to-brand-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl lg:rounded-2xl bg-brand-dark border border-white/10 mb-4 md:mb-6 shadow-lg group-hover:scale-110 group-hover:border-brand-lime/40 transition-all duration-500 z-10">
                 {/* Icon Glow */}
                 <div className="absolute inset-0 bg-brand-lime/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 <ind.icon className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-brand-lime relative z-10" />
              </div>
              
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-brand-lime transition-colors duration-300">{ind.name}</h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{ind.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
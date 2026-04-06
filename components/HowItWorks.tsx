import React from 'react';
import { Database, Cpu, Zap, TrendingUp } from 'lucide-react';
import { Step } from '../types';

const steps: Step[] = [
  {
    title: 'Data Ingestion',
    description: 'Connect to any data source—SQL, NoSQL, APIs, or data lakes—securely and in real-time.',
    icon: Database,
  },
  {
    title: 'AI Intelligence',
    description: 'Our proprietary models analyze your data to uncover hidden patterns and opportunities.',
    icon: Cpu,
  },
  {
    title: 'Automation & Insights',
    description: 'Workflows trigger automatically based on AI findings, reducing manual oversight.',
    icon: Zap,
  },
  {
    title: 'Business Impact',
    description: 'Measurable outcomes: reduced costs, higher revenue, and faster decision velocity.',
    icon: TrendingUp,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-darker text-white relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#ccf381 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">How Our AI Works</h2>
          <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2 sm:px-4 md:px-0">
            From raw data to realized ROI, our pipeline is designed for transparency and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand-violet via-brand-lime to-brand-violet opacity-20 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-brand-lime/5 group-hover:border-brand-lime transition-colors duration-300">
                <step.icon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-brand-lime/80 group-hover:text-brand-lime transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-white">{step.title}</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-[250px] sm:max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
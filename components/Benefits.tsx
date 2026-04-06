import React from 'react';
import { Zap, DollarSign, Layers, Shield, Plug } from 'lucide-react';
import { Benefit } from '../types';

const benefits: Benefit[] = [
  {
    title: 'Faster Decisions',
    description: 'Reduce analysis time from weeks to seconds with real-time AI processing.',
    icon: Zap,
  },
  {
    title: 'Cost Reduction',
    description: 'Identify inefficiencies and automate repetitive tasks to lower OpEx.',
    icon: DollarSign,
  },
  {
    title: 'Scalable Architecture',
    description: 'Built on Kubernetes to scale effortlessly as your data volume grows.',
    icon: Layers,
  },
  {
    title: 'Secure & Compliant',
    description: 'SOC2 Type II certified with end-to-end encryption for your sensitive data.',
    icon: Shield,
  },
  {
    title: 'Easy Integrations',
    description: 'Pre-built connectors for Salesforce, SAP, Snowflake, and 50+ other tools.',
    icon: Plug,
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Why Enterprise Leaders Choose Saky Technologies
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-slate-400 px-2 sm:px-4 md:px-0">
              We deliver the reliability and security that large organizations demand, without sacrificing agility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Featured Benefit Card */}
            <div className="bg-white/5 backdrop-blur-sm p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-lime rounded-lg flex items-center justify-center mb-4 md:mb-6">
                    <Zap className="h-5 w-5 md:h-6 md:w-6 text-brand-dark" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3">{benefits[0].title}</h3>
                <p className="text-xs md:text-sm lg:text-base text-slate-300 leading-relaxed">{benefits[0].description}</p>
            </div>

            {benefits.slice(1).map((benefit, idx) => (
                <div key={idx} className="bg-transparent p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:bg-brand-violet/20 transition-colors border border-white/5">
                        <benefit.icon className="h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-brand-violet transition-colors" />
                    </div>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3">{benefit.title}</h3>
                    <p className="text-xs md:text-sm lg:text-base text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
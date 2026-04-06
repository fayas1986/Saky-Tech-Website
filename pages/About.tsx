import React from 'react';
import { CheckCircle2, Building2, BrainCircuit, Globe, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-indigo-500 via-brand-lime to-indigo-500 opacity-10 rounded-full blur-3xl -z-10 animate-blob"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-slate-300 mb-6 md:mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-lime animate-pulse"></span>
              Discover Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight">
              About <span className="text-brand-lime">Saky Technologies</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto px-4 md:px-0">
              Saky Technologies Pvt Ltd is a technology-driven company specializing in Microsoft business solutions and AI-powered SaaS applications. We help organizations streamline operations, improve decision-making, and accelerate digital transformation through intelligent, scalable solutions.
            </p>
          </div>

          {/* Core Expertise */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">Our Core Expertise</h2>
              <div className="w-16 md:w-24 h-1 bg-brand-lime mx-auto mt-4 md:mt-6 rounded-full opacity-50"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Microsoft */}
              <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-blue-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Microsoft Business Applications</h3>
                <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">We are experts in implementing and supporting:</p>
                <ul className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                  <li className="flex items-start gap-3 md:gap-4">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-brand-lime shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-300 leading-relaxed"><strong>Microsoft Dynamics 365 Business Central</strong> – End-to-end ERP for small and mid-sized businesses</span>
                  </li>
                  <li className="flex items-start gap-3 md:gap-4">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-brand-lime shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-300 leading-relaxed"><strong>Microsoft Dynamics 365 Finance & Operations (F&O)</strong> – Enterprise-grade solution for finance, supply chain, and operations</span>
                  </li>
                </ul>
                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs md:text-sm text-slate-400 italic leading-relaxed">
                    Our services include implementation, customization, integration, migration, and ongoing support—ensuring maximum ROI from Microsoft technologies.
                  </p>
                </div>
              </div>

              {/* AI */}
              <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-500/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <BrainCircuit className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">AI-Powered SaaS Solutions</h3>
                <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8 leading-relaxed">
                  We design and develop AI-driven applications that enable businesses to automate processes, gain actionable insights, and enhance customer experiences.
                </p>
                <p className="text-sm md:text-base text-slate-200 font-semibold mb-4 md:mb-6">Our AI capabilities include:</p>
                <ul className="space-y-3 md:space-y-4">
                  {['Intelligent automation', 'Predictive analytics', 'Data-driven decision systems', 'Natural Language Processing (NLP)', 'AI-powered business workflows'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 md:gap-4">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-lime shadow-[0_0_8px_rgba(217,249,157,0.8)]"></div>
                      <span className="text-sm md:text-base text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* What We Offer & Industry Focus */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16 md:mb-24">
            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-indigo-500/20 rounded-lg md:rounded-xl border border-indigo-500/30">
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                </div>
                What We Offer
              </h2>
              <ul className="space-y-3 md:space-y-4">
                {[
                  'Custom Application Development & Maintenance',
                  'E-commerce Solutions',
                  'Application Modernization & Re-engineering',
                  'Data Analytics & Business Intelligence',
                  'Database Development & Management',
                  'Marketing Automation & Campaign Management'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 md:gap-4 bg-white/5 p-3 md:p-4 rounded-lg md:rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-lime shrink-0" />
                    <span className="text-sm md:text-base text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-teal-500/20 rounded-lg md:rounded-xl border border-teal-500/30">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />
                </div>
                Industry Focus
              </h2>
              <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">We deliver tailored solutions across:</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {['Banking & Financial Services', 'Healthcare', 'Logistics', 'Retail'].map((industry, idx) => (
                  <div key={idx} className="bg-white/5 text-slate-200 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-medium border border-white/10 hover:border-brand-lime/50 hover:bg-brand-lime/10 transition-all cursor-default">
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-brand-darker p-8 md:p-12 rounded-2xl md:rounded-3xl border border-indigo-500/20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-lime opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 tracking-tight">Our Vision</h2>
              <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
                Saky Technologies is committed to becoming a leading provider of Microsoft and AI-driven business solutions, delivering innovation, efficiency, and measurable value to our clients. In a short span, we have positioned ourselves as a competitive and reliable technology partner in the market.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default About;

import React from 'react';
import { Quote, Command, Aperture, Hexagon, Layers, Box } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Saky Technologies transformed our forecasting accuracy by 40% in just three months. The ROI was visible almost immediately.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Stratum Financial",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: '2',
    quote: "The security protocols are unmatched. We deployed to production in a highly regulated environment with zero compliance friction.",
    author: "Marcus Thorne",
    role: "VP of Engineering",
    company: "DataFlow Systems",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: '3',
    quote: "Finally, an AI platform that actually scales with our massive data ingestion needs. The integration was seamless.",
    author: "Elena Rodriguez",
    role: "Head of Data Science",
    company: "Nebula Logistics",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-dark border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Trusted By Strip */}
        <div className="text-center mb-12 md:mb-20 animate-fade-in-up">
          <p className="text-[10px] md:text-xs lg:text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 md:mb-8">
            Trusted by 500+ innovative enterprises
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <div className="flex items-center gap-1.5 md:gap-2 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl"><Command className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" /> Stratum</div>
             <div className="flex items-center gap-1.5 md:gap-2 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl"><Aperture className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" /> DataFlow</div>
             <div className="flex items-center gap-1.5 md:gap-2 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl"><Hexagon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" /> Nebula</div>
             <div className="flex items-center gap-1.5 md:gap-2 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl"><Layers className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" /> StackOne</div>
             <div className="flex items-center gap-1.5 md:gap-2 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl"><Box className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" /> CubeInc</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={item.id} 
              style={{ animationDelay: `${index * 150}ms` }}
              className="bg-white/5 p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/5 relative group hover:bg-white/10 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            >
              <Quote className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-brand-lime/20 mb-4 md:mb-6 group-hover:text-brand-lime transition-colors" />
              
              <p className="text-slate-200 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 font-medium">
                "{item.quote}"
              </p>
              
              <div className="flex items-center gap-3 md:gap-4 mt-auto">
                <img 
                  src={item.image} 
                  alt={item.author} 
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-brand-dark shadow-sm"
                />
                <div>
                  <h4 className="text-white font-bold text-xs md:text-sm">{item.author}</h4>
                  <p className="text-slate-500 text-[10px] md:text-xs font-medium">{item.role}, {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default SocialProof;
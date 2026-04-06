import React from 'react';
import { ArrowUpRight, Play, Activity, Box, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-36 md:pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-brand-dark">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-indigo-500/20 rounded-full blur-[60px] md:blur-[120px] animate-blob mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-brand-lime/10 rounded-full blur-[50px] md:blur-[100px] animate-blob animation-delay-200 mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] bg-violet-600/10 rounded-full blur-[60px] md:blur-[120px] animate-blob animation-delay-400 mix-blend-screen" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Text Content */}
          <div className="flex-1 w-full max-w-3xl text-center lg:text-left animate-fade-in-up mt-8 md:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-lime text-[10px] md:text-xs font-bold tracking-wide uppercase mb-6 md:mb-8 hover:bg-white/10 transition-colors cursor-default backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-lime"></span>
              </span>
              v2.0 Now Available
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 md:mb-8 leading-[1.2] lg:leading-[1.15]">
              Modern <span className="inline-flex items-center justify-center align-middle w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-brand-lime text-brand-dark mx-1 md:mx-2 rotate-3 hover:rotate-6 transition-transform"><Box className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" /></span> Intelligence & Scalable <span className="inline-flex items-center justify-center align-middle w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-indigo-500 text-white mx-1 md:mx-2 -rotate-3 hover:-rotate-6 transition-transform"><Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 fill-current" /></span> AI Solutions
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 delay-100 animate-fade-in-up font-light px-2 sm:px-4 md:px-0">
              Build intelligent applications that integrate seamlessly with your existing infrastructure. Optimized for speed, security, and enterprise scale.
            </p>
          </div>

          {/* Visual: Dashboard Mockup */}
          <div className="flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none relative group perspective-1000 delay-300 animate-fade-in-up mt-4 lg:mt-0">
             {/* Floating Glass Cards */}
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 transform transition-transform duration-700 hover:rotate-y-1 hover:scale-[1.02] ring-1 ring-white/10 animate-float">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">Growth Analytics</h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium">Real-time prediction engine</p>
                </div>
                <div className="p-2 md:p-2.5 bg-brand-lime/10 rounded-lg md:rounded-xl shadow-sm border border-brand-lime/20">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-brand-lime" />
                </div>
              </div>
              
              <div className="h-40 sm:h-48 md:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ccf381" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ccf381" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 500}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 500}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)', color: '#fff' }}
                      itemStyle={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}
                      cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                    />
                    <Area type="monotone" dataKey="uv" stroke="#ccf381" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 sm:mt-6 md:mt-8 flex flex-row gap-2 sm:gap-3 md:gap-4">
                 <div className="flex-1 bg-white/5 p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1 md:mb-2">Prediction</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">+24.5%</p>
                 </div>
                 <div className="flex-1 bg-brand-lime/10 p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border border-brand-lime/20 backdrop-blur-md">
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-brand-lime font-bold uppercase tracking-wider mb-1 md:mb-2">Efficiency</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">98.2%</p>
                 </div>
              </div>
            </div>

            {/* Decorative Elements around dashboard */}
            <div className="absolute -z-10 -top-4 -right-4 sm:-top-8 sm:-right-8 md:-top-12 md:-right-12 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-indigo-500 rounded-full blur-[30px] sm:blur-[40px] md:blur-[60px] opacity-40 animate-pulse"></div>
            <div className="absolute -z-10 -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-10 md:-left-10 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-brand-lime rounded-full blur-[30px] sm:blur-[40px] md:blur-[60px] opacity-20 animate-pulse animation-delay-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
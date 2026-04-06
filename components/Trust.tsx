import React from 'react';
import { Shield, Lock, Cloud, CheckCircle, Terminal } from 'lucide-react';

const Trust: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-dark border-t border-white/5 text-white relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-indigo-500/20 rounded-full blur-[60px] md:blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-brand-lime/5 rounded-full blur-[60px] md:blur-[100px]" />
        
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            
            <div className="w-full lg:w-1/2 animate-fade-in-up text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/30 border border-teal-800 text-teal-300 text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 shadow-glow">
                    <Shield className="w-3 h-3" />
                    Enterprise Grade
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3 md:mb-6 tracking-tight">Trust & Technology</h2>
                <p className="text-sm md:text-base lg:text-lg text-slate-400 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-4 md:px-0">
                    We understand that data privacy and system reliability are non-negotiable. Saky Technologies is built with a security-first mindset, ensuring your proprietary data never leaves your control without explicit permission.
                </p>

                <div className="space-y-4 md:space-y-6 text-left max-w-2xl mx-auto lg:mx-0">
                    <div className="flex items-start group">
                        <div className="p-2 rounded-lg bg-teal-500/10 mr-3 md:mr-4 group-hover:bg-teal-500/20 transition-colors mt-1">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-6 text-teal-400 flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm md:text-base lg:text-lg mb-1">Secure by Design</h4>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">End-to-end encryption (AES-256) and granular role-based access control (RBAC).</p>
                        </div>
                    </div>
                    <div className="flex items-start group">
                         <div className="p-2 rounded-lg bg-teal-500/10 mr-3 md:mr-4 group-hover:bg-teal-500/20 transition-colors mt-1">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-6 text-teal-400 flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm md:text-base lg:text-lg mb-1">Cloud-Native Architecture</h4>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">Deploy on AWS, Azure, GCP, or on-premise. Kubernetes ready.</p>
                        </div>
                    </div>
                    <div className="flex items-start group">
                        <div className="p-2 rounded-lg bg-teal-500/10 mr-3 md:mr-4 group-hover:bg-teal-500/20 transition-colors mt-1">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-6 text-teal-400 flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm md:text-base lg:text-lg mb-1">Compliance Ready</h4>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">GDPR, CCPA, SOC2, and HIPAA compliant infrastructure.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 relative perspective-1000 animate-fade-in-up delay-200 mt-6 lg:mt-0">
                {/* Visual Representation of Security */}
                <div className="relative bg-[#0f172a] rounded-xl border border-slate-700/50 shadow-2xl transform transition-transform hover:scale-[1.01] overflow-hidden max-w-md sm:max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between bg-slate-800/50 px-3 md:px-4 py-2 md:py-3 border-b border-slate-700/50">
                        <div className="flex gap-1.5 md:gap-2">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-[8px] md:text-[10px] lg:text-xs text-slate-400 font-mono flex items-center gap-1.5 md:gap-2">
                             <Terminal className="w-3 h-3" />
                             security_protocol.sh
                        </div>
                        <div className="w-6 md:w-8 lg:w-10"></div> {/* Spacer */}
                    </div>
                    
                    {/* Terminal Body */}
                    <div className="p-4 md:p-6 lg:p-8 font-mono text-[10px] md:text-xs lg:text-sm relative">
                        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0)_2px,rgba(15,23,42,1)_2px)] bg-[length:100%_4px] opacity-10 pointer-events-none"></div>
                        
                        <div className="space-y-3 md:space-y-4 relative z-10">
                            <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-2">
                                <span>Encryption Protocol</span>
                                <span className="text-teal-400 font-bold">TLS 1.3 / AES-256</span>
                            </div>
                            <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-2">
                                <span>Uptime (90 days)</span>
                                <span className="text-teal-400 font-bold">99.999%</span>
                            </div>
                            <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-2">
                                <span>Threats Blocked</span>
                                <span className="text-teal-400 font-bold">14,203</span>
                            </div>
                            
                            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-slate-900/50 rounded border border-slate-800 text-[8px] md:text-[10px] lg:text-xs">
                                <div className="flex items-center text-green-400 mb-1">
                                    <span className="mr-2">➜</span>
                                    <span>Initiating security scan...</span>
                                </div>
                                <div className="flex items-center text-slate-400 mb-1 pl-3 md:pl-4">
                                    <span>Checking firewall rules...</span>
                                    <span className="ml-auto text-green-500">OK</span>
                                </div>
                                <div className="flex items-center text-slate-400 mb-1 pl-3 md:pl-4">
                                    <span>Verifying integrity...</span>
                                    <span className="ml-auto text-green-500">OK</span>
                                </div>
                                <div className="flex items-center text-slate-400 pl-3 md:pl-4 animate-pulse">
                                    <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1.5 md:mr-2" />
                                    <span>System secure. Monitoring active.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -z-10 top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-500/5 to-transparent"></div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Trust;
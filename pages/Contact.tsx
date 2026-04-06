import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-indigo-500 via-brand-lime to-indigo-500 opacity-10 rounded-full blur-3xl -z-10 animate-blob"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10 md:mb-20 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-8 tracking-tight">
              Get in <span className="text-brand-lime">Touch</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto px-2 sm:px-4 md:px-0">
              Ready to transform your business with intelligent solutions? Our team of experts is here to help you navigate your digital transformation journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Contact Information & Map */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-white/5 backdrop-blur-sm p-5 md:p-8 rounded-xl md:rounded-3xl border border-white/10 shadow-xl">
                <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Contact Information</h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-lime/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-brand-lime/20">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-brand-lime" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Headquarters</h4>
                      <p className="text-slate-400 leading-relaxed text-xs md:text-sm">
                        M P M Street, Chennai,<br />
                        Tamil Nadu - 600011,<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Phone</h4>
                      <p className="text-slate-400 text-xs md:text-sm">+91 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-purple-500/20">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Email</h4>
                      <p className="text-slate-400 text-xs md:text-sm">contact@sakytechnologies.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white/5 backdrop-blur-sm p-2 md:p-4 rounded-xl md:rounded-3xl border border-white/10 shadow-xl h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.069417830612!2d80.2425253153443!3d13.11580809076156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x9e43b177e7488e3e!2sM%20P%20M%20St%2C%20Sanjay%20Gandhi%20Nagar%2C%20Perambur%2C%20Chennai%2C%20Tamil%20Nadu%20600011!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '0.75rem' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Saky Technologies Location"
                  className="grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm p-5 md:p-8 lg:p-10 rounded-xl md:rounded-3xl border border-white/10 shadow-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg md:text-2xl font-bold text-white mb-5 md:mb-8">Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-10 md:py-16">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-brand-lime/30">
                    <CheckCircle2 className="w-6 h-6 md:w-10 md:h-10 text-brand-lime" />
                  </div>
                  <h4 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">Message Sent!</h4>
                  <p className="text-xs md:text-base text-slate-400 mb-6 md:mb-8">Thank you for reaching out. One of our experts will get back to you shortly.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 md:px-8 md:py-3 text-xs md:text-base bg-white/10 text-white font-semibold rounded-lg md:rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required 
                        className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/5 border border-white/10 rounded-lg md:rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                        placeholder="John" 
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required 
                        className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/5 border border-white/10 rounded-lg md:rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">Work Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/5 border border-white/10 rounded-lg md:rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                      placeholder="john@company.com" 
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">Company</label>
                    <input 
                      type="text" 
                      id="company" 
                      className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/5 border border-white/10 rounded-lg md:rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                      placeholder="Acme Inc." 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">How can we help?</label>
                    <textarea 
                      id="message" 
                      required 
                      rows={4}
                      className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/5 border border-white/10 rounded-lg md:rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500 resize-none" 
                      placeholder="Tell us about your project or inquiry..." 
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full px-6 py-2.5 md:px-8 md:py-4 text-sm md:text-base font-bold text-brand-dark bg-brand-lime rounded-lg md:rounded-xl shadow-xl shadow-brand-lime/10 hover:bg-[#d9f99d] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

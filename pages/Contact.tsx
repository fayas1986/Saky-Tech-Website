import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, ExternalLink, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState<'singapore' | 'oman' | 'india'>('singapore');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const offices = {
    singapore: {
      name: 'Singapore Headquarters',
      badge: 'Global HQ',
      addressLines: [
        'Blk 71, #03-08 Ayer Rajah Crescent',
        'Singapore 139951'
      ],
      phone: '+65 6776 7822',
      phoneLink: 'tel:+6567767822',
      email: 'contact@sakytechnologies.com',
      lat: '1.296742',
      latDMS: "1° 17' 48.3\" N",
      lng: '103.786664',
      lngDMS: "103° 47' 12.0\" E",
      mapTitle: 'Saky Technologies - Singapore Headquarters (BLOCK71 @ one-north)',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.790576!2d103.786664!3d1.296742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1a52e9a7e373%3A0x6291a27e7ffc75f2!2sBLOCK71%20Singapore!5e0!3m2!1sen!2ssg!4v1710000000000!5m2!1sen!2ssg',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=1.296742,103.786664'
    },
    oman: {
      name: 'Oman Branch Office',
      badge: 'Branch Office',
      addressLines: [
        'PO BOX 220, Ruwi, PC112',
        'Muscat, Sultanate of Oman'
      ],
      phone: '+65 6776 7822',
      phoneLink: 'tel:+6567767822',
      email: 'contact@sakytechnologies.com',
      lat: '23.603056',
      latDMS: "23° 36' 11.0\" N",
      lng: '58.545833',
      lngDMS: "58° 32' 45.0\" E",
      mapTitle: 'Saky Technologies - Oman Branch Office (Ruwi, Muscat)',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14629.567!2d58.545833!3d23.603056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91f7a0c0e7b8cf%3A0x633e7d6cf87b9ec6!2sRuwi%2C%20Muscat%2C%20Oman!5e0!3m2!1sen!2som!4v1710000000000!5m2!1sen!2som',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=23.603056,58.545833'
    },
    india: {
      name: 'India Development Center',
      badge: 'R&D Center',
      addressLines: [
        'M P M Street, Sanjay Gandhi Nagar',
        'Perambur, Chennai, Tamil Nadu - 600011, India'
      ],
      phone: '+65 6776 7822',
      phoneLink: 'tel:+6567767822',
      email: 'contact@sakytechnologies.com',
      lat: '13.115808',
      latDMS: "13° 06' 56.9\" N",
      lng: '80.242525',
      lngDMS: "80° 14' 33.1\" E",
      mapTitle: 'Saky Technologies - India Development Center',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.069417830612!2d80.2425253153443!3d13.11580809076156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x9e43b177e7488e3e!2sM%20P%20M%20St%2C%20Sanjay%20Gandhi%20Nagar%2C%20Perambur%2C%20Chennai%2C%20Tamil%20Nadu%20600011!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=13.115808,80.242525'
    }
  };

  const current = offices[activeOffice];

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-indigo-500 via-brand-lime to-indigo-500 opacity-10 rounded-full blur-3xl -z-10 animate-blob"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-slate-300 mb-4 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-brand-lime animate-pulse" />
              Global Reach · Local Presence
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6 tracking-tight">
              Get in <span className="text-brand-lime">Touch</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto px-2 sm:px-4 md:px-0">
              Ready to transform your business with intelligent solutions? Connect with our global offices in Singapore, Oman, and India.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Contact Information & Map */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-white/5 backdrop-blur-sm p-5 md:p-8 rounded-xl md:rounded-3xl border border-white/10 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <h3 className="text-lg md:text-2xl font-bold text-white">Office Locations</h3>
                  {/* Office Switcher Tabs */}
                  <div className="inline-flex flex-wrap p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold gap-1">
                    <button
                      type="button"
                      onClick={() => setActiveOffice('singapore')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        activeOffice === 'singapore'
                          ? 'bg-brand-lime text-brand-dark shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Singapore (HQ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveOffice('oman')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeOffice === 'oman'
                          ? 'bg-brand-lime text-brand-dark shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Oman Office
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveOffice('india')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeOffice === 'india'
                          ? 'bg-brand-lime text-brand-dark shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      India Office
                    </button>
                  </div>
                </div>

                <div className="space-y-5 md:space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-lime/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-brand-lime/20">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-brand-lime" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold text-sm md:text-base">{current.name}</h4>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-lime/10 text-brand-lime border border-brand-lime/20">
                          {current.badge}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs md:text-sm">
                        {current.addressLines.map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < current.addressLines.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Telephone</h4>
                      <a 
                        href={current.phoneLink} 
                        className="text-slate-300 hover:text-brand-lime transition-colors text-xs md:text-sm font-medium tracking-wide"
                      >
                        {current.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border border-purple-500/20">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Email</h4>
                      <a 
                        href={`mailto:${current.email}`} 
                        className="text-slate-300 hover:text-brand-lime transition-colors text-xs md:text-sm"
                      >
                        {current.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl md:rounded-3xl border border-white/10 shadow-xl overflow-hidden relative group">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                    <span className="text-xs md:text-sm font-semibold text-white">{current.name}</span>
                  </div>
                  <a
                    href={current.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-brand-lime transition-colors"
                  >
                    Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="h-[220px] sm:h-[270px] md:h-[320px] rounded-lg md:rounded-2xl overflow-hidden relative">
                  <iframe 
                    key={activeOffice}
                    src={current.mapSrc} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={current.mapTitle}
                    className="grayscale contrast-125 opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  ></iframe>
                </div>
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
                    className="w-full px-6 py-2.5 md:px-8 md:py-4 text-sm md:text-base font-bold text-brand-dark bg-brand-lime rounded-lg md:rounded-xl shadow-xl shadow-brand-lime/10 hover:bg-[#d9f99d] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
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

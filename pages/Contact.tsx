import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, CheckCircle2, ExternalLink, Globe, Shield, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { officeLocations } from '../data/company';

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeOffice, setActiveOffice] = useState<'singapore' | 'oman' | 'india'>('singapore');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    interestType: searchParams.get('interest') || (searchParams.get('product') ? 'product' : 'general'),
    selectedProduct: searchParams.get('product') || '',
    message: '',
    consent: false
  });

  useEffect(() => {
    const prodParam = searchParams.get('product');
    const interestParam = searchParams.get('interest');
    if (prodParam) {
      setFormData(prev => ({ ...prev, selectedProduct: prodParam, interestType: 'product' }));
    } else if (interestParam) {
      setFormData(prev => ({ ...prev, interestType: interestParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Simulated validated local handler pending Phase 5 webhook integration
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      setSubmitError('Unable to submit enquiry at this time. Please email us directly at contact@sakytechnologies.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = {
    singapore: {
      ...officeLocations.singapore,
      lat: '1.296742',
      lng: '103.786664',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.790576!2d103.786664!3d1.296742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1a52e9a7e373%3A0x6291a27e7ffc75f2!2sBLOCK71%20Singapore!5e0!3m2!1sen!2ssg!4v1710000000000!5m2!1sen!2ssg'
    },
    oman: {
      ...officeLocations.oman,
      lat: '23.603056',
      lng: '58.545833',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14629.567!2d58.545833!3d23.603056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91f7a0c0e7b8cf%3A0x633e7d6cf87b9ec6!2sRuwi%2C%20Muscat%2C%20Oman!5e0!3m2!1sen!2som!4v1710000000000!5m2!1sen!2som'
    },
    india: {
      ...officeLocations.india,
      lat: '13.115808',
      lng: '80.242525',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.069417830612!2d80.2425253153443!3d13.11580809076156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x9e43b177e7488e3e!2sM%20P%20M%20St%2C%20Sanjay%20Gandhi%20Nagar%2C%20Perambur%2C%20Chennai%2C%20Tamil%20Nadu%20600011!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin'
    }
  };

  const current = offices[activeOffice];

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-indigo-500 via-brand-lime to-indigo-500 opacity-10 rounded-full blur-3xl -z-10 animate-blob pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-slate-300 mb-4 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-brand-lime animate-pulse" />
              Singapore · Sultanate of Oman · India
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6 tracking-tight">
              Enterprise <span className="text-brand-lime">Enquiries & Consultation</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto px-2 sm:px-4 md:px-0">
              Connect with our solutions architects to discuss SaaS product demonstrations, Microsoft Dynamics 365 implementation, or custom software requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* Contact Information & Office Switcher */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up">
              <div className="bg-white/5 backdrop-blur-sm p-5 md:p-8 rounded-xl md:rounded-3xl border border-white/10 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <h2 className="text-lg md:text-2xl font-bold text-white">Global Offices</h2>
                  
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
                      India Center
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
                        <h3 className="text-white font-semibold text-sm md:text-base">{current.title}</h3>
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
                    <span className="text-xs md:text-sm font-semibold text-white">{current.title}</span>
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
                <div className="h-[220px] sm:h-[260px] rounded-lg md:rounded-2xl overflow-hidden relative">
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

            {/* Contact & Lead Form */}
            <div className="bg-white/5 backdrop-blur-sm p-5 md:p-8 lg:p-10 rounded-xl md:rounded-3xl border border-white/10 shadow-xl animate-fade-in-up">
              <h2 className="text-lg md:text-2xl font-bold text-white mb-2">Discuss Your Requirements</h2>
              <p className="text-xs md:text-sm text-slate-400 mb-6">
                Complete this form to request a product walkthrough or enterprise consultation.
              </p>

              {isSubmitted ? (
                <div className="text-center py-10 md:py-16">
                  <div className="w-14 h-14 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-lime/30 text-brand-lime">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Enquiry Received</h3>
                  <p className="text-xs md:text-sm text-slate-300 max-w-sm mx-auto mb-6">
                    Thank you, {formData.firstName}. Your consultation request has been logged. Our solutions team will review your requirements and reach out within 1 business day.
                  </p>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        company: '',
                        interestType: 'general',
                        selectedProduct: '',
                        message: '',
                        consent: false
                      });
                    }}
                    className="px-6 py-2.5 text-xs font-semibold bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-medium text-slate-300 mb-1.5">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        required 
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                        placeholder="John" 
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-medium text-slate-300 mb-1.5">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        required 
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">Work Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                        placeholder="john@company.com" 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                        placeholder="+65 6776 7822" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-slate-300 mb-1.5">Company Name *</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500" 
                      placeholder="Acme Enterprise Ltd." 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="interestType" className="block text-xs font-medium text-slate-300 mb-1.5">Primary Interest *</label>
                      <select
                        id="interestType"
                        name="interestType"
                        value={formData.interestType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-darker border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none text-white"
                      >
                        <option value="product">SaaS Product Walkthrough</option>
                        <option value="erp-integration">Microsoft Dynamics 365 / ERP</option>
                        <option value="custom-engineering">Custom Software Engineering</option>
                        <option value="general">General Partnership / Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="selectedProduct" className="block text-xs font-medium text-slate-300 mb-1.5">Specific Product</label>
                      <select
                        id="selectedProduct"
                        name="selectedProduct"
                        value={formData.selectedProduct}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-darker border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none text-white"
                      >
                        <option value="">-- Select Product (Optional) --</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.badge})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">Project Details / Requirements *</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-lime outline-none transition-all text-white placeholder-slate-500 resize-none" 
                      placeholder="Please share your current ERP environment, team size, timeline, or key objectives..." 
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-brand-lime focus:ring-brand-lime"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                      I agree that Saky Technologies may contact me regarding this enquiry. We respect your confidentiality and never share contact details.
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-2 px-6 py-3.5 text-sm font-bold text-brand-dark bg-brand-lime rounded-xl shadow-xl shadow-brand-lime/10 hover:bg-[#d9f99d] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-lime"
                  >
                    {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enterprise Enquiry'}
                    <Send className="w-4 h-4" />
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

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, CheckCircle2, ExternalLink, Globe } from 'lucide-react';
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

    try {
      // Compose mailto payload to route submission to amd@sakytek.com
      const subject = encodeURIComponent(
        `[Saky Enquiry] ${formData.interestType.toUpperCase()} - ${formData.company || formData.firstName}`
      );
      const body = encodeURIComponent(
        `Full Name: ${formData.firstName} ${formData.lastName}\n` +
        `Work Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'N/A'}\n` +
        `Company: ${formData.company}\n` +
        `Primary Interest: ${formData.interestType}\n` +
        `Specific Product: ${formData.selectedProduct || 'General / None'}\n\n` +
        `Project Details / Requirements:\n${formData.message}\n`
      );

      // Open mail client addressed directly to amd@sakytek.com
      const mailtoLink = `mailto:amd@sakytek.com?subject=${subject}&body=${body}`;
      
      const mailWindow = window.open(mailtoLink, '_blank');
      if (!mailWindow) {
        window.location.href = mailtoLink;
      }

      await new Promise(resolve => setTimeout(resolve, 600));
      setIsSubmitted(true);
    } catch {
      setSubmitError('Unable to route enquiry. Please email us directly at amd@sakytek.com');
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
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#f3f9ff]/60 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-4 shadow-sm">
              <Globe className="w-3.5 h-3.5" />
              <span>Singapore · Oman · India</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
              Enterprise <span className="text-[#0d83fd]">Enquiries & Consultation</span>
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Connect with our enterprise solutions architects to discuss SaaS demonstrations, Microsoft Dynamics 365 implementation, or custom software requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* Contact Information & Office Switcher (iLanding Left Box) */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up">
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-[0_5px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-bold font-heading text-[#2d465e]">Global Offices</h2>
                  
                  {/* Office Switcher Tabs */}
                  <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold gap-1">
                    <button
                      type="button"
                      onClick={() => setActiveOffice('singapore')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeOffice === 'singapore'
                          ? 'bg-[#0d83fd] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#2d465e]'
                      }`}
                    >
                      Singapore (HQ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveOffice('oman')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeOffice === 'oman'
                          ? 'bg-[#0d83fd] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#2d465e]'
                      }`}
                    >
                      Oman
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveOffice('india')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeOffice === 'india'
                          ? 'bg-[#0d83fd] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#2d465e]'
                      }`}
                    >
                      India
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#0d83fd] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[#2d465e] font-bold font-heading text-base">{current.title}</h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#0d83fd]">
                          {current.badge}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
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
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#0d83fd] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[#2d465e] font-bold font-heading text-sm">Telephone</h4>
                      <a 
                        href={current.phoneLink} 
                        className="text-slate-600 hover:text-[#0d83fd] transition-colors text-xs sm:text-sm font-semibold"
                      >
                        {current.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#0d83fd] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[#2d465e] font-bold font-heading text-sm">Email</h4>
                      <a 
                        href={`mailto:${current.email}`} 
                        className="text-slate-600 hover:text-[#0d83fd] transition-colors text-xs sm:text-sm font-semibold"
                      >
                        {current.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map Box */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-[0_5px_30px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-bold text-[#2d465e]">{current.title}</span>
                  <a
                    href={current.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0d83fd] hover:underline"
                  >
                    Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="h-[220px] rounded-2xl overflow-hidden border border-slate-100">
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
                  />
                </div>
              </div>
            </div>

            {/* Contact & Lead Form (iLanding Right Form) */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-[0_5px_30px_rgba(0,0,0,0.04)] animate-fade-in-up">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2d465e] mb-2">
                Discuss Your Requirements
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Complete this form to request a product walkthrough or enterprise architecture consultation.
              </p>

              {isSubmitted ? (
                <div className="text-center py-10 md:py-16">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-[#2d465e] mb-2">Enquiry Received</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-6">
                    Thank you, {formData.firstName}. Your consultation request has been logged. Our enterprise solutions team will reach out within 1 business day.
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
                    className="px-6 py-2.5 text-xs font-bold text-[#0d83fd] bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-bold text-slate-700 mb-1.5">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        required 
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none transition-all text-slate-800 placeholder-slate-400" 
                        placeholder="John" 
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-bold text-slate-700 mb-1.5">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        required 
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none transition-all text-slate-800 placeholder-slate-400" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">Work Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none transition-all text-slate-800 placeholder-slate-400" 
                        placeholder="john@company.com" 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none transition-all text-slate-800 placeholder-slate-400" 
                        placeholder="+65 6776 7822" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-bold text-slate-700 mb-1.5">Company Name *</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none transition-all text-slate-800 placeholder-slate-400" 
                      placeholder="Acme Enterprise Ltd." 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="interestType" className="block text-xs font-bold text-slate-700 mb-1.5">Primary Interest *</label>
                      <select
                        id="interestType"
                        name="interestType"
                        value={formData.interestType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none text-slate-800"
                      >
                        <option value="product">SaaS Product Walkthrough</option>
                        <option value="erp-integration">Microsoft Dynamics 365 / ERP</option>
                        <option value="custom-engineering">Custom Software Engineering</option>
                        <option value="general">General Partnership / Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="selectedProduct" className="block text-xs font-bold text-slate-700 mb-1.5">Specific Product</label>
                      <select
                        id="selectedProduct"
                        name="selectedProduct"
                        value={formData.selectedProduct}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none text-slate-800"
                      >
                        <option value="">-- Select Product (Optional) --</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.badge})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">Project Details / Requirements *</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0d83fd] outline-none transition-all text-slate-800 placeholder-slate-400 resize-none" 
                      placeholder="Please share your current ERP environment, team size, timeline, or key objectives..." 
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0d83fd] focus:ring-[#0d83fd]"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                      I agree that Saky Technologies may contact me regarding this enquiry. We respect your confidentiality and never share contact details.
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-2 px-8 py-3.5 text-sm font-bold text-white bg-[#0d83fd] hover:bg-[#0b66c2] rounded-full shadow-md shadow-blue-500/25 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

import React, { useRef, useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Phone,
  Mail,
  MessageCircle,
  Building2,
} from 'lucide-react';
import {
  trackZatcaEvent,
  getCapturedUtmParameters,
} from '../utils/analytics';
import { companyConfig } from '../data/company';

interface ZatcaDemoFormProps {
  defaultErpSystem?: string;
  sourcePage?: string;
  heading?: string;
  subheading?: string;
}

interface FormValues {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  erpSystem: string;
  invoiceVolume: string;
  branchCount: string;
  integrationRequirement: string;
  consent: boolean;
  honeypotWebsite: string;
}

interface DeliveryConfirmation {
  enquiryId: string;
  deliveryId: string;
  provider: string;
  recipient: string;
  submittedAt: string;
}

const INITIAL_VALUES: FormValues = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  erpSystem: '',
  invoiceVolume: '',
  branchCount: '',
  integrationRequirement: '',
  consent: false,
  honeypotWebsite: '',
};

const ZatcaDemoForm: React.FC<ZatcaDemoFormProps> = ({
  defaultErpSystem = '',
  sourcePage = '/products/zatca-connect',
  heading = 'Request a ZATCA Phase 2 Technical Demo',
  subheading = 'Share your existing ERP environment and monthly invoice volume. Our integration engineers will walk you through the middleware architecture, UBL 2.1 XML transformation, and CSID onboarding flow.',
}) => {
  const [formData, setFormData] = useState<FormValues>({
    ...INITIAL_VALUES,
    erpSystem: defaultErpSystem,
  });
  const hasStartedRef = useRef<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deliveryMeta, setDeliveryMeta] = useState<DeliveryConfirmation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const triggerFormStart = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackZatcaEvent('zatca_form_start', {
        form_location: sourcePage,
        default_erp: defaultErpSystem || 'unspecified',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    triggerFormStart();
    const { name, value, type } = e.target;
    const nextValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (fieldErrors[name as keyof FormValues]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormValues, string>> = {};

    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      errors.companyName = 'Please enter your company or legal entity name.';
    }
    if (!formData.contactName.trim() || formData.contactName.trim().length < 2) {
      errors.contactName = 'Please enter the contact person’s full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid business email address.';
    }
    const cleanedPhone = formData.phone.replace(/[\s\-().]/g, '');
    const saudiOrIntlRegex = /^(?:(?:\+?966|00966|0)?(?:5\d{8}|1[1-9]\d{7})|\+?[1-9]\d{7,14})$/;
    if (
      !cleanedPhone ||
      !saudiOrIntlRegex.test(cleanedPhone) ||
      /^(\d)\1+$/.test(cleanedPhone.replace(/^\+/, ''))
    ) {
      errors.phone =
        'Please enter a valid Saudi (+966 5X XXX XXXX) or international business phone number.';
    }
    if (!formData.erpSystem) {
      errors.erpSystem = 'Please select your current ERP, POS, or accounting system.';
    }
    if (!formData.invoiceVolume) {
      errors.invoiceVolume = 'Please select your approximate monthly invoice volume.';
    }
    if (!formData.branchCount) {
      errors.branchCount = 'Please select the number of branches or VAT group entities.';
    }
    if (!formData.integrationRequirement.trim() || formData.integrationRequirement.trim().length < 10) {
      errors.integrationRequirement =
        'Please briefly describe your integration requirement (e.g., B2B clearance, B2C POS reporting, CSID onboarding).';
    }
    if (!formData.consent) {
      errors.consent = 'Please confirm consent so our engineering team can respond to your enquiry.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setDeliveryMeta(null);

    if (!validateForm()) {
      setErrorMessage('Please review and complete the highlighted mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const utm = getCapturedUtmParameters();
      const simulateFail =
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('simulate_delivery_failure') === '1';

      const response = await fetch('/api/zatca-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(simulateFail ? { 'X-Simulate-Delivery-Failure': '1' } : {}),
        },
        body: JSON.stringify({
          companyName: formData.companyName.trim(),
          contactName: formData.contactName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          erpSystem: formData.erpSystem,
          invoiceVolume: formData.invoiceVolume,
          branchCount: formData.branchCount,
          integrationRequirement: formData.integrationRequirement.trim(),
          consent: formData.consent,
          honeypotWebsite: formData.honeypotWebsite,
          sourcePage,
          utm,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || result.ok !== true || !result.deliveryId) {
        if (result?.fieldErrors && typeof result.fieldErrors === 'object') {
          setFieldErrors(result.fieldErrors);
        }
        setErrorMessage(
          result?.message ||
            `Enquiry delivery failed (HTTP ${response.status}). Please verify your details or email us directly at ${companyConfig.primaryEmail}.`
        );
        return;
      }

      // Only fire zatca_form_submit and display success state when server confirms actual delivery
      trackZatcaEvent('zatca_form_submit', {
        form_location: sourcePage,
        erp_system: formData.erpSystem,
        monthly_invoice_volume: formData.invoiceVolume,
        branch_count: formData.branchCount,
        delivery_provider: result.provider || 'verified',
      });

      setDeliveryMeta({
        enquiryId: result.enquiryId,
        deliveryId: result.deliveryId,
        provider: result.provider,
        recipient: result.recipient || companyConfig.primaryEmail,
        submittedAt: result.submittedAt,
      });
      setIsSubmitted(true);
    } catch {
      setErrorMessage(
        `Network error while transmitting your enquiry to ${companyConfig.primaryEmail}. Please check your connection or email us directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="zatca-demo-form"
      aria-labelledby="zatca-demo-form-heading"
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(13,131,253,0.06)]"
    >
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>KSA Enterprise Integration Assessment</span>
        </div>
        <h2
          id="zatca-demo-form-heading"
          className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2d465e] mb-2"
        >
          {heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{subheading}</p>
      </div>

      {isSubmitted && deliveryMeta ? (
        <div
          role="status"
          aria-live="polite"
          data-testid="zatca-form-success"
          className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center"
        >
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#2d465e] mb-2">
            Technical Demo Enquiry Delivered
          </h3>
          <p className="text-sm text-slate-700 max-w-xl mx-auto mb-4 leading-relaxed">
            Thank you, <strong>{formData.contactName}</strong>. Your ZATCA Phase 2 integration
            enquiry for <strong>{formData.companyName}</strong> ({formData.erpSystem}) has been
            delivered to our solutions engineering desk at{' '}
            <a
              href={companyConfig.primaryEmailLink}
              className="text-[#0d83fd] font-bold underline"
            >
              {deliveryMeta.recipient}
            </a>
            .
          </p>
          <p
            data-testid="zatca-delivery-reference"
            className="text-xs font-mono text-slate-500 mb-6"
          >
            Reference ID: {deliveryMeta.enquiryId} · Delivery Confirmation: {deliveryMeta.deliveryId}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={companyConfig.primaryPhoneLink}
              onClick={() =>
                trackZatcaEvent('zatca_phone_click', {
                  click_location: `${sourcePage}#form-success`,
                })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-[#2d465e] hover:border-[#0d83fd] hover:text-[#0d83fd] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0d83fd]" />
              Call Engineering Desk: {companyConfig.primaryPhone}
            </a>
            <a
              href={companyConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackZatcaEvent('zatca_whatsapp_click', {
                  click_location: `${sourcePage}#form-success`,
                })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp KSA Integration Desk
            </a>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setDeliveryMeta(null);
                hasStartedRef.current = false;
                setFormData({ ...INITIAL_VALUES, erpSystem: defaultErpSystem });
              }}
              className="px-5 py-2.5 bg-[#0d83fd] text-white rounded-full text-xs font-bold hover:bg-[#0b66c2] transition-colors"
            >
              Submit Another Requirement
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {errorMessage && (
            <div
              role="alert"
              data-testid="zatca-form-error"
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Honeypot anti-spam field (hidden from real users & screen readers) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="zatca-honeypot-website">Company Website URL</label>
            <input
              id="zatca-honeypot-website"
              type="text"
              name="honeypotWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypotWebsite}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 1. Company Name */}
            <div>
              <label
                htmlFor="zatca-companyName"
                className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="zatca-companyName"
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onFocus={triggerFormStart}
                onChange={handleChange}
                placeholder="e.g. Al-Manar Trading Co. LLC"
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all"
              />
              {fieldErrors.companyName && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.companyName}</p>
              )}
            </div>

            {/* 2. Contact Person's Name */}
            <div>
              <label
                htmlFor="zatca-contactName"
                className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
              >
                Contact Person&apos;s Name <span className="text-red-500">*</span>
              </label>
              <input
                id="zatca-contactName"
                type="text"
                name="contactName"
                required
                value={formData.contactName}
                onFocus={triggerFormStart}
                onChange={handleChange}
                placeholder="Full Name & Role (e.g. IT Director / CFO)"
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all"
              />
              {fieldErrors.contactName && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.contactName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 3. Business Email */}
            <div>
              <label
                htmlFor="zatca-email"
                className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
              >
                Business Email <span className="text-red-500">*</span>
              </label>
              <input
                id="zatca-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onFocus={triggerFormStart}
                onChange={handleChange}
                placeholder="name@company.com.sa"
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            {/* 4. Saudi Phone Number */}
            <div>
              <label
                htmlFor="zatca-phone"
                className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
              >
                Saudi / Business Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="zatca-phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onFocus={triggerFormStart}
                onChange={handleChange}
                placeholder="+966 5X XXX XXXX"
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all"
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* 5. ERP / Accounting System */}
            <div>
              <label
                htmlFor="zatca-erpSystem"
                className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
              >
                ERP / Accounting System <span className="text-red-500">*</span>
              </label>
              <select
                id="zatca-erpSystem"
                name="erpSystem"
                required
                value={formData.erpSystem}
                onFocus={triggerFormStart}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all"
              >
                <option value="">Select ERP / System...</option>
                <option value="Microsoft Dynamics 365 Finance & Operations">
                  Microsoft Dynamics 365 Finance &amp; Operations (F&amp;O)
                </option>
                <option value="Microsoft Dynamics 365 Business Central">
                  Microsoft Dynamics 365 Business Central
                </option>
                <option value="Custom ERP / In-House Billing">
                  Custom ERP / In-House Billing Application
                </option>
                <option value="POS / Retail Billing System">
                  Point-of-Sale (POS) / Retail Billing System
                </option>
                <option value="SAP S/4HANA or SAP ECC (via API Middleware)">
                  SAP S/4HANA or SAP ECC (API Middleware)
                </option>
                <option value="Oracle NetSuite or EBS (via API Middleware)">
                  Oracle NetSuite or EBS (API Middleware)
                </option>
                <option value="Other ERP / Accounting Platform">
                  Other ERP / Accounting Platform
                </option>
              </select>
              {fieldErrors.erpSystem && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.erpSystem}</p>
              )}
            </div>

            {/* 6. Approximate Monthly Invoice Volume */}
            <div>
              <label
                htmlFor="zatca-invoiceVolume"
                className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
              >
                Monthly Invoice Volume <span className="text-red-500">*</span>
              </label>
              <select
                id="zatca-invoiceVolume"
                name="invoiceVolume"
                required
                value={formData.invoiceVolume}
                onFocus={triggerFormStart}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all"
              >
                <option value="">Select Monthly Volume...</option>
                <option value="Under 1,000 invoices/month">Under 1,000 invoices / month</option>
                <option value="1,000 - 10,000 invoices/month">1,000 – 10,000 invoices / month</option>
                <option value="10,000 - 50,000 invoices/month">10,000 – 50,000 invoices / month</option>
                <option value="50,000 - 250,000 invoices/month">50,000 – 250,000 invoices / month</option>
                <option value="250,000+ invoices/month">250,000+ invoices / month</option>
              </select>
              {fieldErrors.invoiceVolume && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.invoiceVolume}</p>
              )}
            </div>

            {/* 7. Number of Branches */}
            <div>
              <label
                htmlFor="zatca-branchCount"
                className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
              >
                Number of Branches <span className="text-red-500">*</span>
              </label>
              <select
                id="zatca-branchCount"
                name="branchCount"
                required
                value={formData.branchCount}
                onFocus={triggerFormStart}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all"
              >
                <option value="">Select Branches / CSIDs...</option>
                <option value="1 Branch (Single CSID)">1 Branch (Single Entity)</option>
                <option value="2 - 5 Branches">2 – 5 Branches / Locations</option>
                <option value="6 - 20 Branches">6 – 20 Branches / POS Locations</option>
                <option value="20+ Branches / VAT Group">20+ Branches / Multi-Entity VAT Group</option>
              </select>
              {fieldErrors.branchCount && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.branchCount}</p>
              )}
            </div>
          </div>

          {/* 8. Integration Requirement */}
          <div>
            <label
              htmlFor="zatca-integrationRequirement"
              className="block text-xs font-bold text-[#2d465e] uppercase tracking-wider mb-2"
            >
              Integration Requirement &amp; Scope <span className="text-red-500">*</span>
            </label>
            <textarea
              id="zatca-integrationRequirement"
              name="integrationRequirement"
              rows={4}
              required
              value={formData.integrationRequirement}
              onFocus={triggerFormStart}
              onChange={handleChange}
              placeholder="Describe your transaction types (B2B Standard Tax Invoices, B2C Simplified POS Invoices, Credit/Debit Notes), target ZATCA integration wave deadline, and preferred hosting model (Cloud or On-Premises)."
              className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-[#2d465e] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0d83fd] focus:bg-white focus:ring-2 focus:ring-[#0d83fd]/15 transition-all resize-none"
            />
            {fieldErrors.integrationRequirement && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.integrationRequirement}</p>
            )}
          </div>

          {/* Privacy & Consent */}
          <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <input
                id="zatca-consent"
                type="checkbox"
                name="consent"
                required
                checked={formData.consent}
                onFocus={triggerFormStart}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0d83fd] focus:ring-[#0d83fd]"
              />
              <label htmlFor="zatca-consent" className="text-xs text-slate-600 leading-relaxed">
                I consent to Saky Technologies processing the submitted business contact and ERP architecture details
                solely to evaluate ZATCA Phase 2 integration requirements and schedule a technical consultation. We do
                not sell or share corporate enquiry data with third parties. <span className="text-red-500">*</span>
              </label>
            </div>
            {fieldErrors.consent && (
              <p className="mt-1.5 text-xs text-red-600 pl-7">{fieldErrors.consent}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <a
                href={companyConfig.primaryPhoneLink}
                data-testid="zatca-form-phone-cta"
                onClick={() =>
                  trackZatcaEvent('zatca_phone_click', {
                    click_location: `${sourcePage}#form-footer`,
                  })
                }
                className="inline-flex items-center gap-1.5 font-semibold text-[#2d465e] hover:text-[#0d83fd] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0d83fd]" />
                {companyConfig.primaryPhone}
              </a>
              <a
                href={companyConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="zatca-form-whatsapp-cta"
                onClick={() =>
                  trackZatcaEvent('zatca_whatsapp_click', {
                    click_location: `${sourcePage}#form-footer`,
                  })
                }
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp Integration Desk
              </a>
              <a
                href={companyConfig.primaryEmailLink}
                className="inline-flex items-center gap-1.5 font-semibold text-[#2d465e] hover:text-[#0d83fd] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0d83fd]" />
                {companyConfig.primaryEmail}
              </a>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <Building2 className="w-3.5 h-3.5" />
                GCC &amp; KSA Integration Desk
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] disabled:opacity-50 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25"
            >
              <span>{isSubmitting ? 'Submitting to Engineering Desk...' : 'Request a Technical Demo'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ZatcaDemoForm;

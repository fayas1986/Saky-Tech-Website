import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does TaxFlow connect with our existing ERP?",
    answer: "TaxFlow provides verified, pre-built connectors for Microsoft Dynamics 365 Business Central, SAP S/4HANA, and Tally Prime, alongside a documented REST API and secure batch Excel pipeline. It pulls inward purchase invoices without altering your core chart of accounts."
  },
  {
    question: "Is ZATCA Connect compliant with Saudi Phase 2 (FATOORA) mandates?",
    answer: "Yes. ZATCA Connect generates compliant UBL 2.1 XML invoices with ECDSA cryptographic signatures, CSID credential management, and cryptographic QR codes. It handles real-time clearance and reporting APIs with persistent offline retry buffers."
  },
  {
    question: "Can we deploy Saky SaaS platforms on our private cloud or on-premises?",
    answer: "Yes. In addition to our enterprise multi-tenant cloud, we provide Single-Tenant Virtual Private Cloud (VPC) deployments on Microsoft Azure and AWS within your preferred jurisdiction to meet statutory data sovereignty requirements."
  },
  {
    question: "What Microsoft Dynamics 365 services do your consultants provide?",
    answer: "Our certified practice covers complete lifecycle implementations, AL extension development for Business Central, X++ development for Finance & Operations (F&O), custom API integrations, legacy ERP data migration, and Power BI executive analytics."
  },
  {
    question: "How long does a typical implementation or migration take?",
    answer: "Standard SaaS connector integrations (like TaxFlow or ZATCA Connect) typically deploy in 1 to 2 weeks. Comprehensive Microsoft Dynamics 365 ERP implementations or custom engineering engagements range from 4 to 12 weeks depending on custom workflows and data migration volume."
  }
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-[#f3f9ff] relative overflow-hidden" id="faq">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: iLanding FAQ Title, Description & Arrow Vector */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-4 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4 leading-tight">
              Have questions? <br />
              <span className="text-[#0d83fd]">Check our answers.</span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-8">
              Explore key questions regarding ERP integration, statutory data sovereignty, deployment options, and our Microsoft Dynamics implementation methodology.
            </p>

            {/* iLanding Decorative Arrow Vector (Desktop) */}
            <div className="hidden lg:block text-[#0d83fd] opacity-70">
              <svg className="w-44 h-44" viewBox="0 0 200 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M198.804 194.488C189.279 189.596 179.529 185.52 169.407 182.07L169.384 182.049C169.227 181.994 169.07 181.939 168.912 181.884C166.669 181.139 165.906 184.546 167.669 185.615C174.053 189.473 182.761 191.837 189.146 195.695C156.603 195.912 119.781 196.591 91.266 179.049C62.5221 161.368 48.1094 130.695 56.934 98.891C84.5539 98.7247 112.556 84.0176 129.508 62.667C136.396 53.9724 146.193 35.1448 129.773 30.2717C114.292 25.6624 93.7109 41.8875 83.1971 51.3147C70.1109 63.039 59.63 78.433 54.2039 95.0087C52.1221 94.9842 50.0776 94.8683 48.0703 94.6608C30.1803 92.8027 11.2197 83.6338 5.44902 65.1074C-1.88449 41.5699 14.4994 19.0183 27.9202 1.56641C28.6411 0.625793 27.2862 -0.561638 26.5419 0.358501C13.4588 16.4098 -0.221091 34.5242 0.896608 56.5659C1.8218 74.6941 14.221 87.9401 30.4121 94.2058C37.7076 97.0203 45.3454 98.5003 53.0334 98.8449C47.8679 117.532 49.2961 137.487 60.7729 155.283C87.7615 197.081 139.616 201.147 184.786 201.155L174.332 206.827C172.119 208.033 174.345 211.287 176.537 210.105C182.06 207.125 187.582 204.122 193.084 201.144C193.346 201.147 195.161 199.887 195.423 199.868C197.08 198.548 193.084 201.144 195.528 199.81C196.688 199.192 197.846 198.552 199.006 197.935C200.397 197.167 200.007 195.087 198.804 194.488ZM60.8213 88.0427C67.6894 72.648 78.8538 59.1566 92.1207 49.0388C98.8475 43.9065 106.334 39.2953 114.188 36.1439C117.295 34.8947 120.798 33.6609 124.168 33.635C134.365 33.5511 136.354 42.9911 132.638 51.031C120.47 77.4222 86.8639 93.9837 58.0983 94.9666C58.8971 92.6666 59.783 90.3603 60.8213 88.0427Z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen 
                      ? 'bg-white border-[#0d83fd]/40 shadow-[0_8px_25px_rgba(13,131,253,0.08)]' 
                      : 'bg-white/80 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-[#2d465e] hover:text-[#0d83fd] transition-colors"
                  >
                    <span className="text-sm md:text-base">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#0d83fd] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQ;


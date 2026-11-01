import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  getZatcaResourceBySlug,
  ZATCA_RESOURCE_ARTICLES,
  ZATCA_INTEGRATION_PAGES,
} from '../data/zatca-seo-content';
import ZatcaDemoForm from '../components/ZatcaDemoForm';
import NotFound from './NotFound';
import { trackZatcaEvent } from '../utils/analytics';

const ZatcaResourceArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getZatcaResourceBySlug(slug) : undefined;
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!article) {
    return <NotFound />;
  }

  const otherArticles = ZATCA_RESOURCE_ARTICLES.filter(
    (item) => item.slug !== article.slug
  );

  return (
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#f3f9ff]/60 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500"
        >
          <Link to="/" className="hover:text-[#0d83fd] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link
            to="/products/zatca-connect"
            className="hover:text-[#0d83fd] transition-colors"
          >
            ZATCA Connect
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#2d465e] font-semibold">{article.badge}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          {/* Main Article Column */}
          <article className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
            {/* Metadata Header */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0d83fd] font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                {article.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Last reviewed: <strong className="text-[#2d465e]">{article.lastReviewed}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readingTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-5 leading-tight">
              {article.h1}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-medium">
              {article.executiveSummary}
            </p>

            {/* Regulatory Notice Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>{article.regulatoryNotice}</div>
            </div>

            {/* Article Sections */}
            <div className="space-y-10">
              {article.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2d465e]">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base text-slate-600 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}

                  {sec.bullets && (
                    <ul className="space-y-2.5 pl-1 pt-1">
                      {sec.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0d83fd] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.codeOrTable && (
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <caption className="bg-slate-50 px-4 py-2.5 text-left text-xs font-bold text-slate-500 border-b border-slate-200">
                          {sec.codeOrTable.caption}
                        </caption>
                        <thead>
                          <tr className="bg-[#f3f9ff] text-[#2d465e] border-b border-slate-200">
                            {sec.codeOrTable.headers.map((th, thIdx) => (
                              <th key={thIdx} className="p-3.5 font-bold">
                                {th}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {sec.codeOrTable.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/70">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3.5 text-slate-700 ${
                                    cIdx === 0 ? 'font-semibold text-[#2d465e]' : ''
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Official Regulatory Sources */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h2 className="text-lg font-bold font-heading text-[#2d465e] mb-3">
                Official ZATCA Regulatory References
              </h2>
              <ul className="space-y-2.5">
                {article.officialReferences.map((ref, idx) => (
                  <li key={idx} className="text-xs sm:text-sm">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#0d83fd] hover:underline"
                    >
                      <span>{ref.title}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-slate-500 ml-2">— {ref.publisher}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article FAQs */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h2 className="text-xl font-bold font-heading text-[#2d465e] mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {article.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl overflow-hidden"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-[#2d465e] hover:text-[#0d83fd] transition-colors"
                      >
                        <span className="text-sm">{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#0d83fd] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`${
                          isOpen ? 'block' : 'hidden'
                        } px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-slate-200/70 text-xs sm:text-sm text-slate-600 leading-relaxed`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          {/* Right Sidebar: Middleware CTA + ERP Connectors + Related Guides */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-lg">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Saky ZATCA Connect</span>
              </div>
              <h2 className="text-xl font-extrabold font-heading text-white mb-2">
                Keep Your Existing ERP. Connect It to ZATCA Phase 2.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Automate UBL 2.1 XML transformation, CSID onboarding, TLV QR generation, and
                real-time FATOORA clearance/reporting without replacing your accounting software.
              </p>
              <div className="space-y-2.5">
                <a
                  href="#zatca-demo-form"
                  onClick={(e) => {
                    e.preventDefault();
                    trackZatcaEvent('zatca_demo_click', {
                      cta_location: 'article_sidebar',
                      page_path: article.path,
                    });
                    document
                      .getElementById('zatca-demo-form')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-4 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Request a Technical Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  to="/products/zatca-connect"
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-full transition-all flex items-center justify-center"
                >
                  Explore ZATCA Connect Middleware
                </Link>
              </div>
            </div>

            {/* Verified ERP Integration Pages */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Verified ERP Integrations
              </h2>
              <div className="space-y-3">
                {ZATCA_INTEGRATION_PAGES.map((integration) => (
                  <Link
                    key={integration.slug}
                    to={integration.path}
                    className="block p-3.5 rounded-2xl bg-[#f8fafc] hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-200 transition-all"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-[#2d465e] hover:text-[#0d83fd]">
                      {integration.erpName}
                    </h3>
                    <span className="text-[11px] text-[#0d83fd] font-semibold">
                      View connector architecture →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Resource Guides */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                More ZATCA Technical Guides
              </h2>
              <div className="space-y-3">
                {otherArticles.map((other) => (
                  <Link
                    key={other.slug}
                    to={other.path}
                    className="block p-3.5 rounded-2xl bg-[#f8fafc] hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-200 transition-all"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-[#2d465e] hover:text-[#0d83fd] mb-1">
                      {other.h1}
                    </h3>
                    <span className="text-[11px] text-slate-500">{other.readingTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Embedded Demo Form */}
        <ZatcaDemoForm sourcePage={article.path} />
      </div>
    </main>
  );
};

export default ZatcaResourceArticle;


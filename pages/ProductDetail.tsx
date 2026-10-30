import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Server, 
  Layers, 
  Users, 
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getProductById } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <main className="pt-36 pb-24 min-h-[70vh] flex items-center justify-center bg-[#f3f9ff]/60 px-4">
        <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-[#2d465e] mb-2">Product Not Found</h1>
          <p className="text-slate-600 text-sm mb-6">
            The platform you requested does not exist or has been moved. Explore our verified software suite below.
          </p>
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0d83fd] text-white font-bold rounded-full hover:bg-[#0b66c2] transition-all"
          >
            View All Products
          </Link>
        </div>
      </main>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Verified Capability
          </span>
        );
      case 'limited':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Available on Request
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#0d83fd] border border-blue-200">
            <Sparkles className="w-3 h-3" /> In Roadmap
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <main className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#f3f9ff]/60 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0d83fd] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/#products" className="hover:text-[#0d83fd] transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#2d465e] font-semibold">{product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0d83fd] tracking-wide uppercase mb-4 shadow-sm">
            <span>{product.badge}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">{product.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4 leading-tight">
            {product.name}: <span className="text-[#0d83fd]">{product.tagline}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
            {product.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/contact?product=${product.id}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              Request a Technical Walkthrough
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#2d465e] hover:text-[#0d83fd] font-bold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
            >
              Discuss Architecture Options
            </Link>
          </div>
        </div>

        {/* Metrics Strip */}
        {product.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {product.metrics.map((metric, idx) => (
              <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{metric.label}</p>
                <p className="text-2xl sm:text-3xl font-black font-heading text-[#2d465e] mb-1">{metric.value}</p>
                <p className="text-xs text-slate-500">{metric.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Target Audience & Personas */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-[#0d83fd] text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" /> Target Stakeholders
          </div>
          <h2 className="text-xl font-bold font-heading text-[#2d465e] mb-4">Built Specifically For</h2>
          <div className="flex flex-wrap gap-2.5">
            {product.targetAudience.map((audience, idx) => (
              <div 
                key={idx} 
                className="bg-[#f3f9ff] text-[#2d465e] border border-blue-100 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d83fd]" />
                {audience}
              </div>
            ))}
          </div>
        </div>

        {/* Problem vs Operational Solution Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-14">
          <div className="bg-red-50/70 border border-red-200/80 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold font-heading text-red-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              The Operational Problem
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {product.businessProblem}
            </p>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold font-heading text-emerald-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              How {product.name} Solves It
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {product.operationalSolution}
            </p>
          </div>
        </div>

        {/* Regulatory & Jurisdiction Scope */}
        {product.regulatoryScope && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-3xl p-6 sm:p-8 mb-14 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-blue-200/60">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d83fd]">Jurisdiction & Compliance Scope</span>
                <h3 className="text-xl font-bold font-heading text-[#2d465e] mt-1">{product.regulatoryScope.framework}</h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-[#2d465e] self-start md:self-auto shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {product.regulatoryScope.jurisdiction}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.regulatoryScope.details}
            </p>
          </div>
        )}

        {/* Implemented Capabilities Section */}
        <div className="mb-14">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-heading text-[#2d465e] mb-2">Implemented Capabilities</h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Core production-ready workflows built into {product.name}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {product.implementedCapabilities.map((cap, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-sm sm:text-base font-bold font-heading text-[#2d465e]">{cap.title}</h4>
                  {getStatusBadge(cap.status)}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations & Deployment Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Verified Integrations */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-[#0d83fd] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" /> System Connectivity
            </div>
            <h3 className="text-xl font-bold font-heading text-[#2d465e] mb-6">Supported Integrations</h3>
            <ul className="space-y-3">
              {product.integrations.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-3.5 bg-[#f3f9ff] rounded-2xl border border-blue-100/60">
                  <div>
                    <span className="text-sm font-bold text-[#2d465e] block">{item.name}</span>
                    <span className="text-xs text-slate-500">{item.type}</span>
                  </div>
                  {getStatusBadge(item.status)}
                </li>
              ))}
            </ul>
          </div>

          {/* Deployment Options */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-[#0d83fd] text-xs font-bold uppercase tracking-wider">
              <Server className="w-4 h-4" /> Hosting & Data Residency
            </div>
            <h3 className="text-xl font-bold font-heading text-[#2d465e] mb-6">Deployment Models</h3>
            <div className="space-y-4">
              {product.deploymentOptions.map((opt, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    opt.isPopular 
                      ? 'bg-blue-50/70 border-blue-200 shadow-sm' 
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold font-heading text-[#2d465e]">{opt.model}</span>
                    {opt.isPopular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0d83fd] text-white">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{opt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Conversion Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-3xl p-8 md:p-12 text-center shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-[#2d465e] mb-3">
              Deploy {product.name} with Confidence
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              Schedule a technical conversation with our solutions engineering team. We will review your current ERP setup, data volumes, and integration requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={`/contact?product=${product.id}`}
                className="px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
              >
                Discuss Your Requirements
              </Link>
              <Link
                to="/#products"
                className="px-6 py-3.5 bg-white text-[#2d465e] hover:text-[#0d83fd] font-bold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
              >
                Explore Other Products
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProductDetail;

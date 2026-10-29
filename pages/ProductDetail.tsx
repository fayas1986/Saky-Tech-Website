import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
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
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { getProductById } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <main className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center bg-brand-dark px-4">
        <div className="max-w-md w-full text-center bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Product Not Found</h1>
          <p className="text-slate-400 text-sm mb-6">
            The product you requested does not exist or has been moved. Explore our verified software suite below.
          </p>
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-lime text-brand-dark font-semibold rounded-xl hover:bg-[#d9f99d] transition-all"
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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Verified Capability
          </span>
        );
      case 'limited':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Available on Request
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3 h-3" /> In Roadmap
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <main className="pt-24 md:pt-32 pb-20 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-indigo-500/10 via-brand-lime/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-brand-lime transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link to="/#products" className="hover:text-brand-lime transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200 font-medium">{product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-lime mb-4">
            <span>{product.badge}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300 font-normal">{product.category}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {product.name}: <span className="text-brand-lime">{product.tagline}</span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl">
            {product.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/contact?product=${product.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lime text-brand-dark font-bold text-sm rounded-xl shadow-lg shadow-brand-lime/10 hover:bg-[#d9f99d] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-lime"
            >
              Request a Technical Walkthrough
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-slate-200 font-semibold text-sm rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-white"
            >
              Discuss Architecture Options
            </Link>
          </div>
        </div>

        {/* Metrics Strip */}
        {product.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {product.metrics.map((metric, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{metric.label}</p>
                <p className="text-2xl md:text-3xl font-extrabold text-white mb-1">{metric.value}</p>
                <p className="text-xs text-slate-400">{metric.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Target Audience & Personas */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-12 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4 text-brand-lime text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" /> Target Stakeholders
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Built Specifically For</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {product.targetAudience.map((audience, idx) => (
              <div 
                key={idx} 
                className="bg-brand-dark/80 text-slate-200 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
                {audience}
              </div>
            ))}
          </div>
        </div>

        {/* Problem vs Operational Solution Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-14">
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              The Operational Problem
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {product.businessProblem}
            </p>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              How {product.name} Solves It
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {product.operationalSolution}
            </p>
          </div>
        </div>

        {/* Regulatory & Jurisdiction Scope */}
        {product.regulatoryScope && (
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-6 md:p-8 mb-14 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-indigo-500/20">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Jurisdiction & Compliance Scope</span>
                <h3 className="text-xl font-bold text-white mt-1">{product.regulatoryScope.framework}</h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-semibold text-indigo-300 self-start md:self-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {product.regulatoryScope.jurisdiction}
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {product.regulatoryScope.details}
            </p>
          </div>
        )}

        {/* Implemented Capabilities Section */}
        <div className="mb-14">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Implemented Capabilities</h2>
            <p className="text-slate-400 text-sm">
              Core production-ready workflows built into {product.name}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {product.implementedCapabilities.map((cap, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-base font-bold text-white">{cap.title}</h4>
                  {getStatusBadge(cap.status)}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Labelled Preview Area */}
        <div className="mb-14 bg-slate-900/80 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Interface Inspection</span>
              <h3 className="text-lg font-bold text-white">System Console Overview</h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-amber-300">
              Interactive Product Preview — illustrative sample data
            </div>
          </div>

          <div className="bg-brand-darker rounded-xl border border-white/10 p-4 md:p-6 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 text-slate-300">{product.name.toLowerCase()}_operational_workspace</span>
              </div>
              <span>status: active</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Active Records</div>
                <div className="text-lg font-bold text-white mt-1">128,450</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">● In Sync with ERP</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Processing Health</div>
                <div className="text-lg font-bold text-brand-lime mt-1">Healthy (100%)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Zero unprocessed queues</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Integrity Verification</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">Validated</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Strict schema check passed</div>
              </div>
            </div>

            <div className="bg-white/[0.03] p-4 rounded-lg border border-white/5 text-[11px] leading-relaxed text-slate-300 space-y-1">
              <p className="text-slate-400">// Sample operational telemetry audit</p>
              <p><span className="text-indigo-400">[DATA_CONNECTOR]</span> Fetching latest transaction ledger batch via encrypted endpoint</p>
              <p><span className="text-emerald-400">[VALIDATION]</span> Multi-point verification complete: 0 schema warnings</p>
              <p><span className="text-brand-lime">[EXECUTION]</span> Pipeline synchronized successfully</p>
            </div>
          </div>
        </div>

        {/* Integrations & Deployment Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Verified Integrations */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4 text-brand-lime text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" /> System Connectivity
            </div>
            <h3 className="text-xl font-bold text-white mb-6">Supported Integrations</h3>
            <ul className="space-y-3">
              {product.integrations.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-3.5 bg-brand-dark/60 rounded-xl border border-white/5">
                  <div>
                    <span className="text-sm font-semibold text-white block">{item.name}</span>
                    <span className="text-xs text-slate-400">{item.type}</span>
                  </div>
                  {getStatusBadge(item.status)}
                </li>
              ))}
            </ul>
          </div>

          {/* Deployment Options */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4 text-brand-lime text-xs font-bold uppercase tracking-wider">
              <Server className="w-4 h-4" /> Hosting & Data Residency
            </div>
            <h3 className="text-xl font-bold text-white mb-6">Deployment Models</h3>
            <div className="space-y-4">
              {product.deploymentOptions.map((opt, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    opt.isPopular 
                      ? 'bg-brand-lime/5 border-brand-lime/30' 
                      : 'bg-brand-dark/60 border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{opt.model}</span>
                    {opt.isPopular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-lime text-brand-dark">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{opt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Conversion Card */}
        <div className="bg-gradient-to-r from-indigo-900/40 via-brand-dark to-brand-dark border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Deploy {product.name} with Confidence
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
              Schedule a technical conversation with our solutions engineering team. We will review your current ERP setup, data volumes, and integration requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={`/contact?product=${product.id}`}
                className="px-6 py-3.5 bg-brand-lime text-brand-dark font-bold text-sm rounded-xl hover:bg-[#d9f99d] transition-all shadow-lg shadow-brand-lime/10"
              >
                Discuss Your Requirements
              </Link>
              <Link
                to="/#products"
                className="px-6 py-3.5 bg-white/5 text-slate-200 font-semibold text-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
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

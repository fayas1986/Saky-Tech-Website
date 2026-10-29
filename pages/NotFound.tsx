import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { products } from '../data/products';

const NotFound: React.FC = () => {
  return (
    <main className="pt-32 pb-24 min-h-[80vh] flex items-center justify-center bg-brand-dark px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl w-full text-center bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold mb-6">
          <span>ERROR 404</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
          The requested page could not be located. It may have been relocated or the link may be outdated. You can explore our verified software portfolio or return to the homepage.
        </p>

        {/* Quick Links */}
        <div className="text-left bg-brand-dark/70 border border-white/10 rounded-xl p-4 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-brand-lime" /> Explore Our Products:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {products.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-brand-lime transition-colors truncate"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lime text-brand-dark font-bold text-sm rounded-xl hover:bg-[#d9f99d] transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-slate-200 font-semibold text-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

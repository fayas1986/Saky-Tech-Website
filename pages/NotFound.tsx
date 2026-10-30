import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { products } from '../data/products';

const NotFound: React.FC = () => {
  return (
    <main className="pt-36 pb-28 min-h-[80vh] flex items-center justify-center bg-[#f3f9ff]/60 px-4">
      <div className="max-w-xl w-full text-center bg-white border border-slate-200/90 rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-mono font-bold mb-6">
          <span>ERROR 404</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-[#2d465e] tracking-tight mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
          The requested page could not be located. It may have been relocated or the link may be outdated. You can explore our verified software portfolio or return to the homepage.
        </p>

        {/* Quick Links */}
        <div className="text-left bg-[#f3f9ff] border border-blue-100 rounded-2xl p-5 mb-8">
          <p className="text-xs font-bold font-heading uppercase tracking-wider text-[#2d465e] mb-3 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#0d83fd]" /> Explore Our Products:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {products.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="p-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#2d465e] hover:text-[#0d83fd] transition-colors truncate font-semibold border border-slate-200/60"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d83fd] hover:bg-[#0b66c2] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#2d465e] hover:text-[#0d83fd] font-bold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

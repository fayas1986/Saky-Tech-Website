import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Solutions from './pages/Solutions';
import SolutionERP from './pages/SolutionERP';
import SolutionCustom from './pages/SolutionCustom';
import ZatcaIntegrationDetail from './pages/ZatcaIntegrationDetail';
import ZatcaResourceArticle from './pages/ZatcaResourceArticle';
import NotFound from './pages/NotFound';
import { captureUtmParameters } from './utils/analytics';

const ScrollToTop: React.FC = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    captureUtmParameters();
  }, [pathname, search]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <SEOHead />
      <ScrollToTop />
      {/* Skip to Content for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
        <Navbar />
        <div id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/integrations/:slug" element={<ZatcaIntegrationDetail />} />
            <Route path="/resources/:slug" element={<ZatcaResourceArticle />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/erp-integration" element={<SolutionERP />} />
            <Route path="/solutions/custom-development" element={<SolutionCustom />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;

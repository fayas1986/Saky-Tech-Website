import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSEO } from '../data/seo';

const setMetaTag = (selector: string, attrName: 'name' | 'property', attrValue: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const SEOHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getRouteSEO(pathname);
    document.title = seo.title;

    setMetaTag('meta[name="description"]', 'name', 'description', seo.description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', seo.robots);

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', seo.canonical);

    // Sync hreflang alternate links
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (seo.alternates && seo.alternates.length > 0) {
      seo.alternates.forEach((alt) => {
        const altEl = document.createElement('link');
        altEl.setAttribute('rel', 'alternate');
        altEl.setAttribute('hreflang', alt.hreflang);
        altEl.setAttribute('href', alt.href);
        document.head.appendChild(altEl);
      });
    }

    setMetaTag('meta[property="og:type"]', 'property', 'og:type', seo.ogType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Saky Technologies');
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', seo.ogImage);
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', seo.ogImageAlt);

    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', seo.ogImage);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', seo.ogImageAlt);

    let scriptEl = document.head.querySelector<HTMLScriptElement>('script#seo-json-ld');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'seo-json-ld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(seo.jsonLd);
  }, [pathname]);

  return null;
};

export default SEOHead;


import { companyConfig, officeLocations } from './company';
import { products, getProductById } from './products';
import { solutions, getSolutionById } from './solutions';

export const SITE_ORIGIN = 'https://sakytek.com';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/img/og-preview.png`;

export interface RouteSEO {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: 'website' | 'article';
  ogImage: string;
  ogImageAlt: string;
  jsonLd: Record<string, unknown>;
}

export const ALL_PUBLIC_ROUTES: string[] = [
  '/',
  '/about',
  '/contact',
  '/solutions',
  '/solutions/erp-integration',
  '/solutions/custom-development',
  ...products.map((p) => `/products/${p.id}`),
];

export function buildOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: companyConfig.name,
    legalName: companyConfig.legalName,
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/assets/img/logo.png`,
    },
    description: companyConfig.description,
    email: companyConfig.primaryEmail,
    telephone: companyConfig.primaryPhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: officeLocations.singapore.addressLines[0],
      addressLocality: 'Singapore',
      postalCode: '139951',
      addressCountry: 'SG',
    },
    location: [
      {
        '@type': 'Place',
        name: officeLocations.singapore.title,
        address: {
          '@type': 'PostalAddress',
          streetAddress: officeLocations.singapore.addressLines[0],
          addressLocality: 'Singapore',
          postalCode: '139951',
          addressCountry: 'SG',
        },
        telephone: officeLocations.singapore.phone,
      },
      {
        '@type': 'Place',
        name: officeLocations.oman.title,
        address: {
          '@type': 'PostalAddress',
          streetAddress: officeLocations.oman.addressLines[0],
          addressLocality: 'Muscat',
          postalCode: '112',
          addressCountry: 'OM',
        },
        telephone: officeLocations.oman.phone,
      },
      {
        '@type': 'Place',
        name: officeLocations.india.title,
        address: {
          '@type': 'PostalAddress',
          streetAddress: officeLocations.india.addressLines[0],
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          postalCode: '600011',
          addressCountry: 'IN',
        },
        telephone: officeLocations.india.phone,
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: companyConfig.primaryPhone,
        email: companyConfig.primaryEmail,
        contactType: 'sales',
        areaServed: ['SG', 'OM', 'SA', 'AE', 'IN'],
        availableLanguage: ['en'],
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: `${SITE_ORIGIN}/`,
    name: companyConfig.name,
    description: companyConfig.description,
    publisher: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
    inLanguage: 'en',
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${item.path}`,
    })),
  };
}

export function getRouteSEO(rawPathname: string): RouteSEO {
  const normalizedPath =
    rawPathname === '/'
      ? '/'
      : rawPathname.replace(/\/+$/, '') || '/';

  const orgSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  if (normalizedPath === '/') {
    const title = 'Saky Technologies | Enterprise B2B SaaS & Microsoft Dynamics 365 ERP Practice';
    const description =
      'Saky Technologies delivers proprietary B2B SaaS platforms (TaxFlow GST, ZATCA Connect, TalentSense HRMS, MedNext HIMS, Procure AI, LogiSud, Nova CRM), certified Microsoft Dynamics 365 ERP implementations, and custom software engineering.';
    return {
      path: '/',
      title,
      description,
      canonical: `${SITE_ORIGIN}/`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: 'Saky Technologies — Enterprise Software & Microsoft Dynamics 365 ERP Practice',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          orgSchema,
          webSiteSchema,
          {
            '@type': 'WebPage',
            '@id': `${SITE_ORIGIN}/#webpage`,
            url: `${SITE_ORIGIN}/`,
            name: title,
            description,
            isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
            about: { '@id': `${SITE_ORIGIN}/#organization` },
            inLanguage: 'en',
          },
        ],
      },
    };
  }

  if (normalizedPath === '/about') {
    const title = 'About Saky Technologies | Enterprise Software Engineering & Global Delivery';
    const description =
      'Learn how Saky Technologies bridges core enterprise ERP ledgers and operational agility across Singapore HQ, Muscat Oman, and Chennai India engineering hubs.';
    const canonical = `${SITE_ORIGIN}/about`;
    return {
      path: '/about',
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: 'About Saky Technologies — Singapore, Oman & India Delivery Hubs',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          orgSchema,
          webSiteSchema,
          {
            '@type': 'AboutPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: title,
            description,
            isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
            mainEntity: { '@id': `${SITE_ORIGIN}/#organization` },
            inLanguage: 'en',
          },
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ]),
        ],
      },
    };
  }

  if (normalizedPath === '/contact') {
    const title = 'Contact Saky Technologies | Enterprise Enquiries & Architecture Consultation';
    const description =
      'Connect with Saky Technologies in Singapore, Muscat (Oman), and Chennai (India) for B2B SaaS walkthroughs, Microsoft Dynamics 365 ERP implementation, and custom software consultations.';
    const canonical = `${SITE_ORIGIN}/contact`;
    return {
      path: '/contact',
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: 'Contact Saky Technologies — Singapore, Oman & India Offices',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          orgSchema,
          webSiteSchema,
          {
            '@type': 'ContactPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: title,
            description,
            isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
            mainEntity: { '@id': `${SITE_ORIGIN}/#organization` },
            inLanguage: 'en',
          },
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ],
      },
    };
  }

  if (normalizedPath === '/solutions') {
    const title = 'Enterprise ERP Integration & Custom Software Solutions | Saky Technologies';
    const description =
      'Explore Saky Technologies enterprise practices: certified Microsoft Dynamics 365 Business Central & F&O implementation, API middleware, and custom software engineering.';
    const canonical = `${SITE_ORIGIN}/solutions`;
    return {
      path: '/solutions',
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: 'Saky Technologies — Enterprise Integration & Engineering Practices',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          orgSchema,
          webSiteSchema,
          ...solutions.map((sol) => ({
            '@type': 'Service',
            '@id': `${SITE_ORIGIN}/solutions/${sol.id}#service`,
            name: sol.title,
            description: sol.overview,
            serviceType: sol.badge,
            url: `${SITE_ORIGIN}/solutions/${sol.id}`,
            provider: { '@id': `${SITE_ORIGIN}/#organization` },
            areaServed: ['SG', 'OM', 'SA', 'AE', 'IN'],
          })),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
          ]),
        ],
      },
    };
  }

  if (normalizedPath.startsWith('/solutions/')) {
    const solId = normalizedPath.replace('/solutions/', '');
    const solution = getSolutionById(solId);
    if (solution) {
      const title = `${solution.title} | Saky Technologies`;
      const description = `${solution.subtitle}. ${solution.overview}`;
      const canonical = `${SITE_ORIGIN}/solutions/${solution.id}`;
      return {
        path: `/solutions/${solution.id}`,
        title,
        description,
        canonical,
        robots: 'index, follow',
        ogType: 'website',
        ogImage: DEFAULT_OG_IMAGE,
        ogImageAlt: `${solution.title} — Saky Technologies`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            orgSchema,
            webSiteSchema,
            {
              '@type': 'Service',
              '@id': `${canonical}#service`,
              name: solution.title,
              description: solution.overview,
              serviceType: solution.badge,
              url: canonical,
              provider: { '@id': `${SITE_ORIGIN}/#organization` },
              areaServed: ['SG', 'OM', 'SA', 'AE', 'IN'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${solution.title} Offerings`,
                itemListElement: solution.coreOfferings.map((offering) => ({
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: offering.title,
                    description: offering.description,
                  },
                })),
              },
            },
            buildBreadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Solutions', path: '/solutions' },
              { name: solution.title, path: `/solutions/${solution.id}` },
            ]),
          ],
        },
      };
    }
  }

  if (normalizedPath.startsWith('/products/')) {
    const prodId = normalizedPath.replace('/products/', '');
    const product = getProductById(prodId);
    if (product) {
      const title = `${product.name} — ${product.tagline} | Saky Technologies`;
      const description = `${product.summary} Built for ${product.regulatoryScope?.jurisdiction || 'enterprise operations'}.`;
      const canonical = `${SITE_ORIGIN}/products/${product.id}`;
      return {
        path: `/products/${product.id}`,
        title,
        description,
        canonical,
        robots: 'index, follow',
        ogType: 'website',
        ogImage: DEFAULT_OG_IMAGE,
        ogImageAlt: `${product.name}: ${product.tagline} — Saky Technologies`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            orgSchema,
            webSiteSchema,
            {
              '@type': 'SoftwareApplication',
              '@id': `${canonical}#software`,
              name: product.name,
              headline: `${product.name} — ${product.tagline}`,
              description: product.summary,
              applicationCategory: 'BusinessApplication',
              applicationSubCategory: product.category,
              operatingSystem: 'Web, Cloud, On-Premises',
              url: canonical,
              publisher: { '@id': `${SITE_ORIGIN}/#organization` },
              author: { '@id': `${SITE_ORIGIN}/#organization` },
              featureList: product.implementedCapabilities
                .filter((cap) => cap.status === 'verified')
                .map((cap) => cap.title),
            },
            buildBreadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/#products' },
              { name: product.name, path: `/products/${product.id}` },
            ]),
          ],
        },
      };
    }
  }

  // Fallback for 404 / Unknown routes
  return {
    path: normalizedPath,
    title: 'Page Not Found (404) | Saky Technologies',
    description:
      'The requested page could not be found on Saky Technologies. Explore our verified enterprise B2B SaaS products and Microsoft Dynamics 365 ERP solutions.',
    canonical: `${SITE_ORIGIN}/404`,
    robots: 'noindex, nofollow',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Saky Technologies — Page Not Found',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [orgSchema, webSiteSchema],
    },
  };
}


import { OfficeLocation } from '../types';

export const companyConfig = {
  name: 'Saky Technologies',
  legalName: 'Saky Technologies Pvt Ltd',
  tagline: 'Business software built around the way you work.',
  description: 'Enterprise software and SaaS engineering company delivering specialized business applications, Microsoft Dynamics 365 ERP implementations, and custom software solutions.',
  primaryPhone: '+65 6776 7822',
  primaryPhoneLink: 'tel:+6567767822',
  primaryEmail: 'contact@sakytechnologies.com',
  primaryEmailLink: 'mailto:contact@sakytechnologies.com',
  coreOfferings: [
    {
      title: 'SaaS Products',
      description: 'Disciplined, focused business software for tax reconciliation, ZATCA e-invoicing, HRMS, HIMS, procurement, logistics, and CRM.'
    },
    {
      title: 'Enterprise ERP Integration',
      description: 'Certified implementation and API middleware for Microsoft Dynamics 365 Business Central, F&O, and legacy enterprise ERPs.'
    },
    {
      title: 'Custom Software & BI',
      description: 'Engineered web applications, data pipelines, and Power BI dashboards built around your proprietary operational workflows.'
    }
  ]
};

export const officeLocations: Record<'singapore' | 'oman' | 'india', OfficeLocation> = {
  singapore: {
    city: 'Singapore',
    title: 'Singapore Headquarters',
    badge: 'Global HQ',
    addressLines: [
      'Blk 71, #03-08 Ayer Rajah Crescent',
      'Singapore 139951'
    ],
    phone: '+65 6776 7822',
    phoneLink: 'tel:+6567767822',
    email: 'contact@sakytechnologies.com',
    mapTitle: 'Saky Technologies - Singapore Headquarters (BLOCK71 @ one-north)',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=1.296742,103.786664'
  },
  oman: {
    city: 'Muscat',
    title: 'Oman Branch Office',
    badge: 'Regional Branch',
    addressLines: [
      'PO BOX 220, Ruwi, PC112',
      'Muscat, Sultanate of Oman'
    ],
    phone: '+65 6776 7822',
    phoneLink: 'tel:+6567767822',
    email: 'contact@sakytechnologies.com',
    mapTitle: 'Saky Technologies - Oman Branch Office (Ruwi, Muscat)',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=23.603056,58.545833'
  },
  india: {
    city: 'Chennai',
    title: 'India Development Center',
    badge: 'Engineering & R&D Center',
    addressLines: [
      'M P M Street, Sanjay Gandhi Nagar',
      'Perambur, Chennai, Tamil Nadu - 600011, India'
    ],
    phone: '+65 6776 7822',
    phoneLink: 'tel:+6567767822',
    email: 'contact@sakytechnologies.com',
    mapTitle: 'Saky Technologies - India Development Center (Chennai)',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=13.115808,80.242525'
  }
};

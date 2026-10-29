import { LucideIcon } from 'lucide-react';

export type ProductId = 
  | 'taxflow'
  | 'zatca-connect'
  | 'talentsense-hrms'
  | 'mednext-hims'
  | 'procure-ai'
  | 'logisud'
  | 'nova-crm';

export type CapabilityStatus = 'verified' | 'limited' | 'planned' | 'not-approved';

export interface ProductCapability {
  title: string;
  description: string;
  status: CapabilityStatus;
}

export interface ProductIntegration {
  name: string;
  type: string;
  status: CapabilityStatus;
}

export interface DeploymentOption {
  model: string;
  description: string;
  isPopular?: boolean;
}

export interface RegulatoryScope {
  jurisdiction: string;
  framework: string;
  complianceStatus: 'verified' | 'in-progress' | 'not-applicable';
  details: string;
}

export interface Product {
  id: ProductId;
  name: string;
  badge: string;
  category: string;
  tagline: string;
  summary: string;
  targetAudience: string[];
  businessProblem: string;
  operationalSolution: string;
  implementedCapabilities: ProductCapability[];
  integrations: ProductIntegration[];
  deploymentOptions: DeploymentOption[];
  regulatoryScope?: RegulatoryScope;
  iconName: string;
  featured?: boolean;
  accentColor?: string;
  // UI metrics (realistic workflow metrics)
  metrics?: Array<{ label: string; value: string; description: string }>;
}

export type SolutionId = 'erp-integration' | 'custom-development';

export interface SolutionOffering {
  title: string;
  description: string;
  deliverables: string[];
}

export interface Solution {
  id: SolutionId;
  title: string;
  badge: string;
  subtitle: string;
  overview: string;
  coreOfferings: SolutionOffering[];
  supportedPlatforms: string[];
  businessOutcomes: string[];
  technologies: string[];
}

export interface EnquiryPayload {
  fullName: string;
  businessEmail: string;
  phoneNumber: string;
  companyName: string;
  country: string;
  interestType: 'product' | 'erp-integration' | 'custom-engineering' | 'general';
  selectedProduct?: ProductId | '';
  projectScope: string;
  timeline: 'immediate' | '1-3-months' | 'exploratory';
  consent: boolean;
}

export interface OfficeLocation {
  city: string;
  title: string;
  badge: string;
  addressLines: string[];
  phone: string;
  phoneLink: string;
  email: string;
  mapTitle: string;
  directionsUrl: string;
}

// Legacy compatibility types for existing components until Phase 2 redesign
export interface LegacyProduct {
  id: string;
  name: string;
  valueProp: string;
  aiCapability: string;
  icon: LucideIcon;
  featured?: boolean;
}

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Industry {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}
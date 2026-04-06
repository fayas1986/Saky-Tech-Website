import { LucideIcon } from 'lucide-react';

export interface Product {
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
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  isButton?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  targetAudience: string[];
}

export interface Founder {
  name: string;
  role: string;
  description: string;
  stats: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrCollege: string;
  content: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export enum FormType {
  WORKSHOP = 'workshop',
  CRT = 'crt',
  CAMPUS_DRIVE = 'campus-drive',
  PARTNER = 'partner',
  CONTACT = 'contact',
  ACADEMIC_PROJECTS = 'academic-projects',
  ORGANIZATION = 'organization'
}
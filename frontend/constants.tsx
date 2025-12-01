import { 
  Users, 
  GraduationCap, 
  Cpu, 
  Briefcase, 
  Handshake, 
  Code, 
  Zap, 
  Globe,
  FileCode
} from 'lucide-react';
import { NavItem, Service, Founder, Stat, Testimonial } from './types';

export const APP_NAME = "SkillXL";
export const TAGLINE = "Empowering Colleges, Students & Companies.";
export const SUB_TAGLINE = "SkillXL – Your Bridge to Opportunities.";

// LIVE BACKEND URL (Not Localhost)
export const API_BASE_URL = "https://skillxl-backend.onrender.com";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Partner With Us', path: '/request/partner' },
  { label: 'Contact', path: '/contact' },
];

// STRICT ORDER ENFORCED: 
// 1. CRT, 2. Workshops, 3. Academic Projects, 4. Partners, 5. Consultancy, 6. Staffing
export const SERVICES: Service[] = [
  {
    id: 'crt',
    title: 'CRT & Placement Training',
    description: 'Comprehensive training modules designed to make students industry-ready from day one.',
    icon: GraduationCap,
    features: ['Full Stack (Frontend + Backend)', 'Python / SQL / Data', 'Aptitude & Logical Reasoning', 'Mock Interviews'],
    targetAudience: ['Colleges', 'Students']
  },
  {
    id: 'workshops',
    title: 'Workshops & Skill Dev',
    description: 'Hands-on bootcamps and expert sessions on cutting-edge technologies.',
    icon: Cpu,
    features: ['AI/ML Workshops', 'Full Stack Bootcamps', 'Hackathons', 'Hardware & Embedded Systems'],
    targetAudience: ['Colleges', 'Companies']
  },
  {
    id: 'academic-projects',
    title: 'Academic Projects & Training',
    description: 'Real-world final year projects with mentor-driven execution for students.',
    icon: FileCode,
    features: ['Real Final-Year Projects', 'Mentor-driven Execution', 'Hands-on Research', 'Project Certification', 'Placement Aid'],
    targetAudience: ['Final Year Students', 'Colleges']
  },
  {
    id: 'partners',
    title: 'Partner Network',
    description: 'Direct access to a massive network of hiring companies and top-tier institutions.',
    icon: Handshake,
    features: ['100+ Hiring Companies', 'Real Placement Drives', 'Internship Opportunities', 'Direct Lead Input'],
    targetAudience: ['Colleges', 'Companies']
  },
  {
    id: 'consultancy',
    title: 'Expert Consultancy',
    description: 'Strategic guidance for institutions to improve curriculum and placement records.',
    icon: Briefcase,
    features: ['Hiring Strategy Support', 'Campus Hiring Design', 'Skill-gap Analysis', 'Curriculum Design'],
    targetAudience: ['Companies', 'Colleges']
  },
  {
    id: 'staffing',
    title: 'Staffing Solutions',
    description: 'Seamless hiring for companies and colleges. We connect the right talent to the right opportunity.',
    icon: Users,
    features: ['Bulk Hiring', 'Pre-assessed Candidates', 'Talent Pooling', 'Real-time Opportunity Mapping'],
    targetAudience: ['Companies', 'Colleges', 'Candidates']
  }
];

export const FOUNDERS: Founder[] = [
  {
    name: "Vamsi Krishna Gedela",
    role: "Co-Founder",
    description: "A passionate software developer and expert trainer known for transforming student careers through rigorous Full Stack and Aptitude training.",
    stats: ["1000+ Students Trained", "98% Placement Record"],
    image: "https://picsum.photos/400/400?random=1"
  },
  {
    name: "Kranthi Kumar Marpina",
    role: "Co-Founder",
    description: "NIT Calicut Alumni with 8+ years in the software industry. brings deep expertise in product development, software engineering, and large-scale training systems.",
    stats: ["8+ Years Experience", "NIT Calicut Alumni"],
    image: "https://picsum.photos/400/400?random=2"
  }
];

export const STATS: Stat[] = [
  { label: 'Students Trained', value: '2000', suffix: '+' },
  { label: 'Hiring Partners', value: '100', suffix: '+' },
  { label: 'Colleges', value: '50', suffix: '+' },
  { label: 'Placements', value: '95', suffix: '%' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Dr. R. Sharma",
    role: "Placement Officer",
    companyOrCollege: "Vignana Tech Institute",
    content: "SkillXL transformed our campus drive process. The quality of training they provided to our students was exceptional."
  },
  {
    id: '2',
    name: "Priya M.",
    role: "Software Engineer",
    companyOrCollege: "Placed at MNC",
    content: "The Full Stack bootcamp was a game changer. I went from zero coding confidence to cracking a high-package offer."
  },
  {
    id: '3',
    name: "TechSolutions HR",
    role: "Hiring Manager",
    companyOrCollege: "TechSolutions Inc.",
    content: "We hired 15 freshers through SkillXL. The candidates were pre-assessed and project-ready. Saved us months of training time."
  }
];
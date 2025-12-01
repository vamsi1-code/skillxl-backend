import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// --- BUTTON ---
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  to?: string;
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '', 
  to,
  isExternal,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-display font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  
  const variants = {
    primary: "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-transparent",
    secondary: "bg-white text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    outline: "bg-transparent border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const content = (
    <>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </>
  );

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    if (isExternal) {
      return <a href={to} className={classes} target="_blank" rel="noopener noreferrer">{content}</a>;
    }
    return <Link to={to} className={classes}>{content}</Link>;
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classes} 
      {...props}
    >
      {content}
    </motion.button>
  );
};

// --- CARD ---
interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  gradientBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', gradientBorder = false, ...props }) => {
  return (
    <motion.div 
      className={`relative group rounded-2xl overflow-hidden backdrop-blur-md bg-glass-surface border border-glass-border ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {gradientBorder && (
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};

// --- SECTION ---
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  darker?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id, darker = false }) => {
  return (
    <section id={id} className={`relative py-20 md:py-32 overflow-hidden ${darker ? 'bg-black/40' : ''} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {children}
      </div>
    </section>
  );
};

// --- FORM INPUTS ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    <input 
      id={id}
      className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all placeholder-slate-600 ${className}`}
      {...props} 
    />
  </div>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, id, className = '', ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    <textarea 
      id={id}
      rows={4}
      className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all placeholder-slate-600 ${className}`}
      {...props} 
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: string[] }> = ({ label, id, options, className = '', ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    <div className="relative">
      <select 
        id={id}
        className={`w-full appearance-none bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all ${className}`}
        {...props} 
      >
        <option value="" disabled>Select an option</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <ChevronRight className="rotate-90 w-4 h-4" />
      </div>
    </div>
  </div>
);
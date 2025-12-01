import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_NAME, NAV_ITEMS, TAGLINE } from '../constants';
import { Button } from './UI';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-glass-border py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-white">
            {APP_NAME}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => `text-sm font-medium transition-colors hover:text-neon-blue ${isActive ? 'text-neon-blue' : 'text-slate-300'}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Button size="sm" variant="primary" to="/request/workshop">Request Workshop</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-glass-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  className={({ isActive }) => `text-lg font-medium ${isActive ? 'text-neon-blue' : 'text-slate-300'}`}
                >
                  {item.label}
                </NavLink>
              ))}
              <Button className="w-full" to="/request/workshop">Request Workshop</Button>
              <Button className="w-full" variant="outline" to="/request/partner">Partner With Us</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-glass-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center">
                <Rocket className="text-white w-4 h-4" />
              </div>
              <span className="text-2xl font-display font-bold text-white">{APP_NAME}</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              {TAGLINE} We don't just teach — we show you opportunities, we connect you to opportunities, we create opportunities.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Instagram, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-neon-blue transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} className="text-slate-400 hover:text-neon-blue transition-colors text-sm">
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li><NavLink to="/request/crt" className="text-slate-400 hover:text-neon-blue transition-colors text-sm">Request CRT</NavLink></li>
              <li><NavLink to="/request/campus-drive" className="text-slate-400 hover:text-neon-blue transition-colors text-sm">Hire Talent</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-neon-blue shrink-0" />
                <span>Hyderabad, India<br />All Over India Online Service</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-5 h-5 text-neon-blue shrink-0" />
                <span>support@skillxl.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
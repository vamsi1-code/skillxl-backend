import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Zap } from 'lucide-react';
import { Section, Button, Card } from '../components/UI';
import { SERVICES, FOUNDERS, STATS, TESTIMONIALS, TAGLINE, SUB_TAGLINE } from '../constants';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-sm font-semibold tracking-wide uppercase">
              The Future of Career Acceleration
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Empowering Colleges,<br />Students & Companies
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              SkillXL
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 font-light"
          >
            {SUB_TAGLINE} We unlock opportunities, accelerate placements, and help institutions produce industry-ready talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" to="/request/partner" icon={<ArrowRight className="w-5 h-5"/>}>Partner With Us</Button>
            <Button size="lg" variant="outline" to="/request/workshop">Request Workshop</Button>
            <Button size="lg" variant="ghost" to="/contact">Contact Us</Button>
          </motion.div>
          
          {/* Hero Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10"
          >
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">{stat.value}<span className="text-neon-blue">{stat.suffix}</span></h3>
                <p className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US / MISSION */}
      <Section darker>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Register Once.<br />
              <span className="text-neon-purple">Enjoy Many Opportunities.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We bridge the gap between academia and industry. SkillXL has a huge network of software and hardware companies, helping stakeholders collaborate for placements, hiring, and skill development.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Real-time opportunity mapping",
                "Industry-ready curriculum design",
                "Direct lead input for partners",
                "Pre-assessed talent pool for companies"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-neon-blue" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button to="/about" variant="secondary">Our Story</Button>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl blur-2xl opacity-20" />
             <div className="relative bg-slate-900/80 backdrop-blur-xl border border-glass-border p-8 rounded-2xl">
                {/* Simplified Grid to avoid alignment confusion */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 hover:border-neon-blue/50 transition-colors">
                      <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                      <h4 className="font-bold text-white">Fast Hiring</h4>
                      <p className="text-xs text-slate-400">Streamlined process</p>
                    </div>
                    <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 hover:border-neon-pink/50 transition-colors">
                      <Star className="w-8 h-8 text-neon-pink mb-2" />
                      <h4 className="font-bold text-white">Top Talent</h4>
                      <p className="text-xs text-slate-400">Top 5% candidates</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-400/50 transition-colors">
                      <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
                      <h4 className="font-bold text-white">Verified</h4>
                      <p className="text-xs text-slate-400">100% Validated Skills</p>
                    </div>
                    <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 hover:border-neon-blue/50 transition-colors">
                      <Zap className="w-8 h-8 text-neon-blue mb-2" />
                      <h4 className="font-bold text-white">AI Driven</h4>
                      <p className="text-xs text-slate-400">Smart matching</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our Ecosystem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive solutions for every stakeholder in the education and employment chain.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.slice(0, 6).map((service) => (
            <Card key={service.id} className="h-full flex flex-col hover:-translate-y-2 transition-transform duration-300" gradientBorder>
              <div className="flex-grow">
                <service.icon className="w-12 h-12 text-neon-blue mb-6" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-neon-purple" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <Button size="sm" variant="outline" to="/services" className="w-full">Learn More</Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button to="/services" icon={<ArrowRight className="w-4 h-4" />}>View All Services</Button>
        </div>
      </Section>

      {/* FOUNDERS */}
      <Section darker>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Visionaries Behind SkillXL</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {FOUNDERS.map((founder, idx) => (
            <Card key={idx} className="bg-slate-900/50">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-neon-blue/50 shrink-0">
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                  <p className="text-neon-blue text-sm font-medium mb-3">{founder.role}</p>
                  <p className="text-slate-400 text-sm mb-4">{founder.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {founder.stats.map((stat, sIdx) => (
                      <span key={sIdx} className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">{stat}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to Accelerate?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button size="lg" className="shadow-lg shadow-neon-blue/25" to="/request/organization">SkillXL to Your Organization</Button>
            <Button size="lg" variant="secondary" to="/request/crt">Request Training</Button>
            <Button size="lg" variant="outline" className="bg-slate-900/50 backdrop-blur text-white border-white/20 hover:bg-white/10" to="/request/campus-drive">Hire Talent</Button>
          </div>
        </div>
      </section>
    </>
  );
};
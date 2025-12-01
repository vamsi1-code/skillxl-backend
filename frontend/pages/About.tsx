import React from 'react';
import { Section, Card } from '../components/UI';
import { FOUNDERS, APP_NAME } from '../constants';
import { Quote } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-20">
      <Section darker>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">About SkillXL</h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-12">
            SkillXL was born from a simple observation: Talent is everywhere, but opportunity is not. We set out to build a bridge that connects ambitious students, forward-thinking colleges, and top-tier companies.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-neon-blue">Our Mission</h2>
            <p className="text-slate-400 text-lg mb-6">
              To democratize access to high-quality career opportunities. We believe that with the right training and connections, every student can achieve their dream career.
            </p>
            <p className="text-slate-400 text-lg">
              We don't just act as a placement agency; we act as a career accelerator, working deeply with colleges to refine their curriculum and with companies to streamline their hiring.
            </p>
          </div>
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-slate-700" />
            <p className="text-xl italic text-slate-300 relative z-10 pt-8">
              "We don’t just teach — we show you opportunities, we connect you to opportunities, we create opportunities."
            </p>
            <div className="mt-6 font-bold text-white">— The SkillXL Mantra</div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-12 text-center">Meet The Founders</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FOUNDERS.map((founder, i) => (
             <div key={i} className="bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-neon-blue/50 transition-colors">
               <div className="h-64 bg-slate-800 relative overflow-hidden group">
                 <img src={founder.image} alt={founder.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                 <div className="absolute bottom-4 left-4">
                   <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                   <p className="text-neon-blue">{founder.role}</p>
                 </div>
               </div>
               <div className="p-6">
                 <p className="text-slate-400 mb-6">{founder.description}</p>
                 <div className="space-y-2">
                   {founder.stats.map((s, idx) => (
                     <div key={idx} className="text-sm font-semibold text-white bg-white/5 px-3 py-2 rounded-lg inline-block mr-2">
                       {s}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
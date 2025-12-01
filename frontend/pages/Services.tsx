import React from 'react';
import { Section, Card, Button } from '../components/UI';
import { SERVICES } from '../constants';
import { Check } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <Section className="pb-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-xl text-slate-400">
            End-to-end solutions for colleges seeking placements, companies seeking talent, and students seeking careers.
          </p>
        </div>
      </Section>

      <div className="container mx-auto px-4 pb-32">
        <div className="space-y-20">
          {SERVICES.map((service, idx) => (
            <div key={service.id} id={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-neon-blue mb-6">
                  <service.icon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-neon-purple shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button to={`/request/${service.id === 'staffing' ? 'campus-drive' : service.id}`}>
                    Get Started
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <Card className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 h-full border-t border-glass-border">
                  <h3 className="text-xl font-bold mb-4 text-center">Who is this for?</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.targetAudience.map((target, tIdx) => (
                      <span key={tIdx} className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                        {target}
                      </span>
                    ))}
                  </div>
                  {/* Decorative element */}
                  <div className="mt-8 relative h-48 rounded-xl overflow-hidden bg-slate-800/50">
                    <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/10 to-neon-purple/10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <service.icon className="w-24 h-24 text-slate-700/50" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
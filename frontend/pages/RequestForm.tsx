import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Section, Card, Input, TextArea, Select, Button } from '../components/UI';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const RequestForm: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map URL param to readable titles
  const config: Record<string, { title: string; subtitle: string }> = {
    'workshop': { title: 'Request a Workshop', subtitle: 'Host an expert-led session or bootcamp at your institution.' },
    'crt': { title: 'CRT Training Inquiry', subtitle: 'Equip your students with industry-ready skills.' },
    'campus-drive': { title: 'Host a Campus Drive', subtitle: 'Partner with SkillXL for your hiring needs.' },
    'partner': { title: 'Partner With Us', subtitle: 'Join the SkillXL ecosystem as a college or company partner.' },
    'academic-projects': { title: 'Request Academic Projects', subtitle: 'Get industry-standard projects, mentorship, and certification for final year students.' },
    'organization': { title: 'SkillXL for Your Organization', subtitle: 'Partner with us to transform your talent and opportunities.' },
  };

  const currentConfig = config[type || 'workshop'] || config['workshop'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Extract specific dynamic field based on the form type
    let serviceInterest = '';
    if (type === 'workshop') serviceInterest = formData.get('workshopType') as string;
    else if (type === 'crt') serviceInterest = formData.get('trainingType') as string;
    else if (type === 'academic-projects') serviceInterest = formData.get('projectDomain') as string;
    else if (type === 'organization') serviceInterest = formData.get('serviceType') as string;

    const payload = {
      formType: 'service-request',
      requestCategory: type,
      name: formData.get('name'),
      role: formData.get('role'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      organization: formData.get('organization'),
      message: formData.get('message'),
      serviceInterest: serviceInterest
    };

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        throw new Error('Failed to submit request.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the server. Please try again later or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Card className="max-w-md w-full text-center p-10">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
          <p className="text-slate-400 mb-8">
            Thank you for reaching out. Our team will review your request for <strong>{currentConfig.title}</strong> and get back to you within 24 hours.
          </p>
          <Button onClick={() => navigate('/')} variant="outline">Back to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <Section>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{currentConfig.title}</h1>
            <p className="text-slate-400">{currentConfig.subtitle}</p>
          </div>

          <Card className="bg-slate-900/80 p-8" gradientBorder>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Full Name" id="name" name="name" placeholder="John Doe" required />
                <Input label="Job Title / Role" id="role" name="role" placeholder="Placement Officer / HR / Student" required />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Email Address" id="email" name="email" type="email" placeholder="john@institute.edu" required />
                <Input label="Phone Number" id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
              </div>

              <Input label="Institution / Company Name" id="orgName" name="organization" placeholder="University of Technology" required />

              {type === 'workshop' && (
                 <Select 
                   label="Workshop Type" 
                   id="workshopType" 
                   name="workshopType"
                   options={['AI/ML Workshop', 'Full Stack Bootcamp', 'Hardware/IoT', 'Hackathon', 'Other']} 
                 />
              )}

              {type === 'crt' && (
                 <Select 
                   label="Training Focus" 
                   id="trainingType" 
                   name="trainingType"
                   options={['Full Stack Development', 'Aptitude & Reasoning', 'Soft Skills & Interview Prep', 'Complete CRT Package']} 
                 />
              )}

              {type === 'academic-projects' && (
                 <Select 
                   label="Project Domain" 
                   id="projectDomain" 
                   name="projectDomain"
                   options={['Full Stack Web App', 'AI/Machine Learning', 'IoT & Embedded Systems', 'Data Science', 'Blockchain', 'Other']} 
                 />
              )}
              
              {type === 'organization' && (
                 <Select 
                   label="Service Type" 
                   id="serviceType" 
                   name="serviceType"
                   options={['CRT & Placement Training', 'Workshops & Skill Dev', 'Academic Projects', 'Staffing Solutions', 'Expert Consultancy', 'Other']} 
                 />
              )}

              <TextArea label="Message / Specific Requirements" id="message" name="message" placeholder="Tell us more about your requirements, batch size, or preferred dates..." />

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              
              <p className="text-xs text-slate-500 text-center mt-4">
                By submitting, you agree to our privacy policy. We respect your data.
              </p>
            </form>
          </Card>
        </div>
      </Section>
    </div>
  );
};
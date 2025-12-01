import React, { useState } from 'react';
import { Section, Input, TextArea, Button, Card } from '../components/UI';
import { Mail, MapPin, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    const payload = {
      formType: 'contact',
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'), // Added Role field
      message: formData.get('message'),
    };

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <Section>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Get In Touch</h1>
            <p className="text-slate-400 text-lg mb-10">
              Have a question? Whether you represent a college, a company, or just want to say hi, we're here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Visit Us</h3>
                  <p className="text-slate-400">Hyderabad, India<br />All Over India Online Service</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Email Us</h3>
                  <p className="text-slate-400">support@skillxl.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Call Us</h3>
                  <p className="text-slate-400">+91 63035 24256</p>
                  <p className="text-slate-400">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-slate-900/80">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            {success ? (
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-slate-400">We'll get back to you shortly.</p>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => setSuccess(false)}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Your Name" id="name" name="name" placeholder="Enter your name" required />
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Email Address" id="email" name="email" type="email" placeholder="Enter your email" required />
                  <Input label="Job Title / Role" id="role" name="role" placeholder="e.g. Student, HR" required />
                </div>
                <TextArea label="Message" id="message" name="message" placeholder="How can we help you?" required />
                
                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
                
                <Button className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'SendMessage'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Section, Card, Button, Input, TextArea } from '../components/UI';
import { Mail, Phone, Calendar, CheckCircle2, XCircle, Clock, Send, Search, Lock, AlertTriangle } from 'lucide-react';
import { FormType } from '../types';
import { API_BASE_URL } from '../constants';

interface Submission {
  _id: string;
  formType: string;
  requestCategory?: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  organization?: string;
  serviceInterest?: string;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Submission | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initial Fetch
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
      const interval = setInterval(fetchSubmissions, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/submissions`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') setIsAuthenticated(true);
    else alert('Invalid PIN');
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setSubmissions(prev => prev.map(s => s._id === id ? { ...s, status: newStatus as any } : s));
      if (selectedLead?._id === id) setSelectedLead(prev => prev ? { ...prev, status: newStatus as any } : null);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    setSendingEmail(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead._id,
          to: selectedLead.email,
          subject: replySubject,
          message: replyMessage,
          // PASS ORIGINAL DETAILS TO BACKEND
          originalRequest: {
            name: selectedLead.name,
            role: selectedLead.role || 'Not Specified', 
            service: selectedLead.serviceInterest || selectedLead.requestCategory,
            message: selectedLead.message
          }
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Reply Sent Successfully!');
        handleStatusUpdate(selectedLead._id, 'contacted');
        setReplyMessage('');
        setReplySubject('');
        setSelectedLead(null);
      } else {
        setErrorMessage(data.error || 'Failed to send email.');
      }
    } catch (err) {
      setErrorMessage('Network error. Is the backend running?');
    } finally {
      setSendingEmail(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'contacted': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'converted': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'closed': return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
      default: return 'text-slate-400';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-950">
        <Card className="w-full max-w-sm p-8 text-center bg-slate-900">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-neon-blue" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <Input 
              label="Enter PIN" 
              type="password" 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
              className="text-center tracking-widest text-2xl"
              placeholder="••••"
            />
            <Button type="submit" className="w-full mt-4">Unlock Dashboard</Button>
            <p className="text-xs text-slate-500 mt-4">Default PIN: 1234</p>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-950 px-4 md:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400">Manage leads and send quick responses.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" onClick={fetchSubmissions}>Refresh Data</Button>
          <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-sm text-slate-300">
            Total Leads: <span className="text-white font-bold">{submissions.length}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
        {/* LEFT COLUMN: LEADS LIST */}
        <div className="lg:col-span-1 bg-slate-900/50 rounded-2xl border border-glass-border overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search leads..." 
                className="w-full bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-neon-blue"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 custom-scrollbar p-2 space-y-2">
            {loading ? (
              <p className="text-center text-slate-500 py-10">Loading leads...</p>
            ) : submissions.length === 0 ? (
              <p className="text-center text-slate-500 py-10">No submissions yet.</p>
            ) : (
              submissions.map((lead) => (
                <div 
                  key={lead._id}
                  onClick={() => {
                    setSelectedLead(lead);
                    setErrorMessage(null);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedLead?._id === lead._id ? 'bg-neon-blue/10 border-neon-blue/50' : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(lead.status)} uppercase`}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-white truncate">{lead.name}</h4>
                  <p className="text-xs text-slate-400 truncate mb-1">{lead.requestCategory || 'Contact Form'}</p>
                  <p className="text-xs text-neon-blue">{lead.organization || 'Individual'}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL & REPLY VIEW */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-glass-border overflow-hidden flex flex-col relative">
          {selectedLead ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedLead.name}</h2>
                  <div className="flex flex-col gap-1 text-sm text-slate-400">
                    <span className="flex items-center gap-1 text-white font-medium">{selectedLead.role || 'No Role Provided'}</span>
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedLead.email}</span>
                    {selectedLead.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {selectedLead.phone}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={selectedLead.status}
                    onChange={(e) => handleStatusUpdate(selectedLead._id, e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-neon-blue"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Content Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h5 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Request Type</h5>
                    <p className="text-white font-medium">{selectedLead.formType === 'contact' ? 'General Inquiry' : 'Service Request'}</p>
                    <p className="text-neon-blue text-sm">{selectedLead.requestCategory}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h5 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Interest / Service</h5>
                    <p className="text-white font-medium">{selectedLead.serviceInterest || 'N/A'}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h5 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Message</h5>
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message || "No message provided."}
                  </div>
                </div>

                {/* REPLY SECTION */}
                <div className="border-t border-slate-800 pt-8">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-neon-purple" /> Quick Reply
                  </h3>
                  
                  {errorMessage && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-sm">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <div>
                        <p className="font-bold">Error Sending Email</p>
                        <p>{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSendReply} className="space-y-4">
                    <Input 
                      label="Subject" 
                      value={replySubject} 
                      onChange={(e) => setReplySubject(e.target.value)}
                      placeholder={`Re: Your inquiry about ${selectedLead.requestCategory || 'SkillXL'}`}
                      className="bg-slate-950"
                      required
                    />
                    <TextArea 
                      label="Response" 
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your response here..."
                      className="bg-slate-950 min-h-[150px]"
                      required
                    />
                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => {
                          setReplySubject('');
                          setReplyMessage('');
                          setErrorMessage(null);
                        }}
                      >
                        Clear
                      </Button>
                      <Button type="submit" disabled={sendingEmail}>
                        {sendingEmail ? 'Sending...' : 'Send Reply via Email'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
              <Mail className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Select a lead to view details and reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
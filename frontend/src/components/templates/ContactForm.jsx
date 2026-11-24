import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { publicAPI } from '../../services/api';

export const ContactForm = ({ username, accentColor = 'indigo' }) => {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const btnBg = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200',
    slate: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold shadow-emerald-900/30',
    purple: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-200',
  }[accentColor] || 'bg-indigo-600 text-white';

  const inputStyles = accentColor === 'slate'
    ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20'
    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-100';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sender_name || !formData.sender_email || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: '', message: '' });
      const res = await publicAPI.sendMessage(username, formData);
      setStatus({ type: 'success', message: res.data.message || 'Message sent successfully!' });
      setFormData({ sender_name: '', sender_email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.detail || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.message && (
        <div
          className={`p-3.5 rounded-xl text-sm flex items-start gap-2.5 ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.sender_name}
            onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
            placeholder="John Doe"
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputStyles}`}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
            Your Email *
          </label>
          <input
            type="email"
            required
            value={formData.sender_email}
            onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
            placeholder="john@example.com"
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputStyles}`}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
          Subject
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Project inquiry / Opportunity"
          className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputStyles}`}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
          Message *
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Hi, I would love to connect with you regarding..."
          className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputStyles}`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm shadow-md transition disabled:opacity-50 cursor-pointer ${btnBg}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

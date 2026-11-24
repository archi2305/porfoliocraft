import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2, Reply, Clock, Inbox, Loader2 } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

export const MessagesInbox = ({ showToast }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await portfolioAPI.getMessages();
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await portfolioAPI.markMessageRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await portfolioAPI.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast('Message deleted.', 'info');
    } catch (err) {
      showToast('Failed to delete message.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Contact Inquiries & Recruiter Messages</h3>
          <p className="text-xs text-slate-500">
            Messages submitted by visitors directly through your public portfolio contact form.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          Refresh Inbox
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mb-2" />
          <span className="text-xs">Loading inquiries...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">Your inbox is clear!</p>
          <p className="text-xs text-slate-400 mt-1">
            When recruiters or visitors use your portfolio contact form, their notes will arrive here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition ${
                msg.is_read
                  ? 'bg-white border-slate-200'
                  : 'bg-indigo-50/40 border-indigo-200 ring-1 ring-indigo-100 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {!msg.is_read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                  )}
                  <h4 className="text-sm font-bold text-slate-900">{msg.sender_name}</h4>
                  <a
                    href={`mailto:${msg.sender_email}`}
                    className="text-xs text-indigo-600 hover:underline font-medium"
                  >
                    &lt;{msg.sender_email}&gt;
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(msg.created_at)}</span>
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-semibold text-slate-800 mb-2">
                  Subject: {msg.subject}
                </p>
              )}

              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                {msg.message}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                {!msg.is_read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Read
                  </button>
                )}
                <a
                  href={`mailto:${msg.sender_email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                >
                  <Reply className="w-3.5 h-3.5" /> Reply
                </a>
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={deletingId === msg.id}
                  title="Delete message"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  {deletingId === msg.id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, Trash2, Award, ExternalLink, Calendar, Loader2, X } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

export const CertificationsSection = ({ certifications = [], onUpdate, showToast }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    issuer: '',
    issue_date: '',
    credential_url: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.issuer) {
      showToast('Certification Name and Issuer are required.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await portfolioAPI.addCertification(form);
      setForm({ name: '', issuer: '', issue_date: '', credential_url: '' });
      setShowAddForm(false);
      onUpdate();
      showToast('Certification added successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to add certification.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await portfolioAPI.deleteCertification(id);
      onUpdate();
      showToast('Certification deleted.', 'info');
    } catch (err) {
      showToast('Failed to delete certification.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Certifications & Achievements</h3>
          <p className="text-xs text-slate-500">
            Showcase certificates, online courses, hackathons, or academic honors.
          </p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" /> Add Certification
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
            <span className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" /> New Certification
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Certification Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                required
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                placeholder="e.g. Amazon Web Services, Coursera, Meta"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Issue Date
              </label>
              <input
                type="text"
                value={form.issue_date}
                onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                placeholder="e.g. March 2024"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Credential Verification URL
              </label>
              <input
                type="url"
                value={form.credential_url}
                onChange={(e) => setForm({ ...form, credential_url: e.target.value })}
                placeholder="https://coursera.org/verify/..."
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Certification
            </button>
          </div>
        </form>
      )}

      {certifications.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
          <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No certifications added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "Add Certification" to highlight your achievements.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">{cert.name}</h4>
                <p className="text-xs font-medium text-indigo-600">{cert.issuer}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  {cert.issue_date && <span>Issued {cert.issue_date}</span>}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-indigo-600"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDelete(cert.id)}
                disabled={deletingId === cert.id}
                title="Delete certification"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                {deletingId === cert.id ? (
                  <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

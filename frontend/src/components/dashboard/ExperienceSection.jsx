import React, { useState } from 'react';
import { Plus, Trash2, Briefcase, Calendar, Building2, Loader2, X } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

export const ExperienceSection = ({ experience = [], onUpdate, showToast }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    company: '',
    role: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.company || !form.role) {
      showToast('Company and Role are required.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await portfolioAPI.addExperience(form);
      setForm({
        company: '',
        role: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
      });
      setShowAddForm(false);
      onUpdate();
      showToast('Work experience added successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to add experience.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await portfolioAPI.deleteExperience(id);
      onUpdate();
      showToast('Experience entry deleted.', 'info');
    } catch (err) {
      showToast('Failed to delete experience.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Work Experience & Internships</h3>
          <p className="text-xs text-slate-500">
            List your full-time positions, internships, freelance gigs, or student leadership roles.
          </p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        )}
      </div>

      {/* Add Experience Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
            <span className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" /> New Experience
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
                Company / Organization *
              </label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Google or Tech Startup"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Job Role / Title *
              </label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Software Engineer Intern"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                placeholder="e.g. June 2023"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                End Date
              </label>
              <input
                type="text"
                disabled={form.is_current}
                value={form.is_current ? 'Present' : form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                placeholder="e.g. September 2023"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_current"
              checked={form.is_current}
              onChange={(e) => setForm({ ...form, is_current: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
            />
            <label htmlFor="is_current" className="text-xs font-medium text-slate-700 cursor-pointer">
              I am currently working in this role
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Work Description & Responsibilities
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Highlight your key achievements, technologies utilized, and impact..."
              className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
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
              Save Experience
            </button>
          </div>
        </form>
      )}

      {/* Experience List */}
      {experience.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No work experience added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "Add Experience" to list your career milestones.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                  {exp.is_current && (
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-indigo-600">{exp.company}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date || 'Present'}
                </p>
                {exp.description && (
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDelete(exp.id)}
                disabled={deletingId === exp.id}
                title="Delete experience"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                {deletingId === exp.id ? (
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

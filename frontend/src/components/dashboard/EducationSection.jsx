import React, { useState } from 'react';
import { Plus, Trash2, GraduationCap, Calendar, Award, Building, Loader2, X } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

export const EducationSection = ({ education = [], onUpdate, showToast }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    institution: '',
    degree: '',
    specialization: '',
    start_year: '',
    end_year: '',
    grade: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.institution || !form.degree) {
      showToast('Institution and Degree are required.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await portfolioAPI.addEducation(form);
      setForm({
        institution: '',
        degree: '',
        specialization: '',
        start_year: '',
        end_year: '',
        grade: '',
      });
      setShowAddForm(false);
      onUpdate();
      showToast('Education entry added successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to add education.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await portfolioAPI.deleteEducation(id);
      onUpdate();
      showToast('Education entry removed.', 'info');
    } catch (err) {
      showToast('Failed to delete education entry.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Education Background</h3>
          <p className="text-xs text-slate-500">
            Add your degrees, colleges, high schools, or relevant academic coursework.
          </p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        )}
      </div>

      {/* Add Education Form Modal/Box */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
            <span className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" /> New Education Entry
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
                College / University Name *
              </label>
              <input
                type="text"
                required
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="e.g. Stanford University"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Degree / Course *
              </label>
              <input
                type="text"
                required
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                placeholder="e.g. B.S. in Computer Science"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Specialization / Major
              </label>
              <input
                type="text"
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                placeholder="e.g. AI & Systems"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Start Year
              </label>
              <input
                type="text"
                value={form.start_year}
                onChange={(e) => setForm({ ...form, start_year: e.target.value })}
                placeholder="e.g. 2020"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                End Year (or Expected)
              </label>
              <input
                type="text"
                value={form.end_year}
                onChange={(e) => setForm({ ...form, end_year: e.target.value })}
                placeholder="e.g. 2024"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Grade / CGPA / Percentage
            </label>
            <input
              type="text"
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              placeholder="e.g. 3.8 / 4.0 or 88%"
              className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
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
              Save Education
            </button>
          </div>
        </form>
      )}

      {/* List of Education Entries */}
      {education.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
          <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No education entries added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "Add Education" to list your degree or school.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                  {edu.grade && (
                    <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      {edu.grade}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-indigo-600">{edu.institution}</p>
                {edu.specialization && (
                  <p className="text-xs text-slate-500">Major: {edu.specialization}</p>
                )}
                <p className="text-[11px] text-slate-400 font-mono">
                  {edu.start_year} – {edu.end_year || 'Present'}
                </p>
              </div>

              <button
                onClick={() => handleDelete(edu.id)}
                disabled={deletingId === edu.id}
                title="Delete education"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                {deletingId === edu.id ? (
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

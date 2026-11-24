import React, { useState } from 'react';
import { Plus, X, Tag, Code, Cpu, Wrench, Users, Loader2 } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

export const SkillsSection = ({ skills = [], onUpdate, showToast }) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('technical');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const categories = [
    { id: 'technical', label: 'Technical Skills', icon: <Cpu className="w-3.5 h-3.5 text-indigo-500" />, badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'language', label: 'Programming Languages', icon: <Code className="w-3.5 h-3.5 text-emerald-500" />, badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'tool', label: 'Tools & Technologies', icon: <Wrench className="w-3.5 h-3.5 text-amber-500" />, badge: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'soft', label: 'Soft Skills', icon: <Users className="w-3.5 h-3.5 text-purple-500" />, badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  ];

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const cleanName = skillName.trim();
    if (!cleanName) return;

    // Check if skill already exists
    if (skills.some((s) => s.name.toLowerCase() === cleanName.toLowerCase())) {
      showToast('Skill already added!', 'info');
      return;
    }

    try {
      setIsSubmitting(true);
      await portfolioAPI.addSkill({ name: cleanName, category });
      setSkillName('');
      onUpdate();
      showToast(`Added ${cleanName}`, 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to add skill', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await portfolioAPI.deleteSkill(id);
      onUpdate();
    } catch (err) {
      showToast('Failed to delete skill', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Skills & Proficiencies</h3>
        <p className="text-xs text-slate-500">
          Highlight your programming languages, frameworks, developer tools, and interpersonal skills.
        </p>
      </div>

      {/* Add Skill Bar */}
      <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:w-1/3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-indigo-500"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:flex-1 relative">
          <input
            type="text"
            required
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="e.g. React.js, Python, Docker, Problem Solving..."
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !skillName.trim()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-xs disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Skill
        </button>
      </form>

      {/* Categorized Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => (s.category || 'technical') === cat.id);
          return (
            <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  {cat.icon}
                  {cat.label}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {catSkills.length}
                </span>
              </div>

              {catSkills.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">No skills in this category yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((s) => (
                    <span
                      key={s.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border shadow-2xs ${cat.badge}`}
                    >
                      <span>{s.name}</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        title="Remove skill"
                        className="hover:text-rose-600 transition"
                      >
                        {deletingId === s.id ? (
                          <Loader2 className="w-3 h-3 animate-spin text-rose-500" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

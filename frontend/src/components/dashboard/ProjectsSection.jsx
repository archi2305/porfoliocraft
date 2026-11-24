import { GithubIcon } from "../common/BrandIcons";
import React, { useState } from 'react';
import { Plus, Trash2, FolderGit2, ExternalLink, Loader2, X, Code2 } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

export const ProjectsSection = ({ projects = [], onUpdate, showToast }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    live_url: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      showToast('Project title and description are required.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await portfolioAPI.addProject(form);
      setForm({
        title: '',
        description: '',
        tech_stack: '',
        github_url: '',
        live_url: '',
      });
      setShowAddForm(false);
      onUpdate();
      showToast('Project added successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to add project.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await portfolioAPI.deleteProject(id);
      onUpdate();
      showToast('Project deleted successfully.', 'info');
    } catch (err) {
      showToast('Failed to delete project.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Featured Projects</h3>
          <p className="text-xs text-slate-500">
            Showcase your best software projects, web applications, open source work, or college coursework.
          </p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        )}
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
            <span className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-600" /> New Project
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. PortfolioCraft or AI Search Engine"
              className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Project Description *
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe what problem this solves, core features, architecture, and your contributions..."
              className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              value={form.tech_stack}
              onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
              placeholder="e.g. React.js, FastAPI, SQLite, Tailwind CSS, Docker"
              className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                GitHub Repository URL
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="url"
                  value={form.github_url}
                  onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                  placeholder="https://github.com/username/project"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Live Demo / Deployment URL
              </label>
              <div className="relative">
                <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="url"
                  value={form.live_url}
                  onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                  placeholder="https://my-app.vercel.app"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>
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
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
          <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No projects added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "Add Project" to showcase your work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    disabled={deletingId === proj.id}
                    title="Delete project"
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    {deletingId === proj.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                {proj.tech_stack && (
                  <p className="text-[11px] font-mono text-indigo-600">
                    {proj.tech_stack}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs">
                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-slate-600 hover:text-slate-900"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> GitHub
                    </a>
                  )}
                  {proj.live_url && (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

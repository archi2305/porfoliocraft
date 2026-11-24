import React, { useState } from 'react';
import { Plus, Trash2, Globe, Link as LinkIcon, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/BrandIcons';
import { portfolioAPI } from '../../services/api';

export const SocialLinksSection = ({ social_links = [], onUpdate, showToast }) => {
  const [platform, setPlatform] = useState('github');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const platforms = [
    { id: 'github', label: 'GitHub', placeholder: 'https://github.com/username' },
    { id: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
    { id: 'website', label: 'Personal Website', placeholder: 'https://mywebsite.com' },
    { id: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/username' },
    { id: 'other', label: 'Other Social Link', placeholder: 'https://...' },
  ];

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      setIsSubmitting(true);
      await portfolioAPI.addSocial({ platform, url: url.trim() });
      setUrl('');
      onUpdate();
      showToast('Social link added successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to add social link.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await portfolioAPI.deleteSocial(id);
      onUpdate();
      showToast('Social link removed.', 'info');
    } catch (err) {
      showToast('Failed to delete social link.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const getIcon = (plat) => {
    const p = plat.toLowerCase();
    if (p.includes('github')) return <GithubIcon className="w-4 h-4 text-slate-800" />;
    if (p.includes('linkedin')) return <LinkedinIcon className="w-4 h-4 text-blue-600" />;
    if (p.includes('twitter') || p.includes('x')) return <TwitterIcon className="w-4 h-4 text-sky-500" />;
    if (p.includes('web')) return <Globe className="w-4 h-4 text-emerald-600" />;
    return <LinkIcon className="w-4 h-4 text-indigo-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Social Media & Online Profiles</h3>
        <p className="text-xs text-slate-500">
          Connect your GitHub, LinkedIn, portfolio blog, and social accounts for recruiters.
        </p>
      </div>

      <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:w-1/3">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-indigo-500"
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:flex-1 relative">
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={platforms.find((p) => p.id === platform)?.placeholder}
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !url.trim()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-xs disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Link
        </button>
      </form>

      {social_links.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl">
          <Globe className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-600">No social links added yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {social_links.map((link) => (
            <div
              key={link.id}
              className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                  {getIcon(link.platform)}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-slate-800 capitalize block">
                    {link.platform}
                  </span>
                  <a
                    href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:underline truncate block"
                  >
                    {link.url}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleDelete(link.id)}
                disabled={deletingId === link.id}
                title="Remove link"
                className="text-slate-400 hover:text-rose-600 p-2"
              >
                {deletingId === link.id ? (
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

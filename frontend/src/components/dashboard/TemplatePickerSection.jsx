import React, { useState } from 'react';
import { Check, Sparkles, Terminal, FileText, Eye, Loader2 } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

export const TemplatePickerSection = ({ currentTemplate = 'minimal', onUpdate, onPreview, showToast }) => {
  const [selected, setSelected] = useState(currentTemplate);
  const [isUpdating, setIsUpdating] = useState(false);

  const templates = [
    {
      id: 'minimal',
      name: 'Minimal Professional',
      tagline: 'Clean, timeless & editorial layout',
      description: 'Ideal for software engineers, consultants, and freshers looking for a crisp, high-readability resume layout.',
      icon: <FileText className="w-5 h-5 text-slate-700" />,
      themeColor: 'border-slate-300 bg-slate-50',
      badgeColor: 'bg-slate-100 text-slate-800',
    },
    {
      id: 'developer',
      name: 'Modern Developer',
      tagline: 'Tech-focused dark mode terminal look',
      description: 'Tailored for full-stack developers, DevOps engineers, and programmers. Features code blocks and terminal aesthetic.',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      themeColor: 'border-slate-800 bg-slate-950 text-white',
      badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-500/30',
    },
    {
      id: 'creative',
      name: 'Creative Personal',
      tagline: 'Vibrant modern SaaS card aesthetic',
      description: 'Perfect for UI/UX designers, students, and creators who want expressive typography, gradients, and subtle badges.',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      themeColor: 'border-purple-200 bg-gradient-to-br from-purple-50/60 to-indigo-50/60',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
  ];

  const handleSelectTemplate = async (templateId) => {
    if (templateId === selected) return;
    try {
      setIsUpdating(true);
      setSelected(templateId);
      await portfolioAPI.updateTemplate(templateId);
      onUpdate();
      showToast(`Selected "${templates.find((t) => t.id === templateId)?.name}" template!`, 'success');
    } catch (err) {
      showToast('Failed to change template', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Choose Portfolio Template</h3>
          <p className="text-xs text-slate-500">
            Select how your portfolio will be styled. All your content automatically adapts to any chosen theme.
          </p>
        </div>
        {onPreview && (
          <button
            onClick={onPreview}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition"
          >
            <Eye className="w-4 h-4" /> Live Preview
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const isCurrent = (portfolioAPI ? selected : currentTemplate) === tpl.id;

          return (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl.id)}
              className={`rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between relative ${
                isCurrent
                  ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-md bg-white'
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" /> Active
                </div>
              )}

              <div className="space-y-3">
                {/* Visual Preview Box */}
                <div className={`h-28 rounded-xl border p-3 flex flex-col justify-between ${tpl.themeColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-xs">
                      {tpl.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${tpl.badgeColor}`}>
                      {tpl.id}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-1/2 bg-current opacity-30 rounded-full" />
                    <div className="h-1.5 w-3/4 bg-current opacity-20 rounded-full" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{tpl.name}</h4>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5">{tpl.tagline}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  {isCurrent ? 'Currently Applied' : 'Click to Apply'}
                </span>
                <button
                  type="button"
                  disabled={isUpdating}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    isCurrent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isCurrent ? 'Selected' : 'Use This'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

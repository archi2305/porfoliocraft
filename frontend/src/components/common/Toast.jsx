import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800',
    info: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  }[type] || 'bg-slate-50 border-slate-200 text-slate-800';

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
  }[type];

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in max-w-md w-full px-4">
      <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${bgStyles}`}>
        {icons}
        <p className="text-sm font-medium flex-1">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

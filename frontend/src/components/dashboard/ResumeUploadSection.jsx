import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Printer, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { uploadAPI } from '../../services/api';

export const ResumeUploadSection = ({ portfolio, onUpdate, showToast }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const hasUploadedResume = !!portfolio?.resume_url;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please select a valid PDF file.', 'error');
      return;
    }

    try {
      setIsUploading(true);
      await uploadAPI.uploadResume(file);
      onUpdate();
      showToast('PDF Resume uploaded successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to upload resume PDF.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveResume = async () => {
    try {
      setIsRemoving(true);
      await uploadAPI.removeResume();
      onUpdate();
      showToast('Uploaded resume removed.', 'info');
    } catch (err) {
      showToast('Failed to remove resume.', 'error');
    } finally {
      setIsRemoving(false);
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Resume & Curriculum Vitae (CV)</h3>
        <p className="text-xs text-slate-500">
          Upload your existing PDF resume so visitors can download it directly from your generated portfolio website.
        </p>
      </div>

      {/* Upload Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PDF Upload Card */}
        <div className="p-6 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">
              {hasUploadedResume ? 'Replace Resume PDF' : 'Upload Resume PDF'}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs">
              Supports standard PDF files up to 10MB.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition cursor-pointer">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading PDF...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Choose PDF File
              </>
            )}
            <input
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              disabled={isUploading}
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Current Resume Status */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Resume Status
            </span>

            {hasUploadedResume ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <FileText className="w-8 h-8 text-rose-500 shrink-0 mt-0.5" />
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {portfolio.resume_filename || 'Uploaded_Resume.pdf'}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for public download
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  No custom PDF resume uploaded yet. Your portfolio will use the built-in printable resume export until you upload one.
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            {hasUploadedResume && (
              <>
                <a
                  href={portfolio.resume_url}
                  download={portfolio.resume_filename || 'Resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
                <button
                  type="button"
                  onClick={handleRemoveResume}
                  disabled={isRemoving}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  {isRemoving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Remove
                </button>
              </>
            )}

            <button
              type="button"
              onClick={handlePrintResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition ml-auto"
            >
              <Printer className="w-4 h-4" /> Print / PDF Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

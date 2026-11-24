import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Loader2, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { publicAPI } from '../services/api';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';

export const PublicPortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null); // 404 or 403

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        setIsLoading(true);
        setErrorStatus(null);
        const res = await publicAPI.getPortfolio(username);
        setPortfolio(res.data);
      } catch (err) {
        console.error("Public portfolio error:", err);
        setErrorStatus(err.response?.status || 500);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchPublicPortfolio();
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Loading {username}'s portfolio...
          </p>
        </div>
      </div>
    );
  }

  // Not Found
  if (errorStatus === 404) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Portfolio Not Found</h2>
            <p className="text-xs text-slate-500">
              No portfolio exists for the username <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">@{username}</code>.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Go to PortfolioCraft Home
          </Link>
        </div>
      </div>
    );
  }

  // Unpublished / Private
  if (errorStatus === 403) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Portfolio in Draft Mode</h2>
            <p className="text-xs text-slate-500">
              The author of this portfolio (@{username}) has not published it yet. Please check back soon!
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Go to PortfolioCraft Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Render Template */}
      <TemplateRenderer portfolio={portfolio} isPreview={false} />

      {/* Floating Badge: "Powered by PortfolioCraft" */}
      <div className="fixed bottom-4 right-4 z-40 no-print">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200 shadow-lg hover:shadow-xl hover:text-indigo-600 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Made with PortfolioCraft</span>
        </Link>
      </div>
    </div>
  );
};

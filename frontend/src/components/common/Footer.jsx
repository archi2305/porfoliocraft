import React from 'react';
import { Sparkles, Heart, Code2, Database, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900">PortfolioCraft</span>
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Empowering students, freshers, job seekers, and working professionals to create stunning, job-ready personal portfolio websites in minutes — without writing a single line of code.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                <Code2 className="w-3.5 h-3.5 text-indigo-600" /> React & FastAPI
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                <Database className="w-3.5 h-3.5 text-emerald-600" /> SQLite
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-600" /> JWT Secured
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="/#features" className="hover:text-indigo-600 transition">Features</a>
              </li>
              <li>
                <a href="/#templates" className="hover:text-indigo-600 transition">Templates</a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-indigo-600 transition">How It Works</a>
              </li>
              <li>
                <Link to="/p/alexmorgan" className="hover:text-indigo-600 transition">Sample Demo Portfolio</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-600 transition">Create Your Portfolio</Link>
              </li>
            </ul>
          </div>

          {/* About & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Project Info
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>Full-Stack Web Tech Project</li>
              <li>Interactive Portfolio Generator</li>
              <li>3 Distinct Designer Themes</li>
              <li>PDF Resume Upload & Export</li>
              <li>Direct Visitor Contact Inbox</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PortfolioCraft. Built for College Web Technology Project Evaluation.</p>
          <div className="flex items-center gap-1">
            <span>Designed with modern SaaS UI & UX standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

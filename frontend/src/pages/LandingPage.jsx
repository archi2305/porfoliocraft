import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Palette,
  FileText,
  Share2,
  ShieldCheck,
  Zap,
  Layout,
  ExternalLink,
  Laptop,
  Eye,
  Download,
  Users
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { isAuthenticated, quickDemoLogin } = useAuth();
  const [activeTemplateTab, setActiveTemplateTab] = useState('minimal');

  const sampleMockups = {
    minimal: {
      title: 'Minimal Professional',
      desc: 'Clean typography, refined monochrome palette, and structured timeline.',
      previewBg: 'bg-slate-50 border-slate-200',
      badge: 'Editorial & Elegant',
    },
    developer: {
      title: 'Modern Developer',
      desc: 'Dark theme, terminal header, repository cards, and interactive skill matrix.',
      previewBg: 'bg-slate-950 border-slate-800 text-slate-100',
      badge: 'Code & Terminal Mode',
    },
    creative: {
      title: 'Creative Personal',
      desc: 'Vibrant card styling, gradient accents, floating avatar, and badge highlights.',
      previewBg: 'bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 border-indigo-100',
      badge: 'Expressive & Modern',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-pink-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/80 text-indigo-700 shadow-2xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Zero Coding Required • Build in Under 5 Minutes</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Build Your Professional{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio in Minutes
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Enter your details, choose from 3 designer templates, and automatically generate a polished, responsive personal portfolio website with a unique shareable link.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-600/25 transition duration-200 hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/p/alexmorgan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-xs transition duration-200"
            >
              <Eye className="w-5 h-5 text-indigo-600" />
              View Sample Portfolio
            </Link>
          </div>

          {/* Social Proof / Target Audience Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Perfect for Students & Freshers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Job Seekers & Developers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> PDF Resume Upload & Export
            </span>
          </div>

          {/* Interactive Hero Preview Frame */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="p-3 sm:p-4 rounded-3xl bg-slate-900/5 ring-1 ring-slate-900/10 shadow-2xl">
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                
                {/* Browser-like window header */}
                <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-xs font-mono text-slate-500 hidden sm:inline">
                      https://portfoliocraft.com/p/alexmorgan
                    </span>
                  </div>

                  {/* Template Switcher Tabs */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                    {['minimal', 'developer', 'creative'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTemplateTab(tab)}
                        className={`px-3 py-1 rounded-lg capitalize transition ${
                          activeTemplateTab === tab
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mockup Preview Area */}
                <div className={`p-6 sm:p-12 text-left transition-colors duration-300 ${sampleMockups[activeTemplateTab].previewBg}`}>
                  <div className="max-w-2xl space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-indigo-100/60 text-indigo-700">
                        {sampleMockups[activeTemplateTab].badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Live Demo Mockup</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-bold">Alex Morgan</h3>
                      <p className="text-base font-medium opacity-80">
                        Full Stack Software Engineer & Cloud Enthusiast
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed opacity-70">
                      Stanford CS Graduate building high-performance web applications, collaborative dev tools, and scalable APIs. Experienced in React, FastAPI, Docker, and PostgreSQL.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {['React.js', 'FastAPI', 'Python', 'Tailwind CSS', 'Docker', 'REST APIs'].map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/80 border border-slate-200 shadow-2xs text-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <Link
                        to="/p/alexmorgan"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline"
                      >
                        Explore Alex's Full Generated Portfolio <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Powerful & Beginner Friendly
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Stand Out
            </h2>
            <p className="text-base text-slate-600">
              Stop stressing over web design or hosting configurations. Just enter your info and we do the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3 Polished Templates</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose between Minimal Professional, Modern Developer, and Creative Personal. Switch anytime with a single click.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-200">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">PDF Resume Management</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload your actual PDF resume for recruiters to download, or print a beautifully formatted resume straight from your portfolio.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Custom Public URL</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Publish your portfolio to a clean public URL (e.g. <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">/p/yourname</code>) ready to put on your resume and LinkedIn.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Interactive Contact Form</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Recruiters can message you directly from your public portfolio. View, organize, and reply to all inquiries from your personal dashboard.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Multi-Section Modular Builder</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add education timelines, categorized skills, project repositories with live demo links, work history, and verifiable certifications.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">FastAPI & SQLite Core</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Built with robust Python FastAPI, SQLite database storage, secure bcrypt hashing, and instant JWT authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How PortfolioCraft Works
            </h2>
            <p className="text-base text-slate-600">
              From zero to a published professional website in three effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center border border-indigo-200">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Enter Your Information</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fill in your bio, education, skills, projects, work experience, social links, and upload your PDF resume.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-700 font-bold flex items-center justify-center border border-violet-200">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Select a Template</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose between Minimal Professional, Modern Developer, or Creative Personal styles. Preview your portfolio live in real-time.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Publish & Share</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Toggle Publish to make your portfolio live. Share your personal URL with recruiters, companies, or college evaluators.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white text-center space-y-6 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to create your dream portfolio?
            </h3>
            <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto">
              Join students and developers using PortfolioCraft to stand out in technical interviews and college project evaluations.
            </p>
            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold bg-white text-indigo-950 hover:bg-indigo-50 shadow-lg transition"
              >
                Create Your Free Portfolio Now
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

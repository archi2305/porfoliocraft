import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  User,
  GraduationCap,
  Cpu,
  FolderGit2,
  Briefcase,
  Award,
  Globe,
  FileText,
  Palette,
  ExternalLink,
  Eye,
  CheckCircle2,
  Copy,
  Share2,
  Download,
  Printer,
  Mail,
  Loader2,
  X,
  Sliders,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { portfolioAPI } from '../services/api';
import { Toast } from '../components/common/Toast';
import { PersonalInfoSection } from '../components/dashboard/PersonalInfoSection';
import { EducationSection } from '../components/dashboard/EducationSection';
import { SkillsSection } from '../components/dashboard/SkillsSection';
import { ProjectsSection } from '../components/dashboard/ProjectsSection';
import { ExperienceSection } from '../components/dashboard/ExperienceSection';
import { CertificationsSection } from '../components/dashboard/CertificationsSection';
import { SocialLinksSection } from '../components/dashboard/SocialLinksSection';
import { ResumeUploadSection } from '../components/dashboard/ResumeUploadSection';
import { TemplatePickerSection } from '../components/dashboard/TemplatePickerSection';
import { MessagesInbox } from '../components/dashboard/MessagesInbox';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';

export const DashboardPage = () => {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isTogglingPublish, setIsTogglingPublish] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      const res = await portfolioAPI.getPortfolio();
      setPortfolio(res.data);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      showToast("Failed to load portfolio details.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolio();
    }
  }, [isAuthenticated]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 4000);
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    try {
      setIsTogglingPublish(true);
      const nextState = !portfolio.is_published;
      const res = await portfolioAPI.togglePublish(nextState);
      setPortfolio((prev) => ({ ...prev, is_published: res.data.is_published }));
      
      if (res.data.is_published) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast("Congratulations! Your portfolio is now LIVE for the world to see!", "success");
      } else {
        showToast("Your portfolio is now private / unpublished.", "info");
      }
    } catch (err) {
      showToast("Failed to update publish status.", "error");
    } finally {
      setIsTogglingPublish(false);
    }
  };

  const copyPublicLink = () => {
    const url = `${window.location.origin}/p/${user?.username}`;
    navigator.clipboard.writeText(url);
    showToast("Portfolio link copied to clipboard!", "success");
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, count: portfolio?.education?.length },
    { id: 'skills', label: 'Skills', icon: <Cpu className="w-4 h-4" />, count: portfolio?.skills?.length },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" />, count: portfolio?.projects?.length },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" />, count: portfolio?.experience?.length },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" />, count: portfolio?.certifications?.length },
    { id: 'socials', label: 'Social Links', icon: <Globe className="w-4 h-4" />, count: portfolio?.social_links?.length },
    { id: 'resume', label: 'Resume PDF', icon: <FileText className="w-4 h-4" /> },
    { id: 'templates', label: 'Templates', icon: <Palette className="w-4 h-4" /> },
    { id: 'inbox', label: 'Messages', icon: <Mail className="w-4 h-4" /> },
  ];

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading your PortfolioCraft workspace...</p>
        </div>
      </div>
    );
  }

  const completion = portfolio?.completion_percentage || 0;

  return (
    <div className="min-h-screen bg-slate-50/60 antialiased flex flex-col font-sans">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">PortfolioCraft</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Live Preview Button */}
            <button
              onClick={() => setShowPreviewModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            {/* Public Link */}
            {portfolio?.is_published ? (
              <a
                href={`/p/${user?.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View Public</span>
              </a>
            ) : null}

            {/* Publish Toggle Button */}
            <button
              onClick={handleTogglePublish}
              disabled={isTogglingPublish}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition disabled:opacity-50 ${
                portfolio?.is_published
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              {isTogglingPublish ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              <span>{portfolio?.is_published ? 'Published' : 'Publish Portfolio'}</span>
            </button>

            {/* User Avatar & Logout */}
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 hidden md:inline">
                {user?.username}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        
        {/* Welcome & Progress Overview Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Welcome, {portfolio?.full_name || user?.username}! 👋
              </h1>
              {portfolio?.is_published ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  Draft
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Customize your sections below. Your portfolio auto-syncs across all 3 templates.
            </p>

            {/* Public Link Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono">Public URL:</span>
              <code className="bg-slate-100 text-indigo-700 px-2.5 py-1 rounded-lg font-mono font-semibold border border-slate-200">
                /p/{user?.username}
              </code>
              <button
                onClick={copyPublicLink}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
                title="Copy link"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Completion Meter */}
          <div className="w-full md:w-64 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Profile Strength</span>
              <span className="text-indigo-600">{completion}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {completion < 70 ? 'Add more skills and projects to boost score!' : 'Your profile looks outstanding! ✨'}
            </p>
          </div>
        </div>

        {/* Dashboard Tabs & Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2 space-y-1 shadow-2xs lg:sticky lg:top-24">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Portfolio Builder
            </div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Section Content Area */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            {activeTab === 'personal' && (
              <PersonalInfoSection
                portfolio={portfolio}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'education' && (
              <EducationSection
                education={portfolio?.education}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsSection
                skills={portfolio?.skills}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsSection
                projects={portfolio?.projects}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceSection
                experience={portfolio?.experience}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'certifications' && (
              <CertificationsSection
                certifications={portfolio?.certifications}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'socials' && (
              <SocialLinksSection
                social_links={portfolio?.social_links}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'resume' && (
              <ResumeUploadSection
                portfolio={portfolio}
                onUpdate={fetchPortfolio}
                showToast={showToast}
              />
            )}

            {activeTab === 'templates' && (
              <TemplatePickerSection
                currentTemplate={portfolio?.selected_template}
                onUpdate={fetchPortfolio}
                onPreview={() => setShowPreviewModal(true)}
                showToast={showToast}
              />
            )}

            {activeTab === 'inbox' && (
              <MessagesInbox showToast={showToast} />
            )}
          </div>

        </div>

      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Bar */}
            <div className="px-6 py-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Portfolio Preview
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 capitalize">
                  Theme: {portfolio?.selected_template || 'minimal'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`/p/${user?.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  Open in New Tab <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Render Current Template */}
            <div className="flex-1 overflow-y-auto">
              <TemplateRenderer portfolio={portfolio} isPreview={true} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

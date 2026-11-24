import { GithubIcon } from "../common/BrandIcons";
import React, { useState } from 'react';
import { Terminal, Download, ExternalLink, MapPin, Mail, Phone, Calendar, Award, GraduationCap, Briefcase, Code, Sparkles, FolderGit2 } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { ContactForm } from './ContactForm';

export const ModernDeveloper = ({ portfolio, isPreview = false }) => {
  const {
    username,
    full_name,
    title,
    bio,
    location,
    phone,
    email,
    avatar_url,
    resume_url,
    education = [],
    skills = [],
    projects = [],
    experience = [],
    certifications = [],
    social_links = [],
  } = portfolio;

  const [activeSkillCategory, setActiveSkillCategory] = useState('all');

  const categories = ['all', 'technical', 'language', 'tool', 'soft'];
  const filteredSkills = activeSkillCategory === 'all'
    ? skills
    : skills.filter((s) => (s.category || 'technical') === activeSkillCategory);

  const handleResumeDownload = () => {
    if (resume_url) {
      const link = document.createElement('a');
      link.href = resume_url;
      link.download = portfolio.resume_filename || `${full_name}_Resume.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
      
      {/* Sticky Dark Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 no-print">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-mono text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition">
            <Terminal className="w-4 h-4" />
            <span>~/{username || 'dev'}</span>
          </a>
          <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-slate-400">
            <a href="#about" className="hover:text-emerald-400 transition">&lt;about /&gt;</a>
            {skills.length > 0 && <a href="#skills" className="hover:text-emerald-400 transition">&lt;skills /&gt;</a>}
            {projects.length > 0 && <a href="#projects" className="hover:text-emerald-400 transition">&lt;projects /&gt;</a>}
            {experience.length > 0 && <a href="#experience" className="hover:text-emerald-400 transition">&lt;experience /&gt;</a>}
            {education.length > 0 && <a href="#education" className="hover:text-emerald-400 transition">&lt;education /&gt;</a>}
            <a href="#contact" className="hover:text-emerald-400 transition">&lt;contact /&gt;</a>
          </div>
          <button
            onClick={handleResumeDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            resume.pdf
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-24">
        
        {/* Hero Section */}
        <section id="hero" className="scroll-mt-20">
          <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-purple-500/20 shadow-2xl">
            <div className="bg-slate-900/90 rounded-xl p-6 sm:p-10 border border-slate-800">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-slate-500">bash — 80x24</span>
                </div>
                <div className="text-emerald-400 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  available for opportunities
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8">
                <div className="space-y-4 flex-1">
                  <div className="space-y-1 font-mono">
                    <p className="text-xs text-emerald-400">const developer = &#123;</p>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight pl-4">
                      {full_name || 'Your Name'}
                    </h1>
                    <p className="text-base sm:text-xl text-indigo-400 pl-4 font-sans font-medium">
                      role: "{title || 'Software Developer'}",
                    </p>
                    <p className="text-xs text-emerald-400">&#125;;</p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans pt-2">
                    {bio || 'Passionate developer focused on building responsive, resilient, and human-friendly digital products.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                    {location && (
                      <span className="flex items-center gap-1 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60">
                        <MapPin className="w-3 h-3 text-emerald-400" /> {location}
                      </span>
                    )}
                    {email && (
                      <span className="flex items-center gap-1 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60">
                        <Mail className="w-3 h-3 text-indigo-400" /> {email}
                      </span>
                    )}
                    {phone && (
                      <span className="flex items-center gap-1 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60">
                        <Phone className="w-3 h-3 text-emerald-400" /> {phone}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <SocialLinks links={social_links} email={email} variant="dark" />
                    <button
                      onClick={handleResumeDownload}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Resume.pdf
                    </button>
                  </div>
                </div>

                {avatar_url && (
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-500 opacity-30 group-hover:opacity-60 blur-md transition duration-500" />
                    <img
                      src={avatar_url}
                      alt={full_name}
                      className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-2xl object-cover border-2 border-slate-700 shadow-xl bg-slate-900"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Skills Matrix */}
        {skills.length > 0 && (
          <section id="skills" className="scroll-mt-20 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Competencies</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-indigo-400" /> Tech Stack & Tools
                </h2>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveSkillCategory(cat)}
                    className={`px-3 py-1 rounded-lg capitalize transition ${
                      activeSkillCategory === cat
                        ? 'bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredSkills.map((s) => (
                <div
                  key={s.id || s.name}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-200">{s.name}</span>
                  <span className="ml-auto text-[10px] text-slate-500 uppercase">{s.category || 'tech'}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-20 space-y-6">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">// Repositories</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-emerald-400" /> Featured Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id || proj.title}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition">
                        {proj.title}
                      </h3>
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                          title="Open Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
                    {proj.tech_stack && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech_stack.split(',').map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700/50"
                          >
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs font-mono pt-1">
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition"
                        >
                          <GithubIcon className="w-4 h-4" /> repository
                        </a>
                      )}
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-indigo-400 transition"
                        >
                          <ExternalLink className="w-4 h-4" /> live_preview
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section id="experience" className="scroll-mt-20 space-y-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Career History</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" /> Work Experience
              </h2>
            </div>

            <div className="space-y-6 relative border-l border-slate-800 ml-3 pl-6">
              {experience.map((exp) => (
                <div key={exp.id || exp.company} className="relative group space-y-2">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-700 group-hover:bg-emerald-400 border-2 border-slate-950 transition-colors" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                    <span className="text-xs font-mono text-emerald-400">
                      {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date || 'Present'}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-indigo-300">@ {exp.company}</p>
                  {exp.description && (
                    <p className="text-xs text-slate-400 leading-relaxed font-sans whitespace-pre-line pt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.length > 0 && (
            <section id="education" className="scroll-mt-20 space-y-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Academic Background</span>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" /> Education
                </h2>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id || edu.institution} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                    <p className="text-xs text-indigo-300 font-mono">{edu.institution}</p>
                    {edu.specialization && <p className="text-xs text-slate-400">{edu.specialization}</p>}
                    <div className="text-[11px] font-mono text-slate-500 pt-1">
                      {edu.start_year} – {edu.end_year} {edu.grade ? `| ${edu.grade}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section id="certifications" className="scroll-mt-20 space-y-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">// Credentials</span>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" /> Certifications
                </h2>
              </div>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id || cert.name} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <h3 className="text-sm font-semibold text-white flex items-center justify-between">
                      {cert.name}
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-emerald-400"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                    {cert.issue_date && (
                      <p className="text-[11px] font-mono text-slate-500">Issued {cert.issue_date}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 pt-12 border-t border-slate-800 no-print">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Direct Dispatch</span>
              <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
              <p className="text-xs font-mono text-slate-400">
                Send a message directly to my developer inbox.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <ContactForm username={username} accentColor="slate" />
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-xs font-mono text-slate-500 no-print">
        <p>Built with PortfolioCraft • {new Date().getFullYear()} {full_name}</p>
      </footer>
    </div>
  );
};

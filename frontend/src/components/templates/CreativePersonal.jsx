import { GithubIcon } from "../common/BrandIcons";
import React from 'react';
import { Sparkles, Download, ExternalLink, MapPin, Mail, Phone, Calendar, Award, GraduationCap, Briefcase, Heart, CheckCircle2 } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { ContactForm } from './ContactForm';

export const CreativePersonal = ({ portfolio, isPreview = false }) => {
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-white to-purple-50/40 text-slate-900 antialiased font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-indigo-100/80 no-print">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#about" className="flex items-center gap-2 font-bold text-lg text-slate-900 hover:text-indigo-600 transition">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-purple-100">
              {full_name ? full_name[0] : 'P'}
            </span>
            <span>{full_name || 'Portfolio'}</span>
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-indigo-600 transition">About</a>
            {projects.length > 0 && <a href="#projects" className="hover:text-indigo-600 transition">Projects</a>}
            {skills.length > 0 && <a href="#skills" className="hover:text-indigo-600 transition">Skills</a>}
            {experience.length > 0 && <a href="#experience" className="hover:text-indigo-600 transition">Experience</a>}
            {education.length > 0 && <a href="#education" className="hover:text-indigo-600 transition">Education</a>}
            <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
          </div>
          <button
            onClick={handleResumeDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-sm hover:shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-24">
        
        {/* Creative Hero */}
        <section id="about" className="scroll-mt-20">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                <Sparkles className="w-3.5 h-3.5" /> Welcome to my creative portfolio
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {full_name || 'Your Name'}
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-slate-600">
                  {title || 'Creative Technologist & Builder'}
                </p>
              </div>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                {bio || 'I combine technology, clean design, and human curiosity to build experiences that inspire and perform.'}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-500">
                {location && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" /> {location}
                  </span>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 hover:border-purple-300">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" /> {email}
                  </a>
                )}
                {phone && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200">
                    <Phone className="w-3.5 h-3.5 text-purple-600" /> {phone}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <SocialLinks links={social_links} email={email} />
                <button
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
              </div>
            </div>

            {avatar_url && (
              <div className="relative group shrink-0">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-purple-400 via-pink-400 to-indigo-400 opacity-20 blur-xl group-hover:opacity-40 transition duration-500" />
                <div className="relative p-2 rounded-3xl bg-white shadow-xl border border-indigo-100">
                  <img
                    src={avatar_url}
                    alt={full_name}
                    className="w-48 h-48 sm:w-60 sm:h-60 rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-white px-3.5 py-1.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Available for Hire
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section with colorful tags */}
        {skills.length > 0 && (
          <section id="skills" className="scroll-mt-20 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600">Core Toolkit</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Skills & Competencies</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
              {skills.map((s, idx) => {
                const colorSchemes = [
                  'bg-purple-50 text-purple-700 border-purple-200',
                  'bg-indigo-50 text-indigo-700 border-indigo-200',
                  'bg-blue-50 text-blue-700 border-blue-200',
                  'bg-pink-50 text-pink-700 border-pink-200',
                ];
                const color = colorSchemes[idx % colorSchemes.length];
                return (
                  <span
                    key={s.id || s.name}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border shadow-2xs hover:scale-105 transition duration-200 cursor-default ${color}`}
                  >
                    {s.name}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects Cards */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-20 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Selected Work</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id || proj.title}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                    {proj.tech_stack && (
                      <p className="text-[11px] font-medium text-purple-600">
                        {proj.tech_stack}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs">
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-indigo-600"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> Source
                        </a>
                      )}
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 ml-auto"
                        >
                          Demo <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section id="experience" className="scroll-mt-20 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600">Journey</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Work & Experience</h2>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {experience.map((exp) => (
                <div
                  key={exp.id || exp.company}
                  className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                      {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date || 'Present'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-indigo-600">{exp.company}</p>
                  {exp.description && (
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pt-1">
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
            <section id="education" className="scroll-mt-20 space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" /> Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id || edu.institution} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-xs font-medium text-slate-600">{edu.institution}</p>
                    {edu.specialization && <p className="text-xs text-purple-600">{edu.specialization}</p>}
                    <p className="text-[11px] text-slate-400">
                      {edu.start_year} – {edu.end_year} {edu.grade ? `| ${edu.grade}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section id="certifications" className="scroll-mt-20 space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" /> Certifications & Honors
              </h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id || cert.name} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                      {cert.name}
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs font-medium text-slate-600">{cert.issuer}</p>
                    {cert.issue_date && (
                      <p className="text-[11px] text-slate-400">Issued {cert.issue_date}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Contact Form */}
        <section id="contact" className="scroll-mt-20 pt-8 no-print">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600">Get in touch</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Let's Create Something Great</h2>
              <p className="text-sm text-slate-500">
                Have a project in mind or want to explore collaboration? Say hello!
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xl">
              <ContactForm username={username} accentColor="purple" />
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-indigo-100/60 py-8 text-center text-xs text-slate-400 no-print">
        <p>© {new Date().getFullYear()} {full_name}. Created with PortfolioCraft.</p>
      </footer>
    </div>
  );
};

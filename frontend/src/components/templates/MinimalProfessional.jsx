import { GithubIcon } from "../common/BrandIcons";
import React from 'react';
import { Download, ExternalLink, MapPin, Mail, Phone, Calendar, Award, GraduationCap, Briefcase, ChevronRight } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { ContactForm } from './ContactForm';

export const MinimalProfessional = ({ portfolio, isPreview = false }) => {
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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-slate-200 selection:text-slate-900">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#about" className="font-semibold text-lg tracking-tight text-slate-900 hover:text-slate-600 transition">
            {full_name || 'Portfolio'}
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-slate-900 transition">About</a>
            {experience.length > 0 && <a href="#experience" className="hover:text-slate-900 transition">Experience</a>}
            {projects.length > 0 && <a href="#projects" className="hover:text-slate-900 transition">Projects</a>}
            {skills.length > 0 && <a href="#skills" className="hover:text-slate-900 transition">Skills</a>}
            {education.length > 0 && <a href="#education" className="hover:text-slate-900 transition">Education</a>}
            <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
          </div>
          <button
            onClick={handleResumeDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 sm:py-20 space-y-20">
        
        {/* Hero / About Section */}
        <section id="about" className="pt-4 scroll-mt-20">
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-8 pb-10 border-b border-slate-200">
            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                  {full_name || 'Your Full Name'}
                </h1>
                <p className="text-lg font-medium text-slate-600">
                  {title || 'Professional Title'}
                </p>
              </div>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                {location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {location}
                  </span>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-slate-800">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {email}
                  </a>
                )}
                {phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {phone}
                  </span>
                )}
              </div>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base pt-2">
                {bio || 'Write a brief summary of your background, passions, and what drives your professional work.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <SocialLinks links={social_links} email={email} />
                <button
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV / Resume
                </button>
              </div>
            </div>

            {avatar_url && (
              <div className="shrink-0">
                <img
                  src={avatar_url}
                  alt={full_name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-white shadow-md bg-slate-100"
                />
              </div>
            )}
          </div>
        </section>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section id="experience" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-600" /> Work Experience
            </h2>
            <div className="relative border-l border-slate-200 ml-2 sm:ml-4 pl-6 space-y-10">
              {experience.map((exp) => (
                <div key={exp.id || exp.company} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-300 group-hover:bg-slate-900 border-2 border-white transition-colors" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-base font-semibold text-slate-900">{exp.role}</h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date || 'Present'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-2">{exp.company}</p>
                  {exp.description && (
                    <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-slate-600" /> Selected Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id || proj.title}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm transition flex flex-col justify-between"
                >
                  <div className="space-y-2.5 mb-4">
                    <h3 className="text-base font-semibold text-slate-900 flex items-center justify-between">
                      {proj.title}
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-800 transition"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    {proj.tech_stack && (
                      <p className="text-[11px] font-mono text-slate-500">
                        {proj.tech_stack}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs">
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> Code
                        </a>
                      )}
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section id="skills" className="scroll-mt-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s.id || s.name}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Education */}
          {education.length > 0 && (
            <section id="education" className="scroll-mt-20">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-600" /> Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id || edu.institution} className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-xs font-medium text-slate-600">{edu.institution}</p>
                    {edu.specialization && (
                      <p className="text-xs text-slate-500">{edu.specialization}</p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-0.5">
                      <span>{edu.start_year} – {edu.end_year}</span>
                      {edu.grade && <span>• Grade: {edu.grade}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section id="certifications" className="scroll-mt-20">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-600" /> Certifications
              </h2>
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div key={cert.id || cert.name} className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900 flex items-center justify-between">
                      {cert.name}
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs text-slate-600">{cert.issuer}</p>
                    {cert.issue_date && (
                      <p className="text-[11px] text-slate-400 font-mono">Issued {cert.issue_date}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 pt-8 border-t border-slate-200 no-print">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-serif font-bold text-slate-900">Get in Touch</h2>
              <p className="text-sm text-slate-500">
                Interested in working together or have an opportunity? Drop a message below.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <ContactForm username={username} accentColor="indigo" />
            </div>
          </div>
        </section>

      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400 no-print">
        <p>© {new Date().getFullYear()} {full_name}. Generated via PortfolioCraft.</p>
      </footer>
    </div>
  );
};

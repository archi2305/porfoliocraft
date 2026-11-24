import React from 'react';
import { Globe, Mail, Link as LinkIcon } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/BrandIcons';

export const SocialLinks = ({ links = [], email = '', variant = 'light' }) => {
  const getIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <GithubIcon className="w-5 h-5" />;
    if (p.includes('linkedin')) return <LinkedinIcon className="w-5 h-5" />;
    if (p.includes('twitter') || p.includes('x')) return <TwitterIcon className="w-5 h-5" />;
    if (p.includes('web') || p.includes('portfolio') || p.includes('site')) return <Globe className="w-5 h-5" />;
    return <LinkIcon className="w-5 h-5" />;
  };

  const itemClass = variant === 'dark'
    ? 'text-slate-400 hover:text-white hover:bg-slate-800 border-slate-700'
    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border-slate-200';

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {links.map((link) => (
        <a
          key={link.id || link.platform}
          href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
          target="_blank"
          rel="noopener noreferrer"
          title={link.platform}
          className={`p-2.5 rounded-xl border transition duration-200 flex items-center justify-center ${itemClass}`}
        >
          {getIcon(link.platform)}
        </a>
      ))}
      {email && (
        <a
          href={`mailto:${email}`}
          title="Send Email"
          className={`p-2.5 rounded-xl border transition duration-200 flex items-center justify-center ${itemClass}`}
        >
          <Mail className="w-5 h-5" />
        </a>
      )}
    </div>
  );
};

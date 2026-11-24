import React from 'react';
import { MinimalProfessional } from './MinimalProfessional';
import { ModernDeveloper } from './ModernDeveloper';
import { CreativePersonal } from './CreativePersonal';

export const TemplateRenderer = ({ portfolio, isPreview = false }) => {
  if (!portfolio) return null;

  const template = portfolio.selected_template || 'minimal';

  switch (template) {
    case 'developer':
      return <ModernDeveloper portfolio={portfolio} isPreview={isPreview} />;
    case 'creative':
      return <CreativePersonal portfolio={portfolio} isPreview={isPreview} />;
    case 'minimal':
    default:
      return <MinimalProfessional portfolio={portfolio} isPreview={isPreview} />;
  }
};

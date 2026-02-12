import React from 'react';
import { PricingTier, GlobalDesign } from '../types';
import { StandardTemplate } from './templates/StandardTemplate';
import { SolidTemplate } from './templates/SolidTemplate';
import { CenteredTemplate } from './templates/CenteredTemplate';
import { CyberTemplate } from './templates/CyberTemplate';
import { BrutalistTemplate } from './templates/BrutalistTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';

interface PricingCardProps {
  tier: PricingTier;
  design: GlobalDesign;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, design }) => {
  const isPopular = tier.isPopular;
  const template = design.template || 'standard';

  // --- Common Props Calculations ---
  const cardRadius = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    'full': 'rounded-[2rem]',
  }[design.borderRadius];

  const shadowClass = design.showShadow 
    ? (isPopular ? 'shadow-xl shadow-blue-500/20' : 'shadow-lg shadow-slate-200') 
    : 'border border-slate-200';

  // --- Render Template ---
  switch (template) {
    case 'solid':
      return <SolidTemplate tier={tier} design={design} cardRadius={cardRadius} shadowClass={shadowClass} />;
    
    case 'centered':
      return <CenteredTemplate tier={tier} design={design} cardRadius={cardRadius} shadowClass={shadowClass} />;

    case 'cyber':
      return <CyberTemplate tier={tier} design={design} cardRadius={cardRadius} />;

    case 'brutalist':
      return <BrutalistTemplate tier={tier} design={design} />;

    case 'minimalist':
      return <MinimalistTemplate tier={tier} design={design} cardRadius={cardRadius} shadowClass={shadowClass} />;

    case 'standard':
    default:
      return <StandardTemplate tier={tier} design={design} cardRadius={cardRadius} shadowClass={shadowClass} />;
  }
};
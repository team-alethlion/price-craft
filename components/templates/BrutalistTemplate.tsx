import React from 'react';
import { PricingTier, GlobalDesign } from '../../types';
import { TemplateFeatures } from './TemplateHelpers';

interface TemplateProps {
  tier: PricingTier;
  design: GlobalDesign;
}

export const BrutalistTemplate: React.FC<TemplateProps> = ({ tier, design }) => {
  const isPopular = tier.isPopular;

  // Brutalist ignores global border radius
  const borderStyle = 'border-2 border-slate-900';
  const shadowStyle = isPopular 
    ? { boxShadow: `8px 8px 0px 0px ${design.primaryColor}` }
    : { boxShadow: '4px 4px 0px 0px #1e293b' };

  return (
    <div 
      className={`relative flex flex-col p-6 transition-all duration-200 h-full ${borderStyle}`}
      style={{
        backgroundColor: design.cardBackgroundColor,
        color: design.textColor,
        fontFamily: design.fontFamily,
        ...shadowStyle,
        transform: isPopular ? 'translateY(-4px)' : 'none',
      }}
    >
      <div className="mb-6 border-b-2 border-slate-900 pb-4">
        <h3 className="text-2xl font-black uppercase mb-2">{tier.title}</h3>
        <p className="text-sm font-medium opacity-80 leading-relaxed border-l-2 border-slate-900 pl-3">{tier.description}</p>
      </div>

      <div className="mb-8">
        <span className="text-5xl font-black">
          {tier.currency}{tier.price}
        </span>
        <span className="ml-1 text-sm font-bold uppercase tracking-wider opacity-60">{tier.frequency}</span>
      </div>

      <TemplateFeatures tier={tier} design={{...design, iconStyle: 'square'}} />

      <div className="mt-auto">
        <a 
          href={tier.buttonUrl}
          className={`w-full block text-center py-3 px-6 font-bold border-2 border-slate-900 transition-all hover:-translate-y-1 active:translate-y-0`}
          style={{
            backgroundColor: isPopular ? design.primaryColor : '#ffffff',
            color: isPopular ? '#ffffff' : '#1e293b',
            boxShadow: '4px 4px 0px 0px #000000'
          }}
        >
          {tier.buttonText}
        </a>
      </div>
    </div>
  );
};
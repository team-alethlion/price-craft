import React from 'react';
import { PricingTier, GlobalDesign } from '../../types';
import { TemplateFeatures, TemplateButton } from './TemplateHelpers';

interface TemplateProps {
  tier: PricingTier;
  design: GlobalDesign;
  cardRadius: string;
  shadowClass: string;
}

export const CenteredTemplate: React.FC<TemplateProps> = ({ tier, design, cardRadius, shadowClass }) => {
  const isPopular = tier.isPopular;
  
  const popularStyle = isPopular 
    ? { borderColor: design.primaryColor, borderWidth: '2px', transform: 'scale(1.02)' } 
    : { borderColor: 'transparent', borderWidth: '1px' };

  return (
    <div 
      className={`relative flex flex-col p-8 transition-all duration-300 ${cardRadius} ${shadowClass} h-full text-center`}
      style={{
        backgroundColor: design.cardBackgroundColor,
        color: design.textColor,
        fontFamily: design.fontFamily,
        ...popularStyle
      }}
    >
      {isPopular && (
        <div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm"
          style={{ backgroundColor: design.primaryColor }}
        >
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2" style={{ color: design.primaryColor }}>{tier.title}</h3>
        <div className="flex items-baseline justify-center mb-4">
          <span className="text-5xl font-bold">
            {tier.currency}{tier.price}
          </span>
          <span className="ml-1 text-sm opacity-60 font-medium">{tier.frequency}</span>
        </div>
        <p className="text-sm opacity-70 min-h-[40px] leading-relaxed mx-auto max-w-[200px]">{tier.description}</p>
      </div>

      <hr className="border-slate-100 mb-8" />

      <TemplateFeatures tier={tier} design={design} centered={true} />

      <div className="mt-auto">
        <TemplateButton tier={tier} design={design} variant={isPopular ? 'solid' : 'outline'} />
      </div>
    </div>
  );
};
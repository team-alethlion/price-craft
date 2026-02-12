import React from 'react';
import { PricingTier, GlobalDesign } from '../../types';
import { TemplateFeatures, TemplateButton } from './TemplateHelpers';

interface TemplateProps {
  tier: PricingTier;
  design: GlobalDesign;
  cardRadius: string;
  shadowClass: string;
}

export const StandardTemplate: React.FC<TemplateProps> = ({ tier, design, cardRadius, shadowClass }) => {
  const isPopular = tier.isPopular;

  const popularStyle = isPopular 
    ? { borderColor: design.primaryColor, borderWidth: '2px', transform: 'scale(1.02)' } 
    : { borderColor: 'transparent', borderWidth: '1px' };

  return (
    <div 
      className={`relative flex flex-col p-8 transition-all duration-300 ${cardRadius} ${shadowClass} h-full`}
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
        <h3 className="text-xl font-semibold mb-2">{tier.title}</h3>
        <p className="text-sm opacity-70 min-h-[40px] leading-relaxed">{tier.description}</p>
      </div>

      <div className="mb-6 flex items-baseline">
        <span className="text-4xl font-bold" style={{ color: isPopular ? design.primaryColor : 'inherit' }}>
          {tier.currency}{tier.price}
        </span>
        <span className="ml-1 text-sm opacity-60 font-medium">{tier.frequency}</span>
      </div>

      <TemplateFeatures tier={tier} design={design} />

      <div className="mt-auto">
        <TemplateButton tier={tier} design={design} variant={isPopular ? 'solid' : 'outline'} />
      </div>
    </div>
  );
};
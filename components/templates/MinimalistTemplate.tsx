import React from 'react';
import { PricingTier, GlobalDesign } from '../../types';
import { TemplateFeatures } from './TemplateHelpers';

interface TemplateProps {
  tier: PricingTier;
  design: GlobalDesign;
  cardRadius: string;
  shadowClass: string;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ tier, design, cardRadius, shadowClass }) => {
  const isPopular = tier.isPopular;

  return (
    <div 
      className={`relative flex flex-col p-8 transition-all duration-300 ${cardRadius} ${shadowClass} h-full bg-white`}
      style={{
        backgroundColor: design.cardBackgroundColor,
        color: design.textColor,
        fontFamily: design.fontFamily,
        borderTop: isPopular ? `4px solid ${design.primaryColor}` : (design.showShadow ? undefined : '1px solid #e2e8f0'),
        transform: isPopular ? 'translateY(-4px)' : 'none',
      }}
    >
      <div className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">{tier.title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-light tracking-tight" style={{ color: isPopular ? design.primaryColor : 'inherit' }}>
            {tier.currency}{tier.price}
          </span>
          <span className="text-sm text-slate-400">{tier.frequency}</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed opacity-80 font-light">{tier.description}</p>
      </div>

      <div className="flex-grow">
        {/* Force simple icons for the minimalist look */}
        <TemplateFeatures tier={tier} design={{...design, iconStyle: 'simple'}} />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <a 
          href={tier.buttonUrl}
          className={`w-full block text-center py-3 px-4 rounded transition-all text-sm font-medium ${
            isPopular 
              ? 'text-white shadow-md hover:shadow-lg' 
              : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
          }`}
          style={{
            backgroundColor: isPopular ? design.primaryColor : undefined,
          }}
        >
          {tier.buttonText}
        </a>
      </div>
    </div>
  );
};
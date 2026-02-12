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
        <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]" style={{ fontSize: `${design.fontSizes.title}px` }}>
          {tier.title}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="font-light tracking-tight self-start mr-1" style={{ color: isPopular ? design.primaryColor : 'inherit', fontSize: `${design.fontSizes.currency}px` }}>
            {tier.currency}
          </span>
          <span className="font-light tracking-tight leading-none" style={{ color: isPopular ? design.primaryColor : 'inherit', fontSize: `${design.fontSizes.price}px` }}>
            {tier.price}
          </span>
          <span className="text-slate-400" style={{ fontSize: `${design.fontSizes.frequency}px` }}>
            {tier.frequency}
          </span>
        </div>
        <p className="mt-4 leading-relaxed opacity-80 font-light" style={{ fontSize: `${design.fontSizes.description}px` }}>
          {tier.description}
        </p>
      </div>

      <div className="flex-grow">
        {/* Force simple icons for the minimalist look */}
        <TemplateFeatures tier={tier} design={{...design, iconStyle: 'simple'}} />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <a 
          href={tier.buttonUrl}
          className={`w-full block text-center py-3 px-4 rounded transition-all font-medium ${
            isPopular 
              ? 'text-white shadow-md hover:shadow-lg' 
              : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
          }`}
          style={{
            backgroundColor: isPopular ? design.primaryColor : undefined,
            fontSize: `${design.fontSizes.button}px`
          }}
        >
          {tier.buttonText}
        </a>
      </div>
    </div>
  );
};
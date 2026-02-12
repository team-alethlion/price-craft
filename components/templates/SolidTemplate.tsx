import React from 'react';
import { PricingTier, GlobalDesign } from '../../types';
import { TemplateFeatures, TemplateButton } from './TemplateHelpers';

interface TemplateProps {
  tier: PricingTier;
  design: GlobalDesign;
  cardRadius: string;
  shadowClass: string;
}

export const SolidTemplate: React.FC<TemplateProps> = ({ tier, design, cardRadius, shadowClass }) => {
  const isPopular = tier.isPopular;

  return (
    <div 
      className={`relative flex flex-col transition-all duration-300 ${cardRadius} ${shadowClass} h-full overflow-hidden`}
      style={{
        backgroundColor: design.cardBackgroundColor,
        color: design.textColor,
        fontFamily: design.fontFamily,
        transform: isPopular ? 'scale(1.02)' : 'none',
      }}
    >
      <div 
        className="p-6 text-white text-center relative overflow-hidden"
        style={{ backgroundColor: design.primaryColor }}
      >
        {isPopular && (
            <div className="absolute top-0 right-0 bg-white/20 px-3 py-1 rounded-bl-lg text-[10px] font-bold uppercase tracking-wider">
            Popular
            </div>
        )}
        <h3 className="font-bold mb-2 relative z-10" style={{ fontSize: `${design.fontSizes.title}px` }}>
          {tier.title}
        </h3>
        <div className="flex items-baseline justify-center relative z-10">
          <span className="font-bold self-start mr-1" style={{ fontSize: `${design.fontSizes.currency}px` }}>
            {tier.currency}
          </span>
          <span className="font-bold leading-none" style={{ fontSize: `${design.fontSizes.price}px` }}>
            {tier.price}
          </span>
          <span className="ml-1 opacity-80 font-medium" style={{ fontSize: `${design.fontSizes.frequency}px` }}>
            {tier.frequency}
          </span>
        </div>
        <p className="opacity-80 mt-2 relative z-10" style={{ fontSize: `${design.fontSizes.description}px` }}>
          {tier.description}
        </p>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <TemplateFeatures tier={tier} design={design} />
        <div className="mt-auto">
             <a 
                href={tier.buttonUrl}
                className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-[0.98]`}
                style={{
                    backgroundColor: isPopular ? design.primaryColor : 'rgba(0,0,0,0.05)',
                    color: isPopular ? '#ffffff' : design.textColor,
                    fontSize: `${design.fontSizes.button}px`
                }}
            >
                {tier.buttonText}
            </a>
        </div>
      </div>
    </div>
  );
};
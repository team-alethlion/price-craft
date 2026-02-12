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
        <h3 className="text-xl font-bold mb-2 relative z-10">{tier.title}</h3>
        <div className="flex items-baseline justify-center relative z-10">
          <span className="text-4xl font-bold">
            {tier.currency}{tier.price}
          </span>
          <span className="ml-1 text-sm opacity-80 font-medium">{tier.frequency}</span>
        </div>
        <p className="text-sm opacity-80 mt-2 relative z-10">{tier.description}</p>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <TemplateFeatures tier={tier} design={design} />
        <div className="mt-auto">
             {/* Logic: if popular, use primary color button, otherwise faint bg */}
             <a 
                href={tier.buttonUrl}
                className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-[0.98]`}
                style={{
                    backgroundColor: isPopular ? design.primaryColor : 'rgba(0,0,0,0.05)',
                    color: isPopular ? '#ffffff' : design.textColor
                }}
            >
                {tier.buttonText}
            </a>
        </div>
      </div>
    </div>
  );
};
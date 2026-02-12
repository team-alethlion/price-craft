import React from 'react';
import { Check, X } from 'lucide-react';
import { PricingTier, GlobalDesign } from '../types';

interface PricingCardProps {
  tier: PricingTier;
  design: GlobalDesign;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, design }) => {
  const isPopular = tier.isPopular;

  // Determine specific styles based on design config
  const cardRadius = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    'full': 'rounded-[2rem]',
  }[design.borderRadius];

  const shadowClass = design.showShadow ? (isPopular ? 'shadow-xl shadow-blue-500/20' : 'shadow-lg shadow-slate-200') : 'border border-slate-200';
  
  // Dynamic style for popular border/ring
  const popularStyle = isPopular 
    ? { borderColor: design.primaryColor, borderWidth: '2px', transform: 'scale(1.02)' } 
    : { borderColor: 'transparent', borderWidth: '1px' };

  // Icon Style Logic
  const getFeatureIconStyle = (included: boolean) => {
    const iconStyle = design.iconStyle || 'circle';
    
    if (iconStyle === 'simple') {
      return {
        container: `flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center mr-3`,
        style: {
          color: included ? design.primaryColor : (design.cardBackgroundColor === '#ffffff' ? '#94a3b8' : 'rgba(255,255,255,0.3)'),
          backgroundColor: 'transparent'
        }
      };
    }

    const shapeClass = iconStyle === 'circle' ? 'rounded-full' : 'rounded-md';
    return {
      container: `flex-shrink-0 mt-0.5 w-5 h-5 ${shapeClass} flex items-center justify-center mr-3`,
      style: {
        backgroundColor: included ? (isPopular ? design.primaryColor : (design.cardBackgroundColor === '#ffffff' ? '#e2e8f0' : 'rgba(255,255,255,0.2)')) : 'transparent',
        color: included ? '#ffffff' : (design.cardBackgroundColor === '#ffffff' ? '#94a3b8' : 'rgba(255,255,255,0.3)')
      }
    };
  };

  // Button Contrast Logic
  // If popular, use primary color. If not popular, use a subtle background.
  // We need to ensure text is visible on the subtle background if the card is dark.
  const isDarkCard = design.cardBackgroundColor !== '#ffffff' && design.cardBackgroundColor !== '#f8fafc' && design.cardBackgroundColor !== '#f1f5f9';
  
  const buttonStyle = {
    backgroundColor: isPopular ? design.primaryColor : (isDarkCard ? 'rgba(255,255,255,0.1)' : '#f1f5f9'),
    color: isPopular ? '#ffffff' : (isDarkCard ? '#ffffff' : '#334155'),
  };

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

      <div className="flex-grow space-y-4 mb-8">
        {tier.features.map((feature, idx) => {
          const iconConfig = getFeatureIconStyle(feature.included);
          return (
            <div key={idx} className="flex items-start group">
              <div 
                className={iconConfig.container}
                style={iconConfig.style}
              >
                {feature.included ? <Check size={12} strokeWidth={3} /> : <X size={12} />}
              </div>
              <span className={`text-sm leading-5 ${feature.included ? '' : 'opacity-50 line-through'}`}>
                {feature.text}
              </span>
            </div>
          );
        })}
      </div>

      <a 
        href={tier.buttonUrl}
        className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-[0.98]`}
        style={buttonStyle}
      >
        {tier.buttonText}
      </a>
    </div>
  );
};